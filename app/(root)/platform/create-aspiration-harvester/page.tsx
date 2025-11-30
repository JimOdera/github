"use client";

import Header from "@/app/components/Header";
import { message_circle_more } from "@/public";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Globe,
  DollarSign,
  Calendar,
  Users,
  Target,
  BarChart3,
  Handshake,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Page = () => {
  const [activeSection, setActiveSection] = useState<string>(
    "Project Description"
  );

  // Dropdown states
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select Location");

  const [creditTypeOpen, setCreditTypeOpen] = useState(false);
  const [selectedCreditType, setSelectedCreditType] =
    useState("Select Credit Type");

  const [timelineOpen, setTimelineOpen] = useState(false);
  const [selectedTimeline, setSelectedTimeline] = useState("Select Timeline");

  const [commitmentOpen, setCommitmentOpen] = useState(false);
  const [selectedCommitment, setSelectedCommitment] = useState(
    "Select Level of Commitment"
  );

  // Yes/No states
  const [hasAssessment, setHasAssessment] = useState<boolean | null>(null);
  const [familiarWithStandards, setFamiliarWithStandards] = useState<
    boolean | null
  >(null);
  const [takenSteps, setTakenSteps] = useState<boolean | null>(null);
  const [openToStructures, setOpenToStructures] = useState<boolean | null>(
    null
  );
  const [hasMilestones, setHasMilestones] = useState<boolean | null>(null);
  const [hasPartnerships, setHasPartnerships] = useState<boolean | null>(null);

  // Multi-select features
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const toggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  // Refs at top level — 100% safe
  const projectDescriptionRef = useRef<HTMLDivElement>(null);
  const carbonCreditGenerationRef = useRef<HTMLDivElement>(null);
  const verificationCertificationRef = useRef<HTMLDivElement>(null);
  const financingNeedsRef = useRef<HTMLDivElement>(null);
  const investmentStructureRef = useRef<HTMLDivElement>(null);
  const projectTimelineRef = useRef<HTMLDivElement>(null);
  const stakeholderEngagementRef = useRef<HTMLDivElement>(null);
  const impactMeasurementRef = useRef<HTMLDivElement>(null);
  const platformUsageRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(
    () => ({
      "Project Description": projectDescriptionRef,
      "Carbon Credit Generation": carbonCreditGenerationRef,
      "Verification and Certification": verificationCertificationRef,
      "Financing Needs": financingNeedsRef,
      "Investment Structure": investmentStructureRef,
      "Project Timeline": projectTimelineRef,
      "Stakeholder Engagement": stakeholderEngagementRef,
      "Impact Measurement": impactMeasurementRef,
      "Platform Usage": platformUsageRef,
    }),
    []
  );

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute("data-section")!);
          }
        });
      },
      { threshold: 0.5 }
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

  const dashimg = "/images/dashimg.png";

  // Dropdown options
  const locations = [
    "Africa",
    "Asia",
    "Latin America",
    "North America",
    "Europe",
    "Oceania",
    "Global/Multi-region",
  ];
  const creditTypes = [
    "Nature-Based Removal (Afforestation/Reforestation)",
    "Blue Carbon (Mangrove, Seagrass)",
    "Avoidance/Reduction (Renewable Energy, Cookstoves)",
    "Tech-based Removal (DAC, BECCS)",
    "Community-led Projects",
    "Not yet decided",
  ];
  const timelines = [
    "Idea / Concept stage",
    "Feasibility study phase",
    "0–2 years to first issuance",
    "2–5 years to first issuance",
    "5+ years to first issuance",
  ];
  const commitmentLevels = [
    "Fully committed (MoU signed)",
    "Strong interest (Letter of Intent)",
    "Engaged in discussions",
    "Community consultation ongoing",
    "Early-stage awareness",
  ];
  const platformFeatures = [
    "Real-time ESG performance tracking",
    "Impact investment analytics dashboard",
    "Automated regulatory compliance checks",
    "Secure document and data management system",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col">
      <Header />

      <div className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center h-48 w-full lg:w-[90vw] mx-auto lg:rounded-lg overflow-hidden p-0 md:px-24"
          style={{ backgroundImage: `url(${dashimg})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 px-4 py-2 text-white flex flex-col md:flex-row items-start md:items-end justify-end md:justify-between h-full md:-bottom-6 md:px-6 md:py-10">
            <div className="flex flex-col md:space-y-4">
              <h2 className="text-sm text-lg">Hello Iris West</h2>
              <h1 className="text-xl lg:text-3xl font-semibold">
                Welcome to Klima Harvest
              </h1>
            </div>
            <Link
              href="/projects/marketplace"
              className="flex items-center justify-center mt-4 bg-[#00D98A] hover:bg-[#00D98A]/90 text-xs text-black px-5 py-2 rounded-lg transition-all duration-300"
            >
              Explore Community
            </Link>
          </div>
        </section>

        {/* Main Form */}
        <main className="flex-grow w-full md:w-[80vw] mx-auto p-4 md:p-8">
          <div className="bg-white rounded-2xl shadow-md py-8 px-6 md:px-24">
            <div className="mb-10">
              <div className="text-sm text-[#1ECEC9] font-semibold">
                Create an account
              </div>
              <h1 className="text-2xl font-semibold text-[#044D5E] mt-2">
                Register as an Aspiration Harvester
              </h1>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                Are you interested in accessing climate/green finance? Are you
                involved in projects or innovations in strategic areas with high
                ecological value and directly engaging local communities? Are
                you in any way offsetting carbon emissions through your project
                or business? Joining our platform will provide you with access
                to potential investors, carbon market experts, and resources to
                navigate the complexities of carbon finance, empowering you to
                realize your vision and accelerate the transition to a
                low-carbon economy.
              </p>
            </div>

            <div className="flex gap-8">
              {/* Sticky Sidebar with Icons */}
              <aside className="w-72 hidden md:block sticky top-20 self-start">
                <div className="flex flex-col gap-1">
                  {[
                    { name: "Project Description", icon: Pencil },
                    { name: "Carbon Credit Generation", icon: Globe },
                    { name: "Verification and Certification", icon: Target },
                    { name: "Financing Needs", icon: DollarSign },
                    { name: "Investment Structure", icon: Handshake },
                    { name: "Project Timeline", icon: Calendar },
                    { name: "Stakeholder Engagement", icon: Users },
                    { name: "Impact Measurement", icon: BarChart3 },
                    { name: "Platform Usage", icon: Target },
                  ].map(({ name, icon: Icon }) => (
                    <div
                      key={name}
                      onClick={() => handleNavClick(name)}
                      className={`flex items-center gap-3 px-5 py-2.5 rounded-lg cursor-pointer text-xs transition ${
                        activeSection === name
                          ? "bg-[#F2F2F2] text-[#044D5E] font-medium"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </aside>

              {/* Form */}
              <form className="flex-1 space-y-8">
                {/* 1. Project Description */}
                <div
                  ref={projectDescriptionRef}
                  data-section="Project Description"
                >
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Project Description
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        Can you provide an overview of your
                        project/business/enterprise/innovation? Include
                        objectives, location, and key activities.
                      </label>
                      <textarea
                        className="w-full h-36 text-xs border border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:border-gray-400"
                        placeholder="Tell us about your vision, goals, and activities..."
                      />
                    </div>

                    <div className="relative">
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        Location
                      </label>
                      <div
                        onClick={() => setLocationOpen(!locationOpen)}
                        className={`w-full px-4 py-3 rounded-lg border flex justify-between items-center cursor-pointer text-xs ${
                          locationOpen ? "border-gray-500" : "border-gray-300"
                        }`}
                      >
                        <span
                          className={
                            selectedLocation === "Select Location"
                              ? "text-gray-500"
                              : "text-gray-800"
                          }
                        >
                          {selectedLocation}
                        </span>
                        {locationOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <AnimatePresence>
                        {locationOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                          >
                            {locations.map((l) => (
                              <div
                                key={l}
                                onClick={() => {
                                  setSelectedLocation(l);
                                  setLocationOpen(false);
                                }}
                                className="px-4 py-2.5 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {l}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="relative">
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        What type of carbon credits does your project aim to
                        generate?
                      </label>
                      <div
                        onClick={() => setCreditTypeOpen(!creditTypeOpen)}
                        className={`w-full px-4 py-3 rounded-lg border flex justify-between items-center cursor-pointer text-xs ${
                          creditTypeOpen ? "border-gray-500" : "border-gray-300"
                        }`}
                      >
                        <span
                          className={
                            selectedCreditType === "Select Credit Type"
                              ? "text-gray-500"
                              : "text-gray-800"
                          }
                        >
                          {selectedCreditType}
                        </span>
                        {creditTypeOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <AnimatePresence>
                        {creditTypeOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                          >
                            {creditTypes.map((t) => (
                              <div
                                key={t}
                                onClick={() => {
                                  setSelectedCreditType(t);
                                  setCreditTypeOpen(false);
                                }}
                                className="px-4 py-2.5 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {t}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 2. Carbon Credit Generation */}
                <div
                  ref={carbonCreditGenerationRef}
                  data-section="Carbon Credit Generation"
                >
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Carbon Credit Generation
                  </h2>
                  <p className="text-xs text-gray-700 mb-3">
                    Have you conducted any assessments or studies to estimate
                    the potential carbon emissions reductions or removals from
                    your project?
                  </p>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setHasAssessment(true)}
                      className={`px-6 py-2.5 rounded-lg border text-xs ${
                        hasAssessment === true
                          ? "bg-green-100 border-green-500"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasAssessment(false)}
                      className={`px-6 py-2.5 rounded-lg border text-xs ${
                        hasAssessment === false
                          ? "bg-red-100 border-red-500"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 3. Verification and Certification */}
                <div
                  ref={verificationCertificationRef}
                  data-section="Verification and Certification"
                >
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Verification and Certification
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-3">
                        Are you familiar with carbon offset standards and
                        methodologies for verifying and certifying carbon
                        credits?
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setFamiliarWithStandards(true)}
                          className={`px-6 py-2.5 rounded-lg border text-xs ${
                            familiarWithStandards === true
                              ? "bg-green-100 border-green-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setFamiliarWithStandards(false)}
                          className={`px-6 py-2.5 rounded-lg border text-xs ${
                            familiarWithStandards === false
                              ? "bg-red-100 border-red-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-3">
                        Have you taken any steps to ensure that your project
                        meets the requirements for generating verifiable and
                        credible carbon credits?
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setTakenSteps(true)}
                          className={`px-6 py-2.5 rounded-lg border text-xs ${
                            takenSteps === true
                              ? "bg-green-100 border-green-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setTakenSteps(false)}
                          className={`px-6 py-2.5 rounded-lg border text-xs ${
                            takenSteps === false
                              ? "bg-red-100 border-red-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 4. Financing Needs */}
                <div ref={financingNeedsRef} data-section="Financing Needs">
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Financing Needs
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        What are your financing needs for developing and
                        implementing your carbon project?
                      </label>
                      <textarea
                        className="w-full h-28 text-xs border border-gray-300 rounded-lg p-4 resize-none"
                        placeholder="e.g., $300K for feasibility, $1.2M for implementation..."
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        Are you seeking funding for project development,
                        operational costs, or carbon credit certification?
                      </label>
                      <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-4 resize-none"
                        placeholder="Specify which areas..."
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 5. Investment Structure */}
                <div
                  ref={investmentStructureRef}
                  data-section="Investment Structure"
                >
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Investment Structure
                  </h2>
                  <p className="text-xs text-gray-700 mb-3">
                    Are you open to different investment structures, such as
                    equity financing, debt financing, or revenue-sharing
                    agreements?
                  </p>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setOpenToStructures(true)}
                      className={`px-6 py-2.5 rounded-lg border text-xs ${
                        openToStructures === true
                          ? "bg-green-100 border-green-500"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenToStructures(false)}
                      className={`px-6 py-2.5 rounded-lg border text-xs ${
                        openToStructures === false
                          ? "bg-red-100 border-red-500"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 6. Project Timeline */}
                <div ref={projectTimelineRef} data-section="Project Timeline">
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Project Timeline
                  </h2>
                  <div className="space-y-6">
                    <div className="relative">
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        What is the timeline for implementing your carbon
                        project and generating carbon credits?
                      </label>
                      <div
                        onClick={() => setTimelineOpen(!timelineOpen)}
                        className={`w-full px-4 py-3 rounded-lg border flex justify-between items-center cursor-pointer text-xs ${
                          timelineOpen ? "border-gray-500" : "border-gray-300"
                        }`}
                      >
                        <span
                          className={
                            selectedTimeline === "Select Timeline"
                              ? "text-gray-500"
                              : "text-gray-800"
                          }
                        >
                          {selectedTimeline}
                        </span>
                        {timelineOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <AnimatePresence>
                        {timelineOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
                          >
                            {timelines.map((t) => (
                              <div
                                key={t}
                                onClick={() => {
                                  setSelectedTimeline(t);
                                  setTimelineOpen(false);
                                }}
                                className="px-4 py-2.5 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {t}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-3">
                        Do you have any specific milestones or deadlines that
                        need to be considered in the financing process?
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setHasMilestones(true)}
                          className={`px-6 py-2.5 rounded-lg border text-xs ${
                            hasMilestones === true
                              ? "bg-green-100 border-green-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasMilestones(false)}
                          className={`px-6 py-2.5 rounded-lg border text-xs ${
                            hasMilestones === false
                              ? "bg-red-100 border-red-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 7. Stakeholder Engagement */}
                <div
                  ref={stakeholderEngagementRef}
                  data-section="Stakeholder Engagement"
                >
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Stakeholder Engagement
                  </h2>
                  <div className="space-y-6">
                    <div className="relative">
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        Who are the key stakeholders involved in your carbon
                        project, and what is their level of commitment?
                      </label>
                      <div
                        onClick={() => setCommitmentOpen(!commitmentOpen)}
                        className={`w-full px-4 py-3 rounded-lg border flex justify-between items-center cursor-pointer text-xs ${
                          commitmentOpen ? "border-gray-500" : "border-gray-300"
                        }`}
                      >
                        <span
                          className={
                            selectedCommitment === "Select Level of Commitment"
                              ? "text-gray-500"
                              : "text-gray-800"
                          }
                        >
                          {selectedCommitment}
                        </span>
                        {commitmentOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <AnimatePresence>
                        {commitmentOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
                          >
                            {commitmentLevels.map((level) => (
                              <div
                                key={level}
                                onClick={() => {
                                  setSelectedCommitment(level);
                                  setCommitmentOpen(false);
                                }}
                                className="px-4 py-2.5 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {level}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-3">
                        Are there any existing partnerships or collaborations
                        that could support the success of your project?
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setHasPartnerships(true)}
                          className={`px-6 py-2.5 rounded-lg border text-xs ${
                            hasPartnerships === true
                              ? "bg-green-100 border-green-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasPartnerships(false)}
                          className={`px-6 py-2.5 rounded-lg border text-xs ${
                            hasPartnerships === false
                              ? "bg-red-100 border-red-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 8. Impact Measurement */}
                <div
                  ref={impactMeasurementRef}
                  data-section="Impact Measurement"
                >
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Impact Measurement
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        How do you plan to measure and report the environmental
                        and social impact of your carbon project?
                      </label>
                      <textarea
                        className="w-full h-28 text-xs border border-gray-300 rounded-lg p-4 resize-none"
                        placeholder="e.g., SDG alignment, community surveys, biodiversity monitoring..."
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        Are there specific metrics or indicators that you use to
                        track progress and performance?
                      </label>
                      <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-4 resize-none"
                        placeholder="List your KPIs..."
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 9. Platform Usage */}
                <div ref={platformUsageRef} data-section="Platform Usage">
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Platform Usage
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        How do you envision using our platform to connect with
                        potential investors or buyers of carbon credits?
                      </label>
                      <textarea
                        className="w-full h-28 text-xs border border-gray-300 rounded-lg p-4 resize-none"
                        placeholder="e.g., Pitch project, find co-developers, secure pre-finance..."
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 font-medium mb-3">
                        What features or functionalities would you prioritize in
                        using our platform for green finance activities?
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {platformFeatures.map((feat) => (
                          <button
                            key={feat}
                            type="button"
                            onClick={() => toggleFeature(feat)}
                            className={`px-4 py-3 rounded-lg border text-left text-xs transition ${
                              selectedFeatures.includes(feat)
                                ? "bg-green-100 border-green-500 text-green-800"
                                : "border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {feat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200 my-8" />

                <Link
                  href="/dashboard"
                  className="mt-6 w-fit min-w-[140px] bg-[#044D5E] hover:bg-[#044D5E]/90 text-xs text-white px-5 py-2 rounded-full transition-all duration-300 
                        flex items-center justify-center relative"
                >
                  Submit
                  <ChevronRight size={16} className="absolute right-2" />
                </Link>
              </form>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Help */}
      <div className="fixed bottom-5 right-5 flex flex-col items-center">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative">
          need help?
          <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></span>
        </div>
        <button className="bg-white shadow-lg border border-gray-200 rounded-full p-3">
          <Image src={message_circle_more} alt="Help" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Page;
