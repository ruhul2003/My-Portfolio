import React from 'react';
import P1 from "../assets/p1.png";
import P2 from "../assets/p2.png";
import P3 from "../assets/p3.png";
import P4 from "../assets/p4.png";

const Projects = () => {
    const projects = [
        {
            id: 1,
            image: P1,
            title: "Keen Keeper",
            description: "A brief description of this amazing project and what I delivered.",
            link: "#", // Replace with actual link
        },
        {
            id: 2,
            image: P2,
            title: "DigiTools",
            description: "Another standout project showcasing modern design and functionality.",
            link: "#",
        },
        {
            id: 3,
            image: P3,
            title: "English Janala",
            description: "High-quality solution delivered to a client with great results.",
            link: "#",
        },
        {
            id: 4,
            image: P4,
            title: "Github Issue Tracker",
            description: "Community-focused project that I'm really proud of.",
            link: "#",
        },
    ];

    return (
        <div className="min-h-screen w-full mt-20 mx-auto bg-[#0a0a0a] py-16">
            <div className="w-9/12 mx-auto mb-16">
                <h1 className="text-4xl md:text-6xl lg:text-[80px] font-extrabold text-[#B3B3B3] tracking-tight">
                    Projects
                </h1>
                <p className="text-[#B4B4B4] mt-10 ml-10 text-[20px] max-w-2xl">
                    Check out my portfolio of top-notch projects that I've delivered to both clients and the community. 
                    I'm more than happy to answer any questions you may have about how we can collaborate to achieve your objectives.
                </p>
            </div>

            <div className="w-9/12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative overflow-hidden rounded-3xl bg-zinc-900 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-16/10 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">
                                    {project.title}
                                </h3>
                                <p className="text-[#B4B4B4] text-[15px] leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                
                                <a
                                    href={project.link}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#B3B3B3] transition-colors group/btn"
                                >
                                    View Project
                                    <span className="text-xl transition-transform group-hover/btn:translate-x-1">→</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;