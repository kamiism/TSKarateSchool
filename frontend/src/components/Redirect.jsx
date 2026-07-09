import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Redirect({ to, children }) {
  const { user, loading, staff } = useAuth();
  if (loading) {
    return <div>Loading....</div>; // Frontend guy please change this
  }
  
  if (user || staff) {
    return <Navigate to={to} />;
  }
  return children;
}
