import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import Products from '../pages/Products';
import Orders from '../pages/Orders';
import Header from '../component/Header';

export default function App() {
  return (
    
    <Router>
      {/*header*/}
      <Header/>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
    
  );
}
