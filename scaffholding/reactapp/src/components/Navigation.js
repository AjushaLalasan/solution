import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/home">E-Shop</Link>
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
            to="/products" 
            className={location.pathname === '/products' ? 'active' : ''}
          >
            Products
          </Link>
        </li>
        <li>
          <Link 
            to="/cart" 
            className={location.pathname === '/cart' ? 'active' : ''}
          >
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;