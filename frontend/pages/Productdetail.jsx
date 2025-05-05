import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5080/backend/product/${pid}`);
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
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

  const updateProductStock = async (quantityToReduce) => {
    try {
      // Calculate new quantity
      const newQuantity = product.quantity - quantityToReduce;
      
      // Prevent negative stock
      if (newQuantity < 0) {
        throw new Error('Not enough stock available');
      }
      
      // Send update request to backend using our dedicated stock update endpoint
      const response = await fetch(`http://localhost:5080/backend/product/${pid}/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update stock');
      }
      
      const result = await response.json();
      
      // Update local product state with new quantity
      setProduct({
        ...product,
        quantity: result.product.quantity
      });
      
      return true;
    } catch (error) {
      console.error('Error updating stock:', error);
      return false;
    }
  };

  const handleAddToCart = async () => {
    setUpdateLoading(true);
    setOrderStatus(null);
    
    // Update the product stock in the database
    const success = await updateProductStock(selectedQuantity);
    
    if (success) {
      setOrderStatus({
        type: 'success',
        message: `Order placed for ${selectedQuantity} ${selectedQuantity > 1 ? 'units' : 'unit'} of ${product.productname}`
      });
      // Reset selected quantity to 1 after successful order
      setSelectedQuantity(1);
    } else {
      setOrderStatus({
        type: 'error',
        message: 'Failed to update stock. Please try again.'
      });
    }
    
    setUpdateLoading(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );

  if (!product) return <div className="text-center mt-10">Product not found</div>;

  return (
    <div className="bg-gray-200 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Centered Product Image */}
        <div className="flex justify-center py-8 bg-gray-200">
          {product.image ? (
            <img
              src={`http://localhost:5080/${product.image}`}
              alt={product.productname}
              className="rounded-lg shadow-md w-72 h-72 object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="w-72 h-72 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        {/* Centered Product Name */}
        <div className="text-center pt-6 pb-2">
          <h1 className="text-3xl font-bold text-gray-800">{product.productname}</h1>
          <p className="mt-2 text-2xl font-semibold text-gray-700">${product.price}</p>
        </div>

        {/* Product Details */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium">{product.category}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Condition</p>
              <p className="font-medium">{product.condition}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">In Stock</p>
              <p className="font-medium">
                {product.quantity} units
                {product.quantity < 10 && (
                  <span className="ml-2 text-red-400 font-semibold">
                    {product.quantity <= 5 ? 'Low Stock!' : 'Limited Stock'}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {product.guidance && (
            <div className="mb-6 p-4 bg-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">Guidance</h2>
              <p className="text-gray-700">{product.guidance}</p>
            </div>
          )}

          {/* Order Status Message */}
          {orderStatus && (
            <div className={`mb-4 p-3 rounded-lg ${orderStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {orderStatus.message}
            </div>
          )}

          {/* Quantity Selector and Add to Cart */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-l-lg transition-colors"
                onClick={decreaseQuantity}
                disabled={selectedQuantity <= 1 || updateLoading}
              >
                -
              </button>
              <span className="px-6 py-2 font-medium">{selectedQuantity}</span>
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-r-lg transition-colors"
                onClick={increaseQuantity}
                disabled={(product && selectedQuantity >= product.quantity) || updateLoading}
              >
                +
              </button>
            </div>

            <button
              className={`bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-8 rounded-3xl transition-colors w-full sm:w-auto ${
                updateLoading || product.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleAddToCart}
              disabled={updateLoading || product.quantity === 0}
            >
              {updateLoading ? 'Processing...' : product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
