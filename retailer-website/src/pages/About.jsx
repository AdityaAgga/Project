import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About CRES</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Connecting retailers with wholesalers for seamless bulk purchasing experiences
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              At CRES, we're dedicated to revolutionizing the way retailers source their products. 
              Our platform bridges the gap between retailers and wholesalers, making bulk purchasing 
              more efficient, transparent, and profitable for everyone involved.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose CRES</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-custom">
              <h3 className="text-xl font-semibold mb-4">Seamless Integration</h3>
              <p className="text-gray-600">
                Connect with verified wholesalers and manage your inventory in one place
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-custom">
              <h3 className="text-xl font-semibold mb-4">Competitive Pricing</h3>
              <p className="text-gray-600">
                Access wholesale prices and bulk discounts to maximize your profits
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-custom">
              <h3 className="text-xl font-semibold mb-4">Secure Transactions</h3>
              <p className="text-gray-600">
                Safe and reliable payment processing with built-in fraud protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600">CTO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Mike Johnson</h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Sarah Williams</h3>
              <p className="text-gray-600">Marketing Director</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join CRES today and transform your retail business with our innovative platform
          </p>
          <Link 
            to="/register" 
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About; 