import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import jsPDF from 'jspdf';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

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

  const generateReport = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(16);
    doc.text('Product Report', 20, 20);
  
    let yPosition = 30;
    products.forEach((product, index) => {
      doc.setFontSize(12);
      doc.text(`Product #${index + 1}`, 20, yPosition);
      yPosition += 10;
  
      // Draw a horizontal line for product separation
      doc.setLineWidth(0.5);
      doc.line(20, yPosition, 190, yPosition);
      yPosition += 5;
  
      // Product details in an orderly manner
      doc.text(`Name:`, 20, yPosition);
      doc.text(product.productname, 50, yPosition);
      yPosition += 8;
  
      doc.text(`Description:`, 20, yPosition);
      doc.text(product.description, 50, yPosition, { maxWidth: 140 });
      yPosition += 12;
  
      doc.text(`Category:`, 20, yPosition);
      doc.text(product.category, 50, yPosition);
      yPosition += 8;
  
      doc.text(`Condition:`, 20, yPosition);
      doc.text(product.condition, 50, yPosition);
      yPosition += 8;
  
      doc.text(`Quantity:`, 20, yPosition);
      doc.text(`${product.quantity}`, 50, yPosition);
      yPosition += 8;
  
      doc.text(`Price:`, 20, yPosition);
      doc.text(`$${product.price}`, 50, yPosition);
      yPosition += 8;
  
      doc.text(`Guidance:`, 20, yPosition);
      doc.text(product.guidance || 'N/A', 50, yPosition);
      yPosition += 12;
  
      // Draw a horizontal line to separate products
      doc.setLineWidth(0.5);
      doc.line(20, yPosition, 190, yPosition);
      yPosition += 5;
  
      // If the page is full, add a new page
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });
  
    doc.save('product_report.pdf');
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Product List</h1>
      
      {/* Button to generate report */}
      <button
        onClick={generateReport}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Generate Report
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-md p-4 bg-white shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2">{product.productname}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-gray-500 mb-1">Category: {product.category}</p>
            <p className="text-gray-500 mb-1">Condition: {product.condition}</p>
            <p className="text-gray-500 mb-1">Quantity: {product.quantity}</p>
            <p className="text-gray-500 mb-1">Price: ${product.price}</p>
            {product.guidance && (
              <p className="text-gray-500 text-sm italic mt-2">{product.guidance}</p>
            )}
            <div className="mt-4">
            <button
               className="mr-2 text-green-500"
               onClick={() => navigate(`/product/${product._id}`)}
  >
              View
              </button>
              <button
                className="mr-2 text-blue-500"
                onClick={() => navigate(`/edit-product/${product._id}`)}
              >
                Edit
              </button>
              <button
                className="text-red-500"
                onClick={() => deleteProduct(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
