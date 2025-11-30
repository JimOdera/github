// app/activities/form/page.tsx
'use client';

import Header from '@/app/components/Header';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useRef, Suspense, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { folder, message_circle_more } from '@/public';
import ProjectOverview from './ProjectOverview/page';
import EnergyUse from './EnergyUse/page';
import ActivityDetails from './ActivityDetails/page';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Types for activity data
interface ActivityData {
  id: string;
  overview: any;
  activityDetails: any;
  energyUse?: any;
  submittedAt: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  title?: string;
  entityName?: string;
  category?: string;
}

const FormContent = () => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [activityId, setActivityId] = useState<string>('');
    const router = useRouter();

    const searchParams = useSearchParams();
    const formContentRef = useRef<HTMLDivElement>(null);

    // Initialize activity ID and load category
    useEffect(() => {
        // Generate or get activity ID
        const urlParams = new URLSearchParams(window.location.search);
        const draftId = urlParams.get('draft');
        let newActivityId = '';

        if (draftId) {
            newActivityId = draftId;
            setActivityId(draftId);
        } else {
            newActivityId = `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            setActivityId(newActivityId);
            // Update URL without page reload
            const newUrl = `${window.location.pathname}?draft=${newActivityId}`;
            window.history.replaceState({}, '', newUrl);
        }

        // Load category from URL or localStorage
        const category = searchParams.get('category');
        if (category) {
            const decodedCategory = decodeURIComponent(category);
            setSelectedCategory(decodedCategory);
            
            // Also save to localStorage for persistence
            const draftKey = `activityDraft_${newActivityId}_step2`;
            const existingDraft = localStorage.getItem(draftKey);
            if (existingDraft) {
                try {
                    const draftData = JSON.parse(existingDraft);
                    localStorage.setItem(draftKey, JSON.stringify({
                        ...draftData,
                        selectedCategory: decodedCategory
                    }));
                } catch (e) {
                    // If parsing fails, create new draft
                    localStorage.setItem(draftKey, JSON.stringify({
                        selectedCategory: decodedCategory
                    }));
                }
            } else {
                // Create new draft with category
                localStorage.setItem(draftKey, JSON.stringify({
                    selectedCategory: decodedCategory
                }));
            }
        } else if (newActivityId) {
            // Try to load category from localStorage
            const draftKey = `activityDraft_${newActivityId}_step2`;
            const existingDraft = localStorage.getItem(draftKey);
            if (existingDraft) {
                try {
                    const draftData = JSON.parse(existingDraft);
                    if (draftData.selectedCategory) {
                        setSelectedCategory(draftData.selectedCategory);
                    }
                } catch (e) {
                    console.warn('Failed to load activity category from draft');
                }
            }
        }
    }, [searchParams]);

    // Determine flow
    const isEnvironmentalMetrics = selectedCategory === 'Environmental Metrics';
    const totalSteps = isEnvironmentalMetrics ? 3 : 2;

    // Helper function to validate category-specific data
    const validateCategoryData = (category: string | null, activityDetails: any): boolean => {
        if (!category) return false;

        // For now, return true for all categories since we don't have specific validation
        // You can add specific validation logic for each category as needed
        console.log(`Validating category: ${category}`, activityDetails);
        
        // Basic check: if we have any data in activityDetails beyond just selectedCategory
        const hasData = Object.keys(activityDetails).some(key => 
            key !== 'selectedCategory' && 
            key !== 'activeSection' && 
            activityDetails[key] !== undefined && 
            activityDetails[key] !== '' &&
            activityDetails[key] !== null
        );

        if (!hasData) {
            console.warn(`No category-specific data found for ${category}`);
            return false;
        }

        return true;
    };

    // Dynamic steps for UI
    const steps = [
        { title: 'Project Basics', desc: 'Details about your Activity' },
        {
            title: selectedCategory || 'Activity Details',
            desc: selectedCategory ? `Details for ${selectedCategory}` : 'Select your activity type',
        },
        ...(isEnvironmentalMetrics
            ? [{ title: 'Energy Use', desc: 'Verification for compliance' }]
            : []),
    ];

    const handleNextStep = () => {
        if (step < totalSteps) {
            setStep(prev => prev + 1);
            scrollToForm();
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
            scrollToForm();
        }
    };

    const scrollToForm = () => {
        setTimeout(() => {
            formContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    // Validate all steps before submission - FIXED LOGIC
    const validateAllSteps = (): boolean => {
        if (!activityId) {
            toast.error('Activity ID not found. Please refresh the page.');
            return false;
        }

        const keys = {
            step1: `activityDraft_${activityId}_step1`,
            step2: `activityDraft_${activityId}_step2`,
            step3: isEnvironmentalMetrics ? `activityDraft_${activityId}_step3` : null,
        };

        // Check if required steps have data - FIXED: Only check step3 for Environmental Metrics
        const step1Data = localStorage.getItem(keys.step1);
        const step2Data = localStorage.getItem(keys.step2);
        const step3Data = isEnvironmentalMetrics ? localStorage.getItem(keys.step3!) : null;

        console.log('Validation check:', {
            step1: !!step1Data,
            step2: !!step2Data,
            step3: !!step3Data,
            isEnvironmentalMetrics
        });

        // For non-Environmental Metrics, only check step1 and step2
        if (!step1Data || !step2Data) {
            toast.error('Please complete all steps before submitting.');
            return false;
        }

        // For Environmental Metrics, also check step3
        if (isEnvironmentalMetrics && !step3Data) {
            toast.error('Please complete all steps before submitting.');
            return false;
        }

        try {
            // Basic validation for required fields in step1
            const overview = JSON.parse(step1Data);
            if (!overview.entityName || !overview.businessUnit || !overview.orgName) {
                toast.error('Please complete all required fields in Project Basics');
                return false;
            }

            // Basic validation for required fields in step2
            const activityDetails = JSON.parse(step2Data);
            if (!activityDetails.selectedCategory) {
                toast.error('Please select an activity category');
                return false;
            }

            // For non-Environmental Metrics categories, check if the category component has required data
            if (!isEnvironmentalMetrics) {
                // Check if the specific category has minimum required data
                const hasCategoryData = validateCategoryData(selectedCategory, activityDetails);
                if (!hasCategoryData) {
                    toast.error(`Please complete all required fields in ${selectedCategory}`);
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Validation error:', error);
            toast.error('Invalid form data. Please refresh and try again.');
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateAllSteps()) {
            return;
        }

        try {
            const keys = {
                step1: `activityDraft_${activityId}_step1`,
                step2: `activityDraft_${activityId}_step2`,
                step3: isEnvironmentalMetrics ? `activityDraft_${activityId}_step3` : null,
            };

            // Get all step data
            const overview = JSON.parse(localStorage.getItem(keys.step1)!);
            const activityDetails = JSON.parse(localStorage.getItem(keys.step2)!);
            const energyUse = isEnvironmentalMetrics 
                ? JSON.parse(localStorage.getItem(keys.step3!)!) 
                : undefined;

            // Create complete activity object
            const activityData: ActivityData = {
                id: activityId,
                overview,
                activityDetails,
                energyUse,
                submittedAt: new Date().toISOString(),
                status: 'Submitted',
                title: overview.entityName,
                entityName: overview.entityName,
                category: activityDetails.selectedCategory,
            };

            console.log('Final Activity Submission:', activityData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Save to submitted activities
            const submittedActivities = JSON.parse(localStorage.getItem('submittedActivities') || '[]');
            
            // Check if activity already exists (update instead of adding new)
            const existingIndex = submittedActivities.findIndex((a: ActivityData) => a.id === activityId);
            if (existingIndex >= 0) {
                submittedActivities[existingIndex] = activityData;
            } else {
                submittedActivities.push(activityData);
            }
            
            localStorage.setItem('submittedActivities', JSON.stringify(submittedActivities));

            // Clean up draft data
            Object.values(keys).forEach(key => {
                if (key) localStorage.removeItem(key);
            });

            toast.success('Activity submitted successfully!');
            router.push('/activities');
        } catch (error) {
            console.error('Submission failed:', error);
            toast.error('Failed to submit activity. Please try again.');
        }
    };

    // Correctly map current step → component with activityId prop
    const renderStep = () => {
        if (!activityId) {
            return <div className="text-center py-12">Loading activity form...</div>;
        }

        const commonProps = { activityId };

        if (step === 1) {
            return <ProjectOverview {...commonProps} />;
        }

        if (step === 2) {
            return (
                <ActivityDetails
                    {...commonProps}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                />
            );
        }

        if (step === 3 && isEnvironmentalMetrics) {
            return <EnergyUse {...commonProps} />;
        }

        return null;
    };

    const isLastStep = step === totalSteps;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col space-y-6">
            <Header />

            <div className="h-full w-full md:w-[90vw] bg-[#FBFDFB] mx-auto flex flex-col items-center justify-center space-y-4 px-0 py-4 pt-16">
                {/* Hero Section */}
                <section className="relative w-full h-52 md:h-64 bg-cover bg-center">
                    <Image
                        src="/images/projects/summary.png"
                        alt="Projects Banner"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-end p-6">
                        <div className="flex items-end justify-between w-full">
                            <div className="ml-4 text-white">
                                <Image src={folder} alt="Folder Icon" className="block md:hidden w-4 h-4 mb-2" />
                                <h2 className="text-lg md:text-3xl font-medium text-teal-900">ESG Tracker</h2>
                                <span className="text-xs text-teal-700">Activities / Forms</span>
                            </div>
                            {activityId && (
                                <div className="hidden md:block text-right">
                                    <p className="text-xs text-teal-100 opacity-80">Activity ID:</p>
                                    <p className="text-xs font-mono text-white bg-teal-900/50 px-2 py-1 rounded">
                                        {activityId}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <main className="w-full md:w-[80vw] space-y-6 bg-[#FBFDFB]">
                    <div className="bg-transparent p-2 md:p-6">
                        {/* Step Indicators */}
                        <div className="flex justify-between mb-6 bg-white border border-gray-200 p-2 rounded-full gap-4 shadow-xs sticky top-17 z-50">
                            {steps.map((stepInfo, index) => {
                                const stepNumber = index + 1;
                                const isCompleted = step > stepNumber;
                                const isCurrent = step === stepNumber;

                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-center w-full py-2 rounded-full space-x-2 ${
                                            isCompleted || isCurrent ? 'bg-[#E4F6F3]' : 'bg-gray-100'
                                        } text-black text-xs transition-all duration-300`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {isCompleted ? (
                                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br from-[#BFEFF8]/50 to-[#B1CA69]/50">
                                                    <Check size={14} className="text-teal-700" />
                                                </div>
                                            ) : (
                                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-300">
                                                    <span className="text-white text-xs font-bold">{stepNumber}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="hidden md:flex flex-col items-start space-y-1">
                                            <span className="text-sm font-medium">
                                                {stepNumber}. {stepInfo.title}
                                            </span>
                                            <p className="text-xs text-gray-400">{stepInfo.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Optional hint */}
                        {isEnvironmentalMetrics && step === 2 && (
                            <p className="text-xs text-teal-600 text-center -mt-4 mb-6 italic">
                                Next: Energy Use & Emissions Verification
                            </p>
                        )}

                        {/* Form Content */}
                        <form onSubmit={handleSubmit}>
                            <div ref={formContentRef} className="space-y-6 pt-4 pb-32 scroll-mt-[92px]">
                                <AnimatePresence mode="wait">
                                    {renderStep()}
                                </AnimatePresence>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-10">
                                {/* Back Button */}
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    disabled={step === 1}
                                    className={`relative px-6 py-2 rounded-full text-xs font-medium border flex items-center justify-center min-w-[100px]
                                        transition-all duration-300 cursor-pointer ${
                                        step === 1
                                            ? 'bg-gray-100 cursor-not-allowed opacity-50 text-gray-400 border-gray-300'
                                            : 'bg-white hover:bg-gray-50 text-black border-gray-300'
                                    }`}
                                >
                                    <ChevronLeft size={18} className="absolute left-1 top-1/2 -translate-y-1/2" />
                                    <span>Back</span>
                                </button>

                                {/* Next / Submit Button */}
                                <button
                                    type={isLastStep ? 'submit' : 'button'}
                                    onClick={isLastStep ? undefined : handleNextStep}
                                    className="relative px-6 py-2 bg-[#044D5E] hover:bg-[#044D5E]/90 text-xs font-medium text-white rounded-full
                                        transition-all duration-300 flex items-center justify-center min-w-[100px] cursor-pointer"
                                >
                                    <span>{isLastStep ? 'Submit Activity' : 'Next'}</span>
                                    {!isLastStep && (
                                        <ChevronRight size={18} className="absolute right-1 top-1/2 -translate-y-1/2" />
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            {/* Floating Help Button */}
            <div className="fixed bottom-5 right-5 flex flex-col items-center z-50">
                <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
                    need help?
                    <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                </div>
                <button className="bg-white shadow-lg border border-gray-200 rounded-full p-3 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl">
                    <Image src={message_circle_more} alt="Help" width={24} height={24} />
                </button>
            </div>
        </div>
    );
};

const Page = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-[#BFEFF8]/30 to-[#B1CA69]/30 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#044D5E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#044D5E] font-medium">Loading form...</p>
                </div>
            </div>
        }>
            <FormContent />
        </Suspense>
    );
};

export default Page;