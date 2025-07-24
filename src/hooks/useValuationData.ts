import { useState, useEffect } from 'react';

interface ValuationData {
  reserveForReplacement: string;
  discountRate: string;
  capRate: string;
  acquisitionCosts: string;
  capitalImprovements: string;
  exitCapRate: string;
  salesExpense: string;
}

// Create a simple state management for valuation data
let valuationState: ValuationData = {
  reserveForReplacement: "4.0",
  discountRate: "12.0",
  capRate: "6.0",
  acquisitionCosts: "1.0",
  capitalImprovements: "10000000",
  exitCapRate: "7.0",
  salesExpense: "3.0"
};

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
    listeners.forEach(listener => listener());
  };

  return {
    valuationData: data,
    updateValuationData
  };
};