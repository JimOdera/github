'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CircleCheckBig, Plus, Trash2 } from 'lucide-react';

// Import all category components
import WasteDisposal from './WasteDisposal/page';
import FlightsAccommodation from './FlightsAccommodation/page';
import BusinessTravel from './BusinessTravel/page';
import FreightingGoods from './FreightingGoods/page';
import EmployeesCommuting from './EmployeesCommuting/page';
import Food from './Food/page';
import HomeOffice from './HomeOffice/page';
import MaterialUse from './MaterialUse/page';
import WaterSupplyTreatment from './WaterSupplyTreatment/page';
import TransmissionDistribution from './TransmissionDistribution/page';
import WellToTankFuels from './WellToTankFuels/page';
import ElectricityHeatingCooling from './ElectricityHeatingCooling/page';
import OwnedVehicles from './OwnedVehicles/page';
import RefrigerantOthers from './RefrigerantOthers/page';
import Fuels from './Fuels/page';

// ──────────────────────────────────────────────────────────────
// Scope Mapping – Based on your original list
// ──────────────────────────────────────────────────────────────
const SCOPE_MAPPING: Record<string, 'Scope 1' | 'Scope 2' | 'Scope 3'> = {
  // Scope 1
  'Fuels': 'Scope 1',
  'Refrigerant & others': 'Scope 1',
  'Owned vehicles': 'Scope 1',

  // Scope 2
  'Electricity Heating and Cooling': 'Scope 2',

  // Scope 3
  'Waste disposal': 'Scope 3',
  'Flights & accommodation': 'Scope 3',
  'Business travel': 'Scope 3',
  'Freighting goods': 'Scope 3',
  'Employees commuting': 'Scope 3',
  'Food': 'Scope 3',
  'Home office': 'Scope 3',
  'Material use': 'Scope 3',
  'Water supply & Treatment': 'Scope 3',
  'Transmission & distribution': 'Scope 3',
  'Well to Tank (WTT) Fuels': 'Scope 3',
};

type EmissionEntry = {
  id: string;
  category: string;
  details: string;
  result: number; // tCO₂e
  scope: 'Scope 1' | 'Scope 2' | 'Scope 3';
};

interface CategoryCalculatorProps {
  onAddEntry: (entry: Omit<EmissionEntry, 'id' | 'scope'>) => void;
}

interface EnvMetricsProps {
  onEmissionsUpdate?: (entries: EmissionEntry[]) => void;
}

