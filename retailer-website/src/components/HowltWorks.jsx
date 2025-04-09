import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="text-center py-16 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>
      <div className="flex justify-center gap-8">
        <div className="bg-white p-8 w-1/4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Step 1</h3>
          <p>Create Your Business Profile</p>
        </div>
        <div className="bg-white p-8 w-1/4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Step 2</h3>
          <p>List Products or Request Bulk Orders</p>
        </div>
        <div className="bg-white p-8 w-1/4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Step 3</h3>
          <p>Negotiate, Bid, and Finalize Deals</p>
        </div>
        <div className="bg-white p-8 w-1/4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Step 4</h3>
          <p>Seamless Payment and Delivery</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;