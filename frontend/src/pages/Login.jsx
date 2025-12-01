import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] flex items-center justify-center p-4">
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

        {/* Login Card */}
        <div className="bg-[#2f2f2f] rounded-2xl border border-[#424242] p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400 mb-8">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pl-12 bg-[#212121] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-[#212121] border-[#424242] text-emerald-500 focus:ring-emerald-500" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-emerald-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#424242]"></div>
            <span className="text-sm text-gray-500">Or continue with</span>
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

          {/* Register Link */}
          <p className="text-center mt-6 text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-500 font-medium hover:underline">
              Create Account
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
