import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadAuthData = useCallback(async () => {
    try {
      const data = await getLocalStorage();
      setAuthData(data);
      return data;
    } catch (error) {
      console.error("Error loading auth data:", error);
      setError("Failed to load authentication data");
      return { employees: [], admin: [] };
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await loadAuthData();
        
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
          try {
            const userObj = JSON.parse(currentUser);
            setUser(userObj);
          } catch (e) {
            console.error("Error parsing current user:", e);
            localStorage.removeItem("currentUser");
            setError("Error loading user session");
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setError("Failed to initialize authentication");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [loadAuthData]);

  const login = (email, password) => {
    if (!authData) {
      console.error("Authentication system not initialized");
      setError("Authentication system not ready. Please refresh the page.");
      return false;
    }

    try {
      const users = [...(authData.employees || []), ...(authData.admin || [])];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Store the full user object in localStorage
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
        localStorage.setItem("currentUser", JSON.stringify(userData));
        // Update the user state with the full user object
        setUser(userData);
        setError(null);
        return true;
      } else {
        setError("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  const value = {
    authData,
    user,
    login,
    logout,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isEmployee: user?.role === "employee"
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg max-w-md w-full text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
