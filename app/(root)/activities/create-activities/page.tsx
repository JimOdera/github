'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import { acticon10, acticon11, acticon12, acticon13, acticon5, acticon6, acticon7, acticon8, acticon9, folder, message_circle_more } from '@/public';
import { ChevronsLeft, ChevronsRight, Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Page = () => {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    // State for collapsed sidebar - SHRINKED BY DEFAULT (true)
    // const [isCollapsed, setIsCollapsed] = useState(true);
    const projectsPerPage = 5;

    // **PERSISTENT SIDEBAR STATE**
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sidebarCollapsed');
            return saved ? (JSON.parse(saved) as boolean) : true; // Default to collapsed
        }
        return true; // Default on server
    });

    // Sidebar width based on collapsed state (only applies on md+ screens)
    const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';

    // Dummy project data
    const dummyProjects = [
        { id: 1, name: 'Forest Restoration', editor: 'John Doe', lastEdited: '2025-10-15', progress: 75, status: 'Draft' },
        { id: 2, name: 'Urban Greening', editor: 'Jane Smith', lastEdited: '2025-10-14', progress: 60, status: 'Published' },
        { id: 3, name: 'Coastal Cleanup', editor: 'Bob Wilson', lastEdited: '2025-10-13', progress: 90, status: 'Draft' },
        { id: 4, name: 'Solar Farm', editor: 'Alice Brown', lastEdited: '2025-10-12', progress: 45, status: 'Published' },
        { id: 5, name: 'Wind Energy', editor: 'Emma Davis', lastEdited: '2025-10-11', progress: 30, status: 'Draft' },
        { id: 6, name: 'River Restoration', editor: 'Mike Johnson', lastEdited: '2025-10-10', progress: 80, status: 'Published' },
        { id: 7, name: 'Reforestation Project', editor: 'Sarah Miller', lastEdited: '2025-10-09', progress: 65, status: 'Draft' },
    ];

    // Pagination calculations
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = dummyProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalProjectPages = Math.ceil(dummyProjects.length / projectsPerPage);

    const handleProjectPageChange = (pageNumber: number): void => {
        if (pageNumber >= 1 && pageNumber <= totalProjectPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Toggle sidebar collapse (only on md+ screens)
    // const toggleSidebar = () => {
    //     setIsCollapsed(!isCollapsed);
    // };

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
    const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'
        }`;

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
            {/* Main Content Area - Starts after sidebar */}
            <div className="flex-1 flex flex-col relative z-10">
                {/* Top Navigation */}
                <Header />

                <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
                    {/* Full Width Hero Section - Behind everything */}
                    <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20 transition-all duration-300 ease-in-out">
                        <Image
                            src="/images/projects/summary.png"
                            alt="Summary Banner"
                            fill
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/10 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
                            {/* Content starts after dynamic sidebar width with smooth animation */}
                            <div className={`flex flex-col items-start ${contentMarginLeft} ${sectionTextContainerClass}`}>
                                <Image src={folder} alt="folder Icon" className="block md:hidden w-4 h-4 mb-2 cursor-pointer" />
                                <h2 className="text-lg md:text-3xl font-medium text-teal-900 transition-transform duration-300 ease-in-out origin-left">
                                    Create Activity
                                </h2>
                                <span className="text-xs text-teal-700 transition-transform duration-300 ease-in-out origin-left">
                                    Activities  /   <span className='text-[#4ABEA6]'>Create Activity</span>
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Reusable Sidebar Component */}
                    <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

                    <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-32 md:pt-46">
                        <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 md:py-18">

                                <Link 
                                    href={{
                                    pathname: '/activities/forms',
                                    query: { category: 'Environmental Metrics' }
                                    }} 
                                className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 cursor-pointer hover:bg-gray-50 transition-all duration-300">
                                    <Image src={acticon11} alt="Create Activity" className="w-4 h-4 md:w-6 md:h-6" />
                                    <p>Environmental Metrics</p>
                                </Link>
                                <Link 
                                    href={{
                                    pathname: '/activities/forms',
                                    query: { category: 'Social Impact' }
                                    }} 
                                className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 cursor-pointer hover:bg-gray-50 transition-all duration-300">
                                    <Image src={acticon12} alt="Create Activity" className="w-4 h-4 md:w-6 md:h-6" />
                                    <p>Social Impact</p>
                                </Link>
                                <Link 
                                    href={{
                                    pathname: '/activities/forms',
                                    query: { category: 'Stakeholder Engagement' }
                                    }} 
                                className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 cursor-pointer hover:bg-gray-50 transition-all duration-300">
                                    <Image src={acticon10} alt="Create Activity" className="w-4 h-4 md:w-6 md:h-6" />
                                    <p>Stakeholder Engagement</p>
                                </Link>

                                <Link 
                                    href={{
                                    pathname: '/activities/forms',
                                    query: { category: 'Material Topic' }
                                    }} 
                                className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 cursor-pointer hover:bg-gray-50 transition-all duration-300">
                                    <Image src={acticon9} alt="Create Activity" className="w-4 h-4 md:w-6 md:h-6" />
                                    <p>Material Topic</p>
                                </Link>
                                <Link 
                                    href={{
                                    pathname: '/activities/forms',
                                    query: { category: 'Human Rights' }
                                    }} 
                                className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 cursor-pointer hover:bg-gray-50 transition-all duration-300">
                                    <Image src={acticon13} alt="Create Activity" className="w-4 h-4 md:w-6 md:h-6" />
                                    <p>Human Rights</p>
                                </Link>
                                <Link 
                                    href={{
                                    pathname: '/activities/forms',
                                    query: { category: 'E&S Compliance' }
                                    }} 
                                className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 cursor-pointer hover:bg-gray-50 transition-all duration-300">
                                    <Image src={acticon8} alt="Create Activity" className="w-4 h-4 md:w-6 md:h-6" />
                                    <p>E&S Compliance</p>
                                </Link>

                                <Link 
                                    href={{
                                    pathname: '/activities/forms',
                                    query: { category: 'Procurement Spend Diversity' }
                                    }} 
                                className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 cursor-pointer hover:bg-gray-50 transition-all duration-300">
                                    <Image src={acticon7} alt="Create Activity" className="w-4 h-4 md:w-6 md:h-6" />
                                    <p>Procurement Spend Diversity</p>
                                </Link>
                                <Link 
                                    href={{
                                    pathname: '/activities/forms',
                                    query: { category: 'IFRS S1 &S2 Alignment Tracking' }
                                    }} 
                                className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 cursor-pointer hover:bg-gray-50 transition-all duration-300">
                                    <Image src={acticon6} alt="Create Activity" className="w-4 h-4 md:w-6 md:h-6" />
                                    <p>IFRS S1 &S2 Alignment Tracking</p>
                                </Link>
                                <Link 
                                    href={{
                                    pathname: '/activities/forms',
                                    query: { category: 'Custom Metric Tracker' }
                                    }} 
                                className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 cursor-pointer hover:bg-gray-50 transition-all duration-300">
                                    <Image src={acticon5} alt="Create Activity" className="w-4 h-4 md:w-6 md:h-6" />
                                    <p>Custom Metric Tracker</p>
                                </Link>

                            </div>

                            <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6 rounded-lg">
                                <h1 className="text-xs font-medium">My Drafts ({dummyProjects.length})</h1>

                                {/* Table container with min-height for consistent height */}
                                <div className="min-h-[292px]">
                                    <table className="w-full text-left text-xs text-gray-600">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="py-3 px-4 font-medium">Project ID</th>
                                                <th className="py-3 px-4 font-medium">Project Name</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Editor</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Last Edited</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Progress</th>
                                                <th className="py-3 px-4 font-medium">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentProjects.length > 0 ? (
                                                <>
                                                    {currentProjects.map((project) => (
                                                        <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                            <td className="py-3 px-4">{project.id}</td>
                                                            <td className="py-3 px-4">{project.name}</td>
                                                            <td className="py-3 px-4 hidden md:table-cell">{project.editor}</td>
                                                            <td className="py-3 px-4 hidden md:table-cell">{project.lastEdited}</td>
                                                            <td className="py-3 px-4 hidden md:table-cell">
                                                                <span className="text-xs font-medium text-[#044D5E]">
                                                                    {project.progress}% Complete
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span
                                                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs ${project.status === 'Published'
                                                                        ? 'bg-[#E4F3D1] text-[#044D5E]'
                                                                        : 'bg-gray-100 text-gray-600'
                                                                        }`}
                                                                >
                                                                    {project.status}
                                                                    {project.status === 'Draft' && <Edit size={14} className="text-gray-500" />}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {/* Invisible placeholder rows to maintain table height */}
                                                    {Array.from({ length: projectsPerPage - currentProjects.length }).map((_, index) => (
                                                        <tr key={`placeholder-${index}`} className="border-b border-transparent">
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
                                                        No projects available
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex flex-col sm:flex-row justify-between items-center w-full px-6 py-4">
                                    <div className="text-xs text-gray-600 mb-4 sm:mb-0">
                                        {dummyProjects.length > 0
                                            ? `Showing ${indexOfFirstProject + 1}-${Math.min(indexOfLastProject, dummyProjects.length)} of ${dummyProjects.length
                                            }`
                                            : 'No results found'}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleProjectPageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`p-1 rounded-md border ${currentPage === 1
                                                ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                                                : 'text-[#044D5E] border-[#044D5E]/20 hover:bg-[#044D5E]/10'
                                                } transition-all duration-200`}
                                            aria-label="Previous page"
                                        >
                                            <ChevronsLeft size={20} />
                                        </button>
                                        {getProjectPageNumbers().map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => handleProjectPageChange(page)}
                                                className={`px-3 py-1 text-xs rounded-md border ${page === currentPage
                                                    ? 'bg-[#E4F3D1] text-[#044D5E] border-[#E4F3D1]'
                                                    : 'text-[#044D5E] border-[#044D5E]/20 hover:bg-[#044D5E]/10'
                                                    } transition-all duration-200`}
                                                aria-label={`Page ${page}`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => handleProjectPageChange(currentPage + 1)}
                                            disabled={currentPage === totalProjectPages}
                                            className={`p-1 rounded-md border ${currentPage === totalProjectPages
                                                ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                                                : 'text-[#044D5E] border-[#044D5E]/20 hover:bg-[#044D5E]/10'
                                                } transition-all duration-200`}
                                            aria-label="Next page"
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

            {/* Floating Help Button */}
            <div className="fixed bottom-5 right-1 flex flex-col items-center">
                <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-md shadow-md mb-2 relative cursor-pointer">
                    need help?
                    <span
                        className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"
                        aria-hidden="true"
                    ></span>
                </div>
                <button className="bg-white shadow-lg border border-gray-200 p-2 rounded-full p-3 flex items-center justify-center cursor-pointer transition-all duration-300">
                    <Image src={message_circle_more} alt="Help" className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Page;