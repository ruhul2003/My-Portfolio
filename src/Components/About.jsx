"use client";

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const defaultData = {
    shortIntro: "With over 2 years of dedicated focus on developing web applications that achieve business goals, I have established myself as a trusted professional in the industry.",
    stats: [
        { number: "3+", label: "Years of Experience" },
        { number: "50+", label: "Complete Projects" }
    ],
    bioHeadingPrefix: "A Passionate",
    bioHeadingHighlight: "Web Designer",
    bioHeadingSuffix: "Turning Ideas Into Visually Stunning, User-Friendly Websites.",
    bioParagraphs: [
        "Hi, I’m Ruhul Amin — a passionate Web Developer and Web Designer with around two years of hands-on experience building modern, user-friendly digital experiences. I specialize in full-stack development, focusing on creating responsive interfaces and scalable web applications.",
        "Currently, I’m continuously improving my skills by working on real-world projects and exploring new technologies. I enjoy turning ideas into functional products and aim to build impactful solutions."
    ],
    principles: [
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
    ]
};

const AnimatedCounter = ({ value }) => {
    const valStr = String(value || '');
    const numericMatch = valStr.match(/(\d+)/);
    const targetNum = numericMatch ? parseInt(numericMatch[0], 10) : null;
    const prefix = targetNum !== null ? valStr.substring(0, valStr.indexOf(numericMatch[0])) : '';
    const suffix = targetNum !== null ? valStr.substring((valStr.indexOf(numericMatch[0]) + numericMatch[0].length)) : '';

    const [current, setCurrent] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    useEffect(() => {
        if (targetNum === null || !isInView) return;

        let startTimestamp = null;
        const duration = 1800;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            setCurrent(Math.floor(easeProgress * targetNum));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setCurrent(targetNum);
            }
        };

        const animationFrame = window.requestAnimationFrame(step);
        return () => window.cancelAnimationFrame(animationFrame);
    }, [targetNum, isInView]);

    if (targetNum === null) {
        return <span>{valStr}</span>;
    }

    return (
        <span ref={ref}>
            {prefix}{current}{suffix}
        </span>
    );
};

const About = () => {
    const [aboutData, setAboutData] = useState(defaultData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const res = await fetch('/api/about');
                const result = await res.json();
                if (result.success && result.data) {
                    setAboutData(result.data);
                }
            } catch (err) {
                console.error("Failed to load about me data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

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

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
            
            {/* Ambient Background decoration */}
            <div className="absolute right-0 top-1/4 w-[300px] h-[300px] bg-[#C4F000]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-[80px] font-extrabold text-slate-900 dark:text-[#B3B3B3] text-center md:text-left tracking-tight">
                About Me
            </h1>

            {/* Short Intro */}
            <p className="text-slate-700 dark:text-[#B4B4B4] mt-8 text-[18px] md:text-[20px] max-w-3xl mx-auto md:mx-0 leading-relaxed font-light">
                {aboutData.shortIntro}
            </p>

            {/* Counters - Staggered entrance and Hover lift */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="mt-16 mb-20 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto md:mx-0"
            >
                {aboutData.stats?.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -6 }}
                        className="flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-2xl border border-slate-300 dark:border-zinc-800/40 bg-white/80 dark:bg-zinc-900/10 hover:bg-white dark:hover:bg-zinc-900/30 hover:border-[#65a30d]/40 dark:hover:border-[#C4F000]/40 backdrop-blur-sm transition-all duration-300 shadow-sm"
                    >
                        <h2 className="text-[#65a30d] dark:text-[#C4F000] font-extrabold text-5xl tracking-tight">
                            <AnimatedCounter value={stat.number} />
                        </h2>
                        <p className="text-[14px] md:text-[15px] text-slate-700 dark:text-[#B4B4B4] mt-2 font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bio Section - Refactored Grid without Photo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mt-10 border-t border-slate-300 dark:border-zinc-900 pt-16">
                
                {/* Left Side: Callout Heading */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    className="lg:col-span-5 space-y-6"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-[42px] leading-tight font-light text-slate-900 dark:text-white tracking-tight">
                        {aboutData.bioHeadingPrefix && `${aboutData.bioHeadingPrefix} `}
                        {aboutData.bioHeadingHighlight && (
                            <span className="text-[#65a30d] dark:text-[#D4FF00] font-medium">{aboutData.bioHeadingHighlight}</span>
                        )}
                        {aboutData.bioHeadingSuffix && ` ${aboutData.bioHeadingSuffix}`}
                    </h2>
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 bg-[#65a30d] dark:bg-[#D4FF00] rounded"
                    ></motion.div>
                </motion.div>

                {/* Right Side: Biographies text */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 }}
                    className="lg:col-span-7 space-y-6 text-slate-700 dark:text-gray-400 font-light leading-relaxed text-[16px] text-left"
                >
                    {aboutData.bioParagraphs?.map((para, index) => (
                        <p key={index}>{para}</p>
                    ))}
                </motion.div>
            </div>

            {/* Core Principles Section */}
            {aboutData.principles && aboutData.principles.length > 0 && (
                <div className="mt-24 border-t border-slate-300 dark:border-zinc-900 pt-16">
                    <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight"
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
                        {aboutData.principles.map((p, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -6 }}
                                className="p-6 rounded-2xl border border-slate-300 dark:border-zinc-800/40 bg-white/80 dark:bg-zinc-900/5 hover:bg-white dark:hover:bg-zinc-900/30 hover:border-[#65a30d]/40 dark:hover:border-[#C4F000]/40 backdrop-blur-sm transition-all duration-300 shadow-sm"
                            >
                                <h4 className="text-[#65a30d] dark:text-[#C4F000] font-bold text-lg tracking-tight">{p.title}</h4>
                                <p className="text-sm text-slate-700 dark:text-gray-400 mt-3 font-light leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default About;