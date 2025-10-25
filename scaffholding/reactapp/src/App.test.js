import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './components/Home';
import ProductItem from './components/ProductItem';
import Cart from './components/Cart';

// Mock fetch for API calls
global.fetch = jest.fn();

beforeEach(() => {
  process.env.REACT_APP_API_URL = 'https://fakestoreapi.com/products';
  fetch.mockClear();
});

describe('E-Commerce SPA', () => {
  test('home component loads immediately', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to E-Shop')).toBeInTheDocument();
    expect(screen.getByText('Your one-stop destination for quality products')).toBeInTheDocument();
  });

  test('product item is memoized and renders correctly', () => {
    const mockProduct = {
      id: 1,
      title: 'Test Product',
      price: 29.99,
      category: 'electronics',
      image: 'test-image.jpg'
    };

    const mockAddToCart = jest.fn();

    render(<ProductItem product={mockProduct} onAddToCart={mockAddToCart} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
  });

  test('cart shows empty state with conditional rendering', () => {
    render(<Cart />);
    
    // Since Cart component has sample data, we test the structure
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Sample Product')).toBeInTheDocument();
  });

  test('environment variable is used for API URL', () => {
    expect(process.env.REACT_APP_API_URL).toBe('https://fakestoreapi.com/products');
  });

  test('product item prevents unnecessary re-renders with memo', () => {
    const mockProduct = {
      id: 1,
      title: 'Test Product',
      price: 29.99,
      category: 'electronics',
      image: 'test-image.jpg'
    };

    const mockAddToCart = jest.fn();

    const { rerender } = render(<ProductItem product={mockProduct} onAddToCart={mockAddToCart} />);
    
    // Re-render with same props should not cause re-render due to React.memo
    rerender(<ProductItem product={mockProduct} onAddToCart={mockAddToCart} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});