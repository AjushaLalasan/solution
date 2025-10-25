import React, { useState, useEffect } from 'react';
import DestinationCard from './DestinationCard';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then(response => response.json())
      .then(data => {
        setDestinations(data.slice(0, 6));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching destinations:', error);
        setLoading(false);
      });
  }, []);

  const handleSelectDestination = (destination) => {
    localStorage.setItem('selectedDestination', JSON.stringify(destination));
  };

  if (loading) {
    return <div className="loading">Loading destinations...</div>;
  }

  return (
    <div className="destinations-page">
      <h1>Popular Destinations</h1>
      <div className="destinations-grid">
        {destinations.map(destination => (
          <DestinationCard 
            key={destination.id} 
            destination={destination}
            onSelect={handleSelectDestination}
          />
        ))}
      </div>
    </div>
  );
};

export default Destinations;