import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./ProtectedRoute.css";

export function Redirect({ to, children }) {
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
  
  if (user || staff) {
    return <Navigate to={to} />;
  }
  return children;
}
