// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);

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

  if (!product) return <div className="text-center mt-10">Loading product...</div>;

  return (
    <div className=" bg-gray-200 px-6 py-8">
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{product.productname}</h1>
      <p className="mb-2"><strong>Description:</strong> {product.description}</p>
      <p className="mb-2"><strong>Category:</strong> {product.category}</p>
      <p className="mb-2"><strong>Condition:</strong> {product.condition}</p>
      <p className="mb-2"><strong>Quantity:</strong> {product.quantity}</p>
      <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
      {product.guidance && <p className="mb-2"><strong>Guidance:</strong> {product.guidance}</p>}

      <button
        className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
        onClick={() => alert(`Order placed for ${product.productname}`)}
      >
        Order
      </button>
    </div>
    </div>
  );
};

export default ProductDetail;
