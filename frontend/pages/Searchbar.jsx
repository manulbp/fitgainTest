// SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);

  // Fetch product suggestions based on query
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch("http://localhost:5080/backend/product/all");
        if (!res.ok) throw new Error("Failed to fetch products");
        
        const data = await res.json();
        
        // Filter products based on search query
        const filteredProducts = data.products.filter(product => 
          product.productname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5); // Limit to 5 suggestions
        
        setSuggestions(filteredProducts);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (searchQuery) fetchSuggestions();
    }, 300); 

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSearch} className="relative" ref={suggestionsRef}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        className="pl-10 pr-3 py-1 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 text-sm"
      />
      <button type="submit" className="absolute left-2 top-1.5 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-64 mt-1 bg-gray-200  border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto left-0">
          {loading ? (
            <div className="p-2 text-center text-gray-300 text-sm">Loading...</div>
          ) : (
            <ul>
              {suggestions.map((product) => (
                <li 
                  key={product._id}
                  onClick={() => handleSuggestionClick(product._id)}
                  className="flex items-center p-2 hover:bg-gray-400 cursor-pointer border-b border-gray-200 last:border-b-0"
                >
                  <div className="w-8 h-8 flex-shrink-0 mr-2">
                    {product.image ? (
                      <img 
                        src={`http://localhost:5080/${product.image}`}
                        alt={product.productname}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          // Use your fallback image here
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xs text-gray-500">No img</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-medium text-xs truncate">{product.productname}</p>
                    <p className="text-xs text-gray-500">${parseFloat(product.price).toFixed(2)}</p>
                  </div>
                </li>
              ))}
              <li className="p-2 text-center text-gray-700 hover:bg-gray-100 cursor-pointer border-t border-gray-200">
                <button onClick={handleSearch} className="text-xs font-medium">
                  View all results
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </form>
  );
};

export default Searchbar;
