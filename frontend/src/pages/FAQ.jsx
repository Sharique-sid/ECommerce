import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

const faqData = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How can I track my order?',
        a: 'You can track your order by going to "My Orders" section in your account. Click on the order you want to track and you\'ll see real-time updates on your delivery status.'
      },
      {
        q: 'What are the delivery charges?',
        a: 'Delivery is FREE for orders above ₹499. For orders below ₹499, a nominal delivery fee of ₹40 is charged.'
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 3-5 business days. Express delivery (where available) takes 1-2 business days. Delivery time may vary based on your location.'
      },
      {
        q: 'Can I change my delivery address after placing an order?',
        a: 'You can change your delivery address before the order is shipped. Go to "My Orders", select the order, and click on "Change Address". Once shipped, the address cannot be changed.'
      }
    ]
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 10-day easy return policy. If you\'re not satisfied with your purchase, you can return it within 10 days of delivery for a full refund or exchange.'
      },
      {
        q: 'How do I return a product?',
        a: 'Go to "My Orders", select the item you want to return, click "Return", select a reason, and schedule a pickup. Our delivery partner will collect the item from your address.'
      },
      {
        q: 'When will I receive my refund?',
        a: 'Refunds are processed within 5-7 business days after we receive and verify the returned product. The amount will be credited to your original payment method.'
      },
      {
        q: 'Can I exchange a product for a different size/color?',
        a: 'Yes, you can exchange products for different sizes or colors (subject to availability). Simply initiate a return and select "Exchange" option.'
      }
    ]
  },
  {
    category: 'Payments',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Credit/Debit Cards (Visa, Mastercard, Rupay), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD).'
      },
      {
        q: 'Is it safe to save my card details?',
        a: 'Yes, we use industry-standard encryption and are PCI DSS compliant. Your card details are stored securely and never shared with third parties.'
      },
      {
        q: 'Why was my payment declined?',
        a: 'Payment can be declined due to insufficient funds, incorrect card details, or bank restrictions. Please verify your details or try a different payment method.'
      },
      {
        q: 'Can I pay using EMI?',
        a: 'Yes, we offer No Cost EMI on select products with major bank credit cards. EMI options are shown on the product page and at checkout.'
      }
    ]
  },
  {
    category: 'Account & Security',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click on "Login/Signup" at the top of the page, then select "Create Account". Enter your details and verify your email/phone to complete registration.'
      },
      {
        q: 'I forgot my password. How can I reset it?',
        a: 'Click on "Forgot Password" on the login page, enter your registered email, and we\'ll send you a password reset link.'
      },
      {
        q: 'How do I update my profile information?',
        a: 'Go to "My Account" > "Profile Settings" to update your name, email, phone number, and other personal information.'
      },
      {
        q: 'How do I delete my account?',
        a: 'To delete your account, go to "My Account" > "Settings" > "Delete Account". Note that this action is irreversible and all your data will be permanently deleted.'
      }
    ]
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredFaq = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">FAQ</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Find answers to common questions about orders, shipping, returns, and more.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 bg-[#2f2f2f] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-6">
          {filteredFaq.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-[#2f2f2f] rounded-xl border border-[#424242] overflow-hidden">
              <h2 className="bg-emerald-500/10 border-b border-[#424242] px-6 py-4 font-bold text-lg text-emerald-500">
                {category.category}
              </h2>
              <div className="divide-y divide-[#424242]">
                {category.questions.map((item, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems[key];
                  
                  return (
                    <div key={questionIndex}>
                      <button
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#3a3a3a] transition-colors"
                      >
                        <span className="font-medium text-white pr-4">{item.q}</span>
                        {isOpen ? (
                          <FaChevronUp className="text-emerald-500 flex-shrink-0" />
                        ) : (
                          <FaChevronDown className="text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-gray-400">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div className="max-w-3xl mx-auto mt-12 bg-[#2f2f2f] border border-[#424242] rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-gray-400 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
          <Link to="/contact" className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
