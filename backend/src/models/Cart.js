import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  pid: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1 }
}, { _id: false })

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true, unique: true },
  items: { type: [CartItemSchema], default: [] }
}, { timestamps: true })

export const Cart = mongoose.model('Cart', CartSchema)


