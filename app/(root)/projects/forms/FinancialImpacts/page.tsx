'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, DollarSign, TrendingUp, Leaf } from 'lucide-react';

const FinancialImpacts = () => {
    const [bankingStageDropdownOpen, setBankingStageDropdownOpen] = useState(false);
    const [carbonStageDropdownOpen, setCarbonStageDropdownOpen] = useState(false);
    const [roadblocksSelected, setRoadblocksSelected] = useState<boolean | null>(null);
    const [carbonRevenueSelected, setCarbonRevenueSelected] = useState<boolean | null>(null);
    const [assessmentSelected, setAssessmentSelected] = useState<boolean | null>(null);
    const [activeSection, setActiveSection] = useState<string>('Use of Proceeds');

    const sectionRefs = {
        'Use of Proceeds': useRef<HTMLDivElement>(null),
        'Project Stage & Financials': useRef<HTMLDivElement>(null),
        'Carbon Revenue Potentials': useRef<HTMLDivElement>(null),
    };

    const bankingStages = [
        'Under Review',
        'Approved-Pending drawdown',
        'In Progress- %drawn down',
        'Completed',
    ];

    const carbonRevenueStages = [
        'Not yet assessed',
        'Feasibility/Preliminary Assessment',
        'Methodology developed',
        'Validation/Verification in Progress',
        'Credit Issued',
        'Revenue Realized',
    ];

    const handleNavClick = (section: string) => {
        setActiveSection(section);
        const sectionRef = sectionRefs[section as keyof typeof sectionRefs].current;
        if (sectionRef) {
            sectionRef.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.getAttribute('data-section')!);
                    }
                });
            },
            { threshold: 0.5 }
        );

        Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs).forEach((ref) => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

    return (
        <div className="w-full mx-auto px-2 md:px-6 py-0 space-y-6">
            <div className="flex gap-4">
                {/* Sticky Sidebar Navigation */}
                <div className="w-72 hidden md:flex flex-col gap-2 sticky top-38 self-start">
                    <h1 className="text-lg font-semibold text-gray-600">Content</h1>
                    <div className="flex flex-col gap-1">
                        {[
                            { name: 'Use of Proceeds', icon: DollarSign },
                            { name: 'Project Stage & Financials', icon: TrendingUp },
                            { name: 'Carbon Revenue Potentials', icon: Leaf },
                        ].map(({ name, icon: Icon }) => (
                            <div
                                key={name}
                                onClick={() => handleNavClick(name)}
                                className={`flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${activeSection === name
                                    ? 'bg-[#F2F2F2] text-[#044D5E]'
                                    : 'hover:bg-gray-100 text-gray-500'
                                    }`}
                            >
                                <Icon size={16} />
                                <p className="text-xs">{name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <form className="w-full mx-auto px-4 md:px-6 py-0 flex-1 space-y-6">
                    {/* Use of Proceeds Section */}
                    <div ref={sectionRefs['Use of Proceeds']} data-section="Use of Proceeds">
                        <h1 className="text-lg font-medium text-gray-600 mb-6">Use of Proceeds</h1>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">How will proceeds be used?*</p>
                            <textarea
                                className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                                placeholder="E.g., installation of solar panels, conversion to drip irrigation, energy-efficient machinery, afforestation project"
                                name="proceedsUsage"
                                required
                            ></textarea>
                        </div>
                    </div>

                    <hr className="border-t border-gray-200 my-6" />

                    {/* Project Stage & Financials Section */}
                    <div ref={sectionRefs['Project Stage & Financials']} data-section="Project Stage & Financials">
                        <h1 className="text-lg font-medium text-gray-600 mb-6">Project Stage & Financials</h1>
                        <div className="relative mb-6">
                            <p className="text-xs text-gray-700 mb-1 font-medium">Banking Stage*</p>
                            <div
                                className={`
                                    w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                                    cursor-pointer transition-all duration-200
                                    ${bankingStageDropdownOpen
                                        ? 'border border-gray-400 bg-white shadow-sm'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                                onClick={() => setBankingStageDropdownOpen(!bankingStageDropdownOpen)}
                            >
                                <span className="text-gray-600">Select Banking Stage</span>
                                {bankingStageDropdownOpen ? (
                                    <ChevronUp size={18} className="text-gray-400" />
                                ) : (
                                    <ChevronDown size={18} className="text-gray-400" />
                                )}
                            </div>
                            <AnimatePresence>
                                {bankingStageDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                    >
                                        {bankingStages.map((stage, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setBankingStageDropdownOpen(false)}
                                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                            >
                                                {stage}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Percentage Drawn*</p>
                            <input
                                type="number"
                                className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                                placeholder="Enter percentage drawn"
                                name="percentageDrawn"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Tenure (in months/years)*</p>
                            <input
                                type="text"
                                className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                                placeholder="Enter tenure (e.g., 12 months, 2 years)"
                                name="tenure"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Roadblocks/delays?*</p>
                            <div className="flex gap-3 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setRoadblocksSelected(roadblocksSelected === true ? null : true)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${roadblocksSelected === true
                                        ? 'bg-green-100 border-green-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-green-500`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRoadblocksSelected(roadblocksSelected === false ? null : false)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${roadblocksSelected === false
                                        ? 'bg-red-100 border-red-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-red-500`}
                                >
                                    No
                                </button>
                            </div>
                            {roadblocksSelected === true && (
                                <div className="mb-6">
                                    <p className="text-xs text-gray-700 mb-2 font-medium">If Yes, Describe*</p>
                                    <textarea
                                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                                        placeholder="Describe any roadblocks or delays"
                                        name="roadblocksDescription"
                                        required
                                    ></textarea>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="border-t border-gray-200 my-6" />

                    {/* Carbon Revenue Potentials Section */}
                    <div ref={sectionRefs['Carbon Revenue Potentials']} data-section="Carbon Revenue Potentials">
                        <h1 className="text-lg font-medium text-gray-600 mb-6">Carbon Revenue Potentials</h1>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Is there a carbon revenue potential?*</p>
                            <div className="flex gap-3 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setCarbonRevenueSelected(carbonRevenueSelected === true ? null : true)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${carbonRevenueSelected === true
                                        ? 'bg-green-100 border-green-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-green-500`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCarbonRevenueSelected(carbonRevenueSelected === false ? null : false)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${carbonRevenueSelected === false
                                        ? 'bg-red-100 border-red-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-red-500`}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                        <div className="relative mb-6">
                            <p className="text-xs text-gray-700 mb-1 font-medium">Stage of carbon revenue generation*</p>
                            <div
                                className={`
                                    w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                                    cursor-pointer transition-all duration-200
                                    ${carbonStageDropdownOpen
                                        ? 'border border-gray-400 bg-white shadow-sm'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                                onClick={() => setCarbonStageDropdownOpen(!carbonStageDropdownOpen)}
                            >
                                <span className="text-gray-600">Select Stage</span>
                                {carbonStageDropdownOpen ? (
                                    <ChevronUp size={18} className="text-gray-400" />
                                ) : (
                                    <ChevronDown size={18} className="text-gray-400" />
                                )}
                            </div>
                            <AnimatePresence>
                                {carbonStageDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                    >
                                        {carbonRevenueStages.map((stage, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setCarbonStageDropdownOpen(false)}
                                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                            >
                                                {stage}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Estimated Carbon Credit Volume (tCO2e/Year)*</p>
                            <input
                                type="number"
                                className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                                placeholder="Enter estimated carbon credit volume"
                                name="carbonCreditVolume"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Estimated Revenue (USD/year)*</p>
                            <input
                                type="number"
                                className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                                placeholder="Enter estimated revenue"
                                name="estimatedRevenue"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Recommend for Independent Carbon Assessment?*</p>
                            <div className="flex gap-3 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setAssessmentSelected(assessmentSelected === true ? null : true)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${assessmentSelected === true
                                        ? 'bg-green-100 border-green-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-green-500`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAssessmentSelected(assessmentSelected === false ? null : false)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${assessmentSelected === false
                                        ? 'bg-red-100 border-red-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-red-500`}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FinancialImpacts;