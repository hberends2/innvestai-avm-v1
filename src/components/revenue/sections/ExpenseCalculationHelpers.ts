
import { CalculationHelpers } from "../RevenueTableHelpers";

export interface ExpenseCalculationHelpers {
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  calculateTotalOtherOperatedExpense: (year: number) => number;
  getTotalHistoricalOtherOperatedExpense: (year: number) => number;
}

export const createExpenseCalculationHelpers = (
  props: {
    expenseForecastMethod: string;
    historicalExpenseData: any;
    fbExpenseInput: Record<number, string>;
    otherOperatedExpenseInput: Record<number, string>;
    miscellaneousExpenseInput: Record<number, string>;
    allocatedExpenseInput: Record<number, string>;
    helpers: CalculationHelpers;
  }
): ExpenseCalculationHelpers => {
  const calculateExpense = (year: number, inputValue: string, expenseType: string): number => {
    let expenseValue: number = parseFloat(inputValue || "0");

    if (props.expenseForecastMethod === "POR") {
      const occupiedRooms = props.helpers.getForecastOccupiedRoomsForYear(year);
      return expenseValue * occupiedRooms;
    } else {
      const totalRevenue = props.helpers.calculateTotalRevenue(year, false);
      return (expenseValue / 100) * totalRevenue;
    }
  };

  const calculateTotalOtherOperatedExpense = (year: number): number => {
    // Check if this is a historical year - if so, use historical data directly
    if (props.historicalExpenseData.fb[year] !== undefined) {
      return (props.historicalExpenseData.fb[year] || 0) +
             (props.historicalExpenseData.otherOperated[year] || 0) +
             (props.historicalExpenseData.miscellaneous[year] || 0) +
             (props.historicalExpenseData.allocated[year] || 0);
    } else {
      // For forecast years, calculate from inputs
      const fbExpense = calculateExpense(year, props.fbExpenseInput[year], 'fb');
      const otherOperatedExpense = calculateExpense(year, props.otherOperatedExpenseInput[year], 'otherOperated');
      const miscellaneousExpense = calculateExpense(year, props.miscellaneousExpenseInput[year], 'miscellaneous');
      const allocatedExpense = calculateExpense(year, props.allocatedExpenseInput[year], 'allocated');
      
      return fbExpense + otherOperatedExpense + miscellaneousExpense + allocatedExpense;
    }
  };

  const getTotalHistoricalOtherOperatedExpense = (year: number): number => {
    return (props.historicalExpenseData.fb[year] || 0) +
           (props.historicalExpenseData.otherOperated[year] || 0) +
           (props.historicalExpenseData.miscellaneous[year] || 0) +
           (props.historicalExpenseData.allocated[year] || 0);
  };

  return {
    calculateExpense,
    calculateTotalOtherOperatedExpense,
    getTotalHistoricalOtherOperatedExpense
  };
};
