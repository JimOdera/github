"use client";

import Header from "@/app/components/Header";
import { message_circle_more } from "@/public";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CreditCard,
  Pencil,
  UploadCloud,
  UserRound,
  X,
  FileText,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("User");

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

  // === File Upload Preview Logic ===
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (greenFinancePreview) URL.revokeObjectURL(greenFinancePreview);
      if (brandingPreview) URL.revokeObjectURL(brandingPreview);
    };
  }, [greenFinancePreview, brandingPreview]);

  // === Submit Handler ===
  const handleSubmit = async () => {
    // Prevent double click
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
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

      const stored = localStorage.getItem("klimaUser");
      if (!stored) {
        setIsSubmitting(false);
        router.push("/sign-up");
        return;
      }

      const user = JSON.parse(stored);
      const updatedUser = {
        ...user,
        institutionData,
        hasCompletedOnboarding: true,
      };

      // Save to localStorage (fallback)
      localStorage.setItem("klimaUser", JSON.stringify(updatedUser));

      // CRITICAL: Set cookie via API route (server-side, reliable)
      await fetch("/api/auth/set-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      // NO ALERT() — IT KILLS NAVIGATION
      // INSTANT REDIRECT — GUARANTEED
      router.push("/dashboard");

    } catch (error) {
      console.error("Submit error:", error);
      setIsSubmitting(false);
    }
  };

  const dashimg = "/images/dashimg.png";

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col">
      <Header />

      <div className="pt-16 md:pt-20">
        {/* Hero */}
        <section
          className="relative bg-cover bg-center h-48 w-full lg:w-[90vw] mx-auto lg:rounded-lg overflow-hidden"
          style={{ backgroundImage: `url(${dashimg})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 px-4 py-2 text-white flex flex-col md:flex-row items-start md:items-end justify-between h-full md:px-6 md:py-10">
            <div>
              <h2 className="text-lg">
                Hello {JSON.parse(localStorage.getItem("klimaUser") || "{}")?.name || "User"}
              </h2>
              <h1 className="text-xl lg:text-3xl font-semibold">Welcome to Klima Harvest</h1>
            </div>
            <Link
              href="/projects/marketplace"
              className="bg-[#00D98A] hover:bg-[#00D98A]/90 text-black px-5 py-2 rounded-lg text-xs"
            >
              Explore Community
            </Link>
          </div>
        </section>

        {/* Form */}
        <main className="flex-grow w-full md:w-[80vw] mx-auto p-4 md:px-6 md:py-8">
          <div className="bg-white rounded-2xl shadow-lg py-8 px-6 md:px-24 space-y-12">
            <div className="mb-10">
              <div className="w-fit text-sm text-[#1ECEC9] font-semibold mb-2">Create an account</div>
              <h1 className="text-2xl text-[#044D5E] font-semibold">Register as an Institution</h1>
              <p className="text-sm text-gray-500 mt-3">
                Are you an institution with green finance objectives? Klima Harvest will support you in tracking your green finance commitments...
              </p>
            </div>

            <div className="flex gap-8">
              {/* Sidebar */}
              <div className="w-72 hidden lg:flex flex-col gap-2 sticky top-20 self-start">
                <div className="flex flex-col gap-1">
                  {[
                    { name: "Institution Information", icon: Pencil },
                    { name: "Investment Objectives", icon: UserRound },
                    { name: "Risk Appetite", icon: CreditCard },
                    { name: "Performance Metrics", icon: Bell },
                    { name: "Stakeholder Engagement", icon: Bell },
                    { name: "Regulatory Compliance", icon: Bell },
                    { name: "Partnership Opportunities", icon: Bell },
                  ].map(({ name, icon: Icon }) => (
                    <div
                      key={name}
                      onClick={() => handleNavClick(name)}
                      className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all ${activeSection === name
                        ? "bg-[#F2F2F2] text-[#044D5E] font-medium"
                        : "hover:bg-gray-50 text-gray-600"
                        }`}
                    >
                      <Icon size={18} />
                      <p className="text-sm">{name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <form className="flex-1 space-y-12">
                {/* Institution Information */}
                <div ref={institutionInfoRef} data-section="Institution Information">
                  <h2 className="text-xl font-semibold text-gray-800 mb-8">Institution Information</h2>

                  <div className="mb-10">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      What is your institutional approach to green finance and sustainability?
                    </p>
                    <textarea
                      value={institutionApproach}
                      onChange={(e) => setInstitutionApproach(e.target.value)}
                      className="w-full h-32 text-sm border border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:border-[#1ECEC9] transition"
                      placeholder="Describe your institution's commitment and strategy..."
                    />
                  </div>

                  {/* Green Finance Strategy Upload */}
                  <div className="mb-10">
                    <p className="text-sm font-medium text-gray-700 mb-4">
                      Upload Green Finance Strategy/Sustainability Strategy*
                    </p>
                    <label className="block relative h-64 border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden cursor-pointer group hover:border-[#1ECEC9] transition">
                      {greenFinancePreview ? (
                        <>
                          {greenFinanceFile?.type.startsWith("image/") ? (
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url(${greenFinancePreview})` }}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                              <div className="text-center">
                                <FileText size={48} className="text-[#1ECEC9] mx-auto mb-3" />
                                <p className="text-lg font-medium text-gray-700">PDF Document</p>
                                <p className="text-sm text-gray-500 mt-1 max-w-xs truncate">{greenFinanceFile?.name}</p>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              removeFile(setGreenFinanceFile, setGreenFinancePreview, greenFinancePreview);
                            }}
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
                          >
                            <X size={20} className="text-gray-700" />
                          </button>
                          <div className="absolute bottom-5 left-5 text-white">
                            <p className="text-sm font-medium truncate max-w-md">{greenFinanceFile?.name}</p>
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition">
                          <UploadCloud size={48} className="text-gray-400 mb-4" />
                          <p className="text-lg font-medium text-gray-700">Drop your document here or click to upload</p>
                          <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX • Max 10MB</p>
                        </div>
                      )}
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                          handleFileChange(e.target.files?.[0] || null, setGreenFinanceFile, setGreenFinancePreview, greenFinancePreview)
                        }
                      />
                    </label>
                  </div>

                  {/* Branding Materials Upload */}
                  <div className="mb-10">
                    <p className="text-sm font-medium text-gray-700 mb-4">Upload branding materials**</p>
                    <label className="block relative h-64 border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden cursor-pointer group hover:border-[#1ECEC9] transition">
                      {brandingPreview ? (
                        <>
                          {brandingFile?.type.startsWith("image/") ? (
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url(${brandingPreview})` }}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                              <div className="text-center">
                                <FileText size={48} className="text-[#1ECEC9] mx-auto mb-3" />
                                <p className="text-lg font-medium text-gray-700">File Uploaded</p>
                                <p className="text-sm text-gray-500 mt-1 max-w-xs truncate">{brandingFile?.name}</p>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              removeFile(setBrandingFile, setBrandingPreview, brandingPreview);
                            }}
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
                          >
                            <X size={20} className="text-gray-700" />
                          </button>
                          <div className="absolute bottom-5 left-5 text-white">
                            <p className="text-sm font-medium truncate max-w-md">{brandingFile?.name}</p>
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition">
                          <UploadCloud size={48} className="text-gray-400 mb-4" />
                          <p className="text-lg font-medium text-gray-700">Drop your logo & branding here</p>
                          <p className="text-sm text-gray-500 mt-2">PNG, JPG, PDF • Max 10MB</p>
                        </div>
                      )}
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".png,.jpg,.jpeg,.pdf"
                        onChange={(e) =>
                          handleFileChange(e.target.files?.[0] || null, setBrandingFile, setBrandingPreview, brandingPreview)
                        }
                      />
                    </label>
                  </div>
                </div>

                {/* Investment Objectives */}
                <div ref={investmentObjectivesRef} data-section="Investment Objectives">
                  <h2 className="text-xl font-semibold text-gray-800 mb-8">Investment Objectives</h2>
                  <div className="space-y-6">
                    <div className="relative">
                      <p className="text-sm font-medium text-gray-700 mb-3">What are your specific objectives?</p>
                      <div
                        className={`w-full text-sm rounded-xl px-5 py-4 flex justify-between items-center cursor-pointer transition-all border ${objectiveOpen ? "border-[#1ECEC9] bg-white shadow-md" : "border-gray-300 hover:bg-gray-50"
                          }`}
                        onClick={() => setObjectiveOpen(!objectiveOpen)}
                      >
                        <span className={selectedObjective === "Select" ? "text-gray-500" : "text-gray-800"}>
                          {selectedObjective}
                        </span>
                        {objectiveOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                      <AnimatePresence>
                        {objectiveOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 border border-gray-200 rounded-xl bg-white shadow-lg z-20 overflow-hidden"
                          >
                            {objectives.map((item) => (
                              <div
                                key={item}
                                onClick={() => {
                                  setSelectedObjective(item);
                                  setObjectiveOpen(false);
                                }}
                                className="px-5 py-3 text-sm hover:bg-gray-50 cursor-pointer transition"
                              >
                                {item}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        Do you have any sector or geographic preferences for investments?
                      </p>
                      <input
                        type="text"
                        value={sectorPreferences}
                        onChange={(e) => setSectorPreferences(e.target.value)}
                        placeholder="e.g. Renewable energy in East Africa"
                        className="w-full text-sm border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:border-[#1ECEC9] transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Risk Appetite */}
                <div ref={riskAppetiteRef} data-section="Risk Appetite">
                  <h2 className="text-xl font-semibold text-gray-800 mb-8">Risk Appetite</h2>
                  <div className="space-y-8">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-4">What is your risk tolerance?</p>
                      <div className="flex gap-4">
                        {["low", "medium", "high"].map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setRiskTolerance(riskTolerance === level ? null : level as any)}
                            className={`px-8 py-4 rounded-xl border-2 text-sm font-medium capitalize transition-all ${riskTolerance === level
                              ? level === "low"
                                ? "bg-green-50 border-green-500 text-green-700"
                                : level === "medium"
                                  ? "bg-yellow-50 border-yellow-500 text-yellow-700"
                                  : "bg-red-50 border-red-500 text-red-700"
                              : "border-gray-300 hover:bg-gray-50"
                              }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-4">
                        Open to emerging green technologies?
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setExploreEmerging(exploreEmerging === true ? null : true)}
                          className={`px-8 py-4 rounded-xl border-2 text-sm font-medium ${exploreEmerging === true
                            ? "bg-green-50 border-green-500 text-green-700"
                            : "border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setExploreEmerging(exploreEmerging === false ? null : false)}
                          className={`px-8 py-4 rounded-xl border-2 text-sm font-medium ${exploreEmerging === false
                            ? "bg-red-50 border-red-500 text-red-700"
                            : "border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div ref={performanceMetricsRef} data-section="Performance Metrics">
                  <h2 className="text-xl font-semibold text-gray-800 mb-8">Performance Metrics</h2>
                  <div className="space-y-8">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-4">
                        Do you currently measure green portfolio performance?
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setMeasurePerformance(measurePerformance === true ? null : true)}
                          className={`px-8 py-4 rounded-xl border-2 text-sm font-medium ${measurePerformance === true
                            ? "bg-green-50 border-green-500 text-green-700"
                            : "border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setMeasurePerformance(measurePerformance === false ? null : false)}
                          className={`px-8 py-4 rounded-xl border-2 text-sm font-medium ${measurePerformance === false
                            ? "bg-red-50 border-red-500 text-red-700"
                            : "border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                    {measurePerformance === true && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">If yes, please explain</p>
                        <textarea
                          value={performanceExplanation}
                          onChange={(e) => setPerformanceExplanation(e.target.value)}
                          className="w-full h-32 text-sm border border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:border-[#1ECEC9]"
                          placeholder="Describe your current measurement approach..."
                        />
                      </div>
                    )}
                    <div className="relative">
                      <p className="text-sm font-medium text-gray-700 mb-3">Key Performance Indicators (KPIs)</p>
                      <div
                        className={`w-full text-sm rounded-xl px-5 py-4 flex justify-between items-center cursor-pointer transition-all border ${kpiDropdownOpen ? "border-[#1ECEC9] bg-white shadow-md" : "border-gray-300 hover:bg-gray-50"
                          }`}
                        onClick={() => setKpiDropdownOpen(!kpiDropdownOpen)}
                      >
                        <span className={selectedKpi ? "text-gray-800" : "text-gray-500"}>
                          {selectedKpi || "Select KPI"}
                        </span>
                        {kpiDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                      <AnimatePresence>
                        {kpiDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 border border-gray-200 rounded-xl bg-white shadow-lg z-20"
                          >
                            {kpis.map((kpi) => (
                              <div
                                key={kpi}
                                onClick={() => {
                                  setSelectedKpi(kpi);
                                  setKpiDropdownOpen(false);
                                }}
                                className="px-5 py-3 text-sm hover:bg-gray-50 cursor-pointer"
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

                {/* Stakeholder Engagement */}
                <div ref={stakeholderEngagementRef} data-section="Stakeholder Engagement">
                  <h2 className="text-xl font-semibold text-gray-800 mb-8">Stakeholder Engagement</h2>
                  <div className="space-y-8">
                    <div className="relative">
                      <p className="text-sm font-medium text-gray-700 mb-3">Key stakeholders involved?</p>
                      <div
                        className={`w-full text-sm rounded-xl px-5 py-4 flex justify-between items-center cursor-pointer transition-all border ${stakeholderDropdownOpen1 ? "border-[#1ECEC9] bg-white shadow-md" : "border-gray-300 hover:bg-gray-50"
                          }`}
                        onClick={() => setStakeholderDropdownOpen1(!stakeholderDropdownOpen1)}
                      >
                        <span className={selectedStakeholder1 ? "text-gray-800" : "text-gray-500"}>
                          {selectedStakeholder1 || "Select Stakeholder"}
                        </span>
                        {stakeholderDropdownOpen1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                      <AnimatePresence>
                        {stakeholderDropdownOpen1 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 border border-gray-200 rounded-xl bg-white shadow-lg z-20"
                          >
                            {stakeholders1.map((s) => (
                              <div
                                key={s}
                                onClick={() => {
                                  setSelectedStakeholder1(s);
                                  setStakeholderDropdownOpen1(false);
                                }}
                                className="px-5 py-3 text-sm hover:bg-gray-50 cursor-pointer"
                              >
                                {s}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="relative">
                      <p className="text-sm font-medium text-gray-700 mb-3">Stakeholder preferences?</p>
                      <div
                        className={`w-full text-sm rounded-xl px-5 py-4 flex justify-between items-center cursor-pointer transition-all border ${stakeholderDropdownOpen2 ? "border-[#1ECEC9] bg-white shadow-md" : "border-gray-300 hover:bg-gray-50"
                          }`}
                        onClick={() => setStakeholderDropdownOpen2(!stakeholderDropdownOpen2)}
                      >
                        <span className={selectedStakeholder2 ? "text-gray-800" : "text-gray-500"}>
                          {selectedStakeholder2 || "Select Preference"}
                        </span>
                        {stakeholderDropdownOpen2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                      <AnimatePresence>
                        {stakeholderDropdownOpen2 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 border border-gray-200 rounded-xl bg-white shadow-lg z-20"
                          >
                            {stakeholders2.map((s) => (
                              <div
                                key={s}
                                onClick={() => {
                                  setSelectedStakeholder2(s);
                                  setStakeholderDropdownOpen2(false);
                                }}
                                className="px-5 py-3 text-sm hover:bg-gray-50 cursor-pointer"
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

                {/* Regulatory Compliance */}
                <div ref={regulatoryComplianceRef} data-section="Regulatory Compliance">
                  <h2 className="text-xl font-semibold text-gray-800 mb-8">Regulatory Compliance</h2>
                  <div className="space-y-8">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-4">Are there regulatory requirements?</p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setRegulatoryCompliance(regulatoryCompliance === true ? null : true)}
                          className={`px-8 py-4 rounded-xl border-2 text-sm font-medium ${regulatoryCompliance === true
                            ? "bg-green-50 border-green-500 text-green-700"
                            : "border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setRegulatoryCompliance(regulatoryCompliance === false ? null : false)}
                          className={`px-8 py-4 rounded-xl border-2 text-sm font-medium ${regulatoryCompliance === false
                            ? "bg-red-50 border-red-500 text-red-700"
                            : "border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                    {regulatoryCompliance === true && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {regulationsList.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => toggleRegulation(r)}
                            className={`px-6 py-4 rounded-xl border-2 text-sm text-left transition-all ${selectedRegulations.includes(r)
                              ? "bg-green-50 border-green-500 text-green-700"
                              : "border-gray-300 hover:bg-gray-50"
                              }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="relative">
                      <p className="text-sm font-medium text-gray-700 mb-3">Sustainability standards followed?</p>
                      <div
                        className={`w-full text-sm rounded-xl px-5 py-4 flex justify-between items-center cursor-pointer transition-all border ${standardsDropdownOpen ? "border-[#1ECEC9] bg-white shadow-md" : "border-gray-300 hover:bg-gray-50"
                          }`}
                        onClick={() => setStandardsDropdownOpen(!standardsDropdownOpen)}
                      >
                        <span className={selectedStandard ? "text-gray-800" : "text-gray-500"}>
                          {selectedStandard || "Select Standard"}
                        </span>
                        {standardsDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                      <AnimatePresence>
                        {standardsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 border border-gray-200 rounded-xl bg-white shadow-lg z-20"
                          >
                            {standards.map((s) => (
                              <div
                                key={s}
                                onClick={() => {
                                  setSelectedStandard(s);
                                  setStandardsDropdownOpen(false);
                                }}
                                className="px-5 py-3 text-sm hover:bg-gray-50 cursor-pointer"
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

                {/* Partnership Opportunities */}
                <div ref={partnershipOpportunitiesRef} data-section="Partnership Opportunities">
                  <h2 className="text-xl font-semibold text-gray-800 mb-8">Partnership Opportunities</h2>
                  <div className="space-y-8">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-4">Open to partnerships?</p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setPartnershipOpportunities(partnershipOpportunities === true ? null : true)}
                          className={`px-8 py-4 rounded-xl border-2 text-sm font-medium ${partnershipOpportunities === true
                            ? "bg-green-50 border-green-500 text-green-700"
                            : "border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setPartnershipOpportunities(partnershipOpportunities === false ? null : false)}
                          className={`px-8 py-4 rounded-xl border-2 text-sm font-medium ${partnershipOpportunities === false
                            ? "bg-red-50 border-red-500 text-red-700"
                            : "border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                    {partnershipOpportunities === true && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {partnershipsList.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => togglePartnership(p)}
                            className={`px-6 py-4 rounded-xl border-2 text-sm text-left transition-all ${selectedPartnerships.includes(p)
                              ? "bg-green-50 border-green-500 text-green-700"
                              : "border-gray-300 hover:bg-gray-50"
                              }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-12 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`bg-[#044D5E] text-white px-12 py-5 rounded-full flex items-center gap-3 text-lg font-semibold transition-all shadow-xl hover:shadow-2xl ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#044D5E]/90"
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        Completing...
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <ChevronRight size={24} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Help */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white text-sm text-gray-700 px-4 py-2 rounded-full shadow-2xl mb-3 animate-pulse">
          Need help?
        </div>
        <button className="bg-white shadow-2xl border border-gray-200 rounded-full p-4 hover:scale-110 transition">
          <Image src={message_circle_more} alt="Help" width={28} height={28} />
        </button>
      </div>
    </div>
  );
};

export default Page;