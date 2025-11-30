'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const currencies = ['USD', 'EUR', 'GBP', 'KES', 'NGN', 'ZAR', 'INR', 'Other'];

const Procurement = () => {
    const [totalSpendCurrencyOpen, setTotalSpendCurrencyOpen] = useState(false);
    const [totalSpendCurrency, setTotalSpendCurrency] = useState<string>('USD');

    const [targetSpendCurrencyOpen, setTargetSpendCurrencyOpen] = useState(false);
    const [targetSpendCurrency, setTargetSpendCurrency] = useState<string>('USD');

    return (
        <form className="w-full mx-auto px-0 py-0 flex-1 space-y-6">

            {/* Total procurement spend for the period */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Total procurement spend for the period
                </p>
                <div className="flex gap-3">
                    <input
                        type="number"
                        className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="Enter amount"
                        name="totalSpendAmount"
                        min="0"
                        step="0.01"
                    />
                    <div className="relative w-32">
                        <div
                            className={`
                                w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                                cursor-pointer transition-all duration-200
                                ${totalSpendCurrencyOpen
                                    ? 'border border-gray-400 bg-white shadow-sm'
                                    : 'border border-gray-300 hover:bg-gray-50'
                                }`}
                            onClick={() => setTotalSpendCurrencyOpen(!totalSpendCurrencyOpen)}
                        >
                            <span className="text-gray-600">{totalSpendCurrency}</span>
                            {totalSpendCurrencyOpen ? (
                                <ChevronUp size={18} className="text-gray-400" />
                            ) : (
                                <ChevronDown size={18} className="text-gray-400" />
                            )}
                        </div>
                        <AnimatePresence>
                            {totalSpendCurrencyOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                >
                                    {currencies.map((cur, i) => (
                                        <div
                                            key={i}
                                            onClick={() => {
                                                setTotalSpendCurrency(cur);
                                                setTotalSpendCurrencyOpen(false);
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

            {/* Women-Owned */}
            <div className="mb-6">
                <h2 className="text-sm font-medium text-[#044D5E] mb-4">Women-Owned</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Amount spent*</p>
                        <input
                            type="number"
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="0.00"
                            name="womenAmount"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Number of Suppliers*</p>
                        <input
                            type="number"
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="0"
                            name="womenSuppliers"
                            required
                            min="0"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Notes*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., 12 certified women-owned suppliers in Q3"
                        name="womenNotes"
                        required
                    />
                </div>
            </div>

            <hr className="border-t border-gray-200 my-6" />

            {/* Youth-Owned */}
            <div className="mb-6">
                <h2 className="text-sm font-medium text-[#044D5E] mb-4">Youth-Owned</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Amount spent*</p>
                        <input
                            type="number"
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="0.00"
                            name="youthAmount"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Number of Suppliers*</p>
                        <input
                            type="number"
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="0"
                            name="youthSuppliers"
                            required
                            min="0"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Notes*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., Youth-led startups in tech services"
                        name="youthNotes"
                        required
                    />
                </div>
            </div>

            <hr className="border-t border-gray-200 my-6" />

            {/* PWD-Led (Disability-owned) */}
            <div className="mb-6">
                <h2 className="text-sm font-medium text-[#044D5E] mb-4">
                    PWD-Led (Disability-owned)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Amount spent*</p>
                        <input
                            type="number"
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="0.00"
                            name="pwdAmount"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Number of Suppliers*</p>
                        <input
                            type="number"
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="0"
                            name="pwdSuppliers"
                            required
                            min="0"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Notes*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., Accessibility-focused vendors"
                        name="pwdNotes"
                        required
                    />
                </div>
            </div>

            <hr className="border-t border-gray-200 my-6" />

            {/* Internal targets for diverse spend */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Internal targets for diverse spend (if any)
                </p>
                <div className="flex gap-3">
                    <input
                        type="number"
                        className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="Enter target amount"
                        name="targetSpendAmount"
                        min="0"
                        step="0.01"
                    />
                    <div className="relative w-32">
                        <div
                            className={`
                                w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                                cursor-pointer transition-all duration-200
                                ${targetSpendCurrencyOpen
                                    ? 'border border-gray-400 bg-white shadow-sm'
                                    : 'border border-gray-300 hover:bg-gray-50'
                                }`}
                            onClick={() => setTargetSpendCurrencyOpen(!targetSpendCurrencyOpen)}
                        >
                            <span className="text-gray-600">{targetSpendCurrency}</span>
                            {targetSpendCurrencyOpen ? (
                                <ChevronUp size={18} className="text-gray-400" />
                            ) : (
                                <ChevronDown size={18} className="text-gray-400" />
                            )}
                        </div>
                        <AnimatePresence>
                            {targetSpendCurrencyOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                >
                                    {currencies.map((cur, i) => (
                                        <div
                                            key={i}
                                            onClick={() => {
                                                setTargetSpendCurrency(cur);
                                                setTargetSpendCurrencyOpen(false);
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
        </form>
    );
};

export default Procurement;