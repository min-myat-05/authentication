import { useState } from "react";
import axios from "../Helpers/axios.js";
export default function Register({ onSwitchToLogin }) {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [fieldErrors, setFieldErrors] = useState({});
  let [status, setStatus] = useState("");

  let register = async (e) => {
    try {
      e.preventDefault();
      let data = {
        name,
        email,
        password,
      };
      let res = await axios.post("/api/user/register", data, {
        withCredentials: true,
      });

      if (res.status === 201) {
        onSwitchToLogin();
      }
    } catch (err) {
      // inside catch(err) { ... }
      if (err.response) {
        const body = err.response.data || {};
        // If express-validator array form
        if (Array.isArray(body.errors)) {
          const map = {};
          body.errors.forEach((it) => {
            if (it.param) map[it.param] = it.msg || it.message;
          });
          setFieldErrors(map);
        }
        // If backend returned an object of field errors: { errors: { password: { msg: '...' } } }
        else if (body.errors && typeof body.errors === "object") {
          const map = {};
          Object.keys(body.errors).forEach((key) => {
            const val = body.errors[key];
            map[key] = (val && (val.msg || val.message)) || String(val);
          });
          setFieldErrors(map);
        }
        // fallback: message or generic status
        else if (body.message) {
          setStatus(body.message);
        } else {
          setStatus(err.response.statusText || "Registration failed");
        }
      } else if (err.request) {
        setStatus("No response from server (network/CORS)");
      } else {
        setStatus("Error: " + err.message);
      }
    }
  };

  return (
    <div className="auth-page">
      <h1>Create an account</h1>
      <p>Register now to securely access the app and manage your profile.</p>
      <form onSubmit={register} className="auth-form">
        <label>
          Full name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {(Object.keys(fieldErrors).length > 0 || status) && (
          <ul style={{ color: "red" }}>
            {Object.keys(fieldErrors).length > 0 &&
              Object.entries(fieldErrors).map(([key, msg]) => (
                <li key={key}>{msg}</li>
              ))}
            {status && <li>{status}</li>}
          </ul>
        )}
        <button type="submit">Register</button>
      </form>
      <div className="auth-switch">
        <span>Already have an account?</span>
        <button type="button" onClick={onSwitchToLogin}>
          Sign in
        </button>
      </div>
    </div>
  );
}