const EnvMetrics: React.FC<EnvMetricsProps> = ({ onEmissionsUpdate }) => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [emissionsEntries, setEmissionsEntries] = useState<EmissionEntry[]>([]);

  const sectionRefs = {
    'Emissions (GHG)': useRef<HTMLDivElement>(null),
    'Energy Use (optional)': useRef<HTMLDivElement>(null),
    'Waste Management': useRef<HTMLDivElement>(null),
  };

  const activityCategories = [
    'Waste disposal',
    'Flights & accommodation',
    'Business travel',
    'Freighting goods',
    'Employees commuting',
    'Food',
    'Home office',
    'Material use',
    'Water supply & Treatment',
    'Transmission & distribution',
    'Well to Tank (WTT) Fuels',
    'Electricity Heating and Cooling',
    'Owned vehicles',
    'Refrigerant & others',
    'Fuels',
  ] as const;

  // ──────────────────────────────────────────────────────────────
  // Add entry with automatic scope assignment
  // ──────────────────────────────────────────────────────────────
  const addEmissionEntry = (entry: Omit<EmissionEntry, 'id' | 'scope'>) => {
    const scope = SCOPE_MAPPING[entry.category] || 'Scope 3';

    setEmissionsEntries(prev => [
      ...prev,
      {
        ...entry,
        scope,
        id: Date.now().toString(),
      },
    ]);
  };

  const removeEntry = (id: string) => {
    setEmissionsEntries(prev => prev.filter(e => e.id !== id));
  };

  // ──────────────────────────────────────────────────────────────
  // Calculate Scope Totals (always defined, even if 0)
  // ──────────────────────────────────────────────────────────────
  const scopeTotals = {
    'Scope 1': emissionsEntries
      .filter(e => e.scope === 'Scope 1')
      .reduce((sum, e) => sum + e.result, 0),
    'Scope 2': emissionsEntries
      .filter(e => e.scope === 'Scope 2')
      .reduce((sum, e) => sum + e.result, 0),
    'Scope 3': emissionsEntries
      .filter(e => e.scope === 'Scope 3')
      .reduce((sum, e) => sum + e.result, 0),
  };

  const grandTotal = Object.values(scopeTotals).reduce((a, b) => a + b, 0);

  // ──────────────────────────────────────────────────────────────
  // Send data to parent (e.g. ActivityDetails)
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    onEmissionsUpdate?.(emissionsEntries);
  }, [emissionsEntries, onEmissionsUpdate]);

  const categoryComponents: Record<typeof activityCategories[number], React.FC<CategoryCalculatorProps>> = {
    'Waste disposal': WasteDisposal,
    'Flights & accommodation': FlightsAccommodation,
    'Business travel': BusinessTravel,
    'Freighting goods': FreightingGoods,
    'Employees commuting': EmployeesCommuting,
    'Food': Food,
    'Home office': HomeOffice,
    'Material use': MaterialUse,
    'Water supply & Treatment': WaterSupplyTreatment,
    'Transmission & distribution': TransmissionDistribution,
    'Well to Tank (WTT) Fuels': WellToTankFuels,
    'Electricity Heating and Cooling': ElectricityHeatingCooling,
    'Owned vehicles': OwnedVehicles,
    'Refrigerant & others': RefrigerantOthers,
    'Fuels': Fuels,
  };

  const SelectedComponent =
    selectedCategory && selectedCategory in categoryComponents
      ? categoryComponents[selectedCategory as keyof typeof categoryComponents]
      : null;

  return (
    <form className="w-full mx-auto px-4 md:px-0 py-0 flex-1 space-y-6">
      <div ref={sectionRefs['Emissions (GHG)']} data-section="Emissions (GHG)" className="scroll-mt-32">
        <h1 className="text-lg font-medium text-gray-600 mb-6">Emissions (GHG)</h1>

        {/* Manual Entry */}
        <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-xs font-medium text-amber-800 mb-4">
            Manual Entry (if you already have calculated totals)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-gray-700 mb-2 font-medium">Scope 1 Emissions (tCO₂e)*</p>
              <input type="number" step="0.001" name="scope1Emissions" required className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition" placeholder="e.g. 120" />
            </div>
            <div>
              <p className="text-xs text-gray-700 mb-2 font-medium">Scope 2 Emissions (tCO₂e)*</p>
              <input type="number" step="0.001" name="scope2Emissions" required className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition" placeholder="e.g. 85" />
            </div>
            <div>
              <p className="text-xs text-gray-700 mb-2 font-medium">Scope 3 Emissions (tCO₂e)</p>
              <input type="number" step="0.001" name="scope3Emissions" className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition" placeholder="Optional" />
            </div>
          </div>
        </div>

        {/* GHG Emission Calculator */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-600">GHG Emission Calculator</h3>
            <button
              type="button"
              onClick={() => setCalculatorOpen(!calculatorOpen)}
              className="flex items-center gap-2 px-5 py-2 bg-[#044D5E] hover:bg-[#044D5E]/90 text-white text-xs rounded-lg transition-all duration-300"
            >
              <Plus size={16} />
              Add GHG Emissions
            </button>
          </div>

          <AnimatePresence>
            {calculatorOpen && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4 space-y-8">

                {/* Category Dropdown */}
                <div className="relative">
                  <p className="text-xs text-gray-700 mb-1 font-medium">Select your activity category *</p>
                  <div
                    className={`w-full text-xs rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                      categoryDropdownOpen ? 'border border-gray-400 bg-white shadow-sm' : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setCategoryDropdownOpen(prev => !prev)}
                  >
                    <span className="text-gray-600">{selectedCategory || 'Choose category'}</span>
                    {categoryDropdownOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                  </div>

                  <AnimatePresence>
                    {categoryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-md z-20 max-h-64 overflow-y-auto"
                      >
                        {activityCategories.map((cat) => (
                          <div
                            key={cat}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setCategoryDropdownOpen(false);
                            }}
                            className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                          >
                            {cat}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Dynamic Calculator */}
                {SelectedComponent && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-200 p-6">
                    <SelectedComponent onAddEntry={addEmissionEntry} />
                  </motion.div>
                )}

                {/* Results Table – Now with Scope Totals */}
                {(emissionsEntries.length > 0 || grandTotal > 0) && (
                  <div className="mt-10">
                    <h4 className="text-lg font-medium text-gray-600 mb-4">Calculated Emissions</h4>
                    <div className="overflow-x-auto rounded-lg border border-[#044D5E]/30">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-3 text-left font-medium">Category</th>
                            <th className="px-6 py-3 text-left font-medium">Details</th>
                            <th className="px-6 py-3 text-right font-medium">Result (tCO₂e)</th>
                            <th className="px-6 py-3 text-center font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {emissionsEntries.map(entry => (
                            <tr key={entry.id} className="border-t border-[#044D5E]/20 hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium">
                                {entry.category}
                                <span className="ml-2 text-xs text-gray-500 font-normal">({entry.scope})</span>
                              </td>
                              <td className="px-6 py-4 text-gray-600">{entry.details}</td>
                              <td className="px-6 py-4 text-right font-mono">{entry.result.toFixed(6)}</td>
                              <td className="px-6 py-4 text-center">
                                <button onClick={() => removeEntry(entry.id)} className="text-red-600 hover:text-red-800">
                                  <Trash2 size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}

                          {/* Scope Totals */}
<tr className="bg-gray-50 border-t-2 border-[#044D5E]/50">
  <td colSpan={2} className="px-6 py-4 text-left font-semibold">Scope 1 Total</td>
  <td colSpan={1} className="px-6 py-4 text-right font-mono text-[#044D5E] font-bold">
    {scopeTotals['Scope 1'].toFixed(6)} tCO₂e
  </td>
  <td className="px-6 py-4 text-center">
    <CircleCheckBig size={18} className="text-green-600 inline-block" />
  </td>
</tr>
<tr className="bg-gray-50">
  <td colSpan={2} className="px-6 py-4 text-left font-semibold">Scope 2 Total</td>
  <td colSpan={1} className="px-6 py-4 text-right font-mono text-[#044D5E] font-bold">
    {scopeTotals['Scope 2'].toFixed(6)} tCO₂e
  </td>
  <td className="px-6 py-4 text-center">
    <CircleCheckBig size={18} className="text-green-600 inline-block" />
  </td>
</tr>
<tr className="bg-gray-50">
  <td colSpan={2} className="px-6 py-4 text-left font-semibold">Scope 3 Total</td>
  <td colSpan={1} className="px-6 py-4 text-right font-mono text-[#044D5E] font-bold">
    {scopeTotals['Scope 3'].toFixed(6)} tCO₂e
  </td>
  <td className="px-6 py-4 text-center">
    <CircleCheckBig size={18} className="text-green-600 inline-block" />
  </td>
</tr>

                          {/* Grand Total */}
                          <tr className="bg-[#E3FCEF] border-t-2 border-[#044D5E] font-bold text-sm">
                            <td colSpan={2} className="px-6 py-5 text-left text-[#044D5E]">Grand Total</td>
                            <td colSpan={2} className="px-6 py-5 text-right font-mono text-xl text-[#044D5E]">
                              {grandTotal.toFixed(6)} tCO₂e
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
};

export default EnvMetrics;