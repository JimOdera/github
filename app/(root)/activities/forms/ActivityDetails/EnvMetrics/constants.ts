// src/app/(root)/activities/forms/ActivityDetails/EnvMetrics/constants.ts

export const SCOPE_MAPPING: Record<string, 'Scope 1' | 'Scope 2' | 'Scope 3'> = {
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