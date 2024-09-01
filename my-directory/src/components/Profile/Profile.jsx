import React, { useEffect } from 'react';
import './Profile.css';

const Profile = () => {
const [user,setUser]=React.useState({});

useEffect(()=>{

    const userData=JSON.parse(localStorage.getItem("companyId"));
    setUser(userData);

},[]);

  return (
    <div className="profile-container">
      <div className="profile-left">
        <div className="profile-image">
          {/* Placeholder image, replace with actual image if available */}
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="profile-basic-details">
          <h2>{user.firstName} {user.lastName}</h2>
          <p>{user.compName}</p>
          <p>{user.status}</p>
        </div>
      </div>
      <div className="profile-right">
        <div className="profile-details">
          <h3>Contact Information</h3>
          <p>Email: {user.email}</p>
          <p>Contact No: {user.contactNo}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
