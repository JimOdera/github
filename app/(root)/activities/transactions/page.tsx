'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar'; // ✅ IMPORTED SIDEBAR
import {
    calendar,
    flag,
    folder,
    message_circle_more,
} from '@/public';
import {
    ArrowRight,
    Atom,
    Calendar,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Folder,
    MapPin,
    Package,
    SquareMenu,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

// ✅ IMPORT YOUR NEW CHART COMPONENTS
import MyProjectsChart from '@/app/components/SummaryCharts/MyProjectsChart';
import MarketplaceChart from '@/app/components/SummaryCharts/MarketplaceChart';
import ProgressChart from '@/app/components/SummaryCharts/ProgressChart';

const Summary = () => {
    // ✅ TAB STATE
    const [activeTab, setActiveTab] = useState('summary');

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;

    // **SIDEBAR STATE - SIMPLIFIED**
    // const [isCollapsed, setIsCollapsed] = useState(true);

    // **PERSISTENT SIDEBAR STATE**
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sidebarCollapsed');
            return saved ? (JSON.parse(saved) as boolean) : true; // Default to collapsed
        }
        return true; // Default on server
    });

    // **CONTENT MARGIN ONLY (SIDEBAR WIDTH HANDLED IN COMPONENT)**
    const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';

    // Updated Dummy project data
    const dummyProjects = [
        { id: 1, name: 'Forest Restoration', company: 'Mediapal', carbon: 23000, funded: 2000, goal: 200000, months: 4, change: -15.6, action: 'Submitted' },
        { id: 2, name: 'Urban Greening', company: 'Safaricom', carbon: 45000, funded: 15000, goal: 250000, months: 3, change: 25, action: 'Pending Approval' },
        { id: 3, name: 'Coastal Cleanup', company: 'Airtel', carbon: 18000, funded: 5000, goal: 100000, months: 2, change: -5.5, action: 'Action Needed' },
        { id: 4, name: 'Solar Farm', company: 'CompanyX', carbon: 65000, funded: 80000, goal: 300000, months: 5, change: 40, action: 'Submitted' },
        { id: 5, name: 'Wind Energy', company: 'Timeless', carbon: 12000, funded: 3000, goal: 150000, months: 1, change: -20, action: 'Pending Approval' },
        { id: 6, name: 'River Restoration', company: 'Mediapal', carbon: 35000, funded: 25000, goal: 200000, months: 6, change: 15.8, action: 'Action Needed' },
        { id: 7, name: 'Reforestation Project', company: 'Mediapal', carbon: 28000, funded: 12000, goal: 180000, months: 4, change: 10, action: 'Submitted' },
    ];

    // Funding Progress Data
    const myProjectsFunded = 525000;
    const myProjectsTarget = 700000;

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

    // **TOGGLE SIDEBAR FUNCTION - SIMPLIFIED**
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

    // **ANIMATION CLASSES FOR HERO SECTION TEXT ONLY**
    const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'}`;

    // ✅ TAB COMPONENTS
    const renderTabContent = () => {
        switch (activeTab) {
            case 'summary':
                return (
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col items-center border border-gray-200 bg-[#F5F8F5] justify-between px-8 py-6 rounded-lg">
                            <p className='text-xs'>Total Transactions</p>
                            <h1 className='text-4xl font-semibold'>105</h1>
                            <button className='px-5 py-2 bg-[#1ECEC9] text-xs text-[#044D5E] rounded-full'>View statements</button>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 flex-1'>
                            <ProgressChart
                                title="Total Financed projects"
                                value="76"
                                target="105"
                                changePercentage={-20}
                                chartData={[30, 40, 35, 50, 49, 90, 70, 50, 45]}
                            />
                            <ProgressChart
                                title="Total Carbon Offset"
                                value="43000 tCO2e"
                                target="72000 tCO2e"
                                changePercentage={28}
                                chartData={[20, 30, 25, 40, 55, 45, 70, 80, 95]}
                            />
                            <ProgressChart
                                title="Average Funding Rate"
                                value="72%"
                                target="85%"
                                changePercentage={15}
                                chartData={[50, 45, 60, 55, 70, 65, 80, 75, 90]}
                            />
                            <ProgressChart
                                title="Active Projects"
                                value="12"
                                target="20"
                                changePercentage={25}
                                chartData={[10, 20, 15, 30, 25, 40, 35, 50, 60]}
                            />
                        </div>
                    </div>
                );

            case 'emissions-scope':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    </div>
                );

            case 'emissions-category':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    </div>
                );

            case 'location':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-sm font-semibold mb-4">Nairobi Office</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span>Emissions</span>
                                    <span className="font-semibold">8,500 tCO2e</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span>Projects</span>
                                    <span className="font-semibold">12</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-sm font-semibold mb-4">Mombasa Branch</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span>Emissions</span>
                                    <span className="font-semibold">6,200 tCO2e</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span>Projects</span>
                                    <span className="font-semibold">8</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'year-comparison':
                return (
                    <div className="grid grid-cols-1 gap-6">
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">

            {/* **MAIN CONTENT AREA - STARTS AFTER SIDEBAR** */}
            <div className="flex-1 flex flex-col relative z-10">
                {/* Top Navigation */}
                <Header />

                {/* **MAIN CONTAINER WITH HERO SECTION** */}
                <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">

                    {/* **FULL WIDTH HERO SECTION - BEHIND EVERYTHING** */}
                    <section className={`absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20 transition-all duration-300 ease-in-out`}>
                        <Image
                            src="/images/projects/summary.png"
                            alt="Summary Banner"
                            fill
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
                            {/* **CONTENT STARTS AFTER DYNAMIC SIDEBAR WIDTH** */}
                            <div className={`flex flex-col items-start ${contentMarginLeft} ${sectionTextContainerClass}`}>
                                <Image src={folder} alt="folder Icon" className="block md:hidden w-4 h-4 mb-2 cursor-pointer" />
                                <h2 className="text-lg md:text-3xl font-medium text-teal-900 transition-transform duration-300 ease-in-out origin-left">
                                    My Expenses
                                </h2>
                                <span className="text-xs text-teal-700 transition-transform duration-300 ease-in-out origin-left">
                                    Projects / Transactions
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* ✅ REUSABLE SIDEBAR COMPONENT */}
                    <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

                    {/* **MAIN CONTENT** */}
                    <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
                        <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8">

                            {/* Important Actions */}
                            <div className='flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6'>
                                <h1>Important Actions (4)</h1>
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

                            {/* ✅ TAB SYSTEM */}
                            <div className='bg-white border border-gray-200 px-8 py-6 rounded-lg space-y-4'>
                                {/* Tab Headers */}
                                <div className='flex items-center justify-between gap-2'>
                                    <div
                                        className={`w-full flex items-center justify-center px-5 py-2 gap-2 cursor-pointer transition-all duration-200 ${activeTab === 'summary'
                                            ? 'border-b-4 border-[#044D5E] bg-[#044D5E]/5 text-[#044D5E] font-semibold'
                                            : 'bg-gray-100 text-[#044D5E] hover:bg-gray-50'
                                            }`}
                                        onClick={() => setActiveTab('summary')}
                                    >
                                        <SquareMenu size={16} />
                                        <h1 className='hidden md:block'>Summary</h1>
                                    </div>

                                    <div className="w-full flex items-center justify-center px-5 py-2 gap-2 bg-gray-50 text-gray-400 cursor-not-allowed">
                                        <Atom size={16} />
                                        <h1 className='hidden md:block'>Emissions by Scope</h1>
                                    </div>

                                    <div className="w-full flex items-center justify-center px-5 py-2 gap-2 bg-gray-50 text-gray-400 cursor-not-allowed">
                                        <Atom size={16} />
                                        <h1 className='hidden md:block'>Emission by Category</h1>
                                    </div>

                                    <div className="w-full flex items-center justify-center px-5 py-2 gap-2 bg-gray-50 text-gray-400 cursor-not-allowed">
                                        <MapPin size={16} />
                                        <h1 className='hidden md:block'>Location Overview</h1>
                                    </div>

                                    <div className="w-full flex items-center justify-center px-5 py-2 gap-2 bg-gray-50 text-gray-400 cursor-not-allowed">
                                        <Calendar size={16} />
                                        <h1 className='hidden md:block'>Year Comparison</h1>
                                    </div>
                                </div>

                                {/* Tab Content */}
                                <div className="animate-fade-in">
                                    {renderTabContent()}
                                </div>
                            </div>

                            {/* FUNDING PROGRESS */}
                            <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6">
                                <p className="text-xs font-medium text-gray-600">Funding Progress</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <MyProjectsChart funded={myProjectsFunded} target={myProjectsTarget} />
                                    <MarketplaceChart number={45} />
                                </div>
                            </div>

                            {/* Carbon Offset Progress */}
                            <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6">
                                <p className="text-xs">Carbon Offset Progress</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className='flex flex-col gap-2 border border-gray-200 px-6 py-4'>
                                        <div className='flex items-center gap-2'>
                                            <Folder className="w-4 h-4 text-green-600" />
                                            <p className="text-sm">From my projects</p>
                                        </div>
                                        <h1 className='text-3xl font-bold text-gray-800'>25,000 tonnes</h1>
                                        <span className='text-xs text-green-600'>+12% vs last quarter</span>
                                    </div>
                                    <div className='flex flex-col gap-2 border border-gray-200 px-6 py-4'>
                                        <div className='flex items-center gap-2'>
                                            <Package className="w-4 h-4 text-yellow-600" />
                                            <p className="text-sm">From marketplace</p>
                                        </div>
                                        <h1 className='text-3xl font-bold text-gray-800'>18,000 tonnes</h1>
                                        <span className='text-xs text-yellow-600'>+8% vs last quarter</span>
                                    </div>
                                </div>
                            </div>

                            {/* Projects Table */}
                            <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6">
                                <h1 className="text-sm font-semibold">All Projects ({dummyProjects.length})</h1>
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
                                                                    className={`px-2 py-1 rounded-full text-xs ${project.action === 'Submitted'
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