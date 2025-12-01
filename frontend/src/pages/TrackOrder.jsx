import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaBox, 
  FaTruck, 
  FaCheckCircle, 
  FaShippingFast,
  FaWarehouse,
  FaHome
} from 'react-icons/fa';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mockTrackingData = {
    orderId: 'ORD-2024-123456',
    status: 'In Transit',
    expectedDelivery: 'December 3, 2024',
    items: [
      { name: 'iPhone 15 Pro Max', quantity: 1, image: 'https://via.placeholder.com/80x80?text=iPhone' }
    ],
    timeline: [
      { status: 'Order Placed', date: 'Nov 28, 2024 10:30 AM', icon: FaBox, completed: true },
      { status: 'Order Confirmed', date: 'Nov 28, 2024 11:00 AM', icon: FaCheckCircle, completed: true },
      { status: 'Shipped from Warehouse', date: 'Nov 29, 2024 02:15 PM', icon: FaWarehouse, completed: true },
      { status: 'In Transit', date: 'Nov 30, 2024 09:00 AM', icon: FaTruck, completed: true, current: true },
      { status: 'Out for Delivery', date: 'Expected', icon: FaShippingFast, completed: false },
      { status: 'Delivered', date: 'Expected', icon: FaHome, completed: false },
    ]
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setTrackingResult(mockTrackingData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Track Order</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Track Your Order</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Enter your order ID to see the real-time status of your delivery
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleTrack} className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Order ID</label>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter order ID (e.g., ORD-2024-123456)"
                  className="w-full pl-12 pr-4 py-4 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button type="submit" disabled={isLoading} className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-medium hover:bg-emerald-600 disabled:opacity-50">
                {isLoading ? 'Tracking...' : 'Track'}
              </button>
            </div>
            {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
          </form>
        </div>

        <div className="text-center mb-8">
          <button onClick={() => { setOrderId('ORD-2024-123456'); setTrackingResult(mockTrackingData); }} className="text-sm text-emerald-500 hover:text-emerald-400 underline">
            Click here to see a demo tracking result
          </button>
        </div>

        {trackingResult && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Order ID</p>
                  <p className="text-white font-bold text-lg">{trackingResult.orderId}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span className="inline-block bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-sm font-medium">{trackingResult.status}</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Expected Delivery</p>
                  <p className="text-white font-medium">{trackingResult.expectedDelivery}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-6">Tracking Timeline</h3>
              <div className="space-y-0">
                {trackingResult.timeline.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? step.current ? 'bg-emerald-500 text-white' : 'bg-emerald-500/20 text-emerald-500' : 'bg-[#424242] text-gray-500'}`}>
                        <step.icon className="text-lg" />
                      </div>
                      {index < trackingResult.timeline.length - 1 && (
                        <div className={`w-0.5 h-16 ${step.completed ? 'bg-emerald-500/50' : 'bg-[#424242]'}`}></div>
                      )}
                    </div>
                    <div className="pb-8">
                      <p className={`font-medium ${step.current ? 'text-emerald-500' : step.completed ? 'text-white' : 'text-gray-500'}`}>{step.status}</p>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!trackingResult && (
          <div className="max-w-3xl mx-auto bg-[#2f2f2f] border border-[#424242] rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
            <p className="text-gray-400 mb-6">Contact our support team for assistance.</p>
            <Link to="/contact" className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-emerald-600">Contact Support</Link>
          </div>
        )}
      </div>
    </div>
  );
}
