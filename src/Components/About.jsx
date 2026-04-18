import React from 'react';
import profilePic from "../assets/pp.jpg";

const About = () => {
    return (
        <div className='w-9/12 mt-10 mx-auto'>
            <h1 className="text-4xl md:text-6xl lg:text-[80px]  font-extrabold text-[#B3B3B3]">About Me</h1>
            <p className='text-[#B4B4B4] mt-10 ml-10 text-[20px]'>With over 2 years of dedicated focus on developing web applications that achieve business goals, I have established myself as a trusted professional in the industry.</p>

            {/* Counters */}

            <div className='mt-16 mb-10 flex gap-30 w-full justify-start'>
                <div className='flex flex-col gap-4 '>
                    <h1 className='text-white font-extrabold text-5xl'>3+ </h1>
                    <p className='text-[16px] text-[#B4B4B4]'>Years of Experience</p>
                </div>
                <div className='flex flex-col gap-4 '>
                    <h1 className='text-white font-extrabold text-5xl'>50+ </h1>
                    <p className='text-[16px] text-[#B4B4B4]'>Complete Projects</p>
                </div>
                <div className='flex flex-col gap-4 '>
                    <h1 className='text-white font-extrabold text-5xl'>30+ </h1>
                    <p className='text-[16px] text-[#B4B4B4]'>Client Satisfied</p>
                </div>
                <div className='flex flex-col gap-4 '>
                    <h1 className='text-white font-extrabold text-5xl'>20+ </h1>
                    <p className='text-[16px] text-[#B4B4B4]'>Cup of Coffee</p>
                </div>
            </div>

            {/* Banner */}

            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto min-h-[85vh]">

                {/* Profile Image - Increased Size */}
                <div className="shrink-0 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] xl:max-w-[480px] mx-auto lg:mx-0">
                    <img
                        src={profilePic}
                        alt="Profile"
                        className="w-full aspect-4/5 object-cover 
                       border border-white/10 shadow-2xl"
                    />
                </div>

                {/* Text Content - Lighter Text */}
                <div className="flex-1 text-center lg:text-left mt-8 lg:mt-0">
                    <h1 className="text-[40px] leading-[1.05] font-light text-white tracking-[-0.02em]">
                        A Passionate <span className="text-[#D4FF00] font-medium">Web Designer</span> Turning
                        Ideas Into Visually Stunning, User-Friendly Websites.
                    </h1>

                    {/* Bio Text - Also lighter */}
                    <p className='text-[16px] text-[#B4B4B4] mt-5'>
                        Hi, I’m Ruhul Amin — a passionate Web Developer and Web Designer with around two years of hands-on experience building modern, user-friendly digital experiences. I specialize in full-stack development, focusing on creating responsive interfaces and scalable web applications that deliver both performance and clean design.
                    </p>

                    <p className='text-[16px] text-[#B4B4B4] mt-5'>
                        Currently, I’m continuously improving my skills by working on real-world projects and exploring new technologies. I enjoy turning ideas into functional products and aim to build impactful solutions while growing as a developer in the ever-evolving tech world.
                    </p>

                </div>
            </div>

        </div>
    );
};

export default About;