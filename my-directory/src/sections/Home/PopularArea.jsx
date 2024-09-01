import React, { useEffect } from "react";
import { useDarkMode } from "../../components/DarkModeContext";
import area1 from "../../assets/images/area1.jpg";
import area2 from "../../assets/images/area2.jpg";
import area3 from "../../assets/images/area3.jpg";
import Aos from "aos";
import "aos/dist/aos.css";

const PopularArea = () => {
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
    <div className={`${darkMode ? "dark bg-black" : "light bg-transparent"}`}>
      <section
        className={`${
          darkMode ? "dark bg-gray-800 text-gray-200" : "light bg-orange-100 text-black"
        } lg:w-[90%] w-full h-fit m-auto bg-cover bg-center rounded-xl flex justify-center flex-col items-center lg:px-20 px-6 py-10 gap-20`}
      >
        <div
          id="top"
          className="w-full grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-8"
        >
          <div>
            <h1 data-aos="zoom-in" className="text-red-500 text-xl">
              Popular Areas
            </h1>
            <h1
              data-aos="zoom-in"
              className="text-[35px] font-semibold leading-10 mt-4"
            >
              Explore Most <br />
              Popular Areas
            </h1>

            <h1 data-aos="zoom-in" className="pt-5 text-left sm:text-justify">
              Discover the most popular areas in Australia where Hindu-owned businesses thrive. Whether you're seeking cultural products, traditional cuisine, wellness services, or specialized craftsmanship, you'll find local enterprises that offer authenticity, excellence, and tradition. Embrace the vibrant heritage and exceptional quality these businesses bring to these regions.
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 col-span-2 grid-cols-1 justify-center items-center gap-6">
            <div
              data-aos="zoom-in"
              data-aos-delay="400"
              style={{ backgroundImage: `url(${area1})` }}
              className={`h-[400px] bg-cover bg-center rounded-xl ${darkMode ? 'filter brightness-75' : ''}`}
            ></div>
            <div
              data-aos="zoom-in"
              data-aos-delay="400"
              style={{ backgroundImage: `url(${area2})` }}
              className={`h-[400px] bg-cover bg-center rounded-xl ${darkMode ? 'filter brightness-75' : ''}`}
            ></div>
            <div
              data-aos="zoom-in"
              data-aos-delay="400"
              style={{ backgroundImage: `url(${area3})` }}
              className={`h-[400px] bg-cover bg-center rounded-xl ${darkMode ? 'filter brightness-75' : ''}`}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopularArea;
