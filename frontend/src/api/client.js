import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers if it exists - userId is extracted from JWT on server
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Product API calls - userId extracted from JWT token on server
export const productApi = {
  getAllProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (category) => api.get(`/products/category/${category}`),
  searchProducts: (keyword) => api.get('/products/search', { params: { keyword } }),
  getSearchSuggestions: (keyword) => api.get('/products/search/suggestions', { params: { keyword } }),
  getTopRatedProducts: () => api.get('/products/trending/top-rated'),
  getRecommendedProducts: (userId) => api.get(`/products/recommendations/${userId}`),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getSellerProducts: (sellerId) => api.get(`/products/seller/${sellerId}`),
};

// Auth API calls
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData, password) => api.post('/auth/register', userData, { params: { password } }),
  forgotPassword: (email) => api.post('/auth/forgot-password', null, { params: { email } }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', null, { params: { token, newPassword } }),
};

// Seller Application API calls - userId/adminId extracted from JWT on server
export const sellerApplicationApi = {
  createApplication: (data) => api.post('/seller-applications', data),
  getAllApplications: () => api.get('/seller-applications'),
  getPendingApplications: () => api.get('/seller-applications/pending'),
  approveApplication: (id, notes) => api.put(`/seller-applications/${id}/approve`, null, { params: notes ? { notes } : {} }),
  rejectApplication: (id, notes) => api.put(`/seller-applications/${id}/reject`, null, { params: notes ? { notes } : {} }),
};

// Product Approval API calls (Admin only) - adminId extracted from JWT on server
export const productApprovalApi = {
  getPendingProducts: () => api.get('/products/pending'),
  approveProduct: (id) => api.put(`/products/${id}/approve`),
  rejectProduct: (id) => api.put(`/products/${id}/reject`),
};

// Order API calls - NEW
export const orderApi = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getMyOrders: () => api.get('/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, null, { params: { status } }),
  addItemToOrder: (orderId, productId, quantity) => api.post(`/orders/${orderId}/items`, null, { params: { productId, quantity } }),
  removeItemFromOrder: (orderItemId) => api.delete(`/orders/items/${orderItemId}`),
  trackOrder: (orderNumber) => api.get(`/orders/track/${orderNumber}`),
};

export default api;
