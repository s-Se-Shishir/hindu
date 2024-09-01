import React, { useEffect } from 'react';
import { useDarkMode } from '../../components/DarkModeContext';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { service } from '../../components/export';

const Services = () => {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }, []);

  const { darkMode } = useDarkMode();

  return (
    <section 
      id='about' 
      className={`w-full m-auto lg:px-40 px-5 py-20 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      {/* Top Section: Heading, Paragraph, and Button */}
      <div className='flex flex-col justify-center items-center text-center gap-8 mb-12'>
        <h1
          data-aos="zoom-in"
          className='text-red-500 text-xl'
        >
          Our Services
        </h1>
        <h2
          data-aos="zoom-in"
          data-aos-delay="200"
          className={`text-[32px] lg:text-[36px] font-semibold leading-10 tracking-wide ${darkMode ? 'text-white' : 'text-black'}`}
        >
          Discover City Highlights
        </h2>
        <p data-aos="zoom-in" data-aos-delay="200" className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-800'} text-lg lg:text-[1.1rem] text-gray-600 sm:text-justify text-center`}>
          Explore local businesses, temples, associations, and events in your city to connect with your community. Discover everything from vibrant marketplaces to serene places of worship and engaging local events that enrich your city's cultural life. Support your neighborhood by shopping locally and participate in community gatherings to foster new connections. Embrace the diverse experiences your city has to offer and contribute to its dynamic spirit.
        </p>
      </div>

      {/* Bottom Section: Cards */}
      <div id="service-box" className="flex flex-wrap justify-evenly gap-8">
        {service.map((item, index) => (
          <div
            data-aos="zoom-in"
            data-aos-delay="200"
            key={index}
            className={`h-[320px] w-full lg:w-[15%] px-4 py-16 flex flex-col justify-center items-start gap-4 rounded-xl border-b-[5px] ${darkMode ? 'bg-gray-800 border-red-600 hover:bg-red-700' : 'bg-white border-red-600 hover:bg-red-300'} cursor-pointer`}
          >
            <div className={`p-6 rounded-full ${darkMode ? 'bg-red-900' : 'bg-red-200'}`}>
              <item.icon className={`text-red-600 text-4xl transform hover:scale-110 transition-transform duration-300 cursor-pointer`} />
            </div>

            <h1 className={`text-[1.2rem] font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>{item.title}</h1>
            <p className={`text-[1rem] ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>{item.desc}</p>

            <button
              className={`border-b-2 ${darkMode ? 'border-red-600 text-red-600 hover:text-red-400' : 'border-red-600 text-red-600 hover:text-red-800'} font-semibold p-0`}
              aria-label={`Read more about ${item.title}`}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
