'use client';

import Header from '@/app/components/Header';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { folder, message_circle_more } from '@/public';
import ProjectOverview from './ProjectOverview/page';
import FinancialImpacts from './FinancialImpacts/page';
import KGFTAlignment from './KGFTAlignment/page';
import Governance from './Governance/page';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// ──────────────────────────────────────────────────────────────
// NEW: Safe client-only wrapper component
// ──────────────────────────────────────────────────────────────
const FormContent = () => {
  const [step, setStep] = useState(1);
  const formContentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Safely read URL params only on client
  const [projectId, setProjectId] = useState<string>('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const draftId = urlParams.get('draft');

    if (draftId) {
      setProjectId(draftId);
    } else {
      const newId = `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setProjectId(newId);
      window.history.replaceState({}, '', `${window.location.pathname}?draft=${newId}`);
    }
  }, []);

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      scrollToForm();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      scrollToForm();
    }
  };

  const scrollToForm = () => {
    setTimeout(() => {
      formContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 4) return;

    try {
      const keys = {
        step1: `projectDraft_${projectId}_step1`,
        step2: `projectDraft_${projectId}_step2`,
        step3: `projectDraft_${projectId}_step3`,
        step4: `projectDraft_${projectId}_step4`,
      };

      const raw = {
        step1: localStorage.getItem(keys.step1),
        step2: localStorage.getItem(keys.step2),
        step3: localStorage.getItem(keys.step3),
        step4: localStorage.getItem(keys.step4),
      };

      if (!raw.step1 || !raw.step2 || !raw.step3 || !raw.step4) {
        toast.error('Please complete all steps before submitting.');
        return;
      }

      const projectData = {
        id: projectId,
        overview: JSON.parse(raw.step1),
        financialImpacts: JSON.parse(raw.step2),
        kgftAlignment: JSON.parse(raw.step3),
        governance: JSON.parse(raw.step4),
        submittedAt: new Date().toISOString(),
        status: 'Submitted',
      };

      console.log('Final Project Submission:', projectData);

      await new Promise(resolve => setTimeout(resolve, 1200));

      const submittedProjects = JSON.parse(localStorage.getItem('submittedProjects') || '[]');
      submittedProjects.push(projectData);
      localStorage.setItem('submittedProjects', JSON.stringify(submittedProjects));

      Object.values(keys).forEach(key => localStorage.removeItem(key));

      toast.success('Project created successfully!');
      router.push('/projects');
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Failed to submit project. Please try again.');
    }
  };

  const renderStep = () => {
    const props = { projectId };
    switch (step) {
      case 1: return <ProjectOverview {...props} />;
      case 2: return <FinancialImpacts {...props} />;
      case 3: return <KGFTAlignment {...props} />;
      case 4: return <Governance {...props} />;
      default: return null;
    }
  };

  const steps = [
    { title: 'Project Overview', desc: 'Details about your Project' },
    { title: 'Financial & Impacts', desc: 'Project funding and returns' },
    { title: 'KGFT Alignment', desc: 'Verification for compliance' },
    { title: 'Governance', desc: 'How accountability is ensured' },
  ];

  return (
    <div className="h-full w-full md:w-[90vw] bg-[#FBFDFB] mx-auto flex flex-col items-center justify-center space-y-4 px-0 py-4 pt-16">
      {/* Hero Section */}
      <section className="relative w-full h-52 md:h-64 bg-cover bg-center rounded-b-3xl overflow-hidden shadow-lg">
        <Image src="/images/projects/summary.png" alt="Projects Banner" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/40 via-transparent to-[#FBFDFB]/40 flex items-end p-6">
          <div className="flex items-end justify-between w-full">
            <div className="ml-4 text-white drop-shadow-lg">
              <Image src={folder} alt="Folder Icon" className="block md:hidden w-6 h-6 mb-2" />
              <h2 className="text-2xl md:text-4xl font-bold text-teal-900">Create Project</h2>
              <span className="text-sm md:text-base text-teal-700 font-medium">Projects / Forms</span>
            </div>
            {projectId && (
              <div className="hidden md:block text-right">
                <p className="text-xs text-teal-100 opacity-80">Draft ID:</p>
                <p className="text-xs font-mono text-white bg-teal-900/50 px-2 py-1 rounded">
                  {projectId}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="w-full md:w-[80vw] space-y-8 bg-[#FBFDFB] pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8">
          {/* Step Indicators */}
          <div className="flex justify-between mb-8 bg-gray-50 border border-gray-200 p-3 rounded-full gap-3 shadow-inner">
            {steps.map((stepInfo, index) => {
              const isCompleted = step > index + 1;
              const isCurrent = step === index + 1;

              return (
                <div
                  key={index}
                  className={`flex items-center justify-center flex-1 py-3 rounded-full transition-all ${
                    isCompleted || isCurrent
                      ? 'bg-gradient-to-r from-[#BFEFF8] to-[#B1CA69]/20 shadow-sm'
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        isCompleted || isCurrent
                          ? 'bg-[#044D5E] text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {isCompleted ? <Check size={16} /> : index + 1}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-800">{stepInfo.title}</p>
                      <p className="text-xs text-gray-500">{stepInfo.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            <div ref={formContentRef} className="space-y-6 pt-6 scroll-mt-24">
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={step === 1}
                className={`px-8 py-3 rounded-full text-sm font-medium border flex items-center gap-2 transition-all ${
                  step === 1
                    ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                <ChevronLeft size={18} />
                Back
              </button>

              <button
                type={step === 4 ? 'submit' : 'button'}
                onClick={step === 4 ? undefined : handleNextStep}
                className="px-8 py-3 bg-[#044D5E] hover:bg-[#044D5E]/90 text-white rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                {step === 4 ? 'Submit Project' : 'Next Step'}
                <ChevronRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// Main page component — only renders client-side content
// ──────────────────────────────────────────────────────────────
const Page = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-600">Loading form...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col">
      <Header />
      <FormContent />

      {/* Floating Help */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white text-xs text-gray-700 px-4 py-2 rounded-full shadow-xl mb-3 border border-gray-200">
          Need help?
        </div>
        <button className="bg-[#044D5E] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all">
          <Image src={message_circle_more} alt="Help" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default Page;