// import React, { useState, useEffect } from 'react';

// const Addproducts = () => {
//   // Initialize the state with product data (or fetch data if necessary)
//   const [product, setProduct] = useState({
//     _id: '',
//     productname: '',
//     description: '',
//     category: '',
//     condition: '',
//     quantity: 0,
//     price: 0,
//     guidance: ''
//   });

//   // Fetch product data from the backend API
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         // Replace with the actual API URL where your product data is served
//         const response = await fetch(`http://localhost:5000/products/${_id}`); // Example URL
//         const fetchedProduct = await response.json();
        
//         if (response.ok) {
//           setProduct(fetchedProduct);
//         } else {
//           console.error('Failed to fetch product data');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchProduct();
//   }, []); // Empty dependency array means this runs only once when the component mounts

//   return (
//     <>
//       <h1>Product List</h1><br />
//       <h1>Id: {product._id}</h1>
//       <h1>Product Name: {product.productname}</h1>
//       <h1>Description: {product.description}</h1>
//       <h1>Category: {product.category}</h1>
//       <h1>Condition: {product.condition}</h1>
//       <h1>Quantity: {product.quantity}</h1>
//       <h1>Price: {product.price}</h1>
//       <h1>Guidance: {product.guidance}</h1>
//       <button>Update</button>
//       <button>Delete</button>
//     </>
//   );
// };

// export default Addproducts;
