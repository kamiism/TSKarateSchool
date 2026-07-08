import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Redirect({ to ,children }) {
  const { user, loading } = useAuth();
  if(loading) {
    return <div>Loading....</div> // Frontend guy please change this
  }
  if (user) {
    return <Navigate to={to} />;
  }
  return children;
}
