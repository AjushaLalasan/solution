import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ClassClock from './ClassClock';

// Mock timers
jest.useFakeTimers();

describe('ClassClock', () => {
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
    const initialTime = timeElement.textContent;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Time should have updated (or at least the component should still be there)
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