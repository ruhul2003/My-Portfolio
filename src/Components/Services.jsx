"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TbBrandAirtable } from "react-icons/tb";
import { SiCssdesignawards } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

const Services = () => {
    // Grid animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
            }
        }
    };

    // Card entry variants (spring)
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 15
            }
        }
    };

    const servicesList = [
        {
            icon: TbBrandAirtable,
            title: "Brand Identity Design",
            description: "Crafting memorable visual identities, logo designs, and brand guidelines that elevate your digital presence."
        },
        {
            icon: SiCssdesignawards,
            title: "Website Design & Frontend",
            description: "Building responsive, modern, high-performance web applications using React, Next.js, and Framer Motion."
        },
        {
            icon: FaDatabase,
            title: "Database & Backend API",
            description: "Developing scalable Node.js & Express RESTful APIs, MongoDB integrations, and secure authentication systems."
        }
    ];

    return (
        <div className="w-9/12 mb-10 mx-auto">
            <div className='py-25 w-full'>
                <div className='w-full mx-auto'>
                    <h1 className="text-4xl md:text-6xl lg:text-[80px] font-bold text-slate-900 dark:text-[#B3B3B3] tracking-tight">
                        Services
                    </h1>
                    <p className='text-slate-700 dark:text-[#B4B4B4] mt-10 ml-5 md:ml-10 text-[20px] max-w-2xl font-light leading-relaxed'>
                        My Services Pave the Way for Exceptional Experiences, Where Quality and Commitment Define Every Interaction.
                    </p>
                </div>
            </div>

            {/* Staggered Services cards */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'
            >
                {servicesList.map((service, index) => {
                    const Icon = service.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ 
                                y: -10, 
                                borderColor: "rgba(101, 163, 13, 0.5)",
                                boxShadow: "0 20px 40px -15px rgba(101, 163, 13, 0.12)"
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 18 }}
                            className='bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800/40 cursor-pointer flex flex-col justify-between h-72 group shadow-sm transition-colors duration-300'
                        >
                            <div>
                                <div className="p-3 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl inline-block transition-colors group-hover:border-[#65a30d]/30 dark:group-hover:border-[#D4FF00]/30">
                                    <Icon className='w-[38px] h-[38px] text-[#65a30d] dark:text-[#D4FF00]' />
                                </div>
                                <h2 className='text-[22px] mt-6 text-slate-900 dark:text-white font-bold group-hover:text-[#65a30d] dark:group-hover:text-[#D4FF00] transition-colors duration-300'>
                                    {service.title}
                                </h2>
                                <p className='text-[15px] mt-3 text-slate-700 dark:text-gray-400 font-light leading-relaxed line-clamp-3'>
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default Services;