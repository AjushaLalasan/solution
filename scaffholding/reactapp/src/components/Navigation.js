import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/home">{process.env.REACT_APP_AGENCY_NAME}</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link 
            to="/home" 
            className={location.pathname === '/home' ? 'active' : ''}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/destinations" 
            className={location.pathname === '/destinations' ? 'active' : ''}
          >
            Destinations
          </Link>
        </li>
        <li>
          <Link 
            to="/booking" 
            className={location.pathname === '/booking' ? 'active' : ''}
          >
            Booking
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;