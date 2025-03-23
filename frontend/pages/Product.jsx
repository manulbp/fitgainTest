import React, { useState, useEffect } from 'react';
import './Product.css';

const Product = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    productname: '',
    description: '',
    category: '',
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

    if (!formData.productname || !formData.description || !formData.category || !formData.price) {
      setErrorMessage("All required fields must be filled");
      setLoading(false);
      return;
    }

    const productData = {
      productname: formData.productname,
      description: formData.description,
      category: formData.category,
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
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload image:</p>
          <input type="file" id="image" onChange={handleFileChange} />
          {formData.imagePreview && <img src={formData.imagePreview} alt="Preview" width="100" />}
        </div>

        <div className="add-product-name flex-col">
          <p>Product name:</p>
          <input 
            type="text" 
            name="productname" 
            placeholder="Enter" 
            value={formData.productname} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description:</p>
          <textarea 
            name="description" 
            rows="6" 
            placeholder="Enter your description" 
            value={formData.description} 
            onChange={handleChange} 
            required
          ></textarea>
        </div>

        <div className="add-product-category">
          <div className="add-category flex-col">
            <p>Product category:</p>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Select</option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
              <option value="e">E</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price:</p>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="add-nutritional-guidance flex-col">
          <p>Nutritional guidance:</p>
          <textarea 
            name="guidance" 
            rows="6" 
            placeholder="Type here" 
            value={formData.guidance} 
            onChange={handleChange}
          ></textarea>
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" className="add-btn" disabled={loading}>
          {loading ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default Product;