
import React from "react";
import RoomsExpenseSection from "../RoomsExpenseSection";
import OtherOperatedExpenseSection from "../OtherOperatedExpenseSection";
import { CalculationHelpers } from "../RevenueTableHelpers";
import { ExpenseCalculationHelpers } from "./ExpenseCalculationHelpers";

interface OperatingExpensesContainerProps {
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
  historicalExpenseData: any;
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
  helpers: CalculationHelpers;
  expenseHelpers: ExpenseCalculationHelpers;
}

const OperatingExpensesContainer: React.FC<OperatingExpensesContainerProps> = (props) => {
  return (
    <>
      <RoomsExpenseSection
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        expenseForecastMethod={props.expenseForecastMethod}
        roomsExpenseInput={props.roomsExpenseInput}
        handleRoomsExpenseChange={props.handleRoomsExpenseChange}
        handleRoomsExpenseBlur={props.handleRoomsExpenseBlur}
        formatCurrency={props.formatCurrency}
        formatPercent={props.formatPercent}
        calculateExpense={props.expenseHelpers.calculateExpense}
        historicalExpenseData={props.historicalExpenseData}
        helpers={props.helpers}
      />

      <OtherOperatedExpenseSection
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        expenseForecastMethod={props.expenseForecastMethod}
        fbExpenseInput={props.fbExpenseInput}
        handleFbExpenseChange={props.handleFbExpenseChange}
        handleFbExpenseBlur={props.handleFbExpenseBlur}
        otherOperatedExpenseInput={props.otherOperatedExpenseInput}
        handleOtherOperatedExpenseChange={props.handleOtherOperatedExpenseChange}
        handleOtherOperatedExpenseBlur={props.handleOtherOperatedExpenseBlur}
        miscellaneousExpenseInput={props.miscellaneousExpenseInput}
        handleMiscellaneousExpenseChange={props.handleMiscellaneousExpenseChange}
        handleMiscellaneousExpenseBlur={props.handleMiscellaneousExpenseBlur}
        allocatedExpenseInput={props.allocatedExpenseInput}
        handleAllocatedExpenseChange={props.handleAllocatedExpenseChange}
        handleAllocatedExpenseBlur={props.handleAllocatedExpenseBlur}
        formatCurrency={props.formatCurrency}
        formatPercent={props.formatPercent}
        calculateExpense={props.expenseHelpers.calculateExpense}
        calculateTotalOtherOperatedExpense={props.expenseHelpers.calculateTotalOtherOperatedExpense}
        getTotalHistoricalOtherOperatedExpense={props.expenseHelpers.getTotalHistoricalOtherOperatedExpense}
        historicalExpenseData={props.historicalExpenseData}
        historicalData={props.historicalData}
        helpers={props.helpers}
      />
    </>
  );
};

export default OperatingExpensesContainer;
