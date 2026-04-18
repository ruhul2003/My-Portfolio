import React from 'react';
import profilePic from "../assets/pp.jpg";

const Banner = () => {
    return (
        <section className="min-h-screen overflow-hidden w-full flex items-center  text-white px-6 sm:px-12 md:px-20">

            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">

                {/* Image */}
                <div className="w-full md:w-[35%] flex justify-center md:justify-start">
                    <img
                        src={profilePic}
                        alt="Profile"
                        className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] aspect-4/5 object-cover rounded-[32px] border border-white/10 shadow-2xl"
                    />
                </div>

                {/* Text */}
                <div className="w-full md:w-[65%] space-y-6 text-center md:text-left">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-gray-400">
                        I am <span className="text-white font-medium">Web Developer</span>,  
                        indie maker, and digital nomad living on the internet.
                    </h1>

                    <p className="text-gray-500 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto md:mx-0 leading-relaxed">
                        Hi, I'm Ruhul Amin — I'm a full stack Web developer with 2+ years of experience focusing on app interfaces.
                    </p>

                    <div className="pt-2 flex justify-center md:justify-start">
                        <button className="bg-[#D4FF00] text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-2 hover:bg-[#b8dd00] transition-colors">
                            Download CV
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 17V3" />
                                <path d="m6 11 6 6 6-6" />
                                <path d="M19 21H5" />
                            </svg>
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Banner;