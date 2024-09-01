import React, { useState } from 'react';
import ChangePasswordPopup from './ChangePasswordPopup';
import axios from 'axios';

const ForgotPasswordPopup = ({ closePopup }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error messages

    try {
      const response = await axios.post('http://localhost:4000/public/admin/adminForgot', {
        email: email,
      });

      if (response.status === 200) {
        // Display the Change Password Popup
      alert(response.data.message); // Show success message

        setShowChangePassword(true);
      } else {
        setError(response.data.message || 'Request failed. Please try again.');
      }
    } catch (err) {
      console.error('Forgot Password error:', err);
      setError(err.response?.data?.message || 'Server error. Please try again later.');
    }
  };

  const handleChangePasswordClose = () => {
    setShowChangePassword(false);
    closePopup(); // Close Forgot Password popup
  };

  const popupStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the overlay
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const contentStyle = {
    backgroundColor: '#003366', // Navy blue background color
    padding: '30px', // Padding
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

  const labelStyle = {
    color: '#fff', // White color for the label text
  };

  const headerStyle = {
    color: '#fff', // White color for the header text
  };

  return (
    <>
      <div style={popupStyle}>
        <div style={contentStyle}>
          <span style={closeButtonStyle} onClick={closePopup}>&times;</span>
          <h2 style={headerStyle}>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" style={labelStyle}>Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" style={buttonStyle}>Submit</button>
          </form>
        </div>
      </div>
      {showChangePassword && (
        <ChangePasswordPopup email={email} closePopup={handleChangePasswordClose} />
      )}
    </>
  );
};

export default ForgotPasswordPopup;
