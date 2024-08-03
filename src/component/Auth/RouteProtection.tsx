import { FC } from "react";
import { Navigate } from "react-router-dom";

interface RouteProtectionProps {
  passwordRoute: boolean;
  children: React.ReactNode;
}

const RouteProtection: FC<RouteProtectionProps> = ({
  passwordRoute,
  children,
}) => {
  // If not authenticated, redirect to the homepage
  if (!passwordRoute) {
    return <Navigate to="/" replace />;
  }
  // Otherwise, render the protected component
  return children;
};

export default RouteProtection;