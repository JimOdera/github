// app/projects/summary/components/StakeholderEngagement.tsx
import { ArrowUpDown, ArrowDownRight, BadgeCheck } from 'lucide-react';
import React from 'react';

const stakeholderData = [
  {
    activity: 'Community Town Hall Meeting',
    method: 'In-person',
    stakeholders: 'Local Residents, NGOs',
    issues: 'Water access concerns',
    resolutions: 'New borehole project approved',
  },
  {
    activity: 'Worker Feedback Survey',
    method: 'Digital Form',
    stakeholders: 'Employees (320)',
    issues: 'Shift timing & transport',
    resolutions: 'Adjusted shift start by 30 mins',
  },
  {
    activity: 'Supplier ESG Workshop',
    method: 'Virtual Webinar',
    stakeholders: 'Tier 1 & 2 Suppliers (48)',
    issues: 'Child labor in supply chain',
    resolutions: 'New audit protocol implemented',
  },
  {
    activity: 'Youth Skills Dialogue',
    method: 'Hybrid Event',
    stakeholders: 'Youth Groups, Schools',
    issues: 'Lack of technical training',
    resolutions: 'Partnership with 3 vocational centers',
  },
  {
    activity: 'Women’s Cooperative Meeting',
    method: 'In-person Focus Group',
    stakeholders: 'Women Entrepreneurs (85)',
    issues: 'Access to microfinance',
    resolutions: 'Linked with 2 financial partners',
  },
];

const StakeholderEngagement = () => {
  return (
    <div className="bg-white border border-gray-200 px-8 py-6 rounded-lg space-y-6">
      {/* Section Title */}
      <h1 className="text-lg font-semibold text-[#044D5E]">
        Stakeholder Engagement
      </h1>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4">
          <p className="text-sm text-gray-600">Total Engagement Activities</p>
          <h1 className="text-3xl font-bold text-gray-800">28</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-green-600">+12 this quarter</span>
            <span className="text-xs text-gray-500">vs last quarter</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4">
          <p className="text-sm text-gray-600">Total issues Resolved</p>
          <h1 className="text-3xl font-bold text-gray-800">24 / 26</h1>
          <div className="flex items-center gap-2">
            <BadgeCheck className="text-green-600" size={18} />
            <span className="text-xs text-green-600 font-medium">92% resolution rate</span>
          </div>
        </div>
      </div>

      {/* Table Title */}
      <h2 className="text-lg font-semibold text-[#044D5E]">
        All Engagement Activities (28)
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
                Engagement Method <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Stakeholders <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Issues Raised <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Resolutions
              </th>
            </tr>
          </thead>
          <tbody>
            {stakeholderData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-teal-900">
                  {item.activity}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.method === 'In-person'
                        ? 'bg-purple-100 text-purple-800'
                        : item.method === 'Virtual Webinar'
                        ? 'bg-blue-100 text-blue-800'
                        : item.method === 'Digital Form'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {item.method}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">{item.stakeholders}</td>
                <td className="py-3 px-4 text-gray-800">{item.issues}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1.5 text-green-700 text-xs font-medium">
                    <BadgeCheck size={14} className="text-green-600" />
                    {item.resolutions}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer Info Bar */}
        <div className="w-full flex items-center justify-between mt-4 px-4 py-2 bg-[#EEF3FF] text-[#1447E6] text-xs rounded-lg">
          <div className="flex items-center gap-2">
            <span>Last updated: April 2025</span>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <span>Next engagement cycle: Q3 2025</span>
          </div>
          <div className="flex items-center gap-2">
            Stakeholder Report <ArrowDownRight size={16} />
          </div>
        </div>

        {/* Bottom Status Banner */}
        <div className="w-full flex items-center justify-between mt-4 p-4 text-[#044D5E] text-xs bg-gradient-to-r from-[#BFEFF8]/50 to-[#B1CA69]/30 rounded-lg">
          <p className="text-lg font-medium">Stakeholder Engagement Status</p>
          <div className="flex items-center gap-2">
            <BadgeCheck color="#ffffff" fill="#044d5e" size={18} />
            <p className="font-semibold">On Track</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholderEngagement;