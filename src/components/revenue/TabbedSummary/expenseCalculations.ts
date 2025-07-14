
import { historicalExpenseData } from './expenseData';

export const calculateForecastExpense = (year: number, expenseType: string) => {
  // For now, return 0 for forecast years since we don't have expense forecast logic in TabbedSummary
  // This would need to be connected to the actual expense calculation logic
  return 0;
};

export const calculateTotalOtherOperatedExpense = (year: number, historicalYears: number[]) => {
  if (historicalYears.includes(year)) {
    return (historicalExpenseData.fb[year] || 0) +
           (historicalExpenseData.resortFee[year] || 0) +
           (historicalExpenseData.otherOperated[year] || 0) +
           (historicalExpenseData.miscellaneous[year] || 0) +
           (historicalExpenseData.allocated[year] || 0);
  } else {
    return calculateForecastExpense(year, 'fb') +
           calculateForecastExpense(year, 'resortFee') +
           calculateForecastExpense(year, 'otherOperated') +
           calculateForecastExpense(year, 'miscellaneous') +
           calculateForecastExpense(year, 'allocated');
  }
};

export const calculateTotalUndistributedExpense = (year: number, historicalYears: number[]) => {
  if (historicalYears.includes(year)) {
    return (historicalExpenseData.propertyOperations[year] || 0) +
           (historicalExpenseData.administrativeGeneral[year] || 0) +
           (historicalExpenseData.infoTechServices[year] || 0) +
           (historicalExpenseData.salesMarketing[year] || 0) +
           (historicalExpenseData.utilities[year] || 0);
  } else {
    return calculateForecastExpense(year, 'propertyOperations') +
           calculateForecastExpense(year, 'administrativeGeneral') +
           calculateForecastExpense(year, 'infoTechServices') +
           calculateForecastExpense(year, 'salesMarketing') +
           calculateForecastExpense(year, 'utilities');
  }
};

export const calculateTotalExpense = (year: number, historicalYears: number[]) => {
  const roomsExpense = historicalYears.includes(year) 
    ? (historicalExpenseData.rooms[year] || 0)
    : calculateForecastExpense(year, 'rooms');
  const totalOtherOperatedExpense = calculateTotalOtherOperatedExpense(year, historicalYears);
  const totalUndistributedExpense = calculateTotalUndistributedExpense(year, historicalYears);
  const nonOperating = historicalYears.includes(year) 
    ? (historicalExpenseData.nonOperating[year] || 0)
    : calculateForecastExpense(year, 'nonOperating');
  
  return roomsExpense + totalOtherOperatedExpense + totalUndistributedExpense + nonOperating;
};
