"use client";

import React, { useState } from 'react';
import { TbBrandJavascript } from "react-icons/tb";
import { FaPython } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaHtml5 } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiMongodb } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa";
import { SiReactrouter } from "react-icons/si";
import { FaBootstrap } from "react-icons/fa";
import { TbBrandTypescript } from "react-icons/tb";
import { IoLogoCss3 } from "react-icons/io5";

const TechStack = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const technologies = [
        { Icon: TbBrandJavascript, label: "JavaScript", color: "from-yellow-400 to-yellow-500" },
        { Icon: TbBrandTypescript, label: "TypeScript", color: "from-blue-400 to-blue-500" },
        { Icon: FaPython, label: "Python", color: "from-blue-500 to-yellow-400" },
        { Icon: FaJava, label: "Java", color: "from-orange-500 to-red-500" },
        { Icon: FaReact, label: "React", color: "from-cyan-400 to-blue-400" },
        { Icon: TbBrandNextjs, label: "Next.js", color: "from-gray-400 to-gray-600" },
        { Icon: FaNodeJs, label: "Node.js", color: "from-green-500 to-green-600" },
        { Icon: SiExpress, label: "Express", color: "from-gray-300 to-gray-500" },
        { Icon: SiMongodb, label: "MongoDB", color: "from-green-500 to-emerald-600" },
        { Icon: FaHtml5, label: "HTML5", color: "from-orange-500 to-red-600" },
        { Icon: IoLogoCss3, label: "CSS3", color: "from-blue-500 to-cyan-500" },
        { Icon: RiTailwindCssFill, label: "Tailwind CSS", color: "from-cyan-400 to-blue-500" },
        { Icon: FaBootstrap, label: "Bootstrap", color: "from-purple-600 to-purple-700" },
        { Icon: SiReactrouter, label: "React Router", color: "from-red-500 to-orange-500" },
        { Icon: FaGithub, label: "GitHub", color: "from-gray-700 to-gray-900" },
        { Icon: FaGitAlt, label: "Git", color: "from-orange-500 to-red-600" },
    ];

    return (
        <div className='py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#C4F000]/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#C4F000]/5 rounded-full blur-3xl"></div>
            </div>

            <div className='relative z-10'>
                {/* Header Section */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-4">
                        <span className="text-[#C4F000]">
                            Tech Stack
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        A curated collection of modern technologies and tools I leverage to build exceptional digital experiences
                    </p>
                </div>

                {/* Tech Grid */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {technologies.map((tech, index) => {
                            const Icon = tech.Icon;
                            const isHovered = hoveredIndex === index;

                            return (
                                <div
                                    key={index}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="group relative"
                                >
                                    {/* Card Container */}
                                    <div
                                        className={`
                                            relative h-32 sm:h-40 rounded-2xl bg-linear-to-br from-gray-900 to-gray-800 
                                            border border-gray-700/50 overflow-hidden
                                            transition-all duration-500 ease-out
                                            ${isHovered ? 'border-[#C4F000]/50 shadow-2xl shadow-[#C4F000]/20 -translate-y-2' : 'hover:border-gray-600'}
                                            flex flex-col items-center justify-center gap-3
                                            backdrop-blur-sm
                                        `}
                                    >
                                        {/* Gradient overlay on hover */}
                                        <div
                                            className={`
                                                absolute inset-0 bg-linear-to-b from-[#C4F000]/10 to-transparent
                                                transition-opacity duration-500
                                                ${isHovered ? 'opacity-100' : 'opacity-0'}
                                            `}
                                        ></div>

                                        {/* Icon container with glow */}
                                        <div className='relative z-10'>
                                            <div
                                                className={`
                                                    text-5xl sm:text-6xl transition-all duration-500 ease-out
                                                    ${isHovered ? 'scale-125 drop-shadow-lg' : 'scale-100'}
                                                `}
                                                style={{
                                                    filter: isHovered ? `drop-shadow(0 0 12px rgba(196, 240, 0, 0.6))` : 'none'
                                                }}
                                            >
                                                <Icon />
                                            </div>
                                        </div>

                                        {/* Label */}
                                        <span
                                            className={`
                                                text-xs sm:text-sm font-semibold transition-all duration-500 relative z-10
                                                ${isHovered 
                                                    ? 'text-[#C4F000] text-base sm:text-base' 
                                                    : 'text-gray-300 text-xs sm:text-sm'
                                                }
                                            `}
                                        >
                                            {tech.label}
                                        </span>

                                        {/* Animated border accent */}
                                        <div
                                            className={`
                                                absolute inset-0 rounded-2xl border-2 border-[#C4F000]
                                                transition-opacity duration-500
                                                ${isHovered ? 'opacity-20' : 'opacity-0'}
                                                pointer-events-none
                                            `}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer accent */}
                <div className="mt-20 text-center">
                    <div className="inline-block px-6 py-3 rounded-full bg-linear-to-r from-[#C4F000]/10 to-emerald-500/10 border border-[#C4F000]/30">
                        <p className="text-[#C4F000] text-sm font-semibold tracking-wide">
                            Always learning & evolving
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechStack;
