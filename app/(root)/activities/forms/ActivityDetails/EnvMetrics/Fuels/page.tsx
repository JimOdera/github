'use client';

import React, { useState, useEffect } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, ChevronDown, Flame } from 'lucide-react';

interface FuelFactor {
  type: 'Gaseous fuels' | 'Liquid fuels' | 'Solid fuels';
  fuel: string;
  unit: 'litres' | 'cubic metres' | 'tonnes';
  factor: number; // kgCO₂e per unit
}

const fuelFactors: FuelFactor[] = [
  // Gaseous fuels
  { type: 'Gaseous fuels', fuel: 'Natural gas', unit: 'cubic metres', factor: 2.02266 },
  { type: 'Gaseous fuels', fuel: 'Natural gas (100% mineral blend)', unit: 'cubic metres', factor: 2.03017 },
  { type: 'Gaseous fuels', fuel: 'Compressed Natural Gas (CNG)', unit: 'litres', factor: 0.44327 },
  { type: 'Gaseous fuels', fuel: 'Liquefied Natural Gas (LNG)', unit: 'litres', factor: 1.15041 },
  { type: 'Gaseous fuels', fuel: 'Liquefied petroleum gas (LPG)', unit: 'litres', factor: 1.55537 },
  { type: 'Gaseous fuels', fuel: 'Other petroleum gas', unit: 'litres', factor: 0.95279 },

  // Liquid fuels
  { type: 'Liquid fuels', fuel: 'Aviation spirit', unit: 'litres', factor: 2.29082 },
  { type: 'Liquid fuels', fuel: 'Aviation turbine fuel', unit: 'litres', factor: 2.54310 },
  { type: 'Liquid fuels', fuel: 'Burning oil', unit: 'litres', factor: 2.54039 },
  { type: 'Liquid fuels', fuel: 'Diesel (average biofuel blend)', unit: 'litres', factor: 2.54603 },
  { type: 'Liquid fuels', fuel: 'Diesel (100% mineral diesel)', unit: 'litres', factor: 2.68787 },
  { type: 'Liquid fuels', fuel: 'Fuel oil', unit: 'litres', factor: 3.18317 },
  { type: 'Liquid fuels', fuel: 'Gas oil', unit: 'litres', factor: 2.75776 },
  { type: 'Liquid fuels', fuel: 'Lubricants', unit: 'litres', factor: 2.77540 },
  { type: 'Liquid fuels', fuel: 'Naphtha', unit: 'litres', factor: 3.12204 },
  { type: 'Liquid fuels', fuel: 'Petrol (average biofuel blend)', unit: 'litres', factor: 2.16802 },
  { type: 'Liquid fuels', fuel: 'Petrol (100% mineral petrol)', unit: 'litres', factor: 2.31467 },
  { type: 'Liquid fuels', fuel: 'Processed fuel oils - residual oil', unit: 'litres', factor: 3.18317 },
  { type: 'Liquid fuels', fuel: 'Processed fuel oils - distillate oil', unit: 'litres', factor: 2.75776 },
  { type: 'Liquid fuels', fuel: 'Refinery miscellaneous', unit: 'litres', factor: 3.18317 },
  { type: 'Liquid fuels', fuel: 'Waste oils', unit: 'litres', factor: 2.77540 },
  { type: 'Liquid fuels', fuel: 'Marine gas oil', unit: 'litres', factor: 3.18317 },
  { type: 'Liquid fuels', fuel: 'Marine fuel oil', unit: 'litres', factor: 3.18317 },

  // Solid fuels (per tonne)
  { type: 'Solid fuels', fuel: 'Coal (industrial)', unit: 'tonnes', factor: 2380.01 },
  { type: 'Solid fuels', fuel: 'Coal (electricity generation)', unit: 'tonnes', factor: 2222.94 },
  { type: 'Solid fuels', fuel: 'Coal (electricity generation - home produced coal only)', unit: 'tonnes', factor: 2219.47 },
  { type: 'Solid fuels', fuel: 'Coal (domestic)', unit: 'tonnes', factor: 2883.26 },
  { type: 'Solid fuels', fuel: 'Coking coal', unit: 'tonnes', factor: 3222.04 },
  { type: 'Solid fuels', fuel: 'Petroleum coke', unit: 'tonnes', factor: 3397.79 },
];

const types = ['Gaseous fuels', 'Liquid fuels', 'Solid fuels'] as const;

