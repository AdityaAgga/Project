import React, { useState } from 'react';
import './ProductCatalog.css'; // Import the CSS file

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
      image: 'https://via.placeholder.com/300x200' // Using a slightly larger placeholder
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'electronics',
      price: 199.99,
      stock: 30,
      wholesaler: 'Tech Distributors Inc.',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      name: 'Men\'s T-Shirt',
      category: 'clothing',
      price: 24.99,
      stock: 100,
      wholesaler: 'Fashion Wholesale Co.',
      image: 'https://via.placeholder.com/300x200'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1 className="catalog-title">Product Catalog</h1>
        <div className="catalog-filters">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="category-select"
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

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-detail">Category: {product.category}</p>
              <p className="product-detail">Wholesaler: {product.wholesaler}</p>
              <p className="product-detail">Stock: {product.stock} units</p>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button className="order-button">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog; 