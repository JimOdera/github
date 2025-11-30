'use client';

import React, { useState, useMemo } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, ChevronDown } from 'lucide-react';

interface TravelFactor {
  vehicle: string;
  size?: string;
  fuel: string;
  unit: 'passenger.km' | 'km';
  factor: number; // kgCO₂e per unit
}

const travelFactors: TravelFactor[] = [
  // Buses
  { vehicle: 'Bus', size: 'Local bus', fuel: 'Diesel', unit: 'passenger.km', factor: 0.11950 },
  { vehicle: 'Bus', size: 'Local London Bus', fuel: 'Diesel', unit: 'passenger.km', factor: 0.07856 },
  { vehicle: 'Bus', size: 'Average local bus', fuel: 'Diesel', unit: 'passenger.km', factor: 0.10312 },
  { vehicle: 'Bus', size: 'Coach', fuel: 'Diesel', unit: 'passenger.km', factor: 0.02732 },

  // Cars - Petrol
  { vehicle: 'Car', size: 'Small car', fuel: 'Petrol', unit: 'km', factor: 0.13721 },
  { vehicle: 'Car', size: 'Medium car', fuel: 'Petrol', unit: 'km', factor: 0.16637 },
  { vehicle: 'Car', size: 'Large car', fuel: 'Petrol', unit: 'km', factor: 0.20419 },
  { vehicle: 'Car', size: 'Average car', fuel: 'Petrol', unit: 'km', factor: 0.16844 },

  // Cars - Hybrid (non-plug-in)
  { vehicle: 'Car', size: 'Small car', fuel: 'Hybrid', unit: 'km', factor: 0.14836 },
  { vehicle: 'Car', size: 'Medium car', fuel: 'Hybrid', unit: 'km', factor: 0.18659 },
  { vehicle: 'Car', size: 'Large car', fuel: 'Hybrid', unit: 'km', factor: 0.27807 },
  { vehicle: 'Car', size: 'Average car', fuel: 'Hybrid', unit: 'km', factor: 0.17430 },

  // Cars - CNG, LPG, Unknown
  { vehicle: 'Car', size: 'Small car', fuel: 'CNG', unit: 'km', factor: 0.10275 },
  { vehicle: 'Car', size: 'Medium car', fuel: 'CNG', unit: 'km', factor: 0.10698 },
  { vehicle: 'Car', size: 'Large car', fuel: 'CNG', unit: 'km', factor: 0.14480 },
  { vehicle: 'Car', size: 'Average car', fuel: 'CNG', unit: 'km', factor: 0.11558 },
  { vehicle: 'Car', size: 'Medium car', fuel: 'LPG', unit: 'km', factor: 0.17847 },
  { vehicle: 'Car', size: 'Large car', fuel: 'LPG', unit: 'km', factor: 0.23680 },
  { vehicle: 'Car', size: 'Average car', fuel: 'LPG', unit: 'km', factor: 0.17621 },
  { vehicle: 'Car', size: 'Small car', fuel: 'Unknown', unit: 'km', factor: 0.14449 },
  { vehicle: 'Car', size: 'Medium car', fuel: 'Unknown', unit: 'km', factor: 0.17571 },
  { vehicle: 'Car', size: 'Large car', fuel: 'Unknown', unit: 'km', factor: 0.26606 },
  { vehicle: 'Car', size: 'Average car', fuel: 'Unknown', unit: 'km', factor: 0.19754 },

  // PHEV & BEV
  { vehicle: 'Car', size: 'Small car', fuel: 'Plug-in Hybrid Electric', unit: 'km', factor: 0.05860 },
  { vehicle: 'Car', size: 'Medium car', fuel: 'Plug-in Hybrid Electric', unit: 'km', factor: 0.09251 },
  { vehicle: 'Car', size: 'Large car', fuel: 'Plug-in Hybrid Electric', unit: 'km', factor: 0.10515 },
  { vehicle: 'Car', size: 'Average car', fuel: 'Plug-in Hybrid Electric', unit: 'km', factor: 0.09712 },
  { vehicle: 'Car', size: 'Small car', fuel: 'Battery Electric', unit: 'km', factor: 0.04637 },
  { vehicle: 'Car', size: 'Medium car', fuel: 'Battery Electric', unit: 'km', factor: 0.05563 },
  { vehicle: 'Car', size: 'Large car', fuel: 'Battery Electric', unit: 'km', factor: 0.06646 },
  { vehicle: 'Car', size: 'Average car', fuel: 'Battery Electric', unit: 'km', factor: 0.05728 },

  // Ferry
  { vehicle: 'Ferry', size: 'Foot passenger', fuel: 'Unknown', unit: 'passenger.km', factor: 0.01874 },
  { vehicle: 'Ferry', size: 'Car passenger', fuel: 'Unknown', unit: 'passenger.km', factor: 0.12952 },
  { vehicle: 'Ferry', size: 'Average passenger', fuel: 'Unknown', unit: 'passenger.km', factor: 0.11286 },

  // Motorbike
  { vehicle: 'Motorbike', size: 'Small', fuel: 'Unknown', unit: 'km', factor: 0.08277 },
  { vehicle: 'Motorbike', size: 'Medium', fuel: 'Unknown', unit: 'km', factor: 0.10086 },
  { vehicle: 'Motorbike', size: 'Large', fuel: 'Unknown', unit: 'km', factor: 0.13237 },
  { vehicle: 'Motorbike', size: 'Average', fuel: 'Unknown', unit: 'km', factor: 0.11337 },

  // Rail & Tram
  { vehicle: 'Rail', size: 'National rail', fuel: 'Unknown', unit: 'passenger.km', factor: 0.03694 },
  { vehicle: 'Rail', size: 'International rail', fuel: 'Unknown', unit: 'passenger.km', factor: 0.00497 },
  { vehicle: 'Rail', size: 'Light rail and tram', fuel: 'Unknown', unit: 'passenger.km', factor: 0.02991 },
  { vehicle: 'Rail', size: 'London underground', fuel: 'Unknown', unit: 'passenger.km', factor: 0.02750 },

  // Taxi
  { vehicle: 'Taxi', size: 'Regular', fuel: 'Unknown', unit: 'passenger.km', factor: 0.20369 },
  { vehicle: 'Taxi', size: 'Black cab', fuel: 'Unknown', unit: 'passenger.km', factor: 0.31191 },
];

