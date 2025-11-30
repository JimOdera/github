'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Edit2, Trash2, Leaf, Plus } from 'lucide-react';

const KGFTAlignment = () => {
    const [useOfProceedsDropdownOpen, setUseOfProceedsDropdownOpen] = useState(false);
    const [selectedUseOfProceeds, setSelectedUseOfProceeds] = useState<string | null>(null);
    const [activityTypeDropdownOpen, setActivityTypeDropdownOpen] = useState(false);
    const [selectedActivityType, setSelectedActivityType] = useState<string | null>(null);
    const [mitigationCategorySelected, setMitigationCategorySelected] = useState<string[]>([]);
    const [genderEquity, setGenderEquity] = useState<string | null>(null);
    const [listedInKGFT, setListedInKGFT] = useState<string | null>(null);
    const [supportingEvidence, setSupportingEvidence] = useState<string | null>(null);
    const [dnshMet, setDnshMet] = useState<string | null>(null);
    const [socialSafeguard, setSocialSafeguard] = useState<string | null>(null);
    const [alignmentStatus, setAlignmentStatus] = useState<string | null>(null);
    const [emissionFactorTypeDropdownOpen, setEmissionFactorTypeDropdownOpen] = useState(false);
    const [selectedEmissionFactorType, setSelectedEmissionFactorType] = useState<string | null>(null);
    const [emissionFactorValueDropdownOpen, setEmissionFactorValueDropdownOpen] = useState(false);
    const [selectedEmissionFactorValue, setSelectedEmissionFactorValue] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<string>('Alignment Status');
    const [ghcDropdownOpen, setGhcDropdownOpen] = useState(false);
    const [selectedGhc, setSelectedGhc] = useState<string | null>(null);

    const [emissionFactors, setEmissionFactors] = useState<
        { type: string; value: string }[]
    >([]);

    const sectionRefs = {
        'Alignment Status': useRef<HTMLDivElement>(null),
    };

    const useOfProceedsOptions = [
        'Renewable Energy- Solar',
        'Renewable Energy- Wind',
        'Renewable Energy- Hydro',
        'Renewable Energy- Biomas',
        'Energy Storage',
        'Energy Transmission & Distribution',
        'Grid Infrastructure',
        'Efficient lighting',
    ];

    const ghcOptions = [
        'Displacement of grid electricity through renewable energy (e.g., solar, wind, hydro)',
        'On-site renewable energy generation (e.g., rooftop solar)',
        'Energy efficiency improvements (e.g., machinery upgrades, LED lighting)',
        'RElectrification of transport (e.g., electric vehicles, e-bikes)',
        'Modal shift to low-emission public transport',
        'Process optimization to reduce fuel or electricity use',
        'Waste-to-energy (biogas, landfill methane capture)',
        'Fuel switch to lower-emission fuels (e.g., coal to biomass, diesel to LPG)',
    ];

    const activityTypes = [
        'Own Performance',
        'Enabling',
        'Transitional',
    ];

    const mitigationCategories = [
        'Renewable Energy',
        'Strengthening land carbon sinks',
        'Clean mobility',
        'Carbon Energy',
    ];

    const emissionFactorTypes = [
        'Grid Electricity',
        'Land Use',
    ];

    const emissionFactorValues = [
        '0.72 tCO₂e/MWh',
        '1.5 tCO₂e/ha',
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

    const toggleMitigationCategory = (category: string) => {
        setMitigationCategorySelected(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    return (
        <div className="w-full mx-auto px-2 md:px-6 py-0 space-y-6">
            <div className="flex gap-4">
                {/* Sticky Sidebar Navigation */}
                <div className="w-72 hidden md:flex flex-col gap-2 sticky top-38 self-start">
                    <h1 className="text-lg font-semibold text-gray-600">Content</h1>
                    <div className="flex flex-col gap-1">
                        {[
                            { name: 'Alignment Status', icon: Leaf },
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
                    {/* KGFT Alignment Section */}
                    <div ref={sectionRefs['Alignment Status']} data-section="Alignment Status">
                        <h1 className="text-lg font-medium text-gray-600 mb-6">KGFT Alignment</h1>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Indicate who owns or controls the activity*</p>
                            <textarea
                                className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                                placeholder="Enter owner or controller details..."
                                name="activityOwner"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Briefly explain why the activity is being considered for green classification*</p>
                            <textarea
                                className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                                placeholder="Enter explanation..."
                                name="greenClassificationReason"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Does the project contribute to gender equity? (e.g., operated by women)</p>
                            <div className="flex gap-3 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setGenderEquity(genderEquity === 'yes' ? null : 'yes')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${genderEquity === 'yes'
                                        ? 'bg-green-100 border-green-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-green-500`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setGenderEquity(genderEquity === 'no' ? null : 'no')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${genderEquity === 'no'
                                        ? 'bg-red-100 border-red-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-red-500`}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                        <div className="relative mb-6">
                            <p className="text-xs text-gray-700 mb-1 font-medium">Use of Proceeds (sub-sector)*</p>
                            <div
                                className={`
                                    w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                                    cursor-pointer transition-all duration-200
                                    ${useOfProceedsDropdownOpen
                                        ? 'border border-gray-400 bg-white shadow-sm'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                                onClick={() => setUseOfProceedsDropdownOpen(!useOfProceedsDropdownOpen)}
                            >
                                <span className="text-gray-600">{selectedUseOfProceeds || 'Select Sub-sector'}</span>
                                {useOfProceedsDropdownOpen ? (
                                    <ChevronUp size={18} className="text-gray-400" />
                                ) : (
                                    <ChevronDown size={18} className="text-gray-400" />
                                )}
                            </div>
                            <AnimatePresence>
                                {useOfProceedsDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                    >
                                        {useOfProceedsOptions.map((option, i) => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    setSelectedUseOfProceeds(option);
                                                    setUseOfProceedsDropdownOpen(false);
                                                }}
                                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Describe what the financing is being used for i.e what/how/why and scale*</p>
                            <textarea
                                className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                                placeholder="Enter financing details..."
                                name="financingUse"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Enter the physical location of the activity that is specific to the use of proceeds*</p>
                            <textarea
                                className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                                placeholder="Enter physical location..."
                                name="activityLocation"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Is Activity listed in KGFT Mitigation Categories?*</p>
                            <div className="flex gap-3 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setListedInKGFT(listedInKGFT === 'yes' ? null : 'yes')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${listedInKGFT === 'yes'
                                        ? 'bg-green-100 border-green-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-green-500`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setListedInKGFT(listedInKGFT === 'no' ? null : 'no')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${listedInKGFT === 'no'
                                        ? 'bg-red-100 border-red-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-red-500`}
                                >
                                    No
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setListedInKGFT(listedInKGFT === 'pending' ? null : 'pending')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${listedInKGFT === 'pending'
                                        ? 'bg-orange-100 border-orange-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-orange-500`}
                                >
                                    Pending
                                </button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">KGFT Mitigation Category*</p>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {mitigationCategories.map(category => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => toggleMitigationCategory(category)}
                                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${mitigationCategorySelected.includes(category)
                                            ? 'bg-green-100 border-green-500'
                                            : 'hover:bg-gray-50 border-gray-300'
                                            } focus:outline-none focus:border-green-500`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="relative mb-6">
                            <p className="text-xs text-gray-700 mb-1 font-medium">Activity Type*</p>
                            <div
                                className={`
                                    w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                                    cursor-pointer transition-all duration-200
                                    ${activityTypeDropdownOpen
                                        ? 'border border-gray-400 bg-white shadow-sm'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                                onClick={() => setActivityTypeDropdownOpen(!activityTypeDropdownOpen)}
                            >
                                <span className="text-gray-600">{selectedActivityType || 'Select Activity Type'}</span>
                                {activityTypeDropdownOpen ? (
                                    <ChevronUp size={18} className="text-gray-400" />
                                ) : (
                                    <ChevronDown size={18} className="text-gray-400" />
                                )}
                            </div>
                            <AnimatePresence>
                                {activityTypeDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                    >
                                        {activityTypes.map((type, i) => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    setSelectedActivityType(type);
                                                    setActivityTypeDropdownOpen(false);
                                                }}
                                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">GHG Reduction*</p>
                            <textarea
                                className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                                placeholder="Enter GHG reduction details..."
                                name="ghgReduction"
                                required
                            ></textarea>
                        </div>
                        {/*  */}
                        <div className="relative mb-6">
                            <p className="text-xs text-gray-700 mb-1 font-medium">GHG Emission Reduction Mechanism*</p>
                            <div
                                className={`
                                    w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                                    cursor-pointer transition-all duration-200
                                    ${ghcDropdownOpen
                                        ? 'border border-gray-400 bg-white shadow-sm'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                                onClick={() => setGhcDropdownOpen(!ghcDropdownOpen)}
                            >
                                <span className="text-gray-600">{selectedGhc || 'Select Sub-sector'}</span>
                                {ghcDropdownOpen ? (
                                    <ChevronUp size={18} className="text-gray-400" />
                                ) : (
                                    <ChevronDown size={18} className="text-gray-400" />
                                )}
                            </div>
                            <AnimatePresence>
                                {ghcDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                    >
                                        {ghcOptions.map((option, i) => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    setSelectedGhc(option);
                                                    setGhcDropdownOpen(false);
                                                }}
                                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {/*  */}
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">GHG Emission Reduction Mechanism*</p>
                            <textarea
                                className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                                placeholder="Enter emission reduction mechanism..."
                                name="ghgEmissionMechanism"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Quantify the scale of the activity*</p>
                            <textarea
                                className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                                placeholder="Enter scale quantification..."
                                name="activityScale"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Emission factor used</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                {/* Emission Factor Type Dropdown */}
                                <div className="relative">
                                    <div
                                        className={`
          w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
          cursor-pointer transition-all duration-200 border
          ${emissionFactorTypeDropdownOpen
                                                ? 'border-gray-400 bg-white shadow-sm'
                                                : 'border-gray-300 hover:bg-gray-50'
                                            }`}
                                        onClick={() => setEmissionFactorTypeDropdownOpen(!emissionFactorTypeDropdownOpen)}
                                    >
                                        <span className={selectedEmissionFactorType ? 'text-gray-800' : 'text-gray-500'}>
                                            {selectedEmissionFactorType || 'Select Type'}
                                        </span>
                                        {emissionFactorTypeDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>

                                    <AnimatePresence>
                                        {emissionFactorTypeDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden"
                                            >
                                                {emissionFactorTypes.map((type) => (
                                                    <div
                                                        key={type}
                                                        onClick={() => {
                                                            setSelectedEmissionFactorType(type);
                                                            setEmissionFactorTypeDropdownOpen(false);
                                                        }}
                                                        className="px-4 py-2.5 text-xs hover:bg-gray-50 cursor-pointer text-gray-700"
                                                    >
                                                        {type}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Emission Factor Value Dropdown */}
                                <div className="relative">
                                    <div
                                        className={`
          w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
          cursor-pointer transition-all duration-200 border
          ${emissionFactorValueDropdownOpen
                                                ? 'border-gray-400 bg-white shadow-sm'
                                                : 'border-gray-300 hover:bg-gray-50'
                                            }`}
                                        onClick={() => setEmissionFactorValueDropdownOpen(!emissionFactorValueDropdownOpen)}
                                    >
                                        <span className={selectedEmissionFactorValue ? 'text-gray-800' : 'text-gray-500'}>
                                            {selectedEmissionFactorValue || 'Select Value'}
                                        </span>
                                        {emissionFactorValueDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>

                                    <AnimatePresence>
                                        {emissionFactorValueDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden"
                                            >
                                                {emissionFactorValues.map((value) => (
                                                    <div
                                                        key={value}
                                                        onClick={() => {
                                                            setSelectedEmissionFactorValue(value);
                                                            setEmissionFactorValueDropdownOpen(false);
                                                        }}
                                                        className="px-4 py-2.5 text-xs hover:bg-gray-50 cursor-pointer text-gray-700"
                                                    >
                                                        {value}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Add Button */}
                                <button
                                    type="button"
                                    disabled={!selectedEmissionFactorType || !selectedEmissionFactorValue}
                                    onClick={() => {
                                        if (selectedEmissionFactorType && selectedEmissionFactorValue) {
                                            setEmissionFactors(prev => [
                                                ...prev,
                                                { type: selectedEmissionFactorType, value: selectedEmissionFactorValue }
                                            ]);
                                            setSelectedEmissionFactorType(null);
                                            setSelectedEmissionFactorValue(null);
                                        }
                                    }}
                                    className={`w-full text-xs rounded-lg px-3 py-2 flex items-center justify-center gap-2 font-medium transition-all
        ${selectedEmissionFactorType && selectedEmissionFactorValue
                                            ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm'
                                            : 'bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    <Plus size={16} />
                                    Add Factor
                                </button>
                            </div>

                            {/* Display Added Emission Factors */}
                            {emissionFactors.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {emissionFactors.map((factor, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs"
                                        >
                                            <span className="text-gray-700 font-medium">
                                                {factor.value} for {factor.type.toLowerCase()}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        // Optional: Open edit mode (you can expand this later)
                                                        setSelectedEmissionFactorType(factor.type);
                                                        setSelectedEmissionFactorValue(factor.value);
                                                        setEmissionFactors(prev => prev.filter((_, i) => i !== index));
                                                    }}
                                                    className="text-blue-600 hover:text-blue-800 transition"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setEmissionFactors(prev => prev.filter((_, i) => i !== index))}
                                                    className="text-red-600 hover:text-red-800 transition"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Optional: Show message when none added */}
                            {emissionFactors.length === 0 && (
                                <p className="text-xs text-gray-500 italic mt-3">No emission factors added yet.</p>
                            )}
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Estimated Annual Emission Reduction (tCO2e)</p>
                            <textarea
                                className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                                placeholder="Multiply the Estimated Annual Output with the appropriate emissions factor used"
                                name="annualEmissionReduction"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Supporting Evidence Attached?* - Select Yes if documents are available (e.g., EIA, feasibility study, emissions model); No if not; Pending if in progress.</p>
                            <div className="flex gap-3 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setSupportingEvidence(supportingEvidence === 'yes' ? null : 'yes')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${supportingEvidence === 'yes'
                                        ? 'bg-green-100 border-green-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-green-500`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSupportingEvidence(supportingEvidence === 'no' ? null : 'no')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${supportingEvidence === 'no'
                                        ? 'bg-red-100 border-red-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-red-500`}
                                >
                                    No
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSupportingEvidence(supportingEvidence === 'pending' ? null : 'pending')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${supportingEvidence === 'pending'
                                        ? 'bg-orange-100 border-orange-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-orange-500`}
                                >
                                    Pending
                                </button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">DNSH Met?* - “Do No Significant Harm” — select Yes if activity does not harm other environmental objectives, No if it does, Pending if under review. Requires EIA or screening tool.</p>
                            <div className="flex gap-3 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setDnshMet(dnshMet === 'yes' ? null : 'yes')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${dnshMet === 'yes'
                                        ? 'bg-green-100 border-green-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-green-500`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDnshMet(dnshMet === 'no' ? null : 'no')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${dnshMet === 'no'
                                        ? 'bg-red-100 border-red-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-red-500`}
                                >
                                    No
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDnshMet(dnshMet === 'pending' ? null : 'pending')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${dnshMet === 'pending'
                                        ? 'bg-orange-100 border-orange-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-orange-500`}
                                >
                                    Pending
                                </button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Social Safeguard Met?*</p>
                            <div className="flex gap-3 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setSocialSafeguard(socialSafeguard === 'yes' ? null : 'yes')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${socialSafeguard === 'yes'
                                        ? 'bg-green-100 border-green-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-green-500`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSocialSafeguard(socialSafeguard === 'no' ? null : 'no')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${socialSafeguard === 'no'
                                        ? 'bg-red-100 border-red-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-red-500`}
                                >
                                    No
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSocialSafeguard(socialSafeguard === 'pending' ? null : 'pending')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${socialSafeguard === 'pending'
                                        ? 'bg-orange-100 border-orange-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-orange-500`}
                                >
                                    Pending
                                </button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-700 mb-2 font-medium">Alignment Status?*</p>
                            <div className="flex gap-3 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setAlignmentStatus(alignmentStatus === 'yes' ? null : 'yes')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${alignmentStatus === 'yes'
                                        ? 'bg-green-100 border-green-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-green-500`}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAlignmentStatus(alignmentStatus === 'no' ? null : 'no')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${alignmentStatus === 'no'
                                        ? 'bg-red-100 border-red-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-red-500`}
                                >
                                    No
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAlignmentStatus(alignmentStatus === 'pending' ? null : 'pending')}
                                    className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${alignmentStatus === 'pending'
                                        ? 'bg-orange-100 border-orange-500'
                                        : 'hover:bg-gray-50 border-gray-300'
                                        } focus:outline-none focus:border-orange-500`}
                                >
                                    Pending
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default KGFTAlignment;