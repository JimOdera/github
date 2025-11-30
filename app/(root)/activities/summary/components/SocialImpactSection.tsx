// app/projects/summary/components/SocialImpactSection.tsx
import { ArrowUpDown, ArrowDownRight, BadgeCheck } from 'lucide-react';
import JobCreationRadialChart from '@/app/components/charts/JobCreationRadialChart';
import React from 'react';

const socialImpactData = [
  { activity: 'Skills Training Program', fullTime: 45, partTime: 120, women: 98, youth: 135, workersReached: 165, healthIncidents: 2, totalBeneficiaries: 165, sdgs: '4, 8, 10' },
  { activity: 'Community Health Camps', fullTime: 12, partTime: 38, women: 180, youth: 95, workersReached: 450, healthIncidents: 0, totalBeneficiaries: 450, sdgs: '3, 5' },
  { activity: 'Women Empowerment Initiative', fullTime: 8, partTime: 25, women: 210, youth: 80, workersReached: 210, healthIncidents: 1, totalBeneficiaries: 210, sdgs: '5, 10' },
  { activity: 'Youth Employment Drive', fullTime: 30, partTime: 90, women: 75, youth: 195, workersReached: 195, healthIncidents: 3, totalBeneficiaries: 195, sdgs: '4, 8' },
  { activity: 'Worker Safety Training', fullTime: 18, partTime: 42, women: 55, youth: 40, workersReached: 320, healthIncidents: 0, totalBeneficiaries: 320, sdgs: '3, 8' },
];

const SocialImpactSection = () => {
  return (
    <div className="bg-white border border-gray-200 px-8 py-6 rounded-lg space-y-6">
      <h1 className="text-lg font-semibold text-[#044D5E]">Social Impact</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className='col-span-2'>
          <JobCreationRadialChart />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className='flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4'>
            <p className="text-sm">Total Beneficiaries Reached</p>
            <h1 className='text-3xl font-bold text-gray-800'>1,340</h1>
            <span className='text-xs text-green-600'>+42% vs last year</span>
          </div>
          <div className='flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4'>
            <p className="text-sm">Women Empowered</p>
            <h1 className='text-3xl font-bold text-gray-800'>618</h1>
            <span className='text-xs text-green-600'>46% of total</span>
          </div>
          <div className='flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4'>
            <p className="text-sm">Health & Safety Incidents</p>
            <h1 className='text-3xl font-bold text-gray-800'>6</h1>
            <span className='text-xs text-red-600'>All minor, resolved</span>
          </div>
        </div>
      </div>

      <h1 className="text-lg font-semibold text-[#044D5E]">Social Impact Activities (23)</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 font-medium">Activity <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" /></th>
              <th className="py-3 px-4 font-medium">Full time</th>
              <th className="py-3 px-4 font-medium">Part time</th>
              <th className="py-3 px-4 font-medium">Women</th>
              <th className="py-3 px-4 font-medium">Youth</th>
              <th className="py-3 px-4 font-medium">Workers reached</th>
              <th className="py-3 px-4 font-medium">Health incidents</th>
              <th className="py-3 px-4 font-medium">Total</th>
              <th className="py-3 px-4 font-medium">Aligned SDGs</th>
            </tr>
          </thead>
          <tbody>
            {socialImpactData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{item.activity}</td>
                <td className="py-3 px-4">{item.fullTime}</td>
                <td className="py-3 px-4">{item.partTime}</td>
                <td className="py-3 px-4 text-green-700 font-medium">{item.women}</td>
                <td className="py-3 px-4 text-purple-700 font-medium">{item.youth}</td>
                <td className="py-3 px-4 font-medium">{item.workersReached}</td>
                <td className="py-3 px-4 text-red-600">{item.healthIncidents}</td>
                <td className="py-3 px-4 font-bold">{item.totalBeneficiaries}</td>
                <td className="py-3 px-4 text-xs text-gray-600">SDG {item.sdgs}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-full flex items-center justify-between mt-4 px-4 py-2 bg-[#EEF3FF] text-[#1447E6] text-xs rounded-lg">
          <div className='flex items-center gap-2'>
            <span>Last updated: March 2025</span>
            <div className='w-1 h-1 rounded-full bg-gray-400'></div>
            <span>Next review: September 2025</span>
          </div>
          <div className='flex items-center gap-2'>
            Social Impact Report <ArrowDownRight size={16} />
          </div>
        </div>

        <div className="w-full flex items-center justify-between mt-4 p-4 text-[#044D5E] text-xs bg-gradient-to-r from-[#BFEFF8]/50 to-[#B1CA69]/30 rounded-lg">
          <p className='text-lg font-medium'>Diversity Score</p>
          <div className='flex items-center gap-2'>
            <BadgeCheck color="#ffffff" fill='#044d5e' size={18} />
            <p>85%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialImpactSection;