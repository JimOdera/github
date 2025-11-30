'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import { folder, message_circle_more } from '@/public';
import { ChevronsLeft, ChevronsRight, Plus, Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  // Persistent sidebar state
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed');
      return saved ? JSON.parse(saved) as boolean : true;
    }
    return true;
  });

  const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';

  // === REAL DRAFT PROJECTS FROM localStorage ===
  const draftProjects = useMemo(() => {
    const drafts: Array<{
      id: string;
      name: string;
      lastEdited: string;
      progress: number;
      status: 'Draft' | 'Published';
    }> = [];

    Object.keys(localStorage).forEach(key => {
      const match = key.match(/^projectDraft_(.+)_step1$/);
      if (match) {
        const projectId = match[1];
        try {
          const step1Data = JSON.parse(localStorage.getItem(key) || '{}');
          if (step1Data.projectTitle) {
            let filledSteps = 0;
            for (let i = 1; i <= 4; i++) {
              if (localStorage.getItem(`projectDraft_${projectId}_step${i}`)) filledSteps++;
            }
            const progress = Math.round((filledSteps / 4) * 100);

            // Get last modified time
            const lastModified = localStorage.getItem(`projectDraft_${projectId}_lastModified`);
            const date = lastModified
              ? new Date(Number(lastModified)).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })
              : 'Today';

            drafts.push({
              id: projectId,
              name: step1Data.projectTitle || 'Untitled Project',
              lastEdited: date,
              progress,
              status: 'Draft' as const
            });
          }
        } catch (e) {
          console.warn('Failed to parse draft:', key);
        }
      }
    });

    return drafts;
  }, []);

  // === Fallback dummy projects (only if no real drafts) ===
  const dummyProjects = [
    { id: 'dummy-1', name: 'Forest Restoration', lastEdited: '15 Oct, 2025', progress: 75, status: 'Draft' },
    { id: 'dummy-2', name: 'Urban Greening', lastEdited: '14 Oct, 2025', progress: 60, status: 'Published' },
    { id: 'dummy-3', name: 'Coastal Cleanup', lastEdited: '13 Oct, 2025', progress: 90, status: 'Draft' },
    { id: 'dummy-4', name: 'Solar Farm', lastEdited: '12 Oct, 2025', progress: 45, status: 'Published' },
    { id: 'dummy-5', name: 'Wind Energy', lastEdited: '11 Oct, 2025', progress: 30, status: 'Draft' },
  ];

  // Use real drafts if exist, otherwise fall back to dummy
  const allProjects = draftProjects.length > 0 ? draftProjects : dummyProjects;

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = allProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalProjectPages = Math.ceil(allProjects.length / projectsPerPage);

  const handleProjectPageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalProjectPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const getProjectPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalProjectPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'}`;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
      <div className="flex-1 flex flex-col relative z-10">
        <Header />

        <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
          <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20">
            <Image src="/images/projects/summary.png" alt="Summary Banner" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
              <div className={`flex flex-col items-start ${contentMarginLeft} ${sectionTextContainerClass}`}>
                <Image src={folder} alt="folder Icon" className="block md:hidden w-4 h-4 mb-2 cursor-pointer" />
                <h2 className="text-lg md:text-3xl font-medium text-teal-900">
                  Welcome to Klima Harvest
                </h2>
                <span className="text-xs text-teal-700">Projects / Create Project</span>
              </div>
            </div>
          </section>

          <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

          <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
            <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8">

              {/* New Project Button */}
              <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6 rounded-lg">
                <div className="flex flex-col items-center gap-4 py-6 md:py-18">
                  <Link
                    href="/projects/forms"
                    className="bg-[#E2FFF2] hover:bg-[#E2FFF2]/90 text-xs text-[#044D5E] border border-[#044D5E] px-5 py-2 rounded-md flex items-center gap-2"
                  >
                    <Plus size={16} /> New Project
                  </Link>
                </div>
              </div>

              {/* Drafts Table */}
              <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6 rounded-lg">
                <h1 className="text-xs font-medium">My Drafts ({allProjects.length})</h1>

                <div className="min-h-[292px]">
                  <table className="w-full text-left text-xs text-gray-600">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 font-medium">Project ID</th>
                        <th className="py-3 px-4 font-medium">Project Name</th>
                        <th className="py-3 px-4 font-medium hidden md:table-cell">Last Edited</th>
                        <th className="py-3 px-4 font-medium hidden md:table-cell">Progress</th>
                        <th className="py-3 px-4 font-medium">Status</th>
                        <th className="py-3 px-4 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProjects.length > 0 ? (
                        currentProjects.map((project) => (
                          <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-500">#{project.id.slice(0, 8)}</td>
                            <td className="py-3 px-4 font-medium text-teal-900">{project.name}</td>
                            <td className="py-3 px-4 hidden md:table-cell">{project.lastEdited}</td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <span className="text-xs font-medium text-[#044D5E]">
                                {project.progress}% Complete
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs ${project.status === 'Published'
                                ? 'bg-[#E4F3D1] text-[#044D5E]'
                                : 'bg-gray-100 text-gray-600'
                                }`}>
                                {project.status}
                                {project.status === 'Draft' && <Edit size={14} className="text-gray-500" />}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Link
                                href={`/projects/forms?draft=${project.id}`}
                                className="text-[#044D5E] hover:underline text-xs font-medium"
                              >
                                Continue Editing
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-10 text-center text-gray-500 italic">
                            No draft projects yet. Click "New Project" to start!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalProjectPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center w-full px-6 py-4">
                    <div className="text-xs text-gray-600 mb-4 sm:mb-0">
                      Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, allProjects.length)} of {allProjects.length}
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
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Help */}
      <div className="fixed bottom-5 right-1 flex flex-col items-center">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-md shadow-md mb-2 relative cursor-pointer">
          need help?
          <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></span>
        </div>
        <button className="bg-white shadow-lg border border-gray-200 p-3 rounded-full">
          <Image src={message_circle_more} alt="Help" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Page;