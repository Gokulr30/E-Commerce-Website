import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../api.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { increment } = useCart()

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="card">Loading products...</div>
  if (error) return <div className="card error">{error}</div>

  return (
    <div className="grid">
      {products.map(p => (
        <div key={p.id} className="card">
          <div className="title">{p.name}</div>
          <div className="price">${p.price.toFixed(2)}</div>
          <button onClick={() => increment(p.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  )
}


