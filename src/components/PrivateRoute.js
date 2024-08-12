// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Component, admin, ...rest }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/Login" />;
  }

  if (admin && !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  return Component;
};

export default PrivateRoute;
