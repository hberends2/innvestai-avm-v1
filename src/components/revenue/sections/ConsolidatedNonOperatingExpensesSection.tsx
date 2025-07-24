import React from "react";
import ExpenseSubSection from "../ExpenseSubSection";
import MetricRow from "../MetricRow";
import { CalculationHelpers } from "../RevenueTableHelpers";

interface ConsolidatedNonOperatingExpensesSectionProps {
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
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  formatCurrency: (value: number) => string;
  historicalExpenseData: any;
  helpers: CalculationHelpers;
}

const ConsolidatedNonOperatingExpensesSection: React.FC<ConsolidatedNonOperatingExpensesSectionProps> = (props) => {
  const calculateTotalNonOperatingExpenses = (year: number): number => {
    const managementFeesExpense = props.historicalExpenseData?.managementFees?.[year] !== undefined
      ? (props.historicalExpenseData.managementFees[year] || 0)
      : (() => {
          const percentage = parseFloat(props.managementFeesExpenseInput[year] || "0") / 100;
          const totalRevenue = props.helpers.calculateTotalRevenue(year, false);
          return percentage * totalRevenue;
        })();
    
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
      {/* Non-Operating Expense Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Non-Operating Expense</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
        isMajorSectionHeader={true}
      />

      {/* Management Fees */}
      <tr id="management-fees-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      {/* Management Fees Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Management Fees</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Management Fees (% of Revenue) */}
      <MetricRow
        label="Management Fees (% of Revenue)"
        historicalData={props.historicalYears.map(year => {
          const totalManagementFees = props.historicalExpenseData?.managementFees?.[year] || 0;
          const totalRevenue = props.helpers.calculateTotalRevenue(year, true);
          if (totalRevenue > 0) {
            const percentage = (totalManagementFees / totalRevenue) * 100;
            return `${percentage.toFixed(1)}%`;
          }
          return "";
        })}
        forecastData={props.forecastYears.map(() => "")}
        isEditable={true}
        editableData={props.managementFeesExpenseInput}
        onEditableChange={props.handleManagementFeesExpenseChange}
        onEditableBlur={props.handleManagementFeesExpenseBlur}
        forecastYears={props.forecastYears}
        isYoYRow={true}
        isUserInputRow={true}
        isIndented={true}
      />
      
      {/* Total Management Fees */}
      <MetricRow
        label="Total Management Fees"
        historicalData={props.historicalYears.map(year => 
          props.formatCurrency(props.historicalExpenseData?.managementFees?.[year] || 0)
        )}
        forecastData={props.forecastYears.map(year => {
          const percentage = parseFloat(props.managementFeesExpenseInput[year] || "0") / 100;
          const totalRevenue = props.helpers.calculateTotalRevenue(year, false);
          const totalManagementFees = percentage * totalRevenue;
          return props.formatCurrency(totalManagementFees);
        })}
        isIndented={true}
      />

      {/* Real Estate Taxes */}
      <tr id="real-estate-taxes-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      <ExpenseSubSection
        title="Real Estate Taxes"
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        historicalExpenseData={props.historicalExpenseData}
        expenseType="realEstateTaxes"
        expenseForecastMethod={props.expenseForecastMethod}
        expenseInput={props.realEstateTaxesExpenseInput}
        handleExpenseChange={props.handleRealEstateTaxesExpenseChange}
        handleExpenseBlur={props.handleRealEstateTaxesExpenseBlur}
        calculateExpense={props.calculateExpense}
        formatCurrency={props.formatCurrency}
        getHistoricalExpenseData={(year, expenseType) => ""}
      />

      {/* Insurance */}
      <tr id="insurance-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      <ExpenseSubSection
        title="Insurance"
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        historicalExpenseData={props.historicalExpenseData}
        expenseType="insurance"
        expenseForecastMethod={props.expenseForecastMethod}
        expenseInput={props.insuranceExpenseInput}
        handleExpenseChange={props.handleInsuranceExpenseChange}
        handleExpenseBlur={props.handleInsuranceExpenseBlur}
        calculateExpense={props.calculateExpense}
        formatCurrency={props.formatCurrency}
        getHistoricalExpenseData={(year, expenseType) => ""}
      />

      {/* Other Non-Operating */}
      <tr id="other-non-operating-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      <ExpenseSubSection
        title="Other Non-Operating"
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        historicalExpenseData={props.historicalExpenseData}
        expenseType="otherNonOp"
        expenseForecastMethod={props.expenseForecastMethod}
        expenseInput={props.otherNonOpExpenseInput}
        handleExpenseChange={props.handleOtherNonOpExpenseChange}
        handleExpenseBlur={props.handleOtherNonOpExpenseBlur}
        calculateExpense={props.calculateExpense}
        formatCurrency={props.formatCurrency}
        getHistoricalExpenseData={(year, expenseType) => ""}
      />

      {/* Total Non-Operating Expenses */}
      <MetricRow
        label={<span className="font-bold italic">Total Non-Operating Expenses</span>}
        historicalData={props.historicalYears.map(year => 
          <span className="font-bold italic">
            {props.formatCurrency(calculateTotalNonOperatingExpenses(year))}
          </span>
        )}
        forecastData={props.forecastYears.map(year => 
          <span className="font-bold italic">
            {props.formatCurrency(calculateTotalNonOperatingExpenses(year))}
          </span>
        )}
        className="border-t border-gray-300"
      />
    </>
  );
};

export default ConsolidatedNonOperatingExpensesSection;
