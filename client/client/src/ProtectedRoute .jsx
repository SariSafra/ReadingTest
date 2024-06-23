import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);

  return allowedRoles.includes(auth.role) ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
