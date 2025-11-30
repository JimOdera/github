
import Header from '@/app/components/Header';
import ApexRadialChart from '@/app/components/ApexRadialChart';
import { message_circle_more } from '@/public';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function ProcurementSpendDiversityDetail() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col space-y-6">
            
            {/* Top Navigation */}
            <Header />

            <main className="w-full sm:w-[95vw] lg:w-[90vw] xl:w-[85vw] mx-auto bg-[#FBFDFB] rounded-lg overflow-hidden pt-16">

                {/* Hero Section with Background Image */}
                <section className="relative w-full h-auto min-h-[200px] sm:h-64 md:h-72 lg:h-80 bg-cover bg-center">
                    <Image
                        src="/images/activities/section2.png"
                        alt="Aerial view of green forest landscape representing environmental sustainability and procurement diversity initiatives"
                        fill
                        className="object-cover opacity-70"
                        priority
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end pb-4 sm:pb-6 md:pb-10 px-3 sm:px-4 md:px-8">
                        
                        {/* Title Section */}
                        <div className="mb-1 sm:mb-0.5">   
                              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                                      Procurement spend Diversity Report
                               </h1>
                         
                        </div>

                        {/* Line and Content Section */}
                        <div className="space-y-1.5 sm:space-y-2">

                            {/* Bottom Row: Category Tags + Chart/Button */}
                            <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-3 sm:gap-4 lg:gap-0 lg:mr-8">

                               
                                <div className="flex flex-col gap-1.5 sm:gap-2 w-full lg:w-auto">

                                 
                                    <div className="w-full h-px bg-gray-300" role="separator" aria-hidden="true" />

                                    {/* Category Tags */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-1.5 sm:gap-2 md:gap-3 text-xs">

                                        <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2">
                                            <span className="text-gray-700">Unit/Group:</span>
                                            <span className="font-semibold text-gray-900 break-words">
                                                Operational & Environmental
                                            </span>
                                        </div>

                                        <div className="hidden md:flex items-center">
                                            <span className="text-gray-400">•</span>
                                        </div>

                                        <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2">
                                            <span className="text-gray-700">Stakeholder:</span>
                                            <span className="font-semibold text-gray-900 break-words">
                                                Regulator (e.g., CBK, CIMA, NSE)
                                            </span>
                                        </div>

                                    </div>
                                </div>

                                {/* Right Side: Chart + Button */}
                                <div className="flex items-center justify-center gap-1 sm:gap-2 self-start lg:self-auto flex-shrink-0">

                                    {/* Radial Chart */}
                                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0" role="img" aria-label="Progress indicator showing 25% completion">
                                        <ApexRadialChart percentage={25} size={80} />
                                    </div>

                                    {/* Update Activities Button */}
                                    <button 
                                        className="bg-[#4FC3F7] text-white px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md text-xs font-medium hover:bg-[#00ACC1] transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2"
                                        aria-label="Update diversity report activities"
                                    >
                                        Update Activities
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

             
                <div className="space-y-6 py-6">
                    
                    {/* Status Section */}
                    <section className="px-3 sm:px-4 md:px-8" aria-labelledby="diversity-status-heading">
                        <div className="bg-[#E5F5E4] rounded-md p-3 sm:p-4 md:p-6 border border-green-200">
                            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-3 sm:gap-4">

                                <div className="flex-1 min-w-0 w-full md:w-auto md:pr-4">
                                    <h2 id="diversity-status-heading" className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-1 sm:mb-2">
                                        Diversity Spend Status
                                    </h2>
                                    <p className="text-xs text-gray-700 leading-relaxed">
                                        Confirm procument diversity spend for women, pwd and local Suppliers.
                                    </p>
                                </div>

                                {/* Verified Badge */}
                                <div className="flex items-center gap-1.5 bg-[#4DB6AC] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs font-medium flex-shrink-0 self-start md:self-center" role="status" aria-label="Verification status: Verified">
                                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                                    <span>Verified</span>
                                </div>

                            </div>
                        </div>
                    </section>
                
                    {/* Total Diverse Spend */}
                    <div className="px-3 sm:px-4 md:px-8 lg:px-12">
                        <div className="w-full sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[20%] bg-[#F8FAF8] rounded-lg p-3 sm:p-4 md:p-5 border-[0.5px] border-gray-200">
                            <h3 className="text-xs font-medium text-gray-700 mb-2 sm:mb-3">
                                Total Diverse Spend
                            </h3>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
                                $339,000
                            </p>
                            <p className="text-xs text-teal-700 font-medium">
                                17% of total procurement
                            </p>
                        </div>
                    </div>

                    {/* Grid Section */}
                    <div className="px-3 sm:px-4 md:px-8 lg:px-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" role="list" aria-label="Diversity spend breakdown by category">
                            
                            {/* PLWD-Led (Disability Owned) */}
                            <div className="bg-white rounded-md p-3 sm:p-4 border-[0.5px] border-gray-200 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-[#00BCD4] focus-within:ring-offset-2" role="listitem">
                                <h3 className="text-xs font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    PLWD-Led (Disability Owned)
                                </h3>
                                <p className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">
                                    $120,000
                                </p>
                                <p className="text-xs text-gray-600">
                                    35% of total
                                </p>
                            </div>

                            {/* Women-Owned Businesses */}
                            <div className="bg-white rounded-lg p-3 sm:p-4 border-[0.5px] border-gray-200 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-[#00BCD4] focus-within:ring-offset-2" role="listitem">
                                <h3 className="text-xs font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    Women-Owned Businesses
                                </h3>
                                <p className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">
                                    $85,200
                                </p>
                                <p className="text-xs text-gray-600">
                                    25% of total
                                </p>
                            </div>

                            {/* Local Community Vendors */}
                            <div className="bg-white rounded-lg p-3 sm:p-4 border-[0.5px] border-gray-200 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-[#00BCD4] focus-within:ring-offset-2" role="listitem">
                                <h3 className="text-xs font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    Local Community Vendors
                                </h3>
                                <p className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">
                                    $65,800
                                </p>
                                <p className="text-xs text-gray-600">
                                    19% of total
                                </p>
                            </div>

                            {/* Total No of Suppliers */}
                            <div className="bg-white rounded-lg p-3 sm:p-4 border-[0.5px] border-gray-200 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-[#00BCD4] focus-within:ring-offset-2" role="listitem">
                                <h3 className="text-xs font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    Total No of Suppliers
                                </h3>
                                <p className="text-lg sm:text-xl font-bold text-gray-900">
                                    27
                                </p>
                            </div>
                            

                        </div>
                        
                    </div>

                    {/* Aligned SDGs Section */}
                    <div className="px-3 sm:px-4 md:px-8 pb-12 sm:pb-16 md:pb-24 lg:pb-32">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">
                            Aligned SDGs
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3" role="list" aria-label="Sustainable Development Goals">
                            {/* Zero Hunger Badge */}
                            <div className="bg-[#F59E0B] text-white px-2 py-1 text-xs font-medium " role="listitem">
                                Zero Hunger
                            </div>
                            
                            {/* Climate Action Badge */}
                            <div className="bg-[#6B7C3C] text-white px-2 py-1 text-xs font-medium " role="listitem">
                                Climate Action
                            </div>
                        </div>
                    </div>

                </div>

            </main>

            {/* Floating Help Button */}
            <div className="fixed bottom-4 sm:bottom-5 right-4 sm:right-5 flex flex-col items-center z-50">
                
                <div className="bg-white text-xs text-gray-700 px-2 sm:px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2" tabIndex={0} role="tooltip">
                    need help?
                    <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45" aria-hidden="true" />
                </div>

                <button 
                    className="bg-white shadow-md border border-gray-200 rounded-full p-2 sm:p-3 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2"
                    aria-label="Open help chat assistant"
                >
                    <Image
                        src={message_circle_more}
                        alt=""
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        aria-hidden="true"
                    />
                </button>

            </div>

        </div>
    );
}