import React from 'react';

const Home = () => {
  const portfolioName = process.env.REACT_APP_NAME;

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to {portfolioName}'s Portfolio</h1>
        <p>Full Stack Developer & UI/UX Designer</p>
        <div className="hero-buttons">
          <button className="btn-primary">View Projects</button>
          <button className="btn-secondary">Contact Me</button>
        </div>
      </div>
      
      <div className="about-section">
        <h2>About Me</h2>
        <p>
          I'm a passionate developer with expertise in React, Node.js, and modern web technologies. 
          I love creating beautiful and functional web applications.
        </p>
      </div>
    </div>
  );
};

export default Home;