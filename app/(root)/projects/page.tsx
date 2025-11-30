'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import { folder, message_circle_more, forest1, forest2, forest3, forest4, forest5, forest6, forest7, forest8, forest9, forest10 } from '@/public';
import { BadgeCheck, ChevronDown, ChevronUp, MapPin, Plus, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Filter options
const locations = [
  'All', 'Kwale', 'Kilifi', 'Mombasa', 'Tana River', 'Narok', 'Kajiado', 'Nakuru', 'Baringo',
  'Kakamega', 'Vihiga', 'Kisumu', 'Siaya', 'Nyeri', 'Meru', 'Murang’a', 'Nyandarua',
  'Makueni', 'Kitui', 'Machakos'
];
const locationCategories = ['All', 'Continent', 'Country', 'Region', 'City'];
const carbonCreditStages = ['Stage', 'Planning', 'Validation', 'Implementation', 'Verification', 'Issuance'];
const khExperts = ['All', 'John Smith', 'Jane Doe', 'Alex Johnson', 'Emily Brown', 'Sarah Wilson'];

type ProjectStatus = 'Active' | 'Pending' | 'Completed';

const dummyProjects = [
  { id: 1, image: forest1, title: "Mangrove Restoration & Blue Carbon Project", location: "Gazi Bay, Kwale County", lastUpdated: "10th Nov, 2025", categories: ["Blue Carbon", "Mangroves", "Coastal Restoration"], progress: 78, status: 'Active' as ProjectStatus },
  { id: 2, image: forest2, title: "Mikoko Pamoja Community Mangrove Conservation", location: "Gazi & Vanga, Kwale County", lastUpdated: "18th Nov, 2025", categories: ["Community-Led", "Carbon Credits", "Mangroves"], progress: 92, status: 'Active' as ProjectStatus },
  { id: 3, image: forest3, title: "Mount Kenya Forest Rehabilitation Initiative", location: "Nyeri & Meru Counties", lastUpdated: "5th Nov, 2025", categories: ["Reforestation", "Water Catchment", "Biodiversity"], progress: 64, status: 'Active' as ProjectStatus },
  { id: 4, image: forest4, title: "Kakamega Forest Indigenous Tree Planting", location: "Kakamega County", lastUpdated: "22nd Oct, 2025", categories: ["Tropical Rainforest", "Biodiversity Hotspot", "Community"], progress: 71, status: 'Pending' as ProjectStatus },
  { id: 5, image: forest5, title: "Maasai Mara Conservancies Reforestation", location: "Narok County", lastUpdated: "14th Nov, 2025", categories: ["Wildlife Corridors", "Agroforestry", "Community Conservancies"], progress: 55, status: 'Active' as ProjectStatus },
  { id: 6, image: forest6, title: "Aberdare Range Cloud Forest Protection", location: "Nyandarua & Murang’a Counties", lastUpdated: "27th Nov, 2025", categories: ["Water Towers", "REDD+", "Indigenous Forest"], progress: 49, status: 'Pending' as ProjectStatus },
  { id: 7, image: forest7, title: "Lake Victoria Basin Riparian Restoration", location: "Kisumu & Siaya Counties", lastUpdated: "20th Nov, 2025", categories: ["Wetlands", "Water Quality", "Community"], progress: 83, status: 'Active' as ProjectStatus },
  { id: 8, image: forest8, title: "Chyulu Hills REDD+ Carbon Project", location: "Makueni & Kajiado Counties", lastUpdated: "25th Nov, 2025", categories: ["REDD+", "Wildlife", "Volcanic Landscape"], progress: 88, status: 'Completed' as ProjectStatus },
  { id: 9, image: forest9, title: "Arabuko Sokoke Forest Conservation", location: "Kilifi County", lastUpdated: "12th Nov, 2025", categories: ["Coastal Forest", "Endangered Species", "Eco-Tourism"], progress: 67, status: 'Active' as ProjectStatus },
  { id: 10, image: forest10, title: "Tana Delta Wetland & Mangrove Recovery", location: "Tana River County", lastUpdated: "27th Nov, 2025", categories: ["Ramsar Site", "Mangroves", "Flood Mitigation"], progress: 41, status: 'Pending' as ProjectStatus },
];

const PROJECTS_PER_PAGE = 6;

// Status Badge Component
const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const config = {
    Active: { bg: 'bg-[#E2FFF2]', border: 'border-[#044D5E]', text: 'text-[#044D5E]' },
    Pending: { bg: 'bg-orange-100', border: 'border-orange-600', text: 'text-orange-700' },
    Completed: { bg: 'bg-emerald-100', border: 'border-emerald-600', text: 'text-emerald-700' },
  }[status];

  return (
    <span className={`px-5 py-2 ${config.bg} ${config.border} border ${config.text} text-xs font-medium rounded-full whitespace-nowrap`}>
      Status: {status}
    </span>
  );
};

