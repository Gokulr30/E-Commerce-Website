import React, { createContext, useContext, useEffect, useState } from 'react'
import { addToCart, getCart, removeFromCart } from '../api.js'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function refresh() {
    setLoading(true)
    setError(null)
    try {
      const data = await getCart()
      setCart(data)
    } catch (e) {
      setError(e.message || 'Failed to fetch cart')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  async function increment(productId) {
    const data = await addToCart(productId, 1)
    setCart(data)
  }

  async function decrement(productId) {
    const data = await addToCart(productId, -1)
    setCart(data)
  }

  async function remove(productId) {
    const data = await removeFromCart(productId)
    setCart(data)
  }

  const value = { cart, loading, error, refresh, increment, decrement, remove }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


