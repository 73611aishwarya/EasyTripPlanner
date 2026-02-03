import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to={isLoggedIn ? "/home" : "/"}>
          <img src="/mylogo.png" alt="Easy Trip Logo" />
        </Link>
      </div>

      <div className="nav-links">
        <Link to={isLoggedIn ? "/home" : "/"}>Home</Link>

        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/register">Register</Link>}

         <Link to="/help">Help</Link>

        <Link to="/about">About Us</Link>
        
        <Link to="/feedback">Feedback</Link>
      </div>
    </nav>
  );
}

export default Navbar;
