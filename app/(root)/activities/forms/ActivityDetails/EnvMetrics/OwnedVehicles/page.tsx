'use client';

import React, { useState } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, ChevronDown, Users, Truck } from 'lucide-react';

// ====================== PASSENGER VEHICLES – 2025 DEFRA (kgCO₂e per km) ======================
const passengerFactors: Record<string, Record<string, number>> = {
  'Small car': {
    Diesel: 0.13721,
    Petrol: 0.14836,
    Hybrid: 0.10275,
    CNG: 0.10698,
    LPG: 0.15935,
    Unknown: 0.14449,
    'Battery Electric': 0.04637,
    'Plug-in Hybrid Electric (Petrol)': 0.02235,
  },
  'Medium car': {
    Diesel: 0.16637,
    Petrol: 0.18659,
    Hybrid: 0.10698,
    CNG: 0.14480,
    LPG: 0.17847,
    Unknown: 0.17571,
    'Battery Electric': 0.05563,
    'Plug-in Hybrid Electric (Petrol)': 0.07012,
  },
  'Large car': {
    Diesel: 0.20419,
    Petrol: 0.27807,
    Hybrid: 0.14480,
    CNG: 0.11558,
    LPG: 0.23680,
    Unknown: 0.22321,
    'Battery Electric': 0.06646,
    'Plug-in Hybrid Electric (Petrol)': 0.07570,
  },
  'Average car': {
    Diesel: 0.16844,
    Petrol: 0.17430,
    Hybrid: 0.11558,
    CNG: 0.17621,
    LPG: 0.19754,
    Unknown: 0.17140,
    'Battery Electric': 0.05728,
    'Plug-in Hybrid Electric (Petrol)': 0.06995,
  },
  'Average motorbike': { Petrol: 0.11337 },
  'Regular taxi': { Diesel: 0.198 },
  'Black cab': { Diesel: 0.298 },
  'Local Bus': { Diesel: 0.104 },
  'Average local bus': { Diesel: 0.104 },
  'Coach': { Diesel: 0.029 },
  'national rail': { 'Battery Electric': 0.041 },
  'International rail': { 'Battery Electric': 0.035 },
  'London underground': { 'Battery Electric': 0.038 },
};

// ====================== DELIVERY VEHICLES – 2025 DEFRA (kgCO₂e per km) ======================
const deliveryFactors: Record<string, Record<string, number>> = {
  // Vans
  'Class I (up to 1.305t)': { Diesel: 0.1485, Petrol: 0.2108, 'Battery Electric': 0.040 },
  'Class II (1.305 to 1.74t)': { Diesel: 0.1890, Petrol: 0.2108, 'Battery Electric': 0.060 },
  'Class III (1.74 to 3.5t)': { Diesel: 0.2717, Petrol: 0.3328, 'Battery Electric': 0.080 },
  'Average (up to 3.5t)': { Diesel: 0.2471, Petrol: 0.2196, CNG: 0.2471, LPG: 0.2718, Unknown: 0.2462, 'Battery Electric': 0.060 },

  // HGV
  'Rigid (>3.5 - 7.5 tonnes)': { Diesel: 0.4825 },
  'Rigid (>7.5 tonnes-17 tonnes)': { Diesel: 0.5893 },
  'Rigid (>17 tonnes)': { Diesel: 0.9643 },
  'All rigids': { Diesel: 0.8011 },
  'Articulated (>3.5 - 33t)': { Diesel: 0.7757 },
  'Articulated (>33t)': { Diesel: 0.9237 },
  'All artics': { Diesel: 0.9157 },
  'All HGVS': { Diesel: 0.8654 },

  // HGV Refrigerated
  'Rigid (>3.5 - 7.5 tonnes)_ref': { Diesel: 0.5744 },
  'Rigid (>7.5 tonnes-17 tonnes)_ref': { Diesel: 0.7015 },
  'Rigid (>17 tonnes)_ref': { Diesel: 1.1480 },
  'All rigids_ref': { Diesel: 0.9537 },
  'Articulated (>3.5 - 33t)_ref': { Diesel: 0.8980 },
  'Articulated (>33t)_ref': { Diesel: 1.0692 },
  'All artics_ref': { Diesel: 1.0600 },
  'All HGVS_ref': { Diesel: 1.0142 },
};

