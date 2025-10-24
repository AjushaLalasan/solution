import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import ClassClock from './components/ClassClock';
import FunctionalClock from './components/FunctionalClock';

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

describe('ClassClock Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders clock with initial time', () => {
    render(<ClassClock />);
    expect(screen.getByText('Class Component Clock')).toBeInTheDocument();
    expect(screen.getByTestId('class-clock-time')).toBeInTheDocument();
  });

  test('updates time every second', () => {
    render(<ClassClock />);
    const timeElement = screen.getByTestId('class-clock-time');
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(timeElement).toBeInTheDocument();
  });

  test('clears timer on unmount', () => {
    const { unmount } = render(<ClassClock />);
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
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

  test('renders clock with initial time', () => {
    render(<FunctionalClock />);
    expect(screen.getByText('Functional Component Clock')).toBeInTheDocument();
    expect(screen.getByTestId('functional-clock-time')).toBeInTheDocument();
  });

  test('updates time every second', () => {
    render(<FunctionalClock />);
    const timeElement = screen.getByTestId('functional-clock-time');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(timeElement).toBeInTheDocument();
  });

  test('clears timer on unmount', () => {
    const { unmount } = render(<FunctionalClock />);
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});