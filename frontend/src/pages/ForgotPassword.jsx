import { useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_APP_API_URL ||
  "http://localhost:4000";

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ForgotPassword: submit", { email });
    setStatus("Sending...");
    try {
      const url = `${API_BASE}/api/user/forgot-password`;
      console.log("ForgotPassword: POST", url);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      console.log("ForgotPassword: response status", res.status);
      let data = null;
      try {
        data = await res.json();
      } catch (parseErr) {
        console.error("ForgotPassword: failed to parse JSON", parseErr);
      }
      console.log("ForgotPassword: response data", data);
      if (!res.ok) {
        throw new Error((data && data.message) || `Request failed: ${res.status}`);
      }
      setStatus((data && data.message) || "If that email exists, a password reset link has been sent.");
    } catch (err) {
      console.error("ForgotPassword: error", err);
      setStatus(err.message || "Error");
    }
  };

  return (
    <div className="auth-page">
      <h1>Forgot Password</h1>
      <p>
        Enter your account email and we'll send password reset instructions.
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <button type="submit">Send reset</button>
      </form>

      <div style={{ marginTop: 12 }}>
        {status && <p className="status">{status}</p>}
        <div className="auth-switch" style={{ marginTop: 8 }}>
          <span />
          <button type="button" onClick={onBack}>
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
