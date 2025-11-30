'use client';

import Header from '@/app/components/Header';
import { folder, star, calendar1, calendar2, message_circle_more } from '@/public';
import { ArrowLeft, BadgeCheck, Download, Heart, Leaf, Plus, Share2, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import FundingProgressChart from '@/app/components/FundingProgressChart';
import CarbonOffsetChart from '@/app/components/CarbonOffsetChart';
import type { ApexOptions } from 'apexcharts';

// Define types for chart series
interface ChartSeries {
    year: string;
    value: number;
}

// Year-to-color mapping for chart
const yearColorMap: { [key: string]: string } = {
    '2023': '#044D5E',
    '2024': '#28A9F1',
    '2025': '#1ECEC9',
};

// Chart series data for Funding Progress
const seriesWithYears: ChartSeries[] = [
    { year: '2023', value: 8 },
    { year: '2024', value: 17 },
    { year: '2025', value: 20 },
];

// Carbon Offset chart data
const carbonOffsetSeries: ApexOptions['series'] = [{
    name: 'Carbon Offset (tCO2e)',
    data: [500000, 620000, 740000] // Example data for 2023, 2024, 2025
}];

const carbonOffsetOptions: ApexOptions = {
    chart: {
        type: 'bar' as const,
        height: 350,
        toolbar: { show: false },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '30%',
            borderRadius: 8,
        },
    },
    dataLabels: { enabled: false },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
    },
    colors: ['#1ECEC9', '#28A9F1', '#044D5E'],
    xaxis: {
        categories: ['2023', '2024', '2025'],
        labels: {
            style: {
                colors: '#044D5E',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
            },
        },
    },
    yaxis: {
        title: {
            text: 'Carbon Offset (tCO2e)',
            style: {
                color: '#044D5E',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
            },
        },
        labels: {
            formatter: (value: number) => `${(value / 1000).toFixed(0)}K`,
            style: {
                colors: '#044D5E',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
            },
        },
    },
    fill: { opacity: 1 },
    tooltip: {
        y: {
            formatter: (val: number) => `${val.toLocaleString()} tCO2e`,
        },
    },
    grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 4,
    },
};

// Reusable Project Detail Item component
interface ProjectDetailItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    bgColor: string;
    textColor: string;
    badgeBgColor: string;
}

const ProjectDetailItem: React.FC<ProjectDetailItemProps> = ({
    icon,
    label,
    value,
    bgColor,
    textColor,
    badgeBgColor,
}) => (
    <div className={`flex items-center justify-between ${bgColor} border border-gray-100 rounded-lg p-3`}>
        <div className="flex items-center gap-3">
            {icon}
            <p className={`text-xs font-medium text-gray-700 ${textColor}`}>{label}</p>
        </div>
        <span className={`text-xs font-semibold text-gray-600 ${badgeBgColor} px-3 py-1 rounded-lg`}>
            {value}
        </span>
    </div>
);

const ReportsDetail: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col">
            <Header />
            <main className="w-full md:w-[90vw] mx-auto bg-[#FBFDFB] rounded-lg overflow-hidden pt-16">
                {/* Banner Section */}
                <section className="relative w-full h-52 md:h-64">
                    <Image
                        src="/images/activities/section1.png"
                        alt="Activities Banner"
                        fill
                        className="object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#B1CA69]/10 via-transparent to-[#FBFDFB]/80 flex items-end p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-2 w-full">
                            <div className="ml-0 md:ml-4 text-white space-y-2 md:space-y-4">
                                <div className="flex space-x-2 mb-2 md:mb-8">
                                    <Image src={folder} alt="Folder Icon" className="w-4 h-4" />
                                    <Image src={star} alt="Star Icon" className="w-4 h-4" />
                                </div>
                                <span className="text-xs text-teal-700">Reports / #2355A</span>
                                <h2 className="text-lg md:text-3xl font-bold text-teal-900">My Reports</h2>
                                <div className="flex items-center">
                                    <Link
                                        href="/reports/new"
                                        className="flex items-center gap-1 mr-4 bg-[#E2FFF2] hover:bg-[#E2FFF2]/90 border border-[#044D5E] text-xs text-[#044D5E] px-5 py-2 rounded-lg transition-all duration-300"
                                        aria-label="Create New Report"
                                    >
                                        <Plus size={16} /> New Report
                                    </Link>
                                    <Link
                                        href="/reports/previous"
                                        className="flex items-center gap-1 mr-4 bg-[#E2FFF2] hover:bg-[#E2FFF2]/90 border border-[#044D5E] text-xs text-[#044D5E] px-5 py-2 rounded-lg transition-all duration-300"
                                        aria-label="View Previous Report"
                                    >
                                        <ArrowLeft size={16} /> Previous Reports
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-row-reverse md:flex-row items-center gap-2">
                                <div className="w-fit h-8 flex items-center gap-2 rounded-3xl border border-[#044D5E] text-[#044D5E] p-2">
                                    <Heart size={16} /> <p className="text-xs font-semibold">18</p>
                                </div>
                                <div className="w-8 h-8 flex items-center justify-center rounded-full border border-[#044D5E] text-[#044D5E] p-2">
                                    <Share2 size={16} aria-label="Share Report" />
                                </div>
                                <Link
                                    href="/projects/create-projects"
                                    className="flex items-center gap-1 mr-4 bg-[#E2FFF2] hover:bg-[#E2FFF2]/90 border border-[#044D5E] text-xs text-[#044D5E] px-5 py-2 rounded-lg transition-all duration-300"
                                    aria-label="Download Report"
                                >
                                    <Download size={16} /> Download Report
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="w-full mx-auto px-2 py-4 md:p-6 space-y-8 bg-transparent">
                    <h1 className="text-2xl font-semibold text-[#044D5E]">
                        Green Horizon Project Annual Report, June 2025
                    </h1>

                    {/* Reporting Period Section */}
                    <div className="px-4 py-4 md:px-16 md:py-6 space-y-4 border border-gray-200 rounded-lg bg-white">
                        <h1 className="text-2xl font-semibold text-[#044D5E]">Reporting Period</h1>
                        <div className="flex flex-col md:flex-row items-center gap-2">
                            <div className="flex items-center gap-2 bg-[#EDFAFF] w-96 h-16 px-8 py-2 rounded-lg">
                                <div className="bg-[#DBEAFE] h-8 w-8 flex items-center justify-center rounded-lg">
                                    <Image src={calendar2} alt="Calendar Start Icon" className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col gap-0">
                                    <p className="text-xs font-medium">Start Date</p>
                                    <p className="text-xs text-[#155DFC] font-light">12th July, 2024</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-[#FAF5FE] w-96 h-16 px-8 py-2 rounded-lg">
                                <div className="bg-[#F3E8FF] h-8 w-8 flex items-center justify-center rounded-lg">
                                    <Image src={calendar1} alt="Calendar End Icon" className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col gap-0">
                                    <p className="text-xs font-medium">End Date</p>
                                    <p className="text-xs text-[#9810FA] font-light">12th July, 2025</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Stage & Financials Section */}
                    <div className="px-4 py-6 md:px-16 md:py-8 space-y-6 border border-gray-200 rounded-lg bg-white">
                        <h1 className="text-2xl font-semibold text-[#044D5E]">Project Stage & Financials</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Funding Progress Chart */}
                            <FundingProgressChart seriesWithYears={seriesWithYears} yearColorMap={yearColorMap} />

                            {/* Project Details */}
                            <div className="flex flex-col justify-center space-y-4">
                                <ProjectDetailItem
                                    icon={<BadgeCheck className="text-[#00B8A9]" size={18} />}
                                    label="Banking Stage"
                                    value="In Progress"
                                    bgColor="bg-[#F8FFFF]"
                                    textColor="text-[#00B8A9]"
                                    badgeBgColor="bg-[#E0FFFA]"
                                />
                                <ProjectDetailItem
                                    icon={<BadgeCheck className="text-[#FF8C00]" size={18} />}
                                    label="Financing Progress"
                                    value="45% Drawn"
                                    bgColor="bg-[#FFF8F5]"
                                    textColor="text-[#FF8C00]"
                                    badgeBgColor="bg-[#FFF0E5]"
                                />
                                <ProjectDetailItem
                                    icon={<BadgeCheck className="text-[#3B82F6]" size={18} />}
                                    label="Tenure Period"
                                    value="38 months"
                                    bgColor="bg-[#F6FFF6]"
                                    textColor="text-[#3B82F6]"
                                    badgeBgColor="bg-[#E8F3FF]"
                                />
                                <ProjectDetailItem
                                    icon={<BadgeCheck className="text-[#10B981]" size={18} />}
                                    label="Remaining Period"
                                    value="15 months"
                                    bgColor="bg-[#FAFFFB]"
                                    textColor="text-[#10B981]"
                                    badgeBgColor="bg-[#D1FAE5]"
                                />
                            </div>
                        </div>
                        <div className="bg-[#EFFFF4] text-[#008B5E] text-xs font-medium rounded-lg px-4 py-3 text-center">
                            Funding Progress is on track
                        </div>
                    </div>

                    {/* Project Outcomes Section */}
                    <div className="px-4 py-6 md:px-16 md:py-8 space-y-6 border border-gray-200 rounded-lg bg-white">
                        <h1 className="text-2xl font-semibold text-[#044D5E]">Project Outcomes</h1>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex flex-col gap-2 bg-white border border-gray-200 px-6 py-4 rounded-lg'>
                                <div className='flex items-center gap-2'>
                                    <TrendingUp color="#3B82F6" size={16} />
                                    <p className='text-xs'>Annual Carbon Offset</p>
                                </div>
                                <h1 className='text-xl font-semibold'>740,000 tCO2e</h1>
                                <p className='text-xs'>+15% from last year</p>
                            </div>
                            <div className='flex flex-col gap-2 bg-white border border-gray-200 px-6 py-4 rounded-lg'>
                                <div className='flex items-center gap-2'>
                                    <Leaf color="#4CAF50" size={16} />
                                    <p className='text-xs'>Credits Generated</p>
                                </div>
                                <h1 className='text-xl font-semibold'>35,500</h1>
                                <p className='text-xs'>Under Verra VCS</p>
                            </div>
                        </div>
                        <CarbonOffsetChart series={carbonOffsetSeries} options={carbonOffsetOptions} />
                        <div className="bg-[#EFFFF4] text-[#008B5E] text-xs font-medium rounded-lg px-4 py-3 text-center">
                            Project achieved 95% of its annual offset target
                        </div>
                    </div>
                </div>
            </main>

            {/* Help Button */}
            <div className="fixed bottom-5 right-5 flex flex-col items-center">
                <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
                    need help?
                    <span
                        className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"
                        aria-hidden="true"
                    ></span>
                </div>
                <button
                    className="bg-white shadow-md border border-gray-200 rounded-full p-3 flex items-center justify-center cursor-pointer transition-all duration-300"
                    aria-label="Get Help"
                >
                    <Image src={message_circle_more} alt="Help Icon" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ReportsDetail;