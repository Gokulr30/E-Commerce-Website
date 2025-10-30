const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export async function fetchProducts() {
  const res = await fetch(`${BASE}/api/products`)
  if (!res.ok) throw new Error('Failed to load products')
  return res.json()
}

export async function addToCart(productId, qty) {
  const res = await fetch(`${BASE}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, qty })
  })
  if (!res.ok) throw new Error('Failed to update cart')
  return res.json()
}

export async function removeFromCart(productId) {
  const res = await fetch(`${BASE}/api/cart/${productId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to remove item')
  return res.json()
}

export async function getCart() {
  const res = await fetch(`${BASE}/api/cart`)
  if (!res.ok) throw new Error('Failed to get cart')
  return res.json()
}

export async function checkout(cartItems) {
  const res = await fetch(`${BASE}/api/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cartItems })
  })
  if (!res.ok) throw new Error('Checkout failed')
  return res.json()
}


