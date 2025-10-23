import React, { useState, useEffect } from 'react';

const FunctionalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cities, setCities] = useState([
    { name: 'New York', offset: -5 },
    { name: 'London', offset: 0 },
    { name: 'Tokyo', offset: 9 }
  ]);
  const [newCityName, setNewCityName] = useState('');
  const [newCityOffset, setNewCityOffset] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeForCity = (offset) => {
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (offset * 3600000));
    return cityTime.toLocaleTimeString('en-US', { hour12: false });
  };

  const addCity = () => {
    if (newCityName && newCityOffset !== '') {
      setCities([...cities, { name: newCityName, offset: parseFloat(newCityOffset) }]);
      setNewCityName('');
      setNewCityOffset('');
    }
  };

  return (
    <div className="clock-container">
      <h2>Functional Component Clock</h2>
      <div className="time-display">
        {cities.map((city, index) => (
          <div key={index} className="city-time">
            <span className="city-name">{city.name}:</span>
            <span className="time">{getTimeForCity(city.offset)}</span>
          </div>
        ))}
      </div>
      <div className="add-city">
        <input
          type="text"
          placeholder="City name"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
          data-testid="func-city-name-input"
        />
        <input
          type="number"
          placeholder="UTC offset"
          value={newCityOffset}
          onChange={(e) => setNewCityOffset(e.target.value)}
          data-testid="func-city-offset-input"
        />
        <button onClick={addCity} data-testid="func-add-city-btn">Add City</button>
      </div>
    </div>
  );
};

export default FunctionalClock;