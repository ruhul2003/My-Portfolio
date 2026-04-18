import React from 'react';
import { IoIosChatboxes } from "react-icons/io";


const Footer = () => {
    return (
        <div className='bg-zinc-950 items-center p-10 w-full'>
            <div className='w-9/12 bg-[#D4FF00] mx-auto flex justify-center flex-col items-center mt-10 p-10 rounded-lg'>
                <h1 className='text-[40px] md:text-[50px] lg:text-[60px] text-center text-black '>Are You Ready to kickstart your project?</h1>
                <p className='text-[20px] text-[#0a0a0a] text-center mt-4'>Reach out and let's make it happen ✨. I'm also available for full-time or Part-time opportunities to push <br /> the boundaries of design and deliver exceptional work.</p>

                <button className='px-10 rounded-full flex items-center gap-2 py-4 hover:scale-103 hover:cursor-pointer transform duration-300 text-[20px] mt-10 mx-auto text-white bg-black border-2 border-[#93B400]'><IoIosChatboxes /> Let's Talk</button>
            </div>

            <p className='text-center text-[16px] text-[#B4B4B4] mt-8'>Copyright © 2026. All rights reserved</p>
        </div>
    );
};

export default Footer;