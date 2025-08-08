import { useState, useEffect } from 'react';
import { getLocalData, setLocalData, STORAGE_KEYS } from './database/supabaseClient';

interface Partner {
  id: string;
  name: string;
  percentage: string;
}

interface ValuationData {
  reserveForReplacement: string;
  discountRate: string;
  capRate: string;
  acquisitionCosts: string;
  capitalImprovements: string;
  exitCapRate: string;
  salesExpense: string;
  investorEquityPercentage: string;
  partners: Partner[];
}

// Default valuation data used for first run
const defaultValuationState: ValuationData = {
  reserveForReplacement: "4.0",
  discountRate: "12.0",
  capRate: "6.0",
  acquisitionCosts: "1.0",
  capitalImprovements: "10000000",
  exitCapRate: "7.0",
  salesExpense: "3.0",
  investorEquityPercentage: "20.0",
  partners: [{ id: "1", name: "Partner 1", percentage: "50.0" }]
};

// Module-level state with local persistence
let valuationState: ValuationData = getLocalData<ValuationData>(
  STORAGE_KEYS.VALUATION_DATA,
  defaultValuationState
);


const listeners = new Set<() => void>();

export const useValuationData = () => {
  const [data, setData] = useState(valuationState);

  useEffect(() => {
    const listener = () => setData({ ...valuationState });
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const updateValuationData = (updates: Partial<ValuationData>) => {
    valuationState = { ...valuationState, ...updates };
    setLocalData(STORAGE_KEYS.VALUATION_DATA, valuationState);
    listeners.forEach(listener => listener());
  };

  return {
    valuationData: data,
    updateValuationData
  };
};