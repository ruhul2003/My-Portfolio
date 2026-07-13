"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaCalendarCheck, FaPaperPlane, FaLinkedin, FaGithub, FaTwitter, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            return;
        }

        setStatus('sending');
        // Simulate sending message
        setTimeout(() => {
            setStatus('success');
            setName('');
            setEmail('');
            setMessage('');
            setTimeout(() => setStatus(''), 6000);
        }, 1500);
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('ruhul941020@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    // Stagger containers
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
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
        <section className="min-h-screen w-full bg-[#0a0a0a] py-20 relative overflow-hidden">
            {/* Ambient Background glows */}
            <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#C4F000]/3 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-500/3 rounded-full blur-[100px] pointer-events-none translate-x-1/2 translate-y-1/2"></div>

            <div className="w-10/12 sm:w-9/12 max-w-7xl mx-auto relative z-10">
                {/* Intro / Header */}
                <div className="mb-16 md:mb-20">
                    <span className="text-[#C4F000] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase block mb-3">
                        GET IN TOUCH
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-[75px] font-extrabold text-[#B3B3B3] tracking-tight leading-none">
                        Say Hello !
                    </h1>
                    <p className="text-gray-400 mt-6 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
                        Have a project in mind, an opportunity to discuss, or just want to say hi? Fill out the form or reach out directly—I'd love to connect with you.
                    </p>
                </div>

                {/* Grid Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left Column: Contact details & Info */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="lg:col-span-5 space-y-8"
                    >
                        {/* Info cards */}
                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ y: -4, borderColor: "rgba(196, 240, 0, 0.25)" }}
                            className="bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/40 p-6 rounded-2xl flex items-start gap-5 transition-all duration-300 group animate-none"
                        >
                            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[#C4F000] text-xl group-hover:bg-[#C4F000] group-hover:text-black transition-all duration-300">
                                <FaEnvelope />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Me Directly</h4>
                                <a 
                                    href="mailto:ruhul941020@gmail.com" 
                                    className="text-white hover:text-[#C4F000] transition-colors font-medium break-words block text-sm sm:text-base"
                                >
                                    ruhul941020@gmail.com
                                </a>
                                <button 
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className="text-xs text-gray-400 hover:text-[#C4F000] mt-2 flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                    {copied ? 'Copied to clipboard!' : 'Copy to clipboard'}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ y: -4, borderColor: "rgba(196, 240, 0, 0.25)" }}
                            className="bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/40 p-6 rounded-2xl flex items-start gap-5 transition-all duration-300 group"
                        >
                            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[#C4F000] text-xl group-hover:bg-[#C4F000] group-hover:text-black transition-all duration-300">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</h4>
                                <p className="text-white font-medium text-sm sm:text-base">
                                    Dhaka, Bangladesh
                                </p>
                                <span className="text-xs text-gray-400 block mt-1">Open to remote & hybrid roles globally</span>
                            </div>
                        </motion.div>

                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ y: -4, borderColor: "rgba(196, 240, 0, 0.25)" }}
                            className="bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/40 p-6 rounded-2xl flex items-start gap-5 transition-all duration-300 group"
                        >
                            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[#C4F000] text-xl group-hover:bg-[#C4F000] group-hover:text-black transition-all duration-300">
                                <FaCalendarCheck />
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Availability</h4>
                                <p className="text-white font-medium text-sm sm:text-base">
                                    Freelance, Contract & Full-time
                                </p>
                                <span className="text-[#C4F000] text-xs font-semibold px-2 py-0.5 rounded-full bg-[#C4F000]/10 border border-[#C4F000]/20 mt-2 inline-block">
                                    Available Now
                                </span>
                            </div>
                        </motion.div>

                        {/* Social profiles connect */}
                        <motion.div variants={itemVariants} className="pt-4 space-y-4">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] block">
                                CONNECT WITH ME
                            </span>
                            <div className="flex gap-4">
                                <a 
                                    href="https://github.com/ruhul2003" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-12 h-12 rounded-full bg-zinc-900/40 border border-zinc-800/60 hover:bg-[#C4F000] hover:text-black hover:border-[#C4F000] flex items-center justify-center transition-all duration-300 text-lg cursor-pointer"
                                    title="GitHub"
                                >
                                    <FaGithub />
                                </a>
                                <a 
                                    href="#" 
                                    className="w-12 h-12 rounded-full bg-zinc-900/40 border border-zinc-800/60 hover:bg-[#C4F000] hover:text-black hover:border-[#C4F000] flex items-center justify-center transition-all duration-300 text-lg cursor-pointer"
                                    title="LinkedIn"
                                >
                                    <FaLinkedin />
                                </a>
                                <a 
                                    href="#" 
                                    className="w-12 h-12 rounded-full bg-zinc-900/40 border border-zinc-800/60 hover:bg-[#C4F000] hover:text-black hover:border-[#C4F000] flex items-center justify-center transition-all duration-300 text-lg cursor-pointer"
                                    title="Twitter"
                                >
                                    <FaTwitter />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Redesigned interactive form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ type: "spring", stiffness: 60, damping: 15 }}
                        className="lg:col-span-7 bg-zinc-900/10 backdrop-blur-sm border border-zinc-900/80 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl hover:border-zinc-800/40 transition-all duration-500"
                    >
                        {/* Soft ambient glow in card */}
                        <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-[#C4F000]/5 rounded-full blur-[80px] pointer-events-none"></div>

                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 relative z-10">
                            
                            {/* Status Messages */}
                            <AnimatePresence mode="wait">
                                {status === 'success' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-lime-400/10 border border-lime-400/30 text-lime-400 p-5 rounded-2xl flex items-center gap-3 font-medium text-sm sm:text-base"
                                    >
                                        <FaCheckCircle className="text-xl shrink-0" />
                                        <span>Message sent successfully! I will respond within 24 hours. ✨</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Full Name & Email Input Group */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Steve Milner"
                                        required
                                        className="w-full bg-zinc-950/60 border border-zinc-800/80 text-white placeholder-zinc-650 px-5 py-4 rounded-xl focus:outline-none focus:border-[#C4F000] focus:ring-1 focus:ring-[#C4F000] transition-all duration-300 text-sm sm:text-base"
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="steve@example.com"
                                        required
                                        className="w-full bg-zinc-950/60 border border-zinc-800/80 text-white placeholder-zinc-650 px-5 py-4 rounded-xl focus:outline-none focus:border-[#C4F000] focus:ring-1 focus:ring-[#C4F000] transition-all duration-300 text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Your Message</label>
                                <textarea
                                    rows={6}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Tell me about your project, idea, or request..."
                                    required
                                    className="w-full bg-zinc-950/60 border border-zinc-800/80 text-white placeholder-zinc-650 px-5 py-4 rounded-2xl focus:outline-none focus:border-[#C4F000] focus:ring-1 focus:ring-[#C4F000] transition-all duration-300 min-h-[160px] resize-none text-sm sm:text-base"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full sm:w-auto bg-[#C4F000] hover:bg-[#b8dd00] active:scale-98 text-black font-bold text-sm sm:text-base px-8 py-4 rounded-full flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#C4F000]/10 cursor-pointer"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <FaSpinner className="animate-spin text-lg" />
                                            <span>Sending message...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="text-sm" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;