import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Product API calls
export const productApi = {
  getAllProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (category) => api.get(`/products/category/${category}`),
  searchProducts: (keyword) => api.get('/products/search', { params: { keyword } }),
  getSearchSuggestions: (keyword) => api.get('/products/search/suggestions', { params: { keyword } }),
  getTopRatedProducts: () => api.get('/products/trending/top-rated'),
  getRecommendedProducts: (userId) => api.get(`/products/recommendations/${userId}`),
  createProduct: (data, userId) => api.post('/products', data, { params: userId ? { userId } : {} }),
  updateProduct: (id, data, userId) => api.put(`/products/${id}`, data, { params: userId ? { userId } : {} }),
  deleteProduct: (id, userId) => api.delete(`/products/${id}`, { params: userId ? { userId } : {} }),
  getSellerProducts: (sellerId, userId) => api.get(`/products/seller/${sellerId}`, { params: userId ? { userId } : {} }),
};

// Auth API calls
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData, password) => api.post('/auth/register', userData, { params: { password } }),
  forgotPassword: (email) => api.post('/auth/forgot-password', null, { params: { email } }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', null, { params: { token, newPassword } }),
};

// Seller Application API calls
export const sellerApplicationApi = {
  createApplication: (userId, data) => api.post('/seller-applications', data, { params: { userId } }),
  getAllApplications: () => api.get('/seller-applications'),
  getPendingApplications: () => api.get('/seller-applications/pending'),
  approveApplication: (id, adminId, notes) => api.put(`/seller-applications/${id}/approve`, null, { params: { adminId, notes } }),
  rejectApplication: (id, adminId, notes) => api.put(`/seller-applications/${id}/reject`, null, { params: { adminId, notes } }),
};

// Product Approval API calls (Admin only)
export const productApprovalApi = {
  getPendingProducts: (userId) => api.get('/products/pending', { params: userId ? { userId } : {} }),
  approveProduct: (id, adminId) => api.put(`/products/${id}/approve`, null, { params: { adminId } }),
  rejectProduct: (id, adminId) => api.put(`/products/${id}/reject`, null, { params: { adminId } }),
};

export default api;
