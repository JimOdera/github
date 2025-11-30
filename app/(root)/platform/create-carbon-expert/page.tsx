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
  const [activeSection, setActiveSection] = useState<string>(
    "Project Description"
  );

  // Dropdown states
  const [specializationOpen, setSpecializationOpen] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    "Select Specialization"
  );

  const [sectorExpertiseOpen, setSectorExpertiseOpen] = useState(false);
  const [selectedSectorExpertise, setSelectedSectorExpertise] =
    useState("Select Sector");

  const [roleOpen, setRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Select Role");

  // Yes/No button states
  const [workedWithStakeholders, setWorkedWithStakeholders] = useState<
    boolean | null
  >(null);
  const [providedAdvisory, setProvidedAdvisory] = useState<boolean | null>(
    null
  );

  // Multi-select features
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const toggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  // Refs for smooth scrolling
  const projectDescriptionRef = useRef<HTMLDivElement>(null);
  const industryExperienceRef = useRef<HTMLDivElement>(null);
  const areaOfExpertiseRef = useRef<HTMLDivElement>(null);
  const projectSupportRef = useRef<HTMLDivElement>(null);
  const platformUtilizationRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(
    () => ({
      "Project Description": projectDescriptionRef,
      "Industry Experience": industryExperienceRef,
      "Area of Expertise": areaOfExpertiseRef,
      "Project Support": projectSupportRef,
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

  // Dropdown options
  const specializations = [
    "Carbon Credit Project Development",
    "Verification & Validation (VVB)",
    "Carbon Accounting & MRV",
    "Carbon Market Regulation & Policy",
    "Voluntary vs Compliance Markets",
    "Article 6 & International Carbon Trading",
    "Nature-Based Solutions (NBS)",
    "Carbon Removal Technologies",
    "REDD+ and Forest Carbon",
  ];

  const sectors = [
    "Renewable Energy",
    "Energy Efficiency",
    "Agriculture, Forestry & Land Use (AFOLU)",
    "Industrial Processes (e.g., cement, steel)",
    "Waste Management",
    "Blue Carbon (mangroves, seagrass)",
    "Transportation",
    "Household & Community Projects",
  ];

  const roles = [
    "Project Developer",
    "Technical Consultant / Advisor",
    "Verifier (DOEV/VVB)",
    "Carbon Standards Expert (VCS, Gold Standard, etc.)",
    "Registry & Methodology Specialist",
    "Investor Due Diligence Expert",
    "Policy & Regulatory Advisor",
    "Broker / Trader",
    "Training & Capacity Building",
  ];

  const platformFeatures = [
    "Real-time ESG performance tracking",
    "Impact investment analytics dashboard",
    "Automated regulatory compliance checks",
    "Secure document and data management system",
    "Project pipeline & matchmaking tools",
    "Carbon credit registry integration",
    "Methodology & standard updates feed",
    "Stakeholder messaging & collaboration hub",
  ];

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
        <main className="flex-grow w-full md:w-[80vw] mx-auto p-2 md:px-6 md:py-4">
          <div className="bg-white rounded-sm md:rounded-2xl shadow-md py-2 px-2 md:py-8 md:px-24 space-y-12">
            <div className="flex flex-col gap-2 mb-8">
              <div className="w-fit text-sm text-[#1ECEC9] font-semibold mb-2">
                Create an account
              </div>
              <div className="space-y-2">
                <h1 className="text-xl text-[#044D5E] font-semibold">
                  Register as a Carbon Expert
                </h1>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Are you an individual with specialized knowledge and
                  experience in various aspects of carbon emissions trading,
                  carbon finance, and climate change mitigation strategies? Do
                  you have experience in project development, verification and
                  certification, and stakeholder engagement? Joining our
                  platform enables you to connect with a diverse community of
                  stakeholders, collaborate on innovative projects, and stay at
                  the forefront of developments in the carbon market landscape.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              {/* Sidebar Navigation */}
              <div className="w-72 hidden md:flex flex-col gap-2 sticky top-17 self-start">
                <div className="flex flex-col gap-1">
                  {[
                    { name: "Project Description", icon: Pencil },
                    { name: "Industry Experience", icon: UserRound },
                    { name: "Area of Expertise", icon: CreditCard },
                    { name: "Project Support", icon: Bell },
                    { name: "Platform Utilization", icon: Bell },
                  ].map(({ name, icon: Icon }) => (
                    <div
                      key={name}
                      onClick={() => handleNavClick(name)}
                      className={`flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                        activeSection === name
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

              {/* Form */}
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
                        Can you provide a summary of your experience and
                        expertise in the carbon market and related fields?
                      </p>
                      <textarea
                        className="w-full h-32 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="Briefly describe your background, years of experience, key achievements..."
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-2 font-medium">
                        Upload your CV / Portfolio / Credentials (optional)
                      </p>
                      <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex flex-col items-center">
                          <UploadCloud className="w-6 h-6 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            PDF, DOC, up to 10MB
                          </span>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                        />
                      </label>
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-2 font-medium">
                        What specific areas of carbon finance or emissions
                        trading do you specialize in?
                      </p>
                      <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., REDD+, Gold Standard methodology, Article 6 mechanisms..."
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* 2. Industry Experience */}
                <div
                  ref={industryExperienceRef}
                  data-section="Industry Experience"
                >
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Industry Experience
                  </h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Have you worked with a diverse range of stakeholders,
                        such as governments, businesses, investors, or NGOs, in
                        the carbon market?
                      </p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setWorkedWithStakeholders(true)}
                          className={`px-6 py-2 rounded-lg border text-xs font-medium ${
                            workedWithStakeholders === true
                              ? "bg-green-100 border-green-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setWorkedWithStakeholders(false)}
                          className={`px-6 py-2 rounded-lg border text-xs font-medium ${
                            workedWithStakeholders === false
                              ? "bg-red-100 border-red-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-2 font-medium">
                        Can you share examples of projects or initiatives you
                        have been involved in within the carbon market?
                      </p>
                      <textarea
                        className="w-full h-32 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="List 2–3 notable projects (e.g., 50MW solar VER project in Kenya, Cookstove program in Indonesia...)"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* 3. Area of Expertise */}
                <div ref={areaOfExpertiseRef} data-section="Area of Expertise">
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Area of Expertise
                  </h1>
                  <div className="space-y-6">
                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">
                        What aspects of the carbon market are you particularly
                        knowledgeable about?
                      </p>
                      <div
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                          specializationOpen
                            ? "border border-gray-400 bg-white shadow-sm"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() =>
                          setSpecializationOpen(!specializationOpen)
                        }
                      >
                        <span className="text-gray-600">
                          {selectedSpecialization}
                        </span>
                        {specializationOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <AnimatePresence>
                        {specializationOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10 max-h-60 overflow-y-auto"
                          >
                            {specializations.map((item) => (
                              <div
                                key={item}
                                onClick={() => {
                                  setSelectedSpecialization(item);
                                  setSpecializationOpen(false);
                                }}
                                className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {item}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">
                        Are there specific sectors or industries within the
                        carbon market where you have deep expertise?
                      </p>
                      <div
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                          sectorExpertiseOpen
                            ? "border border-gray-400 bg-white shadow-sm"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() =>
                          setSectorExpertiseOpen(!sectorExpertiseOpen)
                        }
                      >
                        <span className="text-gray-600">
                          {selectedSectorExpertise}
                        </span>
                        {sectorExpertiseOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <AnimatePresence>
                        {sectorExpertiseOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10 max-h-60 overflow-y-auto"
                          >
                            {sectors.map((item) => (
                              <div
                                key={item}
                                onClick={() => {
                                  setSelectedSectorExpertise(item);
                                  setSectorExpertiseOpen(false);
                                }}
                                className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {item}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* 4. Project Support */}
                <div ref={projectSupportRef} data-section="Project Support">
                  <h1 className="text-lg font-medium text-gray-600 mb-6">
                    Project Support
                  </h1>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-700 mb-2">
                        Have you provided advisory services or technical
                        assistance to carbon projects seeking financing or
                        certification?
                      </p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setProvidedAdvisory(true)}
                          className={`px-6 py-2 rounded-lg border text-xs font-medium ${
                            providedAdvisory === true
                              ? "bg-green-100 border-green-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setProvidedAdvisory(false)}
                          className={`px-6 py-2 rounded-lg border text-xs font-medium ${
                            providedAdvisory === false
                              ? "bg-red-100 border-red-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <p className="text-xs text-gray-700 mb-1">
                        What role do you typically play in supporting carbon
                        projects or market participants?
                      </p>
                      <div
                        className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                          roleOpen
                            ? "border border-gray-400 bg-white shadow-sm"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => setRoleOpen(!roleOpen)}
                      >
                        <span className="text-gray-600">{selectedRole}</span>
                        {roleOpen ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                      <AnimatePresence>
                        {roleOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-10 max-h-60 overflow-y-auto"
                          >
                            {roles.map((item) => (
                              <div
                                key={item}
                                onClick={() => {
                                  setSelectedRole(item);
                                  setRoleOpen(false);
                                }}
                                className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer"
                              >
                                {item}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <p className="text-xs text-gray-700 mb-2 font-medium">
                        Can you provide examples of successful collaborations or
                        partnerships you have facilitated in the carbon market?
                      </p>
                      <textarea
                        className="w-full h-28 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="Brief examples (optional)"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* 5. Platform Utilization */}
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
                        What are your expectations for using our platform to
                        connect with other stakeholders and access resources
                        within the carbon market?
                      </p>
                      <textarea
                        className="w-full h-28 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., Find new clients, collaborate on methodologies, stay updated on policy changes..."
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-700 mb-2 font-medium">
                        Are there specific features or functionalities you would
                        like to see on the platform to support your work as a
                        carbon expert?
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {platformFeatures.map((feat) => (
                          <button
                            key={feat}
                            type="button"
                            onClick={() => toggleFeature(feat)}
                            className={`px-4 py-2 rounded-lg border text-xs text-left transition ${
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

      {/* Floating Help Button */}
      <div className="fixed bottom-5 right-5 flex flex-col items-center">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
          need help?
          <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></span>
        </div>
        <button className="bg-white shadow-md border border-gray-200 rounded-full p-3 flex items-center justify-center cursor-pointer transition-all duration-300">
          <Image src={message_circle_more} alt="Help" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Page;
