'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const currencies = ['USD', 'EUR', 'GBP', 'KES', 'NGN', 'ZAR', 'INR', 'Other'];

const SocialImpact = () => {
    const [currencyOpen, setCurrencyOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
    const [healthSafetyNA, setHealthSafetyNA] = useState(false);

    return (
        <form className="w-full mx-auto px-0 py-0 flex-1 space-y-6">

            {/* Job Creation */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Job Creation (during reporting period)*
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Full time*</p>
                        <input
                            type="number"
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="0"
                            name="fullTimeJobs"
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Part time*</p>
                        <input
                            type="number"
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="0"
                            name="partTimeJobs"
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Women*</p>
                        <input
                            type="number"
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="0"
                            name="womenJobs"
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Youth*</p>
                        <input
                            type="number"
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="0"
                            name="youthJobs"
                            required
                            min="0"
                        />
                    </div>
                </div>
            </div>

            <hr className="border-t border-gray-200 my-6" />

            {/* Workers reached through skills and development/Training */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Workers reached through skills and development/Training*
                </p>
                <input
                    type="number"
                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                    placeholder="0"
                    name="workersTrained"
                    required
                    min="0"
                />
            </div>

            {/* Health & safety Incidents */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Health & safety Incidents (LTIs, etc)*
                </p>
                <div className="flex items-center gap-4">
                    <input
                        type="number"
                        className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="0"
                        name="safetyIncidents"
                        min="0"
                        disabled={healthSafetyNA}
                        required={!healthSafetyNA}
                    />
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={healthSafetyNA}
                            onChange={(e) => setHealthSafetyNA(e.target.checked)}
                            className="w-4 h-4 text-[#1ECEC9] border-gray-300 rounded focus:ring-[#1ECEC9]"
                        />
                        <span className="text-xs text-gray-700">N/A</span>
                    </label>
                </div>
            </div>

            {/* Community Investment */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Community Investment (USD or Local Currency)*
                </p>
                <div className="flex gap-3">
                    <input
                        type="number"
                        className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="0.00"
                        name="communityInvestment"
                        required
                        min="0"
                        step="0.01"
                    />
                    <div className="relative w-32">
                        <div
                            className={`
                                w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                                cursor-pointer transition-all duration-200
                                ${currencyOpen
                                    ? 'border border-gray-400 bg-white shadow-sm'
                                    : 'border border-gray-300 hover:bg-gray-50'
                                }`}
                            onClick={() => setCurrencyOpen((o) => !o)}
                        >
                            <span className="text-gray-600">{selectedCurrency}</span>
                            {currencyOpen ? (
                                <ChevronUp size={18} className="text-gray-400" />
                            ) : (
                                <ChevronDown size={18} className="text-gray-400" />
                            )}
                        </div>
                        <AnimatePresence>
                            {currencyOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                >
                                    {currencies.map((cur) => (
                                        <div
                                            key={cur}
                                            onClick={() => {
                                                setSelectedCurrency(cur);
                                                setCurrencyOpen(false);
                                            }}
                                            className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                        >
                                            {cur}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <hr className="border-t border-gray-200 my-6" />

            {/* Inclusion Metrics */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">Inclusion Metrics*</p>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">% Females in leadership*</p>
                        <div className="relative">
                            <input
                                type="number"
                                className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-gray-400 transition"
                                placeholder="0"
                                name="femaleLeadership"
                                required
                                min="0"
                                max="100"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                                %
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">% PWD Inclusion*</p>
                        <div className="relative">
                            <input
                                type="number"
                                className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-gray-400 transition"
                                placeholder="0"
                                name="pwdInclusion"
                                required
                                min="0"
                                max="100"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                                %
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Diversity Score*</p>
                        <input
                            type="number"
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="e.g., 75/100"
                            name="diversityScore"
                            required
                            min="0"
                            max="100"
                        />
                    </div>
                </div>
            </div>

            <hr className="border-t border-gray-200 my-6" />

        </form>
    );
};

export default SocialImpact;