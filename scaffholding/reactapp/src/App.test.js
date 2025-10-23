import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import ClassGreeting from './components/ClassGreeting';
import FunctionalGreeting from './components/FunctionalGreeting';

// Mock timers for components
jest.useFakeTimers();

// Mock console methods
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

describe('Countdown Greeting App', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    consoleSpy.mockClear();
  });
  
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders greeting components', () => {
    render(<App />);
    
    expect(screen.getByText('Countdown Greeting Message')).toBeInTheDocument();
    expect(screen.getByText('Class Component Greeting')).toBeInTheDocument();
    expect(screen.getByText('Functional Component Greeting')).toBeInTheDocument();
  });

  test('displays greeting components with countdown', () => {
    render(<App />);
    
    expect(screen.getAllByText(/Hello, React!/)).toHaveLength(2);
    expect(screen.getAllByText(/Time left: 10 seconds/)).toHaveLength(2);
  });
});

describe('ClassGreeting Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    consoleSpy.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders greeting message and countdown', () => {
    const mockTimeout = jest.fn();
    render(<ClassGreeting onTimeout={mockTimeout} />);
    
    expect(screen.getByText('Class Component Greeting')).toBeInTheDocument();
    expect(screen.getByText(/Hello, React!/)).toBeInTheDocument();
    expect(screen.getByText(/Time left: 10 seconds/)).toBeInTheDocument();
  });

  test('logs mount message on componentDidMount', () => {
    const mockTimeout = jest.fn();
    render(<ClassGreeting onTimeout={mockTimeout} />);
    
    expect(consoleSpy).toHaveBeenCalledWith('Greeting Mounted');
  });


});

describe('FunctionalGreeting Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    consoleSpy.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders greeting message and countdown', () => {
    const mockTimeout = jest.fn();
    render(<FunctionalGreeting onTimeout={mockTimeout} />);
    
    expect(screen.getByText('Functional Component Greeting')).toBeInTheDocument();
    expect(screen.getByText(/Hello, React!/)).toBeInTheDocument();
    expect(screen.getByText(/Time left: 10 seconds/)).toBeInTheDocument();
  });

  test('logs mount message on useEffect', () => {
    const mockTimeout = jest.fn();
    render(<FunctionalGreeting onTimeout={mockTimeout} />);
    
    expect(consoleSpy).toHaveBeenCalledWith('Greeting Mounted');
  });



  test('logs unmount message on cleanup', () => {
    const mockTimeout = jest.fn();
    const { unmount } = render(<FunctionalGreeting onTimeout={mockTimeout} />);
    
    unmount();
    expect(consoleSpy).toHaveBeenCalledWith('Greeting Unmounted');
  });
});



