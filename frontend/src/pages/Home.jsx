import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMobileAlt, 
  FaLaptop, 
  FaTshirt, 
  FaCouch, 
  FaGem,
  FaBaby,
  FaArrowRight,
  FaStar,
  FaBolt,
  FaPercent,
  FaShippingFast
} from 'react-icons/fa';
import { productApi } from '../api/client';
import { useCart } from '../context/CartContext';

const categories = [
  { name: 'Mobiles', icon: FaMobileAlt, path: '/products?category=Electronics' },
  { name: 'Electronics', icon: FaLaptop, path: '/products?category=Electronics' },
  { name: 'Fashion', icon: FaTshirt, path: '/products?category=Fashion' },
  { name: 'Home', icon: FaCouch, path: '/products?category=Home' },
  { name: 'Beauty', icon: FaGem, path: '/products?category=Beauty' },
  { name: 'Accessories', icon: FaBaby, path: '/products?category=Accessories' },
];

const banners = [
  {
    id: 1,
    title: 'Mega Electronics Sale',
    subtitle: 'Up to 70% Off on Gadgets',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600',
  },
  {
    id: 2,
    title: 'Fashion Fiesta',
    subtitle: 'New Arrivals at Best Prices',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
  },
  {
    id: 3,
    title: 'Home Makeover Sale',
    subtitle: 'Transform Your Space',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productApi.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const ProductCard = ({ product }) => (
    <Link to={`/product/${product.id}`} className="product-card group">
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl || `https://picsum.photos/seed/${product.id}/300/300`}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.rating >= 4.5 && (
          <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
            Bestseller
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-2 right-2 bg-emerald-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-emerald-600"
        >
          <FaShippingFast />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
        <h3 className="font-medium text-white truncate">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
            {product.rating} <FaStar className="text-[10px]" />
          </span>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-white">₹{Math.round(product.price * 83).toLocaleString()}</span>
          <span className="text-sm text-gray-500 line-through">₹{Math.round(product.price * 83 * 1.4).toLocaleString()}</span>
          <span className="text-sm text-emerald-500 font-medium">40% off</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Free Delivery</p>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-[#212121]">
      {/* Hero Banner Slider */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden bg-[#1a1a1a]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="h-full flex items-center">
              <div className="container flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{banner.title}</h1>
                  <p className="text-xl md:text-2xl text-gray-400 mb-6">{banner.subtitle}</p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    Shop Now <FaArrowRight />
                  </Link>
                </div>
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="hidden md:block w-80 h-64 object-cover rounded-xl border border-[#2f2f2f]"
                />
              </div>
            </div>
          </div>
        ))}
        {/* Banner Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentBanner ? 'bg-emerald-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-8">
        <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
          <h2 className="text-xl font-bold text-white mb-6">Shop by Category</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="flex flex-col items-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#424242] flex items-center justify-center text-emerald-500 text-xl mb-2 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <category.icon />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="container py-4">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaBolt className="text-2xl text-yellow-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Flash Deals</h2>
                <p className="text-sm text-emerald-200">Ends in 23:59:59</p>
              </div>
            </div>
            <Link
              to="/products?deal=flash"
              className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="bg-white/10 rounded-lg p-4 animate-pulse">
                  <div className="w-full h-28 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 bg-white/20 rounded w-2/3"></div>
                </div>
              ))
            ) : (
              products.slice(0, 5).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg p-3 hover:shadow-xl transition-all"
                >
                  <img
                    src={product.imageUrl || `https://picsum.photos/seed/${product.id}/200/200`}
                    alt={product.name}
                    className="w-full h-28 object-cover rounded mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800 truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-gray-800">₹{Math.round(product.price * 83).toLocaleString()}</span>
                    <span className="text-xs bg-red-100 text-red-600 px-1 rounded">40% OFF</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-8">
        <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Featured Products</h2>
            <Link
              to="/products"
              className="flex items-center gap-2 text-emerald-500 font-medium hover:text-emerald-400"
            >
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="skeleton rounded-xl h-72"></div>
              ))
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="container py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#2f2f2f] border border-[#424242] rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <FaPercent className="text-3xl text-emerald-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Bank Offers</h3>
            <p className="text-sm text-gray-400 mb-4">Get 10% instant discount on HDFC cards</p>
            <Link to="/products" className="text-emerald-500 text-sm font-medium hover:underline">
              Shop Now →
            </Link>
          </div>
          <div className="bg-[#2f2f2f] border border-[#424242] rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <FaShippingFast className="text-3xl text-emerald-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Free Delivery</h3>
            <p className="text-sm text-gray-400 mb-4">On orders above ₹499</p>
            <Link to="/products" className="text-emerald-500 text-sm font-medium hover:underline">
              Shop Now →
            </Link>
          </div>
          <div className="bg-[#2f2f2f] border border-[#424242] rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <FaBolt className="text-3xl text-emerald-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Daily Deals</h3>
            <p className="text-sm text-gray-400 mb-4">New deals every hour</p>
            <Link to="/products" className="text-emerald-500 text-sm font-medium hover:underline">
              Shop Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="container py-8">
        <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Top Brands</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Puma'].map((brand) => (
              <Link
                key={brand}
                to={`/products?brand=${brand}`}
                className="text-2xl font-bold text-gray-600 hover:text-emerald-500 transition-colors"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#1a1a1a] border-t border-[#2f2f2f] py-12">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-gray-400 mb-6">Get exclusive offers and updates delivered to your inbox</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-[#2f2f2f] border border-[#424242] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
