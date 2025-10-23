import React, { useState, useEffect } from 'react';

const FunctionalGreeting = ({ onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    console.log('Greeting Mounted');
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      console.log('Greeting Unmounted');
      clearInterval(timer);
    };
  }, [onTimeout]);

  return (
    <div className="greeting-container">
      <h2>Functional Component Greeting</h2>
      <div className="greeting-message">
        <p className="greeting-text">Hello, React! (disappears in 10s)</p>
        <p className="countdown">Time left: {timeLeft} seconds</p>
      </div>
    </div>
  );
};

export default FunctionalGreeting;