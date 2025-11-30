'use client';

import React, { useState, useEffect } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, ChevronDown, Fuel } from 'lucide-react';

interface WTTFactor {
  type: 'Gaseous fuels' | 'Liquid fuels' | 'Solid fuels';
  fuel: string;
  unit: 'litres' | 'cubic metres' | 'tonnes';
  factor: number; // kgCO₂e per unit
}

const wttFactors: WTTFactor[] = [
  // === GASEOUS FUELS ===
  { type: 'Gaseous fuels', fuel: 'Compressed Natural Gas (CNG)', unit: 'litres', factor: 0.08516 },
  { type: 'Gaseous fuels', fuel: 'Liquefied Natural Gas (LNG)', unit: 'litres', factor: 0.39688 },
  { type: 'Gaseous fuels', fuel: 'Liquefied petroleum gas (LPG)', unit: 'litres', factor: 0.19018 },
  { type: 'Gaseous fuels', fuel: 'Natural gas', unit: 'cubic metres', factor: 0.26299 },
  { type: 'Gaseous fuels', fuel: 'Natural gas (100% mineral blend)', unit: 'cubic metres', factor: 0.26299 },
  { type: 'Gaseous fuels', fuel: 'Other petroleum gas', unit: 'litres', factor: 0.11654 },

  // === LIQUID FUELS ===
  { type: 'Liquid fuels', fuel: 'Aviation spirit', unit: 'litres', factor: 0.58166 },
  { type: 'Liquid fuels', fuel: 'Aviation turbine fuel (kerosene)', unit: 'litres', factor: 0.52644 },
  { type: 'Liquid fuels', fuel: 'Burning oil (kerosene)', unit: 'litres', factor: 0.52835 },
  { type: 'Liquid fuels', fuel: 'Diesel (average biofuel blend)', unit: 'litres', factor: 0.61015 },
  { type: 'Liquid fuels', fuel: 'Diesel (100% fossil)', unit: 'litres', factor: 0.62611 },
  { type: 'Liquid fuels', fuel: 'Fuel oil', unit: 'litres', factor: 0.60346 },
  { type: 'Liquid fuels', fuel: 'Gas oil', unit: 'litres', factor: 0.63253 },
  { type: 'Liquid fuels', fuel: 'Petrol (average biofuel blend)', unit: 'litres', factor: 0.59344 },
  { type: 'Liquid fuels', fuel: 'Petrol (100% fossil)', unit: 'litres', factor: 0.59732 },
  { type: 'Liquid fuels', fuel: 'Marine gas oil', unit: 'litres', factor: 0.63253 },
  { type: 'Liquid fuels', fuel: 'Marine fuel oil', unit: 'litres', factor: 0.60346 },
  { type: 'Liquid fuels', fuel: 'Residual oil (processed)', unit: 'litres', factor: 0.38830 },
  { type: 'Liquid fuels', fuel: 'Distillate oil (processed)', unit: 'litres', factor: 0.33355 },

  // === SOLID FUELS ===
  { type: 'Solid fuels', fuel: 'Coal (industrial)', unit: 'tonnes', factor: 383.08926 },
  { type: 'Solid fuels', fuel: 'Coal (electricity generation)', unit: 'tonnes', factor: 362.02993 },
  { type: 'Solid fuels', fuel: 'Coal (domestic)', unit: 'tonnes', factor: 431.46914 },
  { type: 'Solid fuels', fuel: 'Coking coal', unit: 'tonnes', factor: 456.00312 },
  { type: 'Solid fuels', fuel: 'Petroleum coke', unit: 'tonnes', factor: 414.84679 },
  { type: 'Solid fuels', fuel: 'Coal (electricity generation – home produced)', unit: 'tonnes', factor: 361.46430 },
];

const types = ['Gaseous fuels', 'Liquid fuels', 'Solid fuels'] as const;

const WellToTankFuels: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [type, setType] = useState<typeof types[number] | ''>('');
  const [fuel, setFuel] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const [typeOpen, setTypeOpen] = useState(false);
  const [fuelOpen, setFuelOpen] = useState(false);

  const fuelOptions = type
    ? wttFactors.filter(f => f.type === type).map(f => f.fuel)
    : [];

  const selected = wttFactors.find(f => f.type === type && f.fuel === fuel);
  const unit = selected?.unit === 'cubic metres' ? 'm³' : selected?.unit || '';
  const factorKg = selected?.factor || 0;
  const emissionsTonnes = amount && factorKg ? (parseFloat(amount) * factorKg) / 1000 : 0;

  const isValid = type && fuel && amount && parseFloat(amount) > 0 && selected;

  const handleAdd = () => {
    if (!isValid || !selected) return;

    onAddEntry({
      category: 'Well-to-Tank (WTT) – Fuels',
      details: `${fuel} | ${parseFloat(amount).toLocaleString()} ${unit}`,
      result: Number(emissionsTonnes.toFixed(6)),
    });

    setType('');
    setFuel('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
        <Fuel className="w-5 h-5 text-orange-600" />
        Well-to-Tank (WTT) Fuel Emissions
      </h3>

      {/* Type */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">Fuel Type <span className="text-red-600">*</span></p>
        <div
          onClick={() => setTypeOpen(!typeOpen)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            typeOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={type ? 'text-gray-900' : 'text-gray-500'}>
            {type || 'Select fuel type'}
          </span>
          <ChevronDown size={18} className={`text-gray-400 transition-transform ${typeOpen ? 'rotate-180' : ''}`} />
        </div>
        {typeOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {types.map(t => (
              <div
                key={t}
                onClick={() => {
                  setType(t);
                  setFuel('');
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

      {/* Fuel */}
      {type && fuelOptions.length > 0 && (
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">Specific Fuel <span className="text-red-600">*</span></p>
          <div
            onClick={() => setFuelOpen(!fuelOpen)}
            className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
              fuelOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={fuel ? 'text-gray-900' : 'text-gray-500'}>
              {fuel || 'Select fuel'}
            </span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${fuelOpen ? 'rotate-180' : ''}`} />
          </div>
          {fuelOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {fuelOptions.map(f => {
                const entry = wttFactors.find(e => e.fuel === f);
                return (
                  <div
                    key={f}
                    onClick={() => {
                      setFuel(f);
                      setFuelOpen(false);
                    }}
                    className="px-4 py-3 text-xs hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  >
                    <span>{f}</span>
                    <span className="text-gray-500 text-xs">
                      {entry?.factor.toFixed(4)} kgCO₂e per {entry?.unit === 'cubic metres' ? 'm³' : entry?.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Amount */}
      {fuel && selected && (
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">
            Quantity <span className="text-red-600">*</span> ({unit})
          </p>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 25000"
            className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
          />
        </div>
      )}

      {/* Preview */}
      {isValid && selected && (
        <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
          <p className="text-xs text-[#044D5E]">
            <strong>WTT Preview:</strong> {fuel} – {parseFloat(amount).toLocaleString()} {unit} →{' '}
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
        Add WTT Emissions
      </button>

      <p className="text-xs text-center text-gray-500">
        Source: UK Government GHG Conversion Factors 2025 · Scope 3 – Fuel- and energy-related activities (WTT)
      </p>
    </div>
  );
};

export default WellToTankFuels;