'use client';

import React, { useState, useMemo } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, ChevronDown, Truck } from 'lucide-react';

interface FreightFactor {
  category: 'Road' | 'Air, Rail & Sea';
  vehicle: string;
  type: string;
  fuel?: string;
  factor: number; // kgCO₂e per km or per tonne.km
  unit: 'km' | 'tonne.km';
}

const freightFactors: FreightFactor[] = [
  // === ROAD - Vans ===
  { category: 'Road', vehicle: 'Van', type: 'Class I (up to 1.305 t)', fuel: 'Diesel', factor: 0.15, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Class II (1.305 to 1.74 t)', fuel: 'Diesel', factor: 0.19, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Class III (1.74 to 3.5 t)', fuel: 'Diesel', factor: 0.27, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Average (up to 3.5 t)', fuel: 'Diesel', factor: 0.25, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Class I (up to 1.305 t)', fuel: 'Petrol', factor: 0.21, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Class II (1.305 to 1.74 t)', fuel: 'Petrol', factor: 0.21, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Class III (1.74 to 3.5 t)', fuel: 'Petrol', factor: 0.33, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Average (up to 3.5 t)', fuel: 'Petrol', factor: 0.22, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Average (up to 3.5 t)', fuel: 'CNG', factor: 0.25, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Average (up to 3.5 t)', fuel: 'LPG', factor: 0.27, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Average (up to 3.5 t)', fuel: 'Unknown', factor: 0.25, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Class I (up to 1.305 t)', fuel: 'Battery Electric', factor: 0.04, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Class II (1.305 to 1.74 t)', fuel: 'Battery Electric', factor: 0.06, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Class III (1.74 to 3.5 t)', fuel: 'Battery Electric', factor: 0.08, unit: 'km' },
  { category: 'Road', vehicle: 'Van', type: 'Average (up to 3.5 t)', fuel: 'Battery Electric', factor: 0.06, unit: 'km' },

  // === ROAD - HGV ===
  { category: 'Road', vehicle: 'HGV', type: 'Rigid (>3.5 - 7.5 t)', fuel: 'Diesel', factor: 0.48, unit: 'km' },
  { category: 'Road', vehicle: 'HGV', type: 'Rigid (>7.5 - 17 t)', fuel: 'Diesel', factor: 0.59, unit: 'km' },
  { category: 'Road', vehicle: 'HGV', type: 'Rigid (>17 t)', fuel: 'Diesel', factor: 0.96, unit: 'km' },
  { category: 'Road', vehicle: 'HGV', type: 'All rigids', fuel: 'Diesel', factor: 0.80, unit: 'km' },
  { category: 'Road', vehicle: 'HGV', type: 'Articulated (>3.5 - 33 t)', fuel: 'Diesel', factor: 0.78, unit: 'km' },
  { category: 'Road', vehicle: 'HGV', type: 'Articulated (>33 t)', fuel: 'Diesel', factor: 0.92, unit: 'km' },
  { category: 'Road', vehicle: 'HGV', type: 'All artics', fuel: 'Diesel', factor: 0.92, unit: 'km' },

  // === ROAD - HGV Refrigerated ===
  { category: 'Road', vehicle: 'HGV Refrigerated', type: 'Rigid (>3.5 - 7.5 t)', fuel: 'Diesel', factor: 0.57, unit: 'km' },
  { category: 'Road', vehicle: 'HGV Refrigerated', type: 'Rigid (>7.5 - 17 t)', fuel: 'Diesel', factor: 0.70, unit: 'km' },
  { category: 'Road', vehicle: 'HGV Refrigerated', type: 'Rigid (>17 t)', fuel: 'Diesel', factor: 1.15, unit: 'km' },
  { category: 'Road', vehicle: 'HGV Refrigerated', type: 'All rigids', fuel: 'Diesel', factor: 0.95, unit: 'km' },
  { category: 'Road', vehicle: 'HGV Refrigerated', type: 'Articulated (>3.5 - 33 t)', fuel: 'Diesel', factor: 0.90, unit: 'km' },
  { category: 'Road', vehicle: 'HGV Refrigerated', type: 'Articulated (>33 t)', fuel: 'Diesel', factor: 1.07, unit: 'km' },
  { category: 'Road', vehicle: 'HGV Refrigerated', type: 'All artics', fuel: 'Diesel', factor: 1.06, unit: 'km' },
  { category: 'Road', vehicle: 'HGV Refrigerated', type: 'All HGVs', fuel: 'Diesel', factor: 1.01, unit: 'km' },

  // === AIR, RAIL & SEA ===
  { category: 'Air, Rail & Sea', vehicle: 'Freight flights', type: 'Domestic', factor: 2.52, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Freight flights', type: 'Short-haul', factor: 1.17, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Freight flights', type: 'Long-haul', factor: 0.60, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Freight flights', type: 'International', factor: 0.60, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Rail', type: 'Freight train', factor: 0.03, unit: 'tonne.km' },

  // Sea Tankers (average used where exact missing)
  { category: 'Air, Rail & Sea', vehicle: 'Sea tanker', type: 'Crude tanker; Average', factor: 0.008, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Sea tanker', type: 'Products tanker; Average', factor: 0.015, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Sea tanker', type: 'Chemical tanker; Average', factor: 0.015, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Sea tanker', type: 'LNG tanker; Average', factor: 0.01, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Sea tanker', type: 'LPG Tanker; Average', factor: 0.025, unit: 'tonne.km' },

  // Cargo & Container Ships
  { category: 'Air, Rail & Sea', vehicle: 'Cargo ship', type: 'Bulk carrier; Average', factor: 0.008, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Cargo ship', type: 'General cargo; Average', factor: 0.015, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Cargo ship', type: 'Container ship; Average', factor: 0.02, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Cargo ship', type: 'Vehicle transport; Average', factor: 0.04, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Cargo ship', type: 'RoRo-Ferry; Average', factor: 0.05, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Cargo ship', type: 'Large RoRo ferry; Average', factor: 0.38, unit: 'tonne.km' },
  { category: 'Air, Rail & Sea', vehicle: 'Cargo ship', type: 'Refrigerated cargo; All dwt', factor: 0.01, unit: 'tonne.km' },
];

const FreightingGoods: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [category, setCategory] = useState<'Road' | 'Air, Rail & Sea' | ''>('');
  const [vehicle, setVehicle] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [fuel, setFuel] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  const [catOpen, setCatOpen] = useState(false);
  const [vehOpen, setVehOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [fuelOpen, setFuelOpen] = useState(false);

  // Dynamic options
  const vehicleOptions = category === 'Road'
    ? ['Van', 'HGV', 'HGV Refrigerated']
    : ['Freight flights', 'Rail', 'Sea tanker', 'Cargo ship'];

  const typeOptions = useMemo(() => {
    if (!vehicle) return [];
    return [...new Set(freightFactors
      .filter(f => f.category === category && f.vehicle === vehicle)
      .map(f => f.type)
    )];
  }, [category, vehicle]);

  const fuelOptions = useMemo(() => {
    if (!vehicle || !type) return [];
    const opts = freightFactors
      .filter(f => f.category === category && f.vehicle === vehicle && f.type === type && f.fuel)
      .map(f => f.fuel!);
    return [...new Set(opts)];
  }, [category, vehicle, type]);

  const selectedFactor = freightFactors.find(f =>
    f.category === category &&
    f.vehicle === vehicle &&
    f.type === type &&
    (!fuelOptions.length || f.fuel === fuel)
  );

  const unitLabel = selectedFactor?.unit === 'tonne.km' ? 'tonne·km' : 'km';
  const emissionsTonnes = quantity && selectedFactor ? (parseFloat(quantity) * selectedFactor.factor) / 1000 : 0;

  const isValid = category && vehicle && type && quantity && parseFloat(quantity) > 0 && selectedFactor;

  const handleAdd = () => {
    if (!isValid || !selectedFactor) return;

    const fuelText = fuel ? ` (${fuel})` : '';
    const details = `${vehicle} – ${type}${fuelText} | ${quantity} ${unitLabel}`;

    onAddEntry({
      category: 'Freighting goods',
      details,
      result: Number(emissionsTonnes.toFixed(6)),
    });

    setCategory('');
    setVehicle('');
    setType('');
    setFuel('');
    setQuantity('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
        <Truck className="w-5 h-5" />
        Freighting Goods Emissions
      </h3>

      {/* Category */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">Category <span className="text-red-600">*</span></p>
        <div
          onClick={() => setCatOpen(!catOpen)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            catOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={category ? 'text-gray-900' : 'text-gray-500'}>
            {category || 'Select category'}
          </span>
          <ChevronDown size={18} className={`text-gray-400 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
        </div>
        {catOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {(['Road', 'Air, Rail & Sea'] as const).map(c => (
              <div
                key={c}
                onClick={() => {
                  setCategory(c);
                  setVehicle('');
                  setType('');
                  setFuel('');
                  setCatOpen(false);
                }}
                className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer"
              >
                {c}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vehicle */}
      {category && (
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">Vehicle <span className="text-red-600">*</span></p>
          <div
            onClick={() => setVehOpen(!vehOpen)}
            className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
              vehOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={vehicle ? 'text-gray-900' : 'text-gray-500'}>
              {vehicle || 'Select vehicle'}
            </span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${vehOpen ? 'rotate-180' : ''}`} />
          </div>
          {vehOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {vehicleOptions.map(v => (
                <div
                  key={v}
                  onClick={() => {
                    setVehicle(v);
                    setType('');
                    setFuel('');
                    setVehOpen(false);
                  }}
                  className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer"
                >
                  {v}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Type */}
      {vehicle && typeOptions.length > 0 && (
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">Type / Size <span className="text-red-600">*</span></p>
          <div
            onClick={() => setTypeOpen(!typeOpen)}
            className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
              typeOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={type ? 'text-gray-900' : 'text-gray-500'}>
              {type || 'Select type'}
            </span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${typeOpen ? 'rotate-180' : ''}`} />
          </div>
          {typeOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {typeOptions.map(t => (
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
      )}

      {/* Fuel (only when multiple options) */}
      {fuelOptions.length > 1 && type && (
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">Fuel <span className="text-red-600">*</span></p>
          <div
            onClick={() => setFuelOpen(!fuelOpen)}
            className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
              fuelOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={fuel || fuelOptions[0]}>
              {fuel || fuelOptions[0]}
            </span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${fuelOpen ? 'rotate-180' : ''}`} />
          </div>
          {fuelOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {fuelOptions.map(f => (
                <div
                  key={f}
                  onClick={() => {
                    setFuel(f);
                    setFuelOpen(false);
                  }}
                  className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer"
                >
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quantity Input */}
      {selectedFactor && (
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">
            Total {selectedFactor.unit === 'tonne.km' ? 'Tonne-kilometres (tonne·km)' : 'Distance (km)'} <span className="text-red-600">*</span>
          </p>
          <input
            type="number"
            step="0.01"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder={
              selectedFactor.unit === 'tonne.km'
                ? 'e.g. 15000 (weight × distance)'
                : 'e.g. 500'
            }
            className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
          />
          <p className="text-xs text-gray-500 mt-1">
            {selectedFactor.unit === 'tonne.km'
              ? 'Enter total tonne-kilometres (mass in tonnes × distance in km)'
              : 'Enter total vehicle kilometres'}
          </p>
        </div>
      )}

      {/* Preview */}
      {isValid && selectedFactor && (
        <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
          <p className="text-xs text-[#044D5E]">
            <strong>Preview:</strong> {vehicle} – {type}
            {fuel ? ` (${fuel})` : ''} | {parseFloat(quantity).toLocaleString()} {unitLabel} →{' '}
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

export default FreightingGoods;