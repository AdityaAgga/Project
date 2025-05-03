import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserType = localStorage.getItem('userType');
    
    if (savedToken && savedUserType) {
      setToken(savedToken);
      setUserType(savedUserType);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
        email,
        password,
        userType
      });

      if (response.data.status === 'success') {
        const { token, user } = response.data;
        setToken(token);
        setUserType(user.userType);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userType', user.userType);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData, userType) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/register-${userType}`,
        {
          ...userData,
          userType
        }
      );
      
      if (response.data.status === 'success') {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  const logout = () => {
    setToken('');
    setUserType('');
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        loading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
