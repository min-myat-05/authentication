import { useState } from "react";
import axios from "../Helpers/axios";
import { useNavigate } from "react-router-dom";
export default function Login({
  onLogin,
  onSwitchToRegister,
  onSwitchToForgot,
}) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [fieldErrors, setFieldErrors] = useState({});
  let navigate = useNavigate();

  let login = async (e) => {
    try {
      e.preventDefault();
      let data = {
        email,
        password,
      };
      let res = await axios.post("/api/user/login", data, {
        withCredentials: true,
      });

      if (res?.data?.user) {
        onLogin(res.data.user);
        navigate("/user", { replace: true });
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        const body = err.response.data || {};

        if (Array.isArray(body.errors)) {
          const map = {};
          body.errors.forEach((it) => {
            if (it.param) map[it.param] = it.msg || it.message;
          });
          setFieldErrors(map);
        } else if (body.errors && typeof body.errors === "object") {
          const map = {};
          Object.keys(body.errors).forEach((key) => {
            const val = body.errors[key];
            map[key] = (val && (val.msg || val.message)) || String(val);
          });
          setFieldErrors(map);
        }
      }
    }
  };

  return (
    <div className="auth-page">
      <h1>Welcome back</h1>
      <p>Sign in to manage your account and access the secure dashboard.</p>
      <form onSubmit={login} className="auth-form">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {fieldErrors.email && <p>{fieldErrors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {fieldErrors.password && <p>{fieldErrors.password}</p>}
        <button type="submit">Login</button>
        <div className="forgot-pill">
          <button
            type="button"
            className="link-button"
            onClick={onSwitchToForgot}
          >
            Forgot password?
          </button>
        </div>
      </form>
      <div className="auth-switch">
        <span>New here?</span>
        <button type="button" onClick={onSwitchToRegister}>
          Create account
        </button>
      </div>
    </div>
  );
}
