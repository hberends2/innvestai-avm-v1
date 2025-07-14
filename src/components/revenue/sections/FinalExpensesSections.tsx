
import React from "react";
import ConsolidatedNonOperatingExpensesSection from "./ConsolidatedNonOperatingExpensesSection";
import CapitalExpendituresSection from "./CapitalExpendituresSection";
import ExpenseSummarySection from "./ExpenseSummarySection";
import { CalculationHelpers } from "../RevenueTableHelpers";

interface FinalExpensesSectionsProps {
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
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  historicalExpenseData: any;
  helpers: CalculationHelpers;
}

const FinalExpensesSections: React.FC<FinalExpensesSectionsProps> = (props) => {
  const calculateTotalNonOperatingExpenses = (year: number): number => {
    const managementFeesExpense = props.historicalExpenseData?.managementFees?.[year] !== undefined
      ? (props.historicalExpenseData.managementFees[year] || 0)
      : props.calculateExpense(year, props.managementFeesExpenseInput[year], 'managementFees');
    
    const realEstateTaxesExpense = props.historicalExpenseData?.realEstateTaxes?.[year] !== undefined
      ? (props.historicalExpenseData.realEstateTaxes[year] || 0)
      : props.calculateExpense(year, props.realEstateTaxesExpenseInput[year], 'realEstateTaxes');
    
    const insuranceExpense = props.historicalExpenseData?.insurance?.[year] !== undefined
      ? (props.historicalExpenseData.insurance[year] || 0)
      : props.calculateExpense(year, props.insuranceExpenseInput[year], 'insurance');
    
    const otherNonOpExpense = props.historicalExpenseData?.otherNonOp?.[year] !== undefined
      ? (props.historicalExpenseData.otherNonOp[year] || 0)
      : props.calculateExpense(year, props.otherNonOpExpenseInput[year], 'otherNonOp');
    
    return managementFeesExpense + realEstateTaxesExpense + insuranceExpense + otherNonOpExpense;
  };

  return (
    <>
      <ConsolidatedNonOperatingExpensesSection
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
        calculateExpense={props.calculateExpense}
        formatCurrency={props.formatCurrency}
        historicalExpenseData={props.historicalExpenseData}
      />

      <ExpenseSummarySection
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        reserveForReplacementInput={props.reserveForReplacementInput}
        handleReserveForReplacementChange={props.handleReserveForReplacementChange}
        handleReserveForReplacementBlur={props.handleReserveForReplacementBlur}
        formatCurrency={props.formatCurrency}
        historicalExpenseData={props.historicalExpenseData}
        helpers={props.helpers}
        calculateTotalNonOperatingExpenses={calculateTotalNonOperatingExpenses}
      />

      <CapitalExpendituresSection
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        formatCurrency={props.formatCurrency}
      />
    </>
  );
};

export default FinalExpensesSections;
