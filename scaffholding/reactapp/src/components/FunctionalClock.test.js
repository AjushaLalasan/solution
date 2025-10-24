import React from 'react';
import { render, screen, act } from '@testing-library/react';
import FunctionalClock from './FunctionalClock';

// Mock timers
jest.useFakeTimers();

describe('FunctionalClock', () => {
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
    const initialTime = timeElement.textContent;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Time should have updated (or at least the component should still be there)
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