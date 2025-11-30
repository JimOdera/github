'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ESCompliance = () => {
    const [complianceChecksSelected, setComplianceChecksSelected] = useState<boolean | null>(null);
    const [nonComplianceSelected, setNonComplianceSelected] = useState<boolean | null>(null);
    const [correctiveActionsSelected, setCorrectiveActionsSelected] = useState<boolean | null>(null);
    const [complianceDropdownOpen, setComplianceDropdownOpen] = useState(false);
    const [selectedCompliance, setSelectedCompliance] = useState<string | null>(null);

    const complianceStandards = ['IFC', 'PS', 'NEMA', 'ISO 14001'];

    return (
        <form className="w-full mx-auto px-0 py-0 flex-1 space-y-6">
        
            {/* Compliance Checks conducted this period */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Compliance Checks conducted this period*
                </p>
                <div className="flex gap-3 mb-4">
                    <button
                        type="button"
                        onClick={() => setComplianceChecksSelected((v) => (v === true ? null : true))}
                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                            complianceChecksSelected === true
                                ? 'bg-green-100 border-green-500'
                                : 'hover:bg-gray-50 border-gray-300'
                        } focus:outline-none focus:border-green-500`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => setComplianceChecksSelected((v) => (v === false ? null : false))}
                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                            complianceChecksSelected === false
                                ? 'bg-red-100 border-red-500'
                                : 'hover:bg-gray-50 border-gray-300'
                        } focus:outline-none focus:border-red-500`}
                    >
                        No
                    </button>
                </div>
            </div>

            {/* Any non-compliance incidents? */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Any non-compliance incidents?*
                </p>
                <div className="flex gap-3 mb-4">
                    <button
                        type="button"
                        onClick={() => setNonComplianceSelected((v) => (v === true ? null : true))}
                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                            nonComplianceSelected === true
                                ? 'bg-green-100 border-green-500'
                                : 'hover:bg-gray-50 border-gray-300'
                        } focus:outline-none focus:border-green-500`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => setNonComplianceSelected((v) => (v === false ? null : false))}
                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                            nonComplianceSelected === false
                                ? 'bg-red-100 border-red-500'
                                : 'hover:bg-gray-50 border-gray-300'
                        } focus:outline-none focus:border-red-500`}
                    >
                        No
                    </button>
                </div>
            </div>

            {/* License/permit renewals due */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    License/permit renewals due*
                </p>
                <input
                    type="date"
                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                    name="permitRenewalDate"
                    required
                />
            </div>

            {/* Compliance with IFC PS/ESMS/Local EIA laws */}
            <div className="relative mb-6">
                <p className="text-xs text-gray-700 mb-1">
                    Compliance with IFC PS/ESMS/Local EIA laws*
                </p>
                <div
                    className={`
                        w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                        cursor-pointer transition-all duration-200
                        ${complianceDropdownOpen
                            ? 'border border-gray-400 bg-white shadow-sm'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                    onClick={() => setComplianceDropdownOpen(!complianceDropdownOpen)}
                >
                    <span className="text-gray-600">
                        {selectedCompliance || 'Select Standard'}
                    </span>
                    {complianceDropdownOpen ? (
                        <ChevronUp size={18} className="text-gray-400" />
                    ) : (
                        <ChevronDown size={18} className="text-gray-400" />
                    )}
                </div>
                <AnimatePresence>
                    {complianceDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                        >
                            {complianceStandards.map((standard, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setSelectedCompliance(standard);
                                        setComplianceDropdownOpen(false);
                                    }}
                                    className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                >
                                    {standard}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Corrective action plans (CAPs) in place? */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Corrective action plans (CAPs) in place?*
                </p>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setCorrectiveActionsSelected((v) => (v === true ? null : true))}
                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                            correctiveActionsSelected === true
                                ? 'bg-green-100 border-green-500'
                                : 'hover:bg-gray-50 border-gray-300'
                        } focus:outline-none focus:border-green-500`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => setCorrectiveActionsSelected((v) => (v === false ? null : false))}
                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                            correctiveActionsSelected === false
                                ? 'bg-red-100 border-red-500'
                                : 'hover:bg-gray-50 border-gray-300'
                        } focus:outline-none focus:border-red-500`}
                    >
                        No
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ESCompliance;