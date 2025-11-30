'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';

const Governance = () => {
    const [relationshipManagerDropdownOpen, setRelationshipManagerDropdownOpen] = useState(false);
    const [keyHolderDropdownOpen, setKeyHolderDropdownOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('Responsibility & Oversight');

    const sectionRefs = {
        'Responsibility & Oversight': useRef<HTMLDivElement>(null),
    };

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

    return (
        <div className="w-full mx-auto px-2 md:px-6 py-0 space-y-6">
            <div className="flex gap-4">
                {/* Sticky Sidebar Navigation */}
                <div className="w-72 hidden md:flex flex-col gap-2 sticky top-38 self-start">
                    <h1 className="text-lg font-semibold text-gray-600">Content</h1>
                    <div className="flex flex-col gap-1">
                        {[
                            { name: 'Responsibility & Oversight', icon: Users },
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
                    {/* Responsibility & Oversight Section */}
                    <div ref={sectionRefs['Responsibility & Oversight']} data-section="Responsibility & Oversight">
                        <h1 className="text-lg font-medium text-gray-600 mb-6">Responsibility & Oversight</h1>
                        <div className="relative mb-6">
                            <p className="text-xs text-gray-700 mb-1 font-medium">Relationship Manager*</p>
                            <div
                                className={`
                                    w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                                    cursor-pointer transition-all duration-200
                                    ${relationshipManagerDropdownOpen
                                        ? 'border border-gray-400 bg-white shadow-sm'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                                onClick={() => setRelationshipManagerDropdownOpen(!relationshipManagerDropdownOpen)}
                            >
                                <span className="text-gray-600">Select Relationship Manager</span>
                                {relationshipManagerDropdownOpen ? (
                                    <ChevronUp size={18} className="text-gray-400" />
                                ) : (
                                    <ChevronDown size={18} className="text-gray-400" />
                                )}
                            </div>
                            <AnimatePresence>
                                {relationshipManagerDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                    >
                                        {relationshipManagers.map((manager, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setRelationshipManagerDropdownOpen(false)}
                                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                            >
                                                {manager}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="relative mb-6">
                            <p className="text-xs text-gray-700 mb-1 font-medium">KeyHolder (KH) Expert- M&E Responsible*</p>
                            <div
                                className={`
                                    w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                                    cursor-pointer transition-all duration-200
                                    ${keyHolderDropdownOpen
                                        ? 'border border-gray-400 bg-white shadow-sm'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                                onClick={() => setKeyHolderDropdownOpen(!keyHolderDropdownOpen)}
                            >
                                <span className="text-gray-600">Select KeyHolder Expert</span>
                                {keyHolderDropdownOpen ? (
                                    <ChevronUp size={18} className="text-gray-400" />
                                ) : (
                                    <ChevronDown size={18} className="text-gray-400" />
                                )}
                            </div>
                            <AnimatePresence>
                                {keyHolderDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                                    >
                                        {keyHolders.map((keyHolder, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setKeyHolderDropdownOpen(false)}
                                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                            >
                                                {keyHolder}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Governance;