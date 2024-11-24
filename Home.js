import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to Digital Real Estate Products</h1>
        <p>Discover premium digital products for real estate professionals</p>
        {!user && (
          <div className="cta-buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/products" className="btn btn-secondary">Browse Products</Link>
          </div>
        )}
      </header>
      
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {/* Featured products will be mapped here */}
        </div>
      </section>

      <section className="value-proposition">
        <h2>Why Choose Our Products?</h2>
        <div className="benefits">
          <div className="benefit">
            <h3>Professional Quality</h3>
            <p>High-quality digital resources designed for real estate success</p>
          </div>
          <div className="benefit">
            <h3>Instant Access</h3>
            <p>Download immediately after purchase</p>
          </div>
          <div className="benefit">
            <h3>Expert Support</h3>
            <p>Dedicated support for all your questions</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
