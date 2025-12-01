'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Shield, Users, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const diverseOwnershipTypes = [
  'Women-Owned',
  'Indigenous-Owned',
  'Youth-Owned',
  'Local SME',
  'Minority-Owned',
  'Disability-led business',
  'Other',
];

const LS_KEY = 'form_verification_declaration';

const VerificationDeclaration = () => {
  // State
  const [isDiverseSupplier, setIsDiverseSupplier] = useState<'yes' | 'no' | null>(null);
  const [diverseOwnershipType, setDiverseOwnershipType] = useState<string[]>([]);
  const [otherOwnershipType, setOtherOwnershipType] = useState('');
  const [hasBeenSanctioned, setHasBeenSanctioned] = useState<'yes' | 'no' | null>(null);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  // Sidebar Navigation
  const [activeSection, setActiveSection] = useState('Verification & Declaration');
  const sectionRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(() => ({
    'Verification & Declaration': sectionRef,
  }), []);

  const navItems = [
    { name: 'Verification & Declaration', icon: FileCheck },
  ];

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Reusable Yes/No Button
  const YesNoButton = ({
    value,
    current,
    onClick,
    label,
  }: {
    value: 'yes' | 'no';
    current: 'yes' | 'no' | null;
    onClick: () => void;
    label: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-8 py-3 rounded-lg font-medium text-sm transition-all shadow-sm border ${
        current === value
          ? value === 'yes'
            ? 'bg-green-100 text-green-800 border-green-600'
            : 'bg-red-100 text-red-800 border-red-600'
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );

  // Toggle diverse ownership type
  const toggleOwnershipType = (type: string) => {
    setDiverseOwnershipType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // --- Local Storage logic ---
  // Load from local storage on mount
  useEffect(() => {
    const ls = typeof window !== 'undefined' && window.localStorage.getItem(LS_KEY);
    if (ls) {
      try {
        const data = JSON.parse(ls);
        setIsDiverseSupplier(data.isDiverseSupplier ?? null);
        setDiverseOwnershipType(data.diverseOwnershipType ?? []);
        setOtherOwnershipType(data.otherOwnershipType ?? '');
        setHasBeenSanctioned(data.hasBeenSanctioned ?? null);
        setDeclarationAccepted(data.declarationAccepted ?? false);
      } catch (e) {
        window.localStorage.removeItem(LS_KEY);
      }
    }
  }, []);

  // Save to local storage when any field changes
  useEffect(() => {
    const formData = {
      isDiverseSupplier,
      diverseOwnershipType,
      otherOwnershipType,
      hasBeenSanctioned,
      declarationAccepted,
    };
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LS_KEY, JSON.stringify(formData));
    }
  }, [
    isDiverseSupplier, diverseOwnershipType, otherOwnershipType,
    hasBeenSanctioned, declarationAccepted
  ]);
  // --- End local storage logic ---

  return (
    <div className="flex gap-8 max-w-7xl mx-auto">
      {/* Sticky Sidebar */}
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

      {/* Main Form */}
      <div className="flex-1 space-y-12 pb-20">
        <section ref={sectionRef} data-section="Verification & Declaration" className="space-y-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-[#044D5E]">Verification & Declaration</h2>

          {/* Diverse Supplier */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Are you a registered diverse supplier? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <YesNoButton value="yes" current={isDiverseSupplier} onClick={() => setIsDiverseSupplier('yes')} label="Yes" />
                <YesNoButton value="no" current={isDiverseSupplier} onClick={() => setIsDiverseSupplier('no')} label="No" />
              </div>
            </div>

            <AnimatePresence>
              {isDiverseSupplier === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 mt-6"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Type of diverse ownership <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {diverseOwnershipTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleOwnershipType(type)}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          diverseOwnershipType.includes(type)
                            ? 'bg-[#E4F6F3] border-[#044D5E] text-[#044D5E]'
                            : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {diverseOwnershipType.includes('Other') && (
                    <motion.input
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      type="text"
                      value={otherOwnershipType}
                      onChange={(e) => setOtherOwnershipType(e.target.value)}
                      placeholder="Please specify"
                      className="mt-3 w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <hr className="border-gray-200" />

          {/* Sanction History */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Have you ever been disqualified or sanctioned by a regulatory authority?{' '}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <YesNoButton value="yes" current={hasBeenSanctioned} onClick={() => setHasBeenSanctioned('yes')} label="Yes" />
                <YesNoButton value="no" current={hasBeenSanctioned} onClick={() => setHasBeenSanctioned('no')} label="No" />
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Declaration */}
          <div className="space-y-6 bg-gray-50 p-8 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-[#044D5E]">Declaration</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              I certify that the information provided is accurate and I consent to be listed in the platform’s public expert directory.
            </p>

            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="checkbox"
                checked={declarationAccepted}
                onChange={(e) => setDeclarationAccepted(e.target.checked)}
                className="w-5 h-5 text-[#044D5E] border-gray-300 rounded focus:ring-[#044D5E]"
              />
              <span className="text-sm font-medium text-gray-800">
                I agree to the declaration above <span className="text-red-500">*</span>
              </span>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VerificationDeclaration;