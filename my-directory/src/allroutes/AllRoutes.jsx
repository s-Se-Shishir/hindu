import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import ContactUs from '../pages/ContactUs/ContactUs';
import ListingPage from '../pages/Listing/ListingPage';
import ChangePassword from '../components/ChangePassword';
import LoginPopup from '../components/LoginPopup';
import DataCardPage from '../pages/DataCards/dataCardPage';
import ProfilePage from '../pages/Profile/ProfilePage';


const AllRoutes = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/home" element={<HomePage />} />
      <Route exact path="/contact" element={<ContactUs />} />
      <Route exact path="/listing" element={<ListingPage />} />
      <Route exact path="/change-password" element={<ChangePassword />} />
      <Route exact path="/data-cards" element={<DataCardPage />} />
      <Route exact path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default AllRoutes;
