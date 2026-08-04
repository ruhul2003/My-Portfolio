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
                staggerChildren: 0.12,
                delayChildren: 0.1,
            }
        }
    };

    // Text items: Fade and glide smoothly from Left to Right
    const textItemVariants = {
        hidden: { opacity: 0, x: -80 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 55,
                damping: 16
            }
        }
    };

    // Profile Image: Fade and glide smoothly from Right to Left
    const imageVariants = {
        hidden: { opacity: 0, x: 80 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 55,
                damping: 16,
                delay: 0.3
            }
        }
    };

    // Marquee slide-up entry on load
    const marqueeVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 60,
                damping: 14,
                delay: 0.8
            }
        }
    };

    return (
        <section className="min-h-[calc(100vh-80px)] overflow-hidden w-full flex items-center text-white px-6 sm:px-12 md:px-20 pb-28 md:pb-24 relative">
            
            {/* Animated slow-pulsing background glows */}
            <motion.div 
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C4F000]/4 rounded-full blur-[130px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
            ></motion.div>
            <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/4 rounded-full blur-[110px] pointer-events-none translate-x-1/2 translate-y-1/2"
            ></motion.div>

            <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">

                {/* Text Section (Fading from left to right) */}
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
                        <motion.a 
                            href="/assets/Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
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
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Profile Image (Fading from right to left) */}
                <motion.div 
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full md:w-[35%] flex justify-center md:justify-end"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="relative"
                    >
                        <motion.div
                            whileHover={{ scale: 1.03, rotateZ: 1.5 }}
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
                </motion.div>

            </div>

            {/* Infinite Scrolling Marquee at the very bottom */}
            <motion.div 
                variants={marqueeVariants}
                initial="hidden"
                animate="visible"
                className="absolute bottom-0 left-0 w-full bg-zinc-950/40 border-t border-zinc-900/60 py-5 overflow-hidden backdrop-blur-xs select-none"
            >
                <div className="animate-marquee flex gap-16 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-zinc-500">
                    {/* Half 1 */}
                    <div className="flex gap-16 shrink-0 items-center">
                        <span>Full Stack Web Developer</span>
                        <span className="text-[#C4F000]">•</span>
                        <span>Next.js & React Expert</span>
                        <span className="text-[#C4F000]">•</span>
                        <span>UI/UX Designer</span>
                        <span className="text-[#C4F000]">•</span>
                        <span>Node.js Backend Specialist</span>
                        <span className="text-[#C4F000]">•</span>
                        <span>Clean Code Architect</span>
                        <span className="text-[#C4F000]">•</span>
                        <span>Framer Motion Animations</span>
                        <span className="text-[#C4F000]">•</span>
                    </div>
                    {/* Half 2 (identical duplicate) */}
                    <div className="flex gap-16 shrink-0 items-center">
                        <span>Full Stack Web Developer</span>
                        <span className="text-[#C4F000]">•</span>
                        <span>Next.js & React Expert</span>
                        <span className="text-[#C4F000]">•</span>
                        <span>UI/UX Designer</span>
                        <span className="text-[#C4F000]">•</span>
                        <span>Node.js Backend Specialist</span>
                        <span className="text-[#C4F000]">•</span>
                        <span>Clean Code Architect</span>
                        <span className="text-[#C4F000]">•</span>
                        <span>Framer Motion Animations</span>
                        <span className="text-[#C4F000]">•</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Banner;