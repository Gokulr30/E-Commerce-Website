# 🛒 E-Commerce Website

A full-stack E-Commerce Web Application featuring a product catalog, shopping cart, and checkout flow. Built with **Node.js (Express)** for the backend and **React** for the frontend.

---

## 📁 Project Structure

```
E-Commerce-website/
  ├── backend/
  │   ├── ENV_EXAMPLE.txt
  │   ├── package.json
  │   ├── package-lock.json
  │   ├── server.js
  │   └── src/
  │       ├── db.js
  │       ├── index.js
  │       ├── models/
  │       │   ├── Cart.js
  │       │   └── Product.js
  │       └── products.js
  ├── frontend/
  │   ├── ENV_EXAMPLE.txt
  │   ├── package.json
  │   ├── package-lock.json
  │   ├── index.html
  │   ├── vite.config.js
  │   └── src/
  │       ├── api.js
  │       ├── App.jsx
  │       ├── main.jsx
  │       ├── styles.css
  │       ├── context/
  │       │   └── CartContext.jsx
  │       └── components/
  │           ├── CartView.jsx
  │           ├── CheckoutForm.jsx
  │           ├── ProductGrid.jsx
  │           └── ReceiptModal.jsx
  └── README.md
```

---

## 🚀 Features

- **Browse Products**: Users can view a catalog of products.
- **Shopping Cart**: Add and remove items dynamically.
- **Checkout Flow**: Submit orders with checkout forms and see confirmation.
- **API-Driven**: Frontend communicates with a backend server via RESTful APIs.
- **Persistent Cart State**: Cart is managed globally using React Context.

---

## 🛠️ Tech Stack

- **Frontend**: React, JavaScript, Vite, CSS
- **Backend**: Node.js, Express
- **Database**: (Pluggable, designed for easy setup. Likely MongoDB, see `db.js` and model files.)
- **API**: RESTful (JSON)
- **State Management**: React Context API

---

## ⚙️ Setup & Usage

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd E-Commerce-website
```

### 2. Install Dependencies

Install **backend** dependencies:
```bash
cd backend
npm install
```

Install **frontend** dependencies:
```bash
cd ../frontend
npm install
```

### 3. Environment Variables

- Both backend and frontend contain `ENV_EXAMPLE.txt` files.
- Copy and rename them to `.env` in their respective folders.
- Fill in the required configuration (such as API URLs, DB connections, etc).

### 4. Run the Application

**Start the backend server:**
```bash
cd backend
npm start
```

**Start the frontend development server:**
```bash
cd ../frontend
npm run dev
```

### 5. Open in Browser

Go to: [http://localhost:3000](http://localhost:3000)  
(The port may differ, see Vite output.)

---

## 💡 Project Structure Explanation

- **backend/**: Handles all server logic, database models, and API endpoints.
  - `server.js`: Server entry point.
  - `src/db.js`: Database connection logic.
  - `src/models/`: Product and Cart Mongoose-style models.
  - `src/products.js`: Product data or utilities.
- **frontend/**: Contains all React frontend code and assets.
  - `src/`: Main app source.
    - `components/`: UI components for cart, checkout, products, receipt.
    - `context/CartContext.jsx`: Global state for cart.
    - `api.js`: Handles HTTP API calls.
    - `App.jsx`, `main.jsx`, `styles.css`: Main app, bootstrapping, and styles.

---

## 🌱 Future Improvements

- User authentication with accounts.
- Payment gateway integration (Stripe, PayPal, etc.).
- Admin dashboard for product management.
- Enhanced product search & filtering.
- Order history for users.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Credits

Created by [Your Name / Team].  
Inspired by modern e-commerce platforms for educational purposes.


