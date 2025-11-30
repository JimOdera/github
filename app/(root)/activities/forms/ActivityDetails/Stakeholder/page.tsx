'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Stakeholder = () => {
    const [selectedStakeholders, setSelectedStakeholders] = useState<string[]>([]);
    const [otherStakeholder, setOtherStakeholder] = useState('');
    const [methodDropdownOpen, setMethodDropdownOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const stakeholders = [
        'Investors',
        'Government',
        'Regulators',
        'Local Communities',
        'CSOs',
        'NGOs',
        'Employees',
        'Other',
    ];

    const methods = [
        'Townhalls/ community meetings',
        'Surveys/ Feedback mechanism',
        'ESG Forums/ Webinars',
        'Grievance Redress Mechanism',
    ];

    const handleStakeholderToggle = (stakeholder: string) => {
        if (stakeholder === 'Other') {
            setSelectedStakeholders((prev) =>
                prev.includes('Other')
                    ? prev.filter((s) => s !== 'Other')
                    : [...prev, 'Other']
            );
            if (!selectedStakeholders.includes('Other')) {
                setOtherStakeholder('');
            }
        } else {
            setSelectedStakeholders((prev) =>
                prev.includes(stakeholder)
                    ? prev.filter((s) => s !== stakeholder)
                    : [...prev, stakeholder]
            );
        }
    };

    return (
        <form className="w-full mx-auto px-0 py-0 flex-1 space-y-6">

            {/* Stakeholder Engaged this period */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Stakeholder Engaged this period*
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {stakeholders.map((stakeholder) => (
                        <button
                            key={stakeholder}
                            type="button"
                            onClick={() => handleStakeholderToggle(stakeholder)}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                selectedStakeholders.includes(stakeholder)
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-green-500`}
                        >
                            {stakeholder}
                        </button>
                    ))}
                </div>

                {/* Other input */}
                {selectedStakeholders.includes('Other') && (
                    <div className="mt-4">
                        <input
                            type="text"
                            value={otherStakeholder}
                            onChange={(e) => setOtherStakeholder(e.target.value)}
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="Specify other stakeholder"
                            name="otherStakeholder"
                            required
                        />
                    </div>
                )}
            </div>

            {/* Engagement Methods */}
            <div className="relative mb-6">
                <p className="text-xs text-gray-700 mb-1">
                    Engagement Methods*
                </p>
                <div
                    className={`
                        w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                        cursor-pointer transition-all duration-200
                        ${methodDropdownOpen
                            ? 'border border-gray-400 bg-white shadow-sm'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                    onClick={() => setMethodDropdownOpen(!methodDropdownOpen)}
                >
                    <span className="text-gray-600">{selectedMethod || 'Select Method'}</span>
                    {methodDropdownOpen ? (
                        <ChevronUp size={18} className="text-gray-400" />
                    ) : (
                        <ChevronDown size={18} className="text-gray-400" />
                    )}
                </div>
                <AnimatePresence>
                    {methodDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                        >
                            {methods.map((method, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setSelectedMethod(method);
                                        setMethodDropdownOpen(false);
                                    }}
                                    className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                >
                                    {method}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Key issues raised */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Key issues raised*
                </p>
                <textarea
                    className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                    placeholder="e.g., Water access, job creation, transparency"
                    name="keyIssues"
                    required
                ></textarea>
            </div>

            {/* Resolutions or responses */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Resolutions or responses*
                </p>
                <textarea
                    className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                    placeholder="e.g., Community fund established, policy updated"
                    name="resolutions"
                    required
                ></textarea>
            </div>
        </form>
    );
};

export default Stakeholder;