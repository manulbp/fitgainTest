import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate

const EditProduct = () => {
  const { pid } = useParams();  // Retrieve the product ID from the URL params
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [product, setProduct] = useState({
    productname: '',
    description: '',
    category: '',
    condition: '',
    quantity: '',
    price: '',
    guidance: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the product data for the given product ID (pid)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5080/backend/product/${pid}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [pid]);

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Corrected URL without `/update`
      const res = await fetch(`http://localhost:5080/backend/product/${pid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      const data = await res.json();
      // After successful update, navigate back to the product list
      navigate('/products');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="productname">Product Name</label>
          <input
            type="text"
            id="productname"
            value={product.productname}
            onChange={(e) => setProduct({ ...product, productname: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="condition">Condition</label>
          <input
            type="text"
            id="condition"
            value={product.condition}
            onChange={(e) => setProduct({ ...product, condition: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="guidance">Guidance</label>
          <textarea
            id="guidance"
            value={product.guidance}
            onChange={(e) => setProduct({ ...product, guidance: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mt-6 text-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
