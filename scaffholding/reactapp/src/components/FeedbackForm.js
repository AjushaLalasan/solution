import React, { useRef, useState } from 'react';

const FeedbackForm = ({ onAddFeedback }) => {
  const studentEmailRef = useRef();
  const feedbackMessageRef = useRef();
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const studentEmail = studentEmailRef.current.value.trim();
    const feedbackMessage = feedbackMessageRef.current.value.trim();

    if (!studentEmail) {
      newErrors.studentEmail = 'Student email is required';
    } else if (!validateEmail(studentEmail)) {
      newErrors.studentEmail = 'Email is invalid';
    }

    if (!feedbackMessage) {
      newErrors.feedbackMessage = 'Feedback message is required';
    } else if (feedbackMessage.length < 20) {
      newErrors.feedbackMessage = 'Feedback message should have at least 20 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onAddFeedback({
        studentEmail,
        feedbackMessage
      });
      studentEmailRef.current.value = '';
      feedbackMessageRef.current.value = '';
      alert('Feedback submitted successfully!');
    }
  };

  const handleInputChange = () => {
    setErrors({});
  };

  return (
    <div className="form-container">
      <h2>Feedback Form (Uncontrolled)</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Student Email:</label>
          <input
            type="email"
            ref={studentEmailRef}
            onChange={handleInputChange}
            data-testid="student-email-input"
          />
          {errors.studentEmail && <span className="error">{errors.studentEmail}</span>}
        </div>

        <div className="field">
          <label>Feedback Message:</label>
          <textarea
            ref={feedbackMessageRef}
            onChange={handleInputChange}
            rows="4"
            placeholder="Please provide your feedback (minimum 20 characters)"
            data-testid="feedback-textarea"
          />
          {errors.feedbackMessage && <span className="error">{errors.feedbackMessage}</span>}
        </div>

        <button type="submit" data-testid="submit-feedback-button">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;