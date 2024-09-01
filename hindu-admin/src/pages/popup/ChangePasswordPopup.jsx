import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ChangePasswordPopup = ({ email,closePopup }) => {
  const [otp, setOtp] = useState(Array(6).fill('')); // Array of 6 OTP blocks
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;

    // Move to the next input field automatically
    if (value.length === 1 && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error messages

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/public/admin/adminChangePass', {
        email: email,
        otp: otp.join(''), // Join the OTP array into a single string
        newPassword: newPassword,
      });

      if (response.status === 200) {
        alert("Password changed ");
        navigate('/login');
        closePopup(); // Close popup on success
      } else {
        setError(response.data.message || 'Failed to change password. Please try again.');
      }
    } catch (err) {
      console.error('Change Password error:', err);
      setError(err.response?.data?.message || 'Server error. Please try again later.');
    }
  };


  const popupStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const contentStyle = {
    backgroundColor: 'rgb(0 29 57)', // Navy blue background color
    padding: '30px', // Increased padding
    borderRadius: '8px', // Rounded corners
    position: 'relative',
    width: '90%',
    maxWidth: '500px',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '22px',
    color: '#87cefa', // Sky blue color for close button
  };

  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: '#87cefa', // Sky blue color for the button
    color: '#003366', // Navy blue text color for the button
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    color: '#003366', // Navy blue text color for input
  };

  const otpContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  };

  const otpBlockStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    textAlign: 'center',
    fontSize: '18px',
    marginRight: '5px', // Reduced margin to bring blocks closer
    color: '#003366', // Navy blue text color
    backgroundColor: '#fff', // White background
  };

  const labelStyle = {
    color: '#fff', // White color for the label text
  };

  const headerStyle = {
    color: '#fff', // White color for the header text
  };

  return (
    <div style={popupStyle}>
      <div style={contentStyle}>
        <span style={closeButtonStyle} onClick={closePopup}>&times;</span>
        <h2 style={headerStyle}>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" style={labelStyle}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>OTP:</label>
            <div style={otpContainerStyle}>
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-${index}`}
                  value={value}
                  onChange={(e) => handleOtpChange(e, index)}
                  maxLength="1"
                  style={otpBlockStyle}
                />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="new-password" style={labelStyle}>New Password:</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="confirm-password" style={labelStyle}>Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
