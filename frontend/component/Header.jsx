import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-gray-400 shadow-sm">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-gray-800"><i>Fit-Gain</i></Link>
        
        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-6">
            <li><Link to="/" className="text-gray-800 hover:text-gray-900">Home</Link></li>
            <li><Link to="/product" className="text-gray-800 hover:text-gray-900">Products</Link></li>
            <li><Link to="/items" className="text-gray-800 hover:text-gray-900">Fitness Collection</Link></li>
            <li><Link to="/orders" className="text-gray-800 hover:text-gray-900">Orders</Link></li>
            <li><Link to="/contact" className="text-gray-800 hover:text-gray-900">Contact Us</Link></li>
            
          </ul>
        </nav>
        
        {/* Right side icons and button */}
        <div className="flex items-center gap-4">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-3 py-1 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 text-sm"

            />
            <button type="submit" className="absolute left-2 top-1.5 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
          
          {/* Cart icon */}
          <Link to="/cart" className="p-2" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>
          
          {/* Sign in button */}
          <Link to="/signin" className="ml-2 px-4 py-1 border border-gray-600 rounded text-sm">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  )
}
