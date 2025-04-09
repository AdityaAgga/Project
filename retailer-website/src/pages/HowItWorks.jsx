import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How CRES Works</h1>
            <p className="text-xl md:text-2xl">
              A simple, step-by-step guide to using our platform
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl mr-4">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-primary-100 p-3 rounded-lg mr-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join CRES today and transform your retail business with our innovative platform
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks; 