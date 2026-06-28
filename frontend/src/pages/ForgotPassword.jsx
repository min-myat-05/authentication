import { useState } from "react";

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch(
        "http://localhost:4000/api/user/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");
      setStatus(data.message || "Reset link created (demo)");
    } catch (err) {
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
