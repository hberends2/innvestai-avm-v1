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
      : parseFloat(props.realEstateTaxesExpenseInput[year]?.replace(/[$,]/g, '') || "0");
    
    const insuranceExpense = props.historicalExpenseData?.insurance?.[year] !== undefined
      ? (props.historicalExpenseData.insurance[year] || 0)
      : parseFloat(props.insuranceExpenseInput[year]?.replace(/[$,]/g, '') || "0");
    
    const otherNonOpExpense = props.historicalExpenseData?.otherNonOp?.[year] !== undefined
      ? (props.historicalExpenseData.otherNonOp[year] || 0)
      : parseFloat(props.otherNonOpExpenseInput[year]?.replace(/[$,]/g, '') || "0");
    
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
      
      {/* Real Estate Taxes Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Real Estate Taxes</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Real Estate Taxes Input */}
      <MetricRow
        label="Real Estate Taxes"
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isEditable={true}
        editableData={props.realEstateTaxesExpenseInput}
        onEditableChange={props.handleRealEstateTaxesExpenseChange}
        onEditableBlur={props.handleRealEstateTaxesExpenseBlur}
        forecastYears={props.forecastYears}
        isUserInputRow={true}
        isIndented={true}
      />
      
      {/* Total Real Estate Taxes */}
      <MetricRow
        label="Total Real Estate Taxes"
        historicalData={props.historicalYears.map(year => 
          props.formatCurrency(props.historicalExpenseData?.realEstateTaxes?.[year] || 0)
        )}
        forecastData={props.forecastYears.map(year => {
          const amount = parseFloat(props.realEstateTaxesExpenseInput[year]?.replace(/[$,]/g, '') || "0");
          return props.formatCurrency(amount);
        })}
        isIndented={true}
      />

      {/* Insurance */}
      <tr id="insurance-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      {/* Insurance Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Insurance</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Insurance Input */}
      <MetricRow
        label="Insurance"
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isEditable={true}
        editableData={props.insuranceExpenseInput}
        onEditableChange={props.handleInsuranceExpenseChange}
        onEditableBlur={props.handleInsuranceExpenseBlur}
        forecastYears={props.forecastYears}
        isUserInputRow={true}
        isIndented={true}
      />
      
      {/* Total Insurance */}
      <MetricRow
        label="Total Insurance"
        historicalData={props.historicalYears.map(year => 
          props.formatCurrency(props.historicalExpenseData?.insurance?.[year] || 0)
        )}
        forecastData={props.forecastYears.map(year => {
          const amount = parseFloat(props.insuranceExpenseInput[year]?.replace(/[$,]/g, '') || "0");
          return props.formatCurrency(amount);
        })}
        isIndented={true}
      />

      {/* Other Non-Operating */}
      <tr id="other-non-operating-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      {/* Other Non-Operating Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Other Non-Operating</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Other Non-Operating Input */}
      <MetricRow
        label="Other Non-Operating"
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isEditable={true}
        editableData={props.otherNonOpExpenseInput}
        onEditableChange={props.handleOtherNonOpExpenseChange}
        onEditableBlur={props.handleOtherNonOpExpenseBlur}
        forecastYears={props.forecastYears}
        isUserInputRow={true}
        isIndented={true}
      />
      
      {/* Total Other Non-Operating */}
      <MetricRow
        label="Total Other Non-Operating"
        historicalData={props.historicalYears.map(year => 
          props.formatCurrency(props.historicalExpenseData?.otherNonOp?.[year] || 0)
        )}
        forecastData={props.forecastYears.map(year => {
          const amount = parseFloat(props.otherNonOpExpenseInput[year]?.replace(/[$,]/g, '') || "0");
          return props.formatCurrency(amount);
        })}
        isIndented={true}
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
