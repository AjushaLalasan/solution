import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FunctionalClock from './FunctionalClock';

// Mock timers
jest.useFakeTimers();

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

  test('displays time in correct format', () => {
    render(<FunctionalClock />);
    
    // Check if time is displayed in HH:MM:SS format
    const timeElements = screen.getAllByText(/\d{2}:\d{2}:\d{2}/);
    expect(timeElements.length).toBeGreaterThanOrEqual(3);
  });

  test('updates time every second', async () => {
    render(<FunctionalClock />);
    
    const initialTime = screen.getAllByText(/\d{2}:\d{2}:\d{2}/)[0].textContent;
    
    // Advance timer by 1 second
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      const updatedTime = screen.getAllByText(/\d{2}:\d{2}:\d{2}/)[0].textContent;
      expect(updatedTime).not.toBe(initialTime);
    });
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
    const cityTimes = screen.getAllByText(/:/);
    expect(cityTimes).toHaveLength(3);
  });

  test('handles cleanup on unmount', () => {
    const { unmount } = render(<FunctionalClock />);
    
    // Verify timer is running
    expect(setInterval).toHaveBeenCalled();
    
    // Unmount component
    unmount();
    
    // Verify cleanup function is called
    expect(clearInterval).toHaveBeenCalled();
  });
});