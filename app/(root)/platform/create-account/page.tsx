"use client";

import Header from "@/app/components/Header";
import { message_circle_more } from "@/public";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  UploadCloud,
  FileText,
  Building2,
  Target,
  AlertTriangle,
  BarChart3,
  Users,
  ScrollText,
  Handshake,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const getKlimaUser = (): any => {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem("klimaUser");
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const Page = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const user = getKlimaUser();
    if (user?.name) setUserName(user.name);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("klimaUser");
      if (stored) {
        const user = JSON.parse(stored);
        setUserName(user.name || "User");
      }
    } catch (err) {
      setUserName("User");
    }
  }, []);

  // === Form States ===
  const [institutionApproach, setInstitutionApproach] = useState("");
  const [greenFinanceFile, setGreenFinanceFile] = useState<File | null>(null);
  const [greenFinancePreview, setGreenFinancePreview] = useState<string | null>(null);
  const [brandingFile, setBrandingFile] = useState<File | null>(null);
  const [brandingPreview, setBrandingPreview] = useState<string | null>(null);

  const [selectedObjective, setSelectedObjective] = useState("Select");
  const [sectorPreferences, setSectorPreferences] = useState("");

  const [riskTolerance, setRiskTolerance] = useState<"low" | "medium" | "high" | null>(null);
  const [exploreEmerging, setExploreEmerging] = useState<boolean | null>(null);

  const [measurePerformance, setMeasurePerformance] = useState<boolean | null>(null);
  const [performanceExplanation, setPerformanceExplanation] = useState("");

  const [selectedKpi, setSelectedKpi] = useState<string | null>(null);
  const [selectedStakeholder1, setSelectedStakeholder1] = useState<string | null>(null);
  const [selectedStakeholder2, setSelectedStakeholder2] = useState<string | null>(null);

  const [regulatoryCompliance, setRegulatoryCompliance] = useState<boolean | null>(null);
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);

  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);

  const [partnershipOpportunities, setPartnershipOpportunities] = useState<boolean | null>(null);
  const [selectedPartnerships, setSelectedPartnerships] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dropdown States
  const [objectiveOpen, setObjectiveOpen] = useState(false);
  const [kpiDropdownOpen, setKpiDropdownOpen] = useState(false);
  const [stakeholderDropdownOpen1, setStakeholderDropdownOpen1] = useState(false);
  const [stakeholderDropdownOpen2, setStakeholderDropdownOpen2] = useState(false);
  const [standardsDropdownOpen, setStandardsDropdownOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("Institution Information");

  // Refs
  const institutionInfoRef = useRef<HTMLDivElement>(null);
  const investmentObjectivesRef = useRef<HTMLDivElement>(null);
  const riskAppetiteRef = useRef<HTMLDivElement>(null);
  const performanceMetricsRef = useRef<HTMLDivElement>(null);
  const stakeholderEngagementRef = useRef<HTMLDivElement>(null);
  const regulatoryComplianceRef = useRef<HTMLDivElement>(null);
  const partnershipOpportunitiesRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(
    () => ({
      "Institution Information": institutionInfoRef,
      "Investment Objectives": investmentObjectivesRef,
      "Risk Appetite": riskAppetiteRef,
      "Performance Metrics": performanceMetricsRef,
      "Stakeholder Engagement": stakeholderEngagementRef,
      "Regulatory Compliance": regulatoryComplianceRef,
      "Partnership Opportunities": partnershipOpportunitiesRef,
    }),
    []
  );

  const objectives = [
    "Climate-resilient infrastructure",
    "Renewable energy projects",
    "Sustainable agriculture",
    "Green housing development",
    "Water and waste management",
    "Low-carbon transportation",
    "Eco-tourism and conservation",
  ];

  const kpis = ["Carbon Emission Reduction", "Energy Efficiency", "Renewable Energy Output", "Water Usage Reduction", "Biodiversity Impact"];
  const stakeholders1 = ["Board of Directors", "Investment Committee", "Risk & Compliance Team", "Sustainability Officer"];
  const stakeholders2 = ["High Return Preference", "Environmental Impact Focus", "Regulatory Compliance Priority", "Long-Term Sustainability Goals"];
  const standards = ["ISO 14001", "GRI Standards", "UN Sustainable Development Goals (SDGs)", "Task Force on Climate-related Financial Disclosures (TCFD)"];
  const regulationsList = ["Environmental Impact Assessments (EIA)", "Green Taxonomy Compliance (e.g., EU Taxonomy)", "Carbon Disclosure Reporting (e.g., CDP)", "Sustainable Finance Disclosure Regulation (SFDR)"];
  const partnershipsList = ["Real-time ESG performance tracking", "Impact investment analytics dashboard", "Automated regulatory compliance checks", "Secure document and data management system"];

  const toggleRegulation = (item: string) => {
    setSelectedRegulations(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const togglePartnership = (item: string) => {
    setSelectedPartnerships(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({ behavior: "smooth" });
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

    Object.values(sectionRefs).forEach(ref => ref.current && observer.observe(ref.current));

    return () => observer.disconnect();
  }, [sectionRefs]);

  const handleFileChange = (
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
    currentPreview: string | null
  ) => {
    if (currentPreview) URL.revokeObjectURL(currentPreview);
    setFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const removeFile = (
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
    currentPreview: string | null
  ) => {
    if (currentPreview) URL.revokeObjectURL(currentPreview);
    setFile(null);
    setPreview(null);
  };

  useEffect(() => {
    return () => {
      if (greenFinancePreview) URL.revokeObjectURL(greenFinancePreview);
      if (brandingPreview) URL.revokeObjectURL(brandingPreview);
    };
  }, [greenFinancePreview, brandingPreview]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const user = getKlimaUser();
      if (!user) {
        setIsSubmitting(false);
        router.push("/sign-up");
        return;
      }
      const institutionData = {
        type: "Institution",
        registeredAt: new Date().toISOString(),
        institutionApproach,
        greenFinanceFile: greenFinanceFile?.name || null,
        brandingFile: brandingFile?.name || null,
        investmentObjective: selectedObjective !== "Select" ? selectedObjective : null,
        sectorPreferences: sectorPreferences || null,
        riskTolerance,
        exploreEmerging,
        measurePerformance,
        performanceExplanation: measurePerformance ? performanceExplanation : null,
        selectedKpi,
        keyStakeholder: selectedStakeholder1,
        stakeholderPreference: selectedStakeholder2,
        regulatoryCompliance,
        applicableRegulations: regulatoryCompliance ? selectedRegulations : [],
        sustainabilityStandard: selectedStandard,
        openToPartnerships: partnershipOpportunities,
        desiredPartnerships: partnershipOpportunities ? selectedPartnerships : [],
      };

      const updatedUser = {
        ...user,
        institutionData,
        hasCompletedOnboarding: true,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("klimaUser", JSON.stringify(updatedUser));
      }

      await fetch("/api/auth/set-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Submit error:", error);
      setIsSubmitting(false);
    }
  };

  const dashimg = "/images/dashimg.png";

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col space-y-0 md:space-y-6">
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
              <h2 className="text-sm lg:text-lg">Hello {userName}</h2>
              <h1 className="text-xl lg:text-3xl font-semibold">Welcome to Klima Harvest</h1>
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
        <main className="flex-grow w-full md:w-[80vw] mx-auto p-2 md:px-6 md:py-4">
          <div className="bg-white rounded-sm md:rounded-2xl shadow-md py-2 px-2 md:py-8 md:px-24 space-y-12">
            <div className="flex flex-col gap-2 mb-8">
              <div className="w-fit text-sm text-[#1ECEC9] font-semibold mb-2">
                Create an account
              </div>
              <div className="space-y-2">
                <h1 className="text-xl text-[#044D5E] font-semibold">
                  Register as an Institution
                </h1>
                <p className="text-xs text-gray-500">
                  Are you an institution with green finance objectives? Do you prioritise investments that align with environmental goals while delivering financial returns? Klima Harvest will support you in tracking your green finance commitments against environment, social and economic performance indicators, while connecting you to carbon revenue generating opportunities across your portfolio.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-72 hidden md:flex flex-col gap-2 sticky top-17 self-start">
                <div className="flex flex-col gap-1">
                  {[
                    { name: "Institution Information", icon: Building2 },
                    { name: "Investment Objectives", icon: Target },
                    { name: "Risk Appetite", icon: AlertTriangle },
                    { name: "Performance Metrics", icon: BarChart3 },
                    { name: "Stakeholder Engagement", icon: Users },
                    { name: "Regulatory Compliance", icon: ScrollText },
                    { name: "Partnership Opportunities", icon: Handshake },
                  ].map(({ name, icon: Icon }) => (
                    <div
                      key={name}
                      onClick={() => handleNavClick(name)}
                      className={`flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${activeSection === name
                          ? "bg-[#F2F2F2] text-[#044D5E]"
                          : "hover:bg-gray-50 text-gray-500"
                        }`}
                    >
                      <Icon size={16} />
                      <p className="text-xs">{name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form className="w-full mx-auto px-4 md:px-6 py-0 flex-1 space-y-6">
                {/* Institution Information */}
                <div ref={institutionInfoRef} data-section="Institution Information">
                  <h1 className="text-lg font-medium text-gray-600 mb-6">Institution Information</h1>
                  <div className="mb-6">
                    <p className="text-xs text-gray-700 mb-2 font-medium">
                      What is your institutional approach to green finance and sustainability?
                    </p>
                    <textarea
                      value={institutionApproach}
                      onChange={(e) => setInstitutionApproach(e.target.value)}
                      className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                      placeholder="Type your answer here..."
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs text-gray-700 mb-2 font-medium">
                      Upload Green Finance Strategy/Sustainability Strategy*
                    </p>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 focus:outline-none focus:border-gray-400 transition">
                        {greenFinancePreview ? (
                          <div className="flex flex-col items-center space-y-1">
                            <FileText className="w-6 h-6 text-gray-500" />
                            <span className="text-xs text-gray-500 truncate max-w-[200px]">{greenFinanceFile?.name}</span>
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="w-6 h-6 text-gray-500" />
                            <span className="text-xs text-gray-500">
                              Upload your strategy document (PDF, DOC)
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e.target.files?.[0] || null, setGreenFinanceFile, setGreenFinancePreview, greenFinancePreview)}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs text-gray-700 mb-2 font-medium">
                      Upload branding materials**
                    </p>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 focus:outline-none focus:border-gray-400 transition">
                        {brandingPreview ? (
                          <div className="flex flex-col items-center space-y-1">
                            <FileText className="w-6 h-6 text-gray-500" />
                            <span className="text-xs text-gray-500 truncate max-w-[200px]">{brandingFile?.name}</span>
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="w-6 h-6 text-gray-500" />
                            <span className="text-xs text-gray-500">
                              Upload branding materials (PDF, PNG, JPG)
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => handleFileChange(e.target.files?.[0] || null, setBrandingFile, setBrandingPreview, brandingPreview)}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* Investment Objectives */}
                <div ref={investmentObjectivesRef} data-section="Investment Objectives">
                  <h1 className="text-lg font-medium text-gray-600 mb-6">Investment Objectives</h1>
                  <div className="space-y-3">
                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">
                        What are your specific objectives in seeking green finance opportunities?
                      </p>
                      <div
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${objectiveOpen ? "border border-gray-400 bg-white shadow-sm" : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        onClick={() => setObjectiveOpen(!objectiveOpen)}
                      >
                        <span className="text-gray-600">{selectedObjective}</span>
                        {objectiveOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                      </div>
                      <AnimatePresence>
                        {objectiveOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                          >
                            {objectives.map((item) => (
                              <div
                                key={item}
                                onClick={() => {
                                  setSelectedObjective(item);
                                  setObjectiveOpen(false);
                                }}
                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                              >
                                {item}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-1">
                        Do you have any sector or geographic preferences for investments?
                      </p>
                      <input
                        type="text"
                        value={sectorPreferences}
                        onChange={(e) => setSectorPreferences(e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="Enter preferences"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* Risk Appetite */}
                <div ref={riskAppetiteRef} data-section="Risk Appetite">
                  <h1 className="text-lg font-medium text-gray-600 mb-6">Risk Appetite</h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        What is your risk tolerance when it comes to green investments?
                      </p>
                      <div className="flex gap-3 mb-4">
                        {["low", "medium", "high"].map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setRiskTolerance(riskTolerance === level ? null : level as any)}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${riskTolerance === level
                                ? level === "low"
                                  ? "bg-green-100 border-green-500"
                                  : level === "medium"
                                    ? "bg-yellow-100 border-yellow-500"
                                    : "bg-red-100 border-red-500"
                                : "hover:bg-gray-50 border-gray-300"
                              } focus:outline-none`}
                          >
                            {level[0].toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Are you open to exploring both established and emerging green technologies or projects?
                      </p>
                      <div className="flex gap-3 mb-4">
                        <button
                          type="button"
                          onClick={() => setExploreEmerging(exploreEmerging === true ? null : true)}
                          className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${exploreEmerging === true ? "bg-green-100 border-green-500" : "hover:bg-gray-50 border-gray-300"
                            } focus:outline-none`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setExploreEmerging(exploreEmerging === false ? null : false)}
                          className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${exploreEmerging === false ? "bg-red-100 border-red-500" : "hover:bg-gray-50 border-gray-300"
                            } focus:outline-none`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* Performance Metrics */}
                <div ref={performanceMetricsRef} data-section="Performance Metrics">
                  <h1 className="text-lg font-medium text-gray-600 mb-6">Performance Metrics</h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Do you currently measure the performance of your green portfolio?
                      </p>
                      <div className="flex gap-3 mb-4">
                        <button
                          type="button"
                          onClick={() => setMeasurePerformance(measurePerformance === true ? null : true)}
                          className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${measurePerformance === true ? "bg-green-100 border-green-500" : "hover:bg-gray-50 border-gray-300"
                            } focus:outline-none`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setMeasurePerformance(measurePerformance === false ? null : false)}
                          className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${measurePerformance === false ? "bg-red-100 border-red-500" : "hover:bg-gray-50 border-gray-300"
                            } focus:outline-none`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                    {measurePerformance === true && (
                      <div>
                        <p className="text-xs text-gray-700 mb-2">If yes Please explain</p>
                        <textarea
                          value={performanceExplanation}
                          onChange={(e) => setPerformanceExplanation(e.target.value)}
                          className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                          placeholder="Type your explanation here..."
                        ></textarea>
                      </div>
                    )}
                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">
                        What Key Performance Indicators (KPIs) are important to your institution?
                      </p>
                      <div
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${kpiDropdownOpen ? "border border-gray-400 bg-white shadow-sm" : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        onClick={() => setKpiDropdownOpen(!kpiDropdownOpen)}
                      >
                        <span className="text-gray-600">{selectedKpi || "Select KPI"}</span>
                        {kpiDropdownOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                      </div>
                      <AnimatePresence>
                        {kpiDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                          >
                            {kpis.map((kpi) => (
                              <div
                                key={kpi}
                                onClick={() => {
                                  setSelectedKpi(kpi);
                                  setKpiDropdownOpen(false);
                                }}
                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                              >
                                {kpi}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* Stakeholder Engagement */}
                <div ref={stakeholderEngagementRef} data-section="Stakeholder Engagement">
                  <h1 className="text-lg font-medium text-gray-600 mb-6">Stakeholder Engagement</h1>
                  <div className="space-y-6">
                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">
                        Who are the key stakeholders within your organization involved in green finance decisions?
                      </p>
                      <div
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${stakeholderDropdownOpen1 ? "border border-gray-400 bg-white shadow-sm" : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        onClick={() => setStakeholderDropdownOpen1(!stakeholderDropdownOpen1)}
                      >
                        <span className="text-gray-600">{selectedStakeholder1 || "Select Stakeholder"}</span>
                        {stakeholderDropdownOpen1 ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                      </div>
                      <AnimatePresence>
                        {stakeholderDropdownOpen1 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                          >
                            {stakeholders1.map((s) => (
                              <div
                                key={s}
                                onClick={() => {
                                  setSelectedStakeholder1(s);
                                  setStakeholderDropdownOpen1(false);
                                }}
                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                              >
                                {s}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">
                        Are there any specific requirements or preferences from your stakeholders?
                      </p>
                      <div
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${stakeholderDropdownOpen2 ? "border border-gray-400 bg-white shadow-sm" : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        onClick={() => setStakeholderDropdownOpen2(!stakeholderDropdownOpen2)}
                      >
                        <span className="text-gray-600">{selectedStakeholder2 || "Select Preference"}</span>
                        {stakeholderDropdownOpen2 ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                      </div>
                      <AnimatePresence>
                        {stakeholderDropdownOpen2 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                          >
                            {stakeholders2.map((s) => (
                              <div
                                key={s}
                                onClick={() => {
                                  setSelectedStakeholder2(s);
                                  setStakeholderDropdownOpen2(false);
                                }}
                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                              >
                                {s}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* Regulatory Compliance */}
                <div ref={regulatoryComplianceRef} data-section="Regulatory Compliance">
                  <h1 className="text-lg font-medium text-gray-600 mb-6">Regulatory Compliance</h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Are there regulatory or compliance requirements that need to be considered?
                      </p>
                      <div className="flex gap-3 mb-4">
                        <button
                          type="button"
                          onClick={() => setRegulatoryCompliance(regulatoryCompliance === true ? null : true)}
                          className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${regulatoryCompliance === true ? "bg-green-100 border-green-500" : "hover:bg-gray-50 border-gray-300"
                            } focus:outline-none`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setRegulatoryCompliance(regulatoryCompliance === false ? null : false)}
                          className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${regulatoryCompliance === false ? "bg-red-100 border-red-500" : "hover:bg-gray-50 border-gray-300"
                            } focus:outline-none`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                    {regulatoryCompliance === true && (
                      <div>
                        <p className="text-xs text-gray-700 mb-2">If so, select those that apply</p>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {regulationsList.map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => toggleRegulation(r)}
                              className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${selectedRegulations.includes(r) ? "bg-green-100 border-green-500" : "hover:bg-gray-50 border-gray-300"
                                } focus:outline-none`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">
                        How do you ensure alignment with relevant sustainability standards?
                      </p>
                      <div
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${standardsDropdownOpen ? "border border-gray-400 bg-white shadow-sm" : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        onClick={() => setStandardsDropdownOpen(!standardsDropdownOpen)}
                      >
                        <span className="text-gray-600">{selectedStandard || "Select Standard"}</span>
                        {standardsDropdownOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                      </div>
                      <AnimatePresence>
                        {standardsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10"
                          >
                            {standards.map((s) => (
                              <div
                                key={s}
                                onClick={() => {
                                  setSelectedStandard(s);
                                  setStandardsDropdownOpen(false);
                                }}
                                className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                              >
                                {s}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* Partnership Opportunities */}
                <div ref={partnershipOpportunitiesRef} data-section="Partnership Opportunities">
                  <h1 className="text-lg font-medium text-gray-600 mb-6">Partnership Opportunities</h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Are you open to partnership opportunities to enhance your green investment strategy?
                      </p>
                      <div className="flex gap-3 mb-4">
                        <button
                          type="button"
                          onClick={() => setPartnershipOpportunities(partnershipOpportunities === true ? null : true)}
                          className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${partnershipOpportunities === true ? "bg-green-100 border-green-500" : "hover:bg-gray-50 border-gray-300"
                            } focus:outline-none`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setPartnershipOpportunities(partnershipOpportunities === false ? null : false)}
                          className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${partnershipOpportunities === false ? "bg-red-100 border-red-500" : "hover:bg-gray-50 border-gray-300"
                            } focus:outline-none`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                    {partnershipOpportunities === true && (
                      <div>
                        <p className="text-xs text-gray-700 mb-2">If so, select those that apply</p>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {partnershipsList.map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => togglePartnership(p)}
                              className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 ${selectedPartnerships.includes(p) ? "bg-green-100 border-green-500" : "hover:bg-gray-50 border-gray-300"
                                } focus:outline-none`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="mt-6 w-fit min-w-[140px] bg-[#044D5E] hover:bg-[#044D5E]/90 text-xs text-white px-5 py-2 rounded-full transition-all duration-300 flex items-center justify-center relative disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                  {!isSubmitting && <ChevronRight size={16} className="absolute right-2" />}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-5 right-5 flex flex-col items-center">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
          need help?
          <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45" aria-hidden="true"></span>
        </div>
        <button className="bg-white shadow-md border border-gray-200 rounded-full p-3 flex items-center justify-center cursor-pointer transition-all duration-300">
          <Image src={message_circle_more} alt="Help" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Page;