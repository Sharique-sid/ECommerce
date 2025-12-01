import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowRight, FaTag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#212121] py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center py-16">
            <FaShoppingBag className="text-6xl text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-600 transition-colors">
              Start Shopping
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
          <span className="text-gray-300">Cart</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart ({cartItems.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-4 flex gap-4">
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/100x100?text=Product'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <Link to={`/product/${item.id}`} className="font-semibold text-white hover:text-emerald-400 transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-[#3a3a3a] rounded-lg border border-[#424242]">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-2 text-gray-400 hover:text-white"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="px-3 py-2 text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 text-gray-400 hover:text-white"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                    <span className="text-xl font-bold text-white">₹{(Number(item.price) * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors self-start p-2"
                >
                  <FaTrash />
                </button>
              </div>
            ))}

            <button onClick={clearCart} className="text-red-500 hover:text-red-400 text-sm">
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              {/* Coupon */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="w-full pl-10 pr-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button className="px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-lg text-emerald-500 font-medium hover:bg-[#424242] transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-[#424242]">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-emerald-500">FREE</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>₹{Math.round(cartTotal * 0.18).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-white mb-6">
                <span>Total</span>
                <span>₹{Math.round(cartTotal * 1.18).toLocaleString()}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-emerald-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
              >
                Proceed to Checkout <FaArrowRight />
              </Link>

              <Link to="/products" className="block text-center text-emerald-500 hover:text-emerald-400 mt-4">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
