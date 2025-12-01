'use client';

import Header from '@/app/components/Header';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { folder, message_circle_more } from '@/public';
import BasicDetails from './BasicDetails/page';
import CertificatesAffiliations from './CertificatesAffiliations/page';
import VerificationDeclaration from './VerificationDeclaration/page';

const Page = () => {
    const [step, setStep] = useState(1);
    const formContentRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleNextStep = () => {
        if (step < 3) {
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

    // Helper to aggregate all localStorage data
    const getFullFormData = () => {
        const basic = typeof window !== 'undefined' ? window.localStorage.getItem('form_basic_details') : null;
        const certs = typeof window !== 'undefined' ? window.localStorage.getItem('form_certificates_affiliations') : null;
        const verify = typeof window !== 'undefined' ? window.localStorage.getItem('form_verification_declaration') : null;
        let data: Record<string, any> = {};
        if (basic) data.basicDetails = JSON.parse(basic);
        if (certs) data.certificatesAffiliations = JSON.parse(certs);
        if (verify) data.verificationDeclaration = JSON.parse(verify);
        return data;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 3) {
            const aggregatedData = getFullFormData();
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('form_full_submission', JSON.stringify(aggregatedData));
            }
            // Redirect to /experts after saving
            router.push('/experts');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <BasicDetails />;
            case 2:
                return <CertificatesAffiliations />;
            case 3:
                return <VerificationDeclaration />;
            default:
                return null;
        }
    };

    const steps = [
        { title: 'Basic Details', desc: 'Details about your Project' },
        { title: 'Certificates & Affiliations', desc: 'Project funding and returns' },
        { title: 'Verification & Declaration', desc: 'Verification for compliance' },
    ];

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
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-end p-6">
                        <div className="flex items-end justify-between w-full">
                            <div className="ml-4 text-white">
                                <Image src={folder} alt="Folder Icon" className="block md:hidden w-4 h-4 mb-2" />
                                <h2 className="text-lg md:text-3xl font-medium text-teal-900">Create Project</h2>
                                <span className="text-xs text-teal-700">Projects / Forms</span>
                            </div>
                        </div>
                    </div>
                </section>

                <main className="w-full md:w-[80vw] space-y-6 bg-[#FBFDFB]">
                    <div className="bg-transparent p-2 md:p-6">
                        {/* Step Indicators */}
                        <div className="flex justify-between mb-6 bg-white border border-gray-200 p-2 rounded-full gap-4 shadow-xs sticky top-17 z-50">
                            {steps.map((stepInfo, index) => {
                                const isCompleted = step > index + 1;
                                const isCurrent = step === index + 1;

                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-center w-full py-2 rounded-full space-x-2 ${isCompleted || isCurrent ? 'bg-[#E4F6F3]' : 'bg-gray-100'
                                            } text-black text-xs`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {isCompleted ? (
                                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br from-[#BFEFF8]/50 to-[#B1CA69]/50">
                                                    <Check size={14} />
                                                </div>
                                            ) : (
                                                 <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-200">
                                                    <Check size={14} />
                                                </div>
                                            )}
                                            <span className="block md:hidden text-sm">{index + 1}</span>
                                        </div>

                                        <div className="hidden md:flex flex-col items-start space-y-1">
                                            <span className="text-sm">
                                                {index + 1}. {stepInfo.title}
                                            </span>
                                            <p className="text-xs text-gray-400">{stepInfo.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Form Content */}
                        <form onSubmit={handleSubmit}>
                            <div ref={formContentRef} className="space-y-6 pt-4 scroll-mt-[92px]">
                                <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-6">
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
                                    <ChevronLeft
                                    size={18}
                                    className="absolute left-1 top-1/2 -translate-y-1/2"
                                    />
                                    <span>Back</span>
                                </button>

                                {/* Next / Submit Button */}
                                <button
                                    type={step === 3 ? 'submit' : 'button'}
                                    onClick={step === 3 ? undefined : handleNextStep}
                                    className="relative px-6 py-2 bg-[#044D5E] hover:bg-[#044D5E]/90 text-xs font-medium text-white rounded-full
                                    transition-all duration-300 flex items-center justify-center min-w-[100px] cursor-pointer"
                                >
                                    <span>{step === 3 ? 'Submit' : 'Next'}</span>
                                    <ChevronRight
                                    size={18}
                                    className="absolute right-1 top-1/2 -translate-y-1/2"
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            {/* Floating Help Button */}
            <div className="fixed bottom-5 right-5 flex flex-col items-center">
                <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
                    need help?
                    <span
                        className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"
                        aria-hidden="true"
                    />
                </div>
                <button className="bg-white shadow-md border border-gray-200 rounded-full p-3 flex items-center justify-center cursor-pointer transition-all duration-300">
                    <Image src={message_circle_more} alt="Help" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Page;