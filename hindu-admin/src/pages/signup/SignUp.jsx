import React from 'react';
import './Signup.scss'; // Import the SCSS file
import loginimg from '../../assets/contactb.jpg';


const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="form-content">
          <h2>Sign Up</h2>
          <p>Join us today to get started!</p>
          <form>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="full-name">Full Name</label>
                <input type="text" id="full-name" name="full-name" placeholder="John Doe" />
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="john.doe@example.com" />
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="contact">Contact Number</label>
                <input type="text" id="contact" name="contact" placeholder="+1234567890" />
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="********" />
              </div>
            </div>
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          <div className="additional-content">
            <p>Already have an account? <a href="/login">Log In</a></p>
          </div>
        </div>
      </div>
      <div className="signup-image">
        <img src={loginimg} alt="Signup" />
        <div className="image-text">
          <p>Join us now!</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
