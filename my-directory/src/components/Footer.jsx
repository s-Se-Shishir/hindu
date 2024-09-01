import React from "react";
import { useDarkMode } from "./DarkModeContext";
import {
  FaBuilding,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMobile,
  FaArrowUp,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-scroll";

const Footer = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <footer
        className={`${
          darkMode ? "dark bg-black" : "light bg-orange-900"
        } w-full m-auto lg:px-10 px-10 py-10 grid lg:grid-cols-4 grid-cols-1 justify-center items-start lg:gap-20 gap-10`}
      >
        {/* About Section */}
        <div className="flex flex-col justify-center items-start gap-5">
          <h1 className="text-white text-xl font-semibold">
            HINDU BUSINESS DIRECTORY
          </h1>
          <p className="text-slate-200 text-justify hover:text-orange-300">
            A comprehensive listing of businesses and entrepreneurs supported by
            the World Hindu Economic Forum (HEF) to promote economic growth and
            collaboration within the Hindu community.
          </p>
          <iframe
  title="Google Maps"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9930.592753275083!2d-0.11700726050637439!3d51.519670104601595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b54184cd099%3A0x69e07ba678bf1378!2s80%20Long%20Ln%2C%20Barbican%2C%20London%20EC1A%209ET%2C%20UK!5e0!3m2!1sen!2sin!4v1723814894504!5m2!1sen!2sin"
  width="90%"
  style={{ border: 0, borderRadius: "10px" }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="hover:border-[5px] hover:border-transparent hover:shadow-[0_0_15px_5px_rgba(255,255,0,1),0_0_15px_5px_rgba(255,165,0,1),0_0_15px_5px_rgba(255,69,0,1)] transition-all duration-500"
/>

        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col justify-center items-start gap-5">
          <h1 className="text-white text-xl font-semibold">Quick Links</h1>
          <p className="text-slate-200 text-[1rem] hover:text-orange-300">Home</p>
          <p className="text-slate-200 text-[1rem] hover:text-orange-300">Who We Are ?</p>
          <p className="text-slate-200 text-[1rem] hover:text-orange-300">Popular Areas</p>
          <p className="text-slate-200 text-[1rem] hover:text-orange-300">Trending Business Place</p>
          <p className="text-slate-200 text-[1rem] hover:text-orange-300">Our Services</p>
          <p className="text-slate-200 text-[1rem] hover:text-orange-300">Our Clients</p>
          <p className="text-slate-200 text-[1rem] hover:text-orange-300">Contact Us</p>
        </div>

        {/* Support Section */}
        <div className="flex flex-col justify-center items-start gap-5">
          <h1 className="text-white text-xl font-semibold">Support</h1>
          <p className="text-slate-200 text-[1rem] hover:text-orange-300">Home</p>
          <p className="text-slate-200 text-[1rem] hover:text-orange-300">Categories</p>
          <p className="text-slate-200 text-[1rem] hover:text-orange-300">States</p>
          <p className="text-slate-200 text-[1rem] hover:text-orange-300">Add Listing</p>
          <p className="text-slate-200 text-[1rem] hover:text-orange-300">Contact Us</p>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col justify-center items-start gap-5">
          <h1 className="text-white text-xl font-semibold">Contact Us</h1>
          <div className="flex justify-center items-center gap-3">
            <FaBuilding className="text-white text-[1rem]" aria-label="Building" />
            <p className="text-slate-200 text-[1rem] hover:text-orange-300">
              Unit TAP.E, 80 Long Lane, London, SE1 4GT
            </p>
          </div>
          <div className="flex justify-center items-center gap-3">
            <FaMobile className="text-white text-xl" aria-label="Phone" />
            <p className="text-slate-200 text-[1rem] hover:text-orange-300">+44 (0)34 5312 3505</p>
          </div>
          <div className="flex justify-center items-center gap-3">
            <IoMdMail className="text-white text-xl" aria-label="Email" />
            <p className="text-slate-200 text-[14px] hover:text-orange-300">
              namaste@hindubusinessdirectory.com.au
            </p>
          </div>
          <div
            id="social-icons"
            className="flex justify-start items-center gap-4 mt-4"
          >
            <div
              className="p-3 rounded-xl bg-white hover:bg-orange-500 hover:text-white cursor-pointer transform hover:scale-110 transition-transform duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-xl" />
            </div>
            <div
              className="p-3 rounded-xl bg-white hover:bg-orange-500 hover:text-white cursor-pointer transform hover:scale-110 transition-transform duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="text-xl" />
            </div>
            <div
              className="p-3 rounded-xl bg-white hover:bg-orange-500 hover:text-white cursor-pointer transform hover:scale-110 transition-transform duration-300"
              aria-label="Twitter"
            >
              <FaTwitter className="text-xl" />
            </div>
            <div
              className="p-3 rounded-xl bg-white hover:bg-orange-500 hover:text-white cursor-pointer transform hover:scale-110 transition-transform duration-300"
              aria-label="YouTube"
            >
              <FaYoutube className="text-xl" />
            </div>
          </div>
        </div>
      </footer>

      {/* Slide to top */}
      <Link to="hero" spy={true} offset={-100} smooth={true}>
        <div
          id="icon-box"
          className="bg-red-600 p-4 rounded-full hover:bg-black cursor-pointer fixed lg:bottom-12 bottom-6 right-6"
        >
          <FaArrowUp className="text-2xl text-white" aria-label="Scroll to top" />
        </div>
      </Link>

      {/* Dark Mode Toggle */}
      <div>
        <button
          onClick={toggleDarkMode}
          className="flex items-center p-4 rounded-full bg-orange-500 fixed lg:top-58 right-2 top-32 focus:outline-none z-50"
        >
          {darkMode ? (
            <FaMoon size={25} className="text-black" aria-label="Dark mode" />
          ) : (
            <FaSun size={25} className="text-black" aria-label="Light mode" />
          )}
        </button>
      </div>
    </>
  );
};

export default Footer;
