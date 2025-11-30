'use client';

import React, { useState, useMemo } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, ChevronDown, Package } from 'lucide-react';

interface MaterialFactor {
  activity: string;
  wasteType: string;
  factor: number; // kgCO₂e per tonne of material used/purchased
}

const materialFactors: MaterialFactor[] = [
  // === Construction & Minerals ===
  { activity: 'Construction', wasteType: 'Aggregates', factor: 7.77 },
  { activity: 'Construction', wasteType: 'Average construction', factor: 79.27 },
  { activity: 'Construction', wasteType: 'Asbestos', factor: 27.00 },
  { activity: 'Construction', wasteType: 'Asphalt', factor: 39.21 },
  { activity: 'Construction', wasteType: 'Bricks', factor: 241.77 },
  { activity: 'Construction', wasteType: 'Concrete', factor: 131.77 },
  { activity: 'Construction', wasteType: 'Insulation', factor: 1861.77 },
  { activity: 'Construction', wasteType: 'Plasterboard', factor: 120.05 },
  { activity: 'Construction', wasteType: 'Wood', factor: 312.61 },
  { activity: 'Construction', wasteType: 'Glass', factor: 843.00 },

  // === Organic & Food ===
  { activity: 'Organic', wasteType: 'Clothing', factor: 22310.00 },
  { activity: 'Organic', wasteType: 'Food and drink', factor: 3701.40 },
  { activity: 'Organic', wasteType: 'Garden waste', factor: 113.31 },
  { activity: 'Organic', wasteType: 'Mixed food & garden waste', factor: 116.13 },

  // === Electrical & WEEE ===
  { activity: 'Electrical items', wasteType: 'WEEE - fridges & freezers', factor: 3814.37 },
  { activity: 'Electrical items', wasteType: 'WEEE - large', factor: 537.24 },
  { activity: 'Electrical items', wasteType: 'WEEE - mixed', factor: 1148.42 },
  { activity: 'Electrical items', wasteType: 'WEEE - small', factor: 1759.60 },
  { activity: 'Electrical items', wasteType: 'Batteries', factor: 12119.21 },

  // === Metals ===
  { activity: 'Metal', wasteType: 'Aluminium cans & foil', factor: 9122.64 },
  { activity: 'Metal', wasteType: 'Mixed cans', factor: 5204.56 },
  { activity: 'Metal', wasteType: 'Scrap metal', factor: 3567.60 },
  { activity: 'Metal', wasteType: 'Steel cans', factor: 3000.64 },

  // === Plastics ===
  { activity: 'Plastic', wasteType: 'Average plastics', factor: 3116.29 },
  { activity: 'Plastic', wasteType: 'Average plastic film', factor: 2574.16 },
  { activity: 'Plastic', wasteType: 'Average plastic rigid', factor: 3276.71 },
  { activity: 'Plastic', wasteType: 'HDPE', factor: 3269.84 },
  { activity: 'Plastic', wasteType: 'LDPE & LLDPE', factor: 2600.64 },
  { activity: 'Plastic', wasteType: 'PET', factor: 4032.39 },
  { activity: 'Plastic', wasteType: 'PP', factor: 3104.73 },
  { activity: 'Plastic', wasteType: 'PS', factor: 3777.95 },
  { activity: 'Plastic', wasteType: 'PVC', factor: 3413.08 },

  // === Paper & Board ===
  { activity: 'Paper', wasteType: 'Paper & board', factor: 919.40 },
  { activity: 'Paper', wasteType: 'Mixed paper & board', factor: 853.57 },
  { activity: 'Paper', wasteType: 'Cardboard', factor: 750.26 },

  // === Other ===
  { activity: 'Other', wasteType: 'Tyres', factor: 3335.57 },
];

const activityOrder = ['Construction', 'Organic', 'Electrical items', 'Metal', 'Plastic', 'Paper', 'Other'] as const;

const MaterialUse: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [activity, setActivity] = useState<string>('');
  const [wasteType, setWasteType] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const [actOpen, setActOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  const typeOptions = useMemo(() => {
    if (!activity) return [];
    return materialFactors
      .filter(f => f.activity === activity)
      .map(f => f.wasteType);
  }, [activity]);

  const selected = materialFactors.find(f => f.activity === activity && f.wasteType === wasteType);
  const factorKg = selected?.factor || 0;
  const emissionsTonnes = amount && factorKg ? (parseFloat(amount) * factorKg) / 1000 : 0;

  const isValid = activity && wasteType && amount && parseFloat(amount) > 0 && factorKg > 0;

  const handleAdd = () => {
    if (!isValid || !selected) return;

    onAddEntry({
      category: 'Material use',
      details: `${wasteType} – ${activity} | ${parseFloat(amount).toLocaleString()} tonnes`,
      result: Number(emissionsTonnes.toFixed(6)),
    });

    setActivity('');
    setWasteType('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
        <Package className="w-5 h-5" />
        Purchased Materials & Goods Emissions (Scope 3)
      </h3>

      {/* Activity */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">Material Category <span className="text-red-600">*</span></p>
        <div
          onClick={() => setActOpen(!actOpen)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            actOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={activity ? 'text-gray-900' : 'text-gray-500'}>
            {activity || 'Select category'}
          </span>
          <ChevronDown size={18} className={`text-gray-400 transition-transform ${actOpen ? 'rotate-180' : ''}`} />
        </div>
        {actOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {activityOrder.map(a => (
              <div
                key={a}
                onClick={() => {
                  setActivity(a);
                  setWasteType('');
                  setActOpen(false);
                }}
                className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer"
              >
                {a}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Waste/Material Type */}
      {activity && typeOptions.length > 0 && (
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">Specific Material <span className="text-red-600">*</span></p>
          <div
            onClick={() => setTypeOpen(!typeOpen)}
            className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
              typeOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={wasteType ? 'text-gray-900' : 'text-gray-500'}>
              {wasteType || 'Select material'}
            </span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${typeOpen ? 'rotate-180' : ''}`} />
          </div>
          {typeOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {typeOptions.map(t => (
                <div
                  key={t}
                  onClick={() => {
                    setWasteType(t);
                    setTypeOpen(false);
                  }}
                  className="px-4 py-3 text-xs hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                >
                  <span>{t}</span>
                  <span className="text-gray-500 text-xs">
                    {materialFactors.find(f => f.wasteType === t)?.factor.toFixed(0)} kgCO₂e/t
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Amount in tonnes */}
      {wasteType && selected && (
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">
            Quantity purchased/used <span className="text-red-600">*</span> (tonnes)
          </p>
          <input
            type="number"
            step="0.001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 45.5"
            className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
          />
          <p className="text-xs text-gray-500 mt-1">
            Total mass of material purchased or used during the reporting period
          </p>
        </div>
      )}

      {/* Live Preview */}
      {isValid && selected && (
        <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
          <p className="text-xs text-[#044D5E]">
            <strong>Preview:</strong> {wasteType} ({activity}) – {parseFloat(amount).toLocaleString()} tonnes →{' '}
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
        Add to Calculated Emissions
      </button>

      <p className="text-xs text-gray-500">
        Source: UK Government GHG Conversion Factors 2025 – Purchased goods & materials (cradle-to-gate)
      </p>
    </div>
  );
};

export default MaterialUse;