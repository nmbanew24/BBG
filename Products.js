import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'Real Estate Market Analysis Template',
      description: 'Comprehensive market analysis template with automated calculations',
      price: 49.99,
      image: 'market-analysis.jpg'
    },
    {
      id: 2,
      title: 'Property Listing Presentation Kit',
      description: 'Professional presentation templates for property listings',
      price: 79.99,
      image: 'presentation-kit.jpg'
    },
    {
      id: 3,
      title: 'Real Estate Marketing Strategy Guide',
      description: 'Complete guide to digital marketing for real estate',
      price: 129.99,
      image: 'marketing-guide.jpg'
    }
  ]);

  const navigate = useNavigate();

  const addToCart = (product) => {
    // Get existing cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Add new item
    cartItems.push(product);
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Optional: Show success message or navigate to cart
    navigate('/cart');
  };

  return (
    <div className="products-container">
      <h1>Digital Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <div className="product-price">${product.price}</div>
              <button 
                className="btn btn-primary"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
