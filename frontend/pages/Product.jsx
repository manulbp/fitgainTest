import React, { useState, useEffect } from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    productname: '',
    description: '',
    category: '',
    condition:'',
    quantity:'',
    date:'',
    price: '',
    guidance: '',
    image: null,
    imagePreview: null,
  });

  useEffect(() => {
    return () => {
      if (formData.imagePreview) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData({ ...formData, image: file, imagePreview: previewURL });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!formData.productname || !formData.description || !formData.category || !formData.quantity || !formData.price) {
      setErrorMessage("All required fields must be filled");
      setLoading(false);
      return;
    }

    //Price validation section
      if (parseFloat(formData.price) <= 0) {
      setErrorMessage("Product price must be a positive number");
      setLoading(false);
      return;
    }

    const productData = {
      productname: formData.productname,
      description: formData.description,
      category: formData.category,
      condition: formData.condition,
      quantity: parseInt(formData.quantity),
      date:formData.date,
      price: parseFloat(formData.price),
      guidance: formData.guidance,
    };

    try {
      const res = await fetch("/backend/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const text = await res.text(); 
      const data = text ? JSON.parse(text) : {}; 

      if (!res.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      alert("Product added successfully!");
      setFormData({ 
        productname: '', 
        description: '', 
        category: '', 
        condition: '',
        quantity:'',
        date:'',
        price: '', 
        guidance: '', 
      
      });
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

 
return (
    <div className="max-w-lg mx-auto p-8 bg-gray-200 rounded-md shadow-sm mt-8">
      <h1 className="text-xl text-gray-600 font-medium text-center mb-6" >Add a New Product</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 w-full">
        <p className="text-sm text-gray-650 text-left mb-1 mt-0.5">Product Image:</p>
        <input 
          type="file" 
          id="image" 
          onChange={handleFileChange} 
          className="w-full border border-gray-300 bg-white rounded px-3 py-2 text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700"
        />
        {formData.imagePreview && <img src={formData.imagePreview} alt="Preview" width="100" className="mt-2" />}
      </div>

        <div className="add-product-name flex-col mt-5">
          <p>Product name:</p>
          <input 
            type="text" 
            name="productname" 
            placeholder="Enter product name" 
            value={formData.productname} 
            onChange={handleChange} 
            required 
            className='w-full border border-gray-300 bg-white rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
          />
        </div>

        <div className="add-product-description flex-col mt-5">
          <p>Product description:</p>
          <textarea 
            name="description" 
            rows="6" 
            placeholder="Enter your description" 
            value={formData.description} 
            onChange={handleChange} 
            required
            className='w-full border border-gray-300 bg-white rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
          ></textarea>
        </div>

        
          <div className="add-category flex-col mt-5">
            <p>Product category:</p>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required
              className='w-full border border-gray-300 bg-white rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
            >
              <option value="">Select</option>
              <option value="equipment">Equipment</option>
              <option value="nutrient">Supplement</option>
              </select>
          </div>

          <div className="add-product-condition">
          <div className="add-condition flex-col mt-5">
            <p>Product condition:</p>
            <select 
              name="condition" 
              value={formData.condition} 
              onChange={handleChange} 
              required
              className='w-full border border-gray-300 bg-white rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400 '
            >
              <option value="">Select</option>
              <option value="New">Brand-new</option>
              <option value="Used">Secondhand</option>
              </select>
          </div>

          <div className="add-count flex-col mt-5">
            <p>Inventory level:</p>
            <input 
              type="number" 
              name="quantity" 
              value={formData.quantity} 
              onChange={handleChange} 
              required 
              min="1"
              className='w-full border border-gray-300 bg-white rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
            />
          </div>

        
          
        <div className="add-price flex-col mt-5">
            <p>Product price:</p>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              className='w-full border border-gray-300 bg-white rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
            />
          </div>
        </div>

        <div className="add-nutritional-guidance flex-col mt-5">
          <p>Nutritional guidance(regarding supplements):</p>
          <textarea 
            name="guidance" 
            rows="6" 
            placeholder="Type here" 
            value={formData.guidance} 
            onChange={handleChange}
            className='w-full border border-gray-300 bg-white rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
          ></textarea>
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}
        
        <button 
        type="submit" 
        className="w-full bg-blue-300 text-black py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-center mt-4"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
      
      </form>
    </div>
  );
};

export default Product;