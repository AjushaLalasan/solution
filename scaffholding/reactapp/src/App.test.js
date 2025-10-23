import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock alert
global.alert = jest.fn();

describe('Profile Update and Feedback Forms', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders both forms and summary section', () => {
    render(<App />);
    
    expect(screen.getByText('Profile Update Form (Controlled)')).toBeInTheDocument();
    expect(screen.getByText('Feedback Form (Uncontrolled)')).toBeInTheDocument();
  });

  describe('Profile Form - Controlled Components', () => {
    test('updates input values when typing', () => {
      render(<App />);
      
      const nameInput = screen.getByTestId('name-input');
      const emailInput = screen.getByTestId('email-input');
      const ageInput = screen.getByTestId('age-input');
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(ageInput, { target: { value: '25' } });
      
      expect(nameInput.value).toBe('John Doe');
      expect(emailInput.value).toBe('john@example.com');
      expect(ageInput.value).toBe('25');
    });

    test('shows validation errors for empty required fields', async () => {
      render(<App />);
      
      const submitButton = screen.getByTestId('profile-submit');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Age must be greater than 12')).toBeInTheDocument();
      });
    });

    test('shows validation error for invalid email', async () => {
      render(<App />);
      
      const emailInput = screen.getByTestId('email-input');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      
      const submitButton = screen.getByTestId('profile-submit');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Email is invalid')).toBeInTheDocument();
      });
    });

    test('shows validation error for age less than or equal to 12', async () => {
      render(<App />);
      
      const ageInput = screen.getByTestId('age-input');
      fireEvent.change(ageInput, { target: { value: '10' } });
      
      const submitButton = screen.getByTestId('profile-submit');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Age must be greater than 12')).toBeInTheDocument();
      });
    });

    test('submits successfully with valid data', async () => {
      render(<App />);
      
      fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('age-input'), { target: { value: '25' } });
      fireEvent.change(screen.getByTestId('gender-select'), { target: { value: 'male' } });
      
      const submitButton = screen.getByTestId('profile-submit');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Profile updated successfully!');
      });
    });

    test('clears errors when user starts typing', async () => {
      render(<App />);
      
      const submitButton = screen.getByTestId('profile-submit');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
      
      const nameInput = screen.getByTestId('name-input');
      fireEvent.change(nameInput, { target: { value: 'J' } });
      
      await waitFor(() => {
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
      });
    });
  });

  describe('Feedback Form - Uncontrolled Components', () => {
    test('shows validation errors for empty required fields', async () => {
      render(<App />);
      
      const submitButton = screen.getByTestId('feedback-submit');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Rating must be between 1 and 5')).toBeInTheDocument();
        expect(screen.getByText('Feedback message is required')).toBeInTheDocument();
      });
    });

    test('submits successfully with valid data', async () => {
      render(<App />);
      
      const ratingSelect = screen.getByTestId('rating-select');
      const feedbackTextarea = screen.getByTestId('feedback-textarea');
      
      fireEvent.change(ratingSelect, { target: { value: '4' } });
      fireEvent.change(feedbackTextarea, { target: { value: 'Great service!' } });
      
      const submitButton = screen.getByTestId('feedback-submit');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Feedback submitted successfully!');
      });
    });

    test('clears errors when user interacts with form', async () => {
      render(<App />);
      
      const submitButton = screen.getByTestId('feedback-submit');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Rating must be between 1 and 5')).toBeInTheDocument();
      });
      
      const ratingSelect = screen.getByTestId('rating-select');
      fireEvent.change(ratingSelect, { target: { value: '3' } });
      
      await waitFor(() => {
        expect(screen.queryByText('Rating must be between 1 and 5')).not.toBeInTheDocument();
      });
    });
  });

  describe('Summary Component', () => {
    test('displays profile data in summary when form is filled', async () => {
      render(<App />);
      
      fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByTestId('age-input'), { target: { value: '25' } });
      fireEvent.change(screen.getByTestId('gender-select'), { target: { value: 'male' } });
      
      await waitFor(() => {
        const summary = screen.getByTestId('summary');
        expect(summary).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('25')).toBeInTheDocument();
        expect(screen.getByText('male')).toBeInTheDocument();
      });
    });

    test('displays feedback data in summary when feedback is submitted', async () => {
      render(<App />);
      
      const ratingSelect = screen.getByTestId('rating-select');
      const feedbackTextarea = screen.getByTestId('feedback-textarea');
      
      fireEvent.change(ratingSelect, { target: { value: '5' } });
      fireEvent.change(feedbackTextarea, { target: { value: 'Excellent experience!' } });
      
      const submitButton = screen.getByTestId('feedback-submit');
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        const summary = screen.getByTestId('summary');
        expect(summary).toBeInTheDocument();
        expect(screen.getByText('5/5')).toBeInTheDocument();
        expect(screen.getByText('Excellent experience!')).toBeInTheDocument();
      });
    });

    test('does not display summary when no data is present', () => {
      render(<App />);
      
      const summary = screen.queryByTestId('summary');
      expect(summary).not.toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    test('both forms work independently and display in summary', async () => {
      render(<App />);
      
      fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Jane Smith' } });
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'jane@example.com' } });
      fireEvent.change(screen.getByTestId('age-input'), { target: { value: '30' } });
      
      fireEvent.click(screen.getByTestId('profile-submit'));
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Profile updated successfully!');
      });
      
      fireEvent.change(screen.getByTestId('rating-select'), { target: { value: '4' } });
      fireEvent.change(screen.getByTestId('feedback-textarea'), { target: { value: 'Good service' } });
      fireEvent.click(screen.getByTestId('feedback-submit'));
      
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Feedback submitted successfully!');
      });
      
      await waitFor(() => {
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
        expect(screen.getByText('4/5')).toBeInTheDocument();
        expect(screen.getByText('Good service')).toBeInTheDocument();
      });
    });
  });
});