import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for API requests
import { useLocation, useNavigate  } from 'react-router-dom';

const ChangePassword = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [email, setEmail] = useState(location.state?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/public/company/passChange', { email, newPassword, otp });
      setSuccess(response.data.message);
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setOtp('');

      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full min-h-[400px] flex flex-col">
        {/* Cross Button on the Right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 ease-in-out"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        {/* Form Section */}
        <div className="flex-1 p-4 relative">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>


          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {success && <p className="text-green-600 text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded transition-colors duration-200 ease-in-out focus:border-red-600 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
       
            <div className="mb-4">
              <label className="block text-gray-700">New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded transition-colors duration-200 ease-in-out focus:border-red-600 focus:outline-none"
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded transition-colors duration-200 ease-in-out focus:border-red-600 focus:outline-none"
                placeholder="Confirm new password"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Verification Code:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded transition-colors duration-200 ease-in-out focus:border-red-600 focus:outline-none"
                placeholder="Enter the 6-digit code"
                maxLength="6"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