const vehicleGroups = {
  Bus: ['Local bus', 'Local London Bus', 'Average local bus', 'Coach'],
  Car: ['Small car', 'Medium car', 'Large car', 'Average car'],
  Ferry: ['Foot passenger', 'Car passenger', 'Average passenger'],
  Motorbike: ['Small', 'Medium', 'Large', 'Average'],
  Rail: ['National rail', 'International rail', 'Light rail and tram', 'London underground'],
  Taxi: ['Regular', 'Black cab'],
};

const BusinessTravel: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicleType, setVehicleType] = useState<'Bus' | 'Car' | 'Ferry' | 'Motorbike' | 'Rail' | 'Taxi' | ''>('');
  const [vehicleSize, setVehicleSize] = useState<string>('');
  const [fuelType, setFuelType] = useState<string>('');
  const [distance, setDistance] = useState('');

  const [typeOpen, setTypeOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [fuelOpen, setFuelOpen] = useState(false);

  // Dynamic options
  const availableSizes = vehicleType ? vehicleGroups[vehicleType] : [];
  const possibleFuels = useMemo(() => {
    if (!vehicleType || !vehicleSize) return [];
    const matches = travelFactors
      .filter(f => f.vehicle === vehicleType && f.size === vehicleSize)
      .map(f => f.fuel);
    return [...new Set(matches)];
  }, [vehicleType, vehicleSize]);

  const selectedFactor = travelFactors.find(
    f => f.vehicle === vehicleType && f.size === vehicleSize && f.fuel === (fuelType || possibleFuels[0])
  );

  const unit = selectedFactor?.unit === 'passenger.km' ? 'passenger.km' : 'km';
  const factorKg = selectedFactor?.factor || 0;
  const emissionsTonnes = distance && factorKg ? (parseFloat(distance) * factorKg) / 1000 : 0;

  const isValid =
    origin.trim() &&
    destination.trim() &&
    vehicleType &&
    vehicleSize &&
    distance &&
    parseFloat(distance) > 0 &&
    factorKg > 0;

  const handleAdd = () => {
    if (!isValid || !selectedFactor) return;

    const fuelDisplay = possibleFuels.length > 1 ? ` (${fuelType})` : '';
    const unitLabel = unit === 'passenger.km' ? 'pkm' : 'km';

    onAddEntry({
      category: 'Business travel',
      details: `${origin} → ${destination} | ${vehicleSize} (${vehicleType})${fuelDisplay} | ${distance} ${unitLabel}`,
      result: Number(emissionsTonnes.toFixed(6)),
    });

    // Reset
    setOrigin('');
    setDestination('');
    setVehicleType('');
    setVehicleSize('');
    setFuelType('');
    setDistance('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700">Business Travel Emissions</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">Origin <span className="text-red-600">*</span></p>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value.toUpperCase())}
            placeholder="e.g. London"
            className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 font-mono"
          />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">Destination <span className="text-red-600">*</span></p>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value.toUpperCase())}
            placeholder="e.g. Manchester"
            className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 font-mono"
          />
        </div>
      </div>

      {/* Vehicle Type */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">Vehicle Type <span className="text-red-600">*</span></p>
        <div
          onClick={() => setTypeOpen(!typeOpen)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            typeOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={vehicleType ? 'text-gray-900' : 'text-gray-500'}>
            {vehicleType || 'Select type'}
          </span>
          <ChevronDown size={18} className={`text-gray-400 transition-transform ${typeOpen ? 'rotate-180' : ''}`} />
        </div>
        {typeOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
            {(['Bus', 'Car', 'Rail', 'Taxi', 'Ferry', 'Motorbike'] as const).map((t) => (
              <div
                key={t}
                onClick={() => {
                  setVehicleType(t);
                  setVehicleSize('');
                  setFuelType('');
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

      {/* Vehicle Size */}
      {vehicleType && availableSizes.length > 0 && (
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">Size / Route <span className="text-red-600">*</span></p>
          <div
            onClick={() => setSizeOpen(!sizeOpen)}
            className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
              sizeOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={vehicleSize ? 'text-gray-900' : 'text-gray-500'}>
              {vehicleSize || 'Select size'}
            </span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${sizeOpen ? 'rotate-180' : ''}`} />
          </div>
          {sizeOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
              {availableSizes.map((s) => (
                <div
                  key={s}
                  onClick={() => {
                    setVehicleSize(s);
                    setFuelType('');
                    setSizeOpen(false);
                  }}
                  className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Fuel Type - only if multiple choices */}
      {possibleFuels.length > 1 && vehicleSize && (
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">Fuel Type <span className="text-red-600">*</span></p>
          <div
            onClick={() => setFuelOpen(!fuelOpen)}
            className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
              fuelOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={fuelType ? 'text-gray-900' : 'text-gray-500'}>
              {fuelType || possibleFuels[0]}
            </span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${fuelOpen ? 'rotate-180' : ''}`} />
          </div>
          {fuelOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              {possibleFuels.map((f) => (
                <div
                  key={f}
                  onClick={() => {
                    setFuelType(f);
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

      {/* Distance */}
      {selectedFactor && (
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">
            Total distance ({unit === 'passenger.km' ? 'passenger km' : 'km'}) <span className="text-red-600">*</span>
          </p>
          <input
            type="number"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="e.g. 2500"
            className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
          />
        </div>
      )}

      {/* Preview */}
      {isValid && (
        <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
          <p className="text-xs text-[#044D5E]">
            <strong>Preview:</strong> {origin} → {destination} | {vehicleSize} ({vehicleType})
            {possibleFuels.length > 1 && fuelType ? ` • ${fuelType}` : ''}
            {' • '} {distance} {unit === 'passenger.km' ? 'pkm' : 'km'} →{' '}
            <span className="font-mono font-bold">{emissionsTonnes.toFixed(6)}</span> tCO₂e
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

export default BusinessTravel;