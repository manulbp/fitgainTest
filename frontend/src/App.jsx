import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import Orders from '../pages/Orders';
import Header from '../component/Header';
import Product from '../pages/Product';
import Footer from '../component/Footer';
import AllUsers from '../Admin/AllUsers';
import AddCheckout from '../pages/AddCheckout';
import Checkouts from '../pages/Checkouts,';
import CheckoutReview from '../Admin/CheckoutReview';
import AdminDashboard from '../Admin/AdminDashboard';


export default function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userMail = user ? user.email : null;

  const admin = userMail === 'adminmail@gmail.com';
  return (

    <Router>
      {/*header*/}
      <Header />
      <Routes>

        {admin && (
          <>
            <Route path="/admindashboard" element={<AdminDashboard />} />
          </>
        )}
        {user && (
          <>
            <Route path="/AddCheckoout" element={<AddCheckout />} />
            <Route path="/Checkouts" element={<Checkouts />} />
          </>
        )}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
      {/*footer*/}
    </Router>

  );
}
