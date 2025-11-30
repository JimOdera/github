'use client';

import Header from '@/app/components/Header';
// import Sidebar from '@/app/components/Sidebar';
import { folder, message_circle_more, user1, user2, user3, user4, user5, user6 } from '@/public';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Filter options
const locations = ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];
const locationCategories = ['All', 'Continent', 'Country', 'Region', 'City'];
const carbonCreditStages = ['All', 'Planning', 'Validation', 'Implementation', 'Verification', 'Issuance'];
const khExperts = ['All', 'Iris West', 'John Doe', 'Alex Johnson', 'Emily Brown', 'Sarah Wilson', 'Michael Glen'];

// Enhanced Expert Data with category & stage
const expertsData = [
  {
    id: 1,
    name: 'Iris West',
    title: 'Environmental Consultant',
    company: 'Eco Solutions',
    location: 'East Africa',
    continent: 'Africa',
    category: 'Region',
    stage: 'Implementation',
    experience: '5 Years Experience',
    image: user1,
    description: 'Specialist in carbon credit project development across East Africa with focus on reforestation.',
  },
  {
    id: 2,
    name: 'John Doe',
    title: 'Carbon Project Lead',
    company: 'GreenFuture Ltd',
    location: 'West Africa',
    continent: 'Africa',
    category: 'Region',
    stage: 'Verification',
    experience: '8 Years Experience',
    image: user2,
    description: 'Expert in mangrove restoration and blue carbon projects. Led 12 successful VERRA registrations.',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    title: 'Renewable Energy Specialist',
    company: 'SolarPeak',
    location: 'United States',
    continent: 'North America',
    category: 'Country',
    stage: 'Issuance',
    experience: '10 Years Experience',
    image: user3,
    description: 'Focuses on community-based solar and wind projects with integrated carbon offset programs.',
  },
  {
    id: 4,
    name: 'Emily Brown',
    title: 'Sustainability Director',
    company: 'EarthWorks',
    location: 'Indonesia',
    continent: 'Asia',
    category: 'Country',
    stage: 'Validation',
    experience: '7 Years Experience',
    image: user4,
    description: 'Leads large-scale afforestation initiatives in Southeast Asia. Gold Standard certified expert.',
  },
  {
    id: 5,
    name: 'Sarah Wilson',
    title: 'Climate Policy Advisor',
    company: 'ClimateAction NGO',
    location: 'Germany',
    continent: 'Europe',
    category: 'Country',
    stage: 'Planning',
    experience: '12 Years Experience',
    image: user5,
    description: 'Advises governments and corporations on Article 6 compliance and voluntary carbon markets.',
  },
  {
    id: 6,
    name: 'Michael Glen',
    title: 'Regenerative Agriculture Expert',
    company: 'SoilHealth Co',
    location: 'Brazil',
    continent: 'South America',
    category: 'Country',
    stage: 'Implementation',
    experience: '6 Years Experience',
    image: user6,
    description: 'Pioneer in soil carbon sequestration through regenerative farming practices in Brazil and Argentina.',
  },
];

