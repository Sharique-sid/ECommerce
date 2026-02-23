import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import ErrorInfoButton from '../components/ErrorInfoButton';

export default function NotFound() {
  const errorReason = "The page you're looking for doesn't exist. This could be because: the URL was mistyped, the page was moved or removed, or the link you followed is broken. Please check the URL and try again, or navigate using the menu.";

  return (
    <div className="min-h-screen bg-[#212121] flex items-center justify-center p-4">
      <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-8 max-w-md text-center">
        <FaExclamationTriangle className="text-5xl text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
          404 - Page Not Found
          <ErrorInfoButton reason={errorReason} size="md" />
        </h1>
        <p className="text-gray-400 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-emerald-600 transition-colors"
          >
            <FaHome /> Go to Home
          </Link>
          <Link
            to="/products"
            className="border border-[#424242] text-gray-300 px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-[#3a3a3a] transition-colors"
          >
            <FaSearch /> Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}


