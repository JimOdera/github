// app/projects/summary/components/HumanRights.tsx
import { ArrowUpDown, ArrowDownRight, BadgeCheck } from 'lucide-react';
import React from 'react';

const humanRightsData = [
  {
    activity: 'Child Labor Prevention Program',
    policies: 'Yes',
    recentAssessment: 'Q2 2025',
    grievances: 3,
    remedies: 3,
    sdgs: '8, 16',
  },
  {
    activity: 'Forced Labor Risk Mapping',
    policies: 'Yes',
    recentAssessment: 'Q1 2025',
    grievances: 0,
    remedies: 0,
    sdgs: '8',
  },
  {
    activity: 'Freedom of Association Training',
    policies: 'Yes',
    recentAssessment: 'Q4 2024',
    grievances: 8,
    remedies: 8,
    sdgs: '8',
  },
  {
    activity: 'Non-Discrimination Policy Review',
    policies: 'Yes',
    recentAssessment: 'Q3 2025',
    grievances: 5,
    remedies: 5,
    sdgs: '5, 10',
  },
  {
    activity: 'Supplier Human Rights Due Diligence',
    policies: 'Yes',
    recentAssessment: 'Ongoing',
    grievances: 5,
    remedies: 29,
    sdgs: '8, 16',
  },
];

const HumanRights = () => {
  return (
    <div className="bg-white border border-gray-200 px-8 py-6 rounded-lg space-y-6">
      {/* Section Title */}
      <h1 className="text-lg font-semibold text-[#044D5E]">Human Rights</h1>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4">
          <p className="text-sm text-gray-600">Activities with Policies</p>
          <h1 className="text-3xl font-bold text-gray-800">27</h1>
          <span className="text-xs text-green-600">100% coverage</span>
        </div>

        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4">
          <p className="text-sm text-gray-600">Recent Assessments</p>
          <h1 className="text-3xl font-bold text-gray-800">6</h1>
          <span className="text-xs text-blue-600">This year</span>
        </div>

        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4">
          <p className="text-sm text-gray-600">Grievances Logged</p>
          <h1 className="text-3xl font-bold text-gray-800">21</h1>
          <span className="text-xs text-orange-600">-12% vs last year</span>
        </div>

        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4">
          <p className="text-sm text-gray-600">Remediation Taken</p>
          <h1 className="text-3xl font-bold text-gray-800">45</h1>
          <div className="flex items-center gap-2">
            <BadgeCheck className="text-green-600" size={18} />
            <span className="text-xs text-green-600 font-medium">
              100% addressed
            </span>
          </div>
        </div>
      </div>

      {/* Table Title */}
      <h2 className="text-lg font-semibold text-[#044D5E]">
        All Human Rights Activities (27)
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
                Policies in Place
              </th>
              <th className="py-3 px-4 font-medium">
                Recent Assessment
              </th>
              <th className="py-3 px-4 font-medium">
                Grievances Logged <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Remedies Taken <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Aligned SDGs
              </th>
            </tr>
          </thead>
          <tbody>
            {humanRightsData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-teal-900">
                  {item.activity}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                    <BadgeCheck size={16} />
                    {item.policies}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700 text-xs">
                  {item.recentAssessment}
                </td>
                <td className="py-3 px-4 text-orange-700 font-medium">
                  {item.grievances}
                </td>
                <td className="py-3 px-4">
                  <span className="text-green-700 font-medium flex items-center gap-1">
                    <BadgeCheck size={16} />
                    {item.remedies}
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-gray-600">
                  SDG {item.sdgs}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer Info Bar */}
        <div className="w-full flex items-center justify-between mt-4 px-4 py-2 bg-[#EEF3FF] text-[#1447E6] text-xs rounded-lg">
          <div className="flex items-center gap-2">
            <span>Last updated: June 2025</span>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <span>Next review: Q1 2026</span>
          </div>
          <div className="flex items-center gap-2">
            Human Rights Report <ArrowDownRight size={16} />
          </div>
        </div>

        {/* Bottom Status Banner */}
        <div className="w-full flex items-center justify-between mt-4 p-4 text-[#044D5E] text-xs bg-gradient-to-r from-[#BFEFF8]/50 to-[#B1CA69]/30 rounded-lg">
          <p className="text-lg font-medium">Human Rights Due Diligence</p>
          <div className="flex items-center gap-2">
            <BadgeCheck color="#ffffff" fill="#044d5e" size={18} />
            <p className="font-semibold">Fully Compliant</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanRights;