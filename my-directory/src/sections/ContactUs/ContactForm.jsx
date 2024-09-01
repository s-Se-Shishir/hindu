import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../../components/DarkModeContext';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import contactUs from '../../assets/images/contactUs.png';
import backgroundImage from '../../assets/images/contactb.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
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
        setAlertMessage('Message submitted successfully!Wait for the call .');
        setFormData({ name: '', phone: '', email: '', comment: '' });
        navigate('/');

      }
    } catch (error) {
      setAlertMessage('Error submitting message. Please try again.');
    }
  }

  return (
    <div className={`relative ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      {/* Main Content Section */}
      <main className="container mx-auto py-12">
        {/* Centered Div with Image and Form */}
        <section
          className="relative flex flex-col lg:flex-row items-center justify-center mb-12 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Image Section */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0">
            <img src={contactUs} alt="Contact" className="w-full max-w-md rounded-lg" />
          </div>

          {/* Form Section */}
          <div className="relative w-full lg:w-1/2 lg:pl-8">
            <div className={`p-6 shadow-sm rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-6">We would love to hear from you. Please fill out the form below and we will get in touch with you shortly.</p>
              <form onSubmit={handleSubmit} action="#" method="post" className="space-y-4">
                <div className="form-group">
                  <label htmlFor="inputName" className="block text-lg font-medium mb-2">Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 hover:border-orange-500 transition-colors ${darkMode ? 'bg-gray-800 text-white' : ''}`}
                    id="inputName"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPhone" className="block text-lg font-medium mb-2">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 hover:border-orange-500 transition-colors ${darkMode ? 'bg-gray-800 text-white' : ''}`}
                    id="inputPhone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputEmail" className="block text-lg font-medium mb-2">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 hover:border-orange-500 transition-colors ${darkMode ? 'bg-gray-800 text-white' : ''}`}
                    id="inputEmail"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputMessage" className="block text-lg font-medium mb-2">Message</label>
                  <textarea
                    required
                    name="comment"
                    id="inputMessage"
                    className={`w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 hover:border-orange-500 transition-colors ${darkMode ? 'bg-gray-800 text-white' : ''}`}
                    rows="5"
                    placeholder="Your Message"
                    value={formData.comment}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Details and Iframe Section */}
        <section className="flex flex-col lg:flex-row items-start mb-12">
          {/* Details Section */}
          <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <div className={`p-6 rounded-lg transition-all hover:shadow-2xl hover:bg-orange-50 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
              <h2 className="text-2xl font-bold mb-4 text-center text-red-800">Contact Details</h2>
              <div className="space-y-4 text-lg">
                <p className="flex items-center hover:text-orange-500 transition-all">
                  <FaPhoneAlt className="mr-2 text-orange-500" />
                  <span className="font-semibold mr-2">Phone:</span>
                  +44 (0)34 5312 3505
                </p>
                <p className="flex items-center hover:text-orange-500 transition-all">
                  <FaEnvelope className="mr-2 text-orange-500" />
                  <span className="font-semibold mr-2">Email:</span>
                  namaste@hindubusinessdirectory.com.au
                </p>
                <p className="flex items-center hover:text-orange-500 transition-all">
                  <FaMapMarkerAlt className="mr-2 text-orange-500" />
                  <span className="font-semibold mr-2">Address:</span>
                  Unit TAP.E, 80 Long Lane, London, SE1 4GT
                </p>
              </div>
            </div>
          </div>

          {/* Iframe Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full pb-[30.25%] transition-all hover:shadow-2xl hover:scale-105">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9930.592753275083!2d-0.11700726050637439!3d51.519670104601595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b54184cd099%3A0x69e07ba678bf1378!2s80%20Long%20Ln%2C%20Barbican%2C%20London%20EC1A%209ET%2C%20UK!5e0!3m2!1sen!2sin!4v1723814894504!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "10px", position: "absolute", top: 0, left: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ContactForm;
