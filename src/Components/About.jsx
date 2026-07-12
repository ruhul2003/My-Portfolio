"use client";

import React from 'react';
import { motion } from 'framer-motion';
import profilePic from "../assets/portfolio_pp.jpg";

const About = () => {
    // Parent grid stagger variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    // Counter item entry variant (spring)
    const itemVariants = {
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

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
            
            {/* Ambient Background decoration */}
            <div className="absolute right-0 top-1/3 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-[80px] font-extrabold text-[#B3B3B3] text-center md:text-left tracking-tight">
                About Me
            </h1>

            {/* Short Intro */}
            <p className="text-[#B4B4B4] mt-8 text-[18px] md:text-[20px] max-w-3xl mx-auto md:mx-0 leading-relaxed font-light">
                With over 2 years of dedicated focus on developing web applications that achieve business goals, I have established myself as a trusted professional in the industry.
            </p>

            {/* Counters - Staggered entrance and Hover lift */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="mt-16 mb-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            >
                {[
                    { number: "3+", label: "Years of Experience" },
                    { number: "50+", label: "Complete Projects" },
                    { number: "30+", label: "Client Satisfied" },
                    { number: "20+", label: "Cup of Coffee" }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -6, borderColor: "rgba(196, 240, 0, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                        className="flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-2xl border border-zinc-800/40 bg-zinc-900/10 backdrop-blur-sm transition-colors duration-300"
                    >
                        <h2 className="text-[#C4F000] font-extrabold text-5xl tracking-tight">{stat.number}</h2>
                        <p className="text-[14px] md:text-[15px] text-[#B4B4B4] mt-2 font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Profile + Bio Section */}
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mt-10">

                {/* Profile Image (Hover Scale/Glow and Slide up) */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    className="shrink-0 w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[440px] mx-auto lg:mx-0"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="relative rounded-2xl overflow-hidden group shadow-2xl border border-white/10"
                    >
                        {/* Interactive overlay border */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C4F000]/30 transition-colors duration-500 rounded-2xl z-20 pointer-events-none"></div>
                        <img
                            src={profilePic.src}
                            alt="Profile photo"
                            className="w-full aspect-4/5 object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                        />
                    </motion.div>
                </motion.div>

                {/* Text Content (Fade in + slide right) */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.1 }}
                    className="flex-1 text-center lg:text-left space-y-6"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-[42px] leading-tight font-light text-white tracking-tight">
                        A Passionate <span className="text-[#D4FF00] font-medium">Web Designer</span> Turning
                        Ideas Into Visually Stunning, User-Friendly Websites.
                    </h2>

                    <p className="text-[15px] md:text-[16px] text-gray-400 leading-relaxed font-light">
                        Hi, I’m Ruhul Amin — a passionate Web Developer and Web Designer with around two years of hands-on experience building modern, user-friendly digital experiences. I specialize in full-stack development, focusing on creating responsive interfaces and scalable web applications.
                    </p>

                    <p className="text-[15px] md:text-[16px] text-gray-405 leading-relaxed font-light">
                        Currently, I’m continuously improving my skills by working on real-world projects and exploring new technologies. I enjoy turning ideas into functional products and aim to build impactful solutions.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default About;