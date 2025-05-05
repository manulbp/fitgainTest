import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ContactUs from '../pages/ContactUs';
import Header from '../component/Header';
import Product from '../pages/Product';
import Footer from '../component/Footer';
import Orders from '../pages/Orders';
import ProductList from '../pages/Productlist';
import EditProduct from '../pages/EditProduct';  // Import your new EditProduct page
import ProductDetail from '../pages/Productdetail';
import SearchResults from '../pages/SearchResults';
import Items from '../pages/Items';


export default function App() {
  return (
    <Router>
      {/* Header */}
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:pid" element={<ProductDetail />} />
        <Route path="/edit-product/:pid" element={<EditProduct />} /> {/* Add the EditProduct route */}
        <Route path="/search" element={<SearchResults />} />
        <Route path="/items" element={<Items />} />
        

      </Routes>
      
      {/* Footer */}
      <Footer />
    </Router>
  );
}
