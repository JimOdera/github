
import Header from '@/app/components/Header';
import ApexRadialChart from '@/app/components/ApexRadialChart';
import ApexDonutChart from '@/app/components/ApexDonutChart';
import { message_circle_more } from '@/public';
import Image from 'next/image';
import { CheckCircle2, Download, FileText } from 'lucide-react';

export default function MaterialTopicsDetail() {
    // Donut chart data for material topics
    const materialTopicsData = [
        { name: 'Climate Change', value: 45, color: '#00838F' },
        { name: 'Circular Economy', value: 30, color: '#AED581' },
        { name: 'Labour Practices', value: 25, color: '#26A69A' }
    ];

    // Uploaded materials
    const uploadedFiles = [
        {
            id: 1,
            name: 'Materiality Matrix.pdf',
            size: '2.3 MB',
            type: 'pdf'
        },
        {
            id: 2,
            name: 'Material sources copy.doc',
            size: '1.8 MB',
            type: 'doc'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex flex-col space-y-6">
            
            {/* Top Navigation */}
            <Header />

            <main className="w-full sm:w-[95vw] lg:w-[90vw] xl:w-[85vw] mx-auto bg-[#FBFDFB] rounded-lg overflow-hidden pt-16">

                {/* Hero Section with Background Image */}
                <section className="relative w-full h-auto min-h-[200px] sm:h-48 md:h-56 lg:h-64 bg-cover bg-center">
                    <Image
                        src="/images/activities/section2.png"
                        alt="Aerial view of green forest landscape representing environmental sustainability"
                        fill
                        className="object-cover opacity-70"
                        priority
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end pb-4 sm:pb-6 md:pb-8 px-3 sm:px-4 md:px-8">
                        
                        {/* Title Section */}
                        <div className="mb-1">   
                            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 leading-tight">
                                Material Topics Overview
                            </h1>
                        </div>

                        {/* Line and Content Section */}
                        <div className="space-y-1.5 sm:space-y-2">

                            {/* Bottom Row: Category Tags + Chart/Button */}
                            <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-3 sm:gap-4 lg:gap-0 lg:mr-8">

                                {/* Left Side: Tags + Line */}
                                <div className="flex flex-col gap-1.5 sm:gap-2 w-full lg:w-auto">

                                    {/* Horizontal Line */}
                                    <div className="w-full h-px bg-gray-300" role="separator" aria-hidden="true" />

                                    {/* Category Tags */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-1.5 sm:gap-2 md:gap-3 text-[10px] sm:text-xs">

                                        <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2">
                                            <span className="text-gray-700">Unit/Group:</span>
                                            <span className="font-semibold text-gray-900 break-words">
                                                Operational & Environmental
                                            </span>
                                        </div>

                                        {/* Dot separator */}
                                        <div className="hidden md:flex items-center">
                                            <span className="text-gray-400">•</span>
                                        </div>

                                        <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2">
                                            <span className="text-gray-700">Stakeholder Group:</span>
                                            <span className="font-semibold text-gray-900 break-words">
                                                Regulator (e.g., CBK, CIMA, NSE)
                                            </span>
                                        </div>

                                    </div>
                                </div>

                                {/* Right Side: Chart + Button */}
                                <div className="flex items-center justify-center gap-1 sm:gap-2 self-start lg:self-auto flex-shrink-0">

                                    {/* Radial Chart */}
                                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0" role="img" aria-label="Progress indicator showing 25% completion">
                                        <ApexRadialChart percentage={25} size={64} />
                                    </div>

                                    {/* Update Activities Button */}
                                    <button 
                                        className="bg-[#4FC3F7] text-white px-2 sm:px-3 md:px-3.5 py-1.5 sm:py-2 md:py-2.5 rounded-md text-[10px] sm:text-xs font-medium hover:bg-[#00ACC1] transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2"
                                        aria-label="Update material topics activities"
                                    >
                                        Update Activity
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Container with consistent spacing */}
                <div className="space-y-6 py-6 px-3 sm:px-4 md:px-8">
                    
                    {/* Status Section */}
                    <section aria-labelledby="status-heading">
                        <div className="bg-[#E5F5E4] rounded-lg p-3 sm:p-4 md:p-5 border border-green-200">
                            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-3 sm:gap-4">

                                <div className="flex-1 min-w-0 w-full md:w-auto md:pr-4">
                                    <h2 id="status-heading" className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-1.5 sm:mb-2">
                                        Materiality Assessment Status
                                    </h2>
                                    <p className="text-[10px] sm:text-xs text-gray-700 leading-relaxed">
                                        Materiality topics for this period are identified and reviewed, with the updated Materiality Matrix available.
                                    </p>
                                </div>

                                {/* Verified Badge */}
                                <div className="flex items-center gap-1.5 bg-[#4DB6AC] text-white px-3 py-1.5 rounded-md text-xs font-medium flex-shrink-0 self-start md:self-center" role="status" aria-label="Verification status: Verified">
                                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                                    <span>Verified</span>
                                </div>

                            </div>
                        </div>
                    </section>

                    {/* Top Material Topics Section */}
                    <section aria-labelledby="topics-heading">
                        <div className="space-y-4">
                            
                            {/* Section Header */}
                            <div>
                                <h2 id="topics-heading" className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1">
                                    Top material topics
                                </h2>
                                <p className="text-[10px] sm:text-xs text-gray-600">
                                    Top material topics this period
                                </p>
                            </div>

                         
                            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                                
                                <div className="lg:w-2/5 xl:w-1/3 bg-[#F5F9F5] rounded-lg p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 border border-gray-200">
                                    
                                    {/* Total Materials Topics */}
                                    <div className="space-y-1.5">
                                        <p className="text-[9px] sm:text-[10px] text-gray-600 font-medium">
                                            Total Materials topics
                                        </p>
                                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00838F]">
                                            {materialTopicsData.length}
                                        </p>
                                    </div>

                                    {/* Divider Line */}
                                    <div className="w-full h-px bg-gray-300" />

                                    {/* Assessment Source */}
                                    <div className="space-y-1.5">
                                        <p className="text-[9px] sm:text-[10px] text-gray-600 font-medium">
                                            Assessment Source
                                        </p>
                                        <p className="text-xs sm:text-sm md:text-base font-bold text-[#00838F]">
                                            Stakeholder Input
                                        </p>
                                    </div>

                                </div>

                                <div className="flex-1 bg-white rounded-lg p-4 sm:p-5 md:p-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10 border border-gray-200">
                                    
                                    {/* Donut Chart */}
                                    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex-shrink-0">
                                        <ApexDonutChart 
                                            data={materialTopicsData}
                                            height={256}
                                        />
                                    </div>

                                    {/* Legend */}
                                    <div className="space-y-3 sm:space-y-4">
                                        {materialTopicsData.map((topic, index) => (
                                            <div 
                                                key={index}
                                                className="flex items-center gap-2.5 sm:gap-3"
                                            >
                                                {/* Color Indicator */}
                                                <div 
                                                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: topic.color }}
                                                    aria-hidden="true"
                                                />
                                                
                                                {/* Topic Name */}
                                                <span className="text-[10px] sm:text-[11px] md:text-xs font-medium text-gray-900">
                                                    {topic.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </div>

                        </div>
                    </section>

                    {/* Uploaded Materials Section */}
                    <section aria-labelledby="materials-heading">
                        <div className="space-y-4">
                            
                            {/* Section Header */}
                            <div>
                                <h2 id="materials-heading" className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-1">
                                    Uploaded materials
                                </h2>
                                <p className="text-[9px] sm:text-[10px] text-gray-600">
                                    Uploaded Materiality Matrix
                                </p>
                            </div>

                            {/* Files List */}
                            <div className="space-y-3">
                                
                                {uploadedFiles.map((file) => (
                                    <div 
                                        key={file.id}
                                        className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                                    >
                                        {/* File Info */}
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            {/* File Icon */}
                                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded flex items-center justify-center flex-shrink-0 ${
                                                file.type === 'pdf' ? 'bg-red-50' : 'bg-blue-50'
                                            }`}>
                                                <FileText className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                                    file.type === 'pdf' ? 'text-red-500' : 'text-blue-500'
                                                }`} />
                                            </div>

                                            {/* File Details */}
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[10px] sm:text-xs font-medium text-gray-900 truncate">
                                                    {file.name}
                                                </p>
                                                <p className="text-[9px] sm:text-[10px] text-gray-500">
                                                    {file.size}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Download Button */}
                                        <button 
                                            className="flex items-center gap-1.5 bg-[#E0F2F1] text-[#00897B] px-3 py-1.5 rounded-md text-[9px] sm:text-[10px] font-medium hover:bg-[#B2DFDB] transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#00897B] focus:ring-offset-2"
                                            aria-label={`Download ${file.name}`}
                                        >
                                            <span>Download</span>
                                            <Download className="w-3 h-3" aria-hidden="true" />
                                        </button>

                                    </div>
                                ))}

                            </div>

                        </div>
                    </section>

                </div>

            </main>

            {/* Floating Help Button */}
            <div className="fixed bottom-4 sm:bottom-5 right-4 sm:right-5 flex flex-col items-center z-50">
                
                <div className="bg-white text-[10px] text-gray-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg shadow-md mb-2 relative cursor-pointer hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2" tabIndex={0} role="tooltip">
                    need help?
                    <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45" aria-hidden="true" />
                </div>

                <button 
                    className="bg-white shadow-md border border-gray-200 rounded-full p-2 sm:p-2.5 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2"
                    aria-label="Open help chat assistant"
                >
                    <Image
                        src={message_circle_more}
                        alt=""
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        aria-hidden="true"
                    />
                </button>

            </div>

        </div>
    );
}