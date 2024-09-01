import React, { useEffect } from 'react';
import { useDarkMode } from '../DarkModeContext';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { property } from '../export';
import { FaCamera, FaMapMarkerAlt, FaUserCircle, FaShareAlt, FaHeart, FaPlus, FaStar } from 'react-icons/fa';
import axios from 'axios';

const Cards = ({ companies }) => {
  const [data,setData]=React.useState([]);

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  const { darkMode } = useDarkMode();

  // Helper function to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className='text-yellow-400' />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStar key={i} className='text-yellow-400' />); // For half star, use a different icon if you want
      } else {
        stars.push(<FaStar key={i} className='text-gray-300' />);
      }
    }
    return stars;
  };



  useEffect(()=>{
    axios.get("http://localhost:4000/public/company/cardData")
    .then(res=>{
      const tableData=res.data.data.map((item,idx)=>{return {...item,id:idx+1}})
      setData(tableData)})
    .catch(err=>console.log(err))
},[]);

console.log("fardeen---1 --->",data);

  return (
    <div className={`${darkMode ? 'dark bg-black' : 'light bg-transparent'}`}>
      <section id='properties' className={`lg:w-[98%] m-auto lg:px-20 px-6 py-20 w-full flex flex-col justify-center items-start gap-10 ${darkMode ? 'dark:bg-gray-900 text-gray-200' : 'bg-transparent text-gray-300'}`}>
        <div className='flex flex-col justify-center items-start gap-4'>
          <h1 data-aos="zoom-in" className='text-red-500 text-xl'>Trending Business Place</h1>
          <h1 data-aos="zoom-in" className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-white'}`}>Explore Hindu businesses.</h1>
        </div>

        <div id='slider-box' className='w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data.map((item, index) => (
            <div
              data-aos="zoom-in"
              data-aos-delay="200"
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg`}
            >
              <div
                className='bg-cover bg-center h-[220px] rounded-t-xl p-4 flex flex-col justify-between items-end'
                style={{ backgroundImage: `url(${item.images})` }}
              >
                <div className='flex justify-between items-end w-full'>
                  <button className={`px-3 py-1 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-red-600 text-gray-300 hover:bg-red-500'} rounded-full text-[13px]`}>
                    Trending
                  </button>
                  <button className={`px-3 py-1 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-red-600 text-gray-300 hover:bg-red-500'} rounded-full text-[13px]`}>
                    Favourite
                  </button>
                </div>
                <div className='flex justify-between items-end w-full'>
                  <div className='flex items-center gap-2'>
                    <FaMapMarkerAlt className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-300'}`} />
                    <h1 className={`text-gray-300 ${darkMode ? 'text-gray-300' : 'text-gray-300'}`}><a href={item?.place_Map_url} target='_blank'>{item?.address}</a></h1>
                  </div>
                  <div className='flex items-center gap-4'>
                    <FaCamera className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-300'}`} />
                  </div>
                </div>
              </div>

              <div className='px-6 py-3 flex flex-col justify-center items-start gap-2 w-full'>
                <h1 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-white'}`}>{item?.compName}</h1>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-300'}`}>{item?.discription}</p>

                {/* Review section */}
                <div className='flex justify-left items-center w-full mt-0 gap-2'>
                  <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-white'}`}>
                    {item?.averageRating}
                  </div>
                  <div className='flex'>
                    {renderStars(item?.averageRating)}
                  </div>
                </div>

                <div className={`w-full h-[1px] ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} mt-4`}></div>

                <div className='flex justify-between items-center w-full mt-2'>
                  <div className='flex justify-center items-center gap-2'>
                    <FaUserCircle className={`text-xl ${darkMode ? 'text-red-400' : 'text-red-400'}`} />
                    <h1 className={`${darkMode ? 'text-white' : 'text-white'}`}>{item?.owner}</h1>
                  </div>
                  <div className='flex justify-center items-center gap-4'>
                    <div className={`p-2 border-2 ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'} cursor-pointer transform hover:scale-110 transition-transform duration-300`}>
                      <FaShareAlt className={`text-red-400`} />
                    </div>
                    <div className={`p-2 border-2 ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'} cursor-pointer transform hover:scale-110 transition-transform duration-300`}>
                      <FaHeart className={`text-red-400`} />
                    </div>
                    <div className={`p-2 border-2 ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'} cursor-pointer transform hover:scale-110 transition-transform duration-300`}>
                      <FaPlus className={`text-red-400`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cards;
