import React from 'react';

const StudentDisplay = ({ students, feedbacks }) => {
  const hasStudents = students.length > 0;
  const hasFeedbacks = feedbacks.length > 0;

  if (!hasStudents && !hasFeedbacks) {
    return (
      <div className="display-container">
        <h2>Student Records</h2>
        <p className="no-data">No student admissions or feedback yet.</p>
      </div>
    );
  }

  return (
    <div className="display-container" data-testid="student-display">
      <h2>Student Records</h2>
      
      {hasStudents && (
        <div className="students-section">
          <h3>Admitted Students</h3>
          <div className="students-grid">
            {students.map(student => (
              <div key={student.id} className="student-card" data-testid="student-item">
                <h4>{student.studentName}</h4>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Age:</strong> {student.age}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasFeedbacks && (
        <div className="feedbacks-section">
          <h3>Student Feedback</h3>
          <div className="feedbacks-grid">
            {feedbacks.map(feedback => (
              <div key={feedback.id} className="feedback-card" data-testid="feedback-item">
                <p><strong>From:</strong> {feedback.studentEmail}</p>
                <p><strong>Feedback:</strong> {feedback.feedbackMessage}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDisplay;