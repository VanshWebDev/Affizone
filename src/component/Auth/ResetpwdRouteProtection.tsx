import { FC } from "react";
import { Navigate } from "react-router-dom";

interface RouteProtectionProps {
  resetpwdRoute: boolean;
  children: React.ReactNode;
}

const ResetpwdRouteProtection: FC<RouteProtectionProps> = ({
  resetpwdRoute,
  children,
}) => {
  // If not authenticated, redirect to the homepage
  if (!resetpwdRoute) {
    return <Navigate to="/" replace />;
  }
  // Otherwise, render the protected component
  return children;
};

export default ResetpwdRouteProtection;