const Projects = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed');
      return saved ? JSON.parse(saved) as boolean : true;
    }
    return true;
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedLocationCategory, setSelectedLocationCategory] = useState('All');
  const [selectedCarbonStage, setSelectedCarbonStage] = useState('Stage');
  const [selectedExpert, setSelectedExpert] = useState('All');

  // Dropdown states
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);
  const [locationCategoriesDropdownOpen, setLocationCategoriesDropdownOpen] = useState(false);
  const [carbonCreditsDropdownOpen, setCarbonCreditsDropdownOpen] = useState(false);
  const [khExpertsDropdownOpen, setKhExpertsDropdownOpen] = useState(false);

  // === Load BOTH submitted projects AND drafts ===
  const realProjects = useMemo(() => {
    const projects: any[] = [];

    // 1. Load submitted projects (final, completed ones)
    try {
      const submittedStr = localStorage.getItem('submittedProjects');
      if (submittedStr) {
        const submitted = JSON.parse(submittedStr);
        if (Array.isArray(submitted)) {
          submitted.forEach((proj: any) => {
            const overview = proj.overview || {};
            const timestamp = proj.id.match(/_(\d+)_\w+/)?.[1];
            const date = timestamp ? new Date(Number(timestamp)).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'short', year: 'numeric'
            }) : 'Recently';

            projects.push({
              id: proj.id,
              title: overview.projectTitle || 'Submitted Project',
              location: overview.county ? `${overview.county} County` : 'Kenya',
              county: overview.county,
              lastUpdated: date,
              categories: [
                overview.taxonomyCategory || 'Climate Action',
                overview.subCategory || ''
              ].filter(Boolean),
              progress: 100,
              status: 'Completed' as ProjectStatus,
              image: null,
              isSubmitted: true
            });
          });
        }
      }
    } catch (e) {
      console.warn('Failed to load submittedProjects');
    }

    // 2. Load in-progress drafts
    Object.keys(localStorage).forEach(key => {
      const match = key.match(/^projectDraft_(.+)_step1$/);
      if (match) {
        const projectId = match[1];
        if (projects.some(p => p.id === projectId)) return; // skip if already submitted

        try {
          const step1Data = JSON.parse(localStorage.getItem(key) || '{}');
          if (step1Data.projectTitle) {
            let filledSteps = 0;
            for (let i = 1; i <= 4; i++) {
              if (localStorage.getItem(`projectDraft_${projectId}_step${i}`)) filledSteps++;
            }
            const progress = Math.round((filledSteps / 4) * 100);

            projects.push({
              id: projectId,
              title: step1Data.projectTitle || 'Untitled Draft',
              location: step1Data.county ? `${step1Data.county} County` : 'Location not set',
              county: step1Data.county,
              lastUpdated: 'In Progress',
              categories: [step1Data.taxonomyCategory || 'Draft'],
              progress,
              status: progress === 100 ? 'Active' : progress >= 50 ? 'Active' : 'Pending',
              image: null,
              isSubmitted: false
            });
          }
        } catch (e) {
          console.warn('Failed to parse draft:', key);
        }
      }
    });

    return projects;
  }, []);

  // Combine: real (submitted + drafts) + dummy
  const allProjects = useMemo(() => {
    const dummies = dummyProjects.map(p => ({
      ...p,
      id: p.id.toString(),
      isDummy: true
    }));
    return [...realProjects, ...dummies];
  }, [realProjects]);

  // Extract county
  const extractCounty = (location: string): string => {
    const match = location.match(/(?:^|,\s)([A-Za-z\s]+) County$/);
    return match ? match[1].trim() : '';
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      const county = extractCounty(project.location || '');
      const matchesLocation = selectedLocation === 'All' || county === selectedLocation;
      const matchesOthers = selectedLocationCategory === 'All' && selectedCarbonStage === 'Stage' && selectedExpert === 'All';
      return matchesLocation && matchesOthers;
    });
  }, [allProjects, selectedLocation, selectedLocationCategory, selectedCarbonStage, selectedExpert]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProjects.length]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIdx = startIdx + PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIdx, endIdx);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';
  const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
      <div className="flex-1 flex-col relative z-10">
        <Header />

        <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
          <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20 transition-all duration-300 ease-in-out">
            <Image src="/images/projects/summary.png" alt="Summary Banner" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
              <div className="flex items-end justify-between w-full">
                <div className={`flex flex-col items-start ${contentMarginLeft} ${sectionTextContainerClass}`}>
                  <Image src={folder} alt="folder Icon" className="block md:hidden w-4 h-4 mb-2 cursor-pointer" />
                  <h2 className="text-lg md:text-3xl font-medium text-teal-900 transition-transform duration-300 ease-in-out origin-left">
                    My Projects ({allProjects.length})
                  </h2>
                  <span className="text-xs text-teal-700 transition-transform duration-300 ease-in-out origin-left">
                    Projects / Listed Items
                  </span>
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
            <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8">

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Locations */}
                <div className="relative">
                  <div
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => setLocationsDropdownOpen(!locationsDropdownOpen)}
                  >
                    <div className="text-left">
                      <p className="text-xs text-gray-500 font-medium">Locations</p>
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
                            onClick={() => { setSelectedLocation(loc); setLocationsDropdownOpen(false); }}
                            className={`px-3 py-2 text-xs hover:bg-green-50 cursor-pointer ${selectedLocation === loc ? 'bg-green-100 font-medium' : ''}`}
                          >
                            {loc}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other filters (collapsed for brevity - you can keep them) */}
                <div className="relative">
                  <div className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => setLocationCategoriesDropdownOpen(!locationCategoriesDropdownOpen)}>
                    <div className="text-left">
                      <p className="text-xs text-gray-500 font-medium">Location Category</p>
                      <p className="text-xs font-semibold text-gray-900">{selectedLocationCategory}</p>
                    </div>
                    {locationCategoriesDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                  {/* Dropdown content... */}
                </div>

                <div className="relative">
                  <div className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => setCarbonCreditsDropdownOpen(!carbonCreditsDropdownOpen)}>
                    <div className="text-left">
                      <p className="text-xs text-gray-500 font-medium">Carbon Credits</p>
                      <p className="text-xs font-semibold text-gray-900">{selectedCarbonStage}</p>
                    </div>
                    {carbonCreditsDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                  {/* Dropdown content... */}
                </div>

                <div className="relative">
                  <div className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    onClick={() => setKhExpertsDropdownOpen(!khExpertsDropdownOpen)}>
                    <div className="text-left">
                      <p className="text-xs text-gray-500 font-medium">KH Experts</p>
                      <p className="text-xs font-semibold text-gray-900">{selectedExpert}</p>
                    </div>
                    {khExpertsDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                  {/* Dropdown content... */}
                </div>
              </div>

              {/* Project Cards */}
              <div className="grid grid-cols-1 gap-8">
                {currentProjects.length === 0 ? (
                  <p className="text-center py-12 text-gray-500">No projects found.</p>
                ) : (
                  currentProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="block bg-white grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative">
                        <Image
                          src={project.image || forest1}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="w-full h-54 md:h-80 object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-8 flex justify-center">
                          <motion.div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                            <MapPin color="#fff" size={16} />
                            <span className="text-white text-xs font-medium drop-shadow-md">
                              {project.location}
                            </span>
                          </motion.div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between p-6 space-y-6">
                        <div className="space-y-4">
                          <h1 className="text-xl font-medium text-teal-900 hover:text-teal-700">
                            {project.title}
                            {project.isSubmitted && <span className="ml-2 text-xs text-emerald-600 font-bold">[Submitted]</span>}
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
                            <span className="text-gray-600">Overall Progress</span>
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

                      <div className="flex flex-col justify-center items-center gap-6 px-6">
                        <div className="flex items-center gap-2 text-xs">
                          <span>KGFT Alignment</span>
                          <BadgeCheck color="#fff" fill="#1ECEC9" />
                        </div>
                        <StatusBadge status={project.status} />
                      </div>
                    </Link>
                  ))
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 py-6">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronsLeft size={20} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded text-sm font-medium ${page === currentPage ? 'bg-[#E4F3D1] text-[#044D5E]' : 'hover:bg-gray-100'}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronsRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 flex flex-col items-center z-50">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
          need help?
          <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></span>
        </div>
        <button className="bg-white shadow-lg p-3 rounded-full border border-gray-200 hover:shadow-xl transition">
          <Image src={message_circle_more} alt="Help" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Projects;