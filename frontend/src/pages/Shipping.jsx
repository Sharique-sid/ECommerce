import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTruck, 
  FaClock, 
  FaMapMarkerAlt, 
  FaBox,
  FaCheckCircle,
  FaPlane,
  FaShippingFast
} from 'react-icons/fa';

export default function Shipping() {
  const deliveryOptions = [
    {
      icon: FaTruck,
      title: 'Standard Delivery',
      time: '3-5 Business Days',
      price: 'FREE on orders above ₹499',
      desc: 'Regular delivery for all pin codes'
    },
    {
      icon: FaShippingFast,
      title: 'Express Delivery',
      time: '1-2 Business Days',
      price: '₹99',
      desc: 'Available in select cities'
    },
    {
      icon: FaPlane,
      title: 'Same Day Delivery',
      time: 'Within 24 Hours',
      price: '₹149',
      desc: 'Available in metro cities only'
    }
  ];

  const zones = [
    { zone: 'Metro Cities', cities: 'Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad', days: '1-3 days' },
    { zone: 'Tier 1 Cities', cities: 'Pune, Ahmedabad, Jaipur, Lucknow, etc.', days: '2-4 days' },
    { zone: 'Tier 2 Cities', cities: 'Other major cities', days: '3-5 days' },
    { zone: 'Remote Areas', cities: 'Rural and remote locations', days: '5-7 days' },
  ];

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Shipping Information</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Shipping Information</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Fast and reliable delivery across India. Track your orders in real-time.
          </p>
        </div>

        {/* Delivery Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {deliveryOptions.map((option, index) => (
            <div key={index} className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 hover:border-emerald-500/50 transition-colors">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                <option.icon className="text-2xl text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <FaClock className="text-emerald-500" />
                <span>{option.time}</span>
              </div>
              <p className="text-emerald-500 font-medium mb-2">{option.price}</p>
              <p className="text-sm text-gray-500">{option.desc}</p>
            </div>
          ))}
        </div>

        {/* Delivery Zones */}
        <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Delivery Zones & Timelines</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#424242]">
                  <th className="text-left px-4 py-3 font-semibold text-gray-300">Zone</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-300">Coverage</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-300">Delivery Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#424242]">
                {zones.map((zone, index) => (
                  <tr key={index} className="hover:bg-[#3a3a3a] transition-colors">
                    <td className="px-4 py-3 font-medium text-white">{zone.zone}</td>
                    <td className="px-4 py-3 text-gray-400">{zone.cities}</td>
                    <td className="px-4 py-3">
                      <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                        {zone.days}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shipping Policy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaBox className="text-emerald-500" /> Packaging
            </h2>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                <span>All products are securely packaged to prevent damage</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                <span>Fragile items are packed with extra protection</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                <span>Eco-friendly packaging materials used</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                <span>Tamper-proof sealing for security</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-emerald-500" /> Tracking
            </h2>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                <span>Real-time tracking updates via SMS & Email</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                <span>Track orders in "My Orders" section</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                <span>Live delivery partner location on map</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                <span>Delivery confirmation with OTP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#2f2f2f] border border-[#424242] rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Have Questions?</h3>
          <p className="text-gray-400 mb-6">Check our FAQ or contact our support team</p>
          <div className="flex gap-4 justify-center">
            <Link to="/faq" className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors">
              View FAQ
            </Link>
            <Link to="/contact" className="border border-[#424242] text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-[#3a3a3a] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
