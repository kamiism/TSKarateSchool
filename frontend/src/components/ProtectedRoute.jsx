import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./ProtectedRoute.css";

export function ProtectedRoute({ role = "user", children }) {
  const { user, loading, staff } = useAuth();

  if (loading) {
    return (
      <div className="protected-route-loader">
        <div className="spinner">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
  if ((role == "user" && user) || (role == "staff" && staff)) {
    return children;
  }
  return <Navigate to="/login" />;
}
