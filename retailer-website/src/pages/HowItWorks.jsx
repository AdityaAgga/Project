import React from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      title: "Create Your Account",
      description: "Sign up as a retailer or wholesaler to get started with CRES",
      icon: "👤"
    },
    {
      title: "Complete Your Profile",
      description: "Add your business details, preferences, and requirements",
      icon: "📝"
    },
    {
      title: "Browse Products",
      description: "Explore products from verified wholesalers in your area",
      icon: "🔍"
    },
    {
      title: "Place Orders",
      description: "Select products, specify quantities, and place your order",
      icon: "🛒"
    },
    {
      title: "Track & Manage",
      description: "Monitor your orders and manage your inventory efficiently",
      icon: "📊"
    },
    {
      title: "Grow Your Business",
      description: "Build relationships with wholesalers and expand your retail business",
      icon: "📈"
    }
  ];

  const features = [
    {
      title: "Mobile-Friendly",
      description: "Access CRES from any device, anywhere, at any time",
      icon: "📱"
    },
    {
      title: "Secure Payments",
      description: "Safe and reliable payment processing for all transactions",
      icon: "🔒"
    },
    {
      title: "Analytics Dashboard",
      description: "Track your orders, sales, and business growth",
      icon: "📊"
    },
    {
      title: "Direct Communication",
      description: "Chat with wholesalers and manage your relationships",
      icon: "💬"
    }
  ];

  return (
    <div className="how-it-works-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="page-title">How CRES Works</h1>
          <p className="page-subtitle">
            A simple, step-by-step guide to using our platform
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="container steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="step-number-container">
              <div className="step-icon">{step.icon}</div>
              <div className="step-number">{index + 1}</div>
            </div>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3 className="feature-title">
                  <span className="feature-icon">{feature.icon}</span> {feature.title}
                </h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
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

export default HowItWorks; 