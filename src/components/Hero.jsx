import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="hero" className="bg-cover bg-center text-center py-24 text-black" style={{ backgroundImage: "url('hero-bg.jpg')" }}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Connecting Wholesalers and Retailers for Seamless Bulk Transactions</h1>
        <p className="text-lg mb-6">Discover products in bulk, negotiate prices, and streamline your supply chain.</p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-64 text-center">
            <h3 className="text-xl font-bold mb-2">I am a Retailer</h3>
            <p className="text-gray-600 mb-4">Looking to buy products in bulk from wholesalers</p>
            <Link to="/register?type=retailer" className="bg-blue-600 px-6 py-2 text-white font-bold rounded-lg hover:bg-blue-500 inline-block">Sign Up as Retailer</Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-64 text-center">
            <h3 className="text-xl font-bold mb-2">I am a Wholesaler</h3>
            <p className="text-gray-600 mb-4">Looking to sell products in bulk to retailers</p>
            <Link to="/register?type=wholesaler" className="bg-purple-600 px-6 py-2 text-white font-bold rounded-lg hover:bg-purple-500 inline-block">Sign Up as Wholesaler</Link>
          </div>
        </div>
        
        <div>
          <a href="#marketplace" className="bg-gray-800 px-6 py-3 text-white font-bold rounded-lg hover:bg-gray-700">Browse Marketplace</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;