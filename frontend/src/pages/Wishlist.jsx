import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  // Mock wishlist data - in a real app, this would come from context/state
  const wishlistItems = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 129900, category: 'Electronics', rating: 4.9, imageUrl: 'https://via.placeholder.com/300x300?text=iPhone15' },
    { id: 2, name: 'Nike Air Max 2024', price: 12999, category: 'Fashion', rating: 4.7, imageUrl: 'https://via.placeholder.com/300x300?text=Nike' },
    { id: 3, name: 'Sony WH-1000XM5', price: 29990, category: 'Electronics', rating: 4.8, imageUrl: 'https://via.placeholder.com/300x300?text=Sony' },
  ];

  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#212121] py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center py-16">
            <FaHeart className="text-6xl text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Your wishlist is empty</h1>
            <p className="text-gray-400 mb-8">Save items you love by clicking the heart icon on any product.</p>
            <Link to="/products" className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-600 transition-colors">
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Wishlist</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8">
          <FaHeart className="inline text-red-500 mr-3" />
          My Wishlist ({wishlistItems.length} items)
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map(item => (
            <div key={item.id} className="bg-[#2f2f2f] rounded-xl border border-[#424242] overflow-hidden group hover:border-emerald-500/50 transition-all">
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 w-9 h-9 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                  <FaHeart />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-emerald-500 mb-1">{item.category}</p>
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-white mb-2 hover:text-emerald-400 transition-colors">{item.name}</h3>
                </Link>
                <div className="flex items-center gap-1 mb-3">
                  <FaStar className="text-yellow-500 text-sm" />
                  <span className="text-sm text-gray-400">{item.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white">₹{item.price.toLocaleString()}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-emerald-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors text-sm"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button className="w-10 h-10 border border-[#424242] rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
