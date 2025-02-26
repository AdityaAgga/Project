import React from "react";

const Pricing = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800">Pricing Plans</h1>
      <p className="text-center text-gray-600 mt-2">Choose a plan that fits your needs</p>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {/* Free Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
          <h2 className="text-2xl font-semibold">Free Plan</h2>
          <p className="text-gray-600 mt-2">For individuals sharing resources</p>
          <p className="text-3xl font-bold mt-4">$0/month</p>
          <ul className="mt-4 text-gray-700">
            <li>✅ Access to community listings</li>
            <li>✅ Basic resource sharing</li>
            <li>❌ Premium support</li>
          </ul>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
            Get Started
          </button>
        </div>

        {/* Standard Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center border-2 border-blue-500">
          <h2 className="text-2xl font-semibold">Standard Plan</h2>
          <p className="text-gray-600 mt-2">For active contributors</p>
          <p className="text-3xl font-bold mt-4">$10/month</p>
          <ul className="mt-4 text-gray-700">
            <li>✅ Access to all community resources</li>
            <li>✅ Priority listing</li>
            <li>✅ Community chat access</li>
            <li>❌ Personalized support</li>
          </ul>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
            Subscribe
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
          <h2 className="text-2xl font-semibold">Premium Plan</h2>
          <p className="text-gray-600 mt-2">For organizations & leaders</p>
          <p className="text-3xl font-bold mt-4">$25/month</p>
          <ul className="mt-4 text-gray-700">
            <li>✅ All Standard Plan benefits</li>
            <li>✅ Dedicated support</li>
            <li>✅ Advertisement-free experience</li>
            <li>✅ Access to premium tools</li>
          </ul>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
