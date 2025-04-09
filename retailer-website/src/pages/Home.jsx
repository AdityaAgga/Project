import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Connect with Wholesalers for Bulk Purchases</h1>
          <p>Discover products in bulk, negotiate prices, and streamline your supply chain.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          {[
            {
              title: 'Create Your Retailer Profile',
              description: 'Set up your business profile and showcase your requirements.'
            },
            {
              title: 'Browse and Request Products',
              description: 'Find products you need and request bulk orders from wholesalers.'
            },
            {
              title: 'Negotiate and Finalize Deals',
              description: 'Communicate directly with wholesalers and negotiate the best deals.'
            },
            {
              title: 'Track Orders and Payments',
              description: 'Monitor your orders and manage payments securely.'
            }
          ].map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{index + 1}</div>
              <h3 className="step-title">{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {[1, 2, 3].map((product) => (
            <div key={product} className="product-card">
              <div className="product-image"></div>
              <div className="product-content">
                <h3 className="product-title">Product {product}</h3>
                <p>Product Name</p>
                <p className="product-price">Price per unit: Rs100</p>
                <Link to="#" className="view-details-btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3 className="benefit-title">Competitive Pricing</h3>
            <p>Get the best deals on bulk purchases with our competitive pricing model.</p>
          </div>
          <div className="benefit-card">
            <h3 className="benefit-title">Easy Order Management</h3>
            <p>Track your orders, manage inventory, and streamline your supply chain.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Grow Your Business?</h2>
        <Link to="/register" className="btn btn-primary">
          Join Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
