'use client';

import Header from '@/app/components/Header';
import { folder, message_circle_more } from '@/public';
import { ChevronsLeft, ChevronsRight, Download, Funnel, Plus, Search, ChevronDown, ChevronUp, Eye } from 'lucide-react';

import Sidebar from '@/app/components/Sidebar';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';

const Summary = () => {
    // **PERSISTENT SIDEBAR STATE**
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sidebarCollapsed');
            return saved ? (JSON.parse(saved) as boolean) : true;
        }
        return true;
    });

    // **PAGINATION STATE**
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 10;

    // **EXPANDED ROW STATE**
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    // Toggle dropdown
    const toggleRow = (id: string) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    // Sidebar width
    const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';

    // **TOGGLE SIDEBAR**
    const toggleSidebar = () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsed));
    };

    // Animation
    const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'}`;

    // Dummy Reports
    const dummyReports = [
        { id: 'RPT-001', name: 'Forest Restoration Impact', status: 'Completed', location: 'Amazon Basin', category: 'Conservation', lastUpdated: '2025-10-15' },
        { id: 'RPT-002', name: 'Urban Greening Metrics', status: 'Ongoing', location: 'New York City', category: 'Climate Change', lastUpdated: '2025-10-14' },
        { id: 'RPT-003', name: 'Coastal Cleanup Results', status: 'In Review', location: 'California Coast', category: 'Conservation', lastUpdated: '2025-10-13' },
        { id: 'RPT-004', name: 'Solar Farm Efficiency', status: 'Draft', location: 'Nevada Desert', category: 'Climate Change', lastUpdated: '2025-10-12' },
        { id: 'RPT-005', name: 'Wind Energy Output', status: 'Completed', location: 'North Sea', category: 'Climate Change', lastUpdated: '2025-10-11' },
        { id: 'RPT-006', name: 'River Restoration Progress', status: 'Ongoing', location: 'Mississippi River', category: 'Conservation', lastUpdated: '2025-10-10' },
        { id: 'RPT-007', name: 'Reforestation Yield', status: 'In Review', location: 'Brazil', category: 'Food Security', lastUpdated: '2025-10-09' },
        { id: 'RPT-008', name: 'Biodiversity Monitoring', status: 'Completed', location: 'Great Barrier Reef', category: 'Conservation', lastUpdated: '2025-10-08' },
        { id: 'RPT-009', name: 'Carbon Sequestration Analysis', status: 'Ongoing', location: 'Siberian Taiga', category: 'Climate Change', lastUpdated: '2025-10-08' },
        { id: 'RPT-010', name: 'Sustainable Agriculture Review', status: 'Draft', location: 'Midwest USA', category: 'Food Security', lastUpdated: '2025-10-07' },
        { id: 'RPT-011', name: 'Wetland Preservation Report', status: 'In Review', location: 'Florida Everglades', category: 'Conservation', lastUpdated: '2025-10-06' },
        { id: 'RPT-012', name: 'Renewable Energy Transition', status: 'Completed', location: 'Germany', category: 'Climate Change', lastUpdated: '2025-10-05' },
        { id: 'RPT-013', name: 'Ocean Acidification Study', status: 'Ongoing', location: 'Pacific Ocean', category: 'Climate Change', lastUpdated: '2025-10-04' },
        { id: 'RPT-014', name: 'Community Food Program', status: 'Completed', location: 'Nairobi', category: 'Food Security', lastUpdated: '2025-10-03' },
        { id: 'RPT-015', name: 'Deforestation Impact Assessment', status: 'In Review', location: 'Indonesia', category: 'Conservation', lastUpdated: '2025-10-02' },
        { id: 'RPT-016', name: 'Hydroelectric Power Evaluation', status: 'Draft', location: 'Three Gorges Dam', category: 'Climate Change', lastUpdated: '2025-10-01' },
        { id: 'RPT-017', name: 'Soil Health Initiative', status: 'Ongoing', location: 'Punjab, India', category: 'Food Security', lastUpdated: '2025-09-30' },
    ];

    // Pagination Logic
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = dummyReports.slice(indexOfFirstReport, indexOfLastReport);
    const totalReportPages = Math.ceil(dummyReports.length / reportsPerPage);

    const handleReportPageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalReportPages) {
            setCurrentPage(pageNumber);
            setExpandedRow(null); // Close dropdown on page change
        }
    };

    const getReportPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalReportPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            endPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    // Previous years
    const currentYear = 2025;
    const previousYears = [currentYear - 1, currentYear - 2, currentYear - 3]; // 2024, 2023, 2022

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
            <div className="flex-1 flex flex-col relative z-10">
                <Header />

                <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
                    <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20">
                        <Image src="/images/projects/summary.png" alt="Summary Banner" fill />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
                            <div className="flex items-end justify-between w-full">
                                <div className={`flex flex-col items-start ${contentMarginLeft} ${sectionTextContainerClass}`}>
                                    <Image src={folder} alt="folder Icon" className="block md:hidden w-4 h-4 mb-2" />
                                    <h2 className="text-lg md:text-3xl font-medium text-teal-900">
                                        My Reports
                                    </h2>
                                    <span className="text-xs text-teal-700">Reports / All Reports</span>
                                </div>
                                <Link
                                    href="/reports/forms"
                                    className="bg-[#E2FFF2] hover:bg-[#E2FFF2]/90 text-xs text-[#044D5E] border border-[#044D5E] px-5 py-2 rounded-md flex items-center gap-2"
                                >
                                    <Plus size={16} /> New Report
                                </Link>
                            </div>
                        </div>
                    </section>

                    <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

                    <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
                        <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8">

                            {/* Search & Download */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="relative flex items-center w-full sm:w-96">
                                        <input
                                            type="search"
                                            placeholder="Search reports..."
                                            className="text-xs border border-gray-300 rounded-md p-2 pl-4 pr-10 w-full focus:outline-none focus:border-gray-500"
                                        />
                                        <Search className="absolute right-3 text-gray-500 w-5 h-5" />
                                    </div>
                                    <div className="cursor-pointer hover:text-[#044D5E] bg-white border border-[#044D5E]/20 p-2 rounded-md">
                                        <Funnel className="w-4 h-4" />
                                    </div>
                                </div>
                                <Link href='/reports/ghgreports' className="px-5 py-2 bg-[#044D5E] text-xs text-white rounded-md hover:bg-[#044D5E]/70 flex items-center gap-2">
                                    Download <Download size={16} />
                                </Link>
                            </div>

                            {/* Reports Table */}
                            <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6 rounded-lg">
                                <h1 className="text-xs font-medium">My Reports ({dummyReports.length})</h1>

                                <div className="min-h-[292px] overflow-x-auto">
                                    <table className="w-full text-left text-xs text-gray-600 min-w-[800px]">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="py-3 px-4 font-medium">Report ID</th>
                                                <th className="py-3 px-4 font-medium">Report Name</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Status</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Location</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Category</th>
                                                <th className="py-3 px-4 font-medium">Last Updated</th>
                                                <th className="py-3 px-4 font-medium"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentReports.length > 0 ? (
                                                <>
                                                    {currentReports.map((report) => (
                                                        <React.Fragment key={report.id}>
                                                            {/* Main Row */}
                                                            <tr
                                                                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                                                                onClick={() => toggleRow(report.id)}
                                                            >
                                                                <td className="py-3 px-4">{report.id}</td>
                                                                <td className="py-3 px-4 flex items-center gap-2">
                                                                    {report.name}
                                                                    {expandedRow === report.id ? (
                                                                        <ChevronUp size={16} className="text-[#044D5E]" />
                                                                    ) : (
                                                                        <ChevronDown size={16} className="text-gray-500" />
                                                                    )}
                                                                </td>
                                                                <td className="py-3 px-4 hidden md:table-cell">
                                                                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${report.status === 'Completed' ? 'bg-[#E4F3D1] text-[#044D5E]' :
                                                                        report.status === 'Ongoing' ? 'bg-[#E2FFF2] text-[#044D5E]' :
                                                                            report.status === 'In Review' ? 'bg-[#FFF4E5] text-[#044D5E]' :
                                                                                'bg-gray-100 text-gray-600'
                                                                        }`}>
                                                                        {report.status}
                                                                    </span>
                                                                </td>
                                                                <td className="py-3 px-4 hidden md:table-cell">{report.location}</td>
                                                                <td className="py-3 px-4 hidden md:table-cell">{report.category}</td>
                                                                <td className="py-3 px-4">{report.lastUpdated}</td>
                                                                <td className="py-3 px-4">
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            alert(`Downloading ${report.name} (${currentYear})`);
                                                                        }}
                                                                        className="text-[#044D5E] hover:text-[#044D5E]/70"
                                                                    >
                                                                        <Download size={16} />
                                                                    </button>
                                                                </td>
                                                            </tr>

                                                            {/* Dropdown Row – clickable cards */}
                                                            {expandedRow === report.id && (
                                                                <tr className="bg-[#E2FFF2]/20 border-b border-gray-100">
                                                                    <td colSpan={7} className="py-4 px-6">
                                                                        <div className="space-y-3">
                                                                            <p className="text-xs font-medium text-[#044D5E] mb-2">Annual Reports</p>

                                                                            {/* Current Year */}
                                                                            <Link
                                                                                href={`/reports/${report.id}?year=${currentYear}&name=${encodeURIComponent(report.name)}`}
                                                                                className="block"
                                                                                onClick={() => setExpandedRow(null)}
                                                                            >
                                                                                <div className="flex justify-between items-center bg-white border border-[#044D5E]/10 rounded-md p-3 hover:shadow-sm transition cursor-pointer hover:bg-[#E2FFF2]/30">
                                                                                    <span className="text-xs text-gray-700">
                                                                                        Annual Report {currentYear} - {report.name}
                                                                                    </span>
                                                                                    <div className="flex items-center gap-3">
                                                                                        <button
                                                                                            onClick={(e) => {
                                                                                                e.preventDefault();
                                                                                                e.stopPropagation();
                                                                                                alert(`Downloading Annual Report ${currentYear} - ${report.name}`);
                                                                                            }}
                                                                                            className="text-[#044D5E] hover:bg-[#E2FFF2] px-3 py-1 rounded-md text-xs flex items-center gap-1 border border-[#044D5E]/20"
                                                                                        >
                                                                                            <Download size={14} />
                                                                                            Download
                                                                                        </button>
                                                                                        <span className="text-[#044D5E] px-3 py-1 rounded-md text-xs flex items-center gap-1 border border-[#044D5E]/20">
                                                                                            <Eye size={14} />
                                                                                            View Detail
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </Link>

                                                                            {/* Previous Years */}
                                                                            {previousYears.map((year) => (
                                                                                <Link
                                                                                    key={year}
                                                                                    href={`/reports/${report.id}?year=${year}&name=${encodeURIComponent(report.name)}`}
                                                                                    className="block"
                                                                                    onClick={() => setExpandedRow(null)}
                                                                                >
                                                                                    <div className="flex justify-between items-center bg-white border border-[#044D5E]/10 rounded-md p-3 hover:shadow-sm transition cursor-pointer hover:bg-[#E2FFF2]/30">
                                                                                        <span className="text-xs text-gray-700">
                                                                                            Annual Report {year} - {report.name}
                                                                                        </span>
                                                                                        <div className="flex items-center gap-3">
                                                                                            <button
                                                                                                onClick={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    e.stopPropagation();
                                                                                                    alert(`Downloading Annual Report ${year} - ${report.name}`);
                                                                                                }}
                                                                                                className="text-[#044D5E] hover:bg-[#E2FFF2] px-3 py-1 rounded-md text-xs flex items-center gap-1 border border-[#044D5E]/20"
                                                                                            >
                                                                                                <Download size={14} />
                                                                                                Download
                                                                                            </button>
                                                                                            <span className="text-[#044D5E] px-3 py-1 rounded-md text-xs flex items-center gap-1 border border-[#044D5E]/20">
                                                                                                <Eye size={14} />
                                                                                                View Detail
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </React.Fragment>
                                                    ))}

                                                    {/* Placeholder rows */}
                                                    {Array.from({ length: reportsPerPage - currentReports.length }).map((_, i) => (
                                                        <tr key={`placeholder-${i}`} className="border-b border-transparent">
                                                            <td className="py-3 px-4 text-transparent">-</td>
                                                            <td className="py-3 px-4 text-transparent">-</td>
                                                            <td className="py-3 px-4 text-transparent hidden md:table-cell">-</td>
                                                            <td className="py-3 px-4 text-transparent hidden md:table-cell">-</td>
                                                            <td className="py-3 px-4 text-transparent hidden md:table-cell">-</td>
                                                            <td className="py-3 px-4 text-transparent">-</td>
                                                            <td className="py-3 px-4 text-transparent">-</td>
                                                        </tr>
                                                    ))}
                                                </>
                                            ) : (
                                                <tr>
                                                    <td colSpan={7} className="py-10 text-center text-gray-500 italic">
                                                        No reports available
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="flex flex-col sm:flex-row justify-between items-center w-full px-6 py-4">
                                    <div className="text-xs text-gray-600 mb-4 sm:mb-0">
                                        {dummyReports.length > 0
                                            ? `Showing ${indexOfFirstReport + 1}-${Math.min(indexOfLastReport, dummyReports.length)} of ${dummyReports.length}`
                                            : 'No results found'}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleReportPageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`p-1 rounded-md border ${currentPage === 1
                                                ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                                                : 'text-[#044D5E] border-[#044D5E]/20 hover:bg-[#044D5E]/10'
                                                } transition-all`}
                                        >
                                            <ChevronsLeft size={20} />
                                        </button>

                                        {getReportPageNumbers().map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => handleReportPageChange(page)}
                                                className={`px-3 py-1 text-xs rounded-md border ${page === currentPage
                                                    ? 'bg-[#E4F3D1] text-[#044D5E] border-[#E4F3D1]'
                                                    : 'text-[#044D5E] border-[#044D5E]/20 hover:bg-[#044D5E]/10'
                                                    } transition-all`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => handleReportPageChange(currentPage + 1)}
                                            disabled={currentPage === totalReportPages}
                                            className={`p-1 rounded-md border ${currentPage === totalReportPages
                                                ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                                                : 'text-[#044D5E] border-[#044D5E]/20 hover:bg-[#044D5E]/10'
                                                } transition-all`}
                                        >
                                            <ChevronsRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
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

export default Summary;