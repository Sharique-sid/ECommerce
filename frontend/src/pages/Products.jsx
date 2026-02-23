import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaShoppingCart, FaHeart, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import api, { productApi } from '../api/client';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Accessories'];

  // Update state when URL parameters change
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      // If search query exists, use backend search API
      if (searchQuery && searchQuery.trim()) {
        response = await productApi.searchProducts(searchQuery.trim());
      } else {
        // Otherwise, fetch all products or filter by category
        if (selectedCategory && selectedCategory !== 'All') {
          response = await productApi.getProductsByCategory(selectedCategory);
        } else {
          response = await productApi.getAllProducts();
        }
      }
      
      let fetchedProducts = response.data;
      
      // Apply category filter if category is selected and we have a search query
      if (selectedCategory && selectedCategory !== 'All' && searchQuery && searchQuery.trim()) {
        fetchedProducts = fetchedProducts.filter(p => p.category === selectedCategory);
      }
      
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Products</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 bg-[#2f2f2f] border border-[#424242] px-4 py-3 rounded-xl text-white">
            <FaFilter /> Filters
          </button>

          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}>
            <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="lg:hidden text-gray-400 hover:text-white">
                  <FaTimes />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        // Update URL parameter
                        const newSearchParams = new URLSearchParams(searchParams);
                        if (cat === 'All') {
                          newSearchParams.delete('category');
                        } else {
                          newSearchParams.set('category', cat);
                        }
                        setSearchParams(newSearchParams);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat
                          ? 'bg-emerald-500 text-white'
                          : 'text-gray-400 hover:bg-[#3a3a3a] hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-[#3a3a3a] border border-[#424242] rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                  // Update URL parameter
                  const newSearchParams = new URLSearchParams(searchParams);
                  if (value.trim()) {
                    newSearchParams.set('search', value);
                  } else {
                    newSearchParams.delete('search');
                  }
                  setSearchParams(newSearchParams);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    // Trigger search when Enter is pressed
                    fetchProducts();
                  }
                }}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 bg-[#2f2f2f] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Results Count */}
            <p className="text-gray-400 mb-6">
              Showing {filteredProducts.length} products
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-4 animate-pulse">
                    <div className="bg-[#3a3a3a] h-48 rounded-lg mb-4"></div>
                    <div className="bg-[#3a3a3a] h-4 rounded mb-2"></div>
                    <div className="bg-[#3a3a3a] h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No products found</p>
                <button 
                  onClick={() => { 
                    setSearchQuery(''); 
                    setSelectedCategory('All');
                    // Clear URL parameters
                    setSearchParams({});
                  }} 
                  className="mt-4 text-emerald-500 hover:text-emerald-400"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-[#2f2f2f] rounded-xl border border-[#424242] overflow-hidden group hover:border-emerald-500/50 transition-all">
                    <Link to={`/product/${product.id}`} className="block relative">
                      <img
                        src={product.imageUrl || 'https://via.placeholder.com/300x300?text=Product'}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button className="absolute top-3 right-3 w-9 h-9 bg-[#2f2f2f]/80 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-colors">
                        <FaHeart />
                      </button>
                    </Link>
                    <div className="p-4">
                      <Link to={`/product/${product.id}`}>
                        <p className="text-xs text-emerald-500 mb-1">{product.category}</p>
                        <h3 className="font-semibold text-white mb-2 line-clamp-2 hover:text-emerald-400 transition-colors">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        <FaStar className="text-yellow-500" />
                        <span className="text-sm text-gray-400">{product.rating || '4.5'}</span>
                        <span className="text-xs text-gray-500">({product.reviewCount || 0} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-white">₹{Number(product.price).toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
                        >
                          <FaShoppingCart />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
