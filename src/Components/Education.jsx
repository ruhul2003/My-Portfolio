"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaPlusCircle, FaAward, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Education = () => {
    const [timelineItems, setTimelineItems] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch education data
                const eduRes = await fetch('/api/education');
                const eduData = await eduRes.json();
                if (eduData.success) {
                    setTimelineItems(eduData.data);
                }

                // Fetch certifications data
                const certRes = await fetch('/api/certifications');
                const certData = await certRes.json();
                if (certData.success) {
                    setCertifications(certData.data);
                }

                // Check admin status
                const statusRes = await fetch('/api/auth/status');
                const statusData = await statusRes.json();
                setIsAdmin(statusData.authenticated);
            } catch (err) {
                console.error("Error loading education & certifications:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDeleteEdu = async (id, e) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this timeline entry?")) return;
        try {
            const res = await fetch(`/api/education/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setTimelineItems(timelineItems.filter(item => item._id !== id));
            } else {
                alert(data.message || "Failed to delete entry");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteCert = async (id, e) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this certification/award?")) return;
        try {
            const res = await fetch(`/api/certifications/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setCertifications(certifications.filter(item => item._id !== id));
            } else {
                alert(data.message || "Failed to delete item");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditRedirect = (id, tab, e) => {
        e.stopPropagation();
        router.push(`/admin?tab=${tab}&edit=${id}`);
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 60,
                damping: 15
            }
        }
    };

    const timelineItemVariants = {
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
        <div className="w-full bg-zinc-950/20 py-10 relative">
            {/* Header */}
            <div className='py-20 bg-zinc-950/60 w-full border-y border-zinc-900'>
                <div className='w-9/12 mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6'>
                    <div>
                        <h1 className="text-4xl md:text-6xl lg:text-[80px] font-bold text-[#B3B3B3] tracking-tight">
                            Education & Experience
                        </h1>
                        <p className='text-[#B4B4B4] mt-10 ml-5 md:ml-10 text-[20px] max-w-2xl font-light leading-relaxed'>
                            Established history of success in design and development, consistently delivering valuable insights and driving significant results.
                        </p>
                    </div>

                    {isAdmin && (
                        <div className="flex gap-3">
                            <Link
                                href="/admin?tab=education"
                                className="flex items-center gap-2 bg-[#C4F000] text-black font-bold px-5 py-2.5 rounded-full hover:bg-[#b8dd00] transition-all text-xs shadow-md shadow-[#C4F000]/10"
                            >
                                <FaPlus /> Add Experience
                            </Link>
                            <Link
                                href="/admin?tab=certifications"
                                className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-white font-bold px-5 py-2.5 rounded-full hover:bg-zinc-850 transition-all text-xs"
                            >
                                <FaPlus /> Add Credential
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Timeline Section */}
            <div className="bg-transparent text-white mt-16 pb-20 px-6 md:px-12 lg:px-20 border-b border-zinc-900/60">
                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-10 h-10 border-4 border-[#C4F000] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 mt-4">Loading timeline...</p>
                        </div>
                    ) : timelineItems.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl text-gray-500">
                            <p className="text-lg">No education or experience timeline items found.</p>
                        </div>
                    ) : (
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="relative border-l border-zinc-850 pl-8 md:pl-12 space-y-16"
                        >
                            <AnimatePresence mode="popLayout">
                                {timelineItems.map((item) => (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        variants={timelineItemVariants}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        className="relative group"
                                    >
                                        <motion.div 
                                            variants={dotVariants}
                                            className="absolute -left-[41px] md:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-[#D4FF00] z-10 transition-colors duration-300 group-hover:bg-[#D4FF00]"
                                        />

                                        <div className="flex items-center gap-4 flex-wrap justify-between">
                                            <div className="flex items-center gap-4 flex-wrap">
                                                <span className="relative border border-[#D4FF00] text-[#D4FF00] px-5 py-1 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap
                                                before:content-[''] before:absolute before:top-1/2 before:-left-6 before:w-4 before:h-px before:bg-[#D4FF00]/50 before:-translate-y-1/2">
                                                    {item.year}
                                                </span>

                                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#D4FF00] transition-colors duration-300">
                                                    {item.company}
                                                </h3>
                                            </div>

                                            {isAdmin && (
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <button
                                                        onClick={(e) => handleEditRedirect(item._id, 'education', e)}
                                                        className="p-2 bg-blue-955/40 border border-blue-500/30 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg transition-all"
                                                    >
                                                        <FaEdit className="text-sm" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleDeleteEdu(item._id, e)}
                                                        className="p-2 bg-red-955/40 border border-red-500/30 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-all"
                                                    >
                                                        <FaTrash className="text-sm" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-[#D4FF00] mt-2 font-medium text-sm">@ {item.role}</p>

                                        <p className="mt-5 text-gray-400 leading-relaxed text-[16px] max-w-2xl font-light">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Certifications & Awards Section (New Necessary Section) */}
            <div className="mt-20 px-6 md:px-12 lg:px-20 pb-20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-white mb-10 tracking-tight flex items-center gap-3">
                        Certifications & Awards
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="w-8 h-8 border-4 border-[#C4F000] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : certifications.length === 0 ? (
                        <p className="text-gray-500 text-center py-10 font-light border border-dashed border-zinc-800 rounded-2xl">No certifications or awards listed.</p>
                    ) : (
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {certifications.map((cert) => (
                                    <motion.div
                                        key={cert._id}
                                        layout
                                        variants={itemVariants}
                                        whileHover={{ y: -6, borderColor: "rgba(196, 240, 0, 0.3)", backgroundColor: "rgba(255, 255, 255, 0.01)" }}
                                        className="bg-zinc-950/80 border border-zinc-850 p-6 rounded-2xl flex flex-col justify-between group transition-all duration-300 relative"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl inline-block group-hover:border-[#D4FF00]/30 transition-colors">
                                                    {cert.type === 'award' ? (
                                                        <FaAward className="text-xl text-[#C4F000]" />
                                                    ) : (
                                                        <FaCertificate className="text-xl text-indigo-400" />
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-500 font-semibold">{cert.year}</span>
                                            </div>

                                            <h3 className="text-lg font-bold text-white mt-4 group-hover:text-[#C4F000] transition-colors">{cert.title}</h3>
                                            <p className="text-xs font-semibold text-gray-400 mt-1">{cert.issuer}</p>
                                            
                                            {cert.description && (
                                                <p className="text-xs text-gray-500 mt-3 font-light leading-relaxed">{cert.description}</p>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center mt-5 pt-4 border-t border-zinc-900/60">
                                            {cert.link ? (
                                                <a 
                                                    href={cert.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white font-medium transition-colors"
                                                >
                                                    Verify Credential <FaExternalLinkAlt className="text-[10px]" />
                                                </a>
                                            ) : (
                                                <span className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">{cert.type}</span>
                                            )}

                                            {isAdmin && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => handleEditRedirect(cert._id, 'certifications', e)}
                                                        className="p-2 bg-zinc-900 hover:bg-blue-600 hover:text-white text-gray-400 border border-zinc-800 rounded-lg transition-all"
                                                        title="Edit"
                                                    >
                                                        <FaEdit className="text-xs" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleDeleteCert(cert._id, e)}
                                                        className="p-2 bg-zinc-900 hover:bg-red-650 hover:text-white text-gray-400 border border-zinc-800 rounded-lg transition-all"
                                                        title="Delete"
                                                    >
                                                        <FaTrash className="text-xs" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Education;