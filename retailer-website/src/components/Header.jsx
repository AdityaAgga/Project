import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getCurrentUser } from "../services/authService";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const isUserAuthenticated = isAuthenticated();
  const currentUser = getCurrentUser(); // Optional: Get user info for welcome message

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
    // Optionally force a re-render or page reload if state updates aren't reflected immediately
    // window.location.reload(); 
  };

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/">
          {/* You can replace this with your actual logo component or img tag */}
          <span className="logo">CRES</span>
        </Link>
        <nav>
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/how-it-works" className="nav-link">How It Works</Link></li>
            <li><Link to="/pricing" className="nav-link">Pricing</Link></li>
            
            {isUserAuthenticated ? (
              <>
                {/* Optional: Display welcome message */}
                {/* <li className="nav-link">Welcome, {currentUser?.name}!</li> */}
                <li>
                  <button onClick={handleLogout} className="nav-link logout-button">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/sign-in" className="nav-link">Sign In</Link></li>
                <li><Link to="/register" className="nav-link">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
