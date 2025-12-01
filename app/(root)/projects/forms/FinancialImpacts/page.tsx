'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, DollarSign, TrendingUp, Leaf } from 'lucide-react';

interface FinancialImpactsProps {
    projectId: string;
}

const FinancialImpacts = ({ projectId }: FinancialImpactsProps) => {
    // Form States
    const [proceedsUsage, setProceedsUsage] = useState('');
    const [bankingStage, setBankingStage] = useState('');
    const [percentageDrawn, setPercentageDrawn] = useState('');
    const [tenure, setTenure] = useState('');
    const [roadblocksSelected, setRoadblocksSelected] = useState<boolean | null>(null);
    const [roadblocksDescription, setRoadblocksDescription] = useState('');
    const [carbonRevenueSelected, setCarbonRevenueSelected] = useState<boolean | null>(null);
    const [carbonStage, setCarbonStage] = useState('');
    const [carbonCreditVolume, setCarbonCreditVolume] = useState('');
    const [estimatedRevenue, setEstimatedRevenue] = useState('');
    const [assessmentSelected, setAssessmentSelected] = useState<boolean | null>(null);

    // Dropdown states
    const [bankingStageDropdownOpen, setBankingStageDropdownOpen] = useState(false);
    const [carbonStageDropdownOpen, setCarbonStageDropdownOpen] = useState(false);

    // Navigation
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
        sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Intersection Observer for active section highlighting
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const section = entry.target.getAttribute('data-section');
                        if (section) setActiveSection(section);
                    }
                });
            },
            { threshold: 0.5, rootMargin: '-10% 0px -60% 0px' }
        );

        Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            Object.values(sectionRefs).forEach((ref) => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, []);

    // === UNIQUE STORAGE KEY FOR THIS PROJECT + STEP 2 ===
    const storageKey = `projectDraft_${projectId}_step2`;

    // Auto-save draft (debounced) — per project
    useEffect(() => {
        const saveDraft = () => {
            const draft = {
                proceedsUsage,
                bankingStage,
                percentageDrawn,
                tenure,
                roadblocksSelected,
                roadblocksDescription,
                carbonRevenueSelected,
                carbonStage,
                carbonCreditVolume,
                estimatedRevenue,
                assessmentSelected,
            };
            localStorage.setItem(storageKey, JSON.stringify(draft));
        };

        const timeoutId = setTimeout(saveDraft, 600);
        return () => clearTimeout(timeoutId);
    }, [
        proceedsUsage,
        bankingStage,
        percentageDrawn,
        tenure,
        roadblocksSelected,
        roadblocksDescription,
        carbonRevenueSelected,
        carbonStage,
        carbonCreditVolume,
        estimatedRevenue,
        assessmentSelected,
        projectId,
    ]);

    // Load draft on mount — only for this project
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                const draft = JSON.parse(saved);
                setProceedsUsage(draft.proceedsUsage || '');
                setBankingStage(draft.bankingStage || '');
                setPercentageDrawn(draft.percentageDrawn || '');
                setTenure(draft.tenure || '');
                setRoadblocksSelected(draft.roadblocksSelected ?? null);
                setRoadblocksDescription(draft.roadblocksDescription || '');
                setCarbonRevenueSelected(draft.carbonRevenueSelected ?? null);
                setCarbonStage(draft.carbonStage || '');
                setCarbonCreditVolume(draft.carbonCreditVolume || '');
                setEstimatedRevenue(draft.estimatedRevenue || '');
                setAssessmentSelected(draft.assessmentSelected ?? null);
            } catch (e) {
                console.warn('Failed to load Step 2 draft for project:', projectId);
            }
        }
    }, [projectId, storageKey]);

    return (
        <div className="w-full mx-auto px-2 md:px-6 py-0 space-y-6">
            <div className="flex gap-8">
                {/* Sticky Sidebar */}
                <aside className="hidden lg:block w-72 flex-shrink-0">
                    <div className="sticky top-42 space-y-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Form Sections
                        </h3>
                        <nav className="space-y-1">
                            {[
                                { name: 'Use of Proceeds', icon: DollarSign },
                                { name: 'Project Stage & Financials', icon: TrendingUp },
                                { name: 'Carbon Revenue Potentials', icon: Leaf },
                            ].map(({ name, icon: Icon }) => (
                                <button
                                    key={name}
                                    onClick={() => handleNavClick(name)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                                        activeSection === name
                                            ? 'bg-[#F2F2F2] text-[#044D5E] font-medium shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span className="text-xs">{name}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Form Content */}
                <div className="w-full flex-1 space-y-6">
                    {/* Use of Proceeds */}
                    <div ref={sectionRefs['Use of Proceeds']} data-section="Use of Proceeds">
                        <h1 className="text-lg font-medium text-gray-600 mb-6">Use of Proceeds</h1>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">How will proceeds be used?*</p>
                            <textarea
                                value={proceedsUsage}
                                onChange={(e) => setProceedsUsage(e.target.value)}
                                className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                                placeholder="E.g., installation of solar panels, conversion to drip irrigation..."
                            />
                        </div>
                    </div>

                    <hr className="border-t border-gray-200 my-6" />

                    {/* Project Stage & Financials */}
                    <div ref={sectionRefs['Project Stage & Financials']} data-section="Project Stage & Financials">
                        <h1 className="text-lg font-medium text-gray-600 mb-6">Project Stage & Financials</h1>

                        {/* Banking Stage */}
                        <div className="relative mb-6">
                            <p className="text-xs text-gray-700 mb-1 font-medium">Banking Stage*</p>
                            <div
                                className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all duration-200 border ${
                                    bankingStageDropdownOpen
                                        ? 'border-gray-400 bg-white shadow-sm'
                                        : 'border-gray-300 hover:bg-gray-50'
                                }`}
                                onClick={() => setBankingStageDropdownOpen(!bankingStageDropdownOpen)}
                            >
                                <span className={bankingStage ? 'text-gray-900' : 'text-gray-600'}>
                                    {bankingStage || 'Select Banking Stage'}
                                </span>
                                {bankingStageDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                            <AnimatePresence>
                                {bankingStageDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                    >
                                        {bankingStages.map((stage) => (
                                            <div
                                                key={stage}
                                                onClick={() => {
                                                    setBankingStage(stage);
                                                    setBankingStageDropdownOpen(false);
                                                }}
                                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                                            >
                                                {stage}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-gray-700 mb-2 font-medium">Percentage Drawn*</p>
                                <input
                                    type="number"
                                    value={percentageDrawn}
                                    onChange={(e) => setPercentageDrawn(e.target.value)}
                                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400"
                                    placeholder="e.g. 45"
                                />
                            </div>
                            <div>
                                <p className="text-xs text-gray-700 mb-2 font-medium">Tenure (in months/years)*</p>
                                <input
                                    type="text"
                                    value={tenure}
                                    onChange={(e) => setTenure(e.target.value)}
                                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400"
                                    placeholder="e.g. 24 months"
                                />
                            </div>
                        </div>

                        {/* Roadblocks */}
                        <div className="mt-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Roadblocks/delays?*</p>
                            <div className="flex gap-3 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setRoadblocksSelected(true)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium transition-colors ${
                                        roadblocksSelected === true
                                            ? 'bg-green-100 border-green-500 text-green-700'
                                            : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRoadblocksSelected(false)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium transition-colors ${
                                        roadblocksSelected === false
                                            ? 'bg-red-100 border-red-500 text-red-700'
                                            : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    No
                                </button>
                            </div>
                            {roadblocksSelected === true && (
                                <textarea
                                    value={roadblocksDescription}
                                    onChange={(e) => setRoadblocksDescription(e.target.value)}
                                    className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 mt-2"
                                    placeholder="Describe any roadblocks or delays"
                                />
                            )}
                        </div>
                    </div>

                    <hr className="border-t border-gray-200 my-6" />

                    {/* Carbon Revenue Potentials */}
                    <div ref={sectionRefs['Carbon Revenue Potentials']} data-section="Carbon Revenue Potentials">
                        <h1 className="text-lg font-medium text-gray-600 mb-6">Carbon Revenue Potentials</h1>

                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Is there a carbon revenue potential?*</p>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setCarbonRevenueSelected(true)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium transition-colors ${
                                        carbonRevenueSelected === true
                                            ? 'bg-green-100 border-green-500 text-green-700'
                                            : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCarbonRevenueSelected(false)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium transition-colors ${
                                        carbonRevenueSelected === false
                                            ? 'bg-red-100 border-red-500 text-red-700'
                                            : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    No
                                </button>
                            </div>
                        </div>

                        {/* Carbon Stage */}
                        <div className="relative mb-6">
                            <p className="text-xs text-gray-700 mb-1 font-medium">Stage of carbon revenue generation*</p>
                            <div
                                className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all border ${
                                    carbonStageDropdownOpen
                                        ? 'border-gray-400 bg-white shadow-sm'
                                        : 'border-gray-300 hover:bg-gray-50'
                                }`}
                                onClick={() => setCarbonStageDropdownOpen(!carbonStageDropdownOpen)}
                            >
                                <span className={carbonStage ? 'text-gray-900' : 'text-gray-600'}>
                                    {carbonStage || 'Select Stage'}
                                </span>
                                {carbonStageDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                            <AnimatePresence>
                                {carbonStageDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                    >
                                        {carbonRevenueStages.map((stage) => (
                                            <div
                                                key={stage}
                                                onClick={() => {
                                                    setCarbonStage(stage);
                                                    setCarbonStageDropdownOpen(false);
                                                }}
                                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                                            >
                                                {stage}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-gray-700 mb-2 font-medium">Estimated Carbon Credit Volume (tCO2e/Year)*</p>
                                <input
                                    type="number"
                                    value={carbonCreditVolume}
                                    onChange={(e) => setCarbonCreditVolume(e.target.value)}
                                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400"
                                    placeholder="e.g. 5000"
                                />
                            </div>
                            <div>
                                <p className="text-xs text-gray-700 mb-2 font-medium">Estimated Revenue (USD/year)*</p>
                                <input
                                    type="number"
                                    value={estimatedRevenue}
                                    onChange={(e) => setEstimatedRevenue(e.target.value)}
                                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400"
                                    placeholder="e.g. 75000"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Recommend for Independent Carbon Assessment?*</p>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setAssessmentSelected(true)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium transition-colors ${
                                        assessmentSelected === true
                                            ? 'bg-green-100 border-green-500 text-green-700'
                                            : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAssessmentSelected(false)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium transition-colors ${
                                        assessmentSelected === false
                                            ? 'bg-red-100 border-red-500 text-red-700'
                                            : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialImpacts;