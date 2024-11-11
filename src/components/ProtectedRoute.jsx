import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(ShopContext);

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
