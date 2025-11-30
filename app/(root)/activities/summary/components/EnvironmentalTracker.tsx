// app/projects/summary/components/EnvironmentalTracker.tsx
import { ArrowUpDown, ArrowDownRight, BadgeCheck } from 'lucide-react';
import React from 'react';

const environmentalData = [
  { metric: 'Energy Consumption', scope: 'Scope 2', count: 145, approved: true, average: '8.6 MWh', total: '1,250 MWh', status: 'on track', sdgs: '7, 13' },
  { metric: 'Water Usage', scope: 'Scope 1', count: 89, approved: false, average: '5,056 L', total: '450,000 L', status: 'need attention', sdgs: '6, 14' },
  { metric: 'Waste Generation', scope: 'Scope 3', count: 203, approved: false, average: '91 kg', total: '18,500 kg', status: 'need attention', sdgs: '12' },
  { metric: 'Renewable Energy %', scope: 'Scope 2', count: 67, approved: true, average: '68%', total: '68%', status: 'on track', sdgs: '7' },
  { metric: 'Carbon Emissions', scope: 'Scope 1 & 2', count: 112, approved: true, average: '25 tCO2e', total: '2,800 tCO2e', status: 'completed', sdgs: '13' },
  { metric: 'Recycling Rate', scope: 'Scope 3', count: 95, approved: true, average: '82%', total: '82%', status: 'on track', sdgs: '12' },
];

const EnvironmentalTracker = () => {
  return (
    <div className="bg-white border border-gray-200 px-8 py-6 rounded-lg space-y-6">
      <h1 className="text-lg font-medium text-[#044D5E]">Environmental Tracker</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className='flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4'>
          <p className="text-sm">Total GHG Emissions (tonnes)</p>
          <h1 className='text-3xl font-medium text-gray-800'>6,750</h1>
          <span className='text-xs text-green-600'>+78% renewable</span>
        </div>
        <div className='flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4'>
          <p className="text-sm">Total Energy Consumption (MWh)</p>
          <h1 className='text-3xl font-medium text-gray-800'>3,805</h1>
          <span className='text-xs text-yellow-600'>+17% of the potential</span>
        </div>
        <div className='flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4'>
          <p className="text-sm">Total Waste Generated (tonnes)</p>
          <h1 className='text-3xl font-medium text-gray-800'>845</h1>
          <div className="flex items-center gap-4">
            <span className='text-xs text-green-600'>+48% recycled</span>
            <span className='text-xs text-red-600'>-5% landfilled</span>
          </div>
        </div>
      </div>

      <h1 className="text-lg font-semibold text-[#044D5E]">Environmental Impact activities (45)</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 font-medium">GHG Emissions <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" /></th>
              <th className="py-3 px-4 font-medium">Scope <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" /></th>
              <th className="py-3 px-4 font-medium">Count <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" /></th>
              <th className="py-3 px-4 font-medium">Approved <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" /></th>
              <th className="py-3 px-4 font-medium">Average <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" /></th>
              <th className="py-3 px-4 font-medium">Total <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" /></th>
              <th className="py-3 px-4 font-medium">Aligned SDGs <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" /></th>
            </tr>
          </thead>
          <tbody>
            {environmentalData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{item.metric}</td>
                <td className="py-3 px-4">{item.scope}</td>
                <td className="py-3 px-4">{item.count}</td>
                <td className="py-3 px-4 font-medium text-green-700">
                  {item.approved ? item.count : 0}
                </td>
                <td className="py-3 px-4">{item.average}</td>
                <td className="py-3 px-4 font-medium">{item.total}</td>
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
            Emissions Report <ArrowDownRight size={16}/>
          </div>
        </div>

        <div className="w-full flex items-center justify-between mt-4 px-4 py-2 text-[#044D5E] text-xs bg-gradient-to-r from-[#BFEFF8]/50 to-[#B1CA69]/30 rounded-lg">
          <p className='text-sm font-medium'>Emission Reduction Targets</p>
          <div className='flex items-center gap-2'>
            <BadgeCheck color="#ffffff" fill='#044d5e' size={18} />
            <p>On Track</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalTracker;