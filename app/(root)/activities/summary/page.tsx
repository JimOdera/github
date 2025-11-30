'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import {
    calendar,
    flag,
    folder,
    message_circle_more,
} from '@/public';
import {
    ArrowRight,
    ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import EnvironmentalTracker from './components/EnvironmentalTracker';
import SocialImpactSection from './components/SocialImpactSection';
import StakeholderEngagement from './components/StakeholderEngagement';
import MaterialTopicsSection from './components/MaterialTopicsSection';
import HumanRights from './components/HumanRights';
import ESCompliance from './components/ESCompliance';
import CustomMetricTracker from './components/CustomMetricTracker';
import ProcurementSpendDiversity from './components/ProcurementSpendDiversity';

const Summary = () => {
    // **PERSISTENT SIDEBAR STATE**
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sidebarCollapsed');
            return saved ? (JSON.parse(saved) as boolean) : true;
        }
        return true;
    });

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';

    const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'}`;


    return (
        <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">

            {/* **MAIN CONTENT AREA** */}
            <div className="flex-1 flex flex-col relative z-10">
                <Header />

                {/* **MAIN CONTAINER WITH HERO** */}
                <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">

                    {/* **HERO BANNER** */}
                    <section className={`absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20 transition-all duration-300 ease-in-out`}>
                        <Image src="/images/projects/summary.png" alt="Summary Banner" fill />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
                            <div className={`flex flex-col items-start ${contentMarginLeft} ${sectionTextContainerClass}`}>
                                <Image src={folder} alt="folder Icon" className="block md:hidden w-4 h-4 mb-2 cursor-pointer" />
                                <h2 className="text-lg md:text-3xl font-medium text-teal-900">
                                    Sustainability Portfolio
                                </h2>
                                <span className="text-xs text-teal-700">
                                    Reporting Period: July, 2024-June 2025
                                </span>
                                <Link href='/activities/summary/scorecard' className='bg-[#DEEDD7] text-xs text-[#044D5E] border border-[#B6D695] px-5 py-2 rounded-lg'>View Scorecard</Link>
                            </div>
                        </div>
                    </section>

                    {/* SIDEBAR */}
                    <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

                    {/* **MAIN CONTENT** */}
                    <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
                        <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8">

                            {/* Important Actions */}
                            <div className='flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6'>
                                <h1 className='text-lg font-semibold'>Important Actions (4)</h1>
                                <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                                    <div className='w-full md:w-fit flex items-center justify-between space-x-8 bg-white px-5 py-2'>
                                        <Image src={flag} alt="Flag Icon" className="w-4 h-4 mb-2" />
                                        <div className='flex flex-col gap-1'>
                                            <h2 className="text-sm text-teal-900">Update Activity #0243</h2>
                                            <span className="text-xs text-teal-700">2 days ago</span>
                                        </div>
                                        <ChevronRight />
                                    </div>
                                    <div className='w-full md:w-fit flex items-center justify-between space-x-8 bg-white px-5 py-2'>
                                        <Image src={calendar} alt="Calendar Icon" className="w-4 h-4 mb-2" />
                                        <div className='flex flex-col gap-1'>
                                            <h2 className="text-sm text-teal-900">File Annual Report</h2>
                                            <span className="text-xs text-teal-700">due in 15 days</span>
                                        </div>
                                        <ChevronRight />
                                    </div>
                                    <button className='bg-white border-1 border-[#044D5E]/20 px-5 py-2 rounded-md flex items-center gap-2 text-xs'>View all <ArrowRight size={16} /></button>
                                </div>
                            </div>

                            <hr className="border-t border-gray-200 my-6" />

                            {/* **ENVIRONMENTAL TRACKER TABLE** */}
                            <EnvironmentalTracker />

                            <hr className="border-t border-gray-200 my-6" />

                            {/* **SOCIAL IMPACT TABLE** */}
                            <SocialImpactSection />

                            <hr className="border-t border-gray-200 my-6" />

                            {/* **StakeholderEngagement TABLE** */}
                            <StakeholderEngagement />

                            {/* **MaterialTopicsSection TABLE** */}
                            <MaterialTopicsSection />

                            <HumanRights />

                            <ESCompliance />

                            <CustomMetricTracker />

                            <ProcurementSpendDiversity />

                        </div>
                    </main>
                </div>
            </div>

            {/* Floating Help Button */}
            <div className="fixed bottom-5 right-5 flex flex-col items-center">
                <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
                    need help?
                    <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></span>
                </div>
                <button className="bg-white shadow-md border border-gray-200 rounded-full p-3 flex items-center justify-center cursor-pointer transition-all duration-300">
                    <Image src={message_circle_more} alt="Help" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Summary;