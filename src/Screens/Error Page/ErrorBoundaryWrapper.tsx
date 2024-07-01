import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary"; // Adjust the import path as needed

const ErrorBoundaryWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <ErrorBoundary navigateHome={handleNavigateHome}>{children}</ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
