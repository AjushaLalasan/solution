import React from 'react';

const Summary = ({ profileData, feedbackData }) => {
  const hasProfileData = profileData.name || profileData.email || profileData.age || profileData.gender;
  const hasFeedbackData = feedbackData.rating || feedbackData.feedbackMessage;

  if (!hasProfileData && !hasFeedbackData) {
    return null;
  }

  return (
    <div className="summary-container" data-testid="summary">
      <h2>Summary</h2>
      
      {hasProfileData && (
        <div className="profile-summary">
          <h3>Profile Information</h3>
          {profileData.name && <p><strong>Name:</strong> {profileData.name}</p>}
          {profileData.email && <p><strong>Email:</strong> {profileData.email}</p>}
          {profileData.age && <p><strong>Age:</strong> {profileData.age}</p>}
          {profileData.gender && <p><strong>Gender:</strong> {profileData.gender}</p>}
        </div>
      )}

      {hasFeedbackData && (
        <div className="feedback-summary">
          <h3>Feedback Information</h3>
          {feedbackData.rating && <p><strong>Rating:</strong> {feedbackData.rating}/5</p>}
          {feedbackData.feedbackMessage && <p><strong>Message:</strong> {feedbackData.feedbackMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Summary;