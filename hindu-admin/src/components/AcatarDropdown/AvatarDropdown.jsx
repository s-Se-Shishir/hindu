import React, { useState } from 'react';

function AvatarDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="item" style={{ position: 'relative' }}>
      <img
        src="assets/hinduicon.png"
        alt="Avatar"
        className="avatar"
        onClick={toggleDropdown}
        style={{ cursor: 'pointer' , width:"50px", height:"50px" }}
      />
      {isDropdownOpen && (
        <div className="dropdown-menu" style={dropdownStyle}>
          <ul style={listStyle}>
            <li style={itemStyle}>Profile</li>
            <li style={itemStyle}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}

const dropdownStyle = {
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: '#fff',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  zIndex: 1,
  padding: '10px',
  borderRadius: '5px',
};

const listStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const itemStyle = {
  padding: '8px 16px',
  cursor: 'pointer',
};

export default AvatarDropdown;
