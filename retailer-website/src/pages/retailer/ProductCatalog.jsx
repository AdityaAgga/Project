import React, { useState } from 'react';

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'electronics',
    'clothing',
    'home & kitchen',
    'beauty',
    'sports'
  ];

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'electronics',
      price: 99.99,
      stock: 50,
      wholesaler: 'Tech Distributors Inc.',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'electronics',
      price: 199.99,
      stock: 30,
      wholesaler: 'Tech Distributors Inc.',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Men\'s T-Shirt',
      category: 'clothing',
      price: 24.99,
      stock: 100,
      wholesaler: 'Fashion Wholesale Co.',
      image: 'https://via.placeholder.com/150'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Product Catalog</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">Category: {product.category}</p>
                <p className="text-gray-600 mb-2">Wholesaler: {product.wholesaler}</p>
                <p className="text-gray-600 mb-2">Stock: {product.stock} units</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog; 