import React from 'react';
import { IoIosChatboxes } from "react-icons/io";

const Footer = () => {
    return (
        <div className='bg-zinc-950 px-4 sm:px-6 lg:px-10 py-10 w-full'>
            
            {/* Container */}
            <div className='max-w-6xl mx-auto bg-[#D4FF00] flex flex-col items-center text-center p-6 sm:p-8 md:p-10 rounded-lg mt-10'>
                
                {/* Heading */}
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black font-semibold leading-tight'>
                    Are You Ready to kickstart your project?
                </h1>

                {/* Description */}
                <p className='text-sm sm:text-base md:text-lg text-[#0a0a0a] mt-4 max-w-2xl'>
                    Reach out and let's make it happen ✨. I'm also available for full-time or part-time opportunities 
                    to push the boundaries of design and deliver exceptional work.
                </p>

                {/* Button */}
                <button className='px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full flex items-center gap-2 hover:scale-105 cursor-pointer transform duration-300 text-sm sm:text-base md:text-lg mt-8 text-white bg-black border-2 border-[#93B400]'>
                    <IoIosChatboxes /> Let's Talk
                </button>
            </div>

            {/* Footer Text */}
            <p className='text-center text-xs sm:text-sm md:text-base text-[#B4B4B4] mt-8'>
                Copyright © 2026. All rights reserved
            </p>
        </div>
    );
};

export default Footer;