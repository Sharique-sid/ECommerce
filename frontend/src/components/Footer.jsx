import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaApple,
  FaGooglePlay,
  FaCreditCard,
  FaShieldAlt,
  FaTruck,
  FaHeadset
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-[#2f2f2f]">
      {/* Features Strip */}
      <div className="border-b border-[#2f2f2f]">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FaTruck className="text-xl text-emerald-500" />
              </div>
              <div>
                <h4 className="font-medium text-white text-sm">Free Shipping</h4>
                <p className="text-xs text-gray-500">On orders over ₹499</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FaShieldAlt className="text-xl text-emerald-500" />
              </div>
              <div>
                <h4 className="font-medium text-white text-sm">Secure Payment</h4>
                <p className="text-xs text-gray-500">100% Protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FaCreditCard className="text-xl text-emerald-500" />
              </div>
              <div>
                <h4 className="font-medium text-white text-sm">Easy Returns</h4>
                <p className="text-xs text-gray-500">10 Days Return</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FaHeadset className="text-xl text-emerald-500" />
              </div>
              <div>
                <h4 className="font-medium text-white text-sm">24/7 Support</h4>
                <p className="text-xs text-gray-500">Dedicated Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white">Shop</span>
                <span className="text-2xl font-bold text-emerald-500">Hub</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              ShopHub is your one-stop destination for quality products at amazing prices. 
              Based in Delhi, we serve customers across India with fast delivery and 
              excellent customer service.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-[#2f2f2f] rounded-lg flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
                <FaFacebook />
              </a>
              <a href="#" className="w-9 h-9 bg-[#2f2f2f] rounded-lg flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
                <FaTwitter />
              </a>
              <a href="#" className="w-9 h-9 bg-[#2f2f2f] rounded-lg flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
                <FaInstagram />
              </a>
              <a href="#" className="w-9 h-9 bg-[#2f2f2f] rounded-lg flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-emerald-500 transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-emerald-500 transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Electronics" className="text-gray-400 hover:text-emerald-500 transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=Fashion" className="text-gray-400 hover:text-emerald-500 transition-colors">Fashion</Link></li>
              <li><Link to="/products?category=Home" className="text-gray-400 hover:text-emerald-500 transition-colors">Home & Living</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-emerald-500 transition-colors">My Cart</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/contact" className="text-gray-400 hover:text-emerald-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-emerald-500 transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-emerald-500 transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-emerald-500 transition-colors">Returns & Exchange</Link></li>
              <li><Link to="/track-order" className="text-gray-400 hover:text-emerald-500 transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-emerald-500 transition-colors">Support Center</Link></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-white font-semibold mb-4">Download App</h3>
            <p className="text-sm text-gray-400 mb-4">Get exclusive app-only deals</p>
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-3 bg-[#2f2f2f] rounded-lg px-4 py-2.5 hover:bg-[#3a3a3a] transition-colors">
                <FaApple className="text-xl text-gray-300" />
                <div>
                  <p className="text-[10px] text-gray-500">Download on the</p>
                  <p className="text-sm font-medium text-white">App Store</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-[#2f2f2f] rounded-lg px-4 py-2.5 hover:bg-[#3a3a3a] transition-colors">
                <FaGooglePlay className="text-xl text-gray-300" />
                <div>
                  <p className="text-[10px] text-gray-500">Get it on</p>
                  <p className="text-sm font-medium text-white">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2f2f2f]">
        <div className="container py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 ShopHub. All rights reserved. Delhi, India
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-emerald-500 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-emerald-500 transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-emerald-500 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
