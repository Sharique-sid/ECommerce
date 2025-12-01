import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaTruck, FaShieldAlt, FaUndo, FaMinus, FaPlus, FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import api from '../api/client';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#212121] py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
            <div className="bg-[#2f2f2f] rounded-xl h-96"></div>
            <div className="space-y-4">
              <div className="bg-[#2f2f2f] h-8 rounded w-3/4"></div>
              <div className="bg-[#2f2f2f] h-6 rounded w-1/4"></div>
              <div className="bg-[#2f2f2f] h-24 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#212121] py-8">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
          <Link to="/products" className="text-emerald-500 hover:text-emerald-400">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-emerald-500">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] overflow-hidden mb-4">
              <img
                src={product.imageUrl || 'https://via.placeholder.com/500x500?text=Product'}
                alt={product.name}
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <span className="text-emerald-500 text-sm font-medium">{product.category}</span>
            <h1 className="text-3xl font-bold text-white mt-2 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(product.rating || 4.5) ? 'text-yellow-500' : 'text-gray-600'} />
                ))}
              </div>
              <span className="text-gray-400">{product.rating || 4.5} ({product.reviewCount || 0} reviews)</span>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-white">₹{Number(product.price).toLocaleString()}</span>
              <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-300">Quantity:</span>
              <div className="flex items-center bg-[#2f2f2f] rounded-xl border border-[#424242]">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-gray-400 hover:text-white">
                  <FaMinus />
                </button>
                <span className="px-4 py-2 text-white font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-gray-400 hover:text-white">
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${
                  addedToCart
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                }`}
              >
                {addedToCart ? (
                  <>
                    <FaCheckCircle /> Added to Cart
                  </>
                ) : (
                  <>
                    <FaShoppingCart /> Add to Cart
                  </>
                )}
              </button>
              <button className="w-14 h-14 border border-[#424242] rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors">
                <FaHeart className="text-xl" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-4 text-center">
                <FaTruck className="text-2xl text-emerald-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Free Delivery</p>
              </div>
              <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-4 text-center">
                <FaShieldAlt className="text-2xl text-emerald-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">1 Year Warranty</p>
              </div>
              <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-4 text-center">
                <FaUndo className="text-2xl text-emerald-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">10 Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
          <h2 className="text-xl font-bold text-white mb-4">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
            <div className="flex">
              <span className="w-32 text-gray-500">Brand:</span>
              <span className="text-white">{product.brand || 'ShopHub'}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500">Category:</span>
              <span className="text-white">{product.category}</span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500">Stock:</span>
              <span className={product.stock > 0 ? 'text-emerald-500' : 'text-red-500'}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </span>
            </div>
            <div className="flex">
              <span className="w-32 text-gray-500">SKU:</span>
              <span className="text-white">SKU-{product.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
