
import React from "react";
import RoomsExpenseSection from "../RoomsExpenseSection";
import OtherOperatedExpenseSection from "../OtherOperatedExpenseSection";
import { historicalExpenseData } from "../ExpenseData";

interface OperatingExpensesSectionsProps {
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
  expenseForecastMethod: string;
  roomsExpenseInput: Record<number, string>;
  handleRoomsExpenseChange: (year: number, value: string) => void;
  handleRoomsExpenseBlur: (year: number, value: string) => void;
  fbExpenseInput: Record<number, string>;
  handleFbExpenseChange: (year: number, value: string) => void;
  handleFbExpenseBlur: (year: number, value: string) => void;
  otherOperatedExpenseInput: Record<number, string>;
  handleOtherOperatedExpenseChange: (year: number, value: string) => void;
  handleOtherOperatedExpenseBlur: (year: number, value: string) => void;
  miscellaneousExpenseInput: Record<number, string>;
  handleMiscellaneousExpenseChange: (year: number, value: string) => void;
  handleMiscellaneousExpenseBlur: (year: number, value: string) => void;
  allocatedExpenseInput: Record<number, string>;
  handleAllocatedExpenseChange: (year: number, value: string) => void;
  handleAllocatedExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  helpers: any;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
}

const OperatingExpensesSections: React.FC<OperatingExpensesSectionsProps> = ({
  historicalYears,
  forecastYears,
  historicalData,
  expenseForecastMethod,
  roomsExpenseInput,
  handleRoomsExpenseChange,
  handleRoomsExpenseBlur,
  fbExpenseInput,
  handleFbExpenseChange,
  handleFbExpenseBlur,
  otherOperatedExpenseInput,
  handleOtherOperatedExpenseChange,
  handleOtherOperatedExpenseBlur,
  miscellaneousExpenseInput,
  handleMiscellaneousExpenseChange,
  handleMiscellaneousExpenseBlur,
  allocatedExpenseInput,
  handleAllocatedExpenseChange,
  handleAllocatedExpenseBlur,
  formatCurrency,
  formatPercent,
  helpers,
  calculateExpense
}) => {
  console.log('OperatingExpensesSections historicalExpenseData:', historicalExpenseData);
  console.log('OperatingExpensesSections FB data:', historicalExpenseData.fb);
  console.log('OperatingExpensesSections Other Operated data:', historicalExpenseData.otherOperated);
  console.log('OperatingExpensesSections Miscellaneous data:', historicalExpenseData.miscellaneous);

  // Helper functions for calculating totals
  const calculateTotalOtherOperatedExpense = (year: number): number => {
    if (historicalExpenseData.fb[year] !== undefined) {
      return (historicalExpenseData.fb[year] || 0) +
             (historicalExpenseData.otherOperated[year] || 0) +
             (historicalExpenseData.miscellaneous[year] || 0) +
             (historicalExpenseData.allocated[year] || 0);
    } else {
      const fbExpense = calculateExpense(year, fbExpenseInput[year], 'fb');
      const otherOperatedExpense = calculateExpense(year, otherOperatedExpenseInput[year], 'otherOperated');
      const miscellaneousExpense = calculateExpense(year, miscellaneousExpenseInput[year], 'miscellaneous');
      const allocatedExpense = calculateExpense(year, allocatedExpenseInput[year], 'allocated');
      
      return fbExpense + otherOperatedExpense + miscellaneousExpense + allocatedExpense;
    }
  };

  const getTotalHistoricalOtherOperatedExpense = (year: number): number => {
    return (historicalExpenseData.fb[year] || 0) +
           (historicalExpenseData.otherOperated[year] || 0) +
           (historicalExpenseData.miscellaneous[year] || 0) +
           (historicalExpenseData.allocated[year] || 0);
  };

  return (
    <>
      {/* Rooms Expense Section */}
      <RoomsExpenseSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        expenseForecastMethod={expenseForecastMethod}
        roomsExpenseInput={roomsExpenseInput}
        handleRoomsExpenseChange={handleRoomsExpenseChange}
        handleRoomsExpenseBlur={handleRoomsExpenseBlur}
        formatCurrency={formatCurrency}
        formatPercent={formatPercent}
        calculateExpense={calculateExpense}
        historicalExpenseData={historicalExpenseData}
        helpers={helpers}
      />

      <OtherOperatedExpenseSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        expenseForecastMethod={expenseForecastMethod}
        fbExpenseInput={fbExpenseInput}
        handleFbExpenseChange={handleFbExpenseChange}
        handleFbExpenseBlur={handleFbExpenseBlur}
        otherOperatedExpenseInput={otherOperatedExpenseInput}
        handleOtherOperatedExpenseChange={handleOtherOperatedExpenseChange}
        handleOtherOperatedExpenseBlur={handleOtherOperatedExpenseBlur}
        miscellaneousExpenseInput={miscellaneousExpenseInput}
        handleMiscellaneousExpenseChange={handleMiscellaneousExpenseChange}
        handleMiscellaneousExpenseBlur={handleMiscellaneousExpenseBlur}
        allocatedExpenseInput={allocatedExpenseInput}
        handleAllocatedExpenseChange={handleAllocatedExpenseChange}
        handleAllocatedExpenseBlur={handleAllocatedExpenseBlur}
        formatCurrency={formatCurrency}
        formatPercent={formatPercent}
        calculateExpense={calculateExpense}
        calculateTotalOtherOperatedExpense={calculateTotalOtherOperatedExpense}
        getTotalHistoricalOtherOperatedExpense={getTotalHistoricalOtherOperatedExpense}
        historicalExpenseData={historicalExpenseData}
        historicalData={historicalData}
        helpers={helpers}
      />
    </>
  );
};

export default OperatingExpensesSections;
