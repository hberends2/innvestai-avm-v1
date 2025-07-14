
import { useState } from 'react';
import { RevenueCalculationState } from '../types/revenue';
import { useRevenueInputHandlers } from './useRevenueInputHandlers';
import { useExpenseInputHandlers } from './useExpenseInputHandlers';

export const useRevenueCalculations = (): RevenueCalculationState => {
  const [expenseForecastMethod, setExpenseForecastMethod] = useState<string>("POR");

  // Get revenue-related inputs and handlers
  const revenueInputs = useRevenueInputHandlers();
  
  // Get expense-related inputs and handlers
  const expenseInputs = useExpenseInputHandlers(expenseForecastMethod);

  // Remove the override that was causing rounding issues
  // Let the ReserveForReplacementRow component handle its own blur logic

  return {
    ...revenueInputs,
    expenseForecastMethod,
    setExpenseForecastMethod,
    ...expenseInputs
    // Removed the handleReserveForReplacementBlur override
  };
};
