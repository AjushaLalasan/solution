import React, { useState } from 'react';

const ProfileForm = ({ profileData, setProfileData }) => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(profileData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!profileData.age || profileData.age <= 12) {
      newErrors.age = 'Age must be greater than 12';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Profile updated successfully!');
    }
  };

  return (
    <div className="form-container">
      <h2>Profile Update Form (Controlled)</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            data-testid="name-input"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            data-testid="email-input"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="field">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={profileData.age}
            onChange={handleChange}
            data-testid="age-input"
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <div className="field">
          <label>Gender:</label>
          <select
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
            data-testid="gender-select"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" data-testid="profile-submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;