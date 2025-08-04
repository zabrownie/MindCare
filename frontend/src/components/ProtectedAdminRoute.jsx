import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  // Check if user is authenticated and has admin role
  // For now, we'll check if the token exists and redirect to admin login
  // In a real app, you'd decode the JWT to check for admin role
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // You can add additional admin role checks here
  // For example: if (!user?.isAdmin) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedAdminRoute; 