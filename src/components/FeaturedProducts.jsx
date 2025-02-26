import React from 'react';

const FeaturedProducts = () => {
  return (
    <section id="featured-products" className="text-center py-16 bg-white">
      <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
      <div className="flex justify-center gap-8">
        <div className="bg-gray-100 p-6 w-1/4 rounded-lg shadow-md">
          <img src="product1.jpg" alt="Product 1" className="w-full h-40 object-cover rounded-lg mb-4" />
          <h3 className="font-semibold mb-2">Product Name</h3>
          <p className="text-lg">Price per unit: Rs100</p>
          <a href="#" className="bg-blue-600 px-6 py-2 text-white font-bold rounded-lg mt-4 inline-block hover:bg-blue-500">View Details</a>
        </div>
        {/* Repeat for other products */}
      </div>
    </section>
  );
};

export default FeaturedProducts;