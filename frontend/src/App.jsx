import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (u) => setUser(u);
  const handleRegister = (u) => setUser(u);
  const handleLogout = () => setUser(null);

  return (
    <main className="app-shell">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/logout" /> : <Navigate to="/login" />}
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
        <Route
          path="/logout"
          element={<Logout user={user} onLogout={handleLogout} />}
        />
      </Routes>
    </main>
  );
}

export default App;
