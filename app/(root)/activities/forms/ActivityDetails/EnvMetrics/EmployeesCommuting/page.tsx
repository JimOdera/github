'use client';

import React, { useState, useMemo } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, ChevronDown, Users } from 'lucide-react';

interface CommuteFactor {
  vehicle: string;
  type: string;
  fuel: string;
  factor: number; // kgCO₂e per passenger-km (or per km for motorbikes)
}

const commuteFactors: CommuteFactor[] = [
  // === BUSES ===
  { vehicle: 'Bus', type: 'Local bus', fuel: 'Unknown', factor: 0.11950 },
  { vehicle: 'Bus', type: 'Local London Bus', fuel: 'Unknown', factor: 0.07856 },
  { vehicle: 'Bus', type: 'Average local bus', fuel: 'Unknown', factor: 0.10312 },
  { vehicle: 'Bus', type: 'Coach', fuel: 'Unknown', factor: 0.02732 },

  // === CARS - Diesel ===
  { vehicle: 'Car', type: 'Small car', fuel: 'Diesel', factor: 0.13721 },
  { vehicle: 'Car', type: 'Medium car', fuel: 'Diesel', factor: 0.16637 },
  { vehicle: 'Car', type: 'Large car', fuel: 'Diesel', factor: 0.20419 },
  { vehicle: 'Car', type: 'Average car', fuel: 'Diesel', factor: 0.16844 },

  // === CARS - Petrol ===
  { vehicle: 'Car', type: 'Small car', fuel: 'Petrol', factor: 0.14836 },
  { vehicle: 'Car', type: 'Medium car', fuel: 'Petrol', factor: 0.18659 },
  { vehicle: 'Car', type: 'Large car', fuel: 'Petrol', factor: 0.27807 },
  { vehicle: 'Car', type: 'Average car', fuel: 'Petrol', factor: 0.17430 },

  // === CARS - Alternative Fuels ===
  { vehicle: 'Car', type: 'Small car', fuel: 'CNG', factor: 0.10275 },
  { vehicle: 'Car', type: 'Medium car', fuel: 'CNG', factor: 0.10698 },
  { vehicle: 'Car', type: 'Large car', fuel: 'CNG', factor: 0.14480 },
  { vehicle: 'Car', type: 'Average car', fuel: 'CNG', factor: 0.11558 },
  { vehicle: 'Car', type: 'Medium car', fuel: 'LPG', factor: 0.17847 },
  { vehicle: 'Car', type: 'Large car', fuel: 'LPG', factor: 0.23680 },
  { vehicle: 'Car', type: 'Average car', fuel: 'LPG', factor: 0.17621 },
  { vehicle: 'Car', type: 'Small car', fuel: 'Unknown', factor: 0.14449 },
  { vehicle: 'Car', type: 'Medium car', fuel: 'Unknown', factor: 0.17571 },
  { vehicle: 'Car', type: 'Large car', fuel: 'Unknown', factor: 0.26606 },
  { vehicle: 'Car', type: 'Average car', fuel: 'Unknown', factor: 0.19754 },

  // === CARS - Plug-in Hybrid & Battery Electric ===
  { vehicle: 'Car', type: 'Small car', fuel: 'Plug-in Hybrid Electric (Petrol)', factor: 0.02235 },
  { vehicle: 'Car', type: 'Medium car', fuel: 'Plug-in Hybrid Electric (Petrol)', factor: 0.07012 },
  { vehicle: 'Car', type: 'Large car', fuel: 'Plug-in Hybrid Electric (Petrol)', factor: 0.07570 },
  { vehicle: 'Car', type: 'Average car', fuel: 'Plug-in Hybrid Electric (Petrol)', factor: 0.06995 },
  { vehicle: 'Car', type: 'Small car', fuel: 'Battery Electric', factor: 0.04637 },
  { vehicle: 'Car', type: 'Medium car', fuel: 'Battery Electric', factor: 0.05563 },
  { vehicle: 'Car', type: 'Large car', fuel: 'Battery Electric', factor: 0.06646 },
  { vehicle: 'Car', type: 'Average car', fuel: 'Battery Electric', factor: 0.05728 },

  // === MOTORBIKES ===
  { vehicle: 'Motorbike', type: 'Small', fuel: 'Unknown', factor: 0.08277 },
  { vehicle: 'Motorbike', type: 'Medium', fuel: 'Unknown', factor: 0.10086 },
  { vehicle: 'Motorbike', type: 'Large', fuel: 'Unknown', factor: 0.13237 },
  { vehicle: 'Motorbike', type: 'Average', fuel: 'Unknown', factor: 0.11337 },

  // === RAIL ===
  { vehicle: 'Rail', type: 'National rail', fuel: 'Unknown', factor: 0.03694 },
  { vehicle: 'Rail', type: 'International rail', fuel: 'Unknown', factor: 0.00497 },
  { vehicle: 'Rail', type: 'Light rail and tram', fuel: 'Unknown', factor: 0.02991 },
  { vehicle: 'Rail', type: 'London underground', fuel: 'Unknown', factor: 0.02750 },

  // === TAXI ===
  { vehicle: 'Taxi', type: 'Regular', fuel: 'Unknown', factor: 0.20369 },
  { vehicle: 'Taxi', type: 'Black cab', fuel: 'Unknown', factor: 0.31191 },
];

