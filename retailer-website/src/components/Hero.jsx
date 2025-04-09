import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="bg-cover bg-center text-center py-24 text-black" style={{ backgroundImage: "url('hero-bg.jpg')" }}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Connecting Wholesalers and Retailers for Seamless Bulk Transactions</h1>
        <p className="text-lg mb-6">Discover products in bulk, negotiate prices, and streamline your supply chain.</p>
        <a href="#marketplace" className="bg-blue-600 px-6 py-3 text-white font-bold rounded-lg hover:bg-blue-500">Browse Marketplace</a>
      </div>
    </section>
  );
};

export default Hero;