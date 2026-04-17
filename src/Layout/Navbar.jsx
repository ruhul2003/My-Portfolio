import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";





const Navbar = () => {
    return (
        <div className='bg-transparent items-center w-9/12 mx-auto py-6 flex justify-between'>
            <span className='text-4xl font-extrabold text-[#C4F000]'>Ruhul.</span>
            <ul className='flex flex-row text-[16px] text-white gap-6'>
                <li className='hover:text-[#C4F000] cursor-pointer'>Home</li>
                <li className='hover:text-[#C4F000] cursor-pointer'>About</li>
                <li className='hover:text-[#C4F000] cursor-pointer'>Projects</li>
                <li className='hover:text-[#C4F000] cursor-pointer'>Blog</li>
                <li className='hover:text-[#C4F000] cursor-pointer'>Contact</li>
            </ul>

            <div className="social flex flex-row justify-between text-white text-[20px] gap-5">
                <FaFacebook className='hover:text-[#C4F000] hover:cursor-pointer'/>
                <RiInstagramFill className='hover:text-[#C4F000] hover:cursor-pointer'/>
                <FaLinkedin className='hover:text-[#C4F000] hover:cursor-pointer'/>
                <FaGithub className='hover:text-[#C4F000] hover:cursor-pointer'/>
            </div>
        </div>
    );
};

export default Navbar;