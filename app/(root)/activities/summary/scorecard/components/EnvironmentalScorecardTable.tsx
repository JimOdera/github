// app/components/EnvironmentalScorecardTable.tsx
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion'; // ← only new import
import { BadgeCheck } from 'lucide-react';

import sdg1 from '@/public/images/sdg/sdg1.png';
import sdg2 from '@/public/images/sdg/sdg2.png';
import sdg3 from '@/public/images/sdg/sdg3.png';
import sdg4 from '@/public/images/sdg/sdg4.png';
import sdg5 from '@/public/images/sdg/sdg5.png';

const SDG_ICONS = [sdg1, sdg2, sdg3, sdg4, sdg5];

type TableRow = {
    activity: string;
    baselineYear: string;
    targetYear: string;
    progress: number;
    status: 'On Track' | 'Ahead of Schedule' | 'In Progress' | 'At Risk';
};

const tableData: TableRow[] = [
    { activity: "Carbon Emission Reduction", baselineYear: "2023", targetYear: "2030", progress: 42, status: "On Track" },
    { activity: "Renewable Energy Adoption", baselineYear: "2024", targetYear: "2028", progress: 68, status: "Ahead of Schedule" },
    { activity: "Waste Management & Circular Economy", baselineYear: "2023", targetYear: "2027", progress: 17, status: "In Progress" },
    { activity: "Water Conservation Program", baselineYear: "2024", targetYear: "2030", progress: 55, status: "On Track" },
    { activity: "Biodiversity Protection Initiative", baselineYear: "2023", targetYear: "2030", progress: 31, status: "On Track" },
];

const getProgressColor = (progress: number, status: string) => {
    if (status === 'Ahead of Schedule') return 'bg-blue-500';
    if (status === 'At Risk') return 'bg-red-500';
    if (progress >= 70) return 'bg-green-500';
    if (progress >= 40) return 'bg-emerald-500';
    return 'bg-amber-500';
};

const EnvironmentalScorecardTable = () => {
    return (
        <section className="w-full mx-auto px-4 py-8 md:px-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-teal-900 mb-8">
                Environmental
            </h2>

            <div className="overflow-x-auto bg-gray-white">
                <table className="w-full text-sm text-left text-gray-700 border-separate border-spacing-4">
                    <thead>
                        <tr>
                            <th className="px-6 py-4 font-semibold text-teal-900 bg-[#EEF7EA] rounded-lg">Activity</th>
                            <th className="px-6 py-4 font-semibold text-teal-900 text-center bg-[#EEF7EA] rounded-lg">
                                Baseline Year
                            </th>
                            <th className="px-6 py-4 font-semibold text-teal-900 text-center bg-[#EEF7EA] rounded-lg">
                                Target Year
                            </th>
                            <th className="px-6 py-4 font-semibold text-teal-900 bg-[#EEF7EA] rounded-lg text-center">
                                Progress & Status
                            </th>
                            <th className="px-8 py-6 font-semibold text-teal-900 text-center bg-[#EEF7EA] rounded-lg min-w-[200px]">
                                SDGs
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td className="px-6 py-5 font-medium text-gray-800 bg-[#EEF7EA] rounded-lg border-b border-gray-400">
                                    {row.activity}
                                </td>
                                <td className="px-6 py-5 text-center bg-[#EEF7EA] rounded-lg border-b border-gray-400">
                                    {row.baselineYear}
                                </td>
                                <td className="px-6 py-5 text-center bg-[#EEF7EA] rounded-lg border-b border-gray-400">
                                    {row.targetYear}
                                </td>

                                {/* PROGRESS + STATUS CELL */}
                                <td className="px-6 py-5 bg-[#EEF7EA] rounded-lg border-b border-gray-400">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-teal-900">
                                                {row.progress}%
                                            </span>
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${row.status === 'Ahead of Schedule'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : row.status === 'At Risk'
                                                        ? 'bg-red-100 text-red-800'
                                                        : row.status === 'On Track'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                {row.status}
                                            </span>
                                        </div>

                                        {/* Animated Progress Bar */}
                                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                className={`h-full rounded-full ${getProgressColor(row.progress, row.status)}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${row.progress}%` }}
                                                transition={{ duration: 0.9, ease: "easeOut", delay: index * 0.1 }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500">Achieved</span>
                                    </div>
                                </td>

                                {/* SDG Icons - only on first row */}
                                {index === 0 && (
                                    <td
                                        rowSpan={tableData.length}
                                        className="px-8 py-10 bg-[#EEF7EA] rounded-lg align-middle border-b border-gray-400"
                                    >
                                        <div className="grid grid-cols-2 gap-8 justify-center">
                                            {SDG_ICONS.map((icon, i) => (
                                                <div key={i} className="flex justify-center">
                                                    <Image
                                                        src={icon}
                                                        alt={`SDG ${i + 1}`}
                                                        width={80}
                                                        height={80}
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Summary Card - with animated progress bar */}
                <div className='bg-[#EEF7EA] px-6 py-4 rounded-lg space-y-4 mt-6 border-b border-gray-400'>
                    <div className="flex items-center justify-between mt-2">
                        <p>Progress towards sustainability goals</p>
                        <div className='bg-[#4ABEA6] px-5 py-2 flex items-center justify-center gap-2 text-white rounded-lg text-xs'>
                            <BadgeCheck color='#ffffff' fill='#4ABEA6' size={18} />
                            <span>On Track</span>
                        </div>
                    </div>

                    <div className='flex flex-col w-full space-y-2'>
                        <div className='flex items-center justify-between gap-2'>
                            <span>Baseline Year: 2018</span>
                            <span>Target year: 2028</span>
                        </div>

                        {/* Animated Overall Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "45%" }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                            />
                        </div>

                        <div>
                            <span className="font-medium text-teal-900">45.0% of target achieved</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnvironmentalScorecardTable;