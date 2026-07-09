import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ role = "user", children }) {
  const { user, loading, staff } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Frontend guy please change it
  }
  if (role == "user" && user) {
    return children;
  } else if (role == "staff" && staff) {
    return children;
  }
  return <Navigate to="/login" />;
}
