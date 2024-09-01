import React, { useState } from 'react';
import { useDarkMode } from '../../components/DarkModeContext'; // Adjust the import path as necessary
import ListImg from '../../assets/images/list.jpg';
import ListingImg from '../../assets/images/listing.png';
import axios from 'axios';
import { useLocation, useNavigate  } from 'react-router-dom';


const ListingInput = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    firstName:  location.state?.firstName || '',
    lastName:  location.state?.lastName || '',
    companyName:  location.state?.compName || '',
    email: location.state?.email || '',
    companyPassword: '',
    contactNumber: '',
    category: '',
    address: '',
    state: '',
    pincode: '',
    country: '',
    place_Map_url: '',
    agreeTerms: false, // Add this field for terms and conditions
  });
  const { darkMode } = useDarkMode();

   const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      alert('You must agree to the terms and conditions.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/public/company/compListing', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        compName: formData.companyName, // Adjust to match the API field name
        email: formData.email,
        compPassword: formData.companyPassword, // Adjust to match the API field name
        contactNo: formData.contactNumber, // Adjust to match the API field name
        category: formData.category,
        address: formData.address,
        state: formData.state,
        pincode: formData.pincode,
        country: formData.country,
        place_Map_url: formData.place_Map_url,
      },{
        headers:{
          Authorization:`Bearer ${ localStorage.getItem("token")}`
        }
      });

      console.log('API Response:', response.data);
      alert('Company registered successfully check mail for details .');
      setFormData({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        companyPassword: '',
        contactNumber: '',
        category: '',
        address: '',
        state: '',
        pincode: '',
        country: '',
        place_Map_url: '',
        agreeTerms: false,
      }); // Reset the form on success
      navigate('/');
    } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      alert('There was an error registering the company. Please try again.');
    }

  };
  return (
    <main className={`py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <section className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 rounded-xl  ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        {/* Title and Paragraph */}
        <div className="text-center mb-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Hindu Economic Forum</h2>
          <p className="text-lg lg:text-xl  lg:text-justify ">
            Hindu Economic Forum brings together various Hindu businesses to enable their rapid growth and success. It encourages synergies and promotes businesses based on Hindu values. We believe these values empower our members to develop their spirituality, guiding them in personal and business development as effective learners and good citizens. By completing this form, you fully agree and accept Hindu Values, follow WhatsApp group rules, and authorize us to register your business details in Hindu Business Directory <span className='text-orange-500'>(hindubusinessdirectory.com.au)</span>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center">
          {/* Form Section */}
          <div className={`w-full lg:w-1/2 p-6 sm:p-8 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl `}>
            <h3 className="text-2xl font-semibold mb-6">Add New Business</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="password"
                name="companyPassword"
                placeholder="Company Password"
                value={formData.companyPassword}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <SelectField
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={[
                  'Category', 'Shops', 'Retailers', 'Home Businesses', 'Franchises', 'Traders', 'Manufacturers',
                  'Industrialist', 'Exporters', 'Importers', 'Professionals', 'Teachers', 'Doctors',
                  'Nurses', 'Technocrats', 'Economist', 'Thinkers'
                ]}
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <SelectField
                name="state"
                value={formData.state}
                onChange={handleChange}
                options={[
                  'Select','NSW','VIC','QLD','WA','SA','TAS','ACT','NT'
                ]}
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
               <InputField
                type="text"
                name="place_Map_url"
                placeholder="Map"
                value={formData.place_Map_url}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  id="agreeTerms"
                  className={`mr-2 h-6 w-6 ${darkMode ? 'text-orange-500 border-gray-600' : 'text-orange-600 border-gray-300'} rounded`}
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <label className={`text-gray-700 font-medium ${darkMode ? 'text-white' : ''}`} htmlFor="agreeTerms">
                  I agree to the terms and conditions
                </label>
              </div>
              <button
                type="submit"
                className={`w-full py-3 font-semibold rounded-xl shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 transition duration-300 ${darkMode ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-orange-600 text-white'}`}
              >
                Submit
              </button>
            </form>
          </div>
          {/* Image Section with Background Image */}
          <div className="relative w-full lg:w-1/2 flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${ListImg})`, height: '1050px' }}>
  {/* Overlay Content */}
  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4 lg:p-8 text-left">
    <h2 className="text-3xl lg:text-4xl font-bold mb-4 hover:text-orange-500 transition-colors duration-300">Hindu Economic Forum</h2>
    <p className="text-lg lg:text-xl mb-4 hover:text-orange-500 transition-colors duration-300">
      Hindu Economic Forum unites various Hindu businesses, fostering rapid growth and success. The forum:
    </p>
    <ul className="text-lg lg:text-xl list-disc list-inside mb-4">
      <li className="hover:text-orange-500 transition-colors duration-300">Encourages collaboration and promotes business practices grounded in Hindu values.</li>
      <li className="hover:text-orange-500 transition-colors duration-300">Empowers members in their spiritual, personal, and professional development, guiding them as effective learners and responsible citizens.</li>
      <li className="hover:text-orange-500 transition-colors duration-300">Supports sustainable and ethical business practices to benefit the wider community.</li>
      <li className="hover:text-orange-500 transition-colors duration-300">Provides networking opportunities and resources for business growth and development.</li>
      <li>By submitting this form, you:
        <ul className="list-decimal ml-5">
          <li className="hover:text-orange-500 transition-colors duration-300">Fully agree with and accept Hindu values.</li>
          <li className="hover:text-orange-500 transition-colors duration-300">Commit to following the WhatsApp group rules.</li>
          <li className="hover:text-orange-500 transition-colors duration-300">Authorize the inclusion of your business details in the Hindu Business Directory at <span className="text-yellow-500">(hindubusinessdirectory.com.au)</span>.</li>
        </ul>
      </li>
    </ul>
    <div className="mt-auto w-full flex justify-center">
      <img src={ListingImg} alt="Listing Image" className="object-cover w-full h-auto" />
    </div>
  </div>
</div>
        </div>
      </section>
    </main>
  );
};
// Reusable Input Field Component
const InputField = ({ label, type, name, placeholder, value, onChange, required, darkMode }) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      id={name}
      className={`peer w-full px-4 py-3 border rounded-xl bg-transparent focus:outline-none focus:ring-2 transition duration-300 ${darkMode ? 'bg-gray-800 text-white border-gray-600 focus:ring-orange-500' : 'bg-white border-gray-300 focus:ring-orange-500'}`}
      placeholder={name}
      value={value}
      onChange={onChange}
      required={required}
    />
    <label
      htmlFor={name}
      className={`absolute top-1/2 left-3 text-gray-500 transform -translate-y-1/2 transition-all duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-600'} peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:left-2 peer-focus:text-sm peer-focus:text-orange-500 peer-focus:bg-transparent`}
    >
      {label}
    </label>
  </div>
);
// Reusable Select Field Component
const SelectField = ({ label, name, value, onChange, options, darkMode }) => (
  <div>
    <label className={`block font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-700'}`} htmlFor={name}>{label}</label>
    <select
      name={name}
      id={name}
      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition duration-300 ${darkMode ? 'bg-gray-800 text-white border-gray-600 focus:ring-orange-500' : 'bg-white border-gray-300 focus:ring-orange-500'}`}
      value={value}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
);
export default ListingInput;
