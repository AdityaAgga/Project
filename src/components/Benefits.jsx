import React from 'react';

const Benefits = () => {
  return (
    <section id="benefits" className="text-center py-16 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
      <div className="flex justify-center gap-8">
        <div className="w-1/3">
          <h3 className="text-xl font-semibold mb-4">For Wholesalers</h3>
          <p>Increase reach to retailers, manage bulk orders, and offer volume discounts.</p>
        </div>
        <div className="w-1/3">
          <h3 className="text-xl font-semibold mb-4">For Retailers</h3>
          <p>Get competitive pricing, bid on bulk orders, and track your inventory.</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;