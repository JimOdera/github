'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    ChevronDown,
    ChevronUp,
    Plus,
    Trash2,
    Calendar,
    Building2,
    Globe,
    Target,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const countries = [
    'Kenya',
    'Uganda',
    'Tanzania',
    'Rwanda',
    'Ethiopia',
    'South Africa',
    'Nigeria',
    'Ghana',
    'Morocco',
    'Egypt',
    'United States',
    'United Kingdom',
    'Other',
];

const stakeholderViews = [
    'Internal Management',
    'Investor Reporting',
    'Regulator (e.g., CBK, CMA, NSE)',
    'Lender (DFI/Bank)',
    'Community/Beneficiary',
    'Custom',
];

interface SDG {
    id: number;
    selected: boolean;
}

interface Indicator {
    id: string;
    sdgId: number;
    indicator: string;
    target: string;
    dataSource: string;
}

interface ProjectOverviewProps {
    activityId: string;
}

const ProjectOverview = ({ activityId }: ProjectOverviewProps) => {
    // ──────────────────────────────────────────────────────────────
    // Form state
    // ──────────────────────────────────────────────────────────────
    const [entityName, setEntityName] = useState('');
    const [businessUnit, setBusinessUnit] = useState('');
    const [reportingStart, setReportingStart] = useState('');
    const [reportingEnd, setReportingEnd] = useState('');
    const [stakeholderView, setStakeholderView] = useState('');
    const [customStakeholder, setCustomStakeholder] = useState('');
    const [showCustomStakeholder, setShowCustomStakeholder] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

    const [orgName, setOrgName] = useState('');
    const [orgCountry, setOrgCountry] = useState('');
    const [orgCity, setOrgCity] = useState('');
    const [orgReportingPeriod, setOrgReportingPeriod] = useState('');
    const [numEmployees, setNumEmployees] = useState('');

    const [sdgs, setSdgs] = useState<SDG[]>(
        Array.from({ length: 17 }, (_, i) => ({ id: i + 1, selected: false }))
    );

    const [indicators, setIndicators] = useState<Indicator[]>([]);

    // ──────────────────────────────────────────────────────────────
    // Storage key for this activity
    // ──────────────────────────────────────────────────────────────
    const storageKey = `activityDraft_${activityId}_step1`;

    // Auto-save to localStorage
    useEffect(() => {
        const saveDraft = () => {
            const draft = {
                entityName,
                businessUnit,
                reportingStart,
                reportingEnd,
                stakeholderView,
                customStakeholder,
                showCustomStakeholder,
                orgName,
                orgCountry,
                orgCity,
                orgReportingPeriod,
                numEmployees,
                sdgs,
                indicators,
            };
            localStorage.setItem(storageKey, JSON.stringify(draft));
        };

        const timeoutId = setTimeout(saveDraft, 600);
        return () => clearTimeout(timeoutId);
    }, [
        entityName,
        businessUnit,
        reportingStart,
        reportingEnd,
        stakeholderView,
        customStakeholder,
        showCustomStakeholder,
        orgName,
        orgCountry,
        orgCity,
        orgReportingPeriod,
        numEmployees,
        sdgs,
        indicators,
        activityId,
    ]);

    // Load draft on mount
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                const draft = JSON.parse(saved);
                setEntityName(draft.entityName || '');
                setBusinessUnit(draft.businessUnit || '');
                setReportingStart(draft.reportingStart || '');
                setReportingEnd(draft.reportingEnd || '');
                setStakeholderView(draft.stakeholderView || '');
                setCustomStakeholder(draft.customStakeholder || '');
                setShowCustomStakeholder(draft.showCustomStakeholder || false);
                setOrgName(draft.orgName || '');
                setOrgCountry(draft.orgCountry || '');
                setOrgCity(draft.orgCity || '');
                setOrgReportingPeriod(draft.orgReportingPeriod || '');
                setNumEmployees(draft.numEmployees || '');
                setSdgs(draft.sdgs || Array.from({ length: 17 }, (_, i) => ({ id: i + 1, selected: false })));
                setIndicators(draft.indicators || []);
            } catch (e) {
                console.warn('Failed to load Step 1 draft for activity:', activityId);
            }
        }
    }, [activityId, storageKey]);

    // ──────────────────────────────────────────────────────────────
    // Navigation & scroll handling
    // ──────────────────────────────────────────────────────────────
    const [activeSection, setActiveSection] = useState('Project Basics');

    const projectBasicsRef = useRef<HTMLDivElement>(null);
    const organizationRef = useRef<HTMLDivElement>(null);
    const sdgsRef = useRef<HTMLDivElement>(null);
    const indicatorsRef = useRef<HTMLDivElement>(null);

    const sectionRefs = useMemo(
        () => ({
            'Project Basics': projectBasicsRef,
            'Your Organisation': organizationRef,
            'Aligned SDGs': sdgsRef,
            'Indicators & Evidence': indicatorsRef,
        }),
        []
    );

    const navItems = [
        { name: 'Project Basics', icon: Target },
        { name: 'Your Organisation', icon: Building2 },
        { name: 'Aligned SDGs', icon: Globe },
        { name: 'Indicators Evidence', icon: Target },
    ];

    const handleNavClick = (section: string) => {
        setActiveSection(section);
        sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
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
            { threshold: 0.4, rootMargin: '-100px 0px -50% 0px' }
        );

        Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, [sectionRefs]);

    // ──────────────────────────────────────────────────────────────
    // SDG handling
    // ──────────────────────────────────────────────────────────────
    const toggleSDG = (id: number) => {
        const wasSelected = sdgs.find((s) => s.id === id)?.selected;

        setSdgs((prev) =>
            prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
        );

        // Auto-create first indicator row when SDG is selected
        if (!wasSelected) {
            setIndicators((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    sdgId: id,
                    indicator: '',
                    target: '',
                    dataSource: '',
                },
            ]);
        } else {
            // Remove all indicators for this SDG when deselected
            setIndicators((prev) => prev.filter((i) => i.sdgId !== id));
        }
    };

    // ──────────────────────────────────────────────────────────────
    // Indicator handling
    // ──────────────────────────────────────────────────────────────
    const updateIndicator = (
        id: string,
        field: keyof Omit<Indicator, 'id' | 'sdgId'>,
        value: string
    ) => {
        setIndicators((prev) =>
            prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
        );
    };

    const addIndicatorRow = (sdgId: number) => {
        setIndicators((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                sdgId,
                indicator: '',
                target: '',
                dataSource: '',
            },
        ]);
    };

    const removeIndicator = (id: string) => {
        setIndicators((prev) => prev.filter((i) => i.id !== id));
    };

    const indicatorsBySDG = indicators.reduce((acc, ind) => {
        if (!acc[ind.sdgId]) acc[ind.sdgId] = [];
        acc[ind.sdgId].push(ind);
        return acc;
    }, {} as Record<number, Indicator[]>);

    // ──────────────────────────────────────────────────────────────
    // Render
    // ──────────────────────────────────────────────────────────────
    return (
        <div className="flex gap-8 max-w-7xl mx-auto py-8">
            {/* Sticky Sidebar – hidden on mobile */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-36 space-y-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Form Sections
                    </h3>
                    <nav className="space-y-1">
                        {navItems.map(({ name, icon: Icon }) => (
                            <button
                                key={name}
                                onClick={() => handleNavClick(name)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeSection === name
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

            {/* Main content */}
            <div className="flex-1 space-y-12 pb-20">
                {/* ───── Project Basics ───── */}
                <section
                    ref={projectBasicsRef}
                    data-section="Project Basics"
                    className="space-y-8 scroll-mt-24"
                >
                    <h2 className="text-2xl font-semibold text-[#044D5E]">Project Basics</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Entity/Activity Name *
                            </label>
                            <input
                                type="text"
                                value={entityName}
                                onChange={(e) => setEntityName(e.target.value)}
                                placeholder="e.g. Makueni Solar Mini-Grid Project"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Business Unit/Division *
                            </label>
                            <input
                                type="text"
                                value={businessUnit}
                                onChange={(e) => setBusinessUnit(e.target.value)}
                                placeholder="Renewable Energy Division"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                ESG Reporting Period *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={reportingStart}
                                        onChange={(e) => setReportingStart(e.target.value)}
                                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                                    />
                                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <span className="absolute left-3 -top-2 bg-white px-2 text-xs text-gray-500">
                                        Start Date
                                    </span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={reportingEnd}
                                        onChange={(e) => setReportingEnd(e.target.value)}
                                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                                    />
                                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <span className="absolute left-3 -top-2 bg-white px-2 text-xs text-gray-500">
                                        End Date
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Stakeholder View *
                            </label>
                            <div className="relative">
                                <div
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 transition text-xs"
                                >
                                    <span className={stakeholderView ? 'text-gray-900' : 'text-gray-500'}>
                                        {stakeholderView || 'Select stakeholder view'}
                                    </span>
                                    {dropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-white border border border-gray-200 rounded-lg shadow-lg z-20"
                                        >
                                            {stakeholderViews.map((view) => (
                                                <div
                                                    key={view}
                                                    onClick={() => {
                                                        setStakeholderView(view);
                                                        setShowCustomStakeholder(view === 'Custom');
                                                        setDropdownOpen(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-xs"
                                                >
                                                    {view}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {showCustomStakeholder && (
                                <input
                                    type="text"
                                    value={customStakeholder}
                                    onChange={(e) => setCustomStakeholder(e.target.value)}
                                    placeholder="e.g. Supply Chain Partners"
                                    className="mt-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                                />
                            )}
                        </div>
                    </div>
                </section>

                <hr className="border-gray-200" />

                {/* ───── Your Organisation ───── */}
                <section
                    ref={organizationRef}
                    data-section="Your Organisation"
                    className="space-y-6 scroll-mt-24"
                >
                    <h2 className="text-2xl font-semibold text-[#044D5E]">Your Organisation</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Name of your organisation *
                            </label>
                            <input
                                type="text"
                                value={orgName}
                                onChange={(e) => setOrgName(e.target.value)}
                                placeholder="Green Horizon Ltd"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                            />
                        </div>

                        {/* === CUSTOM COUNTRY DROPDOWN – matches Stakeholder View exactly === */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2 block">
                                Country *
                            </label>

                            <div className="relative">
                                {/* Clickable trigger */}
                                <div
                                    onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 transition text-xs"
                                >
                                    <span className={orgCountry ? 'text-gray-900' : 'text-gray-500'}>
                                        {orgCountry || 'Select country'}
                                    </span>
                                    {countryDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>

                                {/* Dropdown menu */}
                                <AnimatePresence>
                                    {countryDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-30 overflow-hidden"
                                        >
                                            {countries.map((country) => (
                                                <div
                                                    key={country}
                                                    onClick={() => {
                                                        setOrgCountry(country);
                                                        setCountryDropdownOpen(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-xs transition"
                                                >
                                                    {country}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">City *</label>
                            <input
                                type="text"
                                value={orgCity}
                                onChange={(e) => setOrgCity(e.target.value)}
                                placeholder="Nairobi"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Reporting Period *
                            </label>
                            <input
                                type="text"
                                value={orgReportingPeriod}
                                onChange={(e) => setOrgReportingPeriod(e.target.value)}
                                placeholder="FY 2024 (Jan – Dec 2024)"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Number of Employees *
                            </label>
                            <input
                                type="number"
                                value={numEmployees}
                                onChange={(e) => setNumEmployees(e.target.value)}
                                placeholder="250"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                            />
                        </div>
                    </div>
                </section>

                <hr className="border-gray-200" />

                {/* ───── Aligned SDGs ───── */}
                <section ref={sdgsRef} data-section="Aligned SDGs" className="space-y-6 scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-[#044D5E]">Aligned SDG's</h2>
                    <p className="text-xs text-gray-600">
                        Select all Sustainable Development Goals this project/entity contributes to
                    </p>

                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
                        {sdgs.map((sdg) => (
                            <button
                                key={sdg.id}
                                type="button"
                                onClick={() => toggleSDG(sdg.id)}
                                className={`
                                relative rounded-xl overflow-hidden transition-all duration-300
                                ${sdg.selected
                                        ? 'ring-2 ring-[#1ECEC9] ring-opacity-40 scale-105 shadow-xl'
                                        : 'hover:shadow-lg hover:scale-105 shadow-md'
                                    }
                                `}
                            >
                                <div className="aspect-square relative">
                                    <Image
                                        src={`/images/sdg/sdg${sdg.id}.png`}
                                        alt={`SDG ${sdg.id}`}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Checkbox - bottom right */}
                                    <div className="absolute bottom-2 right-2">
                                        <div
                                            className={`
                                                w-7 h-7 rounded-md border-1 flex items-center justify-center shadow-md
                                                transition-all duration-200
                                                ${sdg.selected
                                                    ? 'bg-[#1ECEC9] border-[#1ECEC9]'
                                                    : 'bg-white border-gray-300'
                                                }
                                            `}
                                        >
                                            {sdg.selected && (
                                                <motion.svg
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-5 h-5 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={4}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </motion.svg>
                                            )}
                                        </div>
                                    </div>

                                    {/* SDG Number Label */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 text-center">
                                        <span className="text-white text-xs font-bold drop-shadow-lg">
                                            SDG {sdg.id}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                <hr className="border-gray-200" />

                {/* ───── Indicators Evidence per SDG ───── */}
                <section
                    ref={indicatorsRef}
                    data-section="Indicators Evidence"
                    className="space-y-8 scroll-mt-24"
                >
                    <h2 className="text-2xl font-semibold text-[#044D5E]">Indicators Evidence per SDG</h2>

                    {Object.keys(indicatorsBySDG).length === 0 ? (
                        <p className="text-gray-500 text-center py-12 text-xs">
                            Select SDGs above to add contribution indicators
                        </p>
                    ) : (
                        Object.entries(indicatorsBySDG).map(([sdgId, sdgIndicators]) => {
                            const num = Number(sdgId);
                            return (
                                <div key={sdgId} className="border border-gray-200 rounded-xl p-6 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 relative flex-shrink-0">
                                            <Image
                                                src={`/images/sdg/sdg${num}.png`}
                                                alt={`SDG ${num}`}
                                                fill
                                                className="rounded-lg object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-[#044D5E]">
                                                SDG {num} Contribution Indicators
                                            </h3>
                                            <button
                                                onClick={() => addIndicatorRow(num)}
                                                className="mt-2 flex items-center gap-2 text-xs text-[#044D5E] hover:underline"
                                            >
                                                <Plus size={16} /> Add another indicator
                                            </button>
                                        </div>
                                    </div>

                                    {sdgIndicators.map((ind) => (
                                        <div
                                            key={ind.id}
                                            className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4"
                                        >
                                            <input
                                                placeholder="Indicator Description"
                                                value={ind.indicator}
                                                onChange={(e) =>
                                                    updateIndicator(ind.id, 'indicator', e.target.value)
                                                }
                                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                                            />
                                            <input
                                                placeholder="Target Contribution"
                                                value={ind.target}
                                                onChange={(e) =>
                                                    updateIndicator(ind.id, 'target', e.target.value)
                                                }
                                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                                            />
                                            <div className="flex gap-3">
                                                <input
                                                    placeholder="Data Source/Evidence"
                                                    value={ind.dataSource}
                                                    onChange={(e) =>
                                                        updateIndicator(ind.id, 'dataSource', e.target.value)
                                                    }
                                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                                                />
                                                <button
                                                    onClick={() => removeIndicator(ind.id)}
                                                    className="text-red-500 hover:text-red-700 self-center"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })
                    )}
                </section>
            </div>
        </div>
    );
};

export default ProjectOverview;