import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaGoogle } from 'react-icons/fa'; 
import aboutimg from '../../src/assets/images/about.jpg';
import axios from 'axios'; 
import ForgotPasswordPopup from './ForgotPopup';
import { useLocation, useNavigate  } from 'react-router-dom';

const LoginPopup = ({ onClose }) => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [compPassword, setCompPassword] = useState('');
  const [showForgotPopup, setShowForgotPopup] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/public/company/Login', { email, compPassword });
      localStorage.setItem('companyId', JSON.stringify(response.data.companyId));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('sessionData', JSON.stringify(response.data.sessionsDat));

      alert(response.data.message); 
      setEmail(''); 
      setCompPassword('');
    } catch (error) {
      console.error('Error during login:', error.response?.data?.message, error);
      alert('Login failed: ' + (error.response?.data?.message || error.message)); 
    }
  };

  if (showForgotPopup) {
    return (
      <ForgotPasswordPopup onClose={() => setShowForgotPopup(false)} /> 
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full min-h-[400px] flex">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 ease-in-out"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        <div className="flex-1 p-4 relative">
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          <p className="text-gray-700 mb-4 text-center">Please enter your email and password to login.</p>

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
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                value={compPassword}
                onChange={(e) => setCompPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded transition-colors duration-200 ease-in-out focus:border-red-600 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </form>
          <br />
          <hr />
          <br />
          <div className="text-center">
            <div className="flex justify-between items-center">
              <button
                className="text-red-600 hover:underline"
                onClick={() => setShowForgotPopup(true)} // Show forgot password popup
              >
                Forgot Password?
              </button>
              <a href="/" className="text-red-600 hover:underline">Sign Up</a>
            </div>
            <p className="text-gray-700 mt-2">If you forgot your password, click this link to recover it.</p>
            <a
              href="https://accounts.google.com/signin"
              className="block mt-4 bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center transition-transform duration-200 ease-in-out transform hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
              // onClick={handleGoogleLogin}
            >
              <FaGoogle className="mr-2" size="20" /> {/* Google icon */}
              Login with Google
            </a>
          </div>
        </div>
        {/* Image Section */}
        <div className="flex-1 hidden md:block">
          <img
            src={aboutimg}
            alt="About"
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
