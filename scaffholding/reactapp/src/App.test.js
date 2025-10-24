import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock timers for components
jest.useFakeTimers();

describe('Clock App', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });
  
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders clock app title', () => {
    render(<App />);
    
    expect(screen.getByText('Clock App')).toBeInTheDocument();
    expect(screen.getByText('React Lifecycle & Hooks Demo')).toBeInTheDocument();
  });

  test('renders both clock components', () => {
    render(<App />);
    
    expect(screen.getByText('Class Component Clock')).toBeInTheDocument();
    expect(screen.getByText('Functional Component Clock')).toBeInTheDocument();
  });

  test('displays time in both components', () => {
    render(<App />);
    
    expect(screen.getByTestId('class-clock-time')).toBeInTheDocument();
    expect(screen.getByTestId('functional-clock-time')).toBeInTheDocument();
  });
});