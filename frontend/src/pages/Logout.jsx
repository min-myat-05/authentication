export default function Logout({ user, onLogout }) {
  return (
    <div className="auth-page logout-card">
      <h1>Logged in</h1>
      <p>
        You are signed in as <strong>{user?.email || "user"}</strong>. Click
        below to sign out.
      </p>
      <button className="logout-action" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
