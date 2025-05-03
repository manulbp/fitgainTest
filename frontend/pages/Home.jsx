import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../src/assets/assets';

const Home = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const newProduct = location.state?.newProduct || null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5080/backend/product/all');
        const data = await response.json();
        if (data.success) {
          setProducts(
            (data.products || []).map((product) => ({
              ...product,
              image: product.image ? `http://localhost:5080/${product.image}` : null,
              price: parseFloat(product.price) || 0, 
              quantity: parseInt(product.quantity) || 0, 
              category: product.category
                ? product.category.charAt(0).toUpperCase() + product.category.slice(1).toLowerCase()
                : 'Unknown', 
            }))
          );
        } else {
          console.error('Failed to fetch products:', data.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Process new product with image handling if it exists
  const normalizedNewProduct = newProduct
    ? {
      ...newProduct,
      image: newProduct.image ? `http://localhost:5080/${newProduct.image}` : null,
      quantity: parseInt(newProduct.quantity) || 0,
      price: parseFloat(newProduct.price) || 0,
      condition: newProduct.condition || 'New',
      guidance: newProduct.guidance || 'No guidance available',
      category: newProduct.category
        ? newProduct.category.charAt(0).toUpperCase() + newProduct.category.slice(1).toLowerCase()
        : 'Unknown',
    }
    : null;

  // Add newProduct to the list if it exists
  const allProducts = normalizedNewProduct
    ? [normalizedNewProduct, ...products.filter(p => p._id !== normalizedNewProduct._id)]
    : products;
  
  // Filter products by category
  const equipmentProducts = allProducts.filter(product => product.category.toLowerCase() === 'equipment');
  const supplementProducts = allProducts.filter(product => product.category.toLowerCase() === 'supplement');

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
      <div className="mb-4 flex justify-center">
        <img
          src={product.image || assets.noImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = assets.noImage;
          }}
          alt={product.productname || 'Product'}
          className="w-32 h-32 object-cover rounded-lg"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{product.productname}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{product.description}</p>
      <div className="flex justify-between text-sm text-gray-700 font-medium mb-2">
        <span>Category: <span className="font-normal">{product.category}</span></span>
        <span className="text-blue-400">${product.price.toFixed(2)}</span>
      </div>
      <p className="text-xs text-gray-500">Condition: {product.condition}</p>
      {product.quantity && (
        <p className="text-xs text-gray-500 mt-1">Quantity: {product.quantity}</p>
      )}
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
      <button className="mt-2 bg-gray-200 text-sm text-black hover:underline py-2 px-3 rounded-lg transition duration-20">View Details</button>
    </Link>
  </div>
);

export default Home;
