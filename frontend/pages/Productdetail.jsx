// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5080/backend/product/${pid}`);
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [pid]);

  const increaseQuantity = () => {
    if (product && selectedQuantity < product.quantity) {
      setSelectedQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    alert(`Order placed for ${selectedQuantity} ${selectedQuantity > 1 ? 'units' : 'unit'} of ${product.productname}`);
  };

  if (!product) return <div className="text-center mt-10">Loading product...</div>;

  return (
    <div className=" bg-gray-200 px-6 py-8">
    <div className="max-w-2xl mx-auto p-7 mt-10 bg-white rounded-lg shadow-md">
    {product.image && (
  <img
    src={`http://localhost:5080/${product.image}`}  // Adjust based on how you're serving static files
    alt={product.productname}
    className="mb-4 rounded-lg shadow w-64 h-64 object-cover"
  />
)}

      <h1 className="text-2xl font-bold mb-4">{product.productname}</h1>
      <p className="mb-2"><strong>Description:</strong> {product.description}</p>
      <p className="mb-2"><strong>Category:</strong> {product.category}</p>
      <p className="mb-2"><strong>Condition:</strong> {product.condition}</p>
      <p className="mb-2"><strong>Quantity:</strong> {product.quantity}</p>
      <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
      {product.guidance && <p className="mb-2"><strong>Guidance:</strong> {product.guidance}</p>}

      <div className="flex items-center mt-4">
        <div className="flex items-center border border-gray-300 rounded-lg mr-4">
          <button 
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l-lg" 
            onClick={decreaseQuantity}
            disabled={selectedQuantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-1">{selectedQuantity}</span>
          <button 
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
            onClick={increaseQuantity}
            disabled={product && selectedQuantity >= product.quantity}
          >
            +
          </button>
        </div>

        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
    </div>
  );
};

export default ProductDetail;
