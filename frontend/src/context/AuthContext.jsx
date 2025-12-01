import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/client';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      const { token: newToken, user: userData } = response.data;
      setToken(newToken);
      // Ensure user object has all required fields including id
      const user = userData || { 
        id: null,
        email, 
        name: email.split('@')[0],
        firstName: email.split('@')[0],
        role: 'CUSTOMER' 
      };
      setUser(user);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(user));
      return response.data;
    } catch (error) {
      throw error; // Re-throw error so Login page can handle it
    }
  };

  const register = async (userData, password) => {
    try {
      const response = await authApi.register(userData, password);
      const { token: newToken, user: userDataResponse } = response.data;
      if (newToken && userDataResponse) {
        setToken(newToken);
        setUser(userDataResponse);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userDataResponse));
      }
      return response.data;
    } catch (error) {
      throw error; // Re-throw error so Register page can handle it
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
