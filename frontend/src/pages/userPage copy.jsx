import axios from "../Helpers/axios";
import { useNavigate } from "react-router-dom";

export default function UserPage({ onLogout }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post("/api/user/logout");

      if (res.status === 200) {
        if (onLogout) {
          onLogout();
        } else {
          navigate("/login", { replace: true });
        }
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="auth-page">
      <h1>User Dashboard</h1>
      <p>You are logged in as:</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
