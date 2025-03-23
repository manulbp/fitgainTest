import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-gray-300'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-7">
      <h1 className='font-bold'>Fit-gain</h1>
      <ul className='flex gap-4'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Products</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
      </div>


    </div>
  )
}

