import React, { useState, useEffect } from 'react';

function FunctionalClock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock-display">
      <h2>Functional Component Clock</h2>
      <div className="time" data-testid="functional-clock-time">
        {time}
      </div>
    </div>
  );
}

export default FunctionalClock;