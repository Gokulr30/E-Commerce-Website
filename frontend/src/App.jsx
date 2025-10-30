import React, { useState } from 'react'
import ProductGrid from './components/ProductGrid.jsx'
import CartView from './components/CartView.jsx'
import CheckoutForm from './components/CheckoutForm.jsx'
import ReceiptModal from './components/ReceiptModal.jsx'
import { CartProvider } from './context/CartContext.jsx'

export default function App() {
  const [receipt, setReceipt] = useState(null)

  return (
    <CartProvider>
      <div className="container">
        <header>
          <h1>Mock E-Com Cart</h1>
        </header>
        <main className="layout">
          <section>
            <ProductGrid />
          </section>
          <aside>
            <CartView />
            <CheckoutForm onReceipt={setReceipt} />
          </aside>
        </main>
        <footer>
          <small>Built for Vibe Commerce screening</small>
        </footer>
      </div>
      <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
    </CartProvider>
  )
}


