'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full bg-zinc-800/50 border border-zinc-700/50 ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`relative p-2 rounded-full border transition-all duration-300 cursor-pointer shadow-md focus:outline-none ${
        isDark
          ? 'bg-zinc-900/80 border-zinc-700/80 text-yellow-400 hover:bg-zinc-800 hover:border-yellow-400/50 shadow-yellow-500/10'
          : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400 shadow-slate-900/5'
      } ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center text-xl"
      >
        {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5 text-indigo-600" />}
      </motion.div>
    </motion.button>
  );
}
