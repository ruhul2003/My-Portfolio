import React from 'react';
import profilePic from "../assets/pp.jpg";

const About = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-[80px] font-extrabold text-[#B3B3B3] text-center md:text-left">
                About Me
            </h1>

            {/* Short Intro */}
            <p className="text-[#B4B4B4] mt-8 text-[18px] md:text-[20px] max-w-3xl mx-auto md:mx-0 leading-relaxed">
                With over 2 years of dedicated focus on developing web applications that achieve business goals, I have established myself as a trusted professional in the industry.
            </p>

            {/* Counters - Responsive Grid */}
            <div className="mt-16 mb-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h1 className="text-white font-extrabold text-5xl">3+</h1>
                    <p className="text-[15px] md:text-[16px] text-[#B4B4B4] mt-2">Years of Experience</p>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h1 className="text-white font-extrabold text-5xl">50+</h1>
                    <p className="text-[15px] md:text-[16px] text-[#B4B4B4] mt-2">Complete Projects</p>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h1 className="text-white font-extrabold text-5xl">30+</h1>
                    <p className="text-[15px] md:text-[16px] text-[#B4B4B4] mt-2">Client Satisfied</p>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h1 className="text-white font-extrabold text-5xl">20+</h1>
                    <p className="text-[15px] md:text-[16px] text-[#B4B4B4] mt-2">Cup of Coffee</p>
                </div>
            </div>

            {/* Profile + Bio Section */}
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mt-10">

                {/* Profile Image */}
                <div className="shrink-0 w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[440px] mx-auto lg:mx-0">
                    <img
                        src={profilePic}
                        alt="Profile"
                        className="w-full aspect-[4/5] object-cover rounded-xl border border-white/10 shadow-2xl"
                    />
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-[42px] leading-tight font-light text-white tracking-tight">
                        A Passionate <span className="text-[#D4FF00] font-medium">Web Designer</span> Turning
                        Ideas Into Visually Stunning, User-Friendly Websites.
                    </h1>

                    <p className="text-[15px] md:text-[16px] text-[#B4B4B4] mt-6 leading-relaxed">
                        Hi, I’m Ruhul Amin — a passionate Web Developer and Web Designer with around two years of hands-on experience building modern, user-friendly digital experiences. I specialize in full-stack development, focusing on creating responsive interfaces and scalable web applications.
                    </p>

                    <p className="text-[15px] md:text-[16px] text-[#B4B4B4] mt-5 leading-relaxed">
                        Currently, I’m continuously improving my skills by working on real-world projects and exploring new technologies. I enjoy turning ideas into functional products and aim to build impactful solutions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;