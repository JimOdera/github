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
import Link from 'next/link';
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActivityCardData {
  id: string;
  title: string;
  category: string;
  sdgs?: string;
  status: string;
  entityName?: string;
  lastUpdated?: string;
  location?: string;
  locationCategory?: string;
  carbonStage?: string;
  expert?: string;
  hasProgress?: boolean;
  progress?: number;
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
      {/* Header */}
      <div
        className="px-6 py-5 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-teal-900">
              {card.title}
            </h3>
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
          <div>
            <span className="text-gray-500">Status:</span>{' '}
            <span className="font-medium text-teal-700">{card.status}</span>
          </div>
          {card.entityName && (
            <div>
              <span className="text-gray-500">Entity:</span>{' '}
              <span className="font-medium text-gray-900">{card.entityName}</span>
            </div>
          )}
          {card.lastUpdated && (
            <div>
              <span className="text-gray-500">Last Updated:</span>{' '}
              <span className="font-medium text-gray-900">{card.lastUpdated}</span>
            </div>
          )}
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
                        animate={{ width: `${card.progress || 100}%` }}
                        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                      />
                    </div>
                    <p className="mt-2 text-xs font-bold text-teal-900">
                      {card.progress || 100}% of target achieved
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <div className="flex flex-wrap gap-3">
                  <button className="bg-[#D3A029] hover:bg-[#D3A029]/90 text-white text-xs font-medium px-6 py-2.5 rounded-lg transition">
                    Zero Hunger
                  </button>
                  <button className="bg-[#48773E] hover:bg-[#48773E]/90 text-white text-xs font-medium px-6 py-2.5 rounded-lg transition">
                    Climate Action
                  </button>
                </div>

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

  const [isMounted, setIsMounted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const contentMarginLeft = isCollapsed ? 'md:ml-28' : 'md:ml-58';
  const sectionTextContainerClass = `space-y-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'scale-x-110' : 'scale-x-100'}`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ONLY SUBMITTED ACTIVITIES — NO DUMMY DATA
  const submittedActivities = useMemo<ActivityCardData[]>(() => {
    if (!isMounted) return [];

    const activities: ActivityCardData[] = [];

    try {
      const stored = localStorage.getItem('submittedActivities');
      if (!stored) return [];

      const submitted = JSON.parse(stored);
      if (!Array.isArray(submitted)) return [];

      submitted.forEach((activity: any) => {
        const overview = activity.overview || {};
        const details = activity.activityDetails || {};
        const timestampMatch = activity.id.match(/_(\d+)_\w+/);
        const timestamp = timestampMatch ? Number(timestampMatch[1]) : Date.now();

        const sdgs = overview.sdgs
          ? overview.sdgs
              .filter((s: any) => s.selected)
              .map((s: any) => s.id)
              .join(', ')
          : undefined;

        activities.push({
          id: activity.id,
          title: overview.entityName || 'Untitled Activity',
          category: details.selectedCategory || 'General',
          sdgs,
          status: 'Completed',
          entityName: overview.entityName,
          lastUpdated: new Date(timestamp).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          location: overview.orgCountry || 'Global',
          locationCategory: 'Country',
          carbonStage: 'Implementation',
          expert: 'KH Verified',
          hasProgress: true,
          progress: 100,
        });
      });
    } catch (error) {
      console.error('Error loading submitted activities:', error);
    }

    return activities;
  }, [isMounted]);

  const filteredCards = useMemo(() => {
    return submittedActivities.filter(card => {
      const matchesSearch =
        searchQuery === '' ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (card.entityName?.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchLocation = selectedLocation === 'All' || card.location === selectedLocation;
      const matchCategory = selectedLocationCategory === 'All' || card.locationCategory === selectedLocationCategory;
      const matchStage = selectedCarbonStage === 'Stage' || card.carbonStage === selectedCarbonStage;
      const matchExpert = selectedExpert === 'All' || card.expert === selectedExpert;

      return matchesSearch && matchLocation && matchCategory && matchStage && matchExpert;
    });
  }, [submittedActivities, searchQuery, selectedLocation, selectedLocationCategory, selectedCarbonStage, selectedExpert]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
        <Header />
        <div className="flex-1 flex items-center justify-center text-gray-600">
          Loading activities...
        </div>
      </div>
    );
  }

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
                  Activities ({submittedActivities.length})
                </h2>
                <span className="text-xs text-teal-700">Activities / Listed Items</span>
              </div>
            </div>
          </section>

          <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

          <main className="w-full space-y-6 bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">
            <div className="w-full mx-auto px-2 py-4 md:px-8 md:py-6 space-y-8">

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

              {/* FILTER DROPDOWNS - 100% unchanged */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  >
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
                          {['All', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'].map(loc => (
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
                          {['All', 'Continent', 'Country', 'Region', 'City'].map(cat => (
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
                          {['Stage', 'Planning', 'Validation', 'Implementation', 'Verification', 'Issuance'].map(stage => (
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
                          {['All', 'John Smith', 'Jane Doe', 'Alex Johnson', 'Emily Brown', 'Sarah Wilson'].map(expert => (
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

              {/* REAL SUBMITTED ACTIVITIES ONLY */}
              <div className="space-y-6">
                {filteredCards.length === 0 ? (
                  <div className="text-center py-16 bg-white/80 rounded-xl border border-gray-200">
                    <p className="text-gray-500 text-lg">No submitted activities yet.</p>
                    <Link href="/activities/create-activities" className="mt-4 inline-block text-[#044D5E] font-medium underline">
                      Create your first activity
                    </Link>
                  </div>
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