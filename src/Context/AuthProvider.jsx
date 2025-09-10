import React, { createContext, useState, useEffect, useCallback } from "react";
import { getLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAuthData = useCallback(() => {
    try {
      const data = getLocalStorage();
      setAuthData(data);
      return data;
    } catch (error) {
      console.error("Error loading auth data:", error);
      return { employees: [], admin: [] };
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = loadAuthData();
        
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
          try {
            const userObj = JSON.parse(loggedInUser);
            setUser(userObj.role);
          } catch (e) {
            console.error("Error parsing logged in user:", e);
            localStorage.removeItem("loggedInUser");
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [loadAuthData]);

  const login = (email, password) => {
    if (!authData && !loading) {
      console.error("Authentication system not initialized");
      return false;
    }

    const admin = authData?.admin?.find(a => a.email === email && a.password === password);
    if (admin) {
      const userData = { role: "admin" };
      setUser("admin");
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      return true;
    }

    const employee = authData?.employees?.find(e => e.email === email && e.password === password);
    if (employee) {
      const userData = { 
        role: "employee",
        data: employee
      };
      setUser("employee");
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  const value = {
    authData,
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user === "admin",
    isEmployee: user === "employee"
  };

  if (loading) {
    return <div>Loading authentication system...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
