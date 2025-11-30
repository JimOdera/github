'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import { folder, message_circle_more } from '@/public';
import { dummyProjects } from './DummyProjectsData';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const Page = () => {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 12; // Changed to 9 projects per page

    // **PERSISTENT SIDEBAR STATE**
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sidebarCollapsed');
            return saved ? (JSON.parse(saved) as boolean) : true;
        }
        return true;
    });

    // Sidebar width based on collapsed state
    const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';

    // Filter trending projects (EXACTLY first 3 projects)
    const trendingProjects = dummyProjects.slice(0, 3);

    // Non-trending projects for main grid (everything after first 3)
    const nonTrendingProjects = dummyProjects.slice(3);

    // Pagination calculations
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = nonTrendingProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalProjectPages = Math.ceil(nonTrendingProjects.length / projectsPerPage);

    const handleProjectPageChange = (pageNumber: number): void => {
        if (pageNumber >= 1 && pageNumber <= totalProjectPages) {
            setCurrentPage(pageNumber);
        }
    };

    // **TOGGLE FUNCTION**
    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    const getProjectPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalProjectPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    // Animation classes for text
    const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'}`;

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative z-10">
                {/* Top Navigation */}
                <Header />

                <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
                    {/* Hero Section */}
                    <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20 transition-all duration-300 ease-in-out">
                        <Image
                            src="/images/projects/summary.png"
                            alt="Summary Banner"
                            fill
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
                            <div className={`flex flex-col items-start ${contentMarginLeft} ${sectionTextContainerClass}`}>
                                <Image src={folder} alt="folder Icon" className="block md:hidden w-4 h-4 mb-2 cursor-pointer" />
                                <h2 className="text-lg md:text-3xl font-medium text-teal-900 transition-transform duration-300 ease-in-out origin-left">
                                    Explore Published Projects
                                </h2>
                                <span className="text-xs text-teal-700 transition-transform duration-300 ease-in-out origin-left">
                                    Projects / marketplace
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Sidebar */}
                    <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

                    <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
                        <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8">
                            <div className="flex flex-col space-y-10">

                                {/* 🔥 Trending Section - EXACTLY FIRST 3 PROJECTS */}
                                <section className="space-y-6">
                                    <div
                                        className="w-fit bg-[#E2FFF2] hover:bg-[#E2FFF2]/90 text-xs text-[#044D5E] border border-[#044D5E] px-5 py-2 rounded-md flex items-center gap-2"
                                    >
                                        Trending
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {trendingProjects.map((project) => (
                                            <div
                                                key={project.id}
                                                className="flex items-center gap-4 bg-[#E2FFF2] border border-[#CFECDD] rounded-xl p-4 hover:shadow-md transition"
                                            >
                                                <div className="w-30 h-26 relative rounded-md overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={project.image}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-between">
                                                    <h3 className="font-medium text-sm text-gray-900">{project.title}</h3>
                                                    <p className="text-teal-900 text-lg font-semibold">{project.fundingProgress}% funded</p>
                                                    <p className="text-xs text-gray-500">Total Funded: {project.totalFunded} / {project.goal} Goal</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* 🪴 Projects Grid - 9 PROJECTS PER PAGE */}
                                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {currentProjects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition"
                                        >
                                            <div className="w-full h-50 relative">
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-4 flex flex-col gap-2">
                                                <h3 className="font-medium text-gray-900 text-sm">{project.title}</h3>
                                                <p className="text-xs text-gray-500">{project.location}</p>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className="bg-[#044D5E] h-2.5 rounded-full transition-all duration-300"
                                                        style={{ width: `${project.fundingProgress}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-xs text-gray-500">Funding Progress: {project.fundingProgress}%</p>
                                                <div className="flex gap-2 mt-2">
                                                    <button className="flex-1 border border-[#044D5E] text-[#044D5E] text-xs py-2 rounded-md hover:bg-[#E2FFF2] transition">
                                                        View Details
                                                    </button>
                                                    <button className="flex-1 bg-[#044D5E] text-white text-xs py-2 rounded-md hover:bg-[#033C4A] transition">
                                                        Invest
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </section>

                                {/* Pagination */}
                                {totalProjectPages > 1 && (
                                    <div className="flex justify-center items-center space-x-2 pt-6">
                                        <button
                                            onClick={() => handleProjectPageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-2 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronsLeft size={16} />
                                        </button>

                                        {getProjectPageNumbers().map((pageNumber) => (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handleProjectPageChange(pageNumber)}
                                                className={`px-3 py-2 text-xs font-medium rounded-md transition ${currentPage === pageNumber
                                                    ? 'bg-[#044D5E] text-white'
                                                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => handleProjectPageChange(currentPage + 1)}
                                            disabled={currentPage === totalProjectPages}
                                            className="px-3 py-2 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronsRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Floating Help Button */}
            <div className="fixed bottom-5 right-5 flex flex-col items-center">
                <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
                    need help?
                    <span
                        className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"
                        aria-hidden="true"
                    ></span>
                </div>
                <button className="bg-white shadow-md border border-gray-200 bg-gray-200/50 p-2 rounded-md rounded-full p-3 flex items-center justify-center cursor-pointer transition-all duration-300">
                    <Image src={message_circle_more} alt="Help" className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Page;