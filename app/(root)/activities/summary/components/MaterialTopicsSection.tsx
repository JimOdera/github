// app/projects/summary/components/MaterialTopics.tsx
'use client';

import { ArrowUpDown, ArrowDownRight, BadgeCheck } from 'lucide-react';
import MaterialityTrendChart from '@/app/components/charts/MaterialityTrendChart';
import React from 'react';

const materialData = [
  {
    topic: 'Climate Change',
    source: 'GRI, SASB, Stakeholder Survey',
    totalEntries: 145,
    thisYear: 48,
    verified: true,
    sdgs: '13',
  },
  {
    topic: 'Circular Economy',
    source: 'GRI, Internal Audit, Supplier Feedback',
    totalEntries: 89,
    thisYear: 32,
    verified: true,
    sdgs: '12',
  },
  {
    topic: 'Labour Practice',
    source: 'GRI, Worker Survey, HR Records',
    totalEntries: 203,
    thisYear: 67,
    verified: false,
    sdgs: '8',
  },
  {
    topic: 'Water Stewardship',
    source: 'GRI, CDP Water, Community Input',
    totalEntries: 67,
    thisYear: 19,
    verified: true,
    sdgs: '6, 14',
  },
  {
    topic: 'Diversity & Inclusion',
    source: 'Internal Survey, Employee Feedback',
    totalEntries: 112,
    thisYear: 41,
    verified: true,
    sdgs: '5, 10',
  },
];

const MaterialTopics = () => {
  return (
    <div className="bg-white border border-gray-200 px-8 py-6 rounded-lg space-y-6">
      {/* Section Title */}
      <h1 className="text-lg font-semibold text-[#044D5E]">Material Topics</h1>

      {/* Top Layout: Chart + Card + Sources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart - takes 2 columns on medium+ */}
        <div className="md:col-span-2">
          <MaterialityTrendChart />
        </div>

        {/* Right Column: Summary Card + Assessment Sources */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4">
            <p className="text-sm text-gray-600">Total Material Topics Assessed</p>
            <h1 className="text-3xl font-medium text-gray-800">150</h1>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-600 font-medium">
                +44 vs last year
              </span>
            </div>
          </div>

          {/* Assessment Sources */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Assessment Sources
            </p>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>GRI Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                <span>SASB Framework</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <span>Stakeholder Survey</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                <span>Internal Audit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                <span>CDP & Supplier Feedback</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Title */}
      <h2 className="text-lg font-semibold text-[#044D5E]">
        All Material Topics (5)
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 font-medium">
                Material Topic <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Assessment Source <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Total Entries <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                This year <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Verified <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Aligned SDGs
              </th>
            </tr>
          </thead>
          <tbody>
            {materialData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-teal-900">
                  {item.topic}
                </td>
                <td className="py-3 px-4 text-gray-700 text-xs">
                  {item.source}
                </td>
                <td className="py-3 px-4">{item.totalEntries}</td>
                <td className="py-3 px-4 font-medium text-[#044D5E]">
                  {item.thisYear}
                </td>
                <td className="py-3 px-4">
                  {item.verified ? (
                    <span className="text-green-700 font-medium flex items-center gap-1">
                      <BadgeCheck size={16} /> Yes
                    </span>
                  ) : (
                    <span className="text-yellow-700">Pending</span>
                  )}
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
            <span>Last updated: May 2025</span>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <span>Next materiality review: Q1 2026</span>
          </div>
          <div className="flex items-center gap-2">
            Materiality Report <ArrowDownRight size={16} />
          </div>
        </div>

        {/* Bottom Status Banner */}
        <div className="w-full flex items-center justify-between mt-4 p-4 text-[#044D5E] text-xs bg-gradient-to-r from-[#BFEFF8]/50 to-[#B1CA69]/30 rounded-lg">
          <p className="text-lg font-medium">Materiality Assessment Status</p>
          <div className="flex items-center gap-2">
            <BadgeCheck color="#ffffff" fill="#044d5e" size={18} />
            <p className="font-semibold">Diverse</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialTopics;