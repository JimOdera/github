'use client';

import React, { useState } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, Droplets } from 'lucide-react';

const WaterSupplyTreatment: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [supplyM3, setSupplyM3] = useState('');
  const [treatmentM3, setTreatmentM3] = useState('');

  // Official UK Government 2025 factors (kgCO₂e per m³)
  const SUPPLY_FACTOR = 0.34400;   // Water supply (mains/potable)
  const TREATMENT_FACTOR = 0.70800; // Wastewater treatment

  const supplyEmissions = supplyM3 ? parseFloat(supplyM3) * SUPPLY_FACTOR / 1000 : 0;
  const treatmentEmissions = treatmentM3 ? parseFloat(treatmentM3) * TREATMENT_FACTOR / 1000 : 0;

  const isSupplyValid = supplyM3 && parseFloat(supplyM3) > 0;
  const isTreatmentValid = treatmentM3 && parseFloat(treatmentM3) > 0;

  const handleAddSupply = () => {
    if (!isSupplyValid) return;

    onAddEntry({
      category: 'Water supply & treatment',
      details: `Water supply: ${parseFloat(supplyM3).toLocaleString()} m³`,
      result: Number(supplyEmissions.toFixed(6)),
    });

    setSupplyM3('');
  };

  const handleAddTreatment = () => {
    if (!isTreatmentValid) return;

    onAddEntry({
      category: 'Water supply & treatment',
      details: `Wastewater treatment: ${parseFloat(treatmentM3).toLocaleString()} m³`,
      result: Number(treatmentEmissions.toFixed(6)),
    });

    setTreatmentM3('');
  };

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
        <Droplets className="w-5 h-5 text-[#044D5E]" />
        Water Supply & Treatment Emissions
      </h3>

      {/* Water Supply */}
      <div className="space-y-4 p-6 bg-white border border-gray-200 rounded-xl">
        <div>
          <p className="text-sm font-medium text-gray-800 mb-3">
            Water Supply (m³) <span className="text-red-600">*</span>
          </p>
          <input
            type="number"
            step="0.1"
            min="0"
            value={supplyM3}
            onChange={(e) => setSupplyM3(e.target.value)}
            placeholder="e.g. 1,250"
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition"
          />
          <p className="text-xs text-gray-600 mt-2">
            Total volume of potable/mains water used · Factor: <strong>0.344 kgCO₂e per m³</strong>
          </p>
        </div>

        {isSupplyValid && (
          <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
            <p className="text-sm text-[#044D5E]">
              <strong>Water Supply:</strong> {parseFloat(supplyM3).toLocaleString()} m³ →{' '}
              <span className="font-mono font-bold">{supplyEmissions.toFixed(6)} tCO₂e</span>
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddSupply}
          disabled={!isSupplyValid}
          className={`w-full py-3 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
            isSupplyValid
              ? 'bg-[#044D5E] hover:bg-[#044D5E]/90 shadow-md'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <Plus size={18} />
          Add Water Supply Emissions
        </button>
      </div>

      {/* Wastewater Treatment */}
      <div className="space-y-4 p-6 bg-white border border-gray-200 rounded-xl">
        <div>
          <p className="text-sm font-medium text-gray-800 mb-3">
            Wastewater Treatment (m³) <span className="text-red-600">*</span>
          </p>
          <input
            type="number"
            step="0.1"
            min="0"
            value={treatmentM3}
            onChange={(e) => setTreatmentM3(e.target.value)}
            placeholder="e.g. 1,100"
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition"
          />
          <p className="text-xs text-gray-600 mt-2">
            Volume of wastewater sent for treatment · Factor: <strong>0.708 kgCO₂e per m³</strong>
          </p>
        </div>

        {isTreatmentValid && (
          <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
            <p className="text-sm text-[#044D5E]">
              <strong>Wastewater Treatment:</strong> {parseFloat(treatmentM3).toLocaleString()} m³ →{' '}
              <span className="font-mono font-bold">{treatmentEmissions.toFixed(6)} tCO₂e</span>
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddTreatment}
          disabled={!isTreatmentValid}
          className={`w-full py-3 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
            isTreatmentValid
              ? 'bg-[#044D5E] hover:bg-[#044D5E]/90 shadow-md'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <Plus size={18} />
          Add Wastewater Treatment Emissions
        </button>
      </div>

      <p className="text-xs text-center text-gray-500">
        Source: UK Government GHG Conversion Factors 2025 · You can add supply and treatment separately.
      </p>
    </div>
  );
};

export default WaterSupplyTreatment;