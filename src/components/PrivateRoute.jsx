import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    // Store the attempted URL to redirect back after login
    localStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/sign-in" replace />;
  }

  // If user is wholesaler and trying to access retailer routes
  if (userRole === 'wholesaler' && location.pathname.startsWith('/retailer')) {
    return <Navigate to="/wholesaler/dashboard" replace />;
  }

  // If user is retailer and trying to access wholesaler routes
  if (userRole === 'retailer' && location.pathname.startsWith('/wholesaler')) {
    return <Navigate to="/retailer/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute; 