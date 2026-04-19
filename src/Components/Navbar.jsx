import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';   // ← Added
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();   // ← For active link highlighting

    // Helper function to check active route
    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <header className="w-full fixed top-0 left-0 z-50 
                           bg-[#020617]/70 
                           backdrop-blur-sm">

            <nav className="w-11/12 md:w-9/12 mx-auto py-5 flex justify-between items-center text-white">

                {/* Logo - Link to Home */}
                <Link to="/" className="text-3xl md:text-4xl font-extrabold text-[#C4F000]">
                    Ruhul.
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-[16px]">
                    <li>
                        <Link
                            to="/"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/') ? 'text-[#C4F000]' : ''}`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/about') ? 'text-[#C4F000]' : ''}`}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/projects"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/projects') ? 'text-[#C4F000]' : ''}`}
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/services"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/services') ? 'text-[#C4F000]' : ''}`}
                        >
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/contact') ? 'text-[#C4F000]' : ''}`}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* Desktop Social */}
                <div className="hidden md:flex gap-5 text-xl">

                    <a
                        href="https://www.facebook.com/imtiaz.hossain.908347"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebook className="hover:text-[#C4F000] cursor-pointer transition-colors" />
                    </a>

                    <a
                        href="https://www.instagram.com/your_imtiaz_27/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RiInstagramFill className="hover:text-[#C4F000] cursor-pointer transition-colors" />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/ruhul-amin-web-dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin className="hover:text-[#C4F000] cursor-pointer transition-colors" />
                    </a>

                    <a
                        href="https://github.com/ruhul2003"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub className="hover:text-[#C4F000] cursor-pointer transition-colors" />
                    </a>

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
            <div className={`md:hidden bg-[#020617]/95 backdrop-blur-sm text-white overflow-hidden transition-all duration-300 
                ${isOpen ? "block py-6" : "hidden"}`}>

                <ul className="flex flex-col items-center gap-6 text-lg">
                    <li>
                        <Link
                            to="/"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/') ? 'text-[#C4F000]' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/about') ? 'text-[#C4F000]' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/projects"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/projects') ? 'text-[#C4F000]' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/services"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/services') ? 'text-[#C4F000]' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/contact') ? 'text-[#C4F000]' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                    </li>
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