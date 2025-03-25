import React, { useState, useEffect } from 'react';


const URL = 'http://localhost:5060/backend/product';

const fetchHandler = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const Productlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.products) {
        setProducts(data.products);
      }
    });
  }, []); // Fetch data only once

  return (
    <>
      <h1>Product List</h1>
      <div>
        {products && products.map((product) => (
          <div key={product._id}>
            {/* Pass the _id of the product to the Addproducts component */}
            <Addproducts productId={product._id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Productlist;
