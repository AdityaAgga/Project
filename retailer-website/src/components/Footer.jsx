import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CRES</h3>
          <p>Our platform for connecting with wholesalers and managing bulk purchases.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Account</h3>
          <ul className="footer-links">
            <li><Link to="/sign-in">Sign In</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Legal</h3>
          <ul className="footer-links">
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 CRES - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;