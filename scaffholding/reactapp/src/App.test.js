import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import ClassClock from './components/ClassClock';
import FunctionalClock from './components/FunctionalClock';

// Mock timers for clock components
jest.useFakeTimers();

describe('Multi-Time Zone Clock App', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });
  
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders both clock components', () => {
    render(<App />);
    
    expect(screen.getByText('Multi-Time Zone Clock')).toBeInTheDocument();
    expect(screen.getByText('Class Component Clock')).toBeInTheDocument();
    expect(screen.getByText('Functional Component Clock')).toBeInTheDocument();
  });

  test('displays default cities in both components', () => {
    render(<App />);
    
    // Check for default cities in both components
    const newYorkElements = screen.getAllByText(/New York:/);
    const londonElements = screen.getAllByText(/London:/);
    const tokyoElements = screen.getAllByText(/Tokyo:/);
    
    expect(newYorkElements).toHaveLength(2); // One in each component
    expect(londonElements).toHaveLength(2);
    expect(tokyoElements).toHaveLength(2);
  });

  test('displays time in correct format', () => {
    render(<App />);
    
    // Check if time is displayed in HH:MM:SS format
    const timeElements = screen.getAllByText(/\d{2}:\d{2}:\d{2}/);
    expect(timeElements.length).toBeGreaterThanOrEqual(6); // 3 cities × 2 components
  });
});

describe('ClassClock Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders class component clock with default cities', () => {
    render(<ClassClock />);
    
    expect(screen.getByText('Class Component Clock')).toBeInTheDocument();
    expect(screen.getByText(/New York:/)).toBeInTheDocument();
    expect(screen.getByText(/London:/)).toBeInTheDocument();
    expect(screen.getByText(/Tokyo:/)).toBeInTheDocument();
  });

  test('adds new city when form is submitted', () => {
    render(<ClassClock />);
    
    const cityInput = screen.getByTestId('city-name-input');
    const offsetInput = screen.getByTestId('city-offset-input');
    const addButton = screen.getByTestId('add-city-btn');
    
    fireEvent.change(cityInput, { target: { value: 'Paris' } });
    fireEvent.change(offsetInput, { target: { value: '1' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText(/Paris:/)).toBeInTheDocument();
  });

  test('clears input fields after adding city', () => {
    render(<ClassClock />);
    
    const cityInput = screen.getByTestId('city-name-input');
    const offsetInput = screen.getByTestId('city-offset-input');
    const addButton = screen.getByTestId('add-city-btn');
    
    fireEvent.change(cityInput, { target: { value: 'Berlin' } });
    fireEvent.change(offsetInput, { target: { value: '2' } });
    fireEvent.click(addButton);
    
    expect(cityInput.value).toBe('');
    expect(offsetInput.value).toBe('');
  });

  test('does not add city with empty name', () => {
    render(<ClassClock />);
    
    const offsetInput = screen.getByTestId('city-offset-input');
    const addButton = screen.getByTestId('add-city-btn');
    
    fireEvent.change(offsetInput, { target: { value: '3' } });
    fireEvent.click(addButton);
    
    // Should still only have the original 3 cities
    const cityNames = screen.getAllByText(/New York:|London:|Tokyo:/);
    expect(cityNames).toHaveLength(3);
  });
});

describe('FunctionalClock Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders functional component clock with default cities', () => {
    render(<FunctionalClock />);
    
    expect(screen.getByText('Functional Component Clock')).toBeInTheDocument();
    expect(screen.getByText(/New York:/)).toBeInTheDocument();
    expect(screen.getByText(/London:/)).toBeInTheDocument();
    expect(screen.getByText(/Tokyo:/)).toBeInTheDocument();
  });

  test('adds new city when form is submitted', () => {
    render(<FunctionalClock />);
    
    const cityInput = screen.getByTestId('func-city-name-input');
    const offsetInput = screen.getByTestId('func-city-offset-input');
    const addButton = screen.getByTestId('func-add-city-btn');
    
    fireEvent.change(cityInput, { target: { value: 'Sydney' } });
    fireEvent.change(offsetInput, { target: { value: '10' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText(/Sydney:/)).toBeInTheDocument();
  });

  test('clears input fields after adding city', () => {
    render(<FunctionalClock />);
    
    const cityInput = screen.getByTestId('func-city-name-input');
    const offsetInput = screen.getByTestId('func-city-offset-input');
    const addButton = screen.getByTestId('func-add-city-btn');
    
    fireEvent.change(cityInput, { target: { value: 'Mumbai' } });
    fireEvent.change(offsetInput, { target: { value: '5.5' } });
    fireEvent.click(addButton);
    
    expect(cityInput.value).toBe('');
    expect(offsetInput.value).toBe('');
  });

  test('does not add city with empty name', () => {
    render(<FunctionalClock />);
    
    const offsetInput = screen.getByTestId('func-city-offset-input');
    const addButton = screen.getByTestId('func-add-city-btn');
    
    fireEvent.change(offsetInput, { target: { value: '-8' } });
    fireEvent.click(addButton);
    
    // Should still only have the original 3 cities
    const cityNames = screen.getAllByText(/New York:|London:|Tokyo:/);
    expect(cityNames).toHaveLength(3);
  });
});