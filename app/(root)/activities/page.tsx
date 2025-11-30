'use client';

import Header from '@/app/components/Header';
import { message_circle_more } from '@/public';
import {
  ChevronDown,
  ChevronRight,
  ListFilter,
  Plus,
  Search,
  ChevronUp,
  BadgeCheck,
} from 'lucide-react';

import Sidebar from '@/app/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link'; // ← Added for navigation
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Filter options
const locations = ['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];
const locationCategories = ['All', 'Continent', 'Country', 'Region', 'City'];
const carbonCreditStages = ['Stage', 'Planning', 'Validation', 'Implementation', 'Verification', 'Issuance'];
const khExperts = ['All', 'John Smith', 'Jane Doe', 'Alex Johnson', 'Emily Brown', 'Sarah Wilson'];

// Activity Card Interface
interface ActivityCardData {
  id: number;
  title: string;
  category: string;
  sdgs?: string;
  status: string;
  stakeholders?: string;
  method?: string;
  hasProgress?: boolean;
  progress?: number;
  location?: string;
  locationCategory?: string;
  carbonStage?: string;
  expert?: string;
}

const CollapsibleActivityCard: React.FC<{ card: ActivityCardData }> = ({ card }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={false}
      animate={{ backgroundColor: isOpen ? '#FFFBE8' : '#F7F7F7' }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`rounded-lg overflow-hidden border border-gray-200 hover:shadow-sm transition-all duration-300
        ${isOpen ? 'ring-1 ring-teal-500/20' : ''}`}
    >
      {/* Header - ONLY this part toggles the card */}
      <div
        className="px-6 py-5 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-teal-900">{card.title}</h3>
            <BadgeCheck fill="#1ECEC9" color="#ffffff" size={24} />
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </motion.div>
        </div>

        <hr className="mt-4 border-gray-200" />

        <div className="mt-4 flex flex-wrap gap-6 text-xs text-gray-700">
          <div>
            <span className="text-gray-500">Category:</span>{' '}
            <span className="font-medium text-gray-900">{card.category}</span>
          </div>
          {card.sdgs && (
            <div>
              <span className="text-gray-500">Aligned SDGs:</span>{' '}
              <span className="font-medium text-gray-900">{card.sdgs}</span>
            </div>
          )}
          {card.stakeholders && (
            <div>
              <span className="text-gray-500">Stakeholders:</span>{' '}
              <span className="font-medium text-gray-900">{card.stakeholders}</span>
            </div>
          )}
          {card.method && (
            <div>
              <span className="text-gray-500">Method:</span>{' '}
              <span className="font-medium text-gray-900">{card.method}</span>
            </div>
          )}
          <div>
            <span className="text-gray-500">Status:</span>{' '}
            <span className="font-medium text-teal-700">{card.status}</span>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-gray-200 bg-white/60"
          >
            <div className="px-6 pb-6 pt-4 space-y-6">
              {card.hasProgress && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800">
                      Progress towards sustainability goals
                    </p>
                    <div className="bg-[#4ABEA6] px-5 py-2 rounded-lg flex items-center gap-2 text-white text-xs font-semibold">
                      <BadgeCheck size={18} fill="white" color="#4ABEA6" />
                      On Track
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Baseline Year: 2018</span>
                    <span>Target year: 2028</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${card.progress || 45}%` }}
                        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                      />
                    </div>
                    <p className="mt-2 text-xs font-bold text-teal-900">
                      {card.progress || 45}% of target achieved
                    </p>
                  </div>
                </div>
              )}

              {/* Buttons Section */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <div className="flex flex-wrap gap-3">
                  <button className="bg-[#D3A029] hover:bg-[#D3A029]/90 text-white text-xs font-medium px-6 py-2.5 rounded-lg transition">
                    Zero Hunger
                  </button>
                  <button className="bg-[#48773E] hover:bg-[#48773E]/90 text-white text-xs font-medium px-6 py-2.5 rounded-lg transition">
                    Climate Action
                  </button>
                </div>

                {/* FIXED: Now navigates to dynamic detail page */}
                <Link
                  href={`/activities/${card.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#044D5E] hover:bg-[#044D5E]/90 text-white text-xs font-medium px-7 py-2.5 rounded-lg flex items-center gap-2 transition shadow-sm"
                >
                  Activity details <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Activities = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed');
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';
  const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'}`;

  const [showFilters, setShowFilters] = useState(false);

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

  const [searchQuery, setSearchQuery] = useState('');

  // 9 Activity Cards
  const activityCards: ActivityCardData[] = useMemo<ActivityCardData[]>(
    () => [
      { id: 1, title: 'Social Impact Activity', category: 'Social Impact', sdgs: '2', status: 'No Resolutions', location: 'Africa', locationCategory: 'Continent', carbonStage: 'Implementation', expert: 'John Smith' },
      { id: 2, title: 'Environmental Impact Activity', category: 'Environmental Impact', sdgs: '13', status: 'Below Standard', hasProgress: true, progress: 45, location: 'Asia', locationCategory: 'Region', carbonStage: 'Verification', expert: 'Jane Doe' },
      { id: 3, title: 'Stakeholder Webinar', category: 'Stakeholder Engagement', stakeholders: 'Investors', method: 'ESG Forums', status: 'Resolutions Available', location: 'Europe', locationCategory: 'Country', carbonStage: 'Planning', expert: 'Alex Johnson' },
      { id: 4, title: 'Material Topics', category: 'Material Topic', sdgs: '5', status: 'Meets Standard', location: 'North America', locationCategory: 'City', carbonStage: 'Issuance', expert: 'Emily Brown' },
      { id: 5, title: 'Human Rights', category: 'Human Rights', sdgs: '8', status: 'Yes', location: 'South America', locationCategory: 'Country', carbonStage: 'Validation', expert: 'Sarah Wilson' },
      { id: 6, title: 'Waste Management', category: 'Waste & Circular Economy', sdgs: '12', status: 'On Track', hasProgress: true, progress: 72, location: 'Oceania', locationCategory: 'Region', carbonStage: 'Implementation', expert: 'John Smith' },
      { id: 7, title: 'E&S Compliance', category: 'Environmental & Social', status: 'Compliant', location: 'Europe', locationCategory: 'Continent', carbonStage: 'Verification', expert: 'Jane Doe' },
      { id: 8, title: 'Custom Metric Tracker', category: 'Reporting & Metrics', status: 'Active', hasProgress: true, progress: 88, location: 'North America', locationCategory: 'Country', carbonStage: 'Planning', expert: 'Alex Johnson' },
      { id: 9, title: 'Procurement Spend Diversity', category: 'Supply Chain', sdgs: '8,10', status: 'In Progress', hasProgress: true, progress: 60, location: 'Asia', locationCategory: 'Region', carbonStage: 'Validation', expert: 'Emily Brown' },
    ],
    []
  );

  const filteredCards = useMemo(() => {
    return activityCards.filter(card => {
      const matchesSearch = searchQuery === '' ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchLocation = selectedLocation === 'All' || card.location === selectedLocation;
      const matchCategory = selectedLocationCategory === 'All' || card.locationCategory === selectedLocationCategory;
      const matchStage = selectedCarbonStage === 'Stage' || card.carbonStage === selectedCarbonStage;
      const matchExpert = selectedExpert === 'All' || card.expert === selectedExpert;

      return matchesSearch && matchLocation && matchCategory && matchStage && matchExpert;
    });
  }, [searchQuery, selectedLocation, selectedLocationCategory, selectedCarbonStage, selectedExpert, activityCards]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
      <div className="flex-1 flex flex-col relative z-10">
        <Header />

        <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
          <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20">
            <Image src="/images/activities/summary2.png" alt="Banner" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
              <div className={`flex flex-col items-start ${contentMarginLeft} ${sectionTextContainerClass}`}>
                <h2 className="text-lg md:text-3xl font-medium text-teal-900">
                  Activities {filteredCards.length}
                </h2>
                <span className="text-xs text-teal-700">Activities / Listed Items</span>
              </div>
            </div>
          </section>

          <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

          <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
            <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8">
              {/* Important Actions */}
              <div className="flex flex-col space-y-6 bg-[#F9FBFC] border border-gray-200 px-4 py-4 md:px-16 md:py-6 rounded-xl">
                <h1 className="text-xl font-semibold text-teal-900">Important Actions (4)</h1>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative flex items-center w-full sm:w-96">
                    <input
                      type="search"
                      placeholder="Search activities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg p-3 pl-10 w-full focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
                    />
                    <Search className="absolute left-3 text-gray-500 w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-6 py-3 bg-white border border-[#044D5E]/20 text-[#044D5E] rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#044D5E]/5 transition"
                  >
                    <ListFilter size={18} />
                    {showFilters ? 'Hide' : 'Open'} Filters
                  </button>
                  <Link href='/activities/create-activities' className="px-6 py-3 bg-[#044D5E] text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#044D5E]/90 transition">
                    <Plus size={18} />
                    Add Activity
                  </Link>
                </div>
              </div>

              {/* FILTER DROPDOWNS */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  >
                    {/* All 4 filter dropdowns remain 100% unchanged */}
                    {/* Locations */}
                    <div className="relative">
                      <div
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                        onClick={() => setLocationsDropdownOpen(!locationsDropdownOpen)}
                      >
                        <div>
                          <p className="text-xs text-gray-500">Locations</p>
                          <p className="text-sm font-semibold text-gray-900">{selectedLocation}</p>
                        </div>
                        {locationsDropdownOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                      {locationsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
                        >
                          {locations.map(loc => (
                            <div
                              key={loc}
                              onClick={() => {
                                setSelectedLocation(loc);
                                setLocationsDropdownOpen(false);
                              }}
                              className={`px-4 py-3 text-sm cursor-pointer hover:bg-teal-50 ${selectedLocation === loc ? 'bg-teal-100 font-medium' : ''}`}
                            >
                              {loc}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {/* Location Categories */}
                    <div className="relative">
                      <div
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                        onClick={() => setLocationCategoriesDropdownOpen(!locationCategoriesDropdownOpen)}
                      >
                        <div>
                          <p className="text-xs text-gray-500">Location Category</p>
                          <p className="text-sm font-semibold text-gray-900">{selectedLocationCategory}</p>
                        </div>
                        {locationCategoriesDropdownOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                      {locationCategoriesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
                        >
                          {locationCategories.map(cat => (
                            <div
                              key={cat}
                              onClick={() => {
                                setSelectedLocationCategory(cat);
                                setLocationCategoriesDropdownOpen(false);
                              }}
                              className={`px-4 py-3 text-sm cursor-pointer hover:bg-teal-50 ${selectedLocationCategory === cat ? 'bg-teal-100 font-medium' : ''}`}
                            >
                              {cat}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {/* Carbon Credit Stages */}
                    <div className="relative">
                      <div
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                        onClick={() => setCarbonCreditsDropdownOpen(!carbonCreditsDropdownOpen)}
                      >
                        <div>
                          <p className="text-xs text-gray-500">Carbon Credit Stage</p>
                          <p className="text-sm font-semibold text-gray-900">{selectedCarbonStage}</p>
                        </div>
                        {carbonCreditsDropdownOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                      {carbonCreditsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
                        >
                          {carbonCreditStages.map(stage => (
                            <div
                              key={stage}
                              onClick={() => {
                                setSelectedCarbonStage(stage);
                                setCarbonCreditsDropdownOpen(false);
                              }}
                              className={`px-4 py-3 text-sm cursor-pointer hover:bg-teal-50 ${selectedCarbonStage === stage ? 'bg-teal-100 font-medium' : ''}`}
                            >
                              {stage}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {/* KH Experts */}
                    <div className="relative">
                      <div
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                        onClick={() => setKhExpertsDropdownOpen(!khExpertsDropdownOpen)}
                      >
                        <div>
                          <p className="text-xs text-gray-500">KH Experts</p>
                          <p className="text-sm font-semibold text-gray-900">{selectedExpert}</p>
                        </div>
                        {khExpertsDropdownOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                      {khExpertsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
                        >
                          {khExperts.map(expert => (
                            <div
                              key={expert}
                              onClick={() => {
                                setSelectedExpert(expert);
                                setKhExpertsDropdownOpen(false);
                              }}
                              className={`px-4 py-3 text-sm cursor-pointer hover:bg-teal-50 ${selectedExpert === expert ? 'bg-teal-100 font-medium' : ''}`}
                            >
                              {expert}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Activity Cards */}
              <div className="space-y-6">
                {filteredCards.length === 0 ? (
                  <p className="text-center py-12 text-gray-500">No activities match the selected filters.</p>
                ) : (
                  filteredCards.map(card => (
                    <CollapsibleActivityCard key={card.id} card={card} />
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center z-50">
        <div className="bg-white text-sm font-medium text-gray-700 px-4 py-2 rounded-full shadow-xl mb-3 animate-pulse">
          need help?
        </div>
        <button className="bg-white shadow-2xl p-4 rounded-full border-4 border-white hover:scale-110 transition-transform">
          <Image src={message_circle_more} alt="Help" width={28} height={28} />
        </button>
      </div>
    </div>
  );
};

export default Activities;