const Experts = () => {
  // Sidebar state
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed');
      return saved ? JSON.parse(saved) as boolean : true;
    }
    return true;
  });

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedExpert, setSelectedExpert] = useState('All');

  // Dropdown states
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);
  const [locationCategoriesDropdownOpen, setLocationCategoriesDropdownOpen] = useState(false);
  const [carbonCreditsDropdownOpen, setCarbonCreditsDropdownOpen] = useState(false);
  const [khExpertsDropdownOpen, setKhExpertsDropdownOpen] = useState(false);

  const contentMarginLeft = isCollapsed ? 'md:ml-8' : 'md:ml-8';
  // const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';
  const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'}`;

  // const toggleSidebar = () => {
  //   const newState = !isCollapsed;
  //   setIsCollapsed(newState);
  //   localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  // };

  // Comprehensive filtering logic
  const filteredExperts = useMemo(() => {
    return expertsData.filter((expert) => {
      // Location filter (continent level)
      const matchesLocation =
        selectedLocation === 'All' ||
        expert.continent === selectedLocation ||
        expert.location.includes(selectedLocation);

      // Location Category filter
      const matchesCategory =
        selectedCategory === 'All' || expert.category === selectedCategory;

      // Carbon Credit Stage filter
      const matchesStage =
        selectedStage === 'All' || expert.stage === selectedStage;

      // Expert name filter
      const matchesExpert =
        selectedExpert === 'All' || expert.name === selectedExpert;

      return matchesLocation && matchesCategory && matchesStage && matchesExpert;
    });
  }, [selectedLocation, selectedCategory, selectedStage, selectedExpert]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
      <div className="flex-1 flex flex-col relative z-10">
        <Header />

        <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
          {/* Hero Section */}
          <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20 transition-all duration-300 ease-in-out">
            <Image src="/images/projects/summary.png" alt="Summary Banner" fill />
            <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
              <div className="flex items-end justify-between w-full">
                <div className={`flex flex-col items-start ${contentMarginLeft} ${sectionTextContainerClass}`}>
                  <Image src={folder} alt="folder Icon" className="block md:hidden w-4 h-4 mb-2 cursor-pointer" />
                  <h2 className="text-lg md:text-3xl font-medium text-teal-900 transition-transform duration-300 ease-in-out origin-left">
                    Connect to Experts from Various Fields
                  </h2>
                  <Link
                  href="/experts/forms"
                  className="bg-[#E2FFF2] hover:bg-[#E2FFF2]/90 text-xs text-[#044D5E] border border-[#044D5E] px-5 py-2 rounded-md flex items-center gap-2"
                >
                  <Plus size={16} /> Register as an Experts
                </Link>
                </div>
                {/* <Link
                  href="/projects/forms"
                  className="bg-[#E2FFF2] hover:bg-[#E2FFF2]/90 text-xs text-[#044D5E] border border-[#044D5E] px-5 py-2 rounded-md flex items-center gap-2"
                >
                  <Plus size={16} /> Register as an Experts
                </Link> */}
              </div>
            </div>
          </section>

          {/* <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} /> */}

          <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
            <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8">

              {/* Filters - All Now Fully Functional */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* Locations Filter */}
                <div className="relative">
                  <div
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
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
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                      >
                        {locations.map((loc) => (
                          <div
                            key={loc}
                            onClick={() => {
                              setSelectedLocation(loc);
                              setLocationsDropdownOpen(false);
                            }}
                            className="px-3 py-2 text-xs hover:bg-green-50 cursor-pointer transition"
                          >
                            {loc}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Location Category Filter */}
                <div className="relative">
                  <div
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => setLocationCategoriesDropdownOpen(!locationCategoriesDropdownOpen)}
                  >
                    <div className="text-left">
                      <p className="text-xs text-gray-500 font-medium">Location Category</p>
                      <p className="text-xs font-semibold text-gray-900">{selectedCategory}</p>
                    </div>
                    {locationCategoriesDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                  <AnimatePresence>
                    {locationCategoriesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                      >
                        {locationCategories.map((cat) => (
                          <div
                            key={cat}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setLocationCategoriesDropdownOpen(false);
                            }}
                            className="px-3 py-2 text-xs hover:bg-green-50 cursor-pointer transition"
                          >
                            {cat}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Carbon Credit Stage Filter */}
                <div className="relative">
                  <div
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => setCarbonCreditsDropdownOpen(!carbonCreditsDropdownOpen)}
                  >
                    <div className="text-left">
                      <p className="text-xs text-gray-500 font-medium">Carbon Credits</p>
                      <p className="text-xs font-semibold text-gray-900">{selectedStage}</p>
                    </div>
                    {carbonCreditsDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                  <AnimatePresence>
                    {carbonCreditsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                      >
                        {carbonCreditStages.map((stage) => (
                          <div
                            key={stage}
                            onClick={() => {
                              setSelectedStage(stage);
                              setCarbonCreditsDropdownOpen(false);
                            }}
                            className="px-3 py-2 text-xs hover:bg-green-50 cursor-pointer transition"
                          >
                            {stage}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* KH Experts Filter */}
                <div className="relative">
                  <div
                    className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
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
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                      >
                        {khExperts.map((expert) => (
                          <div
                            key={expert}
                            onClick={() => {
                              setSelectedExpert(expert);
                              setKhExpertsDropdownOpen(false);
                            }}
                            className="px-3 py-2 text-xs hover:bg-green-50 cursor-pointer transition"
                          >
                            {expert}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Experts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredExperts.map((expert) => (
                  <div
                    key={expert.id}
                    className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-3 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Image
                        src={expert.image}
                        alt={expert.name}
                        width={120}
                        height={120}
                        className="rounded-full object-cover border-4 border-white shadow-md"
                      />
                      <div className="flex flex-wrap gap-2 justify-center">
                        <span className="bg-green-100 text-green-700 text-[10px] py-1 px-2 rounded-full">
                          {expert.location}
                        </span>
                        <span className="bg-green-100 text-green-700 text-[10px] py-1 px-2 rounded-full">
                          {expert.experience}
                        </span>
                        <span className="bg-blue-100 text-blue-700 text-[10px] py-1 px-2 rounded-full">
                          {expert.stage}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between flex-1 space-y-3 col-span-2">
                      <div>
                        <h3 className="text-2xl font-semibold text-teal-900">{expert.name}</h3>
                        <p className="text-sm text-gray-500">{expert.title}</p>
                        <p className="text-sm text-gray-400">{expert.company}</p>
                        <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                          {expert.description}
                        </p>
                      </div>

                      <div className="flex gap-4 pt-2">
                        <button className="text-teal-700 hover:underline text-sm font-medium">
                          Learn More
                        </button>
                        <button className="bg-teal-800 text-white px-5 py-2 rounded-md text-xs font-medium hover:bg-teal-900 transition">
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredExperts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No experts found matching your filters.
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-5 right-5 flex flex-col items-center">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
          need help?
          <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></span>
        </div>
        <button className="bg-white shadow-lg border border-gray-200 p-3 rounded-full hover:scale-110 transition">
          <Image src={message_circle_more} alt="Help" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Experts;