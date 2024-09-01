import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for API requests
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/public/company/forgotPass', { email });
      alert(response.data.message); // Show success message
      setEmail(''); // Clear the form
      navigate('/change-password', { state: { email } });

    } catch (error) {
      console.error('Error during password reset request:', error.response?.data?.message, error);
      alert('Password reset failed: ' + error.response?.data?.message || error.message); // Show error message
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full min-h-[300px] flex">
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
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

          <p className="text-gray-700 mb-4 text-center">Enter your email address to reset your password.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded transition-colors duration-200 ease-in-out focus:border-red-600 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              Reset Password
            </button>
          </form>
        
       
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
