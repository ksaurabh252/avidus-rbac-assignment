import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user } = useContext(AuthContext);

  // If not logged in at all, send to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If route requires Admin but user is just a User, send to their tasks
  if (requireAdmin && user.role !== "Admin") {
    return <Navigate to="/my-tasks" replace />;
  }

  // Otherwise, render the page they requested
  return children;
};

export default ProtectedRoute;