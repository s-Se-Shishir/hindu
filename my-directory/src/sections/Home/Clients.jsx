import React, { useEffect } from 'react';
import { useDarkMode } from '../../components/DarkModeContext';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { client } from '../../components/export';
import { FaStar } from 'react-icons/fa';

const Clients = () => {
    useEffect(() => {
        Aos.init({
            offset: 200,
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
        });
    }, []);

    const { darkMode } = useDarkMode();

    return (
        <div className={`${darkMode ? 'bg-black text-white' : 'bg-orange-50 text-black'} py-20`}>
            <section
                id='testimonials'
                className='lg:w-[95%] w-full h-fit m-auto bg-cover bg-center rounded-xl flex flex-col items-center lg:px-20 px-6 py-20 gap-20'
            >
                <div className='flex flex-col justify-center items-center text-center gap-4'>
                    <h1 data-aos="zoom-in" className={`text-red-500 text-2xl ${darkMode ? 'text-red-300' : 'text-red-500'}`}>
                        Our Clients
                    </h1>
                    <h1 data-aos="zoom-in" className={`text-[32px] font-semibold leading-10 ${darkMode ? 'text-white' : 'text-black'}`}>
                        What our clients are saying about us
                    </h1>
                </div>

                <div
                    id='clients-box'
                    className='grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-8 w-full'
                >
                    {client.map((item, index) => (
                        <div
                            data-aos="zoom-in"
                            data-aos-delay="200"
                            key={index}
                            className={`bg-${darkMode ? 'gray-800' : 'white'} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-orange-100'} cursor-pointer p-12 flex flex-col justify-center items-center gap-6 rounded-xl w-full transition-colors duration-300`}
                        >
                            <div className='flex justify-start items-center w-full gap-4'>
                                <img
                                    src={item.image}
                                    alt=""
                                    className='w-[70px] transform hover:scale-110 transition-transform duration-300'
                                />
                                <div className='flex flex-col justify-center items-start gap-1'>
                                    <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                                        {item.name}
                                    </h1>
                                    <h1 className={`text-slate-600 ${darkMode ? 'text-gray-400' : ''}`}>
                                        {item.text}
                                    </h1>
                                </div>
                            </div>
                            <p className={`text-md text-justify ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                                {item.feedback}
                            </p>
                            <div className='flex justify-start items-start gap-2 w-full'>
                                <FaStar className='size-4 text-yellow-400' />
                                <FaStar className='size-4 text-yellow-400' />
                                <FaStar className='size-4 text-yellow-400' />
                                <FaStar className='size-4 text-yellow-400' />
                                <FaStar className='size-4 text-yellow-400' />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Clients;
