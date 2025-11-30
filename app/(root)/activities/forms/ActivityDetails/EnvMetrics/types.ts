// app/(root)/activities/forms/ActivityDetails/EnvMetrics/types.ts
// or better: src/types/env-metrics.ts if you have a src folder

export type EmissionEntry = {
  id: string;
  category: string;
  details: string;
  result: number; // tCO₂e
};

export interface CategoryCalculatorProps {
  onAddEntry: (entry: Omit<EmissionEntry, 'id'>) => void;
}