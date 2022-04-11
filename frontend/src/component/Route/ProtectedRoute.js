import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    
    const { user, isAuthenticated } = useSelector(state => state.user);

    if (isAuthenticated === false) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
};

export default ProtectedRoute;