import React, { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { checkout } from '../api.js'

export default function CheckoutForm({ onReceipt }) {
  const { cart } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const receipt = await checkout(cart.items)
      onReceipt({ ...receipt, name, email })
    } catch (e) {
      setError(e.message || 'Checkout failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="card">
      <div className="title">Checkout</div>
      <form onSubmit={onSubmit} className="form">
        <label>
          <span>Name</span>
          <input value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={submitting || cart.items.length === 0}>
          {submitting ? 'Processing...' : 'Submit Order'}
        </button>
      </form>
    </div>
  )
}


