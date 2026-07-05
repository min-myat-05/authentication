import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import UserPage from "./pages/userPage";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (u) => setUser(u);
  const handleRegister = (u) => setUser(u);
  const handleLogout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <main className="app-shell">
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/user" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
              onSwitchToRegister={() => navigate("/register")}
              onSwitchToForgot={() => navigate("/forgot")}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              onRegister={handleRegister}
              onSwitchToLogin={() => navigate("/login")}
            />
          }
        />
        <Route
          path="/forgot"
          element={<ForgotPassword onBack={() => navigate("/login")} />}
        />
        <Route path="/user" element={<UserPage onLogout={handleLogout} />} />
        <Route
          path="/userPage"
          element={<UserPage onLogout={handleLogout} />}
        />
      </Routes>
    </main>
  );
}

export default App;
