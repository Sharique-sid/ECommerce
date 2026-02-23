import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaUser, 
  FaSearch, 
  FaHeart, 
  FaBars, 
  FaTimes,
  FaChevronDown,
  FaSignOutAlt,
  FaBox,
  FaMapMarkerAlt,
  FaCog
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

export default function Header() {
  const { user, logout } = useAuth();
  const { cartCount, wishlist } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const categories = [
    { name: 'Electronics', path: '/products?category=Electronics' },
    { name: 'Fashion', path: '/products?category=Fashion' },
    { name: 'Home', path: '/products?category=Home' },
    { name: 'Accessories', path: '/products?category=Accessories' },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#1a1a1a] border-b border-[#2f2f2f]">
        <div className="container py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-emerald-500" /> Deliver to: Delhi, India
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-gray-400">
            {(user?.role === 'ADMIN' || user?.role === 'SELLER') && (
              <Link to="/admin" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                <FaCog className="text-xs" /> {user?.role === 'ADMIN' ? 'Admin Panel' : 'Seller Dashboard'}
              </Link>
            )}
            <span className="text-gray-600">|</span>
            <Link to="/seller" className="hover:text-white transition-colors">Become a Seller</Link>
            <span className="text-gray-600">|</span>
            <Link to="/faq" className="hover:text-white transition-colors">Help Center</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-[#212121] border-b border-[#2f2f2f]">
        <div className="container py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-2xl text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white">Shop</span>
                <span className="text-2xl font-bold text-emerald-500">Hub</span>
              </div>
            </Link>

            {/* Search Bar with Autocomplete */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <SearchBar />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-5">
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaUser className="text-lg" />
                  <span className="hidden md:block text-sm">
                    {user ? user.name || 'Account' : 'Login'}
                  </span>
                  <FaChevronDown className="hidden md:block text-xs" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#2f2f2f] rounded-xl border border-[#424242] py-2 z-50 shadow-xl">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-[#424242]">
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-[#424242] hover:text-white transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FaUser /> My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-[#424242] hover:text-white transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FaBox /> Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-[#424242] hover:text-white transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FaHeart /> Wishlist
                        </Link>
                        {(user.role === 'ADMIN' || user.role === 'SELLER') && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-3 px-4 py-2.5 text-emerald-400 hover:bg-[#424242] hover:text-emerald-300 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <FaCog /> {user.role === 'ADMIN' ? 'Admin Panel' : 'Seller Dashboard'}
                          </Link>
                        )}
                        <div className="border-t border-[#424242] mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-[#424242] w-full text-left transition-colors"
                          >
                            <FaSignOutAlt /> Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-3 border-b border-[#424242]">
                          <p className="text-sm text-gray-300">Welcome</p>
                          <p className="text-xs text-gray-500">Access account and manage orders</p>
                        </div>
                        <div className="p-3">
                          <Link
                            to="/login"
                            className="block w-full py-2.5 text-center bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Login / Signup
                          </Link>
                        </div>
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-[#424242] hover:text-white transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FaBox /> Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-[#424242] hover:text-white transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FaHeart /> Wishlist
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative text-gray-400 hover:text-white transition-colors">
                <FaHeart className="text-lg" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <FaShoppingCart className="text-lg" />
                <span className="hidden md:block text-sm">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 left-3 md:left-auto md:-right-2 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <SearchBar />
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="hidden lg:block border-t border-[#2f2f2f]">
          <div className="container">
            <ul className="flex items-center gap-8 py-2.5 text-sm">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/products" className="text-emerald-500 font-medium">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[120px] bg-[#212121] z-40 overflow-y-auto border-t border-[#2f2f2f]">
          <div className="p-4">
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="block py-3 px-4 text-gray-300 hover:bg-[#2f2f2f] rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/products"
                  className="block py-3 px-4 bg-emerald-600/20 text-emerald-500 rounded-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
