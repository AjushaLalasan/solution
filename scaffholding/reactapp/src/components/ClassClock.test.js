import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClassClock from './ClassClock';

// Mock timers
jest.useFakeTimers();

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

  test('displays time in correct format', () => {
    render(<ClassClock />);
    
    // Check if time is displayed in HH:MM:SS format
    const timeElements = screen.getAllByText(/\d{2}:\d{2}:\d{2}/);
    expect(timeElements.length).toBeGreaterThanOrEqual(3);
  });

  test('updates time every second', async () => {
    render(<ClassClock />);
    
    const initialTime = screen.getAllByText(/\d{2}:\d{2}:\d{2}/)[0].textContent;
    
    // Advance timer by 1 second
    jest.advanceTimersByTime(1000);
    
    await waitFor(() => {
      const updatedTime = screen.getAllByText(/\d{2}:\d{2}:\d{2}/)[0].textContent;
      expect(updatedTime).not.toBe(initialTime);
    });
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
    const cityTimes = screen.getAllByText(/:/);
    expect(cityTimes).toHaveLength(3);
  });
});