const OwnedVehicles: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  // ==================== PASSENGER SECTION ====================
  const [pVehicle, setPVehicle] = useState('');
  const [pType, setPType] = useState('');
  const [pFuel, setPFuel] = useState('');
  const [pDistance, setPDistance] = useState('');
  const [pVehOpen, setPVehOpen] = useState(false);
  const [pTypeOpen, setPTypeOpen] = useState(false);
  const [pFuelOpen, setPFuelOpen] = useState(false);

  const pTypeOptions = pVehicle === 'Car' ? ['Small car', 'Medium car', 'Large car', 'Average car']
    : pVehicle === 'motorbike' ? ['Average motorbike']
    : pVehicle === 'Taxi' ? ['Regular taxi', 'Black cab']
    : pVehicle === 'Bus' ? ['Local Bus', 'Average local bus', 'Coach']
    : pVehicle === 'Rail' ? ['national rail', 'International rail', 'London underground']
    : [];

  const showPFuel = ['Car', 'motorbike', 'Taxi'].includes(pVehicle);
  const effectivePFuel = showPFuel ? pFuel : 'Diesel';

  const pFactor = pType && passengerFactors[pType]?.[effectivePFuel] || 0;
  const pTons = pDistance && pFactor ? parseFloat(pDistance) * pFactor / 1000 : 0;
  const pValid = pVehicle && pType && pDistance && parseFloat(pDistance) > 0 && pFactor > 0 && (!showPFuel || pFuel);

  const addPassenger = () => {
    if (!pValid) return;
    onAddEntry({
      category: 'Owned vehicles',
      details: `Passenger | ${pType}${pFuel ? ` (${pFuel})` : ''} | ${parseFloat(pDistance).toLocaleString()} km`,
      result: Number(pTons.toFixed(6)),
    });
    setPVehicle(''); setPType(''); setPFuel(''); setPDistance('');
  };

  // ==================== DELIVERY SECTION ====================
  const [dVehicle, setDVehicle] = useState('');
  const [dType, setDType] = useState('');
  const [dFuel, setDFuel] = useState('');
  const [dDistance, setDDistance] = useState('');
  const [dVehOpen, setDVehOpen] = useState(false);
  const [dTypeOpen, setDTypeOpen] = useState(false);
  const [dFuelOpen, setDFuelOpen] = useState(false);

  const dTypeOptions = dVehicle === 'Vans'
    ? ['Class I (up to 1.305t)', 'Class II (1.305 to 1.74t)', 'Class III (1.74 to 3.5t)', 'Average (up to 3.5t)']
    : ['Rigid (>3.5 - 7.5 tonnes)', 'Rigid (>7.5 tonnes-17 tonnes)', 'Rigid (>17 tonnes)', 'All rigids', 'Articulated (>3.5 - 33t)', 'Articulated (>33t)', 'All artics', 'All HGVS'];

  const showDFuel = dVehicle === 'Vans';
  const effectiveDFuel = showDFuel ? dFuel : 'Diesel';

  const dKey = dVehicle === 'HGV Refrigerated' ? `${dType}_ref` : dType;
  const dFactor = dType ? deliveryFactors[dKey]?.[effectiveDFuel] || 0 : 0;
  const dTons = dDistance && dFactor ? parseFloat(dDistance) * dFactor / 1000 : 0;
  const dValid = dVehicle && dType && dDistance && parseFloat(dDistance) > 0 && dFactor > 0 && (!showDFuel || dFuel);

  const addDelivery = () => {
    if (!dValid) return;
    onAddEntry({
      category: 'Owned vehicles',
      details: `Delivery | ${dType}${dFuel ? ` (${dFuel})` : ''}${dVehicle === 'HGV Refrigerated' ? ' (Refrigerated)' : ''} | ${parseFloat(dDistance).toLocaleString()} km`,
      result: Number(dTons.toFixed(6)),
    });
    setDVehicle(''); setDType(''); setDFuel(''); setDDistance('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700">Owned Vehicles (Scope 1)</h3>

      {/* ===================== PASSENGER ===================== */}
      <div className="space-y-6">
        <h4 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#044D5E]" />
          Passenger Vehicles
        </h4>

        {/* Vehicle Type */}
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">Vehicle type <span className="text-red-600">*</span></p>
          <div
            onClick={() => setPVehOpen(!pVehOpen)}
            className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
              pVehOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={pVehicle ? 'text-gray-900' : 'text-gray-500'}>{pVehicle || 'Select vehicle type'}</span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${pVehOpen ? 'rotate-180' : ''}`} />
          </div>
          {pVehOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
              {['Car', 'motorbike', 'Taxi', 'Bus', 'Rail'].map(v => (
                <div
                  key={v}
                  onClick={() => { setPVehicle(v); setPType(''); setPFuel(''); setPVehOpen(false); }}
                  className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer"
                >
                  {v}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Size/Type */}
        {pTypeOptions.length > 0 && (
          <div className="relative">
            <p className="text-xs font-medium text-gray-700 mb-2">Size / Type <span className="text-red-600">*</span></p>
            <div
              onClick={() => setPTypeOpen(!pTypeOpen)}
              className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
                pTypeOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className={pType ? 'text-gray-900' : 'text-gray-500'}>{pType || 'Select size/type'}</span>
              <ChevronDown size={18} className={`text-gray-400 transition-transform ${pTypeOpen ? 'rotate-180' : ''}`} />
            </div>
            {pTypeOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                {pTypeOptions.map(t => (
                  <div
                    key={t}
                    onClick={() => { setPType(t); setPTypeOpen(false); }}
                    className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer"
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Fuel */}
        {showPFuel && pType && (
          <div className="relative">
            <p className="text-xs font-medium text-gray-700 mb-2">Fuel type <span className="text-red-600">*</span></p>
            <div
              onClick={() => setPFuelOpen(!pFuelOpen)}
              className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
                pFuelOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className={pFuel ? 'text-gray-900' : 'text-gray-500'}>{pFuel || 'Select fuel'}</span>
              <ChevronDown size={18} className={`text-gray-400 transition-transform ${pFuelOpen ? 'rotate-180' : ''}`} />
            </div>
            {pFuelOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                {Object.keys(passengerFactors[pType] || {}).map(f => (
                  <div
                    key={f}
                    onClick={() => { setPFuel(f); setPFuelOpen(false); }}
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
        {pType && (
          <div>
            <p className="text-xs font-medium text-gray-700 mb-2">Distance driven (km) <span className="text-red-600">*</span></p>
            <input
              type="number"
              step="0.1"
              value={pDistance}
              onChange={e => setPDistance(e.target.value)}
              placeholder="e.g. 12500"
              className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 font-mono"
            />
          </div>
        )}

        {/* Preview */}
        {pValid && (
          <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
            <p className="text-xs text-[#044D5E]">
              <strong>Preview:</strong> {pType}{pFuel ? ` • ${pFuel}` : ''} • {parseFloat(pDistance).toLocaleString()} km →{' '}
              <span className="font-mono font-bold">{pTons.toFixed(6)}</span> tCO₂e
            </p>
          </div>
        )}

        <button
          onClick={addPassenger}
          disabled={!pValid}
          className="w-full py-3 bg-[#044D5E] hover:bg-[#044D5E]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Passenger Vehicle
        </button>
      </div>

      {/* ===================== DELIVERY ===================== */}
      <div className="space-y-6">
        <h4 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#044D5E]" />
          Delivery & Freight Vehicles
        </h4>

        {/* Vehicle Category */}
        <div className="relative">
          <p className="text-xs font-medium text-gray-700 mb-2">Vehicle category <span className="text-red-600">*</span></p>
          <div
            onClick={() => setDVehOpen(!dVehOpen)}
            className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
              dVehOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={dVehicle ? 'text-gray-900' : 'text-gray-500'}>{dVehicle || 'Select category'}</span>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${dVehOpen ? 'rotate-180' : ''}`} />
          </div>
          {dVehOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              {['Vans', 'HGV', 'HGV Refrigerated'].map(v => (
                <div
                  key={v}
                  onClick={() => { setDVehicle(v); setDType(''); setDFuel(''); setDVehOpen(false); }}
                  className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer"
                >
                  {v}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vehicle Size */}
        {dTypeOptions.length > 0 && (
          <div className="relative">
            <p className="text-xs font-medium text-gray-700 mb-2">Vehicle size <span className="text-red-600">*</span></p>
            <div
              onClick={() => setDTypeOpen(!dTypeOpen)}
              className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
                dTypeOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className={dType ? 'text-gray-900' : 'text-gray-500'}>{dType || 'Select size'}</span>
              <ChevronDown size={18} className={`text-gray-400 transition-transform ${dTypeOpen ? 'rotate-180' : ''}`} />
            </div>
            {dTypeOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                {dTypeOptions.map(t => (
                  <div
                    key={t}
                    onClick={() => { setDType(t); setDTypeOpen(false); }}
                    className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer"
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Fuel (Vans only) */}
        {showDFuel && dType && (
          <div className="relative">
            <p className="text-xs font-medium text-gray-700 mb-2">Fuel type <span className="text-red-600">*</span></p>
            <div
              onClick={() => setDFuelOpen(!dFuelOpen)}
              className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
                dFuelOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className={dFuel ? 'text-gray-900' : 'text-gray-500'}>{dFuel || 'Select fuel'}</span>
              <ChevronDown size={18} className={`text-gray-400 transition-transform ${dFuelOpen ? 'rotate-180' : ''}`} />
            </div>
            {dFuelOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                {Object.keys(deliveryFactors[dType] || {}).map(f => (
                  <div
                    key={f}
                    onClick={() => { setDFuel(f); setDFuelOpen(false); }}
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
        {dType && (
          <div>
            <p className="text-xs font-medium text-gray-700 mb-2">Distance driven (km) <span className="text-red-600">*</span></p>
            <input
              type="number"
              step="0.1"
              value={dDistance}
              onChange={e => setDDistance(e.target.value)}
              placeholder="e.g. 8500"
              className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 font-mono"
            />
          </div>
        )}

        {/* Preview */}
        {dValid && (
          <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
            <p className="text-xs text-[#044D5E]">
              <strong>Preview:</strong> {dType}{dFuel ? ` • ${dFuel}` : ''}{dVehicle === 'HGV Refrigerated' ? ' (Refrigerated)' : ''} • {parseFloat(dDistance).toLocaleString()} km →{' '}
              <span className="font-mono font-bold">{dTons.toFixed(6)}</span> tCO₂e
            </p>
          </div>
        )}

        <button
          onClick={addDelivery}
          disabled={!dValid}
          className="w-full py-3 bg-[#044D5E] hover:bg-[#044D5E]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Delivery Vehicle
        </button>
      </div>

      <p className="text-xs text-center text-gray-500">
        Source: UK Government GHG Conversion Factors 2025 · Scope 1 (Owned/operated vehicles)
      </p>
    </div>
  );
};

export default OwnedVehicles;