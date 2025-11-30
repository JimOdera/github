'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, UploadCloud } from 'lucide-react';

const MaterialTopic = () => {
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
    const [selectedSource, setSelectedSource] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const topics = [
        'Climate Change',
        'Water Stewardship',
        'Circular Economy',
        'Labour Practices',
        'Data Privacy',
        'Responsible Sourcing',
        'Other',
    ];

    const sources = [
        'Stakeholder Input',
        'Internal Risk Assessment',
        'Consultant-led Assessment',
        'Regulatory Focus',
        'Annual Update',
    ];

    const handleTopicToggle = (topic: string) => {
        setSelectedTopics((prev) => {
            if (prev.includes(topic)) {
                return prev.filter((t) => t !== topic);
            }
            if (prev.length >= 5) {
                return prev;
            }
            return [...prev, topic];
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
            setUploadedFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const openFilePicker = () => fileInputRef.current?.click();

    return (
        <form className="w-full mx-auto px-0 py-0 flex-1 space-y-6">
           
            {/* Top material topics this period (max 5) */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Top material topics this period (max 5)*
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {topics.map((topic) => (
                        <button
                            key={topic}
                            type="button"
                            onClick={() => handleTopicToggle(topic)}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                selectedTopics.includes(topic)
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-green-500`}
                        >
                            {topic}
                        </button>
                    ))}
                </div>
                {selectedTopics.length >= 5 && (
                    <p className="text-xs text-amber-600 mt-2">Maximum 5 topics selected.</p>
                )}
            </div>

            {/* Source of Materiality assessment */}
            <div className="relative mb-6">
                <p className="text-xs text-gray-700 mb-1">
                    Source of Materiality assessment*
                </p>
                <div
                    className={`
                        w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center 
                        cursor-pointer transition-all duration-200
                        ${sourceDropdownOpen
                            ? 'border border-gray-400 bg-white shadow-sm'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                    onClick={() => setSourceDropdownOpen(!sourceDropdownOpen)}
                >
                    <span className="text-gray-600">{selectedSource || 'Select Source'}</span>
                    {sourceDropdownOpen ? (
                        <ChevronUp size={18} className="text-gray-400" />
                    ) : (
                        <ChevronDown size={18} className="text-gray-400" />
                    )}
                </div>
                <AnimatePresence>
                    {sourceDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                        >
                            {sources.map((source, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setSelectedSource(source);
                                        setSourceDropdownOpen(false);
                                    }}
                                    className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                >
                                    {source}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Updated Materiality Matrix? */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Updated Materiality Matrix?*
                </p>
                <div className="flex items-center justify-center w-full">
                    {/* Drag & Drop + Click Wrapper */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={openFilePicker}
                        className="w-full"
                    >
                        <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 focus:outline-none focus:border-gray-400 transition">
                            <div className="flex flex-col items-center space-y-1">
                                <UploadCloud className="w-6 h-6 text-gray-500" />
                                <span className="text-xs text-gray-500">
                                    {uploadedFile
                                        ? uploadedFile.name
                                        : 'Click to upload or drag and drop'}
                                </span>
                                <span className="text-xs text-gray-400">
                                    PNG, JPG, PDF up to 10MB
                                </span>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*,.pdf"
                                onChange={handleFileChange}
                                className="hidden"
                                name="materialityMatrix"
                                required
                            />
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default MaterialTopic;