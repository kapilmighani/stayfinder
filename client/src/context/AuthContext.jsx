import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // const res = await fetch("https://stayfinder-d8vb.onrender.com/auth/check-auth", {
        //   credentials: "include",
        // });
        // const data = await res.json();
        // if (data.authenticated) {
        //   setIsLoggedIn(true);
        //   setRole(data.role);
        // } else {
        //   setIsLoggedIn(false);
        //   setRole("");
        // }
        setIsLoggedIn(true);
        setRole(data.role);
      } catch (err) {
        setIsLoggedIn(false);
        setRole("");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
