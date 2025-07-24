
import { CalculationHelpers } from "../RevenueTableHelpers";

export interface ExpenseSummaryCalculations {
  calculateTotalExpense: (year: number) => number;
  calculateEBITDA: (year: number) => number;
  calculateReserveForReplacement: (year: number) => number;
  calculateNetOperatingIncome: (year: number) => number;
}

export const createExpenseSummaryCalculations = (
  historicalYears: number[],
  reserveForReplacementInput: Record<number, string>,
  historicalExpenseData: any,
  helpers: CalculationHelpers,
  calculateTotalNonOperatingExpenses: (year: number) => number,
  reserveForReplacementPercentage: string
): ExpenseSummaryCalculations => {
  
  const calculateTotalExpense = (year: number): number => {
    const isHistorical = historicalYears.includes(year);
    
    const roomsExpense = isHistorical 
      ? (historicalExpenseData?.rooms?.[year] || 0)
      : 0;
    
    const totalOtherExpense = isHistorical
      ? ((historicalExpenseData?.fb?.[year] || 0) + 
         (historicalExpenseData?.otherOperated?.[year] || 0) + 
         (historicalExpenseData?.miscellaneous?.[year] || 0) + 
         (historicalExpenseData?.allocated?.[year] || 0))
      : 0;
    
    const totalUndistributedExpense = isHistorical
      ? ((historicalExpenseData?.propertyOperations?.[year] || 0) +
         (historicalExpenseData?.administrativeGeneral?.[year] || 0) +
         (historicalExpenseData?.infoTechServices?.[year] || 0) +
         (historicalExpenseData?.salesMarketing?.[year] || 0) +
         (historicalExpenseData?.utilities?.[year] || 0))
      : 0;
    
    const totalNonOperatingExpenses = calculateTotalNonOperatingExpenses(year);
    
    return roomsExpense + totalOtherExpense + totalUndistributedExpense + totalNonOperatingExpenses;
  };

  const calculateEBITDA = (year: number): number => {
    const totalRevenue = helpers.calculateTotalRevenue(year, historicalYears.includes(year));
    const totalExpense = calculateTotalExpense(year);
    return totalRevenue - totalExpense;
  };

  const calculateReserveForReplacement = (year: number): number => {
    if (historicalYears.includes(year)) {
      return 0;
    }
    
    // Use the percentage from Valuation page instead of user input
    const percentageValue = parseFloat(reserveForReplacementPercentage || "0");
    const totalRevenue = helpers.calculateTotalRevenue(year, false);
    return (percentageValue / 100) * totalRevenue;
  };

  const calculateNetOperatingIncome = (year: number): number => {
    const ebitda = calculateEBITDA(year);
    const reserveForReplacement = calculateReserveForReplacement(year);
    return ebitda - reserveForReplacement;
  };

  return {
    calculateTotalExpense,
    calculateEBITDA,
    calculateReserveForReplacement,
    calculateNetOperatingIncome
  };
};
