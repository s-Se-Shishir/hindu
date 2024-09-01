import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../components/DarkModeContext";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import { comment } from "postcss";
import { useNavigate } from 'react-router-dom';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  const { darkMode } = useDarkMode();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/public/admin/submit-msg', formData);  // Adjust the API endpoint as needed
      if (response.status === 200) {
        setAlertMessage('Message submitted successfully!');
        setFormData({ name: '', email: '', phone: '', comment: '' });
        navigate('/');

      }
    } catch (error) {
      setAlertMessage('Error submitting message. Please try again.');
    }
  }
  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-red-100 text-black"} pb-10`}>
      <section
        id="contact"
        className={`lg:w-[95%] w-full h-fit m-auto rounded-xl grid lg:grid-cols-2 grid-cols-1 justify-center items-center lg:px-36 px-2 py-10 gap-5 ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <form
          onSubmit={handleSubmit}
          data-aos="zoom-in"
          className={`flex flex-col justify-center items-start gap-6 p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-900" : "bg-white"}`}
        >
          <h1 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-black"}`}>
            Send a message today
          </h1>
          {alertMessage && <div className="alert alert-info">{alertMessage}</div>}
          <label className="w-full">
            <span className={`block ${darkMode ? "text-gray-400" : "text-gray-700"}`}>Full Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name here"
              aria-label="Full Name"
              className={`w-full px-6 py-3 border-2 rounded-xl mt-2 ${darkMode ? "border-gray-700 bg-gray-900 text-white" : "border-gray-200 bg-white text-black"}`}
              required
            />
          </label>
          <label className="w-full">
            <span className={`block ${darkMode ? "text-gray-400" : "text-gray-700"}`}>Email Address</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email here"
              aria-label="Email Address"
              className={`w-full px-6 py-3 border-2 rounded-xl mt-2 ${darkMode ? "border-gray-700 bg-gray-900 text-white" : "border-gray-200 bg-white text-black"}`}
              required
            />
          </label>
          <label className="w-full">
            <span className={`block ${darkMode ? "text-gray-400" : "text-gray-700"}`}>Phone Number</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your number here"
              aria-label="Phone Number"
              className={`w-full px-6 py-3 border-2 rounded-xl mt-2 ${darkMode ? "border-gray-700 bg-gray-900 text-white" : "border-gray-200 bg-white text-black"}`}
              required
            />
          </label>

          <textarea
            name="comment"  // Updated to 'comment'
            value={formData.comment}
            onChange={handleChange}
            id="comment"
            cols="30"
            rows="5"
            placeholder="Enter your message here..."
            aria-label="Comment"
            className={`w-full px-6 py-3 border-2 rounded-xl ${darkMode ? "border-gray-700 bg-gray-900 text-white" : "border-gray-200 bg-white text-black"}`}
            required
          ></textarea>
          <button
            type="submit"
            className={`w-full text-md px-8 py-3 text-white font-semibold rounded-xl ${darkMode ? "bg-red-600 hover:bg-black" : "bg-red-600 hover:bg-black"}`}
          >
            Send Email
          </button>
        </form>

        <div className="flex flex-col justify-center items-start gap-8 lg:p-20 p-6">
          <h1
            data-aos="zoom-in"
            data-aos-delay="200"
            className={`text-red-500 text-2xl ${darkMode ? "text-red-400" : "text-red-500"}`}
          >
            Reach Us
          </h1>
          <h1
            data-aos="zoom-in"
            data-aos-delay="400"
            className={`text-[35px] font-semibold leading-10 ${darkMode ? "text-white" : "text-black"}`}
          >
            Get in Touch with Us
          </h1>
          <p
            data-aos="zoom-in"
            data-aos-delay="200"
            className={`text-base ${darkMode ? "text-gray-400" : "text-gray-800"} text-[1rem] sm:text-justify text-left`}
          >
            We’re here to help! Whether you have a question, need support, or just want to share your thoughts, feel free to reach out. Our team is dedicated to providing you with the best assistance possible. Please fill out the form below, and we’ll get back to you as soon as we can.
          </p>
          <button
            type="button"
            className={`w-full text-md px-8 py-3 text-white font-semibold rounded-xl ${darkMode ? "bg-red-600 hover:bg-black" : "bg-red-600 hover:bg-black"}`}
          >
            For any query
          </button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
