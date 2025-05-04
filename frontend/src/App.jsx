import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import ContactUs from './pages/ContactUs';
import Orders from './pages/Orders';
import Header from './components/Header';
import User from './pages/User';
import LogIn from './pages/LogIn';
import Admin from './pages/Admin';
import Reviews from './pages/Reviews';
import AdminLogIn from './pages/AdminLogIn';

export default function App() {
  return (

    <Router>
      {/*header*/}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin-login" element={<AdminLogIn />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </Router>

  );
}
