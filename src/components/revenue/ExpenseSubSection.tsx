
import React from "react";
import MetricRow from "./MetricRow";

interface ExpenseSubSectionProps {
  title: string;
  expenseType: string;
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  expenseInput: Record<number, string>;
  handleExpenseChange: (year: number, value: string) => void;
  handleExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  historicalExpenseData: any;
  getHistoricalExpenseData: (year: number, expenseType: string) => string;
}

const ExpenseSubSection: React.FC<ExpenseSubSectionProps> = ({
  title,
  expenseType,
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  expenseInput,
  handleExpenseChange,
  handleExpenseBlur,
  formatCurrency,
  calculateExpense,
  historicalExpenseData,
  getHistoricalExpenseData
}) => {
  return (
    <>
      {/* Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">{title}</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Input/Data Rows */}
      <MetricRow
        label={`${title} (${expenseForecastMethod})`}
        historicalData={historicalYears.map(year => {
          const percentage = getHistoricalExpenseData(year, expenseType);
          return percentage ? `${percentage}%` : "";
        })}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={expenseInput}
        onEditableChange={handleExpenseChange}
        onEditableBlur={handleExpenseBlur}
        forecastYears={forecastYears}
        isYoYRow={expenseForecastMethod === "% of Revenue"}
        isUserInputRow={true}
        isIndented={true}
      />
      <MetricRow
        label={`Total ${title}`}
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData[expenseType]?.[year] || 0))}
        forecastData={forecastYears.map(year => formatCurrency(calculateExpense(year, expenseInput[year], expenseType)))}
        isIndented={true}
      />
    </>
  );
};

export default ExpenseSubSection;
