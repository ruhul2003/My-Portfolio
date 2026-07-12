"use client";

import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        setStatus('sending');
        // Simulate sending message (or you can connect to an API endpoint if needed)
        setTimeout(() => {
            setStatus('success');
            setName('');
            setEmail('');
            setMessage('');
            setTimeout(() => setStatus(''), 5000);
        }, 1200);
    };

    return (
        <div>
            <div className="w-9/12 mb-10 mx-auto ">
                <div className='py-25 w-full'>
                    <div className='w-full mx-auto'>
                        <h1 className="text-4xl md:text-6xl lg:text-[80px] font-bold text-[#B3B3B3]">
                            Say Hello !
                        </h1>
                        <p className='text-[#B4B4B4] mt-10 ml-5 md:ml-10 text-[20px]'>
                            Fill out the form below to get in touch with me. I'm always excited to hear about new opportunities and I'll do my best to respond to your inquiry within 24 hours.
                        </p>

                        <form onSubmit={handleSubmit} className="max-w-4xl mt-20 mx-auto space-y-10">
                            {/* Status message */}
                            {status === 'success' && (
                                <div className="bg-lime-400/10 border border-lime-400 text-lime-400 p-4 rounded-2xl text-center font-medium">
                                    Message sent successfully! I will get back to you shortly. ✨
                                </div>
                            )}

                            {/* Name & Email Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-3">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Steve Milner"
                                        required
                                        className="w-full bg-white text-black px-6 py-4 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    />
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-3">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="hello@websitename.com"
                                        required
                                        className="w-full bg-white text-black px-6 py-4 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    />
                                </div>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-3">Your Message</label>
                                <textarea
                                    rows={6}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write Your message"
                                    required
                                    className="w-full bg-white text-black px-6 py-5 rounded-3xl text-lg focus:outline-none focus:ring-2 focus:ring-lime-400 resize-none"
                                />
                            </div>

                            {/* Send Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-black font-semibold text-lg px-10 py-4 rounded-full flex items-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'sending' ? 'Sending...' : 'Send Me Message'}
                                    <span className="text-xl">✉️</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;