import React, { useEffect } from 'react';
import { useDarkMode } from '../../components/DarkModeContext';
import hinduVideo from '../../assets/videos/hindubusiness.mp4';
import foggyimg from '../../assets/images/foggy.png';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  const { darkMode,toggleDarkMode  } = useDarkMode();

  return (
    <>
      <div className={`${darkMode ? 'dark bg-black' : 'light bg-white'}`}>
        <section
          id='hero'
          className='w-full h-[400px] m-auto bg-cover bg-center rounded-xl flex justify-center flex-col items-center lg:px-28 px-10 gap-7 z-10 relative'
        >
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            className='absolute left-0 top-0 w-full h-full object-cover '
          >
            <source src={hinduVideo} type='video/mp4' />
            Your browser does not support the video tag.
          </video>

          <h1
            data-aos='zoom-in'
            className='text-white font-bold text-4xl lg:text-5xl text-center relative z-20'
          >
Contact Us
</h1>

          <p
            data-aos='zoom-in'
            className='text-white text-xl lg:text-xl text-center relative z-20'
          >
Get in Touch with Us Today!
</p>
        </section>
      </div>

      {/* Foggy Image */}
      <img
  className="w-full -mt-[12px] sm:-mt-[25px] lg:-mt-[35px] xl:-mt-[45px] 2xl:-mt-[55px] relative z-10 filter invert brightness-0"
  src={foggyimg}
  alt="Foggy effect"
/>



      {/* Form start from here */}
      <div>
        {/* Your form content */}
      </div>
    </>
  );
};

export default Hero;
