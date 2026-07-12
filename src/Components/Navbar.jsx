"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Check auth status on mount or pathname change
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/status');
                const data = await res.json();
                setIsAdmin(data.authenticated);
            } catch (err) {
                setIsAdmin(false);
            }
        };
        checkAuth();
    }, [pathname]);

    // Helper function to check active route
    const isActive = (path) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                setIsAdmin(false);
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return (
        <header className="w-full fixed top-0 left-0 z-50 
                           bg-[#020617]/70 
                           backdrop-blur-sm">

            <nav className="w-11/12 md:w-9/12 mx-auto py-5 flex justify-between items-center text-white">

                {/* Logo - Link to Home */}
                <Link href="/" className="text-3xl md:text-4xl font-extrabold text-[#C4F000]">
                    Ruhul.
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-[16px] items-center">
                    <li>
                        <Link
                            href="/"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/') ? 'text-[#C4F000]' : ''}`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/about') ? 'text-[#C4F000]' : ''}`}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/projects"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/projects') ? 'text-[#C4F000]' : ''}`}
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/services"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/services') ? 'text-[#C4F000]' : ''}`}
                        >
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/contact') ? 'text-[#C4F000]' : ''}`}
                        >
                            Contact
                        </Link>
                    </li>
                    {isAdmin && (
                        <li>
                            <Link
                                href="/admin"
                                className={`hover:text-[#C4F000] cursor-pointer transition-colors font-semibold px-3 py-1 rounded border border-[#C4F000]/30 bg-[#C4F000]/10
                                    ${isActive('/admin') ? 'text-[#C4F000] border-[#C4F000]' : 'text-lime-300'}`}
                            >
                                Admin
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Desktop Social & Auth */}
                <div className="hidden md:flex gap-5 text-xl items-center">
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

                    {isAdmin ? (
                        <button
                            onClick={handleLogout}
                            className="ml-4 text-xs font-semibold text-red-400 hover:text-red-300 border border-red-400/30 px-3 py-1 rounded bg-red-950/20 hover:bg-red-950/40 transition-all duration-200"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            href="/admin/login"
                            className="ml-4 text-xs font-semibold text-gray-400 hover:text-white border border-gray-600 px-3 py-1 rounded hover:bg-gray-800 transition-all duration-200"
                        >
                            Login
                        </Link>
                    )}
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
                            href="/"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/') ? 'text-[#C4F000]' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/about') ? 'text-[#C4F000]' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/projects"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/projects') ? 'text-[#C4F000]' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/services"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/services') ? 'text-[#C4F000]' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={`hover:text-[#C4F000] cursor-pointer transition-colors 
                                ${isActive('/contact') ? 'text-[#C4F000]' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                    </li>
                    {isAdmin && (
                        <li>
                            <Link
                                href="/admin"
                                className="text-lime-300 hover:text-[#C4F000]"
                                onClick={() => setIsOpen(false)}
                            >
                                Admin Dashboard
                            </Link>
                        </li>
                    )}
                    <li>
                        {isAdmin ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="text-red-400 font-semibold"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/admin/login"
                                className="text-gray-400 font-semibold"
                                onClick={() => setIsOpen(false)}
                            >
                                Admin Login
                            </Link>
                        )}
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