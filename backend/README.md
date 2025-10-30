Backend (Express)

Scripts

- `npm run dev` — start with file watching
- `npm start` — start server

Endpoints

- GET `/api/products`
- POST `/api/cart` body: `{ productId: number, qty: number }`
- DELETE `/api/cart/:id`
- GET `/api/cart`
- POST `/api/checkout` body: `{ cartItems?: {id, qty}[] }`

Notes

- MongoDB persistence via Mongoose. Set `MONGO_URI` in `.env` (see `ENV_EXAMPLE.txt`).
- Products are seeded on startup if the collection is empty.
- Single mock user cart: `mock-user-1`.
- CORS enabled for local dev.


