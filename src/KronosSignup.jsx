import React, { useState } from 'react';
import './KronosSignup.css';

const KronosSignup = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    role: '',
    department: '',
    organization: '',
    password: '',
    confirm_password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [pendingUser, setPendingUser] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If role is changed, clear department and organization for GSO roles
    if (name === 'role' && (value === 'GSO Director' || value === 'GSO Officer')) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        department: '',
        organization: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleEmailBlur = () => {
    const email = formData.email;
    if (email && !email.endsWith('@dyci.edu.ph')) {
      setEmailError('Email must be from @dyci.edu.ph domain');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordBlur = () => {
    const password = formData.password;
    const confirmPassword = formData.confirm_password;
    
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Reset errors
    setError('');
    setEmailError('');
    setPasswordError('');

    // Validate email domain
    if (!formData.email.endsWith('@dyci.edu.ph')) {
      setError('Email must be from @dyci.edu.ph domain');
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Generate verification code
    const code = generateVerificationCode();
    
    // Store user data (in production, this would be sent to backend)
    const userData = {
      ...formData,
      verification_code: code,
      password: formData.password // In production, this would be hashed
    };
    
    setPendingUser(userData);
    
    // In production, send email with verification code
    console.log('Verification code sent to email:', code);
    
    setShowModal(true);
  };

  const handleVerification = (e) => {
    e.preventDefault();
    
    if (pendingUser && verificationCode === pendingUser.verification_code) {
      // In production, save user to database
      setSuccess('Account created successfully!');
      setShowModal(false);
      // Redirect to main page
      console.log('User registered successfully:', pendingUser);
      // window.location.href = '/main'; // In production
    } else {
      setVerificationError('Invalid verification code. Please try again.');
    }
  };

  const handleVerificationInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setVerificationCode(value);
  };

  // Check if department and organization fields should be disabled
  const isDepartmentDisabled = formData.role === 'GSO Director' || formData.role === 'GSO Officer';

  return (
    <div className="signup-container">
      <div className="form-card">
        {/* Header */}
        <div className="header">
          <div className="logo-container">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6L10 13L14 9L21 16"
                  stroke="#FF6B6B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 13L5 18L14 9L19 4"
                  stroke="#FF6B6B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="logo-text">KRONOS</div>
          </div>
          <div className="subtitle">GSO Management System</div>
        </div>

        {/* Form Container */}
        <div>
          <h2 className="form-title">Create your Kronos Account</h2>
          
          {error && (
            <div className="error">{error}</div>
          )}
          
          {success && (
            <div className="success">{success}</div>
          )}

          <div>
            {/* Name */}
            <div className="form-group">
              <label>Name</label>
              <div className="form-row">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="form-input-flex"
                />
                <input
                  type="text"
                  name="middle_name"
                  placeholder="Middle"
                  value={formData.middle_name}
                  onChange={handleInputChange}
                  className="form-input-flex"
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="form-input-flex"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="username@dyci.edu.ph"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleEmailBlur}
                required
                className={`form-input ${emailError ? 'error' : ''}`}
              />
              {emailError && (
                <div className="field-error">{emailError}</div>
              )}
            </div>

            {/* Role */}
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select Role</option>
                <option value="GSO Director">GSO Director</option>
                <option value="GSO Officer">GSO Officer</option>
                <option value="Dean/Head">Dean/Head</option>
                <option value="Faculty Adviser">Faculty Adviser</option>
                <option value="Regular Faculty">Regular Faculty</option>
                <option value="Student">Student</option>
              </select>
            </div>

            {/* Department & Position */}
            <div className="form-group">
              <label>Department & Position</label>
              <div className="form-row-2">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required={!isDepartmentDisabled}
                  disabled={isDepartmentDisabled}
                  className={`form-select ${isDepartmentDisabled ? 'disabled' : ''}`}
                >
                  <option value="">Select Department</option>
                  <option value="COA">College of Accountancy</option>
                  <option value="CBA">College of Business Administration</option>
                  <option value="CCS">College of Computer Studies</option>
                  <option value="CHS">College of Health Sciences</option>
                  <option value="CAS">College of Arts and Sciences</option>
                  <option value="COED">College of Education</option>
                  <option value="CME">College of Maritime Education</option>
                  <option value="SOP">School of Psychology</option>
                  <option value="SME">School of Mechanical Engineering</option>
                  <option value="CHMT">College of Hospitality Management and Tourism</option>
                </select>
                <input
                  type="text"
                  name="organization"
                  placeholder="Organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  required={!isDepartmentDisabled}
                  disabled={isDepartmentDisabled}
                  className={`form-input-flex ${isDepartmentDisabled ? 'disabled' : ''}`}
                />
              </div>
              {isDepartmentDisabled && (
                <div className="field-info">Department and Organization fields are not required for GSO roles.</div>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                onBlur={handlePasswordBlur}
                required
                className={`form-input ${passwordError ? 'error' : ''}`}
              />
              {passwordError && (
                <div className="field-error">{passwordError}</div>
              )}
            </div>

            <button
              type="submit"
              onClick={handleSignup}
              className="submit-btn"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Verify Your Account</h3>
            <p className="modal-text">
              We've sent a 6-digit verification code to your email address. 
              Please enter the code below to complete your registration.
            </p>
            
            {verificationError && (
              <div className="error">{verificationError}</div>
            )}
            
            <div>
              <input
                type="text"
                value={verificationCode}
                onChange={handleVerificationInputChange}
                placeholder="000000"
                maxLength="6"
                required
                className="verification-input"
              />
              <button
                type="button"
                onClick={handleVerification}
                className="verify-btn"
              >
                Verify Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KronosSignup;