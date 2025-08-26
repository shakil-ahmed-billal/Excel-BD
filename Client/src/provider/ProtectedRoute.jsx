import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const ProtectedRoute = ({ children, requiredRole }) => {
  const {  user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect based on user's actual role
    switch (user?.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'agent':
        return <Navigate to="/agent/dashboard" replace />;
      case 'customer':
        return <Navigate to="/customer/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;