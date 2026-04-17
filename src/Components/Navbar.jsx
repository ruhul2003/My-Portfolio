import React, { useState } from 'react';
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-[#020617]/70">

            <nav className="w-11/12 md:w-9/12 mx-auto py-5 flex justify-between items-center text-white">

                {/* Logo */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#C4F000]">
                    Ruhul.
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-[16px]">
                    <li className="hover:text-[#C4F000] cursor-pointer">Home</li>
                    <li className="hover:text-[#C4F000] cursor-pointer">About</li>
                    <li className="hover:text-[#C4F000] cursor-pointer">Projects</li>
                    <li className="hover:text-[#C4F000] cursor-pointer">Blog</li>
                    <li className="hover:text-[#C4F000] cursor-pointer">Contact</li>
                </ul>

                {/* Desktop Social */}
                <div className="hidden md:flex gap-5 text-xl">
                    <FaFacebook className="hover:text-[#C4F000] cursor-pointer" />
                    <RiInstagramFill className="hover:text-[#C4F000] cursor-pointer" />
                    <FaLinkedin className="hover:text-[#C4F000] cursor-pointer" />
                    <FaGithub className="hover:text-[#C4F000] cursor-pointer" />
                </div>

                {/* Mobile Button */}
                <div
                    className="md:hidden text-3xl cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <HiX /> : <HiMenu />}
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-[#020617]/95 backdrop-blur-md text-white transition-all duration-300 
                ${isOpen ? "max-h-[400px] py-6" : "max-h-0 overflow-hidden"}`}>

                <ul className="flex flex-col items-center gap-6 text-lg">
                    <li className="hover:text-[#C4F000] cursor-pointer">Home</li>
                    <li className="hover:text-[#C4F000] cursor-pointer">About</li>
                    <li className="hover:text-[#C4F000] cursor-pointer">Projects</li>
                    <li className="hover:text-[#C4F000] cursor-pointer">Blog</li>
                    <li className="hover:text-[#C4F000] cursor-pointer">Contact</li>
                </ul>

                <div className="flex justify-center gap-6 mt-6 text-2xl">
                    <FaFacebook className="hover:text-[#C4F000] cursor-pointer" />
                    <RiInstagramFill className="hover:text-[#C4F000] cursor-pointer" />
                    <FaLinkedin className="hover:text-[#C4F000] cursor-pointer" />
                    <FaGithub className="hover:text-[#C4F000] cursor-pointer" />
                </div>
            </div>

        </header>
    );
};

export default Navbar;