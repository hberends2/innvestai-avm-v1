
import React from "react";
import SectionHeader from "../SectionHeader";
import FinalExpensesSections from "./FinalExpensesSections";
import { CalculationHelpers } from "../RevenueTableHelpers";
import { ExpenseCalculationHelpers } from "./ExpenseCalculationHelpers";

interface NonOperatingExpensesContainerProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  managementFeesExpenseInput: Record<number, string>;
  handleManagementFeesExpenseChange: (year: number, value: string) => void;
  handleManagementFeesExpenseBlur: (year: number, value: string) => void;
  realEstateTaxesExpenseInput: Record<number, string>;
  handleRealEstateTaxesExpenseChange: (year: number, value: string) => void;
  handleRealEstateTaxesExpenseBlur: (year: number, value: string) => void;
  insuranceExpenseInput: Record<number, string>;
  handleInsuranceExpenseChange: (year: number, value: string) => void;
  handleInsuranceExpenseBlur: (year: number, value: string) => void;
  otherNonOpExpenseInput: Record<number, string>;
  handleOtherNonOpExpenseChange: (year: number, value: string) => void;
  handleOtherNonOpExpenseBlur: (year: number, value: string) => void;
  reserveForReplacementInput: Record<number, string>;
  handleReserveForReplacementChange: (year: number, value: string) => void;
  handleReserveForReplacementBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  historicalExpenseData: any;
  helpers: CalculationHelpers;
  expenseHelpers: ExpenseCalculationHelpers;
}

const NonOperatingExpensesContainer: React.FC<NonOperatingExpensesContainerProps> = (props) => {
  return (
    <>
      <SectionHeader 
        title="Non-Operating Expense" 
        className="bg-gray-200"
      />

      <FinalExpensesSections
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        expenseForecastMethod={props.expenseForecastMethod}
        managementFeesExpenseInput={props.managementFeesExpenseInput}
        handleManagementFeesExpenseChange={props.handleManagementFeesExpenseChange}
        handleManagementFeesExpenseBlur={props.handleManagementFeesExpenseBlur}
        realEstateTaxesExpenseInput={props.realEstateTaxesExpenseInput}
        handleRealEstateTaxesExpenseChange={props.handleRealEstateTaxesExpenseChange}
        handleRealEstateTaxesExpenseBlur={props.handleRealEstateTaxesExpenseBlur}
        insuranceExpenseInput={props.insuranceExpenseInput}
        handleInsuranceExpenseChange={props.handleInsuranceExpenseChange}
        handleInsuranceExpenseBlur={props.handleInsuranceExpenseBlur}
        otherNonOpExpenseInput={props.otherNonOpExpenseInput}
        handleOtherNonOpExpenseChange={props.handleOtherNonOpExpenseChange}
        handleOtherNonOpExpenseBlur={props.handleOtherNonOpExpenseBlur}
        reserveForReplacementInput={props.reserveForReplacementInput}
        handleReserveForReplacementChange={props.handleReserveForReplacementChange}
        handleReserveForReplacementBlur={props.handleReserveForReplacementBlur}
        formatCurrency={props.formatCurrency}
        formatPercent={props.formatPercent}
        calculateExpense={props.expenseHelpers.calculateExpense}
        historicalExpenseData={props.historicalExpenseData}
        helpers={props.helpers}
      />
    </>
  );
};

export default NonOperatingExpensesContainer;
