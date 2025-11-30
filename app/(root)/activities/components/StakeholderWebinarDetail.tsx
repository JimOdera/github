
import Header from '@/app/components/Header';
import ApexRadialChart from '@/app/components/ApexRadialChart';
import { message_circle_more } from '@/public';
import Image from 'next/image';
import { CheckCircle2, Layers } from 'lucide-react';

export default function StakeholderWebinarDetail() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col space-y-6">

            {/* Top Navigation */}
            <Header />

            <main className="w-full sm:w-[95vw] lg:w-[90vw] xl:w-[85vw] mx-auto bg-[#FBFDFB] rounded-lg overflow-hidden pt-16">

                {/* Hero Section */}
                <section className="relative w-full h-auto min-h-[200px] sm:h-64 md:h-72 lg:h-80 bg-cover bg-center">
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
                            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                                Stakeholder Interaction Summary
                            </h1>
                        </div>

                        <div className="space-y-2 sm:space-y-3">

                            {/* Tags + Chart */}
                            <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-4 lg:gap-0 lg:mr-8">

                                {/* Left: Tags */}
                                <div className="flex flex-col gap-2 w-full lg:w-auto">

                                    <div className="w-full h-px bg-gray-300" role="separator" aria-hidden="true" />

                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs">

                                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                            <span className="text-gray-700">Unit/Group:</span>
                                            <span className="font-semibold text-gray-900">
                                                Operational & Environmental
                                            </span>
                                        </div>

                                        <div className="hidden md:block w-px h-4 bg-gray-300" role="separator" aria-hidden="true" />

                                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                            <span className="text-gray-700">Stakeholder:</span>
                                            <span className="font-semibold text-gray-900">
                                                Regulator (e.g., CBK, CIMA, NSE)
                                            </span>
                                        </div>

                                    </div>
                                </div>

                                {/* Right: Chart + Button */}
                                <div className="flex items-center gap-2 flex-shrink-0">

                                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" role="img" aria-label="Progress indicator showing 25% completion">
                                        <ApexRadialChart percentage={25} size={66} />
                                    </div>

                                    <button
                                        className="bg-[#4FC3F7] text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-md text-xs font-medium hover:bg-[#00ACC1] transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2"
                                        aria-label="Update stakeholder engagement activities"
                                    >
                                        Update Activities
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <div className="space-y-6 py-6">

                    {/* Status */}
                    <section className="px-4 sm:px-6 md:px-8" aria-labelledby="status-heading">
                        <div className="bg-[#E5F5E4] rounded-lg p-4 sm:p-5 md:p-6 border border-green-200">

                            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-3 md:gap-4">

                                <div className="flex-1 max-w-3xl">
                                    <h2 id="status-heading" className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-2">
                                        Stakeholder Engagement Status
                                    </h2>
                                    <p className="text-xs text-gray-700 leading-relaxed">
                                        Stakeholder engagement activities are on track, with all issues addressed through town halls, ESG forums, grievance mechanisms, and surveys.
                                    </p>
                                </div>

                                <div className="flex items-center gap-1.5  bg-[#4ABEA6] text-white px-4 py-2 rounded-md text-xs font-medium flex-shrink-0" role="status" aria-label="Verification status: Verified">
                                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                                    <span>Verified</span>
                                </div>

                            </div>

                        </div>
                    </section>

                    {/* Grid */}
                    <section className="px-4 sm:px-6 md:px-8" aria-labelledby="images-heading">
                        <div className="bg-[#FFF8E1] rounded-lg p-3">

                            <div className="grid grid-cols-3 grid-rows-2 gap-1 sm:gap-2 h-[240px] sm:h-[280px] md:h-[340px]">

                                <div className="row-span-2 relative">
                                    <Image 
                                        src="/images/detail/detail1.png" 
                                        alt="Stakeholder engagement outdoor gathering" 
                                        fill 
                                        className="object-cover rounded-lg"
                                        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 30vw, 25vw"
                                    />
                                </div>

                                <div className="relative">
                                    <Image 
                                        src="/images/detail/detail2.png" 
                                        alt="Team meeting discussion" 
                                        fill 
                                        className="object-cover rounded-lg"
                                        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 30vw, 25vw"
                                    />
                                </div>

                                <div className="row-span-2 relative">
                                    <Image 
                                        src="/images/detail/detail4.png" 
                                        alt="Community stakeholder group photo" 
                                        fill 
                                        className="object-cover rounded-lg"
                                        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 30vw, 25vw"
                                    />

                                    <div className="absolute bottom-2 right-2 bg-white text-gray-800 px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 shadow-sm">
                                        <Layers className="w-3 h-3" aria-hidden="true" />
                                        <span>Show 12</span>
                                    </div>
                                </div>

                                <div className="relative">
                                    <Image 
                                        src="/images/detail/detail3.png" 
                                        alt="Engagement session participants" 
                                        fill 
                                        className="object-cover rounded-lg"
                                        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 30vw, 25vw"
                                    />
                                </div>

                            </div>

                            {/* SDGs */}
                            <div className="mt-6 pb-6">
                                <div className="space-y-3">
                                    <h2 id="images-heading" className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                                        Aligned SDGs
                                    </h2>

                                    <div className="flex flex-wrap items-center gap-2" role="list">
                                        <span className="bg-[#f9a825] text-white px-3 py-1.5 text-xs font-semibold" role="listitem">
                                            Zero Hunger
                                        </span>
                                        <span className="bg-[#4caf50] text-white px-3 py-1.5 text-xs font-semibold" role="listitem">
                                            Climate Action
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Stakeholder Engagement Section */}
                    <section className="px-4 sm:px-6 md:px-8" aria-labelledby="engagement-heading">
                        <div className="space-y-4">

                            <div>
                                <h2 id="engagement-heading" className="text-sm sm:text-base md:text-lg font-bold text-[#333333] mb-1">
                                    Stakeholder Engagement
                                </h2>
                                <p className="text-xs text-[#757575]">
                                    Latest stakeholder interaction and resolutions
                                </p>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">

                                {/* Stakeholders */}
                                <div className="flex-1 border border-[#E0E0E0] rounded-lg p-4">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-7 h-7 bg-[#E1F5FE] rounded grid place-items-center flex-shrink-0" aria-hidden="true">
                                            <div className="w-2 h-2 bg-[#4FC3F7] rounded-full" />
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <h3 className="text-xs sm:text-sm font-semibold text-[#004D40]">
                                                Stakeholders
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-2" role="list">
                                                <span className="bg-[#F3F4F9] text-[#757575] px-3 py-1.5 rounded-2xl text-[9px]" role="listitem">
                                                    Governments/Regulators
                                                </span>
                                                <span className="bg-[#F3F4F9] text-[#757575] px-3 py-1.5 rounded-2xl text-[9px]" role="listitem">
                                                    Investors
                                                </span>
                                                <span className="bg-[#F3F4F9] text-[#757575] px-3 py-1.5 rounded-2xl text-[9px]" role="listitem">
                                                    Employees
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Engagement Method */}
                                <div className="flex-1 border border-[#E0E0E0] rounded-lg p-4">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-7 h-7 bg-[#E1F5FE] rounded grid place-items-center flex-shrink-0" aria-hidden="true">
                                            <div className="w-2 h-2 bg-[#4FC3F7] rounded-full" />
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <h3 className="text-xs sm:text-sm font-semibold text-[#004D40]">
                                                Engagement (Method)
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-2" role="list">
                                                <span className="bg-[#E1F5FE] text-[#53D8F5] px-3 py-1.5 rounded-2xl text-[9px] font-medium" role="listitem">
                                                 Townhall/Community Meetings
                                                </span>
                                                <span className="bg-[#E5F3BB] text-[#757575] px-3 py-1.5 rounded-2xl text-[9px] font-medium" role="listitem">
                                                ESG Forums
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Issues Raised */}
                            <div className="border border-[#E0E0E0] rounded-lg p-4 space-y-4" aria-labelledby="issues-heading">

                                <h3 id="issues-heading" className="text-xs sm:text-sm font-semibold text-[#004D40]">
                                    Issues Raised
                                </h3>

                                <div className="space-y-3" role="list">

                                    {/* Issue 1 */}
                                    <div className="flex items-center gap-2" role="listitem">
                                        <div className="w-4 h-4 bg-[#E1F5FE] rounded grid place-items-center flex-shrink-0" aria-hidden="true">
                                            <div className="w-1 h-1 bg-[#4FC3F7] rounded-full" />
                                        </div>

                                        <p className="text-[11px] text-[#757575] flex sm:pr-2">
                                            Water quality concerns in nearby river affecting agricultural activities
                                        </p>

                                        <span className="bg-[#FFF5E6] text-[#F59E0B] px-2 py-1 rounded-2xl text-[10px] font-medium flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap">
                                            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                                            Pending
                                        </span>
                                    </div>

                                    {/* Issue 2 */}
                                    <div className="flex items-center gap-2" role="listitem">
                                        <div className="w-4 h-4 bg-[#E1F5FE] rounded grid place-items-center flex-shrink-0" aria-hidden="true">
                                            <div className="w-1 h-1 bg-[#4FC3F7] rounded-full" />
                                        </div>

                                        <p className="text-[11px] text-[#757575] flex sm:pr-2">
                                            Implemented new advanced water treatment facility with quality testing protocols
                                        </p>

                                        <span className="bg-[#E1F5FE] text-[#53D8F5] px-2 py-1 rounded-2xl text-[10px] font-medium flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap">
                                            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                                            Resolved
                                        </span>
                                    </div>

                                </div>
                            </div>

                            {/* Resolution/Responses */}
                            <div className="border border-[#E0E0E0] rounded-lg p-4 space-y-4" aria-labelledby="resolutions-heading">

                                <h3 id="resolutions-heading" className="text-xs sm:text-sm font-semibold text-[#004D40]">
                                    Resolution/Responses
                                </h3>

                                <div className="space-y-3" role="list">

                                    {/* Resolution 1 */}
                                    <div className="flex items-center gap-2" role="listitem">
                                        <div className="w-4 h-4 bg-[#E1F5FE] rounded grid place-items-center flex-shrink-0" aria-hidden="true">
                                            <div className="w-1 h-1 bg-[#4FC3F7] rounded-full" />
                                        </div>

                                        <p className="text-[11px] text-[#757575] flex sm:pr-2">
                                            Scholarship
                                        </p>

                                        <span className="bg-[#FFF5E6] text-[#F59E0B] px-2 py-1 rounded-2xl text-[10px] font-medium flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap">
                                            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                                            Pending
                                        </span>
                                    </div>

                                    {/* Resolution 2 */}
                                    <div className="flex items-center gap-2" role="listitem">
                                        <div className="w-4 h-4 bg-[#E1F5FE] rounded grid place-items-center flex-shrink-0" aria-hidden="true">
                                            <div className="w-1 h-1 bg-[#4FC3F7] rounded-full" />
                                        </div>

                                        <p className="text-[11px] text-[#757575] flex sm:pr-2">
                                            Local Infrastructure
                                        </p>

                                        <span className="bg-[#E1F5FE] text-[#53D8F5] px-2 py-1 rounded-2xl text-[10px] font-medium flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap">
                                            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                                            Resolved
                                        </span>
                                    </div>

                                    {/* Resolution 3 */}
                                    <div className="flex items-center gap-2" role="listitem">
                                        <div className="w-4 h-4 bg-[#E1F5FE] rounded grid place-items-center flex-shrink-0" aria-hidden="true">
                                            <div className="w-1 h-1 bg-[#4FC3F7] rounded-full" />
                                        </div>

                                        <p className="text-[11px] text-[#757575] flex sm:pr-2">
                                            Local Infrastructure
                                        </p>

                                        <span className="bg-[#E1F5FE] text-[#53D8F5] px-2 py-1 rounded-2xl text-[10px] font-medium flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap">
                                            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                                            Resolved
                                        </span>
                                    </div>

                                </div>
                            </div>

                            {/* Next Session Link */}
                            <div className="bg-[#E8EAF6] rounded-md p-2">
    <a 
        href="#" 
        className="text-[9px] sm:text-xs text-[#3F51B5] hover:text-[#303F9F] font-medium hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#3F51B5] focus:ring-offset-2 inline-block"
        aria-label="View next stakeholder engagement session scheduled for January 15, 2026"
    >
        Next Stakeholder engagement session: January 15, 2026
    </a>
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
                    aria-label="Help is available"
                >
                    need help?
                    <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" aria-hidden="true" />
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