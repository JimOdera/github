'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
    DollarSign,
    TrendingUp,
    Leaf,
    Users,
    FileText,
    Shield,
    CheckSquare,
    ShoppingCart,
    Globe,
    LucideIcon,
} from 'lucide-react';

// Child components
import EnvMetrics from './EnvMetrics/page';
import ESCompliance from './ESCompliance/page';
import HumanRights from './HumanRights/page';
import IFRS from './IFRS/page';
import MaterialTopic from './MaterialTopic/page';
import MetricTracker from './MetricTracker/page';
import Procurement from './Procurement/page';
import SocialImpact from './SocialImpact/page';
import Stakeholder from './Stakeholder/page';

// ──────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────
interface SidebarItem {
    name: string;
    icon: LucideIcon;
}

interface ActivityDetailsProps {
    selectedCategory: string | null;
    onCategorySelect: (category: string) => void;
}

type EmissionEntry = {
    id: string;
    category: string;
    details: string;
    result: number;
};

// Proper component type that allows optional onEmissionsUpdate prop
type CategoryComponent = React.FC<{ onEmissionsUpdate?: (entries: EmissionEntry[]) => void }>;

// ──────────────────────────────────────────────────────────────
// Sidebar configuration
// ──────────────────────────────────────────────────────────────
const categorySidebarItems: Record<string, SidebarItem[]> = {
    'Environmental Metrics': [],
    'Social Impact': [
        { name: 'Community Investment', icon: Users },
        { name: 'Employee Well-being', icon: Shield },
    ],
    'Stakeholder Engagement': [
        { name: 'Engagement Overview', icon: Users },
        { name: 'Feedback Summary', icon: FileText },
    ],
    'Material Topic': [
        { name: 'Topic List', icon: CheckSquare },
        { name: 'Prioritisation Matrix', icon: Globe },
    ],
    'Human Rights': [
        { name: 'Policy & Due Diligence', icon: Shield },
        { name: 'Grievance Mechanism', icon: FileText },
    ],
    'E&S Compliance': [
        { name: 'Regulatory Checklist', icon: CheckSquare },
        { name: 'Audit Findings', icon: FileText },
    ],
    'Custom Metric Tracker': [
        { name: 'Metric Definition', icon: Globe },
        { name: 'Historical Data', icon: TrendingUp },
    ],
    'Procurement Spend Diversity': [
        { name: 'Supplier Diversity', icon: ShoppingCart },
        { name: 'Spend Breakdown', icon: DollarSign },
    ],
    'IFRS S1 &S2 Alignment Tracking': [
        { name: 'S1 General Requirements', icon: FileText },
        { name: 'S2 Climate-Related Disclosures', icon: Leaf },
    ],
};

// Fully type-safe component map — no more `any`!
const categoryComponents: Record<string, CategoryComponent> = {
    'Environmental Metrics': EnvMetrics,
    'Social Impact': SocialImpact,
    'Stakeholder Engagement': Stakeholder,
    'Material Topic': MaterialTopic,
    'Human Rights': HumanRights,
    'E&S Compliance': ESCompliance,
    'Custom Metric Tracker': MetricTracker,
    'Procurement Spend Diversity': Procurement,
    'IFRS S1 &S2 Alignment Tracking': IFRS,
};

