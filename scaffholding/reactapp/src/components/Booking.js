import React, { useState, useEffect } from 'react';

const Booking = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: 1
  });

  useEffect(() => {
    const saved = localStorage.getItem('selectedDestination');
    if (saved) {
      setSelectedDestination(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking submitted successfully!');
  };

  return (
    <div className="booking-page">
      <h1>Book Your Trip</h1>
      
      {selectedDestination ? (
        <div className="booking-content">
          <div className="selected-destination">
            <h3>Selected Destination: {selectedDestination.title}</h3>
            <p>{selectedDestination.body}</p>
          </div>
          
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Travel Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Number of Guests:</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Guests</option>
              </select>
            </div>
            
            <button type="submit" className="btn-primary">
              Book Now
            </button>
          </form>
        </div>
      ) : (
        <div className="no-destination">
          <p>Please select a destination first to proceed with booking.</p>
          <button className="btn-secondary">Browse Destinations</button>
        </div>
      )}
    </div>
  );
};

export default Booking;