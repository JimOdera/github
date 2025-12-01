'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    UploadCloud,
    Trash2,
    ChevronDown,
    ChevronUp,
    FileText,
    MapPin,
    Tag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const LocationPicker = dynamic(() => import('../../../../components/LocationPicker'), {
    ssr: false,
});

const taxonomyCategories = [
    'Climate Change Mitigation',
    'Climate Change Adaptation',
    'Sustainable Water and Wastewater Management',
    'Transition to Circular Economy',
    'Pollution Prevention and Control',
    'Biodiversity and Ecosystem Protection',
];

const regions = [
    'East Africa',
    'Central Africa',
    'Southern Africa',
    'North Africa',
    'West Africa',
];

const urbanRuralOptions = ['Rural (<5,000 people)', 'Urban (up to 50,000 people)'];

interface ProjectOverviewProps {
    projectId: string;
}

const ProjectOverview = ({ projectId }: ProjectOverviewProps) => {
    // Form States
    const [projectTitle, setProjectTitle] = useState('');
    const [institution, setInstitution] = useState('');
    const [description, setDescription] = useState('');
    const [taxonomyCategory, setTaxonomyCategory] = useState('');
    const [taxonomyDropdownOpen, setTaxonomyDropdownOpen] = useState(false);
    const [subCategory, setSubCategory] = useState('');
    const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState(false);
    const [region, setRegion] = useState('');
    const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
    const [county, setCounty] = useState('');
    const [urbanRural, setUrbanRural] = useState('');
    const [urbanRuralDropdownOpen, setUrbanRuralDropdownOpen] = useState(false);
    const [pickedCoords, setPickedCoords] = useState<{ lat: number; lng: number } | null>(null);

    // Unlimited Images
    const [projectImages, setProjectImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    // Navigation
    const [activeSection, setActiveSection] = useState('Project Basics');
    const basicsRef = useRef<HTMLDivElement>(null);
    const typeRef = useRef<HTMLDivElement>(null);
    const locationRef = useRef<HTMLDivElement>(null);

    const sectionRefs = useMemo(
        () => ({
            'Project Basics': basicsRef,
            'Project Type': typeRef,
            'Location & Geotagging': locationRef,
        }),
        []
    );

    const navItems = [
        { name: 'Project Basics', icon: FileText },
        { name: 'Project Type', icon: Tag },
        { name: 'Location & Geotagging', icon: MapPin },
    ];

    const handleNavClick = (section: string) => {
        setActiveSection(section);
        const ref = sectionRefs[section as keyof typeof sectionRefs].current;
        ref?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            { threshold: 0.4, rootMargin: '-100px 0px -50% 0px' }
        );

        Object.values(sectionRefs).forEach((ref) => ref.current && observer.observe(ref.current));

        return () => {
            Object.values(sectionRefs).forEach((ref) => ref.current && observer.unobserve(ref.current));
        };
    }, [sectionRefs]);

    // Unique storage key for this project & step
    const storageKey = `projectDraft_${projectId}_step1`;

    // Auto-save all data including unlimited images (base64)
    useEffect(() => {
        const saveDraft = () => {
            const draft = {
                projectTitle,
                institution,
                description,
                taxonomyCategory,
                subCategory,
                region,
                county,
                urbanRural,
                imagePreviews, // base64 strings — safe for localStorage
                pickedCoords,
            };
            localStorage.setItem(storageKey, JSON.stringify(draft));
        };

        const timeoutId = setTimeout(saveDraft, 600);
        return () => clearTimeout(timeoutId);
    }, [
        projectTitle,
        institution,
        description,
        taxonomyCategory,
        subCategory,
        region,
        county,
        urbanRural,
        imagePreviews,
        pickedCoords,
        projectId,
    ]);

    // Load draft on mount
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                const draft = JSON.parse(saved);
                setProjectTitle(draft.projectTitle || '');
                setInstitution(draft.institution || '');
                setDescription(draft.description || '');
                setTaxonomyCategory(draft.taxonomyCategory || '');
                setSubCategory(draft.subCategory || '');
                setRegion(draft.region || '');
                setCounty(draft.county || '');
                setUrbanRural(draft.urbanRural || '');
                setImagePreviews(draft.imagePreviews || []);
                setPickedCoords(draft.pickedCoords || null);
            } catch (e) {
                console.warn('Failed to load Step 1 draft');
            }
        }
    }, [projectId, storageKey]);

    // Handle unlimited image uploads
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const imageFiles = files.filter((f) => f.type.startsWith('image/'));

        if (imageFiles.length === 0) return;

        setProjectImages((prev) => [...prev, ...imageFiles]);

        imageFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews((prev) => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });

        // Reset input so same file can be re-selected
        e.target.value = '';
    };

    const removeImage = (index: number) => {
        setProjectImages((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full mx-auto px-2 md:px-6 py-0 space-y-6">
            <div className="flex gap-8">
                {/* Sidebar */}
                <aside className="hidden lg:block w-72 flex-shrink-0">
                    <div className="sticky top-42 space-y-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
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

                {/* Main Content */}
                <div className="flex-1 space-y-12 pb-20">
                    {/* Project Basics */}
                    <section ref={basicsRef} data-section="Project Basics" className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#044D5E]">Project Basics</h2>

                        <div className="space-y-6">
                            {/* Project Title */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Project Title *</label>
                                <input
                                    type="text"
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition text-xs"
                                    placeholder="e.g. Solar Mini-Grid in Kwale County"
                                />
                            </div>

                            {/* Institution / Organization */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Institution / Organization *</label>
                                <input
                                    type="text"
                                    value={institution}
                                    onChange={(e) => setInstitution(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                                    placeholder="e.g. Kenya Climate Innovation Center"
                                />
                            </div>

                            {/* Project Description */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">Project Description *</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500 text-xs"
                                    placeholder="Provide a detailed overview of your project..."
                                />
                            </div>

                            {/* UNLIMITED Project Images */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-4">
                                    Project Images * (Unlimited)
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {imagePreviews.map((src, i) => (
                                        <div key={i} className="relative group">
                                            <Image
                                                src={src}
                                                alt={`Project image ${i + 1}`}
                                                width={300}
                                                height={200}
                                                className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Upload Button */}
                                    <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50 bg-gray-50 transition">
                                        <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                                        <span className="text-xs text-gray-600 text-center px-2">
                                            Click to add more images
                                        </span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 mt-3">
                                    {imagePreviews.length} image{imagePreviews.length !== 1 ? 's' : ''} uploaded
                                </p>
                            </div>

                            {/* Green Finance Taxonomy Category */}
                            <div className="relative">
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                    Green Finance Taxonomy Category *
                                </label>
                                <div
                                    onClick={() => setTaxonomyDropdownOpen(!taxonomyDropdownOpen)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 transition text-xs"
                                >
                                    <span className={taxonomyCategory ? 'text-gray-900' : 'text-gray-500'}>
                                        {taxonomyCategory || 'Select category'}
                                    </span>
                                    {taxonomyDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>

                                <AnimatePresence>
                                    {taxonomyDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                                        >
                                            {taxonomyCategories.map((item) => (
                                                <div
                                                    key={item}
                                                    onClick={() => {
                                                        setTaxonomyCategory(item);
                                                        setSubCategory(item); // optional: auto-sync
                                                        setTaxonomyDropdownOpen(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-xs"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* Project Type */}
                    <section ref={typeRef} data-section="Project Type" className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#044D5E]">Project Type</h2>

                        <div className="relative">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Project Sub-Category (linked to taxonomy) *
                            </label>
                            <div
                                onClick={() => setSubCategoryDropdownOpen(!subCategoryDropdownOpen)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 transition text-xs"
                            >
                                <span className={subCategory ? 'text-gray-900' : 'text-gray-500'}>
                                    {subCategory || 'Select sub-category'}
                                </span>
                                {subCategoryDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>

                            <AnimatePresence>
                                {subCategoryDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
                                    >
                                        {taxonomyCategories.map((item) => (
                                            <div
                                                key={item}
                                                onClick={() => {
                                                    setSubCategory(item);
                                                    setSubCategoryDropdownOpen(false);
                                                }}
                                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-xs"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* Location & Geotagging */}
                    <section ref={locationRef} data-section="Location & Geotagging" className="space-y-6 scroll-mt-24">
                        <h2 className="text-2xl font-semibold text-[#044D5E]">Location & Geotagging</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="block text-xs font-medium text-gray-700 mb-2">Country / Region</label>
                                <div
                                    onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 transition text-xs"
                                >
                                    <span className={region ? 'text-gray-900' : 'text-gray-500'}>
                                        {region || 'Select region'}
                                    </span>
                                    {regionDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>

                                <AnimatePresence>
                                    {regionDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
                                        >
                                            {regions.map((r) => (
                                                <div
                                                    key={r}
                                                    onClick={() => {
                                                        setRegion(r);
                                                        setRegionDropdownOpen(false);
                                                    }}
                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-xs"
                                                >
                                                    {r}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-2">County / Subregion *</label>
                                <input
                                    type="text"
                                    value={county}
                                    onChange={(e) => setCounty(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-xs"
                                    placeholder="e.g. Kisumu County"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <LocationPicker onCoordsChange={setPickedCoords} />
                            <p className="mt-3 text-xs font-medium text-gray-800">
                                <span className="text-gray-600">Coordinates:</span>{' '}
                                <span className="font-mono text-green-700">
                                    {pickedCoords
                                        ? `${pickedCoords.lat.toFixed(6)}, ${pickedCoords.lng.toFixed(6)}`
                                        : '— Move or click the map to select'}
                                </span>
                            </p>
                        </div>

                        <div className="relative">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                                Rural / Urban Classification *
                            </label>
                            <div
                                onClick={() => setUrbanRuralDropdownOpen(!urbanRuralDropdownOpen)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 transition text-xs"
                            >
                                <span className={urbanRural ? 'text-gray-900' : 'text-gray-500'}>
                                    {urbanRural || 'Select classification'}
                                </span>
                                {urbanRuralDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>

                            <AnimatePresence>
                                {urbanRuralDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
                                    >
                                        {urbanRuralOptions.map((opt) => (
                                            <div
                                                key={opt}
                                                onClick={() => {
                                                    setUrbanRural(opt);
                                                    setUrbanRuralDropdownOpen(false);
                                                }}
                                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-xs"
                                            >
                                                {opt}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;