'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import { acticon10, acticon11, acticon12, acticon13, acticon5, acticon6, acticon7, acticon8, acticon9, folder, message_circle_more } from '@/public';
import { ChevronsLeft, ChevronsRight, Edit, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';

const Page = () => {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;

    // **PERSISTENT SIDEBAR STATE**
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sidebarCollapsed');
            return saved ? (JSON.parse(saved) as boolean) : true;
        }
        return true;
    });

    // Client-side mounting state
    const [isMounted, setIsMounted] = useState(false);

    // Sidebar width based on collapsed state
    const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';

    // Dummy project data (fallback)
    const dummyProjects = [
        { id: 1, name: 'Forest Restoration', editor: 'John Doe', lastEdited: '2025-10-15', progress: 75, status: 'Draft' },
        { id: 2, name: 'Urban Greening', editor: 'Jane Smith', lastEdited: '2025-10-14', progress: 60, status: 'Published' },
        { id: 3, name: 'Coastal Cleanup', editor: 'Bob Wilson', lastEdited: '2025-10-13', progress: 90, status: 'Draft' },
    ];

    // Load real draft activities from localStorage
    const realDraftActivities = useMemo(() => {
        if (!isMounted) return [];

        const activities: any[] = [];

        try {
            // Load draft activities
            Object.keys(localStorage).forEach(key => {
                const match = key.match(/^activityDraft_(.+)_step1$/);
                if (!match) return;
                const activityId = match[1];

                try {
                    const step1Data = JSON.parse(localStorage.getItem(key) || '{}');
                    if (!step1Data.entityName) return;

                    // Calculate progress based on filled steps
                    let filledSteps = 0;
                    for (let i = 1; i <= 3; i++) {
                        if (localStorage.getItem(`activityDraft_${activityId}_step${i}`)) filledSteps++;
                    }
                    const progress = Math.round((filledSteps / 3) * 100);

                    // Get category from step2
                    let category = 'Draft';
                    try {
                        const step2Data = JSON.parse(localStorage.getItem(`activityDraft_${activityId}_step2`) || '{}');
                        category = step2Data.selectedCategory || 'Draft';
                    } catch (e) {
                        console.warn('Failed to parse step2 for activity:', activityId);
                    }

                    // Get last updated timestamp
                    const timestamp = activityId.match(/_(\d+)_\w+/)?.[1];
                    const lastEdited = timestamp
                        ? new Date(Number(timestamp)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                        : 'Recently';

                    activities.push({
                        id: activityId,
                        name: step1Data.entityName || 'Untitled Draft',
                        editor: step1Data.orgName || 'User',
                        lastEdited: lastEdited,
                        progress: progress,
                        status: progress === 100 ? 'Ready to Submit' : 'Draft',
                        category: category,
                        isReal: true,
                    });
                } catch (e) {
                    console.warn('Failed to parse draft activity:', key);
                }
            });

            // Load submitted activities that are still in draft status
            try {
                const submittedStr = localStorage.getItem('submittedActivities');
                if (submittedStr) {
                    const submitted = JSON.parse(submittedStr);
                    if (Array.isArray(submitted)) {
                        submitted.forEach((activity: any) => {
                            if (activity.status === 'Draft' || activity.status === 'In Progress') {
                                const overview = activity.overview || {};
                                const timestamp = activity.id.match(/_(\d+)_\w+/)?.[1];
                                const lastEdited = timestamp
                                    ? new Date(Number(timestamp)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                                    : 'Recently';

                                activities.push({
                                    id: activity.id,
                                    name: overview.entityName || 'Submitted Activity',
                                    editor: overview.orgName || 'System',
                                    lastEdited: lastEdited,
                                    progress: 100,
                                    status: activity.status,
                                    category: activity.category || 'General',
                                    isReal: true,
                                });
                            }
                        });
                    }
                }
            } catch (e) {
                console.warn('Failed to load submitted activities', e);
            }
        } catch (e) {
            console.warn('Failed to load activities from localStorage', e);
        }

        return activities;
    }, [isMounted]);

    // Combine real activities with dummy ones (real ones first)
    const allProjects = useMemo(() => {
        const realOnes = realDraftActivities.map(activity => ({
            ...activity,
            isReal: true
        }));

        const dummyOnes = dummyProjects.map(project => ({
            ...project,
            isReal: false,
            id: project.id.toString()
        }));

        return [...realOnes, ...dummyOnes];
    }, [realDraftActivities]);

    // Pagination calculations
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = allProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalProjectPages = Math.ceil(allProjects.length / projectsPerPage);

    const handleProjectPageChange = (pageNumber: number): void => {
        if (pageNumber >= 1 && pageNumber <= totalProjectPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Toggle sidebar
    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
        }
    };

    // Get page numbers for pagination
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

    // Continue activity function
    const continueActivity = (activityId: string) => {
        // Navigate to the activity form with the existing draft ID
        window.location.href = `/activities/forms?draft=${activityId}`;
    };

    // Mount effect
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Prevent SSR flash
    if (!isMounted) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
                <Header />
                <div className="flex-1 flex items-center justify-center text-gray-600">
                    Loading activities...
                </div>
            </div>
        );
    }

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
                                <h1 className="text-xs font-medium">My Drafts ({allProjects.length})</h1>

                                {/* Table container with min-height for consistent height */}
                                <div className="min-h-[292px]">
                                    <table className="w-full text-left text-xs text-gray-600">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="py-3 px-4 font-medium">Activity ID</th>
                                                <th className="py-3 px-4 font-medium">Activity Name</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Category</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Last Edited</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Progress</th>
                                                <th className="py-3 px-4 font-medium">Status</th>
                                                <th className="py-3 px-4 font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentProjects.length > 0 ? (
                                                <>
                                                    {currentProjects.map((project) => (
                                                        <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                            <td className="py-3 px-4 font-mono text-xs">
                                                                {project.isReal ? project.id.substring(0, 8) + '...' : project.id}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-2">
                                                                    {project.name}
                                                                    {project.isReal && (
                                                                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                                                                            Real
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4 hidden md:table-cell">
                                                                {project.category || 'General'}
                                                            </td>
                                                            <td className="py-3 px-4 hidden md:table-cell">{project.lastEdited}</td>
                                                            <td className="py-3 px-4 hidden md:table-cell">
                                                                <span className="text-xs font-medium text-[#044D5E]">
                                                                    {project.progress}% Complete
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span
                                                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs ${
                                                                        project.status === 'Published' || project.status === 'Ready to Submit'
                                                                            ? 'bg-[#E4F3D1] text-[#044D5E]'
                                                                            : project.status === 'In Progress'
                                                                            ? 'bg-blue-100 text-blue-700'
                                                                            : 'bg-gray-100 text-gray-600'
                                                                    }`}
                                                                >
                                                                    {project.status}
                                                                    {(project.status === 'Draft' || project.status === 'In Progress') && <Edit size={14} className="text-gray-500" />}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                {project.isReal ? (
                                                                    <button
                                                                        onClick={() => continueActivity(project.id)}
                                                                        className="flex items-center gap-1 px-3 py-1 bg-[#044D5E] text-white text-xs rounded-md hover:bg-[#044D5E]/90 transition-colors"
                                                                    >
                                                                        Continue <ExternalLink size={12} />
                                                                    </button>
                                                                ) : (
                                                                    <span className="text-gray-400 text-xs">Demo</span>
                                                                )}
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
                                                            <td className="py-3 px-4 text-transparent">-</td>
                                                        </tr>
                                                    ))}
                                                </>
                                            ) : (
                                                <tr>
                                                    <td colSpan={7} className="py-10 text-center text-gray-500 italic">
                                                        No draft activities available
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex flex-col sm:flex-row justify-between items-center w-full px-6 py-4">
                                    <div className="text-xs text-gray-600 mb-4 sm:mb-0">
                                        {allProjects.length > 0
                                            ? `Showing ${indexOfFirstProject + 1}-${Math.min(indexOfLastProject, allProjects.length)} of ${allProjects.length}`
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