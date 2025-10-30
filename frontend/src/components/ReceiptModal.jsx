import React from 'react'

export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="title">Receipt</div>
        <div><strong>Name:</strong> {receipt.name}</div>
        <div><strong>Email:</strong> {receipt.email}</div>
        <div><strong>Total:</strong> ${receipt.total.toFixed(2)}</div>
        <div><strong>Timestamp:</strong> {new Date(receipt.timestamp).toLocaleString()}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}


