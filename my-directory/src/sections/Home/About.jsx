import React, { useEffect } from 'react';
import { useDarkMode } from '../../components/DarkModeContext';
import aboutimg from '../../assets/images/about.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css';

const About = () => {
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
        <section 
            id='about' 
            className={`w-full m-auto lg:px-40 px-10 py-20 grid lg:grid-cols-2 grid-cols-1 justify-center items-center gap-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
        >
            <div>
                <img
                    data-aos="zoom-in"
                    src={aboutimg}
                    alt="About"
                    className='rounded-2xl lg:w-[500px] lg:h-[600px] w-full h-auto'
                />
            </div>

            <div className='flex flex-col justify-center items-start gap-8'>
                <h1
                    data-aos="zoom-in"
                    className={`text-red-500 text-xl ${darkMode ? 'text-red-300' : 'text-red-500'}`}
                >
                    WHO WE ARE?
                </h1>
                <h2
                    data-aos="zoom-in"
                    data-aos-delay="200"
                    className={`text-[30px] sm:text-[40px] font-semibold leading-10 tracking-wide ${darkMode ? 'text-white' : 'text-black'}`}
                >
                    Empowering Economic Growth
                </h2>
                <p 
                    data-aos="zoom-in" 
                    data-aos-delay="200" 
                    className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-800'} text-xl sm:text-justify text-left`}
                >
                    The Hindu Economic Forum of Australia (HEF) is dedicated to fostering connections that span from local to global levels, facilitating access to resources, opportunities, and partnerships. By supporting the Australian Hindu community, HEF Australia aims to accelerate progress and enhance contributions to economic development. It provides a platform that unites diverse sectors of the Hindu community—including industrialists, business leaders, traders, bankers, investors, technocrats, professionals, economists, academics, and thought leaders—enabling them to organize collectively for mutual growth and success.
                </p>
                <button
                    className={`bg-red-600 text-white font-semibold text-lg py-4 px-6 rounded-xl transition-transform transform ${darkMode ? 'hover:bg-gray-800 hover:scale-110' : 'hover:bg-red-700 hover:scale-110'}`}
                >
                    Search
                </button>
            </div>
        </section>
    );
}

export default About;
