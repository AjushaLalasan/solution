import React, { useState } from 'react';

const StudentAdmissionForm = ({ onAddStudent }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    course: '',
    age: ''
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    if (!formData.age || formData.age < 18 || formData.age > 60) {
      newErrors.age = 'Age must be between 18 and 60';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddStudent(formData);
      setFormData({
        studentName: '',
        email: '',
        course: '',
        age: ''
      });
      alert('Student admitted successfully!');
    }
  };

  return (
    <div className="form-container">
      <h2>Student Admission Form (Controlled)</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Student Name:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            data-testid="student-name-input"
          />
          {errors.studentName && <span className="error">{errors.studentName}</span>}
        </div>

        <div className="field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="email-input"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="field">
          <label>Course:</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            data-testid="course-select"
          >
            <option value="">Select Course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Medicine">Medicine</option>
            <option value="Arts">Arts</option>
          </select>
          {errors.course && <span className="error">{errors.course}</span>}
        </div>

        <div className="field">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="18"
            max="60"
            data-testid="age-input"
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <button type="submit" data-testid="admit-student-button">
          Admit Student
        </button>
      </form>
    </div>
  );
};

export default StudentAdmissionForm;