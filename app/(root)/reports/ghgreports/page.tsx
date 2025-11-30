'use client';

import Header from '@/app/components/Header';
import { folder, message_circle_more } from '@/public';
import { Plus } from 'lucide-react';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';

const GHGReports = () => {




    return (
        <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
            <div className="flex-1 flex flex-col relative z-10">
                <Header />

                <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
                    <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20">
                        <Image src="/images/projects/summary.png" alt="Summary Banner" fill />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
                            <div className={`flex flex-col items-start`}>
                                <Image src={folder} alt="folder Icon" className="block md:hidden w-4 h-4 mb-2" />
                                <h2 className="text-lg md:text-3xl font-medium text-teal-900">
                                    My Reports
                                </h2>
                                <span className="text-xs text-teal-700">Date: 25th November 2025 - Report Format: PDF</span>
                                <Link
                                    href="/reports/forms"
                                    className="bg-[#E2FFF2] hover:bg-[#E2FFF2]/90 text-xs text-[#044D5E] border border-[#044D5E] px-5 py-2 rounded-md flex items-center gap-2"
                                >
                                    <Plus size={16} /> Download Report
                                </Link>
                            </div>
                        </div>
                    </section>

                    <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
                        <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8">

                            <div></div>

                        </div>
                    </main>
                </div>
            </div>

            {/* Help Button */}
            <div className="fixed bottom-5 right-5 flex flex-col items-center">
                <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
                    need help?
                    <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></span>
                </div>
                <button className="bg-white shadow-md border border-gray-200 bg-gray-200/50 p-3 rounded-full">
                    <Image src={message_circle_more} alt="Help" className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default GHGReports;