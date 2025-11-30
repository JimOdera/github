"use client";

import Header from "@/app/components/Header";
import { message_circle_more } from "@/public";
import { ChevronDown, ChevronUp, UploadCloud, Pencil, ChevronRight } from "lucide-react";
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

  const [impactMethodOpen, setImpactMethodOpen] = useState(false);
  const [selectedImpactMethod, setSelectedImpactMethod] =
    useState("Select Method");

  const [kpiOpen, setKpiOpen] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState("Select KPIs");

  // Yes/No states
  const [creditsRegistered, setCreditsRegistered] = useState<boolean | null>(
    null
  );
  const [currentlySelling, setCurrentlySelling] = useState<boolean | null>(
    null
  );
  const [hasIdentifiedBuyers, setHasIdentifiedBuyers] = useState<
    boolean | null
  >(null);
  const [seekingFinance, setSeekingFinance] = useState<boolean | null>(null);
  const [hasMilestones, setHasMilestones] = useState<boolean | null>(null);
  const [hasChallenges, setHasChallenges] = useState<boolean | null>(null);
  const [hasPartnerships, setHasPartnerships] = useState<boolean | null>(null);

  // Multi-select features
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const toggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  // ALL useRef at top level — Fixed & Safe
  const projectDescriptionRef = useRef<HTMLDivElement>(null);
  const carbonCreditGenerationRef = useRef<HTMLDivElement>(null);
  const verificationCertificationRef = useRef<HTMLDivElement>(null);
  const marketAccessRef = useRef<HTMLDivElement>(null);
  const financialImpactRef = useRef<HTMLDivElement>(null);
  const projectTimelineRef = useRef<HTMLDivElement>(null);
  const projectPerformanceRef = useRef<HTMLDivElement>(null);
  const stakeholderEngagementRef = useRef<HTMLDivElement>(null);
  const impactMeasurementRef = useRef<HTMLDivElement>(null);
  const platformUtilizationRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(
    () => ({
      "Project Description": projectDescriptionRef,
      "Carbon Credit Generation": carbonCreditGenerationRef,
      "Verification and Certification": verificationCertificationRef,
      "Market Access": marketAccessRef,
      "Financial Impact": financialImpactRef,
      "Project Timeline": projectTimelineRef,
      "Project Performance": projectPerformanceRef,
      "Stakeholder Engagement": stakeholderEngagementRef,
      "Impact Measurement": impactMeasurementRef,
      "Platform Utilization": platformUtilizationRef,
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

  // Options
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
    "Verified Emission Reductions (VERs)",
    "Certified Emission Reductions (CERs)",
    "Removal Credits (e.g., afforestation, DAC)",
    "Avoidance/Reduction Credits",
    "Gold Standard VERs",
    "Plan Vivo Certificates",
    "American Carbon Registry (ACR)",
    "Climate Action Reserve (CAR)",
  ];
  const timelines = [
    "Pre-issuance (under development)",
    "0–2 years",
    "2–5 years",
    "5–10 years",
    "10+ years",
    "Ongoing (credits already issued)",
  ];
  const impactMethods = [
    "SDG Contribution Framework",
    "GHG Protocol",
    "ISO 14064",
    "Verra SD VISta",
    "Gold Standard for the Global Goals",
    "Custom Framework",
  ];
  const kpis = [
    "Hectares of land restored/protected",
    "Jobs created",
    "Households with improved cookstoves",
    "Biodiversity improvement score",
    "Water saved (liters)",
    "Community development index",
    "Women empowerment metrics",
  ];
  const platformFeatures = [
    "Real-time ESG performance tracking",
    "Impact investment analytics dashboard",
    "Automated regulatory compliance checks",
    "Secure document and data management system",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col space-y-0 md:space-y-6">
      <Header />

      <div className="pt-16 md:pt-20">
        {/* Hero */}
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

        {/* Form */}
        <main className="flex-grow w-full md:w-[80vw] mx-auto p-2 md:px-6 md:py-4">
          <div className="bg-white rounded-sm md:rounded-2xl shadow-md py-2 px-2 md:py-8 md:px-24 space-y-12">
            <div className="flex flex-col gap-2 mb-8">
              <div className="w-fit text-sm text-[#1ECEC9] font-semibold mb-2">
                Create an account
              </div>
              <div className="space-y-2">
                <h1 className="text-xl text-[#044D5E] font-semibold">
                  Register as a Carbon Harvester
                </h1>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Are you part of a dynamic carbon project eager to connect with
                  buyers or investors in the burgeoning carbon market? By
                  joining our platform, you have an opportunity to forge
                  strategic partnerships with potential buyers or investors
                  interested in purchasing carbon credits or providing financial
                  support to scale up your initiatives. Through transparent
                  reporting, rigorous verification processes, and a commitment
                  to environmental integrity, your project aims to offer
                  attractive investment opportunities that not only yield
                  financial returns but also generate positive environmental and
                  social impact.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              {/* Sidebar */}
              <div className="w-72 hidden md:flex flex-col gap-2 sticky top-17 self-start">
                <div className="flex flex-col gap-1">
                  {Object.keys(sectionRefs).map((name) => (
                    <div
                      key={name}
                      onClick={() => handleNavClick(name)}
                      className={`flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer transition-colors duration-300 text-xs ${
                        activeSection === name
                          ? "bg-[#F2F2F2] text-[#044D5E]"
                          : "hover:bg-gray-50 text-gray-500"
                      }`}
                    >
                      <Pencil size={16} />
                      <p>{name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <form className="w-full mx-auto px-4 md:px-6 py-0 flex-1 space-y-6">
                {/* 1. Project Description */}
                <div
                  ref={projectDescriptionRef}
                  data-section="Project Description"
                >
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Project Description
                  </h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2 font-medium">
                        Can you provide an overview of your
                        project/business/enterprise/innovation? Include
                        objectives, location, and methodology.
                      </p>
                      <textarea
                        className="w-full h-32 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400"
                        placeholder="Describe your project..."
                      />
                    </div>
                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">Location</p>
                      <div
                        onClick={() => setLocationOpen(!locationOpen)}
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all ${
                          locationOpen
                            ? "border border-gray-400 shadow-sm"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-gray-600">
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
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10 max-h-60 overflow-y-auto"
                          >
                            {locations.map((loc) => (
                              <div
                                key={loc}
                                onClick={() => {
                                  setSelectedLocation(loc);
                                  setLocationOpen(false);
                                }}
                                className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {loc}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">
                        What type of carbon credits does your project aim to
                        generate?
                      </p>
                      <div
                        onClick={() => setCreditTypeOpen(!creditTypeOpen)}
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all ${
                          creditTypeOpen
                            ? "border border-gray-400 shadow-sm"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-gray-600">
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
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10 max-h-60 overflow-y-auto"
                          >
                            {creditTypes.map((type) => (
                              <div
                                key={type}
                                onClick={() => {
                                  setSelectedCreditType(type);
                                  setCreditTypeOpen(false);
                                }}
                                className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {type}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* 2. Carbon Credit Generation */}
                <div
                  ref={carbonCreditGenerationRef}
                  data-section="Carbon Credit Generation"
                >
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Carbon Credit Generation
                  </h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        How many carbon credits have been generated by your
                        project, and over what time period?
                      </p>
                      <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="e.g., 85,000 tCO₂e from 2019–2024"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Which carbon offset standard or methodology was used to
                        verify and certify the carbon credits?
                      </p>
                      <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="e.g., Verra VCS + CCB, Gold Standard"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* 3. Verification and Certification */}
                <div
                  ref={verificationCertificationRef}
                  data-section="Verification and Certification"
                >
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Verification and Certification
                  </h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2 font-medium">
                        Provide details on the verification and certification
                        process for your carbon credits
                      </p>
                      <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
                        <span className="text-xs text-gray-500">
                          Upload PDD, validation/verification reports (PDF)
                        </span>
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          accept=".pdf"
                        />
                      </label>
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Have the carbon credits been issued and registered on
                        any carbon offset registries or platforms?
                      </p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setCreditsRegistered(true)}
                          className={`px-6 py-2 rounded-lg border text-xs ${
                            creditsRegistered === true
                              ? "bg-green-100 border-green-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setCreditsRegistered(false)}
                          className={`px-6 py-2 rounded-lg border text-xs ${
                            creditsRegistered === false
                              ? "bg-red-100 border-red-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                      {creditsRegistered === true && (
                        <input
                          type="text"
                          className="w-full mt-3 text-xs border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="e.g., Verra Registry, Gold Standard Impact Registry"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* 4. Market Access */}
                <div ref={marketAccessRef} data-section="Market Access">
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Market Access
                  </h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Are you currently selling or planning to sell your
                        carbon credits on the carbon market?
                      </p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setCurrentlySelling(true)}
                          className={`px-6 py-2 rounded-lg border text-xs ${
                            currentlySelling === true
                              ? "bg-green-100 border-green-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentlySelling(false)}
                          className={`px-6 py-2 rounded-lg border text-xs ${
                            currentlySelling === false
                              ? "bg-red-100 border-red-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Have you identified potential buyers or investors
                        interested in purchasing your carbon credits?
                      </p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setHasIdentifiedBuyers(true)}
                          className={`px-6 py-2 rounded-lg border text-xs ${
                            hasIdentifiedBuyers === true
                              ? "bg-green-100 border-green-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasIdentifiedBuyers(false)}
                          className={`px-6 py-2 rounded-lg border text-xs ${
                            hasIdentifiedBuyers === false
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

                <hr className="border-t border-gray-200 my-6" />

                {/* 5. Financial Impact */}
                <div ref={financialImpactRef} data-section="Financial Impact">
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Financial Impact
                  </h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        What has been the financial impact of generating and
                        selling carbon credits for your project?
                      </p>
                      <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none"
                        placeholder="e.g., Revenue generated, reinvestment in community..."
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Are you seeking additional financing or investment to
                        scale up your project or undertake new initiatives?
                      </p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setSeekingFinance(true)}
                          className={`px-6 py-2 rounded-lg border text-xs ${
                            seekingFinance === true
                              ? "bg-green-100 border-green-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setSeekingFinance(false)}
                          className={`px-6 py-2 rounded-lg border text-xs ${
                            seekingFinance === false
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

                <hr className="border-t border-gray-200 my-6" />

                {/* 6. Project Timeline */}
                <div ref={projectTimelineRef} data-section="Project Timeline">
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Project Timeline
                  </h1>
                  <div className="space-y-6">
                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">
                        What is the timeline for implementing your carbon
                        project and generating carbon credits?
                      </p>
                      <div
                        onClick={() => setTimelineOpen(!timelineOpen)}
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all ${
                          timelineOpen
                            ? "border border-gray-400 shadow-sm"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-gray-600">
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
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                          >
                            {timelines.map((t) => (
                              <div
                                key={t}
                                onClick={() => {
                                  setSelectedTimeline(t);
                                  setTimelineOpen(false);
                                }}
                                className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {t}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Do you have any specific milestones or deadlines that
                        need to be considered in the financing process?
                      </p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setHasMilestones(true)}
                          className={`px-6 py-2 rounded-lg border text-xs ${
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
                          className={`px-6 py-2 rounded-lg border text-xs ${
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

                <hr className="border-t border-gray-200 my-6" />

                {/* 7. Project Performance */}
                <div
                  ref={projectPerformanceRef}
                  data-section="Project Performance"
                >
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Project Performance
                  </h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        How do you measure and track the environmental and
                        social impact of your project beyond carbon credits?
                      </p>
                      <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none"
                        placeholder="e.g., Biodiversity monitoring, community surveys..."
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Have there been any challenges or lessons learned from
                        implementing your carbon project?
                      </p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setHasChallenges(true)}
                          className={`px-6 py-2 rounded-lg border text-xs ${
                            hasChallenges === true
                              ? "bg-green-100 border-green-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasChallenges(false)}
                          className={`px-6 py-2 rounded-lg border text-xs ${
                            hasChallenges === false
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

                <hr className="border-t border-gray-200 my-6" />

                {/* 8. Stakeholder Engagement */}
                <div
                  ref={stakeholderEngagementRef}
                  data-section="Stakeholder Engagement"
                >
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Stakeholder Engagement
                  </h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Who are the key stakeholders involved in your carbon
                        project, and how do you engage with them?
                      </p>
                      <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none"
                        placeholder="e.g., Local communities, government, NGOs..."
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Are there any partnerships or collaborations you have
                        formed to support the success of your project?
                      </p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setHasPartnerships(true)}
                          className={`px-6 py-2 rounded-lg border text-xs ${
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
                          className={`px-6 py-2 rounded-lg border text-xs ${
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

                <hr className="border-t border-gray-200 my-6" />

                {/* 9. Impact Measurement */}
                <div
                  ref={impactMeasurementRef}
                  data-section="Impact Measurement"
                >
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Impact Measurement
                  </h1>
                  <div className="space-y-6">
                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">
                        How do you plan to measure and report the environmental
                        and social impact of your carbon project?
                      </p>
                      <div
                        onClick={() => setImpactMethodOpen(!impactMethodOpen)}
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all ${
                          impactMethodOpen
                            ? "border border-gray-400 shadow-sm"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-gray-600">
                          {selectedImpactMethod}
                        </span>
                        {impactMethodOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <AnimatePresence>
                        {impactMethodOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                          >
                            {impactMethods.map((m) => (
                              <div
                                key={m}
                                onClick={() => {
                                  setSelectedImpactMethod(m);
                                  setImpactMethodOpen(false);
                                }}
                                className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {m}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">
                        Are there specific metrics or indicators that you use to
                        track progress and performance?
                      </p>
                      <div
                        onClick={() => setKpiOpen(!kpiOpen)}
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all ${
                          kpiOpen
                            ? "border border-gray-400 shadow-sm"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-gray-600">{selectedKpi}</span>
                        {kpiOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <AnimatePresence>
                        {kpiOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10 max-h-60 overflow-y-auto"
                          >
                            {kpis.map((k) => (
                              <div
                                key={k}
                                onClick={() => {
                                  setSelectedKpi(k);
                                  setKpiOpen(false);
                                }}
                                className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {k}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* 10. Platform Utilization */}
                <div
                  ref={platformUtilizationRef}
                  data-section="Platform Utilization"
                >
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Platform Utilization
                  </h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2 font-medium">
                        How do you intend to leverage our platform to showcase
                        your carbon credits and connect with potential buyers or
                        investors?
                      </p>
                      <textarea
                        className="w-full h-28 text-xs border border-gray-300 rounded-lg p-3 resize-none"
                        placeholder="e.g., List credits, attract buyers, secure financing..."
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-2 font-medium">
                        What features or functionalities would be most
                        beneficial to you in leveraging the platform for your
                        carbon project?
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {platformFeatures.map((feat) => (
                          <button
                            key={feat}
                            type="button"
                            onClick={() => toggleFeature(feat)}
                            className={`px-4 py-2 rounded-lg border text-xs text-left transition ${
                              selectedFeatures.includes(feat)
                                ? "bg-green-100 border-green-500"
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

                <hr className="border-t border-gray-200 my-6" />

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
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
          need help?
          <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></span>
        </div>
        <button className="bg-white shadow-md border border-gray-200 rounded-full p-3">
          <Image src={message_circle_more} alt="Help" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Page;
