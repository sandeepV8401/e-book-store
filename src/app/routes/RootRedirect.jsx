import React from "react";
import { Navigate } from "react-router-dom";

const RootRedirect = () => {
  const isAuthenticated = true;
  return isAuthenticated ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RootRedirect;
