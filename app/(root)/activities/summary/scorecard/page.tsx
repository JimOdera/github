'use client';

import Header from '@/app/components/Header';
import { folder, message_circle_more } from '@/public';
import { Download } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import EnvironmentalScorecardTable from './components/EnvironmentalScorecardTable';
import SocialScorecardTable from './components/SocialScorecardTable';
import GovernanceScorecardTable from './components/GovernanceScorecardTable';



const SCORECARD = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFEFF8]/30 to-[#B1CA69]/30 flex">
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col relative z-10">
        <Header />

        <div className="flex w-full md:w-[90vw] mx-auto pt-17 bg-[#FBFDFB] relative">
          {/* HERO BANNER */}
          <section className="absolute inset-x-0 top-17 w-full h-52 md:h-64 bg-cover bg-center z-20">
            <Image src="/images/projects/summary.png" alt="Summary Banner" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#B1CA69]/30 via-transparent to-[#FBFDFB]/30 flex items-center p-6">
              <div className="flex flex-col items-start ml-4">
                <Image src={folder} alt="folder" className="block md:hidden w-4 h-4 mb-2" />
                <h2 className="text-lg md:text-3xl font-medium text-teal-900">ESG Scorecard</h2>
                <span className="text-xs text-teal-700">Reporting Period: July, 2024 - June 2025</span>
                <Link
                  href="/activities/summary/scorecard"
                  className="mt-4 bg-[#DEEDD7] text-xs text-[#044D5E] border border-[#B6D695] px-5 py-2 rounded-lg flex items-center gap-2"
                >
                  <span>Download Scorecard</span> <Download size={16} />
                </Link>
              </div>
            </div>
          </section>

          {/* MAIN CONTENT */}
          <main className="w-full bg-[#FBFDFB] relative z-10 pt-64 md:pt-72">

            <EnvironmentalScorecardTable />

            <SocialScorecardTable />

            <GovernanceScorecardTable />

          </main>
        </div>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-5 right-5 flex flex-col items-center">
        <div className="bg-white text-xs text-gray-700 px-3 py-1 rounded-lg shadow-md mb-2 relative cursor-pointer">
          need help?
          <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></span>
        </div>
        <button className="bg-white shadow-md border border-gray-200 rounded-full p-3 transition-all duration-300 hover:shadow-xl hover:scale-110">
          <Image src={message_circle_more} alt="Help" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default SCORECARD;