// app/projects/summary/components/CustomMetricTracker.tsx
import { ArrowUpDown, ArrowDownRight, BadgeCheck } from 'lucide-react';
import React from 'react';

const customMetrics = [
  {
    name: 'Carbon Credits Retired',
    value: '8,450 tCO₂e',
    target: '10,000 tCO₂e',
    sdgs: '13',
    source: 'Verified Carbon Standard (VCS)',
  },
  {
    name: 'Community Investment',
    value: '$2.8M',
    target: '$3.0M',
    sdgs: '1, 4, 11',
    source: 'Corporate Foundation Budget',
  },
  {
    name: 'Employee Training Hours',
    value: '18,200 hrs',
    target: '20,000 hrs',
    sdgs: '4, 8',
    source: 'HR Learning Platform',
  },
  {
    name: 'Local Supplier Spend',
    value: '68%',
    target: '75%',
    sdgs: '8, 12',
    source: 'Procurement System',
  },
  {
    name: 'Women in Leadership',
    value: '42%',
    target: '50%',
    sdgs: '5, 10',
    source: 'Annual Diversity Report',
  },
];

const CustomMetricTracker = () => {
  return (
    <div className="bg-white border border-gray-200 px-8 py-6 rounded-lg space-y-6">
      {/* Section Title */}
      <h1 className="text-lg font-semibold text-[#044D5E]">
        Custom Metric Tracker
      </h1>

      {/* 2 Large Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3 border border-gray-200 rounded-lg px-8 py-6 bg-gradient-to-br from-[#BFEFF8]/20 to-[#B1CA69]/10">
          <p className="text-sm text-gray-600">Total Value Achieved</p>
          <h1 className="text-4xl font-bold text-[#044D5E]">92.4%</h1>
          <div className="flex items-center gap-2">
            <span className="text-xs text-green-600 font-medium">
              +8.2% vs last year
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border border-gray-200 rounded-lg px-8 py-6 bg-gradient-to-br from-[#B1CA69]/20 to-[#BFEFF8]/10">
          <p className="text-sm text-gray-600">Total Target Progress</p>
          <h1 className="text-4xl font-bold text-[#044D5E]">17 / 20</h1>
          <div className="flex items-center gap-2">
            <BadgeCheck className="text-green-600" size={20} />
            <span className="text-xs text-green-600 font-medium">
              85% on track or achieved
            </span>
          </div>
        </div>
      </div>

      {/* Table Title */}
      <h2 className="text-lg font-semibold text-[#044D5E]">
        All Custom Metrics (20)
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 font-medium">
                Metric Name <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Value
              </th>
              <th className="py-3 px-4 font-medium">
                Target
              </th>
              <th className="py-3 px-4 font-medium">
                Aligned SDGs
              </th>
              <th className="py-3 px-4 font-medium">
                Source / Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {customMetrics.map((item, index) => {
              const progress = parseFloat(item.value) / parseFloat(item.target.replace(/[^0-9.]/g, '')) * 100 || 
                              parseFloat(item.value.replace(/[^0-9.]/g, '')) / parseFloat(item.target.replace(/[^0-9.]/g, '')) * 100;

              return (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-teal-900">
                    {item.name}
                  </td>

                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {item.value}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-700">{item.target}</span>
                      {progress >= 100 ? (
                        <BadgeCheck size={16} className="text-green-600" />
                      ) : progress >= 80 ? (
                        <span className="text-yellow-600 text-xs font-medium">On Track</span>
                      ) : (
                        <span className="text-orange-600 text-xs font-medium">At Risk</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-xs text-gray-600">
                    SDG {item.sdgs}
                  </td>

                  <td className="py-3 px-4 text-xs text-gray-600">
                    {item.source}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer Info Bar */}
        <div className="w-full flex items-center justify-between mt-4 px-4 py-2 bg-[#EEF3FF] text-[#1447E6] text-xs rounded-lg">
          <div className="flex items-center gap-2">
            <span>Last updated: August 2025</span>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <span>Next review: December 2025</span>
          </div>
          <div className="flex items-center gap-2">
            Custom Metrics Report <ArrowDownRight size={16} />
          </div>
        </div>

        {/* Bottom Status Banner */}
        <div className="w-full flex items-center justify-between mt-4 p-4 text-[#044D5E] text-xs bg-gradient-to-r from-[#BFEFF8]/50 to-[#B1CA69]/30 rounded-lg">
          <p className="text-lg font-medium">Custom KPI Performance</p>
          <div className="flex items-center gap-2">
            <BadgeCheck color="#ffffff" fill="#044d5e" size={18} />
            <p className="font-semibold">85% On Track or Achieved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMetricTracker;