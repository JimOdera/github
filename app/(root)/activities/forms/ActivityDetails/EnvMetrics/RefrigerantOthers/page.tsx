'use client';

import React, { useState } from 'react';
import { CategoryCalculatorProps } from '@/app/(root)/activities/forms/ActivityDetails/EnvMetrics/types';
import { Plus, ChevronDown, AlertTriangle } from 'lucide-react';

interface Refrigerant {
  name: string;
  gwp: number; // AR6 GWP-100 values (2021 IPCC)
}

const refrigerants: Refrigerant[] = [
  // Greenhouse Gases
  { name: 'Carbon dioxide (CO₂)', gwp: 1 },
  { name: 'Methane (CH₄)', gwp: 27.9 },
  { name: 'Nitrous oxide (N₂O)', gwp: 273 },

  // HFCs
  { name: 'HFC-23', gwp: 14800 },
  { name: 'HFC-32', gwp: 675 },
  { name: 'HFC-41', gwp: 92 },
  { name: 'HFC-125', gwp: 3500 },
  { name: 'HFC-134', gwp: 1100 },
  { name: 'HFC-134a', gwp: 1430 },
  { name: 'HFC-143', gwp: 353 },
  { name: 'HFC-143a', gwp: 4470 },
  { name: 'HFC-152', gwp: 53 },
  { name: 'HFC-152a', gwp: 124 },
  { name: 'HFC-161', gwp: 12 },
  { name: 'HFC-227ea', gwp: 3220 },
  { name: 'HFC-236cb', gwp: 1340 },
  { name: 'HFC-236ea', gwp: 1370 },
  { name: 'HFC-236fa', gwp: 9810 },
  { name: 'HFC-245ca', gwp: 693 },
  { name: 'HFC-245fa', gwp: 1030 },
  { name: 'HFC-365mfc', gwp: 794 },
  { name: 'HFC-43-10mee', gwp: 1640 },

  // PFCs
  { name: 'Perfluoromethane (PFC-14, CF₄)', gwp: 7390 },
  { name: 'Perfluoroethane (PFC-116, C₂F₆)', gwp: 12200 },
  { name: 'Perfluoropropane (PFC-218, C₃F₈)', gwp: 8830 },
  { name: 'Perfluorocyclobutane (PFC-318, c-C₄F₈)', gwp: 10300 },
  { name: 'Perfluorobutane (PFC-3-1-10, C₄F₁₀)', gwp: 8860 },
  { name: 'Perfluoropentane (PFC-4-1-12, C₅F₁₂)', gwp: 9160 },
  { name: 'Perfluorohexane (PFC-5-1-14, C₆F₁₄)', gwp: 9300 },
  { name: 'PFC-9-1-18 (C₁₀F₁₈)', gwp: 7500 },

  // Others
  { name: 'Sulphur hexafluoride (SF₆)', gwp: 22800 },
  { name: 'Nitrogen trifluoride (NF₃)', gwp: 17200 },
  { name: 'Trifluoromethyl sulphur pentafluoride (SF₅CF₃)', gwp: 17700 },

  // Refrigerant Blends
  { name: 'R-404A', gwp: 3922 },
  { name: 'R-407A', gwp: 2107 },
  { name: 'R-407C', gwp: 1774 },
  { name: 'R-407F', gwp: 1825 },
  { name: 'R-408A', gwp: 3152 },
  { name: 'R-410A', gwp: 2088 },
  { name: 'R-507A', gwp: 3985 },
  { name: 'R-508B', gwp: 13396 },
  { name: 'R-403A', gwp: 3124 },
  { name: 'R-406A', gwp: 1943 },
  { name: 'R-409A', gwp: 1585 },
  { name: 'R-502', gwp: 4657 },

  // CFCs & HCFCs
  { name: 'CFC-11 (R11)', gwp: 4750 },
  { name: 'CFC-12 (R12)', gwp: 10900 },
  { name: 'CFC-13', gwp: 14400 },
  { name: 'CFC-113', gwp: 6130 },
  { name: 'CFC-114', gwp: 10000 },
  { name: 'CFC-115', gwp: 7370 },
  { name: 'HCFC-22 (R22)', gwp: 1810 },
  { name: 'HCFC-123', gwp: 77 },
  { name: 'HCFC-124', gwp: 609 },
  { name: 'HCFC-141b', gwp: 725 },
  { name: 'HCFC-142b', gwp: 2310 },
  { name: 'HCFC-225ca', gwp: 122 },
  { name: 'HCFC-225cb', gwp: 595 },
  { name: 'HCFC-21', gwp: 151 },

  // Halons
  { name: 'Halon-1211', gwp: 1890 },
  { name: 'Halon-1301', gwp: 7140 },
  { name: 'Halon-2402', gwp: 1640 },

  // Other Compounds
  { name: 'Carbon tetrachloride (CCl₄)', gwp: 1400 },
  { name: 'Methyl bromide (CH₃Br)', gwp: 5 },
  { name: 'Methyl chloroform (CH₃CCl₃)', gwp: 146 },
  { name: 'Methylene chloride (CH₂Cl₂)', gwp: 9 },
  { name: 'Methyl chloride (CH₃Cl)', gwp: 13 },

  // Natural Refrigerants
  { name: 'R-290 (Propane)', gwp: 3 },
  { name: 'R-600a (Isobutane)', gwp: 3 },

  // HFEs & Exotic
  { name: 'HFE-125', gwp: 14900 },
  { name: 'HFE-134', gwp: 6320 },
  { name: 'HFE-143a', gwp: 756 },
  { name: 'HFE-236ca12 (HG-10)', gwp: 2800 },
  { name: 'HFE-338pcc13 (HG-01)', gwp: 1500 },
  { name: 'HFE-43-10pccc124 (H-Galden 1040x)', gwp: 1870 },
  { name: 'HFE-347mcc3 (HFE-7000)', gwp: 575 },
  { name: 'HFE-449sl (HFE-7100)', gwp: 297 },
  { name: 'HFE-569sf2 (HFE-7200)', gwp: 59 },
  { name: 'PEPMIE (Perfluoropolyether)', gwp: 10300 },
  { name: 'Dimethyl ether', gwp: 1 },
].sort((a, b) => a.name.localeCompare(b.name));

