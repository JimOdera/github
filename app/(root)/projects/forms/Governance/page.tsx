'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';

interface GovernanceProps {
    projectId: string;
}

const Governance = ({ projectId }: GovernanceProps) => {
    // Form State
    const [relationshipManager, setRelationshipManager] = useState<string>('');
    const [keyHolderExpert, setKeyHolderExpert] = useState<string>('');

    // Dropdown States
    const [relationshipManagerDropdownOpen, setRelationshipManagerDropdownOpen] = useState(false);
    const [keyHolderDropdownOpen, setKeyHolderDropdownOpen] = useState(false);

    // Navigation
    const sectionRef = useRef<HTMLDivElement>(null);

    const relationshipManagers = [
        'John Smith',
        'Jane Doe',
        'Alex Johnson',
        'Emily Brown',
    ];

    const keyHolders = [
        'Sarah Wilson',
        'Michael Lee',
        'Laura Davis',
        'Robert Taylor',
    ];

    // === UNIQUE STORAGE KEY FOR THIS PROJECT + STEP 4 ===
    const storageKey = `projectDraft_${projectId}_step4`;

    // Auto-save to localStorage (debounced) — per project
    useEffect(() => {
        const saveDraft = () => {
            const draft = {
                relationshipManager,
                keyHolderExpert,
            };
            localStorage.setItem(storageKey, JSON.stringify(draft));
        };

        const timeoutId = setTimeout(saveDraft, 600);
        return () => clearTimeout(timeoutId);
    }, [relationshipManager, keyHolderExpert, projectId]);

    // Load draft on mount — only for this project
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                const draft = JSON.parse(saved);
                setRelationshipManager(draft.relationshipManager || '');
                setKeyHolderExpert(draft.keyHolderExpert || '');
            } catch (e) {
                console.warn('Failed to load Step 4 draft for project:', projectId);
            }
        }
    }, [projectId, storageKey]);

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
                            <Users size={18} />
                            <span className="text-xs">Responsibility & Oversight</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content
                <div ref={sectionRef} className="flex-1 max-w-4xl">
                    <h1 className="text-2xl font-semibold text-[#044D5E] mb-8">
                        Responsibility & Oversight
                    </h1>

                    <div className="space-y-8">
                        {/* Relationship Manager */}
                        <div className="relative">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Relationship Manager *
                            </label>
                            <div
                                onClick={() => setRelationshipManagerDropdownOpen(!relationshipManagerDropdownOpen)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 transition text-xs"
                            >
                                <span className={relationshipManager ? 'text-gray-900' : 'text-gray-500'}>
                                    {relationshipManager || 'Select Relationship Manager'}
                                </span>
                                {relationshipManagerDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>

                            <AnimatePresence>
                                {relationshipManagerDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                                    >
                                        {relationshipManagers.map((manager) => (
                                            <div
                                                key={manager}
                                                onClick={() => {
                                                    setRelationshipManager(manager);
                                                    setRelationshipManagerDropdownOpen(false);
                                                }}
                                                className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-xs text-gray-700"
                                            >
                                                {manager}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* KeyHolder Expert */}
                        <div className="relative">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                KeyHolder (KH) Expert – M&E Responsible *
                            </label>
                            <div
                                onClick={() => setKeyHolderDropdownOpen(!keyHolderDropdownOpen)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 transition text-xs"
                            >
                                <span className={keyHolderExpert ? 'text-gray-900' : 'text-gray-500'}>
                                    {keyHolderExpert || 'Select KeyHolder Expert'}
                                </span>
                                {keyHolderDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>

                            <AnimatePresence>
                                {keyHolderDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                                    >
                                        {keyHolders.map((expert) => (
                                            <div
                                                key={expert}
                                                onClick={() => {
                                                    setKeyHolderExpert(expert);
                                                    setKeyHolderDropdownOpen(false);
                                                }}
                                                className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-xs text-gray-700"
                                            >
                                                {expert}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            
    );
};

export default Governance;