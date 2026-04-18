import React from 'react';
import { TbBrandAirtable } from "react-icons/tb";
import { SiCssdesignawards } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";



const Services = () => {
    return (
        <div className="min-h-screen w-9/12 mx-auto ">
            <div className='py-25 w-full'>
                <div className='w-full mx-auto'>
                    <h1 className="text-4xl md:text-6xl lg:text-[80px] font-bold text-[#B3B3B3]">
                        Services
                    </h1>
                    <p className='text-[#B4B4B4] mt-10 ml-10 text-[20px]'>
                        My Services Pave the Way for Exceptional Experiences, Where Quality and Commitment Define Every Interaction.
                    </p>
                </div>
            </div>

            {/* cards */}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

                <div className='w-[400px] bg-zinc-950 mx-auto px-7 py-8 rounded-lg border border-transparent hover:border-[#D4FF00] transition-all duration-300'>
                    <TbBrandAirtable className='w-[55px] h-[55px] text-[#D4FF00]' />
                    <h2 className='text-[22px] mt-5 text-white'>Brand Identity Design</h2>
                    <p className='text-[16px] mt-5 text-[#B4B4B4]'>
                        bionik gives you the blocks & kits you need to create a true website within minutes.
                    </p>
                </div>

                <div className='w-[400px] bg-zinc-950 mx-auto px-7 py-8 rounded-lg border border-transparent hover:border-[#D4FF00] transition-all duration-300'>
                    <SiCssdesignawards className='w-[55px] h-[55px] text-[#D4FF00]' />
                    <h2 className='text-[22px] mt-5 text-white'>Website Design</h2>
                    <p className='text-[16px] mt-5 text-[#B4B4B4]'>
                        bionik gives you the blocks & kits you need to create a true website within minutes.
                    </p>
                </div>

                <div className='w-[400px] bg-zinc-950 mx-auto px-7 py-8 rounded-lg border border-transparent hover:border-[#D4FF00] transition-all duration-300'>
                    <FaDatabase className='w-[55px] h-[55px] text-[#D4FF00]' />
                    <h2 className='text-[22px] mt-5 text-white'>Database Management</h2>
                    <p className='text-[16px] mt-5 text-[#B4B4B4]'>
                        bionik gives you the blocks & kits you need to create a true website within minutes.
                    </p>
                </div>

            </div>

        </div>
    );
};

export default Services;