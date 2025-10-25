import React from 'react';

const DestinationCard = React.memo(({ destination, onSelect }) => {
  return (
    <div className="destination-card">
      <img 
        src={`https://picsum.photos/300/200?random=${destination.id}`} 
        alt={destination.title}
        className="destination-image"
      />
      <div className="destination-info">
        <h3 className="destination-title">{destination.title}</h3>
        <p className="destination-description">{destination.body}</p>
        <div className="destination-price">From $999</div>
        <button 
          className="btn-primary select-btn"
          onClick={() => onSelect(destination)}
        >
          Select Destination
        </button>
      </div>
    </div>
  );
});

export default DestinationCard;