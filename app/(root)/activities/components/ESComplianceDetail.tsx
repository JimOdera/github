import Header from "@/app/components/Header";
import ApexRadialChart from "@/app/components/ApexRadialChart";
import { message_circle_more } from "@/public";
import Image from "next/image";
import { CheckCircle2, Download, FileText } from "lucide-react";

export default function ESComplianceDetail() {
    // E&S Compliance metrics
    const complianceMetrics = [
        { label: "License Validity", value: "Active", status: "active" },
        { label: "Non-compliant incidents", value: "None", status: "none" },
        { label: "Compliance Checks", value: "Passed", status: "passed" },
        { label: "Legal Compliance", value: "ISO 14001", status: "certified" },
    ];

    // Aligned SDGs
    const alignedSDGs = [
        { name: "Zero Hunger", color: "#DDA63A" },
        { name: "Climate Action", color: "#4C9F38" },
    ];

    const uploadedFiles = [
        { name: "License/Permits.pdf", size: "2.5mb", type: "pdf" },
        { name: "CorrectiveActionPlanV3.doc", size: "1.8mb", type: "doc" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col space-y-6 pb-12">
            {/* Top Navigation */}
            <Header />

            <main className="w-full sm:w-[95vw] lg:w-[90vw] xl:w-[85vw] mx-auto bg-[#FBFDFB] rounded-lg overflow-hidden pt-16">
                {/* Hero Section */}
                <section className="relative w-full h-auto min-h-[200px] sm:h-48 md:h-56 lg:h-64 bg-cover bg-center">
                    <Image
                        src="/images/activities/section2.png"
                        alt="Aerial view of green forest landscape representing environmental sustainability"
                        fill
                        className="object-cover opacity-70"
                        priority
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end pb-4 sm:pb-6 md:pb-10 px-4 sm:px-6 md:px-8">
                        <div className="mb-2">
                            <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight">
                                E&S Compliance Overview
                            </h1>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            {/* Tags + Chart */}
                            <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-3 lg:gap-0 lg:mr-8">
                                {/* Left: Tags */}
                                <div className="-mt-2 flex flex-col gap-2 w-full lg:w-auto">
                                    <div className="w-full h-px bg-gray-300" />

                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs">
                                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                            <span className="text-gray-700">Unit/Group:</span>
                                            <span className="font-semibold text-gray-900">
                                                Operational & Environmental
                                            </span>
                                        </div>

                                        <div className="hidden md:block w-px h-4 bg-gray-300" />

                                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                            <span className="text-gray-700">Stakeholder Group:</span>
                                            <span className="font-semibold text-gray-900">
                                                Regulator (e.g., CBK, CIMA, TISB)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Chart + Button */}
                                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                    {/* Radial Chart */}
                                    <div
                                        className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0"
                                        role="img"
                                        aria-label="Progress indicator showing 25% completion"
                                    >
                                        <ApexRadialChart percentage={25} size={80} />
                                    </div>

                                    {/* Update Activity Button */}
                                    <button
                                        className="bg-[#4FC3F7] text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-md text-xs font-medium hover:bg-[#00ACC1] transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2"
                                        aria-label="Update E&S compliance activity"
                                    >
                                        Update Activity
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <div className="space-y-8 py-8 px-4 sm:px-6 md:px-8 lg:px-10">
                    {/* E&S Compliance Status Banner */}
                    <section aria-labelledby="status-heading">
                        <div className="bg-[#E5F5E4] rounded-lg p-5 sm:p-6 md:p-7 border border-green-200">
                            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4 md:gap-6">
                                <div className="flex-1 max-w-3xl">
                                    <h2 id="status-heading" className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3">
                                        E&S Compliance Status
                                    </h2>
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                        All policies are in place and recent assessment has been conducted. No grievances or remediation actions pending.
                                    </p>
                                </div>

                                <div
                                    className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium flex-shrink-0"
                                    role="status"
                                    aria-label="Verification status: Verified"
                                >
                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span>Verified</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* E&S Compliance Status Metrics */}
                    <section aria-labelledby="metrics-heading" className="pt-2">
                        <h2 id="metrics-heading" className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-5">
                            E&S Compliance Status
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                            {complianceMetrics.map((metric, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg p-5 sm:p-6 md:p-7 border border-gray-200 hover:shadow-md transition-shadow"
                                >
                                    <p className="text-[10px] sm:text-xs text-gray-600 mb-3">{metric.label}</p>
                                    <p className="text-base sm:text-lg md:text-xl font-bold text-[#627C19]">
                                        {metric.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Aligned SDGs */}
                    <section aria-labelledby="sdgs-heading" className="pt-2">
                        <h2 id="sdgs-heading" className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-5">
                            Aligned SDGs
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            {alignedSDGs.map((sdg, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 text-[10px] sm:text-xs font-medium text-white"
                                    style={{ backgroundColor: sdg.color }}
                                >
                                    {sdg.name}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Uploaded Materials */}
                    <section aria-labelledby="materials-heading" className="pt-2">
                        <div className="mb-5">
                            <h2 id="materials-heading" className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-2">
                                Uploaded materials
                            </h2>
                            <p className="text-[10px] sm:text-xs text-gray-600">Corrective action plans (CRPs)</p>
                        </div>

                        <div className="space-y-3">
                            {uploadedFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                                            file.type === "pdf" ? "bg-red-50" : "bg-blue-50"
                                        }`}>
                                            <FileText className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                                                file.type === "pdf" ? "text-red-500" : "text-blue-500"
                                            }`} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] sm:text-xs font-medium text-gray-900 mb-0.5">
                                                {file.name}
                                            </p>
                                            <p className="text-[9px] sm:text-[10px] text-gray-500">{file.size}</p>
                                        </div>
                                    </div>

                                    <button
                                        className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] font-medium hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                        aria-label={`Download ${file.name}`}
                                    >
                                        <Download className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        <span>Download</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {/* Help Button */}
            <div className="fixed bottom-4 sm:bottom-5 right-4 sm:right-5 flex flex-col items-center z-50">
                <div
                    className="bg-white text-xs text-gray-700 px-3 py-1.5 rounded-lg shadow-md mb-2 relative cursor-pointer hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2"
                    tabIndex={0}
                    role="tooltip"
                >
                    need help?
                    <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                </div>

                <button
                    className="bg-white shadow-md border border-gray-200 rounded-full p-3 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2"
                    aria-label="Open help chat assistant"
                >
                    <Image src={message_circle_more} alt="Chat icon" className="w-5 h-5" width={20} height={20} />
                </button>
            </div>
        </div>
    );
}