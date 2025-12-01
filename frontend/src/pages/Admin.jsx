import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { 
  FaPlus, FaEdit, FaTrash, FaBox, FaUsers, FaChartBar, 
  FaSave, FaTimes, FaSearch, FaImage, FaRupeeSign, FaLock,
  FaCheckCircle, FaTimesCircle, FaStore, FaClipboardList
} from 'react-icons/fa';
import api, { sellerApplicationApi, productApprovalApi } from '../api/client';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [sellerApplications, setSellerApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: 'Electronics',
    brand: '',
    imageUrl: '',
    rating: '4.5',
    reviewCount: '0'
  });

  const categories = ['Electronics', 'Fashion', 'Home', 'Accessories', 'Sports', 'Beauty', 'Books'];

  useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN') {
      fetchProducts();
      fetchPendingProducts();
      fetchSellerApplications();
    }
  }, [isAuthenticated, user]);

  const fetchPendingProducts = async () => {
    try {
      const response = await productApprovalApi.getPendingProducts();
      setPendingProducts(response.data);
    } catch (error) {
      console.error('Error fetching pending products:', error);
    }
  };

  const fetchSellerApplications = async () => {
    try {
      const response = await sellerApplicationApi.getPendingApplications();
      setSellerApplications(response.data);
    } catch (error) {
      console.error('Error fetching seller applications:', error);
    }
  };

  const handleApproveProduct = async (productId) => {
    try {
      await productApprovalApi.approveProduct(productId, user.id);
      toast.success('Product approved successfully!');
      fetchPendingProducts();
      fetchProducts();
    } catch (error) {
      toast.error('Failed to approve product');
    }
  };

  const handleRejectProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to reject this product?')) return;
    try {
      await productApprovalApi.rejectProduct(productId, user.id);
      toast.success('Product rejected');
      fetchPendingProducts();
    } catch (error) {
      toast.error('Failed to reject product');
    }
  };

  const handleApproveSeller = async (applicationId) => {
    try {
      await sellerApplicationApi.approveApplication(applicationId, user.id, 'Application approved');
      toast.success('Seller application approved!');
      fetchSellerApplications();
    } catch (error) {
      toast.error('Failed to approve application');
    }
  };

  const handleRejectSeller = async (applicationId) => {
    const notes = window.prompt('Enter rejection reason (optional):');
    if (notes === null) return; // User cancelled
    try {
      await sellerApplicationApi.rejectApplication(applicationId, user.id, notes || 'Application rejected');
      toast.success('Seller application rejected');
      fetchSellerApplications();
    } catch (error) {
      toast.error('Failed to reject application');
    }
  };

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#212121] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Show access denied if not admin
  if (user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-[#212121] flex items-center justify-center p-4">
        <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-8 max-w-md text-center">
          <FaLock className="text-5xl text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-2">
            You need <span className="text-emerald-400 font-semibold">Administrator</span> privileges to access this page.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Your current role: <span className="text-yellow-400">{user?.role || 'None'}</span>
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
            >
              Go to Home
            </Link>
            <Link
              to="/products"
              className="border border-[#424242] text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-[#3a3a3a] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: 'Electronics',
      brand: '',
      imageUrl: '',
      rating: '4.5',
      reviewCount: '0'
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productForm.name || !productForm.price || !productForm.quantity) {
      toast.error('Please fill in required fields');
      return;
    }

    const productData = {
      ...productForm,
      price: parseFloat(productForm.price),
      quantity: parseInt(productForm.quantity),
      rating: parseFloat(productForm.rating),
      reviewCount: parseInt(productForm.reviewCount)
    };

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productData);
        toast.success('Product updated successfully!');
      } else {
        await api.post('/products', productData);
        toast.success('Product added successfully!');
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setProductForm({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      category: product.category,
      brand: product.brand || '',
      imageUrl: product.imageUrl || '',
      rating: (product.rating || 4.5).toString(),
      reviewCount: (product.reviewCount || 0).toString()
    });
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalProducts: products.length,
    totalCategories: [...new Set(products.map(p => p.category))].length,
    lowStock: products.filter(p => p.quantity < 10).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
  };

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Manage your products and view statistics</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowAddForm(true); }}
            className="mt-4 md:mt-0 bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-emerald-600 transition-colors"
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <FaBox className="text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
                <p className="text-sm text-gray-400">Total Products</p>
              </div>
            </div>
          </div>
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <FaClipboardList className="text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pendingProducts.length}</p>
                <p className="text-sm text-gray-400">Pending Products</p>
              </div>
            </div>
          </div>
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <FaStore className="text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{sellerApplications.length}</p>
                <p className="text-sm text-gray-400">Seller Applications</p>
              </div>
            </div>
          </div>
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FaChartBar className="text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalCategories}</p>
                <p className="text-sm text-gray-400">Categories</p>
              </div>
            </div>
          </div>
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <FaBox className="text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.lowStock}</p>
                <p className="text-sm text-gray-400">Low Stock</p>
              </div>
            </div>
          </div>
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <FaRupeeSign className="text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">₹{stats.totalValue.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Inventory Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#424242]">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'products'
                ? 'text-emerald-500 border-b-2 border-emerald-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaBox className="inline mr-2" /> Products
          </button>
          <button
            onClick={() => setActiveTab('product-approvals')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'product-approvals'
                ? 'text-emerald-500 border-b-2 border-emerald-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaClipboardList className="inline mr-2" /> Product Approvals
            {pendingProducts.length > 0 && (
              <span className="ml-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                {pendingProducts.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('seller-applications')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'seller-applications'
                ? 'text-emerald-500 border-b-2 border-emerald-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FaStore className="inline mr-2" /> Seller Applications
            {sellerApplications.length > 0 && (
              <span className="ml-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                {sellerApplications.length}
              </span>
            )}
          </button>
        </div>

        {/* Add/Edit Product Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-[#424242] flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-white">
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 text-sm mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={productForm.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 text-sm mb-2">Description</label>
                    <textarea
                      name="description"
                      value={productForm.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      placeholder="Enter product description"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={productForm.quantity}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Category</label>
                    <select
                      name="category"
                      value={productForm.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={productForm.brand}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                      placeholder="Brand name"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 text-sm mb-2">Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        name="imageUrl"
                        value={productForm.imageUrl}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                        placeholder="https://example.com/image.jpg"
                      />
                      <div className="w-12 h-12 bg-[#212121] border border-[#424242] rounded-xl flex items-center justify-center overflow-hidden">
                        {productForm.imageUrl ? (
                          <img src={productForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <FaImage className="text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Rating (0-5)</label>
                    <input
                      type="number"
                      name="rating"
                      value={productForm.rating}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0"
                      max="5"
                      className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Review Count</label>
                    <input
                      type="number"
                      name="reviewCount"
                      value={productForm.reviewCount}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 py-3 border border-[#424242] rounded-xl text-gray-300 hover:bg-[#3a3a3a] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
                  >
                    <FaSave /> {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Tab Content */}
        {activeTab === 'products' && (
          <>
            {/* Search */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, category, or brand..."
                className="w-full pl-12 pr-4 py-3 bg-[#2f2f2f] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Products Table */}
        <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] overflow-hidden">
          <div className="p-4 border-b border-[#424242]">
            <h2 className="text-lg font-bold text-white">Products ({filteredProducts.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No products found. Click "Add Product" to create one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#212121]">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Product</th>
                    <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Category</th>
                    <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Price</th>
                    <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Stock</th>
                    <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Rating</th>
                    <th className="text-right px-4 py-3 text-gray-400 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#424242]">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-[#3a3a3a] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.imageUrl || 'https://via.placeholder.com/50x50?text=No+Image'}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-white font-medium line-clamp-1">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.brand || 'No brand'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white">₹{Number(product.price).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`${product.quantity < 10 ? 'text-red-400' : 'text-gray-300'}`}>
                          {product.quantity}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-yellow-400">⭐ {product.rating || 'N/A'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

            {/* Quick Add Tips */}
            <div className="mt-8 bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
              <h3 className="text-lg font-bold text-white mb-4">💡 Quick Tips</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Use high-quality product images (recommended: 500x500px)</li>
                <li>• Write clear, detailed descriptions for better SEO</li>
                <li>• Keep stock updated to avoid overselling</li>
                <li>• Products with ratings appear higher in search results</li>
              </ul>
            </div>
          </>
        )}

        {/* Product Approvals Tab */}
        {activeTab === 'product-approvals' && (
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] overflow-hidden">
            <div className="p-4 border-b border-[#424242]">
              <h2 className="text-lg font-bold text-white">Pending Product Approvals ({pendingProducts.length})</h2>
            </div>
            {pendingProducts.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No pending products to approve</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#212121]">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Product</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Seller</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Price</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Category</th>
                      <th className="text-right px-4 py-3 text-gray-400 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#424242]">
                    {pendingProducts.map(product => (
                      <tr key={product.id} className="hover:bg-[#3a3a3a] transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={product.imageUrl || 'https://via.placeholder.com/50x50'} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="text-white font-medium">{product.name}</p>
                              <p className="text-xs text-gray-500">{product.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-400">Seller ID: {product.sellerId}</td>
                        <td className="px-4 py-3 text-white">₹{Number(product.price).toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">{product.category}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleApproveProduct(product.id)} className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors" title="Approve">
                              <FaCheckCircle />
                            </button>
                            <button onClick={() => handleRejectProduct(product.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Reject">
                              <FaTimesCircle />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Seller Applications Tab */}
        {activeTab === 'seller-applications' && (
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] overflow-hidden">
            <div className="p-4 border-b border-[#424242]">
              <h2 className="text-lg font-bold text-white">Pending Seller Applications ({sellerApplications.length})</h2>
            </div>
            {sellerApplications.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No pending seller applications</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#212121]">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">User ID</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Business Name</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Business Type</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">GST Number</th>
                      <th className="text-left px-4 py-3 text-gray-400 text-sm font-medium">Applied Date</th>
                      <th className="text-right px-4 py-3 text-gray-400 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#424242]">
                    {sellerApplications.map(app => (
                      <tr key={app.id} className="hover:bg-[#3a3a3a] transition-colors">
                        <td className="px-4 py-3 text-white">{app.userId}</td>
                        <td className="px-4 py-3 text-white font-medium">{app.businessName}</td>
                        <td className="px-4 py-3 text-gray-400">{app.businessType || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-400">{app.gstNumber || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-400 text-sm">{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleApproveSeller(app.id)} className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors" title="Approve">
                              <FaCheckCircle />
                            </button>
                            <button onClick={() => handleRejectSeller(app.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Reject">
                              <FaTimesCircle />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

