"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaEdit, FaPlus, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight, FaTag } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const router = useRouter();

    // Fetch projects and admin status
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch projects
                const projectsRes = await fetch('/api/projects');
                const projectsData = await projectsRes.json();
                if (projectsData.success) {
                    setProjects(projectsData.data);
                }

                // Fetch admin status
                const statusRes = await fetch('/api/auth/status');
                const statusData = await statusRes.json();
                setIsAdmin(statusData.authenticated);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id, e) => {
        e.stopPropagation(); // Prevent opening the modal
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setProjects(projects.filter(p => p._id !== id));
            } else {
                alert(data.message || "Failed to delete project");
            }
        } catch (err) {
            console.error("Error deleting project:", err);
            alert("An error occurred");
        }
    };

    const handleEditRedirect = (id, e) => {
        e.stopPropagation();
        router.push(`/admin?edit=${id}`);
    };

    // Modal navigation
    const nextImage = () => {
        if (!selectedProject) return;
        setCurrentImgIndex((prev) => (prev + 1) % selectedProject.images.length);
    };

    const prevImage = () => {
        if (!selectedProject) return;
        setCurrentImgIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    };

    // Dynamic Categories
    const categories = ['All', ...Array.from(new Set(projects.map(p => p.category || 'Other')))];
    const filteredProjects = selectedCategory === 'All'
        ? projects
        : projects.filter(p => (p.category || 'Other') === selectedCategory);

    return (
        <div className="min-h-screen w-full mt-20 mx-auto bg-slate-50 dark:bg-[#0a0a0a] py-16 transition-colors duration-300">
            {/* Header / Intro */}
            <div className="w-9/12 mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl lg:text-[80px] font-extrabold text-slate-900 dark:text-[#B3B3B3] tracking-tight">
                        Projects
                    </h1>
                    <p className="text-slate-700 dark:text-[#B4B4B4] mt-10 ml-5 md:ml-10 text-[20px] max-w-2xl leading-relaxed font-light">
                        Check out my portfolio of top-notch projects that I've delivered to both clients and the community.
                        I'm more than happy to answer any questions you may have about how we can collaborate.
                    </p>
                </div>

                {isAdmin && (
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 bg-[#65a30d] dark:bg-[#C4F000] text-white dark:text-black font-bold px-6 py-3 rounded-full hover:bg-[#52840a] dark:hover:bg-[#b8dd00] transition-colors shadow-lg shadow-[#65a30d]/10 whitespace-nowrap self-start md:self-end"
                    >
                        <FaPlus /> Add New Project
                    </Link>
                )}
            </div>

            {/* Category Filter Pills */}
            {!loading && projects.length > 0 && (
                <div className="w-9/12 mx-auto mb-10 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 rounded-full font-bold transition-all text-xs sm:text-sm whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                                selectedCategory === cat
                                    ? 'text-white bg-[#65a30d] dark:text-black dark:bg-[#C4F000] shadow-lg shadow-[#65a30d]/20 scale-105'
                                    : 'text-slate-700 bg-white border border-slate-300 dark:text-gray-400 dark:bg-zinc-900 dark:border-zinc-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-zinc-700'
                            }`}
                        >
                            <FaTag className={`text-[10px] ${selectedCategory === cat ? 'text-white dark:text-black' : 'text-[#65a30d] dark:text-[#C4F000]'}`} />
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Projects Grid */}
            <div className="w-9/12 mx-auto">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-[#65a30d] dark:border-[#C4F000] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-600 dark:text-gray-400 mt-4">Loading projects...</p>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 dark:text-gray-500">
                        <p className="text-xl">No projects found in this category.</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    onClick={() => {
                                        setSelectedProject(project);
                                        setCurrentImgIndex(0);
                                    }}
                                    className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 shadow-lg dark:shadow-xl border border-slate-200 dark:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-slate-300 dark:hover:border-gray-700/60"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-black/40">
                                        <Image
                                            src={project.images && project.images[0] ? (project.images[0].url || project.images[0]) : "/assets/p1.png"}
                                            alt={project.title}
                                            width={500}
                                            height={500}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md border border-slate-200 dark:border-zinc-700 text-[#65a30d] dark:text-[#C4F000] font-semibold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                                                <FaTag className="text-[10px]" /> {project.category || 'Other'}
                                            </span>
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-900/30 to-slate-900/80 dark:via-black/30 dark:to-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                                            <span className="text-white dark:text-[#C4F000] font-semibold text-sm tracking-wider uppercase">View Project Details →</span>
                                        </div>

                                        {/* Admin Action Buttons */}
                                        {isAdmin && (
                                            <div className="absolute top-4 right-4 flex gap-2 z-20">
                                                <button
                                                    onClick={(e) => handleEditRedirect(project._id, e)}
                                                    className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all duration-200 hover:scale-110 shadow-md"
                                                    title="Edit Project"
                                                >
                                                    <FaEdit className="text-sm" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(project._id, e)}
                                                    className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-full transition-all duration-200 hover:scale-110 shadow-md"
                                                    title="Delete Project"
                                                >
                                                    <FaTrash className="text-sm" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-[#65a30d] dark:group-hover:text-[#C4F000] transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-700 dark:text-[#B4B4B4] text-[15px] leading-relaxed mb-6 line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Technologies tags */}
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.technologies.slice(0, 3).map((tech, idx) => (
                                                    <span key={idx} className="text-xs bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-gray-300 px-3 py-1 rounded-full border border-slate-200 dark:border-gray-700/30">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <span className="text-xs bg-slate-100 dark:bg-zinc-800/40 text-slate-600 dark:text-gray-500 px-2 py-1 rounded-full border border-slate-200 dark:border-transparent">
                                                        +{project.technologies.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        <button
                                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white hover:text-[#65a30d] dark:hover:text-[#C4F000] transition-colors group/btn"
                                        >
                                            Explore Details
                                            <span className="text-xl transition-transform group-hover/btn:translate-x-1">→</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md"
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 350 }}
                            className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-5 right-5 z-30 p-2 bg-slate-100 dark:bg-black/60 hover:bg-slate-200 dark:hover:bg-black text-slate-700 dark:text-white hover:text-red-500 rounded-full transition-all border border-slate-300 dark:border-zinc-800"
                            >
                                <FaTimes className="text-lg" />
                            </button>

                            {/* Scrollable Content Container */}
                            <div className="overflow-y-auto flex-1">
                                {/* Carousel Section */}
                                <div className="relative aspect-16/9 md:aspect-21/9 bg-slate-900 flex items-center justify-center group/carousel overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentImgIndex}
                                            src={selectedProject.images[currentImgIndex]?.url || selectedProject.images[currentImgIndex]}
                                            alt={`${selectedProject.title} screenshot ${currentImgIndex + 1}`}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full h-full object-cover"
                                        />
                                    </AnimatePresence>

                                    {/* Image Caption overlay */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-sm border border-zinc-800 text-[10px] sm:text-xs font-semibold text-gray-200 px-4 py-1.5 rounded-full z-20 shadow-md max-w-[80%] text-center truncate">
                                        {selectedProject.images[currentImgIndex]?.title || `Screenshot ${currentImgIndex + 1}`}
                                    </div>

                                    {/* Carousel navigation buttons */}
                                    {selectedProject.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                                className="absolute left-4 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all border border-zinc-800 hover:scale-105"
                                            >
                                                <FaChevronLeft />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                                className="absolute right-4 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all border border-zinc-800 hover:scale-105"
                                            >
                                                <FaChevronRight />
                                            </button>

                                            {/* Dot indicators */}
                                            <div className="absolute bottom-10 flex gap-1.5 z-20">
                                                {selectedProject.images.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={(e) => { e.stopPropagation(); setCurrentImgIndex(idx); }}
                                                        className={`w-2 h-2 rounded-full transition-all ${idx === currentImgIndex ? 'bg-[#65a30d] dark:bg-[#C4F000] w-6' : 'bg-white/40'}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Body Section */}
                                <div className="p-8 md:p-10 space-y-6">
                                    <div className="flex flex-wrap justify-between items-start gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="inline-flex items-center gap-1.5 bg-[#65a30d]/10 dark:bg-[#C4F000]/10 border border-[#65a30d]/30 dark:border-[#C4F000]/30 text-[#65a30d] dark:text-[#C4F000] font-bold text-xs px-3 py-1 rounded-full">
                                                    <FaTag className="text-[10px]" /> {selectedProject.category || 'Other'}
                                                </span>
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                                {selectedProject.title}
                                            </h2>
                                            {selectedProject.link && (
                                                <a
                                                    href={selectedProject.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm text-[#65a30d] dark:text-[#C4F000] hover:underline mt-2 font-medium"
                                                >
                                                    Visit Live Website <FaExternalLinkAlt className="text-xs" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tech Tags */}
                                    {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-semibold text-slate-500 dark:text-gray-500 uppercase tracking-wider mb-2">Technologies Used</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.technologies.map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-sm bg-slate-100 border border-slate-300 dark:bg-zinc-900 dark:border-zinc-800 text-slate-800 dark:text-gray-300 px-4 py-1.5 rounded-full"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Description */}
                                    <div className="border-t border-slate-200 dark:border-zinc-900 pt-6">
                                        <h4 className="text-xs font-semibold text-slate-500 dark:text-gray-500 uppercase tracking-wider mb-3">Project Overview</h4>
                                        <p className="text-slate-700 dark:text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
                                            {selectedProject.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Projects;