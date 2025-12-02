'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import {
  acticon10,
  acticon11,
  acticon12,
  acticon13,
  acticon5,
  acticon6,
  acticon7,
  acticon8,
  acticon9,
  folder,
  message_circle_more,
} from '@/public';
import { ChevronsLeft, ChevronsRight, Edit, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';

interface DraftActivity {
  id: string;
  name: string;
  editor: string;
  lastEdited: string;
  progress: number;
  status: string;
  category: string;
}

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed');
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  const [isMounted, setIsMounted] = useState(false);

  const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';
  const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'}`;

  // ONLY REAL DRAFTS FROM localStorage — NO DUMMY DATA
  const draftActivities = useMemo<DraftActivity[]>(() => {
    if (!isMounted) return [];

    const activities: DraftActivity[] = [];

    try {
      Object.keys(localStorage).forEach((key) => {
        const match = key.match(/^activityDraft_(.+)_step1$/);
        if (!match) return;

        const activityId = match[1];

        try {
          const step1Data = JSON.parse(localStorage.getItem(key) || '{}');
          if (!step1Data.entityName) return;

          // Count filled steps
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
            console.warn('Failed to parse step2 for draft:', activityId);
          }

          // Extract timestamp from ID
          const timestampMatch = activityId.match(/_(\d+)_\w+/);
          const timestamp = timestampMatch ? Number(timestampMatch[1]) : Date.now();

          const lastEdited = new Date(timestamp).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });

          activities.push({
            id: activityId,
            name: step1Data.entityName || 'Untitled Draft',
            editor: step1Data.orgName || 'You',
            lastEdited,
            progress,
            status: progress === 100 ? 'Ready to Submit' : progress >= 50 ? 'In Progress' : 'Draft',
            category,
          });
        } catch (e) {
          console.warn('Failed to parse draft activity:', key);
        }
      });
    } catch (e) {
      console.error('Error loading draft activities:', e);
    }

    // Sort by most recent first
    return activities.sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime());
  }, [isMounted]);

  // Pagination
  const totalPages = Math.ceil(draftActivities.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = draftActivities.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const continueActivity = (draftId: string) => {
    window.location.href = `/activities/forms?draft=${draftId}`;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
        <Header />
        <div className="flex-1 flex items-center justify-center text-gray-600">
          Loading drafts...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
      <div className="flex-1 flex flex-col relative z-10">
        <Header />

        <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
          {/* Hero Banner */}
          <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20">
            <Image src="/images/projects/summary.png" alt="Create Activity" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/10 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
              <div className={`flex flex-col items-start ${contentMarginLeft} ${sectionTextContainerClass}`}>
                <Image src={folder} alt="folder" className="block md:hidden w-4 h-4 mb-2" />
                <h2 className="text-lg md:text-3xl font-medium text-teal-900">Create Activity</h2>
                <span className="text-xs text-teal-700">
                  Activities / <span className="text-[#4ABEA6]">Create Activity</span>
                </span>
              </div>
            </div>
          </section>

          <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

          <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-32 md:pt-46">
            <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6">

              {/* Category Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 md:py-18">
                <Link href="/activities/forms?category=Environmental Metrics" className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 hover:bg-gray-50 transition">
                  <Image src={acticon11} alt="Environmental Metrics" className="w-6 h-6" />
                  <p>Environmental Metrics</p>
                </Link>
                <Link href="/activities/forms?category=Social Impact" className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 hover:bg-gray-50 transition">
                  <Image src={acticon12} alt="Social Impact" className="w-6 h-6" />
                  <p>Social Impact</p>
                </Link>
                <Link href="/activities/forms?category=Stakeholder Engagement" className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 hover:bg-gray-50 transition">
                  <Image src={acticon10} alt="Stakeholder Engagement" className="w-6 h-6" />
                  <p>Stakeholder Engagement</p>
                </Link>
                <Link href="/activities/forms?category=Material Topic" className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 hover:bg-gray-50 transition">
                  <Image src={acticon9} alt="Material Topic" className="w-6 h-6" />
                  <p>Material Topic</p>
                </Link>
                <Link href="/activities/forms?category=Human Rights" className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 hover:bg-gray-50 transition">
                  <Image src={acticon13} alt="Human Rights" className="w-6 h-6" />
                  <p>Human Rights</p>
                </Link>
                <Link href="/activities/forms?category=E&S Compliance" className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 hover:bg-gray-50 transition">
                  <Image src={acticon8} alt="E&S Compliance" className="w-6 h-6" />
                  <p>E&S Compliance</p>
                </Link>
                <Link href="/activities/forms?category=Procurement Spend Diversity" className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 hover:bg-gray-50 transition">
                  <Image src={acticon7} alt="Procurement Spend Diversity" className="w-6 h-6" />
                  <p>Procurement Spend Diversity</p>
                </Link>
                <Link href="/activities/forms?category=IFRS S1 &S2 Alignment Tracking" className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 hover:bg-gray-50 transition">
                  <Image src={acticon6} alt="IFRS S1 &S2" className="w-6 h-6" />
                  <p>IFRS S1 &S2 Alignment Tracking</p>
                </Link>
                <Link href="/activities/forms?category=Custom Metric Tracker" className="flex flex-col items-center gap-4 border-dashed border-2 border-[#C3DCA6]/50 bg-gradient-to-br from-[#BFEFF8]/10 to-[#B1CA69]/10 rounded-lg px-6 py-10 hover:bg-gray-50 transition">
                  <Image src={acticon5} alt="Custom Metric Tracker" className="w-6 h-6" />
                  <p>Custom Metric Tracker</p>
                </Link>
              </div>

              {/* My Drafts Section */}
              <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6 rounded-lg">
                <h1 className="text-xs font-medium">My Drafts ({draftActivities.length})</h1>

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
                        currentProjects.map((project) => (
                          <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-mono text-xs">{project.id.substring(0, 8)}...</td>
                            <td className="py-3 px-4 font-medium">{project.name}</td>
                            <td className="py-3 px-4 hidden md:table-cell">{project.category}</td>
                            <td className="py-3 px-4 hidden md:table-cell">{project.lastEdited}</td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <span className="text-xs font-medium text-[#044D5E]">{project.progress}% Complete</span>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs ${
                                  project.status === 'Ready to Submit'
                                    ? 'bg-[#E4F3D1] text-[#044D5E]'
                                    : project.status === 'In Progress'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {project.status}
                                {project.status !== 'Ready to Submit' && <Edit size={14} className="text-gray-500" />}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => continueActivity(project.id)}
                                className="flex items-center gap-1 px-3 py-1 bg-[#044D5E] text-white text-xs rounded-md hover:bg-[#044D5E]/90 transition"
                              >
                                Continue <ExternalLink size={12} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-16 text-center text-gray-500 italic">
                            No draft activities yet. Choose a category above to start creating!
                          </td>
                        </tr>
                      )}

                      {/* Maintain table height with invisible rows */}
                      {Array.from({ length: Math.max(0, projectsPerPage - currentProjects.length) }).map((_, i) => (
                        <tr key={`empty-${i}`} className="border-b border-transparent">
                          <td colSpan={7} className="py-3 px-4 text-transparent select-none">-</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination - Only show if there are drafts */}
                {draftActivities.length > projectsPerPage && (
                  <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4">
                    <div className="text-xs text-gray-600 mb-4 sm:mb-0">
                      Showing {startIndex + 1}-{Math.min(endIndex, draftActivities.length)} of {draftActivities.length}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-1 rounded-md border ${currentPage === 1 ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-[#044D5E] border-[#044D5E]/20 hover:bg-[#044D5E]/10'}`}
                      >
                        <ChevronsLeft size={20} />
                      </button>
                      {getVisiblePages().map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 text-xs rounded-md border ${page === currentPage ? 'bg-[#E4F3D1] text-[#044D5E] border-[#E4F3D1]' : 'text-[#044D5E] border-[#044D5E]/20 hover:bg-[#044D5E]/10'}`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-1 rounded-md border ${currentPage === totalPages ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-[#044D5E] border-[#044D5E]/20 hover:bg-[#044D5E]/10'}`}
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

      {/* Floating Help Button */}
      <div className="fixed bottom-5 right-1 flex flex-col items-center z-50">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-md shadow-md mb-2 relative cursor-pointer">
          need help?
          <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></span>
        </div>
        <button className="bg-white shadow-lg border border-gray-200 p-3 rounded-full flex items-center justify-center hover:scale-110 transition">
          <Image src={message_circle_more} alt="Help" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default Page;