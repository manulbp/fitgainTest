import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const newProduct = location.state?.newProduct || null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5080/backend/product/all');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Add newProduct to the list if it exists
  const allProducts = newProduct
    ? [newProduct, ...products.filter(p => p._id !== newProduct._id)]
    : products;
  
  // Filter products by category
  const equipmentProducts = allProducts.filter(product => product.category === 'Equipment');
  const supplementProducts = allProducts.filter(product => product.category === 'Supplement');

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 px-6 py-8">
      <header className="bg-gradient-to-r from-gray-600 to-gray-700 text-white p-6 rounded-lg shadow mb-8">
        <h1 className="text-3xl font-bold text-center">🏋️‍♂️ Fit-Gain Store</h1>
        <p className="text-center mt-2 text-sm">
          High-quality gear & supplements to boost your fitness journey
        </p>
      </header>

      {/* Equipment Section */}
      <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-600">Explore Our Products</h2>
        <div className="border-b border-gray-400 mb-8"></div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Fitness Equipment</h2>
        {equipmentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {equipmentProducts.map((product, index) => (
              <ProductCard key={`equipment-${index}`} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No equipment products available yet.</p>
        )}
      </section>

      {/* Supplements Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Supplements</h2>
        {supplementProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {supplementProducts.map((product, index) => (
              <ProductCard key={`supplement-${index}`} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No supplement products available yet.</p>
        )}
      </section>

      <footer className="mt-12 p-4 text-center text-gray-500 text-sm border-t border-gray-400">
        © {new Date().getFullYear()} FitGear. All rights reserved.
      </footer>
    </div>
  );
};

const ProductCard = ({ product }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-5 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{product.productname}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{product.description}</p>
      <div className="flex justify-between text-sm text-gray-700 font-medium mb-2">
        <span>Category: <span className="font-normal">{product.category}</span></span>
        <span className="text-green-500">${product.price}</span>
      </div>
      <p className="text-xs text-gray-500">Condition: {product.condition}</p>
      {product.guidance && (
        <p className="text-xs mt-2 italic text-gray-600">Guidance: {product.guidance}</p>
      )}
    </div>
    
    <button
      className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      onClick={() => alert(`Order placed for ${product.productname}`)}
    >
      Order
    </button>

    <Link to={`/product/${product._id}`}>
      <button className="mt-2 text-sm text-blue-500 hover:underline">View Details</button>
    </Link>
  </div>
);

export default Home;
