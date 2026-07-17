import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../Helpers/axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPass() {
  const query = useQuery();
  const preToken = query.get("token") || "";
  const [token, setToken] = useState(preToken);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const res = await axios.post("/api/user/reset-password", {
        token,
        newPassword: password,
      });
      const data = res.data;
      // axios throws on non-2xx, but double-check
      if (!data) throw new Error("No response data");
      setStatus("Password reset successful — redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setStatus(err.response?.data?.message || err.message || "Error");
    }
  };

  return (
    <div className="auth-page">
      <h1>Reset Password</h1>
      <p>
        Paste your reset token (from email) or use the token provided in the
        link.
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Token
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </label>

        <label>
          New password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Reset password</button>
      </form>

      <div style={{ marginTop: 12 }}>
        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}
