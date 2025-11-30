'use client';

import Header from '@/app/components/Header'
import { folder, leaf, mappin, message_circle_more, star, tick } from '@/public'
import Image from 'next/image'
import React from 'react'

const Activities = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col md:space-y-6">
            {/* Top Navigation */}
            <Header />

            <main className='w-full md:w-[90vw] mx-auto space-y-6 bg-[#FBFDFB] rounded-lg overflow-hidden pt-16'>
                {/* <main className='w-full md:w-[90vw] mx-auto space-y-6 bg-[#F3F4F9] rounded-lg overflow-hidden'> */}
                <section className="relative w-full h-52 md:h-64 bg-cover bg-center"> {/* Increased height slightly for better visibility; removed overflow-hidden from here to allow bleed if needed */}
                    <Image
                        src="/images/activities/section2.png"
                        alt="Activities Banner"
                        fill // Updated from layout="fill" (deprecated); ensures responsive cover
                        className="object-cover opacity-70" // Changed objectFit to className for modern Next.js
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#B1CA69]/10 via-transparent to-[#FBFDFB]/80 flex items-end p-6"> {/* Changed gradient to vertical (to-b) for seamless blend into the main bg-[#F3F4F9]; increased bottom opacity for smoother transition */}
                        <div className="ml-4 text-white">
                            <div className='flex space-x-2 mb-2 md:mb-8'>
                                <Image src={folder} alt="folder Icon" className="w-4 h-4 mb-2" />
                                <Image src={star} alt="Star Icon" className="w-4 h-4 mb-2" />
                            </div>
                            <span className="text-xs text-teal-700">Activities / #3458C</span>
                            <h2 className="text-lg md:text-3xl font-bold text-teal-900">Waste Management Campaign</h2>
                        </div>
                    </div>
                </section>

                {/* Merged seamlessly: widened to match main (remove md:w-[80vw]), reduced py (py-4/md:py-6), added pt-0 to hug the banner, space-y-8 for internal breathing */}
                <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8 bg-transparent flex-grow"> {/* bg-transparent to inherit main's [#F3F4F9]; flex-grow to fill space */}

                    <div className='flex flex-col space-y-2 bg-[#F3F4F9] px-4 py-4 md:px-16 md:py-6'>
                        <div className='flex items-center gap-2'>
                            <h2 className="text-lg font-semibold text-gray-800">Waste Management Campaign</h2>
                            <Image src={tick} alt="Tick Icon" className="w-4 h-4 inline-block" />
                        </div>
                        <hr className="border-t border-gray-200" />
                        <div className='flex flex-col justify-between md:flex-row items-start md:items-center justify-between gap-4 p-4'>

                            <div className='flex items-center gap-1'>
                                <Image src={mappin} alt="Map Pin Icon" className="w-4 h-4 inline-block" />
                                <div className="text-xs text-gray-600 ml-1">Location: <span>Kiambu</span></div>
                            </div>

                            <div className='flex items-center gap-1'>
                                <Image src={leaf} alt="Leaf Icon" className="w-4 h-4 inline-block" />
                                <div className="text-xs text-gray-600 ml-1">Emission target: <span>899 tCO₂e/year</span></div>
                            </div>

                            <p className='text-xs'>Stakeholders</p>
                            <p className='text-xs'>Investors</p>
                            <p className='text-xs'>Government</p>
                            <p className='text-xs'>Local Community</p>

                        </div>
                    </div>

                    <div className='flex flex-col space-y-2 bg-[#F3F4F9] px-4 py-4 md:px-16 md:py-6'>
                        <div className='flex items-center gap-2'>
                            <h2 className="text-lg font-semibold text-gray-800">Waste Management Campaign</h2>
                            <Image src={tick} alt="Tick Icon" className="w-4 h-4 inline-block" />
                        </div>
                        <hr className="border-t border-gray-200" />
                        <div className='flex flex-col justify-between md:flex-row items-start md:items-center justify-between gap-4 p-4'>

                            <div className='flex items-center gap-1'>
                                <Image src={mappin} alt="Map Pin Icon" className="w-4 h-4 inline-block" />
                                <div className="text-xs text-gray-600 ml-1">Location: <span>Kiambu</span></div>
                            </div>

                            <div className='flex items-center gap-1'>
                                <Image src={leaf} alt="Leaf Icon" className="w-4 h-4 inline-block" />
                                <div className="text-xs text-gray-600 ml-1">Emission target: <span>899 tCO₂e/year</span></div>
                            </div>

                            <p className='text-xs'>Stakeholders</p>
                            <p className='text-xs'>Investors</p>
                            <p className='text-xs'>Government</p>
                            <p className='text-xs'>Local Community</p>

                        </div>
                    </div>

                </div>

            </main>

            {/* Floating Help Button */}
            <div className="fixed bottom-5 right-5 flex flex-col items-center">
                {/* Chat bubble text above */}
                <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer ">
                    need help?
                    <span
                        className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"
                        aria-hidden="true"
                    ></span>
                </div>

                {/* Icon circle button */}
                <button className="bg-white shadow-md border border-gray-200 rounded-full p-3 flex items-center justify-center
        cursor-pointer transition-all duration-300">
                    <Image src={message_circle_more} alt="Help" className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default Activities