import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './authentication/UserContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useContext(UserContext);

  return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
