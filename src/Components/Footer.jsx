import React from 'react';
import { IoIosChatboxes } from "react-icons/io";
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className='w-full bg-[#020617] px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-900/60 relative overflow-hidden'>
            {/* Ambient Background decoration */}
            <div className="absolute left-1/2 bottom-0 w-[400px] h-[200px] bg-[#C4F000]/2 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>

            {/* Call to Action Card */}
            <div className='max-w-5xl mx-auto bg-zinc-900/10 backdrop-blur-sm border border-[#C4F000]/15 flex flex-col items-center text-center p-8 sm:p-12 md:p-16 rounded-3xl mt-6 relative group hover:border-[#C4F000]/25 transition-all duration-500'>
                {/* Gradient subtle hover background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#C4F000]/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>

                {/* Heading */}
                <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl'>
                    Ready to <span className="text-[#C4F000] font-medium">kickstart</span> your next project?
                </h2>

                {/* Description */}
                <p className='text-sm sm:text-base text-gray-400 mt-4 max-w-xl font-light leading-relaxed'>
                    Reach out and let's make it happen. I am available for freelance work, full-time engineering roles, and consulting to push limits and build premium interfaces.
                </p>

                {/* Button */}
                <Link href="/contact" className="mt-8">
                    <button className='px-8 py-3.5 bg-[#C4F000] hover:bg-[#b8dd00] text-black font-bold rounded-full flex items-center gap-2.5 transition-all hover:scale-105 shadow-lg shadow-[#C4F000]/5 cursor-pointer text-sm'>
                        <IoIosChatboxes className="text-lg" /> Let's Connect
                    </button>
                </Link>
            </div>

            {/* Footer Bottom Metadata Bar */}
            <div className='max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center mt-16 pt-8 border-t border-zinc-900/80 gap-4 text-xs sm:text-sm text-gray-500 font-light'>
                <p>Copyright © 2026 Ruhul Amin. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="https://github.com/ruhul2003" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="mailto:ruhul941020@gmail.com" className="hover:text-white transition-colors">Email</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;