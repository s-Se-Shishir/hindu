import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
// import { Link } from "react-router-dom";
import "./login.scss";
import loginimg from '../../assets/contactb.jpg';
import ForgotPasswordPopup from '../popup/ForgotPasswordPopup';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => setShowForgotPassword(true);
  const closeForgotPasswordPopup = () => setShowForgotPassword(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error messages

    try {
      const response = await axios.post("http://localhost:4000/public/admin/adminLogin", {
        email: username,
        adminPassword: password,
      });

      if (response.status === 200) {
        // Save token and session data to localStorage (or sessionStorage)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("sessionData", JSON.stringify(response.data.sessionData));

        // Redirect to the admin dashboard or another page
        navigate("/");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Server error. Please try again later.");
    }
  };
  return (
    <div className="login-container">
      <div className="login-image">
        <img src={loginimg} style={{ height: "100%" }} alt="Login" />
        <div className="sign-up-overlay">
          <p>Need an account?</p>
          <Link to="/sign-up">Sign up here</Link>
        </div>
      </div>
      <div className="login-form">
        <div className="content">
          <h2>Admin Login</h2>
          <p>Access the admin panel to manage and monitor your system effectively.</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="additional-content">
          <p>If you've forgotten your password, <a href="#" onClick={handleForgotPasswordClick}>click here</a> to reset it.</p>
          <p>Don't have an account? <Link to="/sign-up">Sign up here</Link> to create one.</p>
        </div>
      </div>
      {showForgotPassword && (
        <ForgotPasswordPopup closePopup={closeForgotPasswordPopup} />
      )}
    </div>
  );
};

export default Login;
