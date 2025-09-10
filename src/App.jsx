import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashborad";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./Context/AuthProvider";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user !== requiredRole) {
    return <Navigate to={user === "admin" ? "/admin" : "/employee"} replace />;
  }

  return React.cloneElement(children, { onLogout: logout });
};

const App = () => {
  const { isAuthenticated, user, login } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (email, password) => {
    return login(email, password);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={user === "admin" ? "/admin" : "/employee"} replace />
          ) : (
            <Login handleLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={user === "admin" ? "/admin" : "/employee"} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;
