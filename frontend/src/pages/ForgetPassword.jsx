import { useState } from "react";
import { forgetPassword } from "../services/authService";
import { Link } from "react-router-dom";
import "./ForgetPassword.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setError("");
      setMessage("");
      await forgetPassword(email);
      setMessage("Password reset link sent successfully");
    } catch {
      setError("Email not found");
    }
  };

  return (
    <div className="fp-page">
      <form onSubmit={handleSubmit} className="fp-card">
        <h2 className="fp-title">Forgot Password</h2>
        <p className="fp-subtitle">
          Enter your registered email to reset your password
        </p>

        {error && <p className="fp-error">{error}</p>}
        {message && <p className="fp-success">{message}</p>}

        <input
          type="email"
          placeholder="Email address"
          className="fp-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="fp-button">Send Reset Link</button>

        <p className="fp-footer">
          Back to <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default ForgetPassword;

