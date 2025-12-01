'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface KGFTAlignmentProps {
    projectId: string;
}

const KGFTAlignment = ({ projectId }: KGFTAlignmentProps) => {
    // === FORM STATES ===
    const [projectOwner, setProjectOwner] = useState('');
    const [greenClassificationReason, setGreenClassificationReason] = useState('');
    const [genderEquity, setGenderEquity] = useState<'yes' | 'no' | null>(null);
    const [selectedUseOfProceeds, setSelectedUseOfProceeds] = useState<string | null>(null);
    const [financingUse, setFinancingUse] = useState('');
    const [physicalLocation, setPhysicalLocation] = useState('');
    const [listedInKGFT, setListedInKGFT] = useState<'yes' | 'no' | 'pending' | null>(null);
    const [mitigationCategorySelected, setMitigationCategorySelected] = useState<string[]>([]);
    const [selectedActivityType, setSelectedActivityType] = useState<string | null>(null);
    const [ghgReduction, setGhgReduction] = useState('');
    const [selectedGhcMechanism, setSelectedGhcMechanism] = useState<string | null>(null);
    const [activityScale, setActivityScale] = useState('');
    const [selectedEmissionFactor, setSelectedEmissionFactor] = useState<string | null>(null);
    const [annualEmissionReduction, setAnnualEmissionReduction] = useState('');
    const [supportingEvidence, setSupportingEvidence] = useState<'yes' | 'no' | 'pending' | null>(null);
    const [dnshMet, setDnshMet] = useState<'yes' | 'no' | 'pending' | null>(null);
    const [socialSafeguard, setSocialSafeguard] = useState<'yes' | 'no' | 'pending' | null>(null);
    const [alignmentStatus, setAlignmentStatus] = useState<'yes' | 'no' | 'pending' | null>(null);

    // Dropdown States
    const [useOfProceedsDropdownOpen, setUseOfProceedsDropdownOpen] = useState(false);
    const [activityTypeDropdownOpen, setActivityTypeDropdownOpen] = useState(false);
    const [ghcMechanismDropdownOpen, setGhcMechanismDropdownOpen] = useState(false);
    const [emissionFactorDropdownOpen, setEmissionFactorDropdownOpen] = useState(false);
    const [countyDropdownOpen, setCountyDropdownOpen] = useState(false);

    // Navigation
    const [activeSection, setActiveSection] = useState('Project Basics');
    const basicsRef = useRef<HTMLDivElement>(null);
    const ghgRef = useRef<HTMLDivElement>(null);
    const finalRef = useRef<HTMLDivElement>(null);

    const sectionRefs = {
        'Project Basics': basicsRef,
        'GHG Reduction': ghgRef,
        'Final Status': finalRef,
    };

    // === DATA FROM YOUR TABLE ===
    const useOfProceedsOptions = [
        'Renewable Energy – Solar', 'Renewable Energy – Wind', 'Renewable Energy – Hydro', 'Renewable Energy – Biomass',
        'Energy Storage', 'Energy Transmission & Distribution', 'Grid Infrastructure (Smart Grids, etc.)',
        'Efficient Lighting or Appliances', 'Regenerative Agriculture', 'Agroforestry', 'Climate-Smart Irrigation',
        'Sustainable Crop Production', 'Sustainable Livestock Management', 'Organic Fertiliser Production',
        'Forest Restoration / Afforestation', 'Avoided Deforestation', 'Land Use Carbon Sequestration',
        'Electric Vehicle Manufacturing', 'Electric Mobility Infrastructure (EV Charging)', 'Public Transport Electrification',
        'Non-Motorised Transport Infrastructure', 'Low-Emission Vehicle Fleets', 'Energy Efficient Manufacturing Processes',
        'Production of Renewable Energy Equipment', 'Low-Carbon Cement or Concrete', 'Circular Economy Practices',
        'Green Building Materials', 'Industrial Process Electrification', 'Biogas from Waste', 'Composting and Organic Waste Recycling',
        'Landfill Methane Capture', 'Waste-to-Energy', 'Water Efficiency Technologies', 'Wastewater Treatment and Reuse',
        'Green Building Design', 'Retrofitting for Energy Efficiency', 'Use of Low-Carbon Materials', 'Smart Building Systems',
        'Passive Cooling / Ventilation', 'Smart Grids and Smart Meters', 'Climate Data Platforms', 'Monitoring and Verification Tools',
        'Environmental Management Software'
    ];

    const ghcMechanisms = [
        'Displacement of grid electricity through renewable energy (e.g., solar, wind, hydro)',
        'On-site renewable energy generation (e.g., rooftop solar)',
        'Energy efficiency improvements (e.g., machinery upgrades, LED lighting)',
        'Electrification of transport (e.g., electric vehicles, e-bikes)',
        'Modal shift to low-emission public transport',
        'Process optimization to reduce fuel or electricity use',
        'Waste-to-energy (biogas, landfill methane capture)',
        'Fuel switch to lower-emission fuels (e.g., coal to biomass, diesel to LPG)',
        'Carbon capture and storage (CCS)',
        'Carbon capture and utilisation (CCU)',
        'Adoption of regenerative agriculture to enhance soil carbon',
        'Reforestation, afforestation, or agroforestry',
        'Avoided deforestation or forest degradation',
        'Methane capture from livestock or manure management',
        'Organic waste composting (reduces methane)',
        'Reduced use of synthetic fertilisers',
        'Sustainable biomass or biofuel production',
        'Recovery and recycling of industrial waste heat',
        'Water efficiency measures reducing pumping energy',
        'Digitization or monitoring leading to optimized energy use'
    ];

    const emissionFactors = [
        'Grid electricity – 0.72 tCO₂e/MWh', 'Diesel – 2.68 tCO₂e/m³', 'Petrol – 2.31 tCO₂e/m³', 'LPG – 1.51 tCO₂e/m³',
        'Coal (bituminous) – 2.42 tCO₂e/tonne', 'Natural gas – 0.202 tCO₂e/MWh', 'Solar PV (displaces grid) – 0.72 tCO₂e/MWh',
        'Wind power (displaces grid) – 0.72 tCO₂e/MWh', 'Biogas – 1.00 tCO₂e/household/year', 'Improved cookstove – 2.00 tCO₂e/stove/year',
        'Electric vehicle – 0.20 tCO₂e/km (fuel displacement)', 'Afforestation – 10.00 tCO₂e/ha/year', 'Reforestation – 7.00 tCO₂e/ha/year',
        'Regenerative agriculture – 2.00 tCO₂e/ha/year', 'Manure methane capture – 1.50 tCO₂e/animal/year', 'Composting – 0.50 tCO₂e/tonne organic waste',
        'Organic fertiliser – 0.25 tCO₂e/tonne applied', 'Recycled heat recovery – 0.30 tCO₂e/MWh', 'Water pumping efficiency – 0.72 tCO₂e/MWh saved',
        'Digital monitoring (indirect) – 0.10 tCO₂e/unit/year (estimated)'
    ];

    // === KENYAN COUNTIES ===
    const kenyanCounties = [
        'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa',
        'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi',
        'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu',
        'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa',
        'Murang\'a', 'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua',
        'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River', 'Tharaka-Nithi',
        'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
    ];

    const activityTypes = ['Own Performance', 'Enabling', 'Transitional'];
    const mitigationCategories = ['Renewable Energy', 'Strengthening land carbon sinks', 'Clean mobility', 'Carbon Energy'];

    // === AUTO-CALCULATION (REAL-TIME, BULLETPROOF) ===
    const calculatedReduction = useMemo(() => {
        if (!activityScale || !selectedEmissionFactor) {
            setAnnualEmissionReduction('');
            return '';
        }

        // Extract number from activity scale: handles "20,000", "500", "1.5", commas, spaces
        const scaleMatch = activityScale.match(/[\d,]+(\.\d+)?/);
        const scaleNum = scaleMatch ? parseFloat(scaleMatch[0].replace(/,/g, '')) : null;

        // Extract factor: handles "–", "−", "–" (en-dash, em-dash, hyphen)
        const factorMatch = selectedEmissionFactor.match(/[–−–-]\s*([\d.]+)/);
        const factorNum = factorMatch ? parseFloat(factorMatch[1]) : null;

        if (scaleNum !== null && factorNum !== null && scaleNum > 0 && factorNum > 0) {
            const result = scaleNum * factorNum;
            const formatted = result.toLocaleString('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
            });
            setAnnualEmissionReduction(formatted);
            return formatted;
        }

        setAnnualEmissionReduction('');
        return '';
    }, [activityScale, selectedEmissionFactor]);

    // === NAVIGATION ===
    const handleNavClick = (section: string) => {
        setActiveSection(section);
        sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
        );

        Object.values(sectionRefs).forEach((ref) => ref.current && observer.observe(ref.current));
        return () => Object.values(sectionRefs).forEach((ref) => ref.current && observer.unobserve(ref.current));
    }, []);

    // === UNIQUE STORAGE KEY ===
    const storageKey = `projectDraft_${projectId}_step3`;

    // === AUTO-SAVE ===
    useEffect(() => {
        const saveDraft = () => {
            const draft = {
                projectOwner,
                greenClassificationReason,
                genderEquity,
                selectedUseOfProceeds,
                financingUse,
                physicalLocation,
                listedInKGFT,
                mitigationCategorySelected,
                selectedActivityType,
                ghgReduction,
                selectedGhcMechanism,
                activityScale,
                selectedEmissionFactor,
                annualEmissionReduction,
                supportingEvidence,
                dnshMet,
                socialSafeguard,
                alignmentStatus,
            };
            localStorage.setItem(storageKey, JSON.stringify(draft));
        };

        const timeoutId = setTimeout(saveDraft, 600);
        return () => clearTimeout(timeoutId);
    }, [
        projectOwner, greenClassificationReason, genderEquity, selectedUseOfProceeds, financingUse,
        physicalLocation, listedInKGFT, mitigationCategorySelected, selectedActivityType,
        ghgReduction, selectedGhcMechanism, activityScale, selectedEmissionFactor,
        annualEmissionReduction, supportingEvidence, dnshMet, socialSafeguard, alignmentStatus, projectId,
    ]);

    // === LOAD DRAFT ===
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                const draft = JSON.parse(saved);
                setProjectOwner(draft.projectOwner || '');
                setGreenClassificationReason(draft.greenClassificationReason || '');
                setGenderEquity(draft.genderEquity || null);
                setSelectedUseOfProceeds(draft.selectedUseOfProceeds || null);
                setFinancingUse(draft.financingUse || '');
                setPhysicalLocation(draft.physicalLocation || '');
                setListedInKGFT(draft.listedInKGFT || null);
                setMitigationCategorySelected(draft.mitigationCategorySelected || []);
                setSelectedActivityType(draft.selectedActivityType || null);
                setGhgReduction(draft.ghgReduction || '');
                setSelectedGhcMechanism(draft.selectedGhcMechanism || null);
                setActivityScale(draft.activityScale || '');
                setSelectedEmissionFactor(draft.selectedEmissionFactor || null);
                setAnnualEmissionReduction(draft.annualEmissionReduction || '');
                setSupportingEvidence(draft.supportingEvidence || null);
                setDnshMet(draft.dnshMet || null);
                setSocialSafeguard(draft.socialSafeguard || null);
                setAlignmentStatus(draft.alignmentStatus || null);
            } catch (e) {
                console.warn('Failed to load Step 3 draft for project:', projectId);
            }
        }
    }, [projectId, storageKey]);

    // === UTILITY FUNCTIONS ===
    const toggleMitigationCategory = (category: string) => {
        setMitigationCategorySelected(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const calculateAnnualReduction = () => {
        if (activityScale && selectedEmissionFactor) {
            // Extract numbers from activity scale (e.g., "20,000 MWh/year" → 20000)
            const scaleNum = parseFloat(activityScale.replace(/[^\d.,]/g, '').replace(',', ''));

            // Extract number from emission factor (e.g., "0.72 tCO₂e/MWh" → 0.72)
            const factorNum = parseFloat(selectedEmissionFactor.split('–')[1]?.split(' ')[0] || '0');

            if (!isNaN(scaleNum) && !isNaN(factorNum)) {
                const result = (scaleNum * factorNum).toFixed(2);
                setAnnualEmissionReduction(result);
                return result;
            }
        }
        return '';
    };

    return (
        <div className="w-full mx-auto px-2 md:px-6 py-0">
            <div className="flex gap-8">
                {/* Sidebar */}
                <aside className="hidden lg:block w-72 flex-shrink-0">
                    <div className="sticky top-42 space-y-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Form Sections
                        </h3>
                        <nav className="space-y-1">
                            {[
                                { name: 'Project Basics', icon: ChevronDown },
                                { name: 'GHG Reduction', icon: ChevronDown },
                                { name: 'Final Status', icon: ChevronDown },
                            ].map(({ name, icon: Icon }) => (
                                <button
                                    key={name}
                                    onClick={() => handleNavClick(name)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeSection === name
                                        ? 'bg-[#F2F2F2] text-[#044D5E]'
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

                {/* Main Form */}
                <div className="flex-1 max-w-4xl space-y-8">
                    {/* PROJECT BASICS */}
                    <section ref={basicsRef} data-section="Project Basics" className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#044D5E]">KGFT Alignment</h2>

                        {/* Project Owner */}
                        <div>
                            <label className="block text-xs text-gray-700 mb-2">
                                Indicate who owns or controls the Project* <br />
                                <span className="text-xs text-gray-500">(e.g., mixed gender ownership, Women-owned, Not women-owned, Unknown)</span>
                            </label>
                            <textarea
                                value={projectOwner}
                                onChange={(e) => setProjectOwner(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500 text-xs"
                                placeholder="e.g., Mixed gender ownership, Women-owned cooperative..."
                            />
                        </div>

                        {/* Green Classification Reason */}
                        <div>
                            <label className="block text-xs text-gray-700 mb-2">
                                Briefly explain why the Project is being considered for green classification* <br />
                                <span className="text-xs text-gray-500">(e.g., The solar mini-grid reduces emissions)</span>
                            </label>
                            <textarea
                                value={greenClassificationReason}
                                onChange={(e) => setGreenClassificationReason(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500 text-xs"
                                placeholder="e.g., The solar mini-grid reduces emissions by displacing diesel generators..."
                            />
                        </div>

                        {/* Gender Equity */}
                        <div>
                            <p className="text-xs text-gray-700 mb-3">
                                Does the project contribute to gender equity? (e.g., operated by women)
                            </p>
                            <div className="flex gap-3">
                                {(['yes', 'no'] as const).map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setGenderEquity(val)}
                                        className={`px-4 py-2 rounded-lg border text-xs transition-all ${genderEquity === val
                                            ? val === 'yes'
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : 'bg-red-100 border-red-500 text-red-700'
                                            : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                            }`}
                                    >
                                        {val === 'yes' ? 'Yes' : 'No'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Use of Proceeds Dropdown */}
                        <div className="relative">
                            <label className="block text-xs text-gray-700 mb-2">Use of Proceeds (sub-sector) *</label>
                            <div
                                onClick={() => setUseOfProceedsDropdownOpen(!useOfProceedsDropdownOpen)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs transition"
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
                                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-xs border-b border-gray-100 last:border-b-0"
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
                            <label className="block text-xs text-gray-700 mb-2">
                                Describe what the financing is being used for i.e what/how/why and scale* <br />
                                <span className="text-xs text-gray-500">(e.g., Adoption of regenerative agriculture practices on 500 hectares of degraded cropland in Narok County, focused on soil carbon sequestration and reduced fertiliser use.)</span>
                            </label>
                            <textarea
                                value={financingUse}
                                onChange={(e) => setFinancingUse(e.target.value)}
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500 text-xs"
                                placeholder="Describe the specific use of financing..."
                            />
                        </div>

                        {/* Physical Location */}
                        {/* Physical Location - County Dropdown */}
                        <div className="relative">
                            <label className="block text-xs text-gray-700 mb-2">
                                Enter the physical location of the Project that is specific to the use of proceeds* <br />
                                <span className="text-xs text-gray-500">(Select County)</span>
                            </label>
                            <div
                                onClick={() => setCountyDropdownOpen(!countyDropdownOpen)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs transition bg-white"
                            >
                                <span className={physicalLocation ? 'text-gray-900' : 'text-gray-500'}>
                                    {physicalLocation || 'Select County'}
                                </span>
                                {countyDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>

                            <AnimatePresence>
                                {countyDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                                    >
                                        {kenyanCounties.map(county => (
                                            <div
                                                key={county}
                                                onClick={() => {
                                                    setPhysicalLocation(county);
                                                    setCountyDropdownOpen(false);
                                                }}
                                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-xs border-b border-gray-100 last:border-b-0"
                                            >
                                                {county}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Listed in KGFT */}
                        <div>
                            <p className="text-xs text-gray-700 mb-3">Is Activity listed in KGFT Mitigation Categories? *</p>
                            <div className="flex flex-wrap gap-3">
                                {(['yes', 'no', 'pending'] as const).map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setListedInKGFT(val)}
                                        className={`px-4 py-2 rounded-lg border text-xs capitalize transition-all ${listedInKGFT === val
                                            ? val === 'yes'
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : val === 'no'
                                                    ? 'bg-red-100 border-red-500 text-red-700'
                                                    : 'bg-orange-100 border-orange-500 text-orange-700'
                                            : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                            }`}
                                    >
                                        {val === 'pending' ? 'Pending' : val.charAt(0).toUpperCase() + val.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mitigation Categories */}
                        <div>
                            <p className="text-xs text-gray-700 mb-3">KGFT Mitigation Category *</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {mitigationCategories.map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => toggleMitigationCategory(cat)}
                                        className={`px-4 py-2 rounded-lg border text-xs transition-all ${mitigationCategorySelected.includes(cat)
                                            ? 'bg-green-100 border-green-500 text-green-700'
                                            : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Project Type */}
                        <div className="relative">
                            <label className="block text-xs text-gray-700 mb-2">Project Type *</label>
                            <div
                                onClick={() => setActivityTypeDropdownOpen(!activityTypeDropdownOpen)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs transition"
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
                                        className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto"
                                    >
                                        {activityTypes.map(type => (
                                            <div
                                                key={type}
                                                onClick={() => {
                                                    setSelectedActivityType(type);
                                                    setActivityTypeDropdownOpen(false);
                                                }}
                                                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-xs border-b border-gray-100 last:border-b-0"
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>

                    <hr className="border-gray-200 my-8" />

                    {/* GHG REDUCTION */}
                    <section ref={ghgRef} data-section="GHG Reduction" className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#044D5E]">GHG Reduction</h2>

                        {/* GHG Reduction Description */}
                        <div>
                            <label className="block text-xs text-gray-700 mb-2">
                                GHG Reduction* <br />
                                <span className="text-xs text-gray-500">Briefly state if the project results in GHG reduction</span>
                            </label>
                            <textarea
                                value={ghgReduction}
                                onChange={(e) => setGhgReduction(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500 text-xs"
                                placeholder="e.g., This project reduces GHG emissions by displacing fossil fuel-based electricity generation..."
                            />
                        </div>

                        {/* GHG Emission Reduction Mechanism */}
                        <div className="relative">
                            <label className="block text-xs text-gray-700 mb-2">
                                GHG Emission Reduction Mechanism* <br />
                                <span className="text-xs text-gray-500">Select from available mechanisms</span>
                            </label>
                            <div
                                onClick={() => setGhcMechanismDropdownOpen(!ghcMechanismDropdownOpen)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs transition"
                            >
                                <span className={selectedGhcMechanism ? 'text-gray-900' : 'text-gray-500'}>
                                    {selectedGhcMechanism || 'Select mechanism'}
                                </span>
                                {ghcMechanismDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                            <AnimatePresence>
                                {ghcMechanismDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                                    >
                                        {ghcMechanisms.map(mechanism => (
                                            <div
                                                key={mechanism}
                                                onClick={() => {
                                                    setSelectedGhcMechanism(mechanism);
                                                    setGhcMechanismDropdownOpen(false);
                                                }}
                                                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-xs border-b border-gray-100 last:border-b-0"
                                            >
                                                {mechanism}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Activity Scale & Emission Factor */}
                        <div className="grid md:grid-cols-1 gap-6 mb-6">
                            {/* Activity Scale */}
                            <div>
                                <label className="block text-xs text-gray-700 mb-2">
                                    Quantify the scale of the activity* <br />
                                    <span className="text-xs text-gray-500">(e.g., "20,000 MWh/year", "500 hectares")</span>
                                </label>
                                <input
                                    type="text"
                                    value={activityScale}
                                    onChange={(e) => setActivityScale(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                                    placeholder="e.g., 20,000 MWh/year"
                                />
                            </div>

                            {/* Emission Factor */}
                            {/* Emission Factor Dropdown + Auto Result */}
                            <div>
                                <label className="block text-xs text-gray-700 mb-2">
                                    Select Emission Factor*
                                </label>
                                <div
                                    onClick={() => setEmissionFactorDropdownOpen(!emissionFactorDropdownOpen)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs transition"
                                >
                                    <span className={selectedEmissionFactor ? 'text-gray-900' : 'text-gray-500'}>
                                        {selectedEmissionFactor || 'Select emission factor'}
                                    </span>
                                    {emissionFactorDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>

                                <AnimatePresence>
                                    {emissionFactorDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                                        >
                                            {emissionFactors.map(factor => (
                                                <div
                                                    key={factor}
                                                    onClick={() => {
                                                        setSelectedEmissionFactor(factor);
                                                        setEmissionFactorDropdownOpen(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-xs border-b border-gray-100 last:border-b-0"
                                                >
                                                    {factor}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div>

                                {/* Simple, clean result below — left-aligned, text-xs */}
                                {calculatedReduction ? (
                                    <p className="mt-0 text-xs text-green-700">
                                        Estimated Annual Reduction: <span className="font-bold">{calculatedReduction} tCO₂e/year</span>
                                    </p>
                                ) : activityScale && selectedEmissionFactor ? (
                                    <p className="mt-3 text-xs text-red-600">
                                        Invalid format — please check scale and factor
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-200 my-8" />

                    {/* FINAL STATUS */}
                    <section ref={finalRef} data-section="Final Status" className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#044D5E]">Final Status</h2>

                        {/* Supporting Evidence */}
                        <div>
                            <p className="text-xs text-gray-700 mb-3">
                                Supporting Evidence Attached?* <br />
                                <span className="text-xs text-gray-500">Select Yes if documents are available (e.g., EIA, feasibility study, emissions model); No if not; Pending if in progress.</span>
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {(['yes', 'no', 'pending'] as const).map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setSupportingEvidence(val)}
                                        className={`px-4 py-2 rounded-lg border text-xs capitalize transition-all ${supportingEvidence === val
                                            ? val === 'yes'
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : val === 'no'
                                                    ? 'bg-red-100 border-red-500 text-red-700'
                                                    : 'bg-orange-100 border-orange-500 text-orange-700'
                                            : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                            }`}
                                    >
                                        {val === 'pending' ? 'Pending' : val.charAt(0).toUpperCase() + val.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* DNSH Met */}
                        <div>
                            <p className="text-xs text-gray-700 mb-3">
                                DNSH Met?* <br />
                                <span className="text-xs text-gray-500">"Do No Significant Harm" — select Yes if activity does not harm other environmental objectives, No if it does, Pending if under review. Requires EIA or screening tool.</span>
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {(['yes', 'no', 'pending'] as const).map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setDnshMet(val)}
                                        className={`px-4 py-2 rounded-lg border text-xs capitalize transition-all ${dnshMet === val
                                            ? val === 'yes'
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : val === 'no'
                                                    ? 'bg-red-100 border-red-500 text-red-700'
                                                    : 'bg-orange-100 border-orange-500 text-orange-700'
                                            : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                            }`}
                                    >
                                        {val === 'pending' ? 'Pending' : val.charAt(0).toUpperCase() + val.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Social Safeguard */}
                        <div>
                            <p className="text-xs text-gray-700 mb-3">
                                Social Safeguard Met?* <br />
                                <span className="text-xs text-gray-500">Select Yes if the project complies with labor laws, ILO conventions, and human rights standards; No or Pending if unclear.</span>
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {(['yes', 'no', 'pending'] as const).map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setSocialSafeguard(val)}
                                        className={`px-4 py-2 rounded-lg border text-xs capitalize transition-all ${socialSafeguard === val
                                            ? val === 'yes'
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : val === 'no'
                                                    ? 'bg-red-100 border-red-500 text-red-700'
                                                    : 'bg-orange-100 border-orange-500 text-orange-700'
                                            : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                            }`}
                                    >
                                        {val === 'pending' ? 'Pending' : val.charAt(0).toUpperCase() + val.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Alignment Status */}
                        <div>
                            <p className="text-xs text-gray-700 mb-3">
                                Alignment Status?* <br />
                                <span className="text-xs text-gray-500">Final status based on the full evaluation: Aligned if all criteria are met, Pending Further Review if incomplete, Not Aligned if any criterion fails.</span>
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {(['yes', 'no', 'pending'] as const).map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setAlignmentStatus(val)}
                                        className={`px-4 py-2 rounded-lg border text-xs capitalize transition-all ${alignmentStatus === val
                                            ? val === 'yes'
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : val === 'no'
                                                    ? 'bg-red-100 border-red-500 text-red-700'
                                                    : 'bg-orange-100 border-orange-500 text-orange-700'
                                            : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                            }`}
                                    >
                                        {val === 'pending' ? 'Pending Further Review' : val === 'yes' ? 'Aligned' : 'Not Aligned'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default KGFTAlignment;