const RefrigerantOthers: React.FC<CategoryCalculatorProps> = ({ onAddEntry }) => {
  const [gas, setGas] = useState('');
  const [amountKg, setAmountKg] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selected = refrigerants.find(r => r.name === gas);
  const gwp = selected?.gwp || 0;
  const calculatedTons = amountKg && gwp ? (parseFloat(amountKg) * gwp) / 1000 : 0;

  const isValid = gas && amountKg && parseFloat(amountKg) > 0;

  const handleAdd = () => {
    if (!isValid) return;

    onAddEntry({
      category: 'Fugitive emissions',
      details: `${gas} – ${parseFloat(amountKg).toFixed(3)} kg × GWP ${gwp.toLocaleString()} → ${calculatedTons.toFixed(6)} tCO₂e`,
      result: Number(calculatedTons.toFixed(6)),
    });

    setGas('');
    setAmountKg('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <h3 className="text-lg font-medium text-gray-700">Fugitive Emissions & Refrigerants (Scope 1)</h3>
      </div>

      {/* Refrigerant / Gas Dropdown */}
      <div className="relative">
        <p className="text-xs font-medium text-gray-700 mb-2">
          Select refrigerant or gas <span className="text-red-600">*</span>
        </p>
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`w-full px-4 py-2.5 text-xs rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
            dropdownOpen ? 'border-gray-400 bg-white shadow-sm' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span className={gas ? 'text-gray-900' : 'text-gray-500'}>
            {gas || 'Choose a gas or refrigerant'}
          </span>
          <ChevronDown size={18} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </div>

        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
            {refrigerants.map((r) => (
              <div
                key={r.name}
                onClick={() => {
                  setGas(r.name);
                  setDropdownOpen(false);
                }}
                className="px-4 py-2.5 text-xs hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              >
                <span>{r.name}</span>
                <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                  r.gwp >= 10000 ? 'bg-red-100 text-red-700' :
                  r.gwp >= 1000 ? 'bg-orange-100 text-orange-700' :
                  r.gwp >= 100 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  GWP {r.gwp.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Amount in kg */}
      {gas && (
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">
            Amount leaked / disposed (kg) <span className="text-red-600">*</span>
          </p>
          <input
            type="number"
            step="0.001"
            min="0"
            value={amountKg}
            onChange={(e) => setAmountKg(e.target.value)}
            placeholder="e.g. 1.250"
            className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 font-mono"
          />
          <p className="text-xs text-gray-500 mt-2">
            Enter the total mass of refrigerant or gas released (e.g. from leaks, servicing, or disposal)
          </p>
        </div>
      )}

      {/* Live Preview */}
      {isValid && (
        <div className="p-4 bg-[#E3FCEF] border border-[#044D5E]/50 rounded-lg">
          <p className="text-xs text-[#044D5E]">
            <strong>Preview:</strong> {gas} • {parseFloat(amountKg).toFixed(3)} kg × GWP {gwp.toLocaleString()} →{' '}
            <span className="font-mono font-bold">{calculatedTons.toFixed(6)}</span> tCO₂e
          </p>
          {gwp >= 10000 && (
            <p className="text-xs text-red-600 mt-2 font-medium">
              Warning: Extremely high impact – equivalent to burning ~{Math.round(calculatedTons * 2.3)} tonnes of coal
            </p>
          )}
        
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
        Add Fugitive Emission (Scope 1)
      </button>

      <div className="text-xs text-center text-gray-500 space-y-1">
        <p>Source: IPCC AR6 (2021) GWP-100 values · UK DEFRA 2025 Guidance</p>
        <p className="font-medium text-red-600">
          Even small leaks of high-GWP gases can have massive climate impact
        </p>
      </div>
    </div>
  );
};

export default RefrigerantOthers;