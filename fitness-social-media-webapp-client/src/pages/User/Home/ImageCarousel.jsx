
import React, { useState } from 'react';
import { API_URL, IMAGE_BUCKET_URL } from "../../../lib/consts";

const ImageCarousel = (data) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderData, setSliderData] = useState(data.data)

      const handleNext = () => {
        setCurrentSlide((currentSlide + 1) % sliderData.length);
      };
    
      const handlePrev = () => {
        setCurrentSlide((currentSlide - 1 + sliderData.length) % sliderData.length);
      };
      
  return (
    <div>


<div id="default-carousel" className="relative w-full" data-carousel="slide">

    <div className="relative h-56 overflow-hidden md:h-[400px]">

        {sliderData.map((src, index) => (
          <img
            key={index}
            src={IMAGE_BUCKET_URL + src}
            alt={`Slide ${index}`}
            className={`slide ${index === currentSlide ? 'active' : 'hidden'}  rounded h-[400px] w-full object-cover`}
          />
        ))}

    </div>

    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
    {sliderData.map((src, index) => (
        <button type="button" key={index} className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-gray-200' : 'bg-gray-400'}`} aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>

        ))}
    </div>

    <button onClick={handlePrev} type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button onClick={handleNext} type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
</div>

    </div>
  )
}

export default ImageCarousel