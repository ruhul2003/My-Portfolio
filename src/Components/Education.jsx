"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaPlusCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Education = () => {
    const [timelineItems, setTimelineItems] = useState([]);
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

                // Check admin status
                const statusRes = await fetch('/api/auth/status');
                const statusData = await statusRes.json();
                setIsAdmin(statusData.authenticated);
            } catch (err) {
                console.error("Error loading education:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this timeline entry?")) return;

        try {
            const res = await fetch(`/api/education/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setTimelineItems(timelineItems.filter(item => item._id !== id));
            } else {
                alert(data.message || "Failed to delete entry");
            }
        } catch (err) {
            console.error("Error deleting education entry:", err);
        }
    };

    const handleEditRedirect = (id, e) => {
        e.stopPropagation();
        router.push(`/admin?tab=education&edit=${id}`);
    };

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
                        <Link
                            href="/admin?tab=education"
                            className="flex items-center gap-2 bg-[#C4F000] text-black font-bold px-6 py-3 rounded-full hover:bg-[#b8dd00] transition-colors shadow-lg shadow-[#C4F000]/10 whitespace-nowrap self-start md:self-end"
                        >
                            <FaPlus /> Add Entry
                        </Link>
                    )}
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-transparent text-white mt-16 pb-20 px-6 md:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-10 h-10 border-4 border-[#C4F000] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 mt-4">Loading timeline...</p>
                        </div>
                    ) : timelineItems.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl text-gray-500">
                            <p className="text-lg">No education or experience timeline items found.</p>
                            {isAdmin && (
                                <Link
                                    href="/admin?tab=education"
                                    className="text-[#C4F000] hover:underline mt-2 inline-flex items-center gap-1 font-semibold"
                                >
                                    Add your first timeline item <FaPlusCircle className="text-xs" />
                                </Link>
                            )}
                        </div>
                    ) : (
                        /* Vertical Line and List */
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
                                        variants={itemVariants}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        className="relative group"
                                    >
                                        {/* Animate Connection Bullet Dot */}
                                        <motion.div 
                                            variants={dotVariants}
                                            className="absolute -left-[41px] md:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-[#D4FF00] z-10 transition-colors duration-300 group-hover:bg-[#D4FF00]"
                                        />

                                        <div className="flex items-center gap-4 flex-wrap justify-between">
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

                                            {/* Admin editing/deleting inline buttons */}
                                            {isAdmin && (
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <button
                                                        onClick={(e) => handleEditRedirect(item._id, e)}
                                                        className="p-2 bg-blue-950/40 border border-blue-500/30 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg transition-all"
                                                        title="Edit Entry"
                                                    >
                                                        <FaEdit className="text-sm" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleDelete(item._id, e)}
                                                        className="p-2 bg-red-950/40 border border-red-500/30 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-all"
                                                        title="Delete Entry"
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
        </div>
    );
};

export default Education;