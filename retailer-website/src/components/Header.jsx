import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-container">
        <img
          src="logo.png"
          alt="Logo"
          className="logo"
        />
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/About" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/how-it-works" className="nav-link">
              How it Works
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="nav-link">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/sign-in" className="nav-link">
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
