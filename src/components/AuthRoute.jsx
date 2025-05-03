import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, userRole } = useAuth();

  if (isAuthenticated) {
    // If user is authenticated, redirect to appropriate dashboard
    const redirectPath = userRole === 'wholesaler' 
      ? '/wholesaler/dashboard' 
      : '/retailer/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default AuthRoute; 