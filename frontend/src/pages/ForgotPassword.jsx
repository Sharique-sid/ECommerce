import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#212121] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-4xl text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Check Your Email</h1>
          <p className="text-gray-400 mb-8">
            We've sent a password reset link to <span className="text-white font-medium">{email}</span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Didn't receive the email? Check your spam folder or{' '}
            <button onClick={() => setSubmitted(false)} className="text-emerald-500 hover:text-emerald-400">
              try again
            </button>
          </p>
          <Link to="/login" className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#212121] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <Link to="/login" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <FaArrowLeft /> Back to Login
        </Link>

        <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
            <p className="text-gray-400">No worries! Enter your email and we'll send you a reset link.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            <button type="submit" className="w-full bg-emerald-500 text-white py-4 rounded-xl font-semibold hover:bg-emerald-600 transition-colors">
              Send Reset Link
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Remember your password?{' '}
            <Link to="/login" className="text-emerald-500 hover:text-emerald-400 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