const Fuels: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [type, setType] = useState<'' | 'Gaseous fuels' | 'Liquid fuels' | 'Solid fuels'>('');
  const [fuel, setFuel] = useState('');
  const [unit, setUnit] = useState<'' | 'litres' | 'cubic metres' | 'tonnes'>('');
  const [amount, setAmount] = useState('');

  const [typeOpen, setTypeOpen] = useState(false);
  const [fuelOpen, setFuelOpen] = useState(false);

  // Dynamic fuel options based on type
  const fuelOptions = fuelFactors
    .filter(f => f.type === type)
    .map(f => f.fuel);

  // Auto-set unit when fuel is selected
  useEffect(() => {
    if (fuel) {
      const found = fuelFactors.find(f => f.fuel === fuel);
      if (found) setUnit(found.unit);
    } else {
      setUnit('');
    }
  }, [fuel]);

  const factorEntry = fuelFactors.find(f => f.fuel === fuel);
  const kgPerUnit = factorEntry?.factor || 0;
  const calculatedTons = amount && kgPerUnit ? (parseFloat(amount) * kgPerUnit) / 1000 : 0;

  const isValid = type && fuel && unit && amount && parseFloat(amount) > 0;

  const handleAdd = () => {
    if (!isValid) return;

    const displayUnit = unit === 'cubic metres' ? 'm³' : unit;

    onAddEntry({
      category: 'Stationary combustion',
      details: `${fuel} | ${parseFloat(amount).toLocaleString()} ${displayUnit} → ${calculatedTons.toFixed(6)} tCO₂e`,
      result: Number(calculatedTons.toFixed(6)),
    });

    setType('');
    setFuel('');
    setUnit('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Flame className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-medium text-gray-700">Stationary Combustion – Fuels (Scope 1)</h3>
      </div>

      {/* Fuel Category */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">
          Fuel category <span className="text-red-600">*</span>
        </p>
        <div
          onClick={() => setTypeOpen(!typeOpen)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            typeOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={type ? 'text-gray-900' : 'text-gray-500'}>
            {type || 'Select fuel category'}
          </span>
          <ChevronDown size={18} className={`text-gray-400 transition-transform ${typeOpen ? 'rotate-180' : ''}`} />
        </div>
        {typeOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            {types.map(t => (
              <div
                key={t}
                onClick={() => {
                  setType(t);
                  setFuel('');
                  setUnit('');
                  setTypeOpen(false);
                }}
                className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer"
              >
                {t}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Specific Fuel */}
      {type && (
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">
            Specific fuel <span className="text-red-600">*</span>
          </p>
          <div
            onClick={() => setFuelOpen(!fuelOpen)}
            className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
              fuelOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={fuel ? 'text-gray-900' : 'text-gray-500'}>
              {fuel || 'Select specific fuel'}
            </span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${fuelOpen ? 'rotate-180' : ''}`} />
          </div>
          {fuelOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
              {fuelOptions.map(f => {
                const entry = fuelFactors.find(ff => ff.fuel === f);
                return (
                  <div
                    key={f}
                    onClick={() => {
                      setFuel(f);
                      setFuelOpen(false);
                    }}
                    className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  >
                    <span>{f}</span>
                    {entry && (
                      <span className="font-mono text-xs text-gray-500">
                        {entry.factor.toFixed(5)} kgCO₂e/{entry.unit === 'cubic metres' ? 'm³' : entry.unit}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Auto-filled Unit */}
      {fuel && unit && (
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">Unit</p>
          <div className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-300 rounded-lg font-mono text-gray-700">
            {unit === 'cubic metres' ? 'cubic metres (m³)' : unit}
          </div>
        </div>
      )}

      {/* Amount Input */}
      {fuel && (
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">
            Amount consumed ({unit === 'cubic metres' ? 'm³' : unit}) <span className="text-red-600">*</span>
          </p>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="e.g. 15000"
            className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 font-mono"
          />
        </div>
      )}

      {/* Live Preview */}
      {isValid && (
        <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
          <p className="text-xs text-[#044D5E]">
            <strong>Preview:</strong> {fuel} • {parseFloat(amount).toLocaleString()} {unit === 'cubic metres' ? 'm³' : unit} →{' '}
            <span className="font-mono font-bold">{calculatedTons.toFixed(6)}</span> tCO₂e
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Factor: {kgPerUnit.toFixed(5)} kgCO₂e per {unit === 'cubic metres' ? 'm³' : unit}
          </p>
        </div>
      )}

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={!isValid}
        className="w-full py-3 bg-[#044D5E] hover:bg-[#044D5E]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Scope 1 Fuel Emission
      </button>

      <div className="text-xs text-center text-gray-500 space-y-1">
        <p>Source: UK Government GHG Conversion Factors 2025 (Full Dataset)</p>
        <p className="font-medium text-orange-700">
          Includes direct combustion only • WTT (upstream) emissions calculated separately
        </p>
      </div>
    </div>
  );
};

export default Fuels;