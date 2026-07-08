import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Frontend guy please change it
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}
