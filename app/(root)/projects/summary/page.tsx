'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar'; // IMPORTED SIDEBAR
import {
    calendar,
    flag,
    folder,
    message_circle_more,
    projectIcon2,
    projectIcon3,
    projectIcon4,
    upfield,
} from '@/public';
import {
    ArrowRight,
    Atom,
    Calendar,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    SquareMenu,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

// IMPORT YOUR NEW CHART COMPONENTS
import MarketplaceChart from '@/app/components/SummaryCharts/MarketplaceChart';
import ProjectType from './ProjectType/page';
import YearOnYear from './YearOnYear/page';
import TopFive from './TopFive/page';
import dynamic from 'next/dynamic';
// import MapPins from '@/app/components/MapPins';
const MapPins = dynamic(() => import('@/app/components/MapPins'), { ssr: false });

const Summary = () => {
    // TAB STATE - Updated to use meaningful keys
    const [activeTab, setActiveTab] = useState<'project-type' | 'year-on-year' | 'top-5'>('project-type');

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;

    // PERSISTENT SIDEBAR STATE
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sidebarCollapsed');
            return saved ? (JSON.parse(saved) as boolean) : true;
        }
        return true;
    });

    // CONTENT MARGIN (SIDEBAR WIDTH HANDLED IN COMPONENT)
    const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';

    // Updated Dummy project data
    const dummyProjects = [
        { id: 1, name: 'Forest Restoration', company: 'Mediapal', carbon: 23000, funded: 2000, goal: 200000, months: 4, change: -15.6, action: 'Completed' },
        { id: 2, name: 'Urban Greening', company: 'Safaricom', carbon: 45000, funded: 15000, goal: 250000, months: 3, change: 25, action: 'Pending Approval' },
        { id: 3, name: 'Coastal Cleanup', company: 'Airtel', carbon: 18000, funded: 5000, goal: 100000, months: 2, change: -5.5, action: 'Action Needed' },
        { id: 4, name: 'Solar Farm', company: 'CompanyX', carbon: 65000, funded: 80000, goal: 300000, months: 5, change: 40, action: 'Completed' },
        { id: 5, name: 'Wind Energy', company: 'Timeless', carbon: 12000, funded: 3000, goal: 150000, months: 1, change: -20, action: 'Pending Approval' },
        { id: 6, name: 'River Restoration', company: 'Mediapal', carbon: 35000, funded: 25000, goal: 200000, months: 6, change: 15.8, action: 'Action Needed' },
        { id: 7, name: 'Reforestation Project', company: 'Mediapal', carbon: 28000, funded: 12000, goal: 180000, months: 4, change: 10, action: 'Completed' },
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

    // TOGGLE SIDEBAR FUNCTION
    const toggleSidebar = () => {
        const newCollapsed = !isCollapsed;
        setIsCollapsed(newCollapsed);
        localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsed));
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

    // ANIMATION CLASSES FOR HERO SECTION TEXT
    const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'}`;

    // TAB COMPONENTS - Updated with meaningful keys and active states
    const renderTabContent = () => {
        switch (activeTab) {
            case 'project-type':
                return (
                    <ProjectType />
                );

            case 'year-on-year':
                return (
                    <YearOnYear />
                );

            case 'top-5':
                return (
                    <TopFive />
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col relative z-10">
                {/* Top Navigation */}
                <Header />

                {/* MAIN CONTAINER WITH HERO SECTION */}
                <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">

                    {/* FULL WIDTH HERO SECTION */}
                    <section className={`absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20 transition-all duration-300 ease-in-out`}>
                        <Image
                            src="/images/projects/summary.png"
                            alt="Summary Banner"
                            fill
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
                            <div className={`flex flex-col items-start ${contentMarginLeft} ${sectionTextContainerClass}`}>
                                <Image src={folder} alt="folder Icon" className="block md:hidden w-4 h-4 mb-2 cursor-pointer" />
                                <h2 className="text-lg md:text-3xl font-medium text-teal-900 transition-transform duration-300 ease-in-out origin-left">
                                    Green Portfolio
                                </h2>
                                <span className="text-xs text-teal-700 transition-transform duration-300 ease-in-out origin-left">
                                    Reporting Period: July, 2024-June 2025
                                </span>
                                <button className='bg-[#DEEDD7] text-xs text-[#044D5E] border border-[#B6D695] px-5 py-2 rounded-lg'>Download PDF</button>
                            </div>
                        </div>
                    </section>

                    {/* REUSABLE SIDEBAR COMPONENT */}
                    <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

                    {/* MAIN CONTENT */}
                    <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
                        <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8">

                            <div className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8'>
                                <Image src={upfield} alt="UpfieldLogo" className="" />
                                <p className='text-lg'>Welcome to Upfield Green Portfolio</p>
                            </div>

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

                            {/* PROJECT OVERVIEW */}
                            <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6">
                                <p className="text-lg font-medium text-[#044D5E]">Projects Overview</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#EBFFF5] border border-[#B6EBCF] rounded-lg flex flex-col md:flex-row items-center gap-4 w-full px-8 py-2">
                                        <div className='w-full flex items-start gap-2 rounded-lg'>
                                            <div className="p-2 bg-[#00C587] rounded-lg">
                                                <Image src={projectIcon2} alt="Project Icon" className="w-6 h-6" />
                                            </div>
                                            <div className="flex flex-col items-start space-y-1">
                                                <span className="text-sm font-semibold text-gray-700">Total Green Projects</span>
                                                <span className='text-xs'>Cumulative green projects</span>
                                            </div>
                                        </div>
                                        <h1 className='text-3xl font-medium'>245</h1>
                                    </div>

                                    <MarketplaceChart number={56} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div className="bg-[#EBFFF5] shadow-xs rounded-lg flex flex-col items-start justify-center gap-4 w-full px-8 py-4">
                                            <h5 className='text-gray-500 text-sm'>Active Projects</h5>
                                            <h1 className='text-3xl font-medium'>200</h1>
                                        </div>
                                        <div className="bg-[#EBFFF5] shadow-xs rounded-lg flex flex-col items-start justify-center gap-4 w-full px-8 py-4">
                                            <h5 className='text-gray-500 text-sm'>Complete Projects</h5>
                                            <h1 className='text-3xl font-medium'>150</h1>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div className="bg-[#F6FFEB] shadow-xs rounded-lg flex flex-col items-start justify-center gap-4 w-full px-8 py-4">
                                            <h5 className='text-gray-500 text-sm'>Total GHG Scale (MWh)</h5>
                                            <h1 className='text-3xl font-medium'>20,000</h1>
                                        </div>
                                        <div className="bg-[#F6FFEB] shadow-xs rounded-lg flex flex-col items-start justify-center gap-4 w-full px-8 py-4">
                                            <h5 className='text-gray-500 text-sm'>Total Climate threats addressed</h5>
                                            <h1 className='text-3xl font-medium'>500</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Carbon Revenue Potential */}
                            <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6">
                                <p className="text-lg font-medium text-[#044D5E]">Carbon Revenue Potential</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className='flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4'>
                                        <div className='flex items-center gap-2'>
                                            <Image src={projectIcon4} alt="Projects Icon" className="w-4 h-4 text-blue-600" />
                                            <p className="text-sm">Annual Revenue Projection</p>
                                        </div>
                                        <h1 className='text-3xl font-medium text-gray-800'>$250,000</h1>
                                        <span className='text-xs text-green-600'>+15% of the potential</span>
                                    </div>
                                    <div className='flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4'>
                                        <div className='flex items-center gap-2'>
                                            <Image src={projectIcon3} alt="Marketplace Icon" className="w-4 h-4 text-yellow-600" />
                                            <p className="text-sm">CO2e Reduction</p>
                                        </div>
                                        <h1 className='text-3xl font-medium text-gray-800'>750,000 tCO2e</h1>
                                        <span className='text-xs text-yellow-600'>+17% of the potential</span>
                                    </div>
                                </div>
                                <div className="w-full bg-[#ECFDF5] px-4 py-2 rounded-lg text-sm">
                                    <span className="text-[#4ABEA6]">Carbon Credits available:</span> 12 months pipeline
                                </div>
                            </div>

                            {/*  Projects Map */}
                            <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6 rounded-lg">
                                <p className="text-lg font-medium text-[#044D5E]"> Projects Map</p>

                                <MapPins />
                            </div>

                            {/* UPDATED TAB SYSTEM - ALL TABS ACTIVE */}
                            <div className='bg-white border border-gray-200 px-4 py-4 md:px-16 md:py-6 rounded-lg space-y-4'>
                                <h1 className='text-lg font-medium text-[#044D5E]'>Emission Annual Reduction Insights</h1>

                                {/* Tab Headers */}
                                <div className='flex flex-col sm:flex-row items-center justify-between gap-2'>
                                    <div
                                        className={`w-full flex items-center justify-center px-5 py-2 gap-2 cursor-pointer transition-all duration-300 ${activeTab === 'project-type'
                                            ? 'border-b-4 border-[#044D5E] bg-[#044D5E]/5 text-[#044D5E] font-medium'
                                            : 'bg-gray-100 text-[#044D5E] hover:bg-gray-50 border-b-4 border-gray-200 '
                                            }`}
                                        onClick={() => setActiveTab('project-type')}
                                    >
                                        <SquareMenu size={16} />
                                        <h1 className='hidden md:block'>Reduction by Project Type</h1>
                                    </div>

                                    <div
                                        className={`w-full flex items-center justify-center px-5 py-2 gap-2 cursor-pointer transition-all duration-300 ${activeTab === 'year-on-year'
                                            ? 'border-b-4 border-[#044D5E] bg-[#044D5E]/5 text-[#044D5E] font-medium'
                                            : 'bg-gray-100 text-[#044D5E] hover:bg-gray-50 border-b-4 border-gray-200 '
                                            }`}
                                        onClick={() => setActiveTab('year-on-year')}
                                    >
                                        <Calendar size={16} />
                                        <h1 className='hidden md:block'>Year on year total emission reduction</h1>
                                    </div>

                                    <div
                                        className={`w-full flex items-center justify-center px-5 py-2 gap-2 cursor-pointer transition-all duration-300 ${activeTab === 'top-5'
                                            ? 'border-b-4 border-[#044D5E] bg-[#044D5E]/5 text-[#044D5E] font-medium'
                                            : 'bg-gray-100 text-[#044D5E] hover:bg-gray-50 border-b-4 border-gray-200 '
                                            }`}
                                        onClick={() => setActiveTab('top-5')}
                                    >
                                        <Atom size={16} />
                                        <h1 className='hidden md:block'>Top 5 Projects by emission reduction</h1>
                                    </div>
                                </div>

                                {/* Tab Content */}
                                <div className="animate-fade-in">
                                    {renderTabContent()}
                                </div>
                            </div>

                            {/* Projects Table */}
                            <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6">
                                <h1 className="text-lg font-medium text-[#044D5E]">All Projects ({dummyProjects.length})</h1>
                                <div className="min-h-[292px]">
                                    <table className="w-full text-left text-xs text-gray-600">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="py-3 px-4 font-medium flex items-center"><span className='hidden md:block'>Project</span> ID</th>
                                                <th className="py-3 px-4 font-medium">Project Name</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Company</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Carbon</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Funded</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">Goal</th>
                                                <th className="py-3 px-4 font-medium hidden md:table-cell">4mo</th>
                                                <th className="py-3 px-4 font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentProjects.length > 0 ? (
                                                <>
                                                    {currentProjects.map((project) => (
                                                        <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                            <td className="py-3 px-4">{project.id}</td>
                                                            <td className="py-3 px-4">{project.name}</td>
                                                            <td className="py-3 px-4 hidden md:table-cell">{project.company}</td>
                                                            <td className="py-3 px-4 hidden md:table-cell">{project.carbon.toLocaleString()}</td>
                                                            <td className="py-3 px-4 hidden md:table-cell">${project.funded.toLocaleString()}</td>
                                                            <td className="py-3 px-4 hidden md:table-cell">${project.goal.toLocaleString()}</td>
                                                            <td className="py-3 px-4 hidden md:table-cell">
                                                                <span className={`text-xs ${project.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                    {project.change >= 0 ? '+' : ''}{project.change}%
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span
                                                                    className={`px-2 py-1 rounded-sm text-xs ${project.action === 'Completed'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : project.action === 'Pending Approval'
                                                                            ? 'bg-yellow-100 text-yellow-800'
                                                                            : 'bg-red-100 text-red-800'
                                                                        }`}
                                                                >
                                                                    {project.action}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {Array.from({ length: projectsPerPage - currentProjects.length }).map((_, index) => (
                                                        <tr key={`placeholder-${index}`} className="border-b border-transparent">
                                                            <td className="py-3 px-4 text-transparent">-</td>
                                                            <td className="py-3 px-4 text-transparent">-</td>
                                                            <td className="py-3 px-4 text-transparent hidden md:table-cell">-</td>
                                                            <td className="py-3 px-4 text-transparent hidden md:table-cell">-</td>
                                                            <td className="py-3 px-4 text-transparent hidden md:table-cell">-</td>
                                                            <td className="py-3 px-4 text-transparent hidden md:table-cell">-</td>
                                                            <td className="py-3 px-4 text-transparent hidden md:table-cell">-</td>
                                                            <td className="py-3 px-4 text-transparent">-</td>
                                                        </tr>
                                                    ))}
                                                </>
                                            ) : (
                                                <tr>
                                                    <td colSpan={8} className="py-10 text-center text-gray-500 italic">
                                                        No projects available
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between items-center w-full px-6 py-4">
                                    <div className="text-xs text-gray-600 mb-4 sm:mb-0">
                                        {dummyProjects.length > 0
                                            ? `Showing ${indexOfFirstProject + 1}-${Math.min(indexOfLastProject, dummyProjects.length)} of ${dummyProjects.length}`
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
            <div className="fixed bottom-5 right-5 flex flex-col items-center">
                <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
                    need help?
                    <span
                        className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"
                        aria-hidden="true"
                    ></span>
                </div>
                <button className="bg-white shadow-md border border-gray-200 rounded-full p-3 flex items-center justify-center cursor-pointer transition-all duration-300">
                    <Image src={message_circle_more} alt="Help" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Summary;