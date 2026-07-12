"use client";

import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    // Parent grid stagger variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
            }
        }
    };

    // Card/item entry variant (spring)
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

    const principles = [
        {
            title: "Performance First",
            desc: "Optimizing asset sizes, caching requests, and rendering with fast layouts to deliver instant responsiveness."
        },
        {
            title: "Clean Architecture",
            desc: "Writing modular, scalable, and highly maintainable components that adapt to changing business needs."
        },
        {
            title: "User Centric Design",
            desc: "Crafting interfaces that are accessible, interactive, and naturally intuitive for every visitor."
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
            
            {/* Ambient Background decoration */}
            <div className="absolute right-0 top-1/4 w-[300px] h-[300px] bg-[#C4F000]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

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
                className="mt-16 mb-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
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

            {/* Bio Section - Refactored Grid without Photo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mt-10 border-t border-zinc-900 pt-16">
                
                {/* Left Side: Callout Heading */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    className="lg:col-span-5 space-y-6"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-[42px] leading-tight font-light text-white tracking-tight">
                        A Passionate <span className="text-[#D4FF00] font-medium">Web Designer</span> Turning Ideas Into Visually Stunning, User-Friendly Websites.
                    </h2>
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 bg-[#D4FF00] rounded"
                    ></motion.div>
                </motion.div>

                {/* Right Side: Biographies text */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 }}
                    className="lg:col-span-7 space-y-6 text-gray-400 font-light leading-relaxed text-[16px] text-left"
                >
                    <p>
                        Hi, I’m Ruhul Amin — a passionate Web Developer and Web Designer with around two years of hands-on experience building modern, user-friendly digital experiences. I specialize in full-stack development, focusing on creating responsive interfaces and scalable web applications.
                    </p>
                    <p>
                        Currently, I’m continuously improving my skills by working on real-world projects and exploring new technologies. I enjoy turning ideas into functional products and aim to build impactful solutions.
                    </p>
                </motion.div>
            </div>

            {/* Core Principles Section - Added for spacing & professionalism */}
            <div className="mt-24 border-t border-zinc-900 pt-16">
                <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold text-white mb-8 tracking-tight"
                >
                    My Focus & Core Principles
                </motion.h3>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {principles.map((p, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ 
                                y: -6, 
                                borderColor: "rgba(196, 240, 0, 0.3)", 
                                backgroundColor: "rgba(255, 255, 255, 0.01)" 
                            }}
                            className="p-6 rounded-2xl border border-zinc-800/40 bg-zinc-900/5 backdrop-blur-sm transition-all duration-300"
                        >
                            <h4 className="text-[#C4F000] font-bold text-lg tracking-tight">{p.title}</h4>
                            <p className="text-sm text-gray-400 mt-3 font-light leading-relaxed">{p.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default About;