'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Trash2, Leaf, Plus } from 'lucide-react';

interface EmissionFactor {
    type: string;
    value: string;
}

interface KGFTAlignmentProps {
    projectId: string;
}

const KGFTAlignment = ({ projectId }: KGFTAlignmentProps) => {
    // === Form State ===
    const [activityOwner, setActivityOwner] = useState('');
    const [greenClassificationReason, setGreenClassificationReason] = useState('');
    const [genderEquity, setGenderEquity] = useState<'yes' | 'no' | null>(null);
    const [selectedUseOfProceeds, setSelectedUseOfProceeds] = useState<string | null>(null);
    const [financingUse, setFinancingUse] = useState('');
    const [activityLocation, setActivityLocation] = useState('');
    const [listedInKGFT, setListedInKGFT] = useState<'yes' | 'no' | 'pending' | null>(null);
    const [mitigationCategorySelected, setMitigationCategorySelected] = useState<string[]>([]);
    const [selectedActivityType, setSelectedActivityType] = useState<string | null>(null);
    const [ghgReduction, setGhgReduction] = useState('');
    const [selectedGhc, setSelectedGhc] = useState<string | null>(null);
    const [ghgEmissionMechanism, setGhgEmissionMechanism] = useState('');
    const [activityScale, setActivityScale] = useState('');
    const [annualEmissionReduction, setAnnualEmissionReduction] = useState('');
    const [supportingEvidence, setSupportingEvidence] = useState<'yes' | 'no' | 'pending' | null>(null);
    const [dnshMet, setDnshMet] = useState<'yes' | 'no' | 'pending' | null>(null);
    const [socialSafeguard, setSocialSafeguard] = useState<'yes' | 'no' | 'pending' | null>(null);
    const [alignmentStatus, setAlignmentStatus] = useState<'yes' | 'no' | 'pending' | null>(null);

    // Emission Factors
    const [emissionFactors, setEmissionFactors] = useState<EmissionFactor[]>([]);
    const [selectedEmissionFactorType, setSelectedEmissionFactorType] = useState<string | null>(null);
    const [selectedEmissionFactorValue, setSelectedEmissionFactorValue] = useState<string | null>(null);

    // Dropdown States
    const [useOfProceedsDropdownOpen, setUseOfProceedsDropdownOpen] = useState(false);
    const [activityTypeDropdownOpen, setActivityTypeDropdownOpen] = useState(false);
    const [ghcDropdownOpen, setGhcDropdownOpen] = useState(false);
    const [emissionFactorTypeDropdownOpen, setEmissionFactorTypeDropdownOpen] = useState(false);
    const [emissionFactorValueDropdownOpen, setEmissionFactorValueDropdownOpen] = useState(false);

    // Navigation
    const sectionRef = useRef<HTMLDivElement>(null);

    // Options
    const useOfProceedsOptions = [
        'Renewable Energy- Solar',
        'Renewable Energy- Wind',
        'Renewable Energy- Hydro',
        'Renewable Energy- Biomass',
        'Energy Storage',
        'Energy Transmission & Distribution',
        'Grid Infrastructure',
        'Efficient lighting',
    ];

    const ghcOptions = [
        'Displacement of grid electricity through renewable energy (e.g., solar, wind, hydro)',
        'On-site renewable energy generation (e.g., rooftop solar)',
        'Energy efficiency improvements (e.g., machinery upgrades, LED lighting)',
        'Electrification of transport (e.g., electric vehicles, e-bikes)',
        'Modal shift to low-emission public transport',
        'Process optimization to reduce fuel or electricity use',
        'Waste-to-energy (biogas, landfill methane capture)',
        'Fuel switch to lower-emission fuels (e.g., coal to biomass, diesel to LPG)',
    ];

    const activityTypes = ['Own Performance', 'Enabling', 'Transitional'];

    const mitigationCategories = [
        'Renewable Energy',
        'Strengthening land carbon sinks',
        'Clean mobility',
        'Carbon Energy',
    ];

    const emissionFactorTypes = ['Grid Electricity', 'Land Use'];
    const emissionFactorValues = ['0.72 tCO₂e/MWh', '1.5 tCO₂e/ha'];

    // === UNIQUE STORAGE KEY FOR THIS PROJECT + STEP 3 ===
    const storageKey = `projectDraft_${projectId}_step3`;

    // === Auto-save to localStorage (debounced) ===
    useEffect(() => {
        const saveDraft = () => {
            const draft = {
                activityOwner,
                greenClassificationReason,
                genderEquity,
                selectedUseOfProceeds,
                financingUse,
                activityLocation,
                listedInKGFT,
                mitigationCategorySelected,
                selectedActivityType,
                ghgReduction,
                selectedGhc,
                ghgEmissionMechanism,
                activityScale,
                annualEmissionReduction,
                supportingEvidence,
                dnshMet,
                socialSafeguard,
                alignmentStatus,
                emissionFactors,
            };
            localStorage.setItem(storageKey, JSON.stringify(draft));
        };

        const timeoutId = setTimeout(saveDraft, 600);
        return () => clearTimeout(timeoutId);
    }, [
        activityOwner,
        greenClassificationReason,
        genderEquity,
        selectedUseOfProceeds,
        financingUse,
        activityLocation,
        listedInKGFT,
        mitigationCategorySelected,
        selectedActivityType,
        ghgReduction,
        selectedGhc,
        ghgEmissionMechanism,
        activityScale,
        annualEmissionReduction,
        supportingEvidence,
        dnshMet,
        socialSafeguard,
        alignmentStatus,
        emissionFactors,
        projectId,
    ]);

    // === Load draft on mount ===
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                const draft = JSON.parse(saved);
                setActivityOwner(draft.activityOwner || '');
                setGreenClassificationReason(draft.greenClassificationReason || '');
                setGenderEquity(draft.genderEquity || null);
                setSelectedUseOfProceeds(draft.selectedUseOfProceeds || null);
                setFinancingUse(draft.financingUse || '');
                setActivityLocation(draft.activityLocation || '');
                setListedInKGFT(draft.listedInKGFT || null);
                setMitigationCategorySelected(draft.mitigationCategorySelected || []);
                setSelectedActivityType(draft.selectedActivityType || null);
                setGhgReduction(draft.ghgReduction || '');
                setSelectedGhc(draft.selectedGhc || null);
                setGhgEmissionMechanism(draft.ghgEmissionMechanism || '');
                setActivityScale(draft.activityScale || '');
                setAnnualEmissionReduction(draft.annualEmissionReduction || '');
                setSupportingEvidence(draft.supportingEvidence || null);
                setDnshMet(draft.dnshMet || null);
                setSocialSafeguard(draft.socialSafeguard || null);
                setAlignmentStatus(draft.alignmentStatus || null);
                setEmissionFactors(draft.emissionFactors || []);
            } catch (e) {
                console.warn('Failed to load Step 3 draft for project:', projectId);
            }
        }
    }, [projectId, storageKey]);

    const toggleMitigationCategory = (category: string) => {
        setMitigationCategorySelected(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const addEmissionFactor = () => {
        if (selectedEmissionFactorType && selectedEmissionFactorValue) {
            setEmissionFactors(prev => [...prev, { type: selectedEmissionFactorType, value: selectedEmissionFactorValue }]);
            setSelectedEmissionFactorType(null);
            setSelectedEmissionFactorValue(null);
        }
    };

    const removeEmissionFactor = (index: number) => {
        setEmissionFactors(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full mx-auto px-2 md:px-6 py-8">
            <div className="flex gap-8">
                {/* Sidebar */}
                <aside className="hidden lg:block w-72 flex-shrink-0">
                    <div className="sticky top-36">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Form Sections
                        </h3>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#F2F2F2] text-[#044D5E] font-medium shadow-sm">
                            <Leaf size={18} />
                            <span className="text-xs">KGFT Alignment</span>
                        </button>
                    </div>
                </aside>

                {/* Main Form */}
                <div ref={sectionRef} className="flex-1 max-w-4xl">
                    <h1 className="text-2xl font-semibold text-[#044D5E] mb-8">KGFT Alignment Assessment</h1>

                    <div className="space-y-8">
                        {/* Activity Owner */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Indicate who owns or controls the activity *
                            </label>
                            <textarea
                                value={activityOwner}
                                onChange={(e) => setActivityOwner(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500 text-xs"
                                placeholder="e.g. Farmer cooperative, private company, government entity..."
                            />
                        </div>

                        {/* Green Classification Reason */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Why is this activity being considered for green classification? *
                            </label>
                            <textarea
                                value={greenClassificationReason}
                                onChange={(e) => setGreenClassificationReason(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500 text-xs"
                            />
                        </div>

                        {/* Gender Equity */}
                        <div>
                            <p className="text-xs font-medium text-gray-700 mb-3">
                                Does the project contribute to gender equity? (e.g., women-owned/operated)
                            </p>
                            <div className="flex gap-3">
                                {(['yes', 'no'] as const).map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setGenderEquity(val)}
                                        className={`px-5 py-2.5 rounded-lg border text-xs font-medium transition ${
                                            genderEquity === val
                                                ? val === 'yes'
                                                    ? 'bg-green-100 border-green-500 text-green-700'
                                                    : 'bg-red-100 border-red-500 text-red-700'
                                                : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {val === 'yes' ? 'Yes' : 'No'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Use of Proceeds */}
                        <div className="relative">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Use of Proceeds (Sub-sector) *
                            </label>
                            <div
                                onClick={() => setUseOfProceedsDropdownOpen(!useOfProceedsDropdownOpen)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs"
                            >
                                <span className={selectedUseOfProceeds ? 'text-gray-900' : 'text-gray-500'}>
                                    {selectedUseOfProceeds || 'Select sub-sector'}
                                </span>
                                {useOfProceedsDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                            <AnimatePresence>
                                {useOfProceedsDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                                    >
                                        {useOfProceedsOptions.map(option => (
                                            <div
                                                key={option}
                                                onClick={() => {
                                                    setSelectedUseOfProceeds(option);
                                                    setUseOfProceedsDropdownOpen(false);
                                                }}
                                                className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-xs"
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Financing Use */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                What is the financing being used for? (What/How/Why/Scale) *
                            </label>
                            <textarea
                                value={financingUse}
                                onChange={(e) => setFinancingUse(e.target.value)}
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500 text-xs"
                            />
                        </div>

                        {/* Physical Location */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Physical location of the activity *
                            </label>
                            <textarea
                                value={activityLocation}
                                onChange={(e) => setActivityLocation(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500 text-xs"
                                placeholder="e.g. Kwale County, Kenya – 4.2°S, 39.5°E"
                            />
                        </div>

                        {/* Listed in KGFT */}
                        <div>
                            <p className="text-xs font-medium text-gray-700 mb-3">Is activity listed in KGFT Mitigation Categories? *</p>
                            <div className="flex flex-wrap gap-3">
                                {(['yes', 'no', 'pending'] as const).map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setListedInKGFT(val)}
                                        className={`px-5 py-2.5 rounded-lg border text-xs font-medium capitalize transition ${
                                            listedInKGFT === val
                                                ? val === 'yes'
                                                    ? 'bg-green-100 border-green-500 text-green-700'
                                                    : val === 'no'
                                                        ? 'bg-red-100 border-red-500 text-red-700'
                                                        : 'bg-orange-100 border-orange-500 text-orange-700'
                                                : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {val === 'pending' ? 'Pending' : val === 'yes' ? 'Yes' : 'No'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mitigation Categories */}
                        <div>
                            <p className="text-xs font-medium text-gray-700 mb-3">Select applicable KGFT Mitigation Categories *</p>
                            <div className="grid grid-cols-2 gap-3">
                                {mitigationCategories.map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => toggleMitigationCategory(cat)}
                                        className={`px-4 py-2.5 rounded-lg border text-xs font-medium transition ${
                                            mitigationCategorySelected.includes(cat)
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Activity Type */}
                        <div className="relative">
                            <label className="block text-xs font-medium text-gray-700 mb-2">Activity Type *</label>
                            <div
                                onClick={() => setActivityTypeDropdownOpen(!activityTypeDropdownOpen)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs"
                            >
                                <span className={selectedActivityType ? 'text-gray-900' : 'text-gray-500'}>
                                    {selectedActivityType || 'Select type'}
                                </span>
                                {activityTypeDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                            <AnimatePresence>
                                {activityTypeDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
                                    >
                                        {activityTypes.map(type => (
                                            <div
                                                key={type}
                                                onClick={() => {
                                                    setSelectedActivityType(type);
                                                    setActivityTypeDropdownOpen(false);
                                                }}
                                                className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-xs"
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* GHG Reduction & Mechanism */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                GHG Emission Reduction Mechanism *
                            </label>
                            <textarea
                                value={ghgReduction}
                                onChange={(e) => setGhgReduction(e.target.value)}
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500 text-xs"
                                placeholder="Describe how GHG emissions are avoided or reduced..."
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                GHG Emission Reduction Pathway *
                            </label>
                            <div
                                onClick={() => setGhcDropdownOpen(!ghcDropdownOpen)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs"
                            >
                                <span className={selectedGhc ? 'text-gray-900' : 'text-gray-500'}>
                                    {selectedGhc || 'Select pathway'}
                                </span>
                                {ghcDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                            <AnimatePresence>
                                {ghcDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                                    >
                                        {ghcOptions.map(option => (
                                            <div
                                                key={option}
                                                onClick={() => {
                                                    setSelectedGhc(option);
                                                    setGhcDropdownOpen(false);
                                                }}
                                                className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-xs"
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Emission Factors */}
                        <div>
                            <p className="text-xs font-medium text-gray-700 mb-4">Emission Factors Used</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="relative">
                                    <div
                                        onClick={() => setEmissionFactorTypeDropdownOpen(!emissionFactorTypeDropdownOpen)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs"
                                    >
                                        <span className={selectedEmissionFactorType ? 'text-gray-900' : 'text-gray-500'}>
                                            {selectedEmissionFactorType || 'Type'}
                                        </span>
                                        {emissionFactorTypeDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>
                                    <AnimatePresence>
                                        {emissionFactorTypeDropdownOpen && (
                                            <motion.div className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                                {emissionFactorTypes.map(t => (
                                                    <div
                                                        key={t}
                                                        onClick={() => {
                                                            setSelectedEmissionFactorType(t);
                                                            setEmissionFactorTypeDropdownOpen(false);
                                                        }}
                                                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-xs"
                                                    >
                                                        {t}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="relative">
                                    <div
                                        onClick={() => setEmissionFactorValueDropdownOpen(!emissionFactorValueDropdownOpen)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs"
                                    >
                                        <span className={selectedEmissionFactorValue ? 'text-gray-900' : 'text-gray-500'}>
                                            {selectedEmissionFactorValue || 'Value'}
                                        </span>
                                        {emissionFactorValueDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>
                                    <AnimatePresence>
                                        {emissionFactorValueDropdownOpen && (
                                            <motion.div className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                                {emissionFactorValues.map(v => (
                                                    <div
                                                        key={v}
                                                        onClick={() => {
                                                            setSelectedEmissionFactorValue(v);
                                                            setEmissionFactorValueDropdownOpen(false);
                                                        }}
                                                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-xs"
                                                    >
                                                        {v}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <button
                                    type="button"
                                    onClick={addEmissionFactor}
                                    disabled={!selectedEmissionFactorType || !selectedEmissionFactorValue}
                                    className={`w-full py-3 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition ${
                                        selectedEmissionFactorType && selectedEmissionFactorValue
                                            ? 'bg-[#044D5E] text-white hover:bg-[#044D5E]/90'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    <Plus size={16} />
                                    Add Factor
                                </button>
                            </div>

                            {emissionFactors.length > 0 && (
                                <div className="mt-6 space-y-3">
                                    {emissionFactors.map((f, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs"
                                        >
                                            <span>{f.value} ({f.type})</span>
                                            <button
                                                type="button"
                                                onClick={() => removeEmissionFactor(i)}
                                                className="text-red-600 hover:text-red-800 transition"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Annual Emission Reduction */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Estimated Annual Emission Reduction (tCO₂e/year) *
                            </label>
                            <textarea
                                value={annualEmissionReduction}
                                onChange={(e) => setAnnualEmissionReduction(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500 text-xs"
                                placeholder="Show calculation: Activity Data × Emission Factor = Result"
                            />
                        </div>

                        {/* Final Status Questions */}
                        {[
                            { key: 'supportingEvidence', label: 'Supporting Evidence Attached?', setter: setSupportingEvidence },
                            { key: 'dnshMet', label: 'DNSH (Do No Significant Harm) Met?', setter: setDnshMet },
                            { key: 'socialSafeguard', label: 'Social Safeguard Met?', setter: setSocialSafeguard },
                            { key: 'alignmentStatus', label: 'Final KGFT Alignment Status?', setter: setAlignmentStatus },
                        ].map(({ label, setter }) => (
                            <div key={label}>
                                <p className="text-xs font-medium text-gray-700 mb-3">{label} *</p>
                                <div className="flex flex-wrap gap-3">
                                    {(['yes', 'no', 'pending'] as const).map(val => {
                                        const currentValue = label.includes('Evidence') ? supportingEvidence :
                                                            label.includes('DNSH') ? dnshMet :
                                                            label.includes('Social') ? socialSafeguard : alignmentStatus;

                                        return (
                                            <button
                                                key={val}
                                                type="button"
                                                onClick={() => setter(val)}
                                                className={`px-5 py-2.5 rounded-lg border text-xs font-medium capitalize transition ${
                                                    currentValue === val
                                                        ? val === 'yes'
                                                            ? 'bg-green-100 border-green-500 text-green-700'
                                                            : val === 'no'
                                                                ? 'bg-red-100 border-red-500 text-red-700'
                                                                : 'bg-orange-100 border-orange-500 text-orange-700'
                                                        : 'border-gray-300 hover:bg-gray-50 text-gray-600'
                                                }`}
                                            >
                                                {val === 'pending' ? 'Pending' : val === 'yes' ? 'Yes' : 'No'}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KGFTAlignment;