import { useMemo } from 'react';
// import { RevenueCalculations } from '../types/revenueCalculations';

/**
 * Custom hook to manage ExpenseCalculationsProvider props
 * Simplifies the complex props passed to the expense provider
 */
export const useExpenseCalculationProviderProps = (
  revenueCalculations: any, // TODO: Use proper RevenueCalculations type when complete
  helpers: any,
  historicalYears: number[]
) => {
  
  const expenseProviderProps = useMemo(() => ({
    expenseForecastMethod: revenueCalculations.expenseForecastMethod,
    helpers,
    historicalYears,
    roomsExpenseInput: revenueCalculations.roomsExpenseInput,
    fbExpenseInput: revenueCalculations.fbExpenseInput,
    otherOperatedExpenseInput: revenueCalculations.otherOperatedExpenseInput,
    miscellaneousExpenseInput: revenueCalculations.miscellaneousExpenseInput,
    allocatedExpenseInput: revenueCalculations.allocatedExpenseInput,
    propertyOperationsExpenseInput: revenueCalculations.propertyOperationsExpenseInput,
    administrativeGeneralExpenseInput: revenueCalculations.administrativeGeneralExpenseInput,
    infoTechServicesExpenseInput: revenueCalculations.infoTechServicesExpenseInput,
    salesMarketingExpenseInput: revenueCalculations.salesMarketingExpenseInput,
    utilitiesExpenseInput: revenueCalculations.utilitiesExpenseInput,
    managementFeesExpenseInput: revenueCalculations.managementFeesExpenseInput,
    realEstateTaxesExpenseInput: revenueCalculations.realEstateTaxesExpenseInput,
    insuranceExpenseInput: revenueCalculations.insuranceExpenseInput,
    otherNonOpExpenseInput: revenueCalculations.otherNonOpExpenseInput,
  }), [revenueCalculations, helpers, historicalYears]);

  return expenseProviderProps;
};