// ──────────────────────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────────────────────
const ActivityDetails: React.FC<ActivityDetailsProps> = ({ selectedCategory }) => {
    const [activeSection, setActiveSection] = useState<string>('Activity Type');

    // Live emissions tracking from EnvMetrics
    const [emissionEntries, setEmissionEntries] = useState<EmissionEntry[]>([]);
    const [emissionsByCategory, setEmissionsByCategory] = useState<Record<string, number>>({});

    // Update totals when entries change
    useEffect(() => {
        const totals: Record<string, number> = {};
        emissionEntries.forEach(entry => {
            totals[entry.category] = (totals[entry.category] || 0) + entry.result;
        });
        setEmissionsByCategory(totals);
    }, [emissionEntries]);

    const formatValue = (val: number) => val.toFixed(4).replace(/\.?0+$/, '');

    const sectionRefs = {
        'Activity Type': useRef<HTMLDivElement>(null),
        'Activity Details': useRef<HTMLDivElement>(null),
    };

    const handleNavClick = (section: string) => {
        setActiveSection(section);

        const topRef = sectionRefs[section as keyof typeof sectionRefs]?.current;
        if (topRef) {
            topRef.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const childEl = document.querySelector(`[data-section="${CSS.escape(section)}"]`) as HTMLElement;
        if (childEl) {
            childEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Intersection Observer — now with correct dependencies
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
            { root: null, threshold: 0.6, rootMargin: '-100px 0px -100px 0px' }
        );

        Object.values(sectionRefs).forEach((ref) => ref.current && observer.observe(ref.current));
        document.querySelectorAll('[data-section]').forEach((el) => {
            const name = el.getAttribute('data-section');
            if (name && !['Activity Type', 'Activity Details'].includes(name)) {
                observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, [selectedCategory, sectionRefs]); // ← Fixed: sectionRefs added

    return (
        <div className="w-full mx-auto px-4 md:px-6 py-0 space-y-6">
            <div className="flex gap-6">
                {/* Sticky Sidebar */}
                <div className="w-80 hidden md:flex flex-col gap-3 sticky top-36 self-start z-10">
                    <h1 className="text-lg font-medium text-gray-600 mb-2">Content</h1>
                    <div className="space-y-3">
                        {/* Activity Type (only when no category selected) */}
                        {!selectedCategory && (
                            <div
                                onClick={() => handleNavClick('Activity Type')}
                                className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all ${
                                    activeSection === 'Activity Type'
                                        ? 'bg-[#E4F6F3] text-[#044D5E] font-medium shadow-sm'
                                        : 'hover:bg-gray-50 text-gray-600'
                                }`}
                            >
                                <DollarSign size={18} />
                                <span className="text-sm">Activity Type</span>
                            </div>
                        )}

                        {/* Environmental Metrics: Live Emissions */}
                        {selectedCategory === 'Environmental Metrics' && emissionEntries.length > 0 && (
                            <>
                                <div className="px-5">
                                    <p className="text-xs font-bold text-[#044D5E] uppercase tracking-wider">
                                        Calculated Emissions
                                    </p>
                                </div>

                                {Object.entries(emissionsByCategory).map(([category, total]) => (
                                    <div
                                        key={category}
                                        onClick={() => handleNavClick('Emissions (GHG)')}
                                        className="flex items-center justify-between border-t-2 border-dashed border-gray-200 px-0 py-2.5 rounded-lg cursor-pointer hover:bg-teal-50 transition group"
                                    >
                                        <div className="flex items-center gap-2 text-xs text-gray-700">
                                            <Leaf size={15} className="text-green-600" />
                                            <span className="truncate max-w-44 font-medium">{category}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-mono font-bold text-[#044D5E] text-sm">
                                                {formatValue(total)}
                                            </span>
                                            <span className="text-xs text-gray-500">tCO₂e</span>
                                        </div>
                                    </div>
                                ))}

                                <div className="px-0 pt-4 mt-2 border-t-2 border-dashed border-gray-200">
                                    <div className="flex justify-between items-center py-3 bg-gradient-to-r from-[#E3FCEF] to-[#CFF3EB] rounded-xl px-5 shadow-inner">
                                        <span className="text-sm font-bold text-[#044D5E]">Total Emissions</span>
                                        <span className="font-mono text-xl font-extrabold text-[#044D5E]">
                                            {formatValue(
                                                Object.values(emissionsByCategory).reduce((a, b) => a + b, 0)
                                            )}
                                            <span className="text-sm ml-1">tCO₂e</span>
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* All other categories */}
                        {selectedCategory &&
                            selectedCategory !== 'Environmental Metrics' &&
                            categorySidebarItems[selectedCategory]?.map(({ name, icon: Icon }) => (
                                <div
                                    key={name}
                                    onClick={() => handleNavClick(name)}
                                    className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all ${
                                        activeSection === name
                                            ? 'bg-gray-100 text-[#044D5E] font-medium'
                                            : 'hover:bg-gray-50 text-gray-600'
                                    }`}
                                >
                                    <Icon size={18} />
                                    <p className="text-sm">{name}</p>
                                </div>
                            ))}

                        {/* Placeholder when no emissions yet */}
                        {selectedCategory === 'Environmental Metrics' && emissionEntries.length === 0 && (
                            <div className="w-full px-0 py-8 text-center text-gray-400">
                                <Leaf size={32} className="mx-auto mb-2  opacity-30" />
                                <p className="text-xs">
                                    Emissions will appear here
                                    <br />
                                    once you add calculations
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <form className="w-full flex-1 space-y-8">
                    {/* Activity Type Header */}
                    <div
                        ref={sectionRefs['Activity Type']}
                        data-section="Activity Type"
                        className="scroll-mt-32"
                    >
                        {!selectedCategory && <h1 className="text-lg font-medium text-gray-600 mb-6">Activity Type</h1>}

                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-lg font-semibold text-[#044D5E]">
                                    {selectedCategory || 'No category selected'}
                                </p>
                            </div>
                            <Link
                                href="/activities/create-activities"
                                className="text-xs text-[#044D5E] underline hover:no-underline"
                            >
                                Change
                            </Link>
                        </div>
                    </div>

                    {/* Selected Category Component */}
                    <div
                        ref={sectionRefs['Activity Details']}
                        data-section="Activity Details"
                        className="min-h-96 scroll-mt-32"
                    >
                        {selectedCategory ? (
                            (() => {
                                const Component = categoryComponents[selectedCategory];
                                if (!Component) {
                                    return <p className="text-red-600">Component not found for: {selectedCategory}</p>;
                                }

                                return selectedCategory === 'Environmental Metrics' ? (
                                    <Component onEmissionsUpdate={setEmissionEntries} />
                                ) : (
                                    <Component />
                                );
                            })()
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No activity category selected.</p>
                                <Link
                                    href="/activities/create-activities"
                                    className="text-[#044D5E] underline text-sm mt-4 inline-block"
                                >
                                    Go back and choose one
                                </Link>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ActivityDetails;