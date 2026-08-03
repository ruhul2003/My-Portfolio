'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        const progress = (currentScroll / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      if (currentScroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Circle Progress calculations
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
            className="relative w-14 h-14 rounded-full flex items-center justify-center bg-zinc-900/90 dark:bg-zinc-900/90 light:bg-white backdrop-blur-md border border-zinc-800/80 dark:border-zinc-800/80 light:border-slate-300 text-[#C4F000] dark:text-[#C4F000] light:text-[#65a30d] shadow-xl hover:shadow-[#C4F000]/20 cursor-pointer group transition-colors"
          >
            {/* SVG Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 52 52">
              {/* Background ring track */}
              <circle
                cx="26"
                cy="26"
                r={radius}
                className="stroke-zinc-800/50 dark:stroke-zinc-800/60 light:stroke-slate-200"
                strokeWidth="3"
                fill="none"
              />
              {/* Progress ring fill */}
              <motion.circle
                cx="26"
                cy="26"
                r={radius}
                className="stroke-[#C4F000] dark:stroke-[#C4F000] light:stroke-[#65a30d]"
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>

            {/* Center Arrow Icon */}
            <HiArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
