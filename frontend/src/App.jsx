import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import Orders from '../pages/Orders';
import Header from '../component/Header';
import Product from '../pages/Product';

export default function App() {
  return (
    
    <Router>
      {/*header*/}
      <Header/>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
    
  );
}
