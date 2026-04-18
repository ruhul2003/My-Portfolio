import React from 'react';

const Education = () => {
    return (
        <div>
            {/* Header */}
            <div className='py-25 bg-zinc-950 w-full'>
                <div className='w-9/12 mx-auto'>
                    <h1 className="text-4xl md:text-6xl lg:text-[80px] font-bold text-[#B3B3B3]">
                        Education & Experience
                    </h1>
                    <p className='text-[#B4B4B4] mt-10 ml-10 text-[20px]'>
                        Established history of success in design and development, consistently delivering valuable <br />
                        insights and driving significant results.
                    </p>
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-zinc-950 text-white mb-10 pb-20 px-6 md:px-12 lg:px-20">
                <div className="max-w-4xl mx-auto">

                    {/* Vertical Line */}
                    <div className="relative border-l border-white/10 pl-12 space-y-16">

                        {/* ITEM 1 */}
                        <div className="relative">
                            <div className="flex items-center gap-4 flex-wrap">

                                {/* Badge with connector */}
                                <span className="relative border border-[#D4FF00] text-[#D4FF00] px-5 py-1 rounded-full text-sm whitespace-nowrap
                                before:content-[''] before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-px before:bg-[#D4FF00]/60 before:-translate-y-1/2">
                                    2020 - PRESENT
                                </span>

                                <h3 className="text-2xl md:text-3xl font-semibold">
                                    BloomHub Technology
                                </h3>
                            </div>

                            <p className="text-[#D4FF00] mt-2">@ Application Developer</p>

                            <p className="mt-5 text-gray-300 leading-relaxed text-[17px] max-w-2xl">
                                As a product designer at a leading e-commerce company, I was responsible for designing
                                user interfaces for the company's online shopping platform. I collaborated closely with
                                marketing and development teams to create designs that improved user experience and increased sales.
                            </p>
                        </div>

                        {/* ITEM 2 */}
                        <div className="relative">
                            <div className="flex items-center gap-4 flex-wrap">

                                <span className="relative border border-[#D4FF00] text-[#D4FF00] px-5 py-1 rounded-full text-sm whitespace-nowrap
                                before:content-[''] before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-px before:bg-[#D4FF00]/60 before:-translate-y-1/2">
                                    2018 - 2020
                                </span>

                                <h3 className="text-2xl md:text-3xl font-semibold">
                                    Skyward Company Limited
                                </h3>
                            </div>

                            <p className="text-[#D4FF00] mt-2">@ Products Designer</p>

                            <p className="mt-5 text-gray-300 leading-relaxed text-[17px] max-w-2xl">
                                Worked as a product designer in a startup environment, focusing on mobile app UI/UX.
                                Created wireframes, designed interfaces, and conducted user testing to ensure a smooth experience.
                            </p>
                        </div>

                        {/* ITEM 3 */}
                        <div className="relative">
                            <div className="flex items-center gap-4 flex-wrap">

                                <span className="relative border border-[#D4FF00] text-[#D4FF00] px-5 py-1 rounded-full text-sm whitespace-nowrap
                                before:content-[''] before:absolute before:top-1/2 before:-left-10 before:w-8 before:h-px before:bg-[#D4FF00]/60 before:-translate-y-1/2">
                                    2012 - 2018
                                </span>

                                <h3 className="text-2xl md:text-3xl font-semibold">
                                    Atlas Innovations
                                </h3>
                            </div>

                            <p className="text-[#D4FF00] mt-2">@ Senior Developer</p>

                            <p className="mt-5 text-gray-300 leading-relaxed text-[17px] max-w-2xl">
                                Worked with multiple clients across industries, building user interfaces and digital products.
                                Focused on adaptability, clean design, and delivering efficient solutions.
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Education;