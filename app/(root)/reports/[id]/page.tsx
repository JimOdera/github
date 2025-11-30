'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import { calendar, flag, folder, message_circle_more } from '@/public';
import { ChevronsLeft, ChevronsRight, Plus, Edit, ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';

const ReportDetail = () => {
    // ---- Query params (year & name) ----
    const searchParams = useSearchParams();
    const year = searchParams.get('year') ?? '2025';
    const rawName = searchParams.get('name');
    const reportName = rawName ? decodeURIComponent(rawName) : 'Untitled Report';

    // ---- Dynamic segment (report id) ----
    const { id } = useParams<{ id: string }>();

    // ---- Pagination for drafts table ----
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 5;

    // ---- Sidebar state (persisted) ----
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sidebarCollapsed');
            return saved ? JSON.parse(saved) as boolean : true;
        }
        return true;
    });

    const toggleSidebar = () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsed));
    };

    const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';
    const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'}`;

    // ---- Dummy drafts (replace with real data later) ----
    const dummyReports = [
        { id: 2356, name: 'Forest Restoration', editor: 'John Doe', lastEdited: '2025-10-15', progress: 75, status: 'Draft' },
        { id: 2357, name: 'Urban Greening', editor: 'Jane Smith', lastEdited: '2025-10-14', progress: 60, status: 'Published' },
        { id: 2358, name: 'Coastal Cleanup', editor: 'Bob Wilson', lastEdited: '2025-10-13', progress: 90, status: 'Draft' },
        { id: 2359, name: 'Solar Farm', editor: 'Alice Brown', lastEdited: '2025-10-12', progress: 45, status: 'Published' },
        { id: 2360, name: 'Wind Energy', editor: 'Emma Davis', lastEdited: '2025-10-11', progress: 30, status: 'Draft' },
        { id: 2361, name: 'River Restoration', editor: 'Mike Johnson', lastEdited: '2025-10-10', progress: 80, status: 'Published' },
        { id: 2362, name: 'Reforestation Project', editor: 'Sarah Miller', lastEdited: '2025-10-09', progress: 65, status: 'Draft' },
    ];

    // ---- Pagination logic (unchanged) ----
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = dummyReports.slice(indexOfFirstReport, indexOfLastReport);
    const totalReportPages = Math.ceil(dummyReports.length / reportsPerPage);

    const handleReportPageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalReportPages) {
            setCurrentPage(pageNumber);
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

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
            <div className="flex-1 flex flex-col relative z-10">
                <Header />

                <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
                    {/* Hero Banner – now shows real report name & ID */}
                    <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20">
                        <Image
                            src="/images/projects/summary.png"
                            alt="Summary Banner"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/10 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
                            <div className="w-full flex items-end justify-between gap-2">
                                <div className={`flex flex-col items-start ${contentMarginLeft} ${sectionTextContainerClass}`}>
                                    <Image src={folder} alt="folder Icon" className="block md:hidden w-4 h-4 mb-2" />
                                    <h2 className="text-lg md:text-3xl font-medium text-teal-900">
                                        {reportName}
                                    </h2>
                                    <span className="text-xs text-teal-700">
                                        Reports /{` `}
                                        <span className="text-[#4ABEA6] font-medium">
                                            #{id} ({year})
                                        </span>
                                    </span>
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

                            {/* Important Actions */}
                            <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6">
                                <h1>Previous Reports (4)</h1>
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="w-full md:w-fit flex items-center justify-between space-x-8 bg-white px-5 py-2">
                                        <Image src={flag} alt="Flag Icon" className="w-4 h-4 mb-2" />
                                        <div className="flex flex-col gap-1">
                                            <h2 className="text-sm text-teal-900">2024 Annual report</h2>
                                            <span className="text-xs text-teal-700">1 year ago</span>
                                        </div>
                                        <ChevronRight />
                                    </div>
                                    <div className="w-full md:w-fit flex items-center justify-between space-x-8 bg-white px-5 py-2">
                                        <Image src={calendar} alt="Calendar Icon" className="w-4 h-4 mb-2" />
                                        <div className="flex flex-col gap-1">
                                            <h2 className="text-sm text-teal-900">2023 Annual report</h2>
                                            <span className="text-xs text-teal-700">2 years ago</span>
                                        </div>
                                        <ChevronRight />
                                    </div>
                                    <button className="bg-white border border-[#044D5E]/20 px-5 py-2 rounded-md flex items-center gap-2 text-xs">
                                        View all <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Drafts Table – unchanged (you can filter by id/year later) */}
                            <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6 rounded-lg">
                                <h1 className="text-xs font-medium">My Drafts ({dummyReports.length})</h1>

                                <div className="min-h-[292px] overflow-x-auto">
                                    <table className="w-full text-left text-xs text-gray-600 min-w-[800px]">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="py-3 px-4 font-medium">Report ID</th>
                                                <th className="py-3 px-4 font-medium">Report Name</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Editor</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Last Edited</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Progress</th>
                                                <th className="py-3 px-4 font-medium">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentReports.length > 0 ? (
                                                <>
                                                    {currentReports.map((report) => (
                                                        <tr
                                                            key={report.id}
                                                            className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                                                        >
                                                            <td className="py-3 px-4">#{report.id}</td>
                                                            <td className="py-3 px-4 font-medium text-[#044D5E]">{report.name}</td>
                                                            <td className="py-3 px-4 hidden md:table-cell">{report.editor}</td>
                                                            <td className="py-3 px-4 hidden md:table-cell">{report.lastEdited}</td>
                                                            <td className="py-3 px-4 hidden md:table-cell">
                                                                <span className="text-xs font-medium text-[#044D5E]">
                                                                    {report.progress}% Complete
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span
                                                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs ${report.status === 'Published'
                                                                        ? 'bg-[#E4F3D1] text-[#044D5E]'
                                                                        : 'bg-gray-100 text-gray-600'
                                                                        }`}
                                                                >
                                                                    {report.status}
                                                                    {report.status === 'Draft' && <Edit size={14} className="text-gray-500" />}
                                                                </span>
                                                            </td>
                                                        </tr>
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
                                                        </tr>
                                                    ))}
                                                </>
                                            ) : (
                                                <tr>
                                                    <td colSpan={6} className="py-10 text-center text-gray-500 italic">
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

export default ReportDetail;