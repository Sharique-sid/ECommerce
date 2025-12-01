import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUndo, 
  FaExchangeAlt, 
  FaClock, 
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaBox,
  FaTruck
} from 'react-icons/fa';

export default function Returns() {
  const steps = [
    { icon: FaBox, title: 'Request Return', desc: 'Go to My Orders and select the item to return' },
    { icon: FaClock, title: 'Schedule Pickup', desc: 'Choose a convenient date and time slot' },
    { icon: FaTruck, title: 'Pack & Handover', desc: 'Pack the item and hand it to our delivery partner' },
    { icon: FaMoneyBillWave, title: 'Get Refund', desc: 'Refund processed within 5-7 business days' },
  ];

  const returnableItems = [
    'Clothing & Accessories',
    'Footwear',
    'Electronics (with original packaging)',
    'Home & Kitchen items',
    'Books & Stationery',
    'Toys & Games',
  ];

  const nonReturnableItems = [
    'Innerwear & Lingerie',
    'Customized/Personalized items',
    'Perishable goods',
    'Digital products',
    'Items with broken seal (hygiene products)',
    'Items marked as non-returnable',
  ];

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Returns & Exchange</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Returns & Exchange</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Easy 10-day returns. No questions asked. Your satisfaction is our priority.
          </p>
        </div>

        {/* Policy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 text-center hover:border-emerald-500/50 transition-colors">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaUndo className="text-2xl text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">10-Day Returns</h3>
            <p className="text-gray-400">Return any item within 10 days of delivery</p>
          </div>
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 text-center hover:border-emerald-500/50 transition-colors">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaExchangeAlt className="text-2xl text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Easy Exchange</h3>
            <p className="text-gray-400">Exchange for different size, color, or product</p>
          </div>
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 text-center hover:border-emerald-500/50 transition-colors">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaMoneyBillWave className="text-2xl text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Quick Refunds</h3>
            <p className="text-gray-400">Refund processed in 5-7 business days</p>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">How Returns Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500">
                  <step.icon className="text-2xl text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-[#424242]"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Returnable & Non-Returnable */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" /> Returnable Items
            </h2>
            <ul className="space-y-3">
              {returnableItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-400">
                  <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaTimesCircle className="text-red-500" /> Non-Returnable Items
            </h2>
            <ul className="space-y-3">
              {nonReturnableItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-400">
                  <FaTimesCircle className="text-red-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Conditions */}
        <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Return Conditions</h2>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>Item must be unused, unwashed, and in original condition</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>All original tags and labels must be attached</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>Original packaging must be intact (for electronics)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">•</span>
              <span>Free accessories/gifts must be returned along with the main product</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-[#2f2f2f] border border-[#424242] rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Need Help with Returns?</h3>
          <p className="text-gray-400 mb-6">Our support team is available 24/7 to assist you</p>
          <Link to="/contact" className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
