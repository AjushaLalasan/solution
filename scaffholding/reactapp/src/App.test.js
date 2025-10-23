import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock alert
global.alert = jest.fn();

// Mock timers for clock components
jest.useFakeTimers();

describe('Student Admission and Feedback System', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  test('renders clock tab by default and other tabs', () => {
    render(<App />);
    
    expect(screen.getByTestId('clock-tab')).toBeInTheDocument();
    expect(screen.getByTestId('admission-tab')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-tab')).toBeInTheDocument();
    expect(screen.getByText('Class Component Clock')).toBeInTheDocument();
    expect(screen.getByText('Functional Component Clock')).toBeInTheDocument();
  });

  test('switches between tabs', () => {
    render(<App />);
    
    // Initially on clock tab
    expect(screen.getByText('Class Component Clock')).toBeInTheDocument();
    
    // Switch to admission tab
    fireEvent.click(screen.getByTestId('admission-tab'));
    expect(screen.getByText('Student Admission Form (Controlled)')).toBeInTheDocument();
    
    // Switch to feedback tab
    fireEvent.click(screen.getByTestId('feedback-tab'));
    expect(screen.getByText('Feedback Form (Uncontrolled)')).toBeInTheDocument();
    expect(screen.getByText('Student Records')).toBeInTheDocument();
    
    // Switch back to clock tab
    fireEvent.click(screen.getByTestId('clock-tab'));
    expect(screen.getByText('Class Component Clock')).toBeInTheDocument();
    expect(screen.getByText('Functional Component Clock')).toBeInTheDocument();
  });

  describe('Clock Components', () => {
    test('displays both class and functional clocks with default cities', () => {
      render(<App />);
      
      expect(screen.getByText('Class Component Clock')).toBeInTheDocument();
      expect(screen.getByText('Functional Component Clock')).toBeInTheDocument();
      
      // Check for default cities in both components
      const newYorkElements = screen.getAllByText(/New York:/);
      const londonElements = screen.getAllByText(/London:/);
      const tokyoElements = screen.getAllByText(/Tokyo:/);
      
      expect(newYorkElements).toHaveLength(2); // One in each component
      expect(londonElements).toHaveLength(2);
      expect(tokyoElements).toHaveLength(2);
    });
  });

  describe('Student Admission Form - Controlled Components', () => {
    beforeEach(() => {
      render(<App />);
      fireEvent.click(screen.getByTestId('admission-tab'));
    });
    test('updates input values when typing', () => {
      render(<App />);
      
      const nameInput = screen.getByTestId('student-name-input');
      const emailInput = screen.getByTestId('email-input');
      const courseSelect = screen.getByTestId('course-select');
      const ageInput = screen.getByTestId('age-input');
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(courseSelect, { target: { value: 'Computer Science' } });
      fireEvent.change(ageInput, { target: { value: '25' } });
      
      expect(nameInput.value).toBe('John Doe');
      expect(emailInput.value).toBe('john@example.com');
      expect(courseSelect.value).toBe('Computer Science');
      expect(ageInput.value).toBe('25');
    });

    test('shows validation errors for empty required fields', async () => {
      render(<App />);
      
      const submitButton = screen.getByTestId('admit-student-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Student name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Course is required')).toBeInTheDocument();
        expect(screen.getByText('Age must be between 18 and 60')).toBeInTheDocument();
      });
    });

    test('shows validation error for invalid email', async () => {
      render(<App />);
      
      const emailInput = screen.getByTestId('email-input');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      
      const submitButton = screen.getByTestId('admit-student-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email is invalid')).toBeInTheDocument();
      });
    });

    test('admits student successfully with valid data', async () => {
      render(<App />);
      
      fireEvent.change(screen.getByTestId('student-name-input'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('course-select'), { target: { value: 'Computer Science' } });
      fireEvent.change(screen.getByTestId('age-input'), { target: { value: '25' } });
      
      const submitButton = screen.getByTestId('admit-student-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Student admitted successfully!');
      });
    });

    test('clears errors when user starts typing', async () => {
      render(<App />);
      
      const submitButton = screen.getByTestId('admit-student-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Student name is required')).toBeInTheDocument();
      });
      
      const nameInput = screen.getByTestId('student-name-input');
      fireEvent.change(nameInput, { target: { value: 'J' } });
      
      await waitFor(() => {
        expect(screen.queryByText('Student name is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('Feedback Form - Uncontrolled Components', () => {
    beforeEach(() => {
      render(<App />);
      fireEvent.click(screen.getByTestId('feedback-tab'));
    });

    test('shows validation errors for empty required fields', async () => {
      const submitButton = screen.getByTestId('submit-feedback-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Student email is required')).toBeInTheDocument();
        expect(screen.getByText('Feedback message is required')).toBeInTheDocument();
      });
    });

    test('shows validation error for short feedback message', async () => {
      const feedbackTextarea = screen.getByTestId('feedback-textarea');
      fireEvent.change(feedbackTextarea, { target: { value: 'Short message' } });
      
      const submitButton = screen.getByTestId('submit-feedback-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Feedback message should have at least 20 characters')).toBeInTheDocument();
      });
    });

    test('submits feedback successfully with valid data', async () => {
      const emailInput = screen.getByTestId('student-email-input');
      const feedbackTextarea = screen.getByTestId('feedback-textarea');
      
      fireEvent.change(emailInput, { target: { value: 'student@example.com' } });
      fireEvent.change(feedbackTextarea, { target: { value: 'This is a very detailed feedback message with more than 20 characters' } });
      
      const submitButton = screen.getByTestId('submit-feedback-button');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Feedback submitted successfully!');
      });
    });
  });

  describe('Student Display Component', () => {
    test('displays admitted students in feedback tab', async () => {
      render(<App />);
      
      // Add a student first
      fireEvent.change(screen.getByTestId('student-name-input'), { target: { value: 'Jane Smith' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'jane@example.com' } });
      fireEvent.change(screen.getByTestId('course-select'), { target: { value: 'Engineering' } });
      fireEvent.change(screen.getByTestId('age-input'), { target: { value: '22' } });
      
      fireEvent.click(screen.getByTestId('admit-student-button'));
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Student admitted successfully!');
      });
      
      // Switch to feedback tab to see the student
      fireEvent.click(screen.getByTestId('feedback-tab'));
      
      await waitFor(() => {
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
        expect(screen.getByText('Engineering')).toBeInTheDocument();
      });
    });
  });

  describe('Integration Tests', () => {
    test('complete workflow across tabs', async () => {
      render(<App />);
      
      // Admit a student
      fireEvent.change(screen.getByTestId('student-name-input'), { target: { value: 'Alice Johnson' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'alice@example.com' } });
      fireEvent.change(screen.getByTestId('course-select'), { target: { value: 'Business' } });
      fireEvent.change(screen.getByTestId('age-input'), { target: { value: '28' } });
      
      fireEvent.click(screen.getByTestId('admit-student-button'));
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Student admitted successfully!');
      });
      
      // Switch to feedback tab
      fireEvent.click(screen.getByTestId('feedback-tab'));
      
      // Submit feedback
      fireEvent.change(screen.getByTestId('student-email-input'), { target: { value: 'alice@example.com' } });
      fireEvent.change(screen.getByTestId('feedback-textarea'), { target: { value: 'Great experience with the admission process and course information provided' } });
      
      fireEvent.click(screen.getByTestId('submit-feedback-button'));
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Feedback submitted successfully!');
      });
      
      // Verify both are displayed in feedback tab
      await waitFor(() => {
        expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
        expect(screen.getByText('Business')).toBeInTheDocument();
        expect(screen.getByText('Great experience with the admission process and course information provided')).toBeInTheDocument();
      });
    });
  });
});