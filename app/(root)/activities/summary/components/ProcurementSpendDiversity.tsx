// app/projects/summary/components/ProcurementSpendDiversity.tsx
import { ArrowUpDown, ArrowDownRight, BadgeCheck } from 'lucide-react';
import React from 'react';

const procurementData = [
  {
    activity: 'Solar Farm Phase II',
    totalProcurement: '$48.2M',
    women: '$12.8M',
    youth: '$6.4M',
    pwd: '$2.1M',
    totalSuppliers: 89,
    diverseSpend: '44.2%',
    internalTarget: '40%',
    sdgs: '5, 8, 10',
  },
  {
    activity: 'Water Pipeline Project',
    totalProcurement: '$32.6M',
    women: '$9.8M',
    youth: '$4.2M',
    pwd: '$1.1M',
    totalSuppliers: 67,
    diverseSpend: '46.6%',
    internalTarget: '45%',
    sdgs: '5, 6, 8',
  },
  {
    activity: 'Community Training Center',
    totalProcurement: '$8.9M',
    women: '$4.1M',
    youth: '$2.8M',
    pwd: '$0.9M',
    totalSuppliers: 42,
    diverseSpend: '87.6%',
    internalTarget: '80%',
    sdgs: '4, 5, 8, 10',
  },
  {
    activity: 'Wind Turbine Installation',
    totalProcurement: '$91.5M',
    women: '$28.4M',
    youth: '$12.8M',
    pwd: '$3.6M',
    totalSuppliers: 124,
    diverseSpend: '49.1%',
    internalTarget: '50%',
    sdgs: '7, 8, 13',
  },
  {
    activity: 'Road Rehabilitation Program',
    totalProcurement: '$19.4M',
    women: '$6.2M',
    youth: '$3.9M',
    pwd: '$0.8M',
    totalSuppliers: 58,
    diverseSpend: '56.2%',
    internalTarget: '50%',
    sdgs: '9, 11',
  },
];

const ProcurementSpendDiversity = () => {
  return (
    <div className="bg-white border border-gray-200 px-8 py-6 rounded-lg space-y-6">
      {/* Section Title */}
      <h1 className="text-lg font-semibold text-[#044D5E]">
        Procurement Spend Diversity
      </h1>

      {/* 6 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-5 py-4 bg-gradient-to-br from-[#B1CA69]/10 to-[#BFEFF8]/10">
          <p className="text-xs text-gray-600">Total Diverse Spend</p>
          <h1 className="text-2xl font-bold text-[#044D5E]">$98.4M</h1>
          <span className="text-xs text-green-600">48.2% of total</span>
        </div>

        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-5 py-4">
          <p className="text-xs text-gray-600">Avg per Project</p>
          <h1 className="text-2xl font-bold text-[#044D5E]">$19.7M</h1>
          <span className="text-xs text-green-600">+12% vs last year</span>
        </div>

        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-5 py-4">
          <p className="text-xs text-gray-600">PWD-Led</p>
          <h1 className="text-2xl font-bold text-[#044D5E]">$8.5M</h1>
          <span className="text-xs text-purple-600">4.2%</span>
        </div>

        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-5 py-4">
          <p className="text-xs text-gray-600">Women-Owned</p>
          <h1 className="text-2xl font-bold text-[#044D5E]">$61.3M</h1>
          <span className="text-xs text-pink-600">30.1%</span>
        </div>

        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-5 py-4">
          <p className="text-xs text-gray-600">Local Community</p>
          <h1 className="text-2xl font-bold text-[#044D5E]">$42.8M</h1>
          <span className="text-xs text-teal-600">21.0%</span>
        </div>

        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-5 py-4">
          <p className="text-xs text-gray-600">Total Suppliers</p>
          <h1 className="text-2xl font-bold text-[#044D5E]">380</h1>
          <span className="text-xs text-blue-600">Active</span>
        </div>
      </div>

      {/* Table Title */}
      <h2 className="text-lg font-semibold text-[#044D5E]">
        All Procurement Spend Projects (18)
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 font-medium">
                Activity <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Total Procurement
              </th>
              <th className="py-3 px-4 font-medium">
                Women <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Youth
              </th>
              <th className="py-3 px-4 font-medium">
                PWD
              </th>
              <th className="py-3 px-4 font-medium">
                Total Suppliers
              </th>
              <th className="py-3 px-4 font-medium">
                Diverse Spend %
              </th>
              <th className="py-3 px-4 font-medium">
                Internal Target
              </th>
              <th className="py-3 px-4 font-medium">
                Aligned SDGs
              </th>
            </tr>
          </thead>
          <tbody>
            {procurementData.map((item, index) => {
              const diversePct = parseFloat(item.diverseSpend);
              const targetPct = parseFloat(item.internalTarget);

              return (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-teal-900">
                    {item.activity}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {item.totalProcurement}
                  </td>
                  <td className="py-3 px-4 text-pink-700 font-medium">
                    {item.women}
                  </td>
                  <td className="py-3 px-4 text-purple-700 font-medium">
                    {item.youth}
                  </td>
                  <td className="py-3 px-4 text-indigo-700 font-medium">
                    {item.pwd}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {item.totalSuppliers}
                  </td>
                  <td className="py-3 px-4 font-bold">
                    <span className={diversePct >= targetPct ? 'text-green-600' : 'text-orange-600'}>
                      {item.diverseSpend}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">{item.internalTarget}</span>
                      {diversePct >= targetPct ? (
                        <BadgeCheck size={16} className="text-green-600" />
                      ) : diversePct >= targetPct * 0.9 ? (
                        <span className="text-yellow-600 text-xs">Near Target</span>
                      ) : null}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600">
                    SDG {item.sdgs}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer Info Bar */}
        <div className="w-full flex items-center justify-between mt-4 px-4 py-2 bg-[#EEF3FF] text-[#1447E6] text-xs rounded-lg">
          <div className="flex items-center gap-2">
            <span>Last updated: September 2025</span>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <span>Next review: Q1 2026</span>
          </div>
          <div className="flex items-center gap-2">
            Procurement Diversity Report <ArrowDownRight size={16} />
          </div>
        </div>

        {/* Bottom Status Banner */}
        <div className="w-full flex items-center justify-between mt-4 p-4 text-[#044D5E] text-xs bg-gradient-to-r from-[#BFEFF8]/50 to-[#B1CA69]/30 rounded-lg">
          <p className="text-lg font-medium">Diverse & Inclusive Procurement</p>
          <div className="flex items-center gap-2">
            <BadgeCheck color="#ffffff" fill="#044d5e" size={18} />
            <p className="font-semibold">48.2% Diverse Spend Achieved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcurementSpendDiversity;