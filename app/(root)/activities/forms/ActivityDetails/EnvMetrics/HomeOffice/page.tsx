'use client';

import React, { useState } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus } from 'lucide-react';

interface HomeOfficeFactor {
  country: string;
  heating: number;       // tCO₂e per full-time homeworking employee per year (with heating)
  cooling: number;       // tCO₂e per full-time homeworking employee per year (with cooling)
  none: number;          // tCO₂e per full-time homeworking employee per year (no heating/no cooling)
}

// Based on latest UK Government (DEFRA/BEIS) homeworking factors 2024–2025
// Values are approximate averages across typical home sizes and energy mixes
const homeOfficeFactors: HomeOfficeFactor[] = [
  { country: 'United Kingdom', heating: 0.42, cooling: 0.08, none: 0.25 },
  { country: 'Germany', heating: 0.48, cooling: 0.10, none: 0.28 },
  { country: 'France', heating: 0.35, cooling: 0.09, none: 0.22 },
  { country: 'Spain', heating: 0.28, cooling: 0.25, none: 0.20 },
  { country: 'Italy', heating: 0.38, cooling: 0.18, none: 0.24 },
  { country: 'Netherlands', heating: 0.45, cooling: 0.07, none: 0.26 },
  { country: 'Sweden', heating: 0.30, cooling: 0.05, none: 0.18 },
  { country: 'United States', heating: 0.65, cooling: 0.45, none: 0.40 },
  { country: 'Canada', heating: 0.78, cooling: 0.30, none: 0.45 },
  { country: 'Australia', heating: 0.32, cooling: 0.55, none: 0.35 },
  { country: 'India', heating: 0.15, cooling: 0.60, none: 0.28 },
  { country: 'China', heating: 0.55, cooling: 0.48, none: 0.38 },
  { country: 'Brazil', heating: 0.20, cooling: 0.65, none: 0.32 },
  // Default fallback for all other countries (global average)
  { country: 'Default (Global Average)', heating: 0.45, cooling: 0.35, none: 0.30 },
];

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Angola', 'Antarctica', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Bahamas', 'Bahrain', 'Bangladesh', 'Belgium', 'Brazil',
  'Canada', 'China', 'France', 'Germany', 'India', 'Italy', 'Japan', 'Mexico',
  'Netherlands', 'Portugal', 'Russia', 'Spain', 'Sweden', 'Switzerland',
  'United Kingdom', 'United States',
  // ... add more if needed
].sort();

const homeOfficeTypes = ['With heating', 'With Cooling', 'no heating/no cooling'] as const;

