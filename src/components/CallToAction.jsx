import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section id="cta" className="text-center py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Ready to Scale Your Business?</h2>
        <p className="text-xl mb-8">Join our platform today as a retailer or wholesaler and start growing your business.</p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/register?type=retailer" className="bg-white text-blue-600 px-6 py-3 font-bold rounded-lg hover:bg-gray-100">
            Join as Retailer
          </Link>
          <Link to="/register?type=wholesaler" className="bg-purple-700 text-white px-6 py-3 font-bold rounded-lg hover:bg-purple-600">
            Join as Wholesaler
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;