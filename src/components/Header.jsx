import React from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-5">
      <nav className="flex justify-between items-center container mx-auto px-4">
        <img
          src="logo.png"
          alt="Logo"
          className="h-12"
        />
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/About" className="hover:text-gray-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/how-it-works" className="hover:text-gray-400">
              How it Works
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="hover:text-gray-400">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/sign-in" className="hover:text-gray-400">
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-400">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
