import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.role || user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default RoleRoute;