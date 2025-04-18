import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">About CRES</h1>
          <p className="hero-subtitle">
            Connecting retailers with wholesalers for seamless bulk purchasing experiences
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              At CRES, we're dedicated to revolutionizing the way retailers source their products. 
              Our platform bridges the gap between retailers and wholesalers, making bulk purchasing 
              more efficient, transparent, and profitable for everyone involved.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Why Choose CRES</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3 className="feature-title">Seamless Integration</h3>
              <p className="feature-text">
                Connect with verified wholesalers and manage your inventory in one place
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Competitive Pricing</h3>
              <p className="feature-text">
                Access wholesale prices and bulk discounts to maximize your profits
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Secure Transactions</h3>
              <p className="feature-text">
                Safe and reliable payment processing with built-in fraud protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-avatar"></div>
              <h3 className="team-name">John Doe</h3>
              <p className="team-title">CEO & Founder</p>
            </div>
            <div className="team-member">
              <div className="team-avatar"></div>
              <h3 className="team-name">Jane Smith</h3>
              <p className="team-title">CTO</p>
            </div>
            <div className="team-member">
              <div className="team-avatar"></div>
              <h3 className="team-name">Mike Johnson</h3>
              <p className="team-title">Head of Operations</p>
            </div>
            <div className="team-member">
              <div className="team-avatar"></div>
              <h3 className="team-name">Sarah Williams</h3>
              <p className="team-title">Marketing Director</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="section-title" style={{ color: 'white' }}>Ready to Get Started?</h2>
            <p className="section-text" style={{ color: 'white' }}>
              Join CRES today and transform your retail business with our innovative platform
            </p>
            <Link to="/register" className="cta-button">
              Create Your Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 