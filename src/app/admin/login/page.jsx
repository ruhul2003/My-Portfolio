"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt, FaInfoCircle } from 'react-icons/fa';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Check if already authenticated on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/status');
                const data = await res.json();
                if (data.authenticated) {
                    router.push('/admin');
                }
            } catch (err) {
                // Ignore
            }
        };
        checkAuth();
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            
            if (data.success) {
                router.push('/admin');
                router.refresh();
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#020617]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
                {/* Neon Background glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#C4F000]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="text-center mb-8 relative z-10">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                        Admin <span className="text-[#C4F000]">Portal</span>
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Please sign in to manage your projects.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-950/30 border border-red-500/50 text-red-400 p-4 rounded-2xl text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300 block">Email Address</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                                <FaEnvelope />
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                                className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white pl-11 pr-4 py-3.5 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300 block">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                                <FaLock />
                            </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white pl-11 pr-4 py-3.5 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-[#C4F000]/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#C4F000] hover:bg-[#b8dd00] active:scale-98 text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#C4F000]/10 flex items-center justify-center gap-2 mt-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Sign In <FaSignInAlt />
                            </>
                        )}
                    </button>
                </form>

                {/* Helper credentials box */}
                <div className="mt-8 pt-6 border-t border-zinc-900 text-xs text-gray-500 flex items-start gap-2 relative z-10">
                    <FaInfoCircle className="mt-0.5 text-lime-400 shrink-0" />
                    <div>
                        <p className="font-semibold text-gray-400">Default Admin Credentials:</p>
                        <p className="mt-1">Email: <code className="text-lime-300 font-mono">ruhul941020@gmail.com</code></p>
                        <p>Password: <code className="text-lime-300 font-mono">ruhuls12</code></p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
