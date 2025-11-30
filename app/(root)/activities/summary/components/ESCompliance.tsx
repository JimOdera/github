// app/projects/summary/components/ESCompliance.tsx
import { ArrowUpDown, ArrowDownRight, BadgeCheck } from 'lucide-react';
import React from 'react';

const esComplianceData = [
  {
    activity: 'Air Emissions Monitoring',
    validLicenses: '4/4',
    nonCompliant: 0,
    compliantChecks: 48,
    legalCompliant: ['NEMA', 'IFC PS 3'],
    sdgs: '13, 15',
  },
  {
    activity: 'Waste Water Discharge Permit',
    validLicenses: '12/12',
    nonCompliant: 1,
    compliantChecks: 36,
    legalCompliant: ['NEMA', 'Local Law 2018'],
    sdgs: '6, 14',
  },
  {
    activity: 'Hazardous Waste Management',
    validLicenses: '8/8',
    nonCompliant: 0,
    compliantChecks: 72,
    legalCompliant: ['NEMA', 'IFC PS 6', 'Basel Convention'],
    sdgs: '12',
  },
  {
    activity: 'Biodiversity Offset Program',
    validLicenses: '3/3',
    nonCompliant: 0,
    compliantChecks: 18,
    legalCompliant: ['IFC PS 6', 'Equator Principles'],
    sdgs: '15',
  },
  {
    activity: 'Noise Level Compliance',
    validLicenses: '6/6',
    nonCompliant: 2,
    compliantChecks: 60,
    legalCompliant: ['NEMA', 'WHO Guidelines'],
    sdgs: '11',
  },
];

const ESCompliance = () => {
  return (
    <div className="bg-white border border-gray-200 px-8 py-6 rounded-lg space-y-6">
      {/* Section Title */}
      <h1 className="text-lg font-semibold text-[#044D5E]">
        E&S Compliance
      </h1>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4">
          <p className="text-sm text-gray-600">Active Licenses</p>
          <h1 className="text-3xl font-bold text-gray-800">42</h1>
          <span className="text-xs text-green-600">All valid & current</span>
        </div>

        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4">
          <p className="text-sm text-gray-600">Non-Compliant Incidents</p>
          <h1 className="text-3xl font-bold text-gray-800">3</h1>
          <span className="text-xs text-orange-600">Under review</span>
        </div>

        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4">
          <p className="text-sm text-gray-600">Compliant Checks</p>
          <h1 className="text-3xl font-bold text-gray-800">1,840</h1>
          <span className="text-xs text-green-600">+18% vs last year</span>
        </div>

        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg px-6 py-4">
          <p className="text-sm text-gray-600">Legal Compliance</p>
          <h1 className="text-3xl font-bold text-gray-800">98.2%</h1>
          <div className="flex items-center gap-2">
            <BadgeCheck className="text-green-600" size={18} />
            <span className="text-xs text-green-600 font-medium">
              IFC & NEMA aligned
            </span>
          </div>
        </div>
      </div>

      {/* Table Title */}
      <h2 className="text-lg font-semibold text-[#044D5E]">
        All E&S Compliance Activities (42)
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
                Valid Licenses
              </th>
              <th className="py-3 px-4 font-medium">
                Non-Compliant <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Compliant Checks <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />
              </th>
              <th className="py-3 px-4 font-medium">
                Legal Compliance Frameworks
              </th>
              <th className="py-3 px-4 font-medium">
                Aligned SDGs
              </th>
            </tr>
          </thead>
          <tbody>
            {esComplianceData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-teal-900">
                  {item.activity}
                </td>

                {/* Valid Licenses - now shows count */}
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1.5 text-green-700 font-medium">
                    <BadgeCheck size={16} />
                    {item.validLicenses}
                  </span>
                </td>

                {/* Non-compliant */}
                <td className="py-3 px-4 text-orange-700 font-medium">
                  {item.nonCompliant > 0 ? item.nonCompliant : '—'}
                </td>

                {/* Compliant Checks */}
                <td className="py-3 px-4 text-[#044D5E] font-medium">
                  {item.compliantChecks}
                </td>

                {/* Legal Compliance Frameworks */}
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    {item.legalCompliant.map((framework, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-800"
                      >
                        {framework}
                      </span>
                    ))}
                  </div>
                </td>

                {/* SDGs */}
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
            <span>Last updated: July 2025</span>
            <div className="w-1 h-1 rounded-full bg-gray-400"></div>
            <span>Next audit: Q4 2025</span>
          </div>
          <div className="flex items-center gap-2">
            E&S Compliance Report <ArrowDownRight size={16} />
          </div>
        </div>

        {/* Bottom Status Banner */}
        <div className="w-full flex items-center justify-between mt-4 p-4 text-[#044D5E] text-xs bg-gradient-to-r from-[#BFEFF8]/50 to-[#B1CA69]/30 rounded-lg">
          <p className="text-lg font-medium">Overall E&S Compliance Status</p>
          <div className="flex items-center gap-2">
            <BadgeCheck color="#ffffff" fill="#044d5e" size={18} />
            <p className="font-semibold">98.2% Compliant</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESCompliance;