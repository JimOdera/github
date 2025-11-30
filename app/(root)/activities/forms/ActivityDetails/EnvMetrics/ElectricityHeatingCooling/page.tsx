'use client';

import React, { useState } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, ChevronDown, Zap } from 'lucide-react';

const activities = ['Electricity', 'District heat and steam', 'District cooling'] as const;

const ElectricityHeatingCooling: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [activity, setActivity] = useState<typeof activities[number] | ''>('');
  const [country, setCountry] = useState('Kenya'); // ← Default changed to Kenya
  const [amount, setAmount] = useState('');

  const [actOpen, setActOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  const countries = [
    'Kenya', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands',
    'Sweden', 'United States', 'Canada', 'Australia', 'India', 'China', 'Brazil'
  ].sort((a, b) => a === 'Kenya' ? -1 : b === 'Kenya' ? 1 : a.localeCompare(b)); // Kenya always on top

  // 2025 Location-based grid factors (kgCO₂e per kWh)
  const electricityFactors: Record<string, number> = {
    'Kenya': 0.447,        // Kenya 2025 average (mostly geothermal + hydro + some thermal)
    'United Kingdom': 0.20704,
    'Germany': 0.354,
    'France': 0.058,
    'Spain': 0.192,
    'Italy': 0.312,
    'Netherlands': 0.389,
    'Sweden': 0.032,
    'United States': 0.379,
    'Canada': 0.112,
    'Australia': 0.620,
    'India': 0.708,
    'China': 0.581,
    'Brazil': 0.089,
  };

  const districtHeatFactor = 0.170;     // kgCO₂e per kWh – UK average (used globally as proxy)
  const districtCoolingFactor = 0.185;  // kgCO₂e per kWh

  const factor = activity === 'Electricity'
    ? electricityFactors[country] || electricityFactors['Kenya']
    : activity === 'District heat and steam'
      ? districtHeatFactor
      : districtCoolingFactor;

  const unit = activity === 'District cooling' ? 'kWh cooling' : 'kWh';
  const emissionsTonnes = amount && factor ? (parseFloat(amount) * factor) / 1000 : 0;

  const isValid = activity && amount && parseFloat(amount) > 0;

  const handleAdd = () => {
    if (!isValid) return;

    const countryText = activity === 'Electricity' ? ` (${country})` : '';
    const displayAmount = parseFloat(amount).toLocaleString();

    onAddEntry({
      category: 'Electricity Heating and Cooling',
      details: `${activity}${countryText}: ${displayAmount} ${unit}`,
      result: Number(emissionsTonnes.toFixed(6)),
    });

    setActivity('');
    setAmount('');
    setCountry('Kenya'); // reset to Kenya
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
        <Zap className="w-5 h-5 text-yellow-500" />
        Electricity, Heating & Cooling (Scope 2)
      </h3>

      {/* Activity */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">Activity <span className="text-red-600">*</span></p>
        <div
          onClick={() => setActOpen(!actOpen)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            actOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={activity ? 'text-gray-900' : 'text-gray-500'}>
            {activity || 'Select activity'}
          </span>
          <ChevronDown size={18} className={`text-gray-400 transition-transform ${actOpen ? 'rotate-180' : ''}`} />
        </div>
        {actOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {activities.map(act => (
              <div
                key={act}
                onClick={() => {
                  setActivity(act);
                  setActOpen(false);
                }}
                className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer"
              >
                {act}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Country – only for Electricity */}
      {activity === 'Electricity' && (
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">Country <span className="text-red-600">*</span></p>
          <div
            onClick={() => setCountryOpen(!countryOpen)}
            className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
              countryOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="text-gray-900">{country}</span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${countryOpen ? 'rotate-180' : ''}`} />
          </div>
          {countryOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {countries.map(c => (
                <div
                  key={c}
                  onClick={() => {
                    setCountry(c);
                    setCountryOpen(false);
                  }}
                  className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                >
                  <span>{c}</span>
                  {c === 'Kenya' && <span className="text-green-600 text-xs font-medium">← Default</span>}
                  <span className="text-gray-500 text-xs ml-2">
                    {electricityFactors[c]?.toFixed(5) || '—'} kgCO₂e/kWh
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Amount */}
      {activity && (
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">
            Total consumed <span className="text-red-600">*</span> ({unit})
          </p>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 85000"
            className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
          />
          <p className="text-xs text-gray-500 mt-1">
            {activity === 'Electricity' && `Factor: ${factor.toFixed(5)} kgCO₂e/kWh (${country})`}
            {activity === 'District heat and steam' && 'Factor: 0.170 kgCO₂e/kWh (UK average)'}
            {activity === 'District cooling' && 'Factor: 0.185 kgCO₂e/kWh (typical chilled water)'}
          </p>
        </div>
      )}

      {/* Preview */}
      {isValid && (
        <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
          <p className="text-xs text-[#044D5E]">
            <strong>Preview (Scope 2):</strong> {activity}
            {activity === 'Electricity' && ` – ${country}`}
            {' '}– {parseFloat(amount).toLocaleString()} {unit} →{' '}
            <span className="font-mono font-bold text-[#044D5E]">
              {emissionsTonnes.toFixed(6)}
            </span> tCO₂e
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleAdd}
        disabled={!isValid}
        className="w-full py-3 bg-[#044D5E] hover:bg-[#044D5E]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Scope 2 Emissions
      </button>

      <p className="text-xs text-center text-gray-500">
        Kenya default grid factor: 0.447 kgCO₂e/kWh (2025 average)<br />
        Source: UK Government GHG Conversion Factors 2025 + IEA/IRENA 2025 data
      </p>
    </div>
  );
};

export default ElectricityHeatingCooling;