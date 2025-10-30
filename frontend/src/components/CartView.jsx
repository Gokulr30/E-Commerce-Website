import React from 'react'
import { useCart } from '../context/CartContext.jsx'

export default function CartView() {
  const { cart, increment, decrement, remove } = useCart()
  const hasItems = cart.items && cart.items.length > 0

  return (
    <div className="card">
      <div className="title">Cart</div>
      {!hasItems && <div>Your cart is empty.</div>}
      {hasItems && (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(i => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>${i.price.toFixed(2)}</td>
                <td className="qty-cell">
                  <button onClick={() => decrement(i.id)}>-</button>
                  <span>{i.qty}</span>
                  <button onClick={() => increment(i.id)}>+</button>
                </td>
                <td>${i.subtotal.toFixed(2)}</td>
                <td><button className="link" onClick={() => remove(i.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={{ textAlign: 'right' }}>Total:</td>
              <td colSpan="2">${cart.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  )
}


