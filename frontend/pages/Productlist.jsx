import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5080/backend/product/all");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (pid) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      const res = await fetch(`http://localhost:5080/backend/product/${pid}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts(products.filter(product => product._id !== pid)); // Remove product from state
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Enhanced generateReport function in ProductList.jsx
const generateReport = async () => {
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text('Product Report', 20, 20);
  
  let yPosition = 30;
  
  // Process each product
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    
    // Add new page if needed
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(12);
    doc.text(`Product #${i + 1}`, 20, yPosition);
    yPosition += 10;
    
    // Draw a horizontal line for product separation
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;
    
    // Add product image
    if (product.image) {
      try {
        // Create a new image element to load the image
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Enable CORS if needed
        
        // Create a promise to wait for the image to load
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = `http://localhost:5080/${product.image}`;
        });
        
        // Calculate image dimensions (maintain aspect ratio)
        const imgWidth = 60;
        const imgHeight = 60;
        
        // Add image to PDF
        doc.addImage(img, 'JPEG', 20, yPosition, imgWidth, imgHeight);
        
        
        const textX = 90;
        let textY = yPosition + 5;
        
        // Product details
        doc.text(`Name: ${product.productname}`, textX, textY);
        textY += 8;
        
        doc.text(`Category: ${product.category}`, textX, textY);
        textY += 8;
        
        doc.text(`Condition: ${product.condition}`, textX, textY);
        textY += 8;
        
        doc.text(`Quantity: ${product.quantity}`, textX, textY);
        textY += 8;
        
        doc.text(`Price: $${product.price}`, textX, textY);
        
        // Move position below the image for description
        yPosition += imgHeight + 10;
        
      } catch (error) {
        console.error("Error loading image:", error);
        // If image loading fails, continue with just text
        doc.text(`Name: ${product.productname}`, 20, yPosition);
        yPosition += 8;
      }
    } else {
      // No image, just add text
      doc.text(`Name: ${product.productname}`, 20, yPosition);
      yPosition += 8;
    }
    
    // Description (may be multi-line)
    doc.text(`Description:`, 20, yPosition);
    yPosition += 8;
    
    const splitDescription = doc.splitTextToSize(product.description, 170);
    doc.text(splitDescription, 20, yPosition);
    yPosition += splitDescription.length * 7;
    
    // Guidance (if available)
    if (product.guidance) {
      doc.text(`Guidance:`, 20, yPosition);
      yPosition += 8;
      
      const splitGuidance = doc.splitTextToSize(product.guidance, 170);
      doc.text(splitGuidance, 20, yPosition);
      yPosition += splitGuidance.length * 7;
    }
    
    // Space between products
    yPosition += 15;
  }
  
  doc.save('product_report.pdf');
};
  
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="max-w-8xl mx-auto mt-10 p-10 bg-gray-200 min-h-screen rounded-lg">

      <h1 className="text-2xl font-semibold mb-6 text-center">Product List</h1>
      
      {/* Button to generate report */}
      <div className="flex justify-between mb-6">
        <button
          onClick={generateReport}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-black"
        >
          Generate Report
        </button>
        
        <button
          onClick={() => navigate('/product')}
          className="bg-black text-white py-2 px-4 rounded  hover:bg-gray-500"
        >
          Add New Product
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-md p-4 bg-white shadow hover:shadow-lg transition">
            {/* Product Image */}
            {product.image && (
              <div className="mb-3 flex justify-center">
                <img 
                  src={`http://localhost:5080/${product.image}`} 
                  alt={product.productname}
                  className="w-40 h-40 object-cover rounded-md shadow border border-gray-200"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                  }}
                />
              </div>
            )}
            
            <h2 className="text-xl font-bold mb-2 text-center">{product.productname}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-gray-500 mb-1">Category: {product.category}</p>
            <p className="text-gray-500 mb-1">Condition: {product.condition}</p>
            <p className="text-gray-500 mb-1">Quantity: {product.quantity}</p>
            <p className="text-gray-500 mb-1">Price: ${product.price}</p>
            {product.guidance && (
              <p className="text-gray-500 text-sm italic mt-2">{product.guidance}</p>
            )}
            <div className="mt-4 flex space-x-2">
              <button
                className="bg-gray-400 text-white font-semibold py-2 px-6 rounded-3xl shadow hover:bg-gray-500 transition-all duration-200"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                View
              </button>
              <button
                className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-3xl shadow hover:bg-gray-600 transition-all duration-200"
                onClick={() => navigate(`/edit-product/${product._id}`)}
              >
                Edit
              </button>
              <button
                className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-3xl shadow hover:bg-gray-700 transition-all duration-200"
                onClick={() => deleteProduct(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductList;
