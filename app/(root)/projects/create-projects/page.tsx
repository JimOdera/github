'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import { folder, message_circle_more } from '@/public';
import { ChevronsLeft, ChevronsRight, Plus, Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  // Sidebar
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved !== null) setIsCollapsed(JSON.parse(saved));
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';

  // Load ONLY DRAFTS (exclude submitted projects completely)
  const draftProjects = useMemo(() => {
    if (!isMounted) return [];

    const drafts: any[] = [];

    Object.keys(localStorage).forEach((key) => {
      const match = key.match(/^projectDraft_(.+)_step1$/);
      if (!match) return;

      const projectId = match[1];

      try {
        const step1Str = localStorage.getItem(`projectDraft_${projectId}_step1`);
        if (!step1Str) return;

        const step1 = JSON.parse(step1Str);
        if (!step1.projectTitle?.trim()) return;

        // Count completed steps
        let completedSteps = 1;
        for (let i = 2; i <= 4; i++) {
          if (localStorage.getItem(`projectDraft_${projectId}_step${i}`)) {
            completedSteps = i;
          } else {
            break;
          }
        }

        // Progress
        let progress = Math.round((completedSteps / 4) * 100);
        let status = 'Draft';

        const step2Str = localStorage.getItem(`projectDraft_${projectId}_step2`);
        if (step2Str) {
          try {
            const step2 = JSON.parse(step2Str);
            if (step2.percentageDrawn) progress = parseInt(step2.percentageDrawn, 10);
            if (step2.bankingStage) status = step2.bankingStage;
          } catch {}
        }

        const isComplete = completedSteps === 4;

        drafts.push({
          id: projectId,
          name: step1.projectTitle,
          lastEdited: 'In Progress',
          progress,
          status: isComplete ? 'Ready to Submit' : status,
          isComplete,
        });
      } catch (e) {
        console.warn('Failed to parse draft:', key, e);
      }
    });

    // Sort newest first (timestamp in ID)
    return drafts.sort((a, b) => b.id.localeCompare(a.id));
  }, [isMounted]);

  // Pagination (only for drafts)
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = draftProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(draftProjects.length / projectsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const max = 5;
    let start = Math.max(1, currentPage - Math.floor(max / 2));
    let end = Math.min(totalPages, start + max - 1);
    if (end - start + 1 < max) start = Math.max(1, end - max + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
      <div className="flex-1 flex flex-col relative z-10">
        <Header />

        <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
          <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20">
            <Image src="/images/projects/summary.png" alt="Banner" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
              <div className={`flex flex-col items-start ${contentMarginLeft}`}>
                <Image src={folder} alt="folder" className="block md:hidden w-4 h-4 mb-2" />
                <h2 className="text-lg md:text-3xl font-medium text-teal-900">
                  Welcome to Klima Harvest
                </h2>
                <span className="text-xs text-teal-700">Projects / My Drafts</span>
              </div>
            </div>
          </section>

          <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

          <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
            <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8">

              {/* New Project Button */}
              <Link href="/projects/forms" className="flex justify-center py-32 bg-[#F9FBFC] hover:bg-[#E2FFF2]/20 border border-gray-200 rounded-lg transition-all duration-300">
                <button
                  className="bg-[#E2FFF2] hover:bg-[#E2FFF2]/90 text-xs text-[#044D5E] border border-[#044D5E] px-5 py-2 rounded-md flex items-center gap-2 transition"
                >
                  <Plus size={16} /> New Project
                </button>
              </Link>

              {/* Drafts Only Table */}
              <div className="bg-[#F9FBFC] border border-gray-200 rounded-lg px-4 py-6 md:px-16 md:py-6">
                <h1 className="text-sm font-medium mb-6">My Drafts ({draftProjects.length})</h1>

                <div className="min-h-[300px]">
                  <table className="w-full text-left text-xs text-gray-600">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 font-medium">Project ID</th>
                        <th className="py-3 px-4 font-medium">Project Name</th>
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
                            <td className="py-3 px-4 font-medium text-teal-900 max-w-xs truncate">
                              {project.name}
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <span className="text-xs font-medium text-[#044D5E]">
                                {project.progress}% Complete
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium ${
                                  project.isComplete
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {project.status}
                                <Edit size={14} className="ml-1" />
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Link
                                href={`/projects/forms?draft=${project.id}`}
                                className="text-[#044D5E] hover:underline text-xs font-medium"
                              >
                                {project.isComplete ? 'Review & Submit' : 'Continue Editing'}
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-gray-500 italic">
                            No drafts yet. Click <strong>"New Project"</strong> to start one!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-6 px-4">
                    <div className="text-xs text-gray-600">
                      Showing {indexOfFirstProject + 1}–{Math.min(indexOfLastProject, draftProjects.length)} of {draftProjects.length}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-1 rounded border disabled:text-gray-300 disabled:border-gray-200"
                      >
                        <ChevronsLeft size={20} />
                      </button>
                      {getPageNumbers().map((n) => (
                        <button
                          key={n}
                          onClick={() => handlePageChange(n)}
                          className={`px-3 py-1 text-xs rounded border ${
                            n === currentPage
                              ? 'bg-[#E4F3D1] text-[#044D5E] border-[#E4F3D1]'
                              : 'text-[#044D5E] border-[#044D5E]/20'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-1 rounded border disabled:text-gray-300 disabled:border-gray-200"
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
      <div className="fixed bottom-5 right-1 flex flex-col items-center z-50">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-md shadow-md mb-2 relative">
          need help?
          <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></span>
        </div>
        <button className="bg-white shadow-lg border border-gray-200 p-3 rounded-full">
          <Image src={message_circle_more} alt="Help" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Page;