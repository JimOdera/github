'use client';

import React, { useState } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, ChevronDown, Zap } from 'lucide-react';

const activities = ['T&D - electricity', 'Distribution - district heat & steam'] as const;

const TransmissionDistribution: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [activity, setActivity] = useState<typeof activities[number] | ''>('');
  const [amountKWh, setAmountKWh] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Official UK Government GHG Conversion Factors 2025
  // These are **per kWh consumed** (not MWh) – as per your confirmed values
  const factors: Record<typeof activities[number], number> = {
    'T&D - electricity': 0.02005,           // kgCO₂e per kWh (T&D losses – UK average)
    'Distribution - district heat & steam': 0.00908, // kgCO₂e per kWh
  };

  const factor = activity ? factors[activity] : 0;
  const unit = 'kWh';

  // Convert kWh × kgCO₂e/kWh → tonnes CO₂e
  const calculatedTonnes = amountKWh && factor ? (parseFloat(amountKWh) * factor) / 1000 : 0;

  const isValid = activity && amountKWh && parseFloat(amountKWh) > 0;

  const handleAdd = () => {
    if (!isValid) return;

    const displayAmount = parseFloat(amountKWh).toLocaleString();

    onAddEntry({
      category: 'Transmission & distribution losses',
      details: `${activity}: ${displayAmount} kWh consumed`,
      result: Number(calculatedTonnes.toFixed(6)),
    });

    setActivity('');
    setAmountKWh('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
        <Zap className="w-5 h-5 text-yellow-600" />
        Transmission & Distribution Losses (Scope 3)
      </h3>

      {/* Activity Dropdown */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">
          Activity <span className="text-red-600">*</span>
        </p>
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            dropdownOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={activity ? 'text-gray-900' : 'text-gray-500'}>
            {activity || 'Select activity'}
          </span>
          <ChevronDown size={18} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </div>

        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {activities.map((act) => (
              <div
                key={act}
                onClick={() => {
                  setActivity(act);
                  setDropdownOpen(false);
                  setAmountKWh('');
                }}
                className="px-4 py-3 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              >
                <span>{act}</span>
                <span className="text-gray-500 text-xs">
                  {factors[act].toFixed(5)} kgCO₂e/kWh
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Amount in kWh */}
      {activity && (
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">
            Total energy consumed <span className="text-red-600">*</span> (kWh)
          </p>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amountKWh}
            onChange={(e) => setAmountKWh(e.target.value)}
            placeholder="e.g. 250000"
            className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
          />
          <p className="text-xs text-gray-500 mt-1">
            Use your total electricity (or heat) consumption in kWh · Factor: <strong>{factor.toFixed(5)} kgCO₂e per kWh</strong>
          </p>
        </div>
      )}

      {/* Live Preview */}
      {isValid && (
        <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
          <p className="text-xs text-[#044D5E]">
            <strong>Preview:</strong> {activity} – {parseFloat(amountKWh).toLocaleString()} kWh →{' '}
            <span className="font-mono font-bold text-[#044D5E]">
              {calculatedTonnes.toFixed(6)}
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
        Add T&D Losses
      </button>

      <p className="text-xs text-center text-gray-500">
        Source: UK Government GHG Conversion Factors 2025 · Scope 3 Category 3 (Fuel- and energy-related activities)
      </p>
    </div>
  );
};

export default TransmissionDistribution;