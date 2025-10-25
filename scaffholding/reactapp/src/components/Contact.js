import React from 'react';

const Contact = () => {
  const portfolioName = process.env.REACT_APP_NAME;
  const portfolioEmail = process.env.REACT_APP_EMAIL;

  return (
    <div className="contact-page">
      <h1>Contact {portfolioName}</h1>
      
      <div className="contact-info">
        <div className="contact-item">
          <h3>Email</h3>
          <p>{portfolioEmail}</p>
        </div>
        
        <div className="contact-item">
          <h3>Phone</h3>
          <p>+1 (555) 123-4567</p>
        </div>
        
        <div className="contact-item">
          <h3>Location</h3>
          <p>San Francisco, CA</p>
        </div>
      </div>

      <div className="contact-form">
        <h3>Send a Message</h3>
        <form>
          <input type="text" placeholder="Your Name" className="form-input" />
          <input type="email" placeholder="Your Email" className="form-input" />
          <textarea placeholder="Your Message" className="form-textarea"></textarea>
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;