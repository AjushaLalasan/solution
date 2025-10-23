import React, { useRef, useState } from 'react';

const FeedbackForm = ({ feedbackData, setFeedbackData }) => {
  const ratingRef = useRef();
  const feedbackMessageRef = useRef();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const rating = parseInt(ratingRef.current.value);
    const feedbackMessage = feedbackMessageRef.current.value.trim();

    if (!rating || rating < 1 || rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    if (!feedbackMessage) {
      newErrors.feedbackMessage = 'Feedback message is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setFeedbackData({
        rating: rating.toString(),
        feedbackMessage
      });
      alert('Feedback submitted successfully!');
    }
  };

  const handleInputChange = () => {
    // Clear errors when user starts typing
    setErrors({});
  };

  return (
    <div className="form-container">
      <h2>Feedback Form (Uncontrolled)</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Rating (1-5):</label>
          <select
            ref={ratingRef}
            onChange={handleInputChange}
            data-testid="rating-select"
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors.rating && <span className="error">{errors.rating}</span>}
        </div>

        <div className="field">
          <label>Feedback Message:</label>
          <textarea
            ref={feedbackMessageRef}
            onChange={handleInputChange}
            rows="4"
            data-testid="feedback-textarea"
          />
          {errors.feedbackMessage && <span className="error">{errors.feedbackMessage}</span>}
        </div>

        <button type="submit" data-testid="feedback-submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;