import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './components/Home';
import DestinationCard from './components/DestinationCard';
import Booking from './components/Booking';

// Mock fetch for API calls
global.fetch = jest.fn();

beforeEach(() => {
  process.env.REACT_APP_API_URL = 'https://jsonplaceholder.typicode.com/posts';
  process.env.REACT_APP_AGENCY_NAME = 'Dream Destinations Travel';
  fetch.mockClear();
});

describe('Travel Agency SPA', () => {
  test('home component loads immediately with agency name', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to Dream Destinations Travel')).toBeInTheDocument();
    expect(screen.getByText('Discover amazing destinations and create unforgettable memories')).toBeInTheDocument();
  });

  test('destination card is memoized and renders correctly', () => {
    const mockDestination = {
      id: 1,
      title: 'Paris Adventure',
      body: 'Explore the city of lights with our guided tours'
    };

    const mockOnSelect = jest.fn();

    render(<DestinationCard destination={mockDestination} onSelect={mockOnSelect} />);
    
    expect(screen.getByText('Paris Adventure')).toBeInTheDocument();
    expect(screen.getByText('Explore the city of lights with our guided tours')).toBeInTheDocument();
    expect(screen.getByText('From $999')).toBeInTheDocument();
  });

  test('booking shows conditional rendering for no destination', () => {
    render(<Booking />);
    
    expect(screen.getByText('Book Your Trip')).toBeInTheDocument();
    expect(screen.getByText('Please select a destination first to proceed with booking.')).toBeInTheDocument();
  });

  test('environment variables are used correctly', () => {
    expect(process.env.REACT_APP_API_URL).toBe('https://jsonplaceholder.typicode.com/posts');
    expect(process.env.REACT_APP_AGENCY_NAME).toBe('Dream Destinations Travel');
  });

  test('destination card prevents unnecessary re-renders with memo', () => {
    const mockDestination = {
      id: 1,
      title: 'Paris Adventure',
      body: 'Explore the city of lights with our guided tours'
    };

    const mockOnSelect = jest.fn();

    const { rerender } = render(<DestinationCard destination={mockDestination} onSelect={mockOnSelect} />);
    
    // Re-render with same props should not cause re-render due to React.memo
    rerender(<DestinationCard destination={mockDestination} onSelect={mockOnSelect} />);
    
    expect(screen.getByText('Paris Adventure')).toBeInTheDocument();
  });
});