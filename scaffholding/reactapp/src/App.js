import React, { useState } from 'react';
import StudentAdmissionForm from './components/StudentAdmissionForm';
import FeedbackForm from './components/FeedbackForm';
import StudentDisplay from './components/StudentDisplay';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState('admission');

  const addStudent = (student) => {
    setStudents(prev => [...prev, { ...student, id: Date.now() }]);
  };

  const addFeedback = (feedback) => {
    setFeedbacks(prev => [...prev, { ...feedback, id: Date.now() }]);
  };

  return (
    <div className="App">
      <h1>Student Management System</h1>
      
      <div className="tab-container">
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'admission' ? 'active' : ''}`}
            onClick={() => setActiveTab('admission')}
            data-testid="admission-tab"
          >
            Student Admission
          </button>
          <button 
            className={`tab-button ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={() => setActiveTab('feedback')}
            data-testid="feedback-tab"
          >
            Feedback & Records
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'admission' && (
            <div className="tab-panel">
              <StudentAdmissionForm onAddStudent={addStudent} />
            </div>
          )}
          
          {activeTab === 'feedback' && (
            <div className="tab-panel">
              <div className="feedback-layout">
                <FeedbackForm onAddFeedback={addFeedback} />
                <StudentDisplay students={students} feedbacks={feedbacks} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;