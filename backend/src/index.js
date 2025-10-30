import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectToDatabase } from "./db.js";
import { Product } from "./models/Product.js";
import { Cart } from "./models/Cart.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const MOCK_USER_ID = "mock-user-1";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

async function getCartResponse() {
  const cart = await Cart.findOne({ userId: MOCK_USER_ID }).lean();
  const items = [];
  let total = 0;
  if (cart) {
    const pids = cart.items.map(i => i.pid);
    const productDocs = await Product.find({ pid: { $in: pids } }).lean();
    const pidToProduct = new Map(productDocs.map(p => [p.pid, p]));
    for (const item of cart.items) {
      const p = pidToProduct.get(item.pid);
      if (!p) continue;
      const subtotal = p.price * item.qty;
      total += subtotal;
      items.push({ id: p.pid, name: p.name, price: p.price, qty: item.qty, subtotal });
    }
  }
  return { items, total: Number(total.toFixed(2)) };
}

app.get("/api/products", async (req, res) => {
  const docs = await Product.find({}).sort({ pid: 1 }).lean();
  const mapped = docs.map(p => ({ id: p.pid, name: p.name, price: p.price }));
  res.json(mapped);
});

app.post("/api/cart", async (req, res) => {
  const { productId, qty } = req.body || {};
  if (typeof productId !== "number" || typeof qty !== "number") {
    return res.status(400).json({ error: "productId and qty (number) are required" });
  }
  const product = await Product.findOne({ pid: productId }).lean();
  if (!product) return res.status(404).json({ error: "Product not found" });

  const cart = await Cart.findOneAndUpdate(
    { userId: MOCK_USER_ID },
    { $setOnInsert: { userId: MOCK_USER_ID, items: [] } },
    { upsert: true, new: true }
  );

  const existing = cart.items.find(i => i.pid === productId);
  const nextQty = (existing?.qty || 0) + qty;
  if (existing) {
    if (nextQty <= 0) {
      cart.items = cart.items.filter(i => i.pid !== productId);
    } else {
      existing.qty = nextQty;
    }
  } else if (nextQty > 0) {
    cart.items.push({ pid: productId, qty: nextQty });
  }
  await cart.save();
  return res.json(await getCartResponse());
});

app.delete("/api/cart/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  await Cart.updateOne({ userId: MOCK_USER_ID }, { $pull: { items: { pid: id } } });
  return res.json(await getCartResponse());
});

app.get("/api/cart", async (req, res) => {
  res.json(await getCartResponse());
});

app.post("/api/checkout", async (req, res) => {
  const current = await getCartResponse();
  const receipt = { total: current.total, timestamp: new Date().toISOString() };
  await Cart.updateOne({ userId: MOCK_USER_ID }, { $set: { items: [] } }, { upsert: true });
  res.json(receipt);
});

app.get("/", (req, res) => {
  res.send("Mock E-Com Cart API is running");
});

async function start() {
  await connectToDatabase(process.env.MONGO_URI);
  // Seed products if empty
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { pid: 1, name: "Classic Tee", price: 19.99 },
      { pid: 2, name: "Denim Jeans", price: 39.5 },
      { pid: 3, name: "Sneakers", price: 59.0 },
      { pid: 4, name: "Hoodie", price: 34.99 },
      { pid: 5, name: "Cap", price: 12.75 },
      { pid: 6, name: "Socks (3 pack)", price: 8.99 },
      { pid: 7, name: "Backpack", price: 49.0 },
      { pid: 8, name: "Sunglasses", price: 24.0 }
    ]);
  }
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

start().catch(err => {
  console.error("Failed to start server", err);
  process.exit(1);
});


