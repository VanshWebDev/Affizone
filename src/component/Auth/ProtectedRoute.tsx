import { FC } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  console.log(isAuthenticated)
  // If not authenticated, redirect to the homepage
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;