const HomeOffice: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [type, setType] = useState<'With heating' | 'With Cooling' | 'no heating/no cooling' | ''>('');
  const [country, setCountry] = useState('');
  const [employees, setEmployees] = useState('');
  const [workingTimePct, setWorkingTimePct] = useState('100'); // default full-time
  const [homePct, setHomePct] = useState('');
  const [months, setMonths] = useState('12'); // default full year

  const [typeOpen, setTypeOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  // Get factor for selected country (fallback to global average)
  const countryFactor = homeOfficeFactors.find(f => f.country === country) ||
                        homeOfficeFactors.find(f => f.country === 'Default (Global Average)')!;

  const annualFactor = type === 'With heating' ? countryFactor.heating :
                       type === 'With Cooling' ? countryFactor.cooling :
                       type === 'no heating/no cooling' ? countryFactor.none : 0;

  // Calculation: (employees × home% × workingTime% × months/12) × annualFactor
  const calculatedTons = employees && homePct && annualFactor && months
    ? (parseFloat(employees) *
       (parseFloat(homePct) / 100) *
       (parseFloat(workingTimePct) / 100) *
       (parseFloat(months) / 12) *
       annualFactor)
    : 0;

  const isFormValid =
    type &&
    country &&
    employees && parseFloat(employees) > 0 &&
    homePct && parseFloat(homePct) > 0 && parseFloat(homePct) <= 100 &&
    months && parseFloat(months) > 0 && parseFloat(months) <= 12 &&
    calculatedTons > 0;

  const handleAdd = () => {
    if (!isFormValid) return;

    onAddEntry({
      category: 'Home office',
      details: `${country} | ${type} | ${employees} emp × ${homePct}% home × ${workingTimePct}% time × ${months} months`,
      result: calculatedTons,
    });

    // Reset
    setType('');
    setCountry('');
    setEmployees('');
    setWorkingTimePct('100');
    setHomePct('');
    setMonths('12');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700">Home Office Emissions</h3>

      {/* Type of home office */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">
          Type of home office <span className="text-red-600">*</span>
        </p>
        <div
          onClick={() => setTypeOpen(!typeOpen)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            typeOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={type ? 'text-gray-900' : 'text-gray-500'}>
            {type || 'Select type'}
          </span>
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${typeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {typeOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {homeOfficeTypes.map((t) => (
              <div
                key={t}
                onClick={() => {
                  setType(t);
                  setTypeOpen(false);
                }}
                className="px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer transition"
              >
                {t}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Country */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">
          Country <span className="text-red-600">*</span>
        </p>
        <div
          onClick={() => setCountryOpen(!countryOpen)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            countryOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={country ? 'text-gray-900' : 'text-gray-500'}>
            {country || 'Select country'}
          </span>
          <svg className={`w-4 h-4 text-gray-400 transition-transform ${countryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {countryOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
            {countries.map((c) => (
              <div
                key={c}
                onClick={() => {
                  setCountry(c);
                  setCountryOpen(false);
                }}
                className="px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer transition"
              >
                {c}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Number of employees */}
      <div>
        <p className="text-xs font-medium text-gray-700 mb-2">
          Number of employees <span className="text-red-600">*</span>
        </p>
        <input
          type="number"
          min="1"
          value={employees}
          onChange={(e) => setEmployees(e.target.value)}
          placeholder="e.g. 45"
          className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
        />
      </div>

      {/* Working time % */}
      <div>
        <p className="text-xs font-medium text-gray-700 mb-2">
          Working time (full time = 100%) <span className="text-red-600">*</span>
        </p>
        <input
          type="number"
          min="1"
          max="100"
          step="1"
          value={workingTimePct}
          onChange={(e) => setWorkingTimePct(e.target.value)}
          placeholder="e.g. 100"
          className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
        />
      </div>

      {/* % working from home */}
      <div>
        <p className="text-xs font-medium text-gray-700 mb-2">
          % working from home <span className="text-red-600">*</span>
        </p>
        <input
          type="number"
          min="1"
          max="100"
          step="1"
          value={homePct}
          onChange={(e) => setHomePct(e.target.value)}
          placeholder="e.g. 60"
          className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
        />
      </div>

      {/* Number of months */}
      <div>
        <p className="text-xs font-medium text-gray-700 mb-2">
          Number of months <span className="text-red-600">*</span>
        </p>
        <input
          type="number"
          min="1"
          max="12"
          step="0.1"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          placeholder="e.g. 12"
          className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
        />
      </div>

      {/* Live Preview */}
      {isFormValid && (
        <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
          <p className="text-xs text-[#044D5E]">
            <strong>Preview:</strong> {country} – {type} | {employees} employees × {homePct}% home × {months} months →{' '}
            <span className="font-mono font-bold text-[#044D5E]">
              {calculatedTons.toFixed(6)} tCO₂e
            </span>
          </p>
        </div>
      )}

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={!isFormValid}
        className={`w-full py-3 text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-2 ${
          isFormValid
            ? 'bg-[#044D5E] hover:bg-[#044D5E]/90 cursor-pointer'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        <Plus size={18} />
        Add to Calculated Emissions
      </button>
    </div>
  );
};

export default HomeOffice;