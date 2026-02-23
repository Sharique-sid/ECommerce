import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaGoogle, FaFacebook, FaCheck, FaTimes } from 'react-icons/fa';
import { authApi } from '../api/client';
import { toast } from 'react-toastify';
import { errorToast } from '../components/ErrorToast';
import ErrorInfoButton from '../components/ErrorInfoButton';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors when user types
    if (name === 'email') setEmailError('');
    if (name === 'phone') setPhoneError('');
  };

  // Validate phone number format
  const validatePhone = (phone) => {
    if (!phone) return true; // Optional field
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, '')); // Remove non-digits and check
  };

  // Check for duplicate email/phone (debounced)
  const checkDuplicate = async (type, value) => {
    if (!value) return;
    
    try {
      // This would call an API endpoint to check duplicates
      // For now, we'll handle it in the submit handler
    } catch (error) {
      console.error('Error checking duplicate:', error);
    }
  };

  // Password validation rules
  const passwordRules = [
    { test: (p) => p.length >= 8, label: 'At least 8 characters' },
    { test: (p) => /[A-Z]/.test(p), label: 'One uppercase letter' },
    { test: (p) => /[a-z]/.test(p), label: 'One lowercase letter' },
    { test: (p) => /[0-9]/.test(p), label: 'One number' },
    { test: (p) => /[!@#$%^&*]/.test(p), label: 'One special character' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      errorToast('Please fill in all required fields', null, {
        reason: 'Name, email, and password are required fields. Please fill in all required fields to create an account.'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('Please enter a valid email address');
        errorToast('Invalid email format', null, {
          reason: 'Please enter a valid email address format (e.g., user@example.com).'
        });
      return;
    }

    // Validate phone if provided
    if (formData.phone && !validatePhone(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit phone number starting with 6-9');
        errorToast('Invalid phone number format', null, {
          reason: 'Phone number must be 10 digits and start with 6, 7, 8, or 9 (e.g., 9876543210).'
        });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
        errorToast('Passwords do not match', null, {
          reason: 'The password and confirm password fields must match. Please ensure both fields contain the same password.'
        });
      return;
    }

    if (!passwordRules.every(rule => rule.test(formData.password))) {
        errorToast('Password does not meet requirements', null, {
          reason: 'Password must contain: at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
        });
      return;
    }

    if (!agreeTerms) {
        errorToast('Please agree to the terms and conditions', null, {
          reason: 'You must agree to the terms and conditions to create an account. Please check the agreement checkbox and try again.'
        });
      return;
    }

    setLoading(true);
    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      await authApi.register({
        firstName: firstName,
        lastName: lastName,
        email: formData.email,
        phoneNumber: formData.phone,
      }, formData.password);
      toast.success('Account created successfully! Please login.');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed. Please try again.';
      
      // Handle specific error messages
      if (errorMessage.includes('Email already exists') || errorMessage.includes('email')) {
        setEmailError('This email is already registered');
        errorToast('Email already exists. Please use a different email or login.', error, {
          reason: 'An account with this email address already exists. Please use a different email or login with your existing account.'
        });
      } else if (errorMessage.includes('Phone number already registered') || errorMessage.includes('phone')) {
        setPhoneError('This phone number is already registered');
        errorToast('Phone number already exists. Please use a different number.', error, {
          reason: 'An account with this phone number already exists. Please use a different phone number or login with your existing account.'
        });
      } else {
        errorToast(errorMessage, error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center">
              <span className="text-3xl font-bold text-white">Shop</span>
              <span className="text-3xl font-bold text-emerald-500">Hub</span>
            </div>
          </Link>
        </div>

        {/* Register Card */}
        <div className="bg-[#2f2f2f] rounded-2xl border border-[#424242] p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 mb-6">Join ShopHub for the best shopping experience</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 pl-12 bg-[#212121] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 pl-12 bg-[#212121] border ${
                    emailError ? 'border-red-500' : 'border-[#424242]'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors`}
                />
              </div>
              {emailError && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  {emailError}
                  <ErrorInfoButton 
                    variant="inline" 
                    size="sm" 
                    reason={emailError === 'This email is already registered' 
                      ? 'An account with this email address already exists. Please use a different email or try logging in with your existing account.'
                      : 'Please enter a valid email address format (e.g., user@example.com).'}
                  />
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength="10"
                  className={`w-full px-4 py-3 pl-12 bg-[#212121] border ${
                    phoneError ? 'border-red-500' : 'border-[#424242]'
                  } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors`}
                />
              </div>
              {phoneError && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  {phoneError}
                  <ErrorInfoButton 
                    variant="inline" 
                    size="sm" 
                    reason={phoneError === 'This phone number is already registered'
                      ? 'An account with this phone number already exists. Please use a different phone number or login with your existing account.'
                      : 'Phone number must be 10 digits and start with 6, 7, 8, or 9 (e.g., 9876543210).'}
                  />
                </p>
              )}
              {formData.phone && !phoneError && !validatePhone(formData.phone) && (
                <p className="text-yellow-400 text-xs mt-1">Phone should be 10 digits starting with 6-9</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 pl-12 pr-12 bg-[#212121] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {formData.password && (
              <div className="p-3 bg-[#212121] rounded-xl border border-[#424242]">
                <p className="text-xs text-gray-400 mb-2">Password Requirements:</p>
                <div className="grid grid-cols-1 gap-1">
                  {passwordRules.map((rule, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center gap-2 text-xs ${rule.test(formData.password) ? 'text-emerald-400' : 'text-gray-500'}`}
                    >
                      {rule.test(formData.password) ? <FaCheck className="text-[10px]" /> : <FaTimes className="text-[10px]" />}
                      {rule.label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 pl-12 pr-12 bg-[#212121] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 rounded bg-[#212121] border-[#424242] text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-400">
                  I agree to the{' '}
                  <Link to="/terms" className="text-emerald-500 hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-emerald-500 hover:underline">Privacy Policy</Link>
                  {' '}<span className="text-red-400">*</span>
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#424242]"></div>
            <span className="text-sm text-gray-500">Or sign up with</span>
            <div className="flex-1 h-px bg-[#424242]"></div>
          </div>

          {/* Social Login */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-[#212121] border border-[#424242] rounded-xl flex items-center justify-center gap-2 text-gray-300 hover:bg-[#3a3a3a] transition-colors">
              <FaGoogle className="text-red-500" /> Google
            </button>
            <button className="flex-1 py-3 bg-[#212121] border border-[#424242] rounded-xl flex items-center justify-center gap-2 text-gray-300 hover:bg-[#3a3a3a] transition-colors">
              <FaFacebook className="text-blue-500" /> Facebook
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-500 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <p className="text-center mt-6">
          <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
