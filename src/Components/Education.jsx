"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
    const timelineItems = [
        {
            year: "2020 - PRESENT",
            company: "BloomHub Technology",
            role: "Application Developer",
            description: "As a product designer at a leading e-commerce company, I was responsible for designing user interfaces for the company's online shopping platform. I collaborated closely with marketing and development teams to create designs that improved user experience and increased sales."
        },
        {
            year: "2018 - 2020",
            company: "Skyward Company Limited",
            role: "Products Designer",
            description: "Worked as a product designer in a startup environment, focusing on mobile app UI/UX. Created wireframes, designed interfaces, and conducted user testing to ensure a smooth experience."
        },
        {
            year: "2012 - 2018",
            company: "Atlas Innovations",
            role: "Senior Developer",
            description: "Worked with multiple clients across industries, building user interfaces and digital products. Focused on adaptability, clean design, and delivering efficient solutions."
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 60,
                damping: 15
            }
        }
    };

    const dotVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.1
            }
        }
    };

    return (
        <div className="w-full bg-zinc-950/20 py-10">
            {/* Header */}
            <div className='py-20 bg-zinc-950/60 w-full border-y border-zinc-900'>
                <div className='w-9/12 mx-auto'>
                    <h1 className="text-4xl md:text-6xl lg:text-[80px] font-bold text-[#B3B3B3] tracking-tight">
                        Education & Experience
                    </h1>
                    <p className='text-[#B4B4B4] mt-10 ml-5 md:ml-10 text-[20px] max-w-2xl font-light leading-relaxed'>
                        Established history of success in design and development, consistently delivering valuable insights and driving significant results.
                    </p>
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-transparent text-white mt-16 pb-20 px-6 md:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto">

                    {/* Vertical Line and List */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative border-l border-zinc-800/80 pl-8 md:pl-12 space-y-16"
                    >
                        {timelineItems.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative group"
                            >
                                {/* Animate Connection Bullet Dot */}
                                <motion.div 
                                    variants={dotVariants}
                                    className="absolute -left-[41px] md:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-[#D4FF00] z-10 transition-colors duration-300 group-hover:bg-[#D4FF00]"
                                />

                                <div className="flex items-center gap-4 flex-wrap">
                                    {/* Date Badge */}
                                    <span className="relative border border-[#D4FF00] text-[#D4FF00] px-5 py-1 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap
                                    before:content-[''] before:absolute before:top-1/2 before:-left-6 before:w-4 before:h-px before:bg-[#D4FF00]/50 before:-translate-y-1/2">
                                        {item.year}
                                    </span>

                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#D4FF00] transition-colors duration-300">
                                        {item.company}
                                    </h3>
                                </div>

                                <p className="text-[#D4FF00] mt-2 font-medium text-sm">@ {item.role}</p>

                                <p className="mt-5 text-gray-400 leading-relaxed text-[16px] max-w-2xl font-light">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Education;