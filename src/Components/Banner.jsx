"use client";

import React from 'react';
import { motion } from 'framer-motion';
import profilePic from "../assets/portfolio_pp.jpg";

const Banner = () => {
    // Parent stagger variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            }
        }
    };

    // Text child variants with spring physics
    const textItemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15
            }
        }
    };

    // Profile Image variant
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, x: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 60,
                damping: 12,
                delay: 0.3
            }
        }
    };

    return (
        <section className="min-h-screen overflow-hidden w-full flex items-center text-white px-6 sm:px-12 md:px-20 relative">
            {/* Decorative ambient background glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C4F000]/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">

                {/* Text Section (Staggered Load) */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full md:w-[65%] space-y-6 text-center md:text-left"
                >
                    <motion.h1 
                        variants={textItemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-gray-400"
                    >
                        I am <span className="text-white font-medium">Web Developer</span>,  
                        indie maker, and digital nomad living on the internet.
                    </motion.h1>

                    <motion.p 
                        variants={textItemVariants}
                        className="text-gray-500 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto md:mx-0 leading-relaxed"
                    >
                        Hi, I'm Ruhul Amin — I'm a full stack Web developer with 2+ years of experience focusing on app interfaces.
                    </motion.p>

                    <motion.div 
                        variants={textItemVariants}
                        className="pt-2 flex justify-center md:justify-start"
                    >
                        <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: "#b8dd00" }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-[#D4FF00] text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#D4FF00]/10"
                        >
                            Download CV
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 17V3" />
                                <path d="m6 11 6 6 6-6" />
                                <path d="M19 21H5" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Profile Image (Spring Load + Hover Float effect) */}
                <motion.div 
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full md:w-[35%] flex justify-center md:justify-end"
                >
                    <motion.div
                        whileHover={{ y: -8, rotateZ: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="relative group cursor-pointer"
                    >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-[#C4F000]/10 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img
                            src={profilePic.src}
                            alt="Ruhul Amin Profile Picture"
                            className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] aspect-4/5 object-cover rounded-[32px] border border-white/10 shadow-2xl relative z-10 transition-colors group-hover:border-[#C4F000]/30"
                        />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default Banner;