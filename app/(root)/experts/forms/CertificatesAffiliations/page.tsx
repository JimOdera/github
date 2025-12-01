'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { UploadCloud, Trash2, Shield, Award, Globe, Users } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const assuranceStandards = ['ISAE 3000', 'AA1000AS', 'ISO 14064-3', 'Other'];
const carbonCertifications = ['Vera', 'Gold Standard', 'ART-TREES', 'Other'];

const LS_KEY = 'form_certificates_affiliations';

const CertificatesAffiliations = () => {
  // === All your existing state ===
  const [isNemaCertified, setIsNemaCertified] = useState<'yes' | 'no' | null>(null);
  const [nemaLicenseNumber, setNemaLicenseNumber] = useState('');
  const [nemaExpiryDate, setNemaExpiryDate] = useState('');
  const [nemaCertificateFile, setNemaCertificateFile] = useState<File | null>(null);
  const [nemaCertificatePreview, setNemaCertificatePreview] = useState<string | null>(null);

  const [isAssuranceProvider, setIsAssuranceProvider] = useState<'yes' | 'no' | null>(null);
  const [assuranceStandard, setAssuranceStandard] = useState('');
  const [assuranceStandardOther, setAssuranceStandardOther] = useState('');
  const [showAssuranceOther, setShowAssuranceOther] = useState(false);
  const [assuranceCredentialFile, setAssuranceCredentialFile] = useState<File | null>(null);
  const [assuranceCredentialPreview, setAssuranceCredentialPreview] = useState<string | null>(null);

  const [carbonCertification, setCarbonCertification] = useState('');
  const [carbonOther, setCarbonOther] = useState('');
  const [showCarbonOther, setShowCarbonOther] = useState(false);
  const [carbonCertificateFile, setCarbonCertificateFile] = useState<File | null>(null);
  const [carbonCertificatePreview, setCarbonCertificatePreview] = useState<string | null>(null);

  const [diversityOwnership, setDiversityOwnership] = useState('');
  const [isDiversityRegistered, setIsDiversityRegistered] = useState<'yes' | 'no' | null>(null);
  const [diversityProgramName, setDiversityProgramName] = useState('');
  const [diversityProofFile, setDiversityProofFile] = useState<File | null>(null);
  const [diversityProofPreview, setDiversityProofPreview] = useState<string | null>(null);

  // File handlers
  const handleFileUpload = (
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const removeFile = (
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setFile(null);
    setPreview(null);
  };

  // === Sidebar Navigation Logic (same as BasicDetails) ===
  const [activeSection, setActiveSection] = useState('NEMA Certification');

  const nemaRef = useRef<HTMLDivElement>(null);
  const assuranceRef = useRef<HTMLDivElement>(null);
  const carbonRef = useRef<HTMLDivElement>(null);
  const diversityRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(() => ({
    'NEMA Certification': nemaRef,
    'Certified Assurance Provider': assuranceRef,
    'Carbon Expertise Certification': carbonRef,
    'Diversity & Inclusion': diversityRef,
  }), []);

  const navItems = [
    { name: 'NEMA Certification', icon: Shield },
    { name: 'Certified Assurance Provider', icon: Award },
    { name: 'Carbon Expertise Certification', icon: Globe },
    { name: 'Diversity & Inclusion', icon: Users },
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

  // --- Local Storage logic ---

  // Load from local storage on mount
  useEffect(() => {
    const ls = typeof window !== 'undefined' && window.localStorage.getItem(LS_KEY);
    if (ls) {
      try {
        const data = JSON.parse(ls);
        setIsNemaCertified(data.isNemaCertified ?? null);
        setNemaLicenseNumber(data.nemaLicenseNumber ?? '');
        setNemaExpiryDate(data.nemaExpiryDate ?? '');
        setNemaCertificatePreview(data.nemaCertificatePreview ?? null);

        setIsAssuranceProvider(data.isAssuranceProvider ?? null);
        setAssuranceStandard(data.assuranceStandard ?? '');
        setAssuranceStandardOther(data.assuranceStandardOther ?? '');
        setShowAssuranceOther(!!data.assuranceStandardOther);
        setAssuranceCredentialPreview(data.assuranceCredentialPreview ?? null);

        setCarbonCertification(data.carbonCertification ?? '');
        setCarbonOther(data.carbonOther ?? '');
        setShowCarbonOther(!!data.carbonOther);
        setCarbonCertificatePreview(data.carbonCertificatePreview ?? null);

        setDiversityOwnership(data.diversityOwnership ?? '');
        setIsDiversityRegistered(data.isDiversityRegistered ?? null);
        setDiversityProgramName(data.diversityProgramName ?? '');
        setDiversityProofPreview(data.diversityProofPreview ?? null);
        // All files will remain null as we cannot restore File instances
      } catch (e) {
        window.localStorage.removeItem(LS_KEY);
      }
    }
  }, []);

  // Save to local storage when any field changes
  useEffect(() => {
    const formData = {
      isNemaCertified,
      nemaLicenseNumber,
      nemaExpiryDate,
      nemaCertificatePreview,
      isAssuranceProvider,
      assuranceStandard,
      assuranceStandardOther,
      assuranceCredentialPreview,
      carbonCertification,
      carbonOther,
      carbonCertificatePreview,
      showCarbonOther,
      showAssuranceOther,
      diversityOwnership,
      isDiversityRegistered,
      diversityProgramName,
      diversityProofPreview,
    };
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LS_KEY, JSON.stringify(formData));
    }
  }, [
    isNemaCertified, nemaLicenseNumber, nemaExpiryDate, nemaCertificatePreview,
    isAssuranceProvider, assuranceStandard, assuranceStandardOther, assuranceCredentialPreview,
    carbonCertification, carbonOther, carbonCertificatePreview,
    diversityOwnership, isDiversityRegistered, diversityProgramName, diversityProofPreview,
    showAssuranceOther, showCarbonOther
  ]);

  // --- End local storage logic ---

  return (
    <div className="flex gap-8 max-w-7xl mx-auto">
      {/* Sticky Sidebar Navigation - Hidden on Mobile (same as BasicDetails) */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-36 space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Form Sections
          </h3>
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
        {/* NEMA Certification */}
        <section ref={nemaRef} data-section="NEMA Certification" className="space-y-6 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-[#044D5E]">NEMA Certification</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Are you NEMA Certified? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsNemaCertified('yes')}
                className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${
                  isNemaCertified === 'yes'
                    ? 'bg-[#E4F6F3] border-[#044D5E] text-[#044D5E]'
                    : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setIsNemaCertified('no')}
                className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${
                  isNemaCertified === 'no'
                    ? 'bg-[#E4F6F3] border-[#044D5E] text-[#044D5E]'
                    : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isNemaCertified === 'yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 mt-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NEMA License Number
                  </label>
                  <input
                    type="text"
                    value={nemaLicenseNumber}
                    onChange={(e) => setNemaLicenseNumber(e.target.value)}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition"
                    placeholder="e.g. NEMA/EIA/12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={nemaExpiryDate}
                    onChange={(e) => setNemaExpiryDate(e.target.value)}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Certificate <span className="text-red-500">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    {nemaCertificatePreview ? (
                      <div className="relative w-full h-full">
                        <Image src={nemaCertificatePreview} alt="NEMA Certificate" fill className="object-contain rounded-xl" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(setNemaCertificateFile, setNemaCertificatePreview);
                          }}
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
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null, setNemaCertificateFile, setNemaCertificatePreview)}
                    />
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <hr className="border-gray-200" />

        {/* Certified Assurance Provider */}
        <section ref={assuranceRef} data-section="Certified Assurance Provider" className="space-y-6 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-[#044D5E]">Certified Assurance Provider</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Are you a Certified Assurance Provider? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              {['yes', 'no'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setIsAssuranceProvider(val as 'yes' | 'no')}
                  className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${
                    isAssuranceProvider === val
                      ? 'bg-[#E4F6F3] border-[#044D5E] text-[#044D5E]'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {isAssuranceProvider === 'yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 mt-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specify Standard</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {assuranceStandards.map((std) => (
                      <button
                        key={std}
                        type="button"
                        onClick={() => {
                          setAssuranceStandard(std);
                          setShowAssuranceOther(std === 'Other');
                        }}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          assuranceStandard === std
                            ? 'bg-[#E4F6F3] border-[#044D5E] text-[#044D5E]'
                            : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {std}
                      </button>
                    ))}
                  </div>
                  {showAssuranceOther && (
                    <input
                      type="text"
                      value={assuranceStandardOther}
                      onChange={(e) => setAssuranceStandardOther(e.target.value)}
                      className="mt-4 w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                      placeholder="Please specify standard"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Credential / License <span className="text-red-500">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    {assuranceCredentialPreview ? (
                      <div className="relative w-full h-full">
                        <Image src={assuranceCredentialPreview} alt="Assurance Credential" fill className="object-contain rounded-xl" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(setAssuranceCredentialFile, setAssuranceCredentialPreview);
                          }}
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
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e.target.files?.[0] || null, setAssuranceCredentialFile, setAssuranceCredentialPreview)}
                    />
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <hr className="border-gray-200" />

        {/* Carbon Expertise Certification */}
        <section ref={carbonRef} data-section="Carbon Expertise Certification" className="space-y-6 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-[#044D5E]">Carbon Expertise Certification (If Applicable)</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Certification Body</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {carbonCertifications.map((cert) => (
                <button
                  key={cert}
                  type="button"
                  onClick={() => {
                    setCarbonCertification(cert);
                    setShowCarbonOther(cert === 'Other');
                  }}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                    carbonCertification === cert
                      ? 'bg-[#E4F6F3] border-[#044D5E] text-[#044D5E]'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {cert}
                </button>
              ))}
            </div>
            {showCarbonOther && (
              <input
                type="text"
                value={carbonOther}
                onChange={(e) => setCarbonOther(e.target.value)}
                className="mt-4 w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                placeholder="Please specify certification"
              />
            )}
          </div>
          {(carbonCertification || showCarbonOther) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Certificate or Registration
              </label>
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                {carbonCertificatePreview ? (
                  <div className="relative w-full h-full">
                    <Image src={carbonCertificatePreview} alt="Carbon Certificate" fill className="object-contain rounded-xl" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(setCarbonCertificateFile, setCarbonCertificatePreview);
                      }}
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
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload(e.target.files?.[0] || null, setCarbonCertificateFile, setCarbonCertificatePreview)}
                />
              </label>
            </div>
          )}
        </section>

        <hr className="border-gray-200" />

        {/* Diversity & Inclusion */}
        <section ref={diversityRef} data-section="Diversity & Inclusion" className="space-y-6 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-[#044D5E]">Diversity & Inclusion</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              % Ownership by diverse groups (women, youth, PWDs, etc.) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={diversityOwnership}
              onChange={(e) => setDiversityOwnership(e.target.value)}
              className="w-full max-w-xs px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
              placeholder="e.g. 65"
            />
            <span className="text-sm text-gray-500 ml-3">%</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Registered with a supplier diversity program? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              {['yes', 'no'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setIsDiversityRegistered(val as 'yes' | 'no')}
                  className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${
                    isDiversityRegistered === val
                      ? 'bg-[#E4F6F3] border-[#044D5E] text-[#044D5E]'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {isDiversityRegistered === 'yes' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={diversityProgramName}
                  onChange={(e) => setDiversityProgramName(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                  placeholder="e.g. WEConnect International, Youth Enterprise Development Fund"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Proof / Certification (if any)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  {diversityProofPreview ? (
                    <div className="relative w-full h-full">
                      <Image src={diversityProofPreview} alt="Diversity Proof" fill className="object-contain rounded-xl" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(setDiversityProofFile, setDiversityProofPreview);
                        }}
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
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e.target.files?.[0] || null, setDiversityProofFile, setDiversityProofPreview)}
                  />
                </label>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CertificatesAffiliations;