import React, { useState } from 'react';
import ProfileForm from './ProfileForm';
import FeedbackForm from './FeedbackForm';
import Summary from './Summary';
import './App.css';

function App() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  const [feedbackData, setFeedbackData] = useState({
    rating: '',
    feedbackMessage: ''
  });

  return (
    <div className="App">
      <h1>Profile Update and Feedback Forms</h1>
      
      <div className="forms-container">
        <ProfileForm 
          profileData={profileData} 
          setProfileData={setProfileData} 
        />
        
        <FeedbackForm 
          feedbackData={feedbackData} 
          setFeedbackData={setFeedbackData} 
        />
      </div>
      
      <Summary 
        profileData={profileData} 
        feedbackData={feedbackData} 
      />
    </div>
  );
}

export default App;