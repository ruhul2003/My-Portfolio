"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaAward, FaCertificate, FaExternalLinkAlt, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
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
        if (!confirm("Are you sure you want to delete this entry?")) return;
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
        if (!confirm("Are you sure you want to delete this certification?")) return;
        try {
            const res = await fetch(`/api/certifications/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setCertifications(certifications.filter(cert => cert._id !== id));
            } else {
                alert(data.message || "Failed to delete certification");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditRedirect = (id, tab, e) => {
        e.stopPropagation();
        router.push(`/admin?tab=${tab}&edit=${id}`);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
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

    return (
        <div className="w-full bg-slate-50 dark:bg-[#020617] py-10 relative transition-colors duration-300">
            {/* Ambient Background decoration */}
            <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-[#65a30d]/5 dark:bg-[#C4F000]/3 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/3 rounded-full blur-[140px] pointer-events-none"></div>

            {/* Header */}
            <div className='py-20 bg-white/80 dark:bg-zinc-950/40 w-full border-y border-slate-200 dark:border-zinc-900/80 backdrop-blur-sm'>
                <div className='w-9/12 mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6'>
                    <div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-[#B3B3B3] tracking-tight">
                            Education & Experience
                        </h1>
                        <p className='text-slate-700 dark:text-[#B4B4B4] mt-5 text-base md:text-lg max-w-2xl font-light leading-relaxed'>
                            Established history of success in design and development, consistently delivering valuable insights and driving significant results.
                        </p>
                    </div>

                    {isAdmin && (
                        <div className="flex gap-3 relative z-20">
                            <Link
                                href="/admin?tab=education"
                                className="flex items-center gap-2 bg-[#65a30d] dark:bg-[#C4F000] text-white dark:text-black font-bold px-5 py-2.5 rounded-full hover:bg-[#52840a] dark:hover:bg-[#b8dd00] transition-all text-xs shadow-md shadow-[#65a30d]/10"
                            >
                                <FaPlus /> Add Experience
                            </Link>
                            <Link
                                href="/admin?tab=certifications"
                                className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 text-slate-900 dark:text-white font-bold px-5 py-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-850 transition-all text-xs"
                            >
                                <FaPlus /> Add Credential
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* main Cards Grid Section */}
            <div className="bg-transparent text-slate-900 dark:text-white mt-20 pb-20 px-6 md:px-12 lg:px-20 border-b border-slate-200 dark:border-zinc-900/60">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                        Experience & Timeline
                    </h2>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-10 h-10 border-4 border-[#65a30d] dark:border-[#C4F000] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-slate-600 dark:text-gray-400 mt-4 text-sm font-light">Loading timeline...</p>
                        </div>
                    ) : timelineItems.length === 0 ? (
                        <p className="text-slate-500 dark:text-gray-500 text-center py-10 font-light border border-dashed border-slate-300 dark:border-zinc-800 rounded-2xl">No education or work history added yet.</p>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {timelineItems.map((item) => {
                                    const isEducation = item.type === 'education';
                                    return (
                                        <motion.div
                                            key={item._id}
                                            layout
                                            variants={cardVariants}
                                            whileHover={{ y: -6 }}
                                            className="bg-white/90 dark:bg-zinc-900/10 hover:bg-white dark:hover:bg-zinc-900/30 backdrop-blur-sm border border-slate-200 dark:border-[#C4F000]/20 hover:border-[#65a30d]/40 dark:hover:border-[#C4F000]/40 p-6 sm:p-8 rounded-3xl flex flex-col justify-between group transition-all duration-300 relative shadow-sm"
                                        >
                                            <div>
                                                <div className="flex justify-between items-center">
                                                    <span className="bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-[#65a30d] dark:text-[#D4FF00] px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase">
                                                        {item.year}
                                                    </span>

                                                    {/* Work or School Icon Indicator */}
                                                    <div className="p-2 bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl">
                                                        {isEducation ? (
                                                            <FaGraduationCap className="text-sm text-indigo-600 dark:text-indigo-400" />
                                                        ) : (
                                                            <FaBriefcase className="text-sm text-[#65a30d] dark:text-[#C4F000]" />
                                                        )}
                                                    </div>
                                                </div>

                                                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mt-4 group-hover:text-[#65a30d] dark:group-hover:text-[#D4FF00] transition-colors duration-300">
                                                    {item.company}
                                                </h3>

                                                <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 mt-1">
                                                    {item.role}
                                                </p>

                                                <p className="mt-3.5 text-slate-700 dark:text-gray-400 leading-relaxed text-xs font-light">
                                                    {item.description}
                                                </p>
                                            </div>

                                            {/* Admin Controls */}
                                            {isAdmin && (
                                                <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-200 dark:border-zinc-900/60">
                                                    <button
                                                        onClick={(e) => handleEditRedirect(item._id, 'education', e)}
                                                        className="p-2.5 bg-slate-100 dark:bg-zinc-950 hover:bg-blue-600 text-slate-600 dark:text-gray-500 hover:text-white border border-slate-300 dark:border-zinc-850 rounded-xl transition-all"
                                                        title="Edit"
                                                    >
                                                        <FaEdit className="text-xs" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleDeleteEdu(item._id, e)}
                                                        className="p-2.5 bg-slate-100 dark:bg-zinc-950 hover:bg-red-600 text-slate-600 dark:text-gray-500 hover:text-white border border-slate-300 dark:border-zinc-850 rounded-xl transition-all"
                                                        title="Delete"
                                                    >
                                                        <FaTrash className="text-xs" />
                                                    </button>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Certifications & Awards Section */}
            <div className="mt-20 px-6 md:px-12 lg:px-20 pb-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight flex items-center gap-3">
                        Certifications & Awards
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="w-8 h-8 border-4 border-[#65a30d] dark:border-[#C4F000] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : certifications.length === 0 ? (
                        <p className="text-slate-500 dark:text-gray-500 text-center py-10 font-light border border-dashed border-slate-300 dark:border-zinc-800 rounded-2xl">No certifications or awards listed.</p>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {certifications.map((cert) => (
                                    <motion.div
                                        key={cert._id}
                                        layout
                                        variants={cardVariants}
                                        whileHover={{ y: -6 }}
                                        className="bg-white/90 dark:bg-zinc-900/10 hover:bg-white dark:hover:bg-zinc-900/30 backdrop-blur-sm border border-slate-200 dark:border-[#C4F000]/20 hover:border-[#65a30d]/40 dark:hover:border-[#C4F000]/40 p-6 sm:p-8 rounded-3xl flex flex-col justify-between group transition-all duration-300 relative shadow-sm"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <div className="p-3 bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-2xl inline-block group-hover:border-[#65a30d]/30 dark:group-hover:border-[#D4FF00]/30 transition-colors">
                                                    {cert.type === 'award' ? (
                                                        <FaAward className="text-xl text-[#65a30d] dark:text-[#C4F000]" />
                                                    ) : (
                                                        <FaCertificate className="text-xl text-indigo-600 dark:text-indigo-400" />
                                                    )}
                                                </div>
                                                <span className="text-xs text-slate-500 dark:text-gray-500 font-semibold">{cert.year}</span>
                                            </div>

                                            <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mt-4 group-hover:text-[#65a30d] dark:group-hover:text-[#D4FF00] transition-colors duration-300">
                                                {cert.title}
                                            </h3>

                                            <p className="text-xs font-medium text-slate-600 dark:text-gray-400 mt-1">
                                                Issued by <span className="font-semibold text-slate-900 dark:text-gray-300">{cert.issuer}</span>
                                            </p>

                                            {cert.credentialUrl && (
                                                <a
                                                    href={cert.credentialUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-xs text-[#65a30d] dark:text-[#C4F000] hover:underline mt-4 font-semibold"
                                                >
                                                    Verify Credential <FaExternalLinkAlt className="text-[10px]" />
                                                </a>
                                            )}
                                        </div>

                                        {/* Admin Controls */}
                                        {isAdmin && (
                                            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-200 dark:border-zinc-900/60">
                                                <button
                                                    onClick={(e) => handleEditRedirect(cert._id, 'certifications', e)}
                                                    className="p-2.5 bg-slate-100 dark:bg-zinc-950 hover:bg-blue-600 text-slate-600 dark:text-gray-500 hover:text-white border border-slate-300 dark:border-zinc-850 rounded-xl transition-all"
                                                    title="Edit"
                                                >
                                                    <FaEdit className="text-xs" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDeleteCert(cert._id, e)}
                                                    className="p-2.5 bg-slate-100 dark:bg-zinc-950 hover:bg-red-600 text-slate-600 dark:text-gray-500 hover:text-white border border-slate-300 dark:border-zinc-850 rounded-xl transition-all"
                                                    title="Delete"
                                                >
                                                    <FaTrash className="text-xs" />
                                                </button>
                                            </div>
                                        )}
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