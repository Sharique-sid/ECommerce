import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStore, FaRocket, FaChartLine, FaHeadset, FaPercent, FaTruck, FaUsers, FaGlobe, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { sellerApplicationApi } from '../api/client';
import { toast } from 'react-toastify';
import { errorToast } from '../components/ErrorToast';
import ErrorInfoButton from '../components/ErrorInfoButton';

export default function Seller() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '', businessType: '', gstNumber: '', businessAddress: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info('Please login to apply as a seller');
      navigate('/login');
    } else if (user && !user.id) {
      // User is logged in but missing ID - need to re-login
      console.warn('User object missing ID:', user);
      toast.warning('Please logout and login again to refresh your session');
    }
  }, [isAuthenticated, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.businessType) newErrors.businessType = 'Please select a business type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Get user ID - check multiple possible fields
    const userId = user?.id;
    
    if (!userId) {
      console.error('User object:', user);
      console.error('User ID missing. Full user object:', JSON.stringify(user, null, 2));
      errorToast('User ID not found. Please logout and login again to refresh your session.', null, {
        reason: 'Your session is missing the user ID. This can happen if you logged in before the session format was updated. Please logout and login again to refresh your session with the correct user information.'
      });
      return;
    }

    console.log('Submitting seller application for user ID:', userId);
    setLoading(true);
    try {
      const applicationData = {
        businessName: formData.businessName,
        businessType: formData.businessType,
        gstNumber: formData.gstNumber || null,
        businessAddress: formData.businessAddress || null
      };
      console.log('Application data:', applicationData);
      console.log('API URL will be:', `http://localhost:8081/api/seller-applications?userId=${userId}`);
      
      const response = await sellerApplicationApi.createApplication(userId, applicationData);
      console.log('Application response:', response);
      toast.success('Application submitted successfully! Admin will review it soon.');
      setSubmitted(true);
    } catch (error) {
      console.error('Seller application error:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      if (error.response?.status === 404) {
        errorToast('API endpoint not found (404)', error, {
          reason: 'The backend API endpoint is not found. Please ensure the backend server is running on port 8081 and the endpoint exists.'
        });
      } else if (error.response?.status === 500) {
        const errorMsg = error.response?.data?.message || 'Server error. User may already have an application.';
        errorToast(errorMsg, error);
      } else {
        const errorMsg = error.response?.data?.message || error.message || 'Failed to submit application';
        errorToast(errorMsg, error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#212121] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-4xl text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Application Submitted!</h1>
          <p className="text-gray-400 mb-6">
            Your seller application has been submitted successfully. Our admin team will review it and get back to you soon.
          </p>
          <Link to="/" className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: FaUsers, value: '10L+', label: 'Active Sellers' },
    { icon: FaGlobe, value: '19,000+', label: 'Pin Codes Served' },
    { icon: FaTruck, value: '1 Cr+', label: 'Daily Orders' }
  ];

  const benefits = [
    { icon: FaRocket, title: 'Quick Onboarding', desc: 'Start selling within 24 hours of registration' },
    { icon: FaChartLine, title: 'Growth Tools', desc: 'Analytics and insights to grow your business' },
    { icon: FaPercent, title: '0% Commission', desc: 'No commission on your first 100 sales' },
    { icon: FaHeadset, title: '24/7 Support', desc: 'Dedicated seller support team' }
  ];

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Become a Seller</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Start Selling on ShopHub</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Join millions of sellers and reach crores of customers across India</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 text-center">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-2xl text-emerald-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/30 p-8 text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">0% Commission on First 100 Sales!</h2>
          <p className="text-gray-300">Limited time offer for new sellers. Register now!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
              <benefit.icon className="text-2xl text-emerald-500 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-400">{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-[#2f2f2f] rounded-xl border border-[#424242] p-8">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            <FaStore className="inline mr-2 text-emerald-500" />
            Seller Application
          </h2>
          <p className="text-gray-400 text-center mb-6 text-sm">
            Apply to become a seller. Admin will review your application.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Business Name <span className="text-red-500">*</span></label>
              <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500" placeholder="Your Business Name" required />
              {errors.businessName && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  {errors.businessName}
                  <ErrorInfoButton 
                    variant="inline" 
                    size="sm" 
                    reason="Business name is required to identify your business. Please enter your registered or trading business name."
                  />
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Business Type <span className="text-red-500">*</span></label>
              <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500" required>
                <option value="">Select Business Type</option>
                <option value="individual">Individual</option>
                <option value="proprietorship">Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="pvt_ltd">Private Limited</option>
              </select>
              {errors.businessType && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  {errors.businessType}
                  <ErrorInfoButton 
                    variant="inline" 
                    size="sm" 
                    reason="Please select your business type from the dropdown. This helps us understand your business structure for tax and legal purposes."
                  />
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">GST Number (Optional)</label>
              <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500" placeholder="22AAAAA0000A1Z5" />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Business Address (Optional)</label>
              <textarea name="businessAddress" value={formData.businessAddress} onChange={handleChange} rows="3" className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500" placeholder="Enter your business address" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-emerald-500 text-white py-4 rounded-xl font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl border border-purple-500/30 p-8 text-center mt-12">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Grow Your Business?</h2>
          <p className="text-gray-300">Join ShopHub today and unlock your full potential.</p>
        </div>
      </div>
    </div>
  );
}
