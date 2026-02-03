import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Email and password are required");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const response = await login(email, password);
    console.log("Login API response:", response);
    console.log("Login API response.data:", response.data);

    if (response?.data?.token) {
      localStorage.setItem("token", response.data.token);

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      navigate("/home");
    } else {
      setError("Login response missing token");
    }
  } catch (err) {
    setError("Invalid email or password");
  } finally {
    setLoading(false);
  }
};


  
  

  return (
    <> 
    <div className="login-page">
    <div className="login-bg-card">
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="login-button"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="login-links">
          <Link to="/forget-password" className="login-link">
            Forget Password?
          </Link>
          <Link to="/register" className="login-link">
            Register
          </Link>
            </div>
      </form>
    
    </div>
     </div>
        </div>

  
    </>
  );
}

export default Login;

