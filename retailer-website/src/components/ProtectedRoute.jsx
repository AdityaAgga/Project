import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

const ProtectedRoute = () => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute; 