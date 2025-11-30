'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Pencil, Leaf } from 'lucide-react';

const EnergyUse = () => {
    const [activeSection, setActiveSection] = useState<string>('Emissions Methodology');

    // === State moved from EnvMetrics ===
    const [methodologyDropdownOpen, setMethodologyDropdownOpen] = useState(false);
    const [selectedMethodology, setSelectedMethodology] = useState<string>('');
    const [emissionTargetsSelected, setEmissionTargetsSelected] = useState<boolean | null>(null);
    const [targetDescription, setTargetDescription] = useState('');
    const [baselineYear, setBaselineYear] = useState('');
    const [targetTimeline, setTargetTimeline] = useState('');
    const [hazardousWasteSelected, setHazardousWasteSelected] = useState<boolean | null>(null);
    const [hazardousWasteDetails, setHazardousWasteDetails] = useState('');
    const [eprComplianceSelected, setEprComplianceSelected] = useState<boolean | null>(null);

    const methodologies = ['GHG Protocol', 'IPCC', 'Custom', 'Other'] as const;

    const sectionRefs = {
        'Emissions Methodology': useRef<HTMLDivElement>(null),
        'Energy & Waste': useRef<HTMLDivElement>(null),
    };

    const handleNavClick = (section: string) => {
        setActiveSection(section);
        const sectionRef = sectionRefs[section as keyof typeof sectionRefs]?.current;
        if (sectionRef) {
            sectionRef.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
            { threshold: 0.4 }
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

    return (
        <div className="w-full mx-auto px-2 md:px-6 py-0 space-y-6">
            <div className="flex gap-4">
                {/* Sticky Sidebar Navigation */}
                <div className="w-72 hidden md:flex flex-col gap-2 sticky top-36 self-start">
                    <h1 className="text-lg font-semibold text-gray-600">Content</h1>
                    <div className="flex flex-col gap-1">
                        {[
                            { name: 'Emissions Methodology', icon: Leaf },
                            { name: 'Energy & Waste', icon: Leaf },
                        ].map(({ name, icon: Icon }) => (
                            <div
                                key={name}
                                onClick={() => handleNavClick(name)}
                                className={`flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                                    activeSection === name
                                        ? 'bg-[#F2F2F2] text-[#044D5E]'
                                        : 'hover:bg-gray-50 text-gray-500'
                                }`}
                            >
                                <Icon size={16} />
                                <p className="text-xs">{name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Form Content */}
                <form className="w-full mx-auto px-0 md:px-6 py-0 flex-1 space-y-12">

                    {/* You can keep your existing Emissions Methodology & Material Topics here */}
                    {/* ... */}

                    <hr className="border-t border-gray-200 my-8" />

                    {/* ========== Emissions Methodology ========== */}
                    <div
                        ref={sectionRefs['Emissions Methodology']}
                        data-section="Emissions Methodology"
                        className="scroll-mt-32"
                    >
                        <h1 className="text-lg font-medium text-gray-600 mb-8">Emissions Methodology & Targets</h1>

                        {/* Methodology */}
                        <div className="mt-12">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Methodology used *</p>
                            <div className="relative">
                                <div
                                    onClick={() => setMethodologyDropdownOpen(prev => !prev)}
                                    className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                                        methodologyDropdownOpen
                                            ? 'border border-gray-400 bg-white shadow-sm'
                                            : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="text-gray-600">
                                        {selectedMethodology || 'Select methodology'}
                                    </span>
                                    {methodologyDropdownOpen ? (
                                        <ChevronUp size={18} className="text-gray-400" />
                                    ) : (
                                        <ChevronDown size={18} className="text-gray-400" />
                                    )}
                                </div>

                                <AnimatePresence>
                                    {methodologyDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                        >
                                            {methodologies.map((m) => (
                                                <div
                                                    key={m}
                                                    onClick={() => {
                                                        setSelectedMethodology(m);
                                                        setMethodologyDropdownOpen(false);
                                                    }}
                                                    className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                                >
                                                    {m}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Emission Reduction Targets */}
                        <div className="mt-10">
                            <p className="text-xs text-gray-700 mb-2 font-medium">
                                Do you have Emission Reduction Targets? *
                            </p>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEmissionTargetsSelected(true)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${
                                        emissionTargetsSelected === true
                                            ? 'bg-green-100 border-green-500'
                                            : 'hover:bg-gray-50 border-gray-300'
                                    } focus:outline-none`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEmissionTargetsSelected(false)}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${
                                        emissionTargetsSelected === false
                                            ? 'bg-red-100 border-red-500'
                                            : 'hover:bg-gray-50 border-gray-300'
                                    } focus:outline-none`}
                                >
                                    No
                                </button>
                            </div>

                            {emissionTargetsSelected === true && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-6 space-y-5 bg-gray-50 p-6 rounded-xl border border-gray-200"
                                >
                                    <div>
                                        <p className="text-xs text-gray-700 mb-2 font-medium">
                                            Specify target (e.g., 40% reduction by 2030)
                                        </p>
                                        <input
                                            type="text"
                                            value={targetDescription}
                                            onChange={(e) => setTargetDescription(e.target.value)}
                                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                                            placeholder="e.g., Net Zero by 2040"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <p className="text-xs text-gray-700 mb-2 font-medium">Baseline year</p>
                                            <input
                                                type="number"
                                                value={baselineYear}
                                                onChange={(e) => setBaselineYear(e.target.value)}
                                                className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                                                placeholder="e.g., 2019"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-700 mb-2 font-medium">Target timeline (year)</p>
                                            <input
                                                type="number"
                                                value={targetTimeline}
                                                onChange={(e) => setTargetTimeline(e.target.value)}
                                                className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                                                placeholder="e.g., 2030"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <hr className="border-t border-gray-200 my-8" />

                    {/* ========== Energy Use & Waste Management ========== */}
                    <div
                        ref={sectionRefs['Energy & Waste']}
                        data-section="Energy & Waste"
                        className="scroll-mt-32"
                    >
                        <h1 className="text-lg font-medium text-gray-600 mb-8">Energy Use & Waste Management</h1>

                        {/* Energy Use (optional) */}
                        <div className="mb-12">
                            <h2 className="text-base font-medium text-gray-600 mb-6">Energy Use (optional)</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                                <div>
                                    <p className="text-xs text-gray-700 mb-2 font-medium">
                                        Total Energy Consumption (kWh)
                                    </p>
                                    <input
                                        type="number"
                                        name="totalEnergyKwh"
                                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                                        placeholder="e.g., 450000"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-700 mb-2 font-medium">
                                        % from Renewable Sources
                                    </p>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        name="renewablePercentage"
                                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                                        placeholder="e.g., 35"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Waste Management */}
                        <div className="space-y-10 max-w-4xl">
                            <h2 className="text-base font-medium text-gray-600 mb-6">Waste Management</h2>

                            <div>
                                <p className="text-xs text-gray-700 mb-2 font-medium">
                                    Total Waste Generated (kg or tonnes) *
                                </p>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="totalWaste"
                                    required
                                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                                    placeholder="e.g., 12500 (kg) or 12.5 (tonnes)"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-xs text-gray-700 mb-2 font-medium">% Recycled / Composted</p>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        name="recycledPercentage"
                                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                                        placeholder="e.g., 62"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-700 mb-2 font-medium">% Landfilled</p>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        name="landfilledPercentage"
                                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                                        placeholder="e.g., 38"
                                    />
                                </div>
                            </div>

                            {/* Hazardous Waste */}
                            <div className="mt-10">
                                <p className="text-xs text-gray-700 mb-2 font-medium">
                                    Hazardous waste generated? *
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setHazardousWasteSelected(true)}
                                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${
                                            hazardousWasteSelected === true
                                                ? 'bg-green-100 border-green-500'
                                                : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setHazardousWasteSelected(false)}
                                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${
                                            hazardousWasteSelected === false
                                                ? 'bg-red-100 border-red-500'
                                                : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none`}
                                    >
                                        No
                                    </button>
                                </div>

                                {hazardousWasteSelected === true && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-6"
                                    >
                                        <p className="text-xs text-gray-700 mb-2 font-medium">
                                            Describe type and disposal method
                                        </p>
                                        <textarea
                                            rows={4}
                                            value={hazardousWasteDetails}
                                            onChange={(e) => setHazardousWasteDetails(e.target.value)}
                                            className="w-full text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                                            placeholder="e.g., Used batteries and electronic waste – sent to certified recycler"
                                        />
                                    </motion.div>
                                )}
                            </div>

                            {/* EPR Compliance */}
                            <div className="mt-10">
                                <p className="text-xs text-gray-700 mb-2 font-medium">
                                    EPR (Extended Producer Responsibility) compliance? *
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setEprComplianceSelected(true)}
                                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${
                                            eprComplianceSelected === true
                                                ? 'bg-green-100 border-green-500'
                                                : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEprComplianceSelected(false)}
                                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${
                                            eprComplianceSelected === false
                                                ? 'bg-red-100 border-red-500'
                                                : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EnergyUse;