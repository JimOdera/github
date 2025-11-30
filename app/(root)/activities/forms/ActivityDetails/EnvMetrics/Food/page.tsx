'use client';

import React, { useState } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, ChevronDown, Utensils } from 'lucide-react';

interface FoodFactor {
  type: string;
  unit: string;
  factor: number; // kgCO₂e per unit
}

const foodFactors: FoodFactor[] = [
  { type: '1 standard breakfast', unit: 'breakfast', factor: 0.84 },
  { type: '1 gourmet breakfast', unit: 'breakfast', factor: 2.33 },
  { type: '1 cold or hot snack', unit: 'hot snack', factor: 2.02 },
  { type: '1 average meal', unit: 'meal', factor: 4.70 },
  { type: 'Non-alcoholic beverage', unit: 'litre', factor: 0.20 },
  { type: 'Alcoholic beverage', unit: 'litre', factor: 1.87 },
  { type: '1 hot snack (burger + frites)', unit: 'hot snack', factor: 2.77 },
  { type: '1 sandwich', unit: 'sandwich', factor: 1.27 },
  { type: 'Meal, vegan', unit: 'meal', factor: 1.69 },
  { type: 'Meal, vegetarian', unit: 'meal', factor: 2.85 },
  { type: 'Meal, with beef', unit: 'meal', factor: 6.93 },
  { type: 'Meal, with chicken', unit: 'meal', factor: 3.39 },
];

const Food: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [foodType, setFoodType] = useState('');
  const [amount, setAmount] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selected = foodFactors.find(f => f.type === foodType);
  const factor = selected?.factor || 0;
  const unit = selected?.unit || '';

  const emissionsTonnes = amount && factor ? parseFloat(amount) * factor : 0;

  const isValid = foodType && amount && parseFloat(amount) > 0 && factor > 0;

  const handleAdd = () => {
    if (!isValid || !selected) return;

    const plural = parseFloat(amount) > 1 ? 's' : '';
    const unitDisplay = unit === 'litre' ? 'litre' : unit;

    onAddEntry({
      category: 'Food & catering',
      details: `${foodType} × ${parseFloat(amount).toLocaleString()} ${unitDisplay}${plural}`,
      result: Number(emissionsTonnes.toFixed(6)),
    });

    setFoodType('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
        <Utensils className="w-5 h-5" />
        Food & Catering Emissions
      </h3>

      {/* Food Type Dropdown */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">
          Food / Drink Item <span className="text-red-600">*</span>
        </p>
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            dropdownOpen
              ? 'border-gray-400 bg-white shadow-sm'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={foodType ? 'text-gray-900' : 'text-gray-500'}>
            {foodType || 'Select item'}
          </span>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
            {foodFactors.map((item) => (
              <div
                key={item.type}
                onClick={() => {
                  setFoodType(item.type);
                  setDropdownOpen(false);
                  setAmount('');
                }}
                className="px-4 py-3 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer transition flex justify-between items-center"
              >
                <span>{item.type}</span>
                <span className="text-gray-500 text-xs">
                  {item.factor.toFixed(2)} kgCO₂e per {item.unit}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unit Display */}
      {foodType && selected && (
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">Unit</p>
          <div className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-300 rounded-lg text-gray-700 font-medium">
            1 {unit}
          </div>
        </div>
      )}

      {/* Amount */}
      {foodType && selected && (
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">
            Quantity <span className="text-red-600">*</span>
 1 = 1 {unit}
          </p>
          <input
            type="number"
            step="0.1"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 120"
            className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
          />
          <p className="text-xs text-gray-500 mt-1">
            Total number of {unit}{parseFloat(amount) > 1 ? 's' : ''} served
          </p>
        </div>
      )}

      {/* Live Preview */}
      {isValid && selected && (
        <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
          <p className="text-xs text-[#044D5E]">
            <strong>Preview:</strong> {foodType} × {parseFloat(amount).toLocaleString()} {unit}{parseFloat(amount) > 1 ? 's' : ''} →{' '}
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
    </div>
  );
};

export default Food;