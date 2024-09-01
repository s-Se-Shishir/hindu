import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center rounded-full bg-white p-[0.1rem] shadow-md relative z-20">
      {/* Dropdown start */}
      <div className="relative w-64 rounded-full bg-orange-500 border border-white cursor-pointer">
        <div
          id="drop-text"
          className="flex items-center justify-between font-semibold text-white text-lg p-4"
          onClick={toggleDropdown}
        >
          <span id="span">Your States</span>
          <FontAwesomeIcon icon={faCaretDown} id="icon" />
        </div>
        {isDropdownOpen && (
          <ul
            id="list"
            className="absolute top-full left-0 w-full rounded-lg bg-white shadow-lg max-h-48 overflow-hidden transition-all duration-500"
          >
            <li className="dropdownx-list-item hover:bg-gray-100 p-4 text-orange-700 cursor-pointer">
              State 1
            </li>
            <li className="dropdownx-list-item hover:bg-gray-100 p-4 text-orange-700 cursor-pointer">
              State 2
            </li>
            <li className="dropdownx-list-item hover:bg-gray-100 p-4 text-orange-700 cursor-pointer">
              State 3
            </li>
          </ul>
        )}
      </div>
      {/* Dropdown ends */}

      {/* Search box input start */}
      <div className="flex items-center pr-4 w-full text-orange-500">
        <input
          type="text"
          id="search-input"
          placeholder="Place"
          className="p-4 w-full text-orange-500 font-medium text-lg outline-none"
        />
        <FontAwesomeIcon icon={faSearch} className="text-2xl cursor-pointer" />
      </div>
      {/* Search box input ends */}
    </div>
  );
};

export default SearchBar;
