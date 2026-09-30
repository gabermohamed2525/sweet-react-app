import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Checkout from './pages/Checkout';

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) => 
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    // alert(`${product.name} added to cart!`);
  };

  // حساب إجمالي الكميات في السلة بدقة
  const totalCartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-[#fdf2f8]">
        {/* بنمرر الـ totalCartCount للنافبار هنا */}
        <Navbar cartCount={totalCartCount} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}