Vibe Commerce Mock E-Com Cart

Project structure

- `backend/` — Node/Express REST API for products, cart, and checkout
- `frontend/` — React (Vite) UI with products grid, cart view, and checkout

Quick start

1) Backend

```
cd backend
npm install
npm run dev
```

The API runs at `http://localhost:4000` by default.

2) Frontend

```
cd frontend
npm install
npm run dev
```

The app runs at the URL Vite prints (usually `http://localhost:5173`).

APIs implemented

- GET `/api/products` — returns 8 mock products
- POST `/api/cart` — body: `{ productId, qty }` (qty can be negative to decrement)
- DELETE `/api/cart/:id` — removes an item from cart
- GET `/api/cart` — returns `{ items, total }`
- POST `/api/checkout` — body: `{ cartItems? }` optional; responds with mock receipt `{ total, timestamp }`

Notes

- This demo keeps a single mock-user cart in server memory for simplicity. It’s easy to swap with a DB later.
- CORS is enabled for local dev.


