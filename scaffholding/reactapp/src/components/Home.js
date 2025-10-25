import React from 'react';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to {process.env.REACT_APP_AGENCY_NAME}</h1>
        <p>Discover amazing destinations and create unforgettable memories</p>
        <div className="hero-buttons">
          <button className="btn-primary">Explore Destinations</button>
          <button className="btn-secondary">Book Now</button>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Why Travel With Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Expert Guides</h3>
            <p>Our experienced guides ensure you have the best travel experience</p>
          </div>
          <div className="feature-card">
            <h3>Best Prices</h3>
            <p>Get the best deals on flights, hotels, and vacation packages</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>Our travel experts are available around the clock to assist you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;