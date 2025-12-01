'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import { folder, message_circle_more } from '@/public';
import { BadgeCheck, ChevronDown, ChevronUp, MapPin, Plus, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const locations = [
  'All', 'Kwale', 'Kilifi', 'Mombasa', 'Tana River', 'Narok', 'Kajiado', 'Nakuru', 'Baringo',
  'Kakamega', 'Vihiga', 'Kisumu', 'Siaya', 'Nyeri', 'Meru', 'Murang’a', 'Nyandarua',
  'Makueni', 'Kitui', 'Machakos'
];

const PROJECTS_PER_PAGE = 6;

// Default fallback image (you can replace with your own)
const FALLBACK_IMAGE = "https://via.placeholder.com/600x400/044D5E/FFFFFF?text=No+Image";

const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { bg: string; border: string; text: string }> = {
    'Approved': { bg: 'bg-emerald-100', border: 'border-emerald-600', text: 'text-emerald-700' },
    'In Progress': { bg: 'bg-[#E2FFF2]', border: 'border-[#044D5E]', text: 'text-[#044D5E]' },
    'Pending Review': { bg: 'bg-orange-100', border: 'border-orange-600', text: 'text-orange-700' },
    'Under Review': { bg: 'bg-orange-100', border: 'border-orange-600', text: 'text-orange-700' },
    'Disbursed': { bg: 'bg-emerald-100', border: 'border-emerald-600', text: 'text-emerald-700' },
    'Completed': { bg: 'bg-emerald-100', border: 'border-emerald-600', text: 'text-emerald-700' },
    'Approved-Pending drawdown': { bg: 'bg-emerald-100', border: 'border-emerald-600', text: 'text-emerald-700' },
    default: { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-700' },
  };

  const { bg, border, text } = config[status] || config.default;

  return (
    <span className={`px-5 py-2 ${bg} ${border} border ${text} text-xs font-medium rounded-full whitespace-nowrap`}>
      Status: {status || 'Pending'}
    </span>
  );
};

const Projects = () => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved !== null) setIsCollapsed(JSON.parse(saved));
  }, []);

  // Load only submitted projects + extract first image from imagePreviews
  const submittedProjects = useMemo(() => {
    if (!isMounted) return [];

    const projects: any[] = [];

    try {
      const submittedStr = localStorage.getItem('submittedProjects');
      if (!submittedStr) return [];

      const submitted = JSON.parse(submittedStr);
      if (!Array.isArray(submitted) || submitted.length === 0) return [];

      submitted.forEach((proj: any) => {
        const overview = proj.overview || {};
        const financial = proj.financialImpacts || {};

        // Get first image from imagePreviews array (base64)
        const imagePreviews = overview.imagePreviews || [];
        const firstImage = Array.isArray(imagePreviews) && imagePreviews.length > 0
          ? imagePreviews[0]
          : FALLBACK_IMAGE;

        projects.push({
          id: proj.id,
          title: overview.projectTitle || 'Untitled Project',
          location: overview.county ? `${overview.county} County` : 'Location not set',
          county: overview.county || '',
          lastUpdated: new Date(proj.submittedAt || Date.now()).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          categories: [
            overview.taxonomyCategory || 'Climate Action',
            overview.subCategory || '',
          ].filter(Boolean),
          progress: parseInt(financial.percentageDrawn || '0', 10),
          status: financial.bankingStage || 'Pending Review',
          image: firstImage, // This is now the real base64 or fallback
        });
      });
    } catch (e) {
      console.warn('Failed to load submitted projects', e);
    }

    return projects;
  }, [isMounted]);

  // Redirect if no projects
  useEffect(() => {
    if (isMounted && submittedProjects.length === 0) {
      router.replace('/projects/forms');
    }
  }, [isMounted, submittedProjects.length, router]);

  const filteredProjects = useMemo(() => {
    if (selectedLocation === 'All') return submittedProjects;
    return submittedProjects.filter(p => p.county === selectedLocation);
  }, [submittedProjects, selectedLocation]);

  useEffect(() => setCurrentPage(1), [filteredProjects.length]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';

  if (!isMounted || submittedProjects.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex items-center justify-center">
        <p className="text-gray-600">Redirecting to create your first project...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
      <div className="flex-1 flex flex-col relative z-10">
        <Header />

        <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
          <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20">
            <Image src="/images/projects/summary.png" alt="Banner" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
              <div className="flex items-end justify-between w-full">
                <div className={`flex flex-col items-start ${contentMarginLeft}`}>
                  <h2 className="text-lg md:text-3xl font-medium text-teal-900">
                    My Projects ({submittedProjects.length})
                  </h2>
                  <span className="text-xs text-teal-700">Projects / Submitted</span>
                </div>
                <Link
                  href="/projects/forms"
                  className="bg-[#E2FFF2] hover:bg-[#E2FFF2]/90 text-xs text-[#044D5E] border border-[#044D5E] px-5 py-2 rounded-md flex items-center gap-2"
                >
                  <Plus size={16} /> New Project
                </Link>
              </div>
            </div>
          </section>

          <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

          <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
            <div className="w-full mx-auto px-2 py-8 md:px-8 md:py-6 space-y-8">

              {/* Location Filter */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <div
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => setLocationsDropdownOpen(!locationsDropdownOpen)}
                  >
                    <div className="text-left">
                      <p className="text-xs text-gray-500 font-medium">Filter by County</p>
                      <p className="text-xs font-semibold text-gray-900">{selectedLocation}</p>
                    </div>
                    {locationsDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                  <AnimatePresence>
                    {locationsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-md bg-white shadow-lg z-50 max-h-60 overflow-y-auto"
                      >
                        {locations.map(loc => (
                          <div
                            key={loc}
                            onClick={() => {
                              setSelectedLocation(loc);
                              setLocationsDropdownOpen(false);
                            }}
                            className={`px-3 py-2 text-xs hover:bg-green-50 cursor-pointer ${selectedLocation === loc ? 'bg-green-100 font-medium' : ''}`}
                          >
                            {loc}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Project Cards */}
              <div className="grid grid-cols-1 gap-8">
                {currentProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block bg-white grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-54 md:h-80">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        unoptimized // Required for base64 images in Next.js
                      />
                      <div className="absolute inset-x-0 bottom-8 flex justify-center">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                          <MapPin color="#fff" size={16} />
                          <span className="text-white text-xs font-medium drop-shadow-md">
                            {project.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between p-6 space-y-6">
                      <div className="space-y-4">
                        <h1 className="text-xl font-medium text-teal-900">
                          {project.title}
                        </h1>
                        <p className="text-sm">
                          <span className="text-[#1ECEC9]">Last Updated:</span> {project.lastUpdated}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.categories.map((cat: string, i: number) => (
                            <span key={i} className="px-5 py-2 bg-[#F3F4F9] rounded-full text-xs">{cat}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-gray-600">Funds Drawn</span>
                          <span className="font-bold text-teal-700">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#1ECEC9] to-[#B1CA69] rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${project.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-center gap-6 px-6 py-8">
                      <div className="flex items-center gap-2 text-xs">
                        <span>KGFT Alignment</span>
                        <BadgeCheck color="#fff" fill="#1ECEC9" />
                      </div>
                      <StatusBadge status={project.status} />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 py-6">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded border disabled:opacity-50"
                  >
                    <ChevronsLeft size={20} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded text-sm ${page === currentPage ? 'bg-[#E4F3D1] text-[#044D5E]' : 'hover:bg-gray-100'}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded border disabled:opacity-50"
                  >
                    <ChevronsRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Floating Help */}
      <div className="fixed bottom-5 right-5 flex flex-col items-center z-50">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2">
          need help?
        </div>
        <button className="bg-white shadow-lg p-3 rounded-full border border-gray-200">
          <Image src={message_circle_more} alt="Help" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Projects;