const EmployeesCommuting: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [vehicle, setVehicle] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [fuel, setFuel] = useState<string>('');
  const [passengerKm, setPassengerKm] = useState<string>('');

  const [vehOpen, setVehOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [fuelOpen, setFuelOpen] = useState(false);

  // Dynamic options
  const vehicleOptions: string[] = ['Bus', 'Car', 'Motorbike', 'Rail', 'Taxi'];

  const typeOptions = useMemo(() => {
    if (!vehicle) return [];
    return [...new Set(commuteFactors.filter(f => f.vehicle === vehicle).map(f => f.type))];
  }, [vehicle]);

  const fuelOptions = useMemo(() => {
    if (!vehicle || !type) return [];
    const fuels = commuteFactors
      .filter(f => f.vehicle === vehicle && f.type === type)
      .map(f => f.fuel);
    return [...new Set(fuels)];
  }, [vehicle, type]);

  const selectedFactor = commuteFactors.find(
    f => f.vehicle === vehicle && f.type === type && f.fuel === (fuel || fuelOptions[0])
  );

  const emissionsTonnes = passengerKm && selectedFactor
    ? (parseFloat(passengerKm) * selectedFactor.factor) / 1000
    : 0;

  const isValid = vehicle && type && passengerKm && parseFloat(passengerKm) > 0 && selectedFactor;

  const handleAdd = () => {
    if (!isValid || !selectedFactor) return;

    const fuelText = fuelOptions.length > 1 ? ` (${fuel || fuelOptions[0]})` : '';
    const details = `${vehicle} – ${type}${fuelText} | ${parseFloat(passengerKm).toLocaleString()} passenger-km`;

    onAddEntry({
      category: 'Employees commuting',
      details,
      result: Number(emissionsTonnes.toFixed(6)),
    });

    setVehicle('');
    setType('');
    setFuel('');
    setPassengerKm('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700 flex items-center gap-2">
        <Users className="w-5 h-5" />
        Employees Commuting Emissions
      </h3>

      {/* Vehicle */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">Mode of transport <span className="text-red-600">*</span></p>
        <div
          onClick={() => setVehOpen(!vehOpen)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            vehOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={vehicle ? 'text-gray-900' : 'text-gray-500'}>
            {vehicle || 'Select transport mode'}
          </span>
          <ChevronDown size={18} className={`text-gray-400 transition-transform ${vehOpen ? 'rotate-180' : ''}`} />
        </div>
        {vehOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
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

      {/* Type */}
      {vehicle && typeOptions.length > 0 && (
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">Type <span className="text-red-600">*</span></p>
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

      {/* Fuel (only when multiple choices) */}
      {fuelOptions.length > 1 && type && (
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">Fuel / Powertrain <span className="text-red-600">*</span></p>
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

      {/* Total Passenger-km */}
      {selectedFactor && (
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">
            Total passenger-kilometres <span className="text-red-600">*</span>
          </p>
          <input
            type="number"
            step="0.1"
            min="0"
            value={passengerKm}
            onChange={(e) => setPassengerKm(e.target.value)}
            placeholder="e.g. 25000"
            className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 transition"
          />
          <p className="text-xs text-gray-500 mt-1">
            Total distance traveled by all employees (e.g., 100 employees × 250 km round trip = 25,000 passenger-km)
          </p>
        </div>
      )}

      {/* Preview */}
      {isValid && selectedFactor && (
        <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
          <p className="text-xs text-[#044D5E]">
            <strong>Preview:</strong> {vehicle} – {type}
            {fuel ? ` (${fuel})` : ''} | {parseFloat(passengerKm).toLocaleString()} passenger-km →{' '}
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

export default EmployeesCommuting;