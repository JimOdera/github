'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { UploadCloud, Plus, Trash2, ChevronDown, ChevronUp, User, Briefcase, Globe, FileText, Users, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const geographicScopes = [
  'National (Kenya)',
  'East Africa',
  'Sub-Saharan Africa',
  'Africa-wide',
  'Global',
];

const expertiseOptions = [
  'ESG Advisory/Strategy',
  'MRV (Measurement, Reporting, Verification)',
  'ESG Assurance/Audit',
  'Carbon Credit Trading',
  'Carbon Project Development',
  'NEMA Certified EIA Expert',
  'Environmental & Social Safeguards',
  'Climate Risk & Scenario Modelling',
  'SDG Impact Assessment',
  'Other',
];

interface Project {
  id: string;
  projectName: string;
  client: string;
  year: string;
  role: string;
  description: string;
}

interface Reference {
  id: string;
  name: string;
  contact: string;
}

const LS_KEY = 'form_basic_details';

const BasicDetails = () => {
  // Form States
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [description, setDescription] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [geographicScope, setGeographicScope] = useState('');
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false);

  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [otherExpertise, setOtherExpertise] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const [projects, setProjects] = useState<Project[]>([
    { id: '1', projectName: '', client: '', year: '', role: '', description: '' },
  ]);

  const [references, setReferences] = useState<Reference[]>([
    { id: '1', name: '', contact: '' },
  ]);

  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  // Store base64 for preview, and for storage
  const [portfolioPreview, setPortfolioPreview] = useState<string | null>(null);

  // Navigation & Scroll Logic
  const [activeSection, setActiveSection] = useState('Basic Information');

  const basicInfoRef = useRef<HTMLDivElement>(null);
  const serviceOfferingsRef = useRef<HTMLDivElement>(null);
  const previousWorkRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const referencesRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(() => ({
    'Basic Information': basicInfoRef,
    'Service Offerings': serviceOfferingsRef,
    'Previous Work': previousWorkRef,
    'Upload Portfolio': portfolioRef,
    'Professional References': referencesRef,
  }), []);

  const navItems = [
    { name: 'Basic Information', icon: User },
    { name: 'Service Offerings', icon: Briefcase },
    { name: 'Previous Work', icon: FileText },
    { name: 'Upload Portfolio', icon: ImageIcon },
    { name: 'Professional References', icon: Users },
  ];

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    const ref = sectionRefs[section as keyof typeof sectionRefs].current;
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      { threshold: 0.4, rootMargin: '-100px 0px -50% 0px' }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [sectionRefs]);

  // Expertise Toggle
  const toggleExpertise = (item: string) => {
    if (item === 'Other') {
      setShowOtherInput(!showOtherInput);
      return;
    }
    setSelectedExpertise(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  // Projects
  const addProject = () => {
    if (projects.length < 3) {
      setProjects([...projects, {
        id: Date.now().toString(),
        projectName: '', client: '', year: '', role: '', description: ''
      }]);
    }
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  // References
  const addReference = () => {
    setReferences([...references, { id: Date.now().toString(), name: '', contact: '' }]);
  };

  const removeReference = (id: string) => {
    setReferences(references.filter(r => r.id !== id));
  };

  const updateReference = (id: string, field: 'name' | 'contact', value: string) => {
    setReferences(references.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  // File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPortfolioFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPortfolioPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ---- Local Storage logic ----

  // Load from local storage on mount
  useEffect(() => {
    const ls = typeof window !== 'undefined' && window.localStorage.getItem(LS_KEY);
    if (ls) {
      try {
        const data = JSON.parse(ls);
        setFullName(data.fullName ?? '');
        setOrganization(data.organization ?? '');
        setRole(data.role ?? '');
        setEmail(data.email ?? '');
        setPhone(data.phone ?? '');
        setLinkedin(data.linkedin ?? '');
        setDescription(data.description ?? '');
        setYearsExperience(data.yearsExperience ?? '');
        setGeographicScope(data.geographicScope ?? '');
        setSelectedExpertise(data.selectedExpertise ?? []);
        setOtherExpertise(data.otherExpertise ?? '');
        setShowOtherInput(typeof data.otherExpertise === 'string' && data.otherExpertise.length > 0);
        setProjects(data.projects ?? [{ id: '1', projectName: '', client: '', year: '', role: '', description: '' }]);
        setReferences(data.references ?? [{ id: '1', name: '', contact: '' }]);
        if (data.portfolioPreview) setPortfolioPreview(data.portfolioPreview);
        // If portfolio preview, leave file as null (can't restore File instance)
      } catch (e) {
        // Clear corrupted storage
        window.localStorage.removeItem(LS_KEY);
      }
    }
  }, []);

  // Save to local storage when any field changes
  useEffect(() => {
    const formData = {
      fullName,
      organization,
      role,
      email,
      phone,
      linkedin,
      description,
      yearsExperience,
      geographicScope,
      selectedExpertise,
      otherExpertise,
      projects,
      references,
      portfolioPreview, // (optional, base64 string)
    };
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LS_KEY, JSON.stringify(formData));
    }
  }, [
    fullName, organization, role, email, phone, linkedin, description, yearsExperience,
    geographicScope, selectedExpertise, otherExpertise, projects, references, portfolioPreview
  ]);

  return (
    <div className="flex gap-8 max-w-7xl mx-auto">
      {/* Sticky Sidebar Navigation - Hidden on Mobile */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-36 space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Form Sections</h3>
          <nav className="space-y-1">
            {navItems.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => handleNavClick(name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeSection === name
                    ? 'bg-[#F2F2F2] text-[#044D5E] font-medium shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Form Content */}
      <div className="flex-1 space-y-12 pb-20">
        {/* Basic Information */}
        <section ref={basicInfoRef} data-section="Basic Information" className="space-y-6 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-[#044D5E]">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: 'Full Name *', value: fullName, set: setFullName, placeholder: 'John Doe' },
              { label: 'Organization/Firm *', value: organization, set: setOrganization, placeholder: 'Green Future Consulting Ltd' },
              { label: 'Role/Position *', value: role, set: setRole, placeholder: 'Sustainability Lead' },
              { label: 'Email Address *', value: email, set: setEmail, type: 'email', placeholder: 'john@greenfuture.co' },
              { label: 'Phone Number *', value: phone, set: setPhone, type: 'tel', placeholder: '+254 700 000 000' },
              { label: 'LinkedIn or Website (optional)', value: linkedin, set: setLinkedin, placeholder: 'https://linkedin.com/in/johndoe' },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type || 'text'}
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* Service Offerings */}
        <section ref={serviceOfferingsRef} data-section="Service Offerings" className="space-y-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-[#044D5E]">Service Offerings</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brief description of services *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500"
              placeholder="We provide end-to-end ESG advisory, carbon project development, and compliance support..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of experience *</label>
              <input
                type="number"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                min="0"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                placeholder="8"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Geographic Scope *</label>
              <div
                onClick={() => setScopeDropdownOpen(!scopeDropdownOpen)}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
              >
                <span className={geographicScope ? 'text-gray-900' : 'text-gray-500'}>
                  {geographicScope || 'Select scope'}
                </span>
                {scopeDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              <AnimatePresence>
                {scopeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
                  >
                    {geographicScopes.map((scope) => (
                      <div
                        key={scope}
                        onClick={() => { setGeographicScope(scope); setScopeDropdownOpen(false); }}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
                      >
                        {scope}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Area of Expertise *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expertiseOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleExpertise(item)}
                  className={`px-5 py-3 rounded-lg border text-left text-sm font-medium transition-all ${
                    selectedExpertise.includes(item) || (item === 'Other' && showOtherInput)
                      ? 'bg-[#E4F6F3] border-[#044D5E] text-[#044D5E]'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            {showOtherInput && (
              <input
                type="text"
                value={otherExpertise}
                onChange={(e) => setOtherExpertise(e.target.value)}
                className="mt-4 w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                placeholder="Please specify your expertise"
              />
            )}
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* Previous Work */}
        <section ref={previousWorkRef} data-section="Previous Work" className="space-y-6 scroll-mt-24">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#044D5E]">Previous Work (Recent Projects)</h2>
            {projects.length < 3 && (
              <button onClick={addProject} className="flex items-center gap-2 text-sm text-[#044D5E] hover:underline">
                <Plus size={18} /> Add Project
              </button>
            )}
          </div>

          {projects.map((project, idx) => (
            <div key={project.id} className="border border-gray-200 rounded-xl p-6 space-y-5">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">Project {idx + 1}</h4>
                {projects.length > 1 && (
                  <button onClick={() => removeProject(project.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="Project Name" value={project.projectName} onChange={(e) => updateProject(project.id, 'projectName', e.target.value)} className="px-4 py-3 border border-1 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" />
                <input placeholder="Client" value={project.client} onChange={(e) => updateProject(project.id, 'client', e.target.value)} className="px-4 py-3 border border-1 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" />
                <input placeholder="Year (e.g. 2023)" value={project.year} onChange={(e) => updateProject(project.id, 'year', e.target.value)} className="px-4 py-3 border border-1 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" />
                <input placeholder="Your Role" value={project.role} onChange={(e) => updateProject(project.id, 'role', e.target.value)} className="px-4 py-3 border border-1 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500" />
              </div>
              <textarea
                placeholder="Brief description"
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-1 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-gray-500"
              />
            </div>
          ))}
        </section>

        <hr className="border-gray-200" />

        {/* Upload Portfolio */}
        <section ref={portfolioRef} data-section="Upload Portfolio" className="space-y-6 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-[#044D5E]">Upload Portfolio (Optional)</h2>
          <div className="w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
              {portfolioPreview ? (
                <div className="relative w-full h-full">
                  <Image src={portfolioPreview} alt="Preview" fill className="object-contain rounded-xl" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setPortfolioFile(null); setPortfolioPreview(null); }}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
                  <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                  <span className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 10MB</span>
                </>
              )}
              <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
            </label>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* Professional References */}
        <section ref={referencesRef} data-section="Professional References" className="space-y-6 scroll-mt-24">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#044D5E]">Professional References (Optional)</h2>
            <button onClick={addReference} className="flex items-center gap-2 text-sm text-[#044D5E] hover:underline">
              <Plus size={18} /> Add Reference
            </button>
          </div>

          {references.map((ref, idx) => (
            <div key={ref.id} className="flex gap-4 items-end">
              <div className="flex-1">
                <input
                  placeholder="Reference Name"
                  value={ref.name}
                  onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-1 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500"
                />
              </div>
              <div className="flex-1">
                <input
                  placeholder="Contact (Email/Phone)"
                  value={ref.contact}
                  onChange={(e) => updateReference(ref.id, 'contact', e.target.value)}
                  className="w-full px-4 py-3 border border-1 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500"
                />
              </div>
              {references.length > 1 && (
                <button onClick={() => removeReference(ref.id)} className="text-red-500 hover:text-red-700 mb-3">
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default BasicDetails;