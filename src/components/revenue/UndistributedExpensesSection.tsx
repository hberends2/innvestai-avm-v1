
import React from "react";
import MetricRow from "./MetricRow";
import SectionHeader from "./SectionHeader";

interface UndistributedExpensesSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  propertyOperationsExpenseInput: Record<number, string>;
  handlePropertyOperationsExpenseChange: (year: number, value: string) => void;
  handlePropertyOperationsExpenseBlur: (year: number, value: string) => void;
  administrativeGeneralExpenseInput: Record<number, string>;
  handleAdministrativeGeneralExpenseChange: (year: number, value: string) => void;
  handleAdministrativeGeneralExpenseBlur: (year: number, value: string) => void;
  infoTechServicesExpenseInput: Record<number, string>;
  handleInfoTechServicesExpenseChange: (year: number, value: string) => void;
  handleInfoTechServicesExpenseBlur: (year: number, value: string) => void;
  salesMarketingExpenseInput: Record<number, string>;
  handleSalesMarketingExpenseChange: (year: number, value: string) => void;
  handleSalesMarketingExpenseBlur: (year: number, value: string) => void;
  utilitiesExpenseInput: Record<number, string>;
  handleUtilitiesExpenseChange: (year: number, value: string) => void;
  handleUtilitiesExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  calculateExpense: (year: number, expenseType: string, method: string, input: Record<number, string>, historicalData: any, getHistoricalExpenseData: (year: number, expenseType: string) => string) => number;
  calculateTotalUndistributedExpenses: (year: number) => number;
  historicalExpenseData: any;
  getHistoricalExpenseData: (year: number, expenseType: string) => string;
}

const UndistributedExpensesSection: React.FC<UndistributedExpensesSectionProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  propertyOperationsExpenseInput,
  handlePropertyOperationsExpenseChange,
  handlePropertyOperationsExpenseBlur,
  administrativeGeneralExpenseInput,
  handleAdministrativeGeneralExpenseChange,
  handleAdministrativeGeneralExpenseBlur,
  infoTechServicesExpenseInput,
  handleInfoTechServicesExpenseChange,
  handleInfoTechServicesExpenseBlur,
  salesMarketingExpenseInput,
  handleSalesMarketingExpenseChange,
  handleSalesMarketingExpenseBlur,
  utilitiesExpenseInput,
  handleUtilitiesExpenseChange,
  handleUtilitiesExpenseBlur,
  formatCurrency,
  calculateExpense,
  calculateTotalUndistributedExpenses,
  historicalExpenseData,
  getHistoricalExpenseData
}) => {
  return (
    <>
      <SectionHeader 
        title="Undistributed Expense" 
        className="bg-gray-600"
      />

      <MetricRow
        label="Administrative & General"
        historicalData={historicalYears.map(year => formatCurrency(calculateExpense(year, "administrativeGeneral", expenseForecastMethod, administrativeGeneralExpenseInput, historicalExpenseData, getHistoricalExpenseData)))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, "administrativeGeneral", expenseForecastMethod, administrativeGeneralExpenseInput, historicalExpenseData, getHistoricalExpenseData)))}
        isEditable={true}
        editableData={administrativeGeneralExpenseInput}
        onEditableChange={handleAdministrativeGeneralExpenseChange}
        onEditableBlur={handleAdministrativeGeneralExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      <MetricRow
        label="Information Tech Services"
        historicalData={historicalYears.map(year => formatCurrency(calculateExpense(year, "infoTechServices", expenseForecastMethod, infoTechServicesExpenseInput, historicalExpenseData, getHistoricalExpenseData)))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, "infoTechServices", expenseForecastMethod, infoTechServicesExpenseInput, historicalExpenseData, getHistoricalExpenseData)))}
        isEditable={true}
        editableData={infoTechServicesExpenseInput}
        onEditableChange={handleInfoTechServicesExpenseChange}
        onEditableBlur={handleInfoTechServicesExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      <MetricRow
        label="Sales & Marketing"
        historicalData={historicalYears.map(year => formatCurrency(calculateExpense(year, "salesMarketing", expenseForecastMethod, salesMarketingExpenseInput, historicalExpenseData, getHistoricalExpenseData)))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, "salesMarketing", expenseForecastMethod, salesMarketingExpenseInput, historicalExpenseData, getHistoricalExpenseData)))}
        isEditable={true}
        editableData={salesMarketingExpenseInput}
        onEditableChange={handleSalesMarketingExpenseChange}
        onEditableBlur={handleSalesMarketingExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      <MetricRow
        label="Property Operations & Maintenance"
        historicalData={historicalYears.map(year => formatCurrency(calculateExpense(year, "propertyOperations", expenseForecastMethod, propertyOperationsExpenseInput, historicalExpenseData, getHistoricalExpenseData)))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, "propertyOperations", expenseForecastMethod, propertyOperationsExpenseInput, historicalExpenseData, getHistoricalExpenseData)))}
        isEditable={true}
        editableData={propertyOperationsExpenseInput}
        onEditableChange={handlePropertyOperationsExpenseChange}
        onEditableBlur={handlePropertyOperationsExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      <MetricRow
        label="Utilities"
        historicalData={historicalYears.map(year => formatCurrency(calculateExpense(year, "utilities", expenseForecastMethod, utilitiesExpenseInput, historicalExpenseData, getHistoricalExpenseData)))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, "utilities", expenseForecastMethod, utilitiesExpenseInput, historicalExpenseData, getHistoricalExpenseData)))}
        isEditable={true}
        editableData={utilitiesExpenseInput}
        onEditableChange={handleUtilitiesExpenseChange}
        onEditableBlur={handleUtilitiesExpenseBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />

      <MetricRow
        label="Total Undistributed Expenses"
        historicalData={historicalYears.map(year => formatCurrency(calculateTotalUndistributedExpenses(year)))}
        forecastData={forecastYears.map(year => formatCurrency(calculateTotalUndistributedExpenses(year)))}
      />
    </>
  );
};

export default UndistributedExpensesSection;
