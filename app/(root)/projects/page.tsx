'use client';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import { folder, message_circle_more, forest1, forest2, forest3, forest4, forest5, forest6, forest7, forest8, forest9, forest10 } from '@/public';
import { BadgeCheck, ChevronDown, ChevronUp, MapPin, Plus, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Filter options data
const locations = [
  'All',
  'Kwale', 'Kilifi', 'Mombasa', 'Tana River',
  'Narok', 'Kajiado', 'Nakuru', 'Baringo',
  'Kakamega', 'Vihiga', 'Kisumu', 'Siaya',
  'Nyeri', 'Meru', 'Murang’a', 'Nyandarua',
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

// Reusable Status Badge Component
const StatusBadge = ({ status }: { status: ProjectStatus }) => {
    const statusConfig = {
        Active: { bg: 'bg-[#E2FFF2]', border: 'border-[#044D5E]', text: 'text-[#044D5E]' },
        Pending: { bg: 'bg-orange-100', border: 'border-orange-600', text: 'text-orange-700' },
        Completed: { bg: 'bg-emerald-100', border: 'border-emerald-600', text: 'text-emerald-700' },
    };

    const config = statusConfig[status];

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

  // Dropdown open states
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);
  const [locationCategoriesDropdownOpen, setLocationCategoriesDropdownOpen] = useState(false);
  const [carbonCreditsDropdownOpen, setCarbonCreditsDropdownOpen] = useState(false);
  const [khExpertsDropdownOpen, setKhExpertsDropdownOpen] = useState(false);

  // Extract county from location string (e.g., "Gazi Bay, Kwale County" → "Kwale")
  const extractCounty = (location: string): string => {
    const match = location.match(/(?:^|,\s)([A-Za-z\s]+) County$/);
    return match ? match[1].trim() : '';
  };

  // Filtered projects using useMemo for performance
  const filteredProjects = useMemo(() => {
    return dummyProjects.filter(project => {
      const county = extractCounty(project.location);

      const matchesLocation = selectedLocation === 'All' || county === selectedLocation;
      const matchesCategory = selectedLocationCategory === 'All'; // Placeholder - no category field yet
      const matchesStage = selectedCarbonStage === 'Stage'; // Placeholder - no stage field yet
      const matchesExpert = selectedExpert === 'All'; // Placeholder - no expert field yet

      return matchesLocation && matchesCategory && matchesStage && matchesExpert;
    });
  }, [selectedLocation, selectedLocationCategory, selectedCarbonStage, selectedExpert]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filteredProjects.length]);

  // Pagination based on filtered projects
  const totalProjectPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const indexOfLastProject = currentPage * PROJECTS_PER_PAGE;
  const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const handleProjectPageChange = (page: number) => {
    if (page >= 1 && page <= totalProjectPages) {
      setCurrentPage(page);
    }
  };

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
                    My Projects
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
              <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-between gap-4">
                {/* Locations Dropdown */}
                <div className="relative">
                  <div
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer transition hover:bg-gray-50"
                    onClick={() => setLocationsDropdownOpen(!locationsDropdownOpen)}>
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
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-md bg-white shadow-xs z-50 overflow-y-auto max-h-60"
                      >
                        {locations.map((location) => (
                          <div
                            key={location}
                            onClick={() => {
                              setSelectedLocation(location);
                              setLocationsDropdownOpen(false);
                            }}
                            className={`px-3 py-2 text-xs text-gray-700 hover:bg-green-50 cursor-pointer transition ${selectedLocation === location ? 'bg-green-100 font-medium' : ''}`}
                          >
                            {location}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Location Category */}
                <div className="relative">
                  <div
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer transition hover:bg-gray-50"
                    onClick={() => setLocationCategoriesDropdownOpen(!locationCategoriesDropdownOpen)}
                  >
                    <div className="text-left">
                      <p className="text-xs text-gray-500 font-medium">Location Category</p>
                      <p className="text-xs font-semibold text-gray-900">{selectedLocationCategory}</p>
                    </div>
                    {locationCategoriesDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                  <AnimatePresence>
                    {locationCategoriesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-md bg-white shadow-xs z-50"
                      >
                        {locationCategories.map((category) => (
                          <div
                            key={category}
                            onClick={() => {
                              setSelectedLocationCategory(category);
                              setLocationCategoriesDropdownOpen(false);
                            }}
                            className={`px-3 py-2 text-xs text-gray-700 hover:bg-green-50 cursor-pointer transition ${selectedLocationCategory === category ? 'bg-green-100 font-medium' : ''}`}
                          >
                            {category}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Carbon Credits */}
                <div className="relative">
                  <div
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer transition hover:bg-gray-50"
                    onClick={() => setCarbonCreditsDropdownOpen(!carbonCreditsDropdownOpen)}
                  >
                    <div className="text-left">
                      <p className="text-xs text-gray-500 font-medium">Carbon Credits</p>
                      <p className="text-xs font-semibold text-gray-900">{selectedCarbonStage}</p>
                    </div>
                    {carbonCreditsDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                  <AnimatePresence>
                    {carbonCreditsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-md bg-white shadow-xs z-50"
                      >
                        {carbonCreditStages.map((stage) => (
                          <div
                            key={stage}
                            onClick={() => {
                              setSelectedCarbonStage(stage);
                              setCarbonCreditsDropdownOpen(false);
                            }}
                            className={`px-3 py-2 text-xs text-gray-700 hover:bg-green-50 cursor-pointer transition ${selectedCarbonStage === stage ? 'bg-green-100 font-medium' : ''}`}
                          >
                            {stage}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* KH Experts */}
                <div className="relative">
                  <div
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer transition hover:bg-gray-50"
                    onClick={() => setKhExpertsDropdownOpen(!khExpertsDropdownOpen)}
                  >
                    <div className="text-left">
                      <p className="text-xs text-gray-500 font-medium">KH Experts</p>
                      <p className="text-xs font-semibold text-gray-900">{selectedExpert}</p>
                    </div>
                    {khExpertsDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                  <AnimatePresence>
                    {khExpertsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-md bg-white shadow-xs z-50"
                      >
                        {khExperts.map((expert) => (
                          <div
                            key={expert}
                            onClick={() => {
                              setSelectedExpert(expert);
                              setKhExpertsDropdownOpen(false);
                            }}
                            className={`px-3 py-2 text-xs text-gray-700 hover:bg-green-50 cursor-pointer transition ${selectedExpert === expert ? 'bg-green-100 font-medium' : ''}`}
                          >
                            {expert}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Project Cards Grid */}
              <div className="grid grid-cols-1 gap-8">
                {currentProjects.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    No projects found matching the selected filters.
                  </div>
                ) : (
                  currentProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="block bg-white grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="relative">
                        <Image
                          src={project.image}
                          alt={project.title}
                          className="w-full h-54 md:h-80 object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-8 right-0 flex justify-center pointer-events-none">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg"
                          >
                            <MapPin color='#fff' size={16} />
                            <span className="text-white text-xs font-medium drop-shadow-md">
                              {project.location}
                            </span>
                          </motion.div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between px-2 py-6 space-y-6">
                        <div className="space-y-4">
                          <div>
                            <h1 className="text-sm md:text-xl font-medium text-teal-900 hover:text-teal-700 transition-colors">
                              {project.title}
                            </h1>
                            <p className="text-xs md:text-sm">
                              <span className="text-[#1ECEC9]">Last Updated:</span> {project.lastUpdated}
                            </p>
                          </div>

                          <div>
                            <span className="text-xs text-gray-600">Categories</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.categories.map((cat, i) => (
                                <span key={i} className="px-5 py-2 bg-[#F3F4F9] rounded-full text-xs">{cat}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="w-full space-y-2">
                          <div className="flex justify-between text-xs">
                            <p className="text-gray-600">Overall Progress</p>
                            <p className="font-semibold text-teal-700">{project.progress}%</p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-[#1ECEC9] to-[#B1CA69] rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${project.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col items-center justify-between py-8 gap-6 px-6">
                        <div className="flex items-center gap-2 text-xs">
                          <span>KGFT Alignment</span>
                          <BadgeCheck color="#ffffff" fill="#1ECEC9" />
                        </div>
                        <StatusBadge status={project.status} />
                      </div>
                    </Link>
                  ))
                )}
              </div>

              {/* Pagination */}
              {filteredProjects.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center w-full px-6 py-4">
                  <div className="text-xs text-gray-600 mb-4 sm:mb-0">
                    Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} projects
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
                    {Array.from({ length: totalProjectPages }, (_, i) => i + 1).map((page) => (
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