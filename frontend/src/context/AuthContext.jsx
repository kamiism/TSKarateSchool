import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if(accessToken) {
        const res = await apiFetch("/auth/user/profile", "POST", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        console.log(res)
        if(!res.success && res.error.name == "TokenExpiredError"){
          const res = await apiFetch("/auth/user/access-token", "POST")
          if(!res.success) {
            localStorage.removeItem("accessToken");
            setUser(null);
            return
          }
          setAccessToken(res.accessToken)
          localStorage.setItem("accessToken" , res.accessToken)
        }

        setUser(res.data)

      }
      setLoading(false);
    };
    fetchData();
    
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
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
