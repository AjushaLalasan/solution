import React from 'react';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to E-Shop</h1>
        <p>Your one-stop destination for quality products</p>
        <div className="hero-buttons">
          <button className="btn-primary">Shop Now</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Why Choose E-Shop?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Quality Products</h3>
            <p>Curated selection of high-quality items</p>
          </div>
          <div className="feature-card">
            <h3>Fast Shipping</h3>
            <p>Quick delivery to your doorstep</p>
          </div>
          <div className="feature-card">
            <h3>Great Prices</h3>
            <p>Competitive pricing on all products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;