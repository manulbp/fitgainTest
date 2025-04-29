import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const newProduct = location.state?.newProduct || null;

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5080/backend/product/get');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Add newProduct to the top if coming from Product.jsx
  const displayProducts = newProduct ? [newProduct, ...products] : products;

  return (
    <div className="flex flex-col min-h-screen px-6 py-4">
      {/* Hero Section */}
      <div className="bg-gray-300 w-full h-40 flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Welcome to FitGear Store</h1>
      </div>

      {/* Explore Section */}
      <h2 className="text-xl font-semibold mb-4">Explore Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* Footer Divider */}
      <div className="bg-gray-300 w-full h-6 mt-10"></div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold mb-1">{product.productname}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Category: {product.category}</span>
        <span className="text-sm text-green-700 font-bold">${product.price}</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">Condition: {product.condition}</p>
      {product.guidance && (
        <p className="text-xs mt-2 italic text-blue-700">Guidance: {product.guidance}</p>
      )}
    </div>
  );
};

export default Home;
