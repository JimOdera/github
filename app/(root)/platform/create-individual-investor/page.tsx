"use client";

import Header from "@/app/components/Header";
import { message_circle_more } from "@/public";
import {
  ChevronDown,
  ChevronUp,
  UploadCloud,
  Pencil,
  UserRound,
  CreditCard,
  Bell,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedObjective, setSelectedObjective] =
    useState("Select Objective");
  const [selectedFocus, setSelectedFocus] = useState("Select Focus");
  const [selectedInvestmentType, setSelectedInvestmentType] = useState(
    "Select Investment Type"
  );
  const [riskTolerance, setRiskTolerance] = useState<
    "low" | "medium" | "high" | null
  >(null);
  const [exploreEmerging, setExploreEmerging] = useState<boolean | null>(null);
  const [selectedKpi, setSelectedKpi] = useState<string | null>(null);
  const [kpiDropdownOpen, setKpiDropdownOpen] = useState(false);
  const [regulatoryCompliance, setRegulatoryCompliance] = useState<
    boolean | null
  >(null);
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);
  const [standardsDropdownOpen, setStandardsDropdownOpen] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);
  const [interestedInPartnerships, setInterestedInPartnerships] = useState<
    boolean | null
  >(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>(
    "Individual Investor"
  );

  // Refs for smooth scroll navigation
  const individualInfoRef = useRef<HTMLDivElement>(null);
  const investmentObjectivesRef = useRef<HTMLDivElement>(null);
  const portfolioPreferencesRef = useRef<HTMLDivElement>(null);
  const riskAppetiteRef = useRef<HTMLDivElement>(null);
  const performanceMetricsRef = useRef<HTMLDivElement>(null);
  const regulatoryComplianceRef = useRef<HTMLDivElement>(null);
  const partnershipOpportunitiesRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(
    () => ({
      "Individual Investor": individualInfoRef,
      "Investment Objectives": investmentObjectivesRef,
      "Portfolio Preferences": portfolioPreferencesRef,
      "Risk Appetite": riskAppetiteRef,
      "Performance Metrics": performanceMetricsRef,
      "Regulatory & Compliance": regulatoryComplianceRef,
      "Partnership Opportunities": partnershipOpportunitiesRef,
    }),
    []
  );

  // Dropdown options
  const objectives = [
    "Climate-resilient infrastructure",
    "Renewable energy projects",
    "Sustainable agriculture",
    "Green housing development",
    "Water and waste management",
    "Low-carbon transportation",
    "Eco-tourism and conservation",
  ];

  const focusOptions = ["Financial Returns", "Environmental Impact", "Both"];

  const investmentTypes = [
    "Renewable Energy Projects",
    "Sustainable Agriculture & Forestry",
    "Green Bonds",
    "Climate Tech Startups",
    "Carbon Credit Projects",
    "Sustainable Real Estate",
    "Water Conservation Initiatives",
  ];

  const kpis = [
    "Carbon Emission Reduction",
    "Energy Efficiency",
    "Renewable Energy Output",
    "Water Usage Reduction",
    "Biodiversity Impact",
    "Social Impact Score",
    "Return on Investment (ROI)",
  ];

  const standards = [
    "ISO 14001",
    "GRI Standards",
    "UN Sustainable Development Goals (SDGs)",
    "Task Force on Climate-related Financial Disclosures (TCFD)",
    "Principles for Responsible Investment (PRI)",
  ];

  const platformFeatures = [
    "Real-time ESG performance tracking",
    "Impact investment analytics dashboard",
    "Automated regulatory compliance checks",
    "Secure document and data management system",
  ];

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

  const toggleRegulation = (item: string) => {
    setSelectedRegulations((prev) =>
      prev.includes(item) ? prev.filter((r) => r !== item) : [...prev, item]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

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

        {/* Form Section */}
        <main className="flex-grow w-full md:w-[80vw] mx-auto p-4 md:p-8">
          <div className="bg-white rounded-2xl shadow-md py-8 px-6 md:px-24">
            <div className="mb-10">
              <div className="text-sm text-[#1ECEC9] font-semibold">
                Create an account
              </div>
              <h1 className="text-2xl font-semibold text-[#044D5E] mt-2">
                Register as an Individual Investor
              </h1>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                Are you an individual investor committed to exploring
                sustainable finance opportunities? Do you have a passion for
                making a positive impact on the planet? Are you seeking out
                avenues to invest in projects and companies that prioritize
                sustainable initiatives that promote renewable energy, mitigate
                climate change, and drive social and environmental progress? By
                joining our platform, you gain access to a diverse range of
                sustainable investment opportunities, expert insights, and a
                supportive community of like-minded investors, empowering you to
                build a portfolio that generates both financial returns and
                meaningful impact.
              </p>
            </div>

            <div className="flex gap-8">
              {/* Sidebar Navigation */}
              <aside className="w-72 hidden md:block sticky top-20 self-start">
                <div className="flex flex-col gap-1">
                  {[
                    { name: "Individual Investor", icon: Pencil },
                    { name: "Investment Objectives", icon: UserRound },
                    { name: "Portfolio Preferences", icon: CreditCard },
                    { name: "Risk Appetite", icon: Bell },
                    { name: "Performance Metrics", icon: Bell },
                    { name: "Regulatory & Compliance", icon: Bell },
                    { name: "Partnership Opportunities", icon: Bell },
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
                {/* 1. Individual Investor */}
                <div ref={individualInfoRef} data-section="Individual Investor">
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Individual Investor
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        What is your approach to green finance and
                        sustainability?
                      </label>
                      <textarea
                        className="w-full h-32 text-xs border border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:border-gray-400"
                        placeholder="Share your personal commitment, values, and experience..."
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        Upload green finance strategy / sustainability strategy
                        (optional)
                      </label>
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition">
                        <div className="flex flex-col items-center">
                          <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-xs text-gray-500">
                            Click to upload (PDF, DOC, DOCX)
                          </span>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 2. Investment Objectives */}
                <div
                  ref={investmentObjectivesRef}
                  data-section="Investment Objectives"
                >
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Investment Objectives
                  </h2>
                  <div className="space-y-6">
                    <div className="relative">
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        What are your specific objectives in seeking green
                        finance opportunities?
                      </label>
                      <div
                        onClick={() => setIsOpen(!isOpen)}
                        className={`w-full px-4 py-3 rounded-lg border flex justify-between items-center cursor-pointer text-xs transition ${
                          isOpen ? "border-gray-500" : "border-gray-300"
                        }`}
                      >
                        <span
                          className={
                            selectedObjective === "Select Objective"
                              ? "text-gray-500"
                              : "text-gray-800"
                          }
                        >
                          {selectedObjective}
                        </span>
                        {isOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                          >
                            {objectives.map((item) => (
                              <div
                                key={item}
                                onClick={() => {
                                  setSelectedObjective(item);
                                  setIsOpen(false);
                                }}
                                className="px-4 py-2.5 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {item}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        Are you primarily focused on generating financial
                        returns, achieving environmental impact, or both?
                      </label>
                      <div className="flex gap-3 flex-wrap">
                        {focusOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSelectedFocus(opt)}
                            className={`px-5 py-2.5 rounded-lg border text-xs font-medium transition ${
                              selectedFocus === opt
                                ? "bg-green-100 border-green-500 text-green-800"
                                : "border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 3. Portfolio Preferences */}
                <div
                  ref={portfolioPreferencesRef}
                  data-section="Portfolio Preferences"
                >
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Portfolio Preferences
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        What types of green investments are you interested in?
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {investmentTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSelectedInvestmentType(type)}
                            className={`px-4 py-3 rounded-lg border text-left text-xs transition ${
                              selectedInvestmentType === type
                                ? "bg-green-100 border-green-500 text-green-800"
                                : "border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        Do you have any sector or geographic preferences for
                        investments?
                      </label>
                      <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-400"
                        placeholder="e.g., Renewable energy in Africa, Water projects in Asia..."
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 4. Risk Appetite */}
                <div ref={riskAppetiteRef} data-section="Risk Appetite">
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Risk Appetite
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs text-gray-700 font-medium block mb-3">
                        What is your risk tolerance when it comes to green
                        investments?
                      </label>
                      <div className="flex gap-4">
                        {(["low", "medium", "high"] as const).map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() =>
                              setRiskTolerance(
                                riskTolerance === level ? null : level
                              )
                            }
                            className={`px-6 py-3 rounded-lg border text-xs font-medium capitalize transition ${
                              riskTolerance === level
                                ? level === "low"
                                  ? "bg-green-100 border-green-500 text-green-800"
                                  : level === "medium"
                                  ? "bg-yellow-100 border-yellow-500 text-yellow-700"
                                  : "bg-red-100 border-red-500 text-red-800"
                                : "border-gray-300 hover:bg-gray-50 text-gray-600"
                            }`}
                          >
                            {level === "low"
                              ? "Low"
                              : level === "medium"
                              ? "Medium"
                              : "High"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="text-xs text-gray-700 font-medium block mb-3">
                        Are you open to exploring both established and emerging
                        green technologies or projects?
                      </label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setExploreEmerging(
                              exploreEmerging === true ? null : true
                            )
                          }
                          className={`px-6 py-3 rounded-lg border text-xs font-medium transition ${
                            exploreEmerging === true
                              ? "bg-green-100 border-green-500 text-green-800"
                              : "border-gray-300 hover:bg-gray-50 text-gray-600"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setExploreEmerging(
                              exploreEmerging === false ? null : false
                            )
                          }
                          className={`px-6 py-3 rounded-lg border text-xs font-medium transition ${
                            exploreEmerging === false
                              ? "bg-red-100 border-red-500 text-red-800"
                              : "border-gray-300 hover:bg-gray-50 text-gray-600"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 5. Performance Metrics */}
                <div
                  ref={performanceMetricsRef}
                  data-section="Performance Metrics"
                >
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Performance Metrics
                  </h2>
                  <div className="relative">
                    <label className="text-xs text-gray-700 font-medium block mb-2">
                      What Key Performance Indicators (KPIs) are important to
                      you in assessing the success of green investments?
                    </label>
                    <div
                      onClick={() => setKpiDropdownOpen(!kpiDropdownOpen)}
                      className={`w-full px-4 py-3 rounded-lg border flex justify-between items-center cursor-pointer text-xs transition ${
                        kpiDropdownOpen ? "border-gray-500" : "border-gray-300"
                      }`}
                    >
                      <span
                        className={
                          selectedKpi ? "text-gray-800" : "text-gray-500"
                        }
                      >
                        {selectedKpi || "Select KPI"}
                      </span>
                      {kpiDropdownOpen ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </div>
                    <AnimatePresence>
                      {kpiDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                          {kpis.map((kpi) => (
                            <div
                              key={kpi}
                              onClick={() => {
                                setSelectedKpi(kpi);
                                setKpiDropdownOpen(false);
                              }}
                              className="px-4 py-2.5 text-xs hover:bg-gray-50 cursor-pointer"
                            >
                              {kpi}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 6. Regulatory & Compliance */}
                <div
                  ref={regulatoryComplianceRef}
                  data-section="Regulatory & Compliance"
                >
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Regulatory & Compliance Considerations
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-3">
                        Are there regulatory or compliance requirements that
                        need to be considered in your green investment strategy?
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setRegulatoryCompliance(
                              regulatoryCompliance === true ? null : true
                            )
                          }
                          className={`px-6 py-3 rounded-lg border text-xs font-medium transition ${
                            regulatoryCompliance === true
                              ? "bg-green-100 border-green-500 text-green-800"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setRegulatoryCompliance(
                              regulatoryCompliance === false ? null : false
                            )
                          }
                          className={`px-6 py-3 rounded-lg border text-xs font-medium transition ${
                            regulatoryCompliance === false
                              ? "bg-red-100 border-red-500 text-red-800"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    {regulatoryCompliance === true && (
                      <div>
                        <p className="text-xs text-gray-700 font-medium mb-3">
                          If so, select those that apply
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            "Environmental Impact Assessments (EIA)",
                            "Green Taxonomy Compliance (e.g., EU Taxonomy)",
                            "Carbon Disclosure Reporting (e.g., CDP)",
                            "Sustainable Finance Disclosure Regulation (SFDR)",
                          ].map((reg) => (
                            <button
                              key={reg}
                              type="button"
                              onClick={() => toggleRegulation(reg)}
                              className={`px-4 py-3 rounded-lg border text-left text-xs transition ${
                                selectedRegulations.includes(reg)
                                  ? "bg-green-100 border-green-500 text-green-800"
                                  : "border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {reg}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="relative mt-6">
                      <label className="text-xs text-gray-700 font-medium block mb-2">
                        How do you ensure alignment with relevant sustainability
                        standards and guidelines?
                      </label>
                      <div
                        onClick={() =>
                          setStandardsDropdownOpen(!standardsDropdownOpen)
                        }
                        className={`w-full px-4 py-3 rounded-lg border flex justify-between items-center cursor-pointer text-xs transition ${
                          standardsDropdownOpen
                            ? "border-gray-500"
                            : "border-gray-300"
                        }`}
                      >
                        <span
                          className={
                            selectedStandard ? "text-gray-800" : "text-gray-500"
                          }
                        >
                          {selectedStandard || "Select Standard"}
                        </span>
                        {standardsDropdownOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <AnimatePresence>
                        {standardsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
                          >
                            {standards.map((std) => (
                              <div
                                key={std}
                                onClick={() => {
                                  setSelectedStandard(std);
                                  setStandardsDropdownOpen(false);
                                }}
                                className="px-4 py-2.5 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {std}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* 7. Partnership Opportunities */}
                <div
                  ref={partnershipOpportunitiesRef}
                  data-section="Partnership Opportunities"
                >
                  <h2 className="text-lg font-medium text-gray-700 mb-6">
                    Partnership Opportunities
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-3">
                        Are you interested in exploring partnerships with other
                        institutions, investors, or project developers on the
                        platform?
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setInterestedInPartnerships(
                              interestedInPartnerships === true ? null : true
                            )
                          }
                          className={`px-6 py-3 rounded-lg border text-xs font-medium transition ${
                            interestedInPartnerships === true
                              ? "bg-green-100 border-green-500 text-green-800"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setInterestedInPartnerships(
                              interestedInPartnerships === false ? null : false
                            )
                          }
                          className={`px-6 py-3 rounded-lg border text-xs font-medium transition ${
                            interestedInPartnerships === false
                              ? "bg-red-100 border-red-500 text-red-800"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    {interestedInPartnerships === true && (
                      <div>
                        <p className="text-xs text-gray-700 font-medium mb-3">
                          What features or functionalities would you prioritize
                          in using our platform for green finance activities?
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
                    )}
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
