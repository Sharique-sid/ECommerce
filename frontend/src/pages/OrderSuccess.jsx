import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTruck, FaEnvelope, FaHome } from 'react-icons/fa';

export default function OrderSuccess() {
  const orderId = 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <FaCheckCircle className="text-5xl text-emerald-500" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-400 text-lg mb-8">Thank you for shopping with ShopHub</p>

          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-8 mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-gray-400">Order ID:</span>
              <span className="text-white font-mono font-bold text-lg">{orderId}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <FaEnvelope className="text-3xl text-emerald-500 mx-auto mb-3" />
                <h3 className="font-medium text-white mb-1">Confirmation Email</h3>
                <p className="text-sm text-gray-400">We've sent order details to your email</p>
              </div>
              <div className="p-4">
                <FaTruck className="text-3xl text-emerald-500 mx-auto mb-3" />
                <h3 className="font-medium text-white mb-1">Delivery by Dec 5</h3>
                <p className="text-sm text-gray-400">Track your order anytime</p>
              </div>
              <div className="p-4">
                <FaHome className="text-3xl text-emerald-500 mx-auto mb-3" />
                <h3 className="font-medium text-white mb-1">Delivery Address</h3>
                <p className="text-sm text-gray-400">Delhi, India</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/track-order"
              className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
            >
              Track Order
            </Link>
            <Link
              to="/products"
              className="border border-[#424242] text-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-[#2f2f2f] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="mt-12 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <p className="text-gray-300">
              Need help with your order?{' '}
              <Link to="/contact" className="text-emerald-500 hover:text-emerald-400">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
