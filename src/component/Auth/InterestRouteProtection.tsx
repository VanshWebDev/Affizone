import { FC } from "react";
import { Navigate } from "react-router-dom";

interface RouteProtectionProps {
  interestRoute: boolean;
  children: React.ReactNode;
}

const InterestRouteProtection: FC<RouteProtectionProps> = ({
  interestRoute,
  children,
}) => {
  // If not authenticated, redirect to the homepage
  if (!interestRoute) {
    return <Navigate to="/" replace />;
  }
  // Otherwise, render the protected component
  return children;
};

export default InterestRouteProtection;
