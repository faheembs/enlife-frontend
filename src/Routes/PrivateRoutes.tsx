import React from "react";
import { Navigate, Route } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ComponentType<any>;
  path: string;
  isAuthenticated: boolean;
  isPrivate?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Component,
  path,
  isAuthenticated,
  isPrivate = false,
}) => {
  return isPrivate && !isAuthenticated ? (
    <Navigate to="/login" />
  ) : (
    <Route path={path} element={<Component />} />
  );
};

export default PrivateRoute;
