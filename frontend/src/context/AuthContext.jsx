import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [staff, setStaff] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const _userAccessToken = localStorage.getItem("userAccessToken");
      const _staffAccessToken = localStorage.getItem("staffAccessToken")


      if(_userAccessToken) {
        const res = await apiFetch("/auth/user/profile", "GET", {
          headers: {
            Authorization: `Bearer ${_userAccessToken}`,
          }
        });

        if(!res.success && res.error.name == "TokenExpiredError"){
          const res = await apiFetch("/auth/user/access-token", "GET")
          if(!res.success) {
            localStorage.removeItem("userAccessToken");
            setUser(null);
            return
          }
          setAccessToken(res.accessToken)
          localStorage.setItem("userAccessToken" , res.accessToken)
        }

        setUser(res.data)

      } else if(_staffAccessToken) {
          const res = await apiFetch("/auth/staff/profile", "GET", {
          headers: {
            Authorization: `Bearer ${_staffAccessToken}`,
          }
        });

        if(!res.success && res.error.name == "TokenExpiredError"){
          const res = await apiFetch("/auth/staff/access-token", "GET")
          if(!res.success) {
            localStorage.removeItem("staffAccessToken");
            setStaff(null);
            return
          }
          setAccessToken(res.accessToken)
          localStorage.setItem("staffAccessToken" , res.accessToken)
        }

        setStaff(res.data)

      }
      setLoading(false);
    };
    fetchData();
    
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, staff, setStaff }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
