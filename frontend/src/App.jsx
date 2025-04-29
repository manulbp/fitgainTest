import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import Header from '../component/Header';
import Product from '../pages/Product';
import Footer from '../component/Footer';
import Orders from '../pages/Orders';
import ProductList from '../pages/Productlist';






export default function App() {
  return (
    <Router>
      {/* Header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<ProductList />} />
        
        
      
      </Routes>
      {/* Footer */}
      <Footer />
    </Router>
  );
}
