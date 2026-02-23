import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { productApi } from '../api/client';

export default function SearchBar({ className = '' }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Debounce search suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        fetchSuggestions(searchQuery.trim());
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (keyword) => {
    setLoading(true);
    try {
      const response = await productApi.getSearchSuggestions(keyword);
      setSuggestions(response.data.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(response.data.length > 0);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e, query = null) => {
    e?.preventDefault();
    const searchTerm = query || searchQuery;
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchQuery('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(null, suggestion.name);
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex-1 max-w-2xl ${className}`} ref={searchRef}>
      <div className="relative flex w-full">
        <input
          type="text"
          placeholder="Search for products, brands and more..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value.trim().length >= 2) {
              setShowSuggestions(true);
            } else {
              setShowSuggestions(false);
            }
          }}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className="flex-1 px-4 py-2.5 bg-[#2f2f2f] border border-[#424242] border-r-0 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          type="submit"
          className="px-6 py-2.5 bg-emerald-600 text-white rounded-r-lg hover:bg-emerald-700 transition-colors"
        >
          <FaSearch />
        </button>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (searchQuery.trim().length >= 2) && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-[#2f2f2f] border border-[#424242] rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
        >
          {loading ? (
            <div className="p-4 text-center text-gray-400">
              <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : suggestions.length > 0 ? (
            <>
              <div className="p-2">
                <p className="text-xs text-gray-500 px-3 py-2">Suggestions</p>
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSuggestionClick(product)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#3a3a3a] transition-colors text-left"
                  >
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-[#3a3a3a] rounded flex items-center justify-center">
                        <FaSearch className="text-gray-500 text-xs" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-400 truncate">
                        {product.brand} • ₹{Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="border-t border-[#424242] p-2">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="w-full px-3 py-2 text-emerald-400 hover:bg-[#3a3a3a] rounded-lg text-sm font-medium transition-colors"
                >
                  Search for "{searchQuery}"
                </button>
              </div>
            </>
          ) : searchQuery.trim().length >= 2 ? (
            <div className="p-4 text-center text-gray-400 text-sm">
              No products found for "{searchQuery}"
            </div>
          ) : null}
        </div>
      )}
    </form>
  );
}


