'use client';
// src/components/WasteDisposal/page.tsx

import React, { useState } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus } from 'lucide-react';

interface WasteFactor {
  type: string;
  factor: number; // kgCO₂e per tonne of waste
}

const wasteFactors: WasteFactor[] = [
  { type: 'Aggregates', factor: 1.2489 },
  { type: 'Asbestos', factor: 5.9277 },
  { type: 'Asphalt', factor: 1.2489 },
  { type: 'Batteries', factor: 85.4344 },
  { type: 'Bricks', factor: 1.2489 },
  { type: 'Clothing', factor: 444.9759 },
  { type: 'Commercial and industrial waste', factor: 458.1763 },
  { type: 'Concrete', factor: 1.2489 },
  { type: 'Glass', factor: 8.9344 },
  { type: 'Household residual waste', factor: 437.3719 },
  { type: 'Insulation', factor: 1.2489 },
  { type: 'Metal: aluminium cans and foil (excl. forming)', factor: 8.9344 },
  { type: 'Metal: mixed cans', factor: 8.9344 },
  { type: 'Metal: scrap metal', factor: 8.9344 },
  { type: 'Metal: steel cans', factor: 8.9344 },
  { type: 'Metals', factor: 1.2643 },
  { type: 'Organic: food and drink waste', factor: 626.9073 },
  { type: 'Organic: garden waste', factor: 578.9916 },
  { type: 'Organic: mixed food and garden waste', factor: 587.3768 },
  { type: 'Paper and board: board', factor: 1041.8361 },
  { type: 'Paper and board: mixed', factor: 1041.8361 },
  { type: 'Paper and board: paper', factor: 1041.8361 },
  { type: 'Plasterboard', factor: 71.95 },
  { type: 'Plastics: average plastic film', factor: 8.9344 },
  { type: 'Plastics: average plastic rigid', factor: 8.9344 },
  { type: 'Plastics: average plastics', factor: 8.9344 },
  { type: 'Plastics: HDPE (incl. forming)', factor: 8.9344 },
  { type: 'Plastics: LDPE and LLDPE (incl. forming)', factor: 8.9344 },
  { type: 'Plastics: PET (incl. forming)', factor: 8.9344 },
  { type: 'Plastics: PP (incl. forming)', factor: 8.9344 },
  { type: 'Plastics: PS (incl. forming)', factor: 8.9344 },
  { type: 'Plastics: PVC (incl. forming)', factor: 8.9344 },
  { type: 'Soils', factor: 17.5923 },
  { type: 'WEEE - fridges and freezers', factor: 8.9864 },
  { type: 'WEEE - large', factor: 8.9864 },
  { type: 'WEEE - mixed', factor: 8.9864 },
  { type: 'WEEE - small', factor: 8.9864 },
  { type: 'Wood', factor: 828.0647 },
].sort((a, b) => a.type.localeCompare(b.type)); // Alphabetical sort for better UX

const WasteDisposal: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [wasteType, setWasteType] = useState<string>('');
  const [amountTonnes, setAmountTonnes] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedFactor = wasteFactors.find((f) => f.type === wasteType)?.factor ?? 0;
  const calculatedTonnesCO2e = amountTonnes ? (selectedFactor * parseFloat(amountTonnes)) / 1000 : 0;
  // ^^^ Divided by 1000 to convert kgCO₂e → tonnes CO₂e

  const handleAdd = () => {
    if (!wasteType || !amountTonnes || parseFloat(amountTonnes) <= 0) return;

    onAddEntry({
      category: 'Waste disposal',
      details: `${wasteType}: ${amountTonnes} tonnes`,
      result: calculatedTonnesCO2e,
    });

    // Reset form
    setWasteType('');
    setAmountTonnes('');
    setDropdownOpen(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700">Waste Disposal Emissions</h3>

      {/* Waste Type Dropdown */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">
          Waste Type <span className="text-red-600">*</span>
        </p>
        <div
          onClick={() => setDropdownOpen((prev) => !prev)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            dropdownOpen
              ? 'border-gray-400 bg-white shadow-sm'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={wasteType ? 'text-gray-900' : 'text-gray-500'}>
            {wasteType || 'Select waste type'}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              dropdownOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
            {wasteFactors.map((item) => (
              <div
                key={item.type}
                onClick={() => {
                  setWasteType(item.type);
                  setDropdownOpen(false);
                }}
                className="px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer transition"
              >
                {item.type}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Amount in tonnes */}
      <div>
        <p className="text-xs font-medium text-gray-700 mb-2">
          Amount <span className="text-red-600">*</span> (tonnes)
        </p>
        <input
          type="number"
          step="0.001"
          min="0"
          value={amountTonnes}
          onChange={(e) => setAmountTonnes(e.target.value)}
          placeholder="e.g. 12.5"
          className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
        />
      </div>

      {/* Live Preview */}
      {wasteType && amountTonnes && parseFloat(amountTonnes) > 0 && (
        <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
          <p className="text-xs text-[#044D5E]">
            <strong>Preview:</strong> {wasteType} – {amountTonnes} tonnes →{' '}
            <span className="font-mono font-bold text-[#044D5E]">
              {calculatedTonnesCO2e.toFixed(6)} tCO₂e
            </span>
          </p>
        </div>
      )}

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={!wasteType || !amountTonnes || parseFloat(amountTonnes) <= 0}
        className="w-full py-3 bg-[#044D5E] hover:bg-[#044D5E]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add to Calculated Emissions
      </button>
    </div>
  );
};

export default WasteDisposal;