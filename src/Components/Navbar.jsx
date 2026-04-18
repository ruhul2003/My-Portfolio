import React, { useState } from 'react';
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full fixed top-0 left-0 z-50 
                           bg-[#020617]/70 
                           backdrop-blur-sm">

            <nav className="w-11/12 md:w-9/12 mx-auto py-5 flex justify-between items-center text-white">

                {/* Logo */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#C4F000]">
                    Ruhul.
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-[16px]">
                    <li className="hover:text-[#C4F000] cursor-pointer transition-colors">Home</li>
                    <li className="hover:text-[#C4F000] cursor-pointer transition-colors">About</li>
                    <li className="hover:text-[#C4F000] cursor-pointer transition-colors">Projects</li>
                    <li className="hover:text-[#C4F000] cursor-pointer transition-colors">Services</li>
                    <li className="hover:text-[#C4F000] cursor-pointer transition-colors">Contact</li>
                </ul>

                {/* Desktop Social */}
                <div className="hidden md:flex gap-5 text-xl">
                    <FaFacebook className="hover:text-[#C4F000] cursor-pointer transition-colors" />
                    <RiInstagramFill className="hover:text-[#C4F000] cursor-pointer transition-colors" />
                    <FaLinkedin className="hover:text-[#C4F000] cursor-pointer transition-colors" />
                    <FaGithub className="hover:text-[#C4F000] cursor-pointer transition-colors" />
                </div>

                {/* Mobile Button */}
                <div
                    className="md:hidden text-3xl cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <HiX /> : <HiMenu />}
                </div>
            </nav>

            {/* Mobile Menu - Simplified (no max-height animation) */}
            <div className={`md:hidden bg-[#020617]/95 backdrop-blur-sm text-white overflow-hidden transition-all duration-300 
                ${isOpen ? "block py-6" : "hidden"}`}>

                <ul className="flex flex-col items-center gap-6 text-lg">
                    <li className="hover:text-[#C4F000] cursor-pointer transition-colors">Home</li>
                    <li className="hover:text-[#C4F000] cursor-pointer transition-colors">About</li>
                    <li className="hover:text-[#C4F000] cursor-pointer transition-colors">Projects</li>
                    <li className="hover:text-[#C4F000] cursor-pointer transition-colors">Blog</li>
                    <li className="hover:text-[#C4F000] cursor-pointer transition-colors">Contact</li>
                </ul>

                <div className="flex justify-center gap-6 mt-6 text-2xl">
                    <FaFacebook className="hover:text-[#C4F000] cursor-pointer transition-colors" />
                    <RiInstagramFill className="hover:text-[#C4F000] cursor-pointer transition-colors" />
                    <FaLinkedin className="hover:text-[#C4F000] cursor-pointer transition-colors" />
                    <FaGithub className="hover:text-[#C4F000] cursor-pointer transition-colors" />
                </div>
            </div>
        </header>
    );
};

export default Navbar;