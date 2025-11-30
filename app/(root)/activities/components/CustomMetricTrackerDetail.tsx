import Header from "@/app/components/Header";
import ApexRadialChart from "@/app/components/ApexRadialChart";
import { message_circle_more } from "@/public";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function CustomMetricTrackerDetail() {
    // Aligned SDGs
    const alignedSDGs = [
        { name: "Zero Hunger", color: "#DDA63A" },
        { name: "Climate Action", color: "#4C9F38" },
    ];

    // Metric values
    const metricValues = [
        { label: "Total Value", value: "31,500" },
        { label: "Total Targets", value: "38,000" },
    ];

    // Sources/Notes
    const sources = [
        "Data from monthly utility bills Jan-Mar 2025",
        "Facility water meter readings",
        "Based on staff travel logs and fuel data",
    ];

    // All Custom Metrics table data
    const customMetrics = [
        {
            name: "Energy Consumption (kLH)",
            value: "12,600",
            target: "10,000",
            source: "Data from monthly utility bills, Jan-Mar 2025",
        },
        {
            name: "Water Usage (litres)",
            value: "8,200",
            target: "7,500",
            source: "Facility water meter readings",
        },
        {
            name: "Employee Commute Emissions (kg CO2)",
            value: "4,700",
            target: "3,500",
            source: "Based on staff travel logs and fuel data",
        },
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
                            <h1 className="mt-8 text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight">
                                Custom Metric tracker Overview
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
                                        aria-label="Progress indicator showing 23% completion"
                                    >
                                        <ApexRadialChart percentage={23} size={80} />
                                    </div>
                                    <button
                                        className="bg-[#4FC3F7] text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-md text-xs font-medium hover:bg-[#00ACC1] transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2"
                                        aria-label="Update custom metric activity"
                                    >
                                        Update Activity
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <div className="space-y-6 py-6 px-4 sm:px-6 md:px-8">
                    {/* Metric Targets Status */}
                    <section aria-labelledby="status-heading">
                        <div className="bg-[#E5F5E4] rounded-lg p-4 sm:p-5 md:p-6 border border-green-200">
                            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-3 md:gap-4">
                                <div className="flex-1 max-w-3xl">
                                    <h2 id="status-heading" className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-2">
                                        Metric Targets Status
                                    </h2>
                                    <p className="text-xs text-gray-700 leading-relaxed">
                                        Targets for this custom metric has been achieved and exceeded.
                                    </p>
                                </div>

                                <div
                                    className="flex items-center gap-1.5 bg-emerald-500 text-white px-4 py-2 rounded-md text-xs font-medium flex-shrink-0"
                                    role="status"
                                    aria-label="Status: On Track"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>On Track</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Aligned SDGs */}
                    <section aria-labelledby="sdgs-heading">
                        <h2 id="sdgs-heading" className="text-sm md:text-base font-bold text-gray-900 mb-4">
                            Aligned SDGs
                        </h2>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {alignedSDGs.map((sdg, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 text-xs font-medium text-white"
                                    style={{ backgroundColor: sdg.color }}
                                >
                                    {sdg.name}
                                </span>
                            ))}
                        </div>

                        {/* Metric Values */}
                        <div className="flex flex-wrap gap-4">
                            {metricValues.map((metric, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg p-4 sm:p-5 md:p-6 border border-gray-200 inline-block"
                                >
                                    <p className="text-xs text-gray-600 mb-2 whitespace-nowrap">{metric.label}</p>
                                    <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#627C19]">
                                        {metric.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sources/Notes */}
                    <section aria-labelledby="sources-heading">
                        <h2 id="sources-heading" className="text-sm md:text-base font-bold text-[#004D40] mb-4">
                            Sources/Notes
                        </h2>

                        <ul className="space-y-2" role="list">
                            {sources.map((source, index) => (
                                <li key={index} className="flex items-start gap-2" role="listitem">
                                    <div
                                        className="w-4 h-4 bg-[#E1F5FE] rounded grid place-items-center flex-shrink-0"
                                        aria-hidden="true"
                                    >
                                        <div className="w-1 h-1 bg-[#4FC3F7] rounded-full" />
                                    </div>
                                    <span className="text-xs text-gray-700">{source}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* All Custom Metrics Table */}
                    <section aria-labelledby="metrics-heading">
                        <h2 id="metrics-heading" className="text-sm md:text-base font-bold text-[#004D40] mb-4">
                            All Custom Metrics
                        </h2>

                        <div className="bg-white rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-gray-700">
                                                Metric Name
                                            </th>
                                            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-gray-700">
                                                Value
                                            </th>
                                            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-gray-700">
                                                Target
                                            </th>
                                            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-gray-700">
                                                Source/Notes
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {customMetrics.map((metric, index) => (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs text-gray-900">
                                                    {metric.name}
                                                </td>
                                                <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs font-medium text-gray-900">
                                                    {metric.value}
                                                </td>
                                                <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs text-gray-900">
                                                    {metric.target}
                                                </td>
                                                <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs text-gray-600">
                                                    {metric.source}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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