
import React from "react";
import MetricRow from "./MetricRow";
import ExpenseDropdownRow from "./ExpenseDropdownRow";
import { ExpenseInputHandlers } from "./ExpenseInputHandlers";

interface ExpenseSubSectionWithDropdownProps {
  sectionId: string;
  title: string;
  expenseType: string;
  dropdownValue: string;
  onDropdownChange: (value: string) => void;
  historicalYears: number[];
  forecastYears: number[];
  expenseInput: Record<number, string>;
  handleExpenseChange: (year: number, value: string) => void;
  handleExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  historicalExpenseData: any;
  historicalData: any;
  helpers: any;
}

const ExpenseSubSectionWithDropdown: React.FC<ExpenseSubSectionWithDropdownProps> = ({
  sectionId,
  title,
  expenseType,
  dropdownValue,
  onDropdownChange,
  historicalYears,
  forecastYears,
  expenseInput,
  handleExpenseChange,
  handleExpenseBlur,
  formatCurrency,
  historicalExpenseData,
  historicalData,
  helpers
}) => {
  // Create enhanced helpers object with department-specific revenue getters
  const enhancedHelpers = {
    ...helpers,
    getFbPerOccupiedRoomForYear: (year: number) => {
      // This should get the F&B per occupied room input for the given year
      // We need to access this from the parent component's state
      return parseFloat(helpers?.fbPerOccupiedRoom?.[year] || "0");
    },
    getOtherOperatedPerOccupiedRoomForYear: (year: number) => {
      return parseFloat(helpers?.otherOperatedPerOccupiedRoom?.[year] || "0");
    },
    getMiscellaneousPerOccupiedRoomForYear: (year: number) => {
      return parseFloat(helpers?.miscellaneousPerOccupiedRoom?.[year] || "0");
    }
  };

  // Create input handlers instance
  const inputHandlers = new ExpenseInputHandlers(
    dropdownValue,
    expenseType,
    historicalData,
    historicalExpenseData,
    formatCurrency,
    enhancedHelpers
  );

  // Function to format display values for historical data
  const formatHistoricalDisplay = (year: number): string => {
    const value = inputHandlers.getHistoricalExpenseData(year);
    return inputHandlers.formatDisplayValue(value);
  };

  // Function to format display values for forecast data (non-editable display)
  const formatForecastDisplay = (year: number): string => {
    const rawValue = expenseInput[year] || "";
    return rawValue ? inputHandlers.formatDisplayValue(rawValue) : "";
  };

  // Function to format input values for editing (add % symbol for percentage inputs)
  const formatInputValue = (year: number): string => {
    const rawValue = expenseInput[year] || "";
    if (!rawValue || rawValue === "0") return "";
    
    if (dropdownValue === "% of Revenue") {
      return `${rawValue}%`;
    } else {
      return rawValue;
    }
  };

  // Function to clean input value when editing (remove % symbol)
  const handleInputChange = (year: number, value: string) => {
    if (dropdownValue === "% of Revenue") {
      // Remove % symbol if present
      const cleanValue = value.replace('%', '');
      inputHandlers.handleCustomExpenseChange(year, cleanValue, handleExpenseChange);
    } else {
      inputHandlers.handleCustomExpenseChange(year, value, handleExpenseChange);
    }
  };

  const handleInputBlur = (year: number, value: string) => {
    if (dropdownValue === "% of Revenue") {
      // Remove % symbol if present
      const cleanValue = value.replace('%', '');
      inputHandlers.handleCustomExpenseBlur(year, cleanValue, handleExpenseBlur);
    } else {
      inputHandlers.handleCustomExpenseBlur(year, value, handleExpenseBlur);
    }
  };

  return (
    <>
      <tr id={sectionId} className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <ExpenseDropdownRow
        label={<>&nbsp;&nbsp;&nbsp;&nbsp;{title}</>}
        dropdownValue={dropdownValue}
        onDropdownChange={onDropdownChange}
        historicalYears={historicalYears}
        forecastYears={forecastYears}
      />

      <MetricRow
        label={<>&nbsp;&nbsp;&nbsp;&nbsp;{title} ({dropdownValue})</>}
        historicalData={historicalYears.map(year => formatHistoricalDisplay(year))}
        forecastData={forecastYears.map(year => formatForecastDisplay(year))}
        isEditable={true}
        editableData={forecastYears.reduce((acc, year) => ({
          ...acc,
          [year]: formatInputValue(year)
        }), {})}
        onEditableChange={handleInputChange}
        onEditableBlur={handleInputBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />
      
      <MetricRow
        label={<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{title}</>}
        historicalData={historicalYears.map(year => formatCurrency(historicalExpenseData?.[expenseType]?.[year] || 0))}
        forecastData={forecastYears.map(year => {
          // Use the inputHandlers.calculateExpense method with the correct parameters
          const calculatedExpense = inputHandlers.calculateExpense(year, expenseInput[year] || "0");
          return formatCurrency(calculatedExpense);
        })}
      />
    </>
  );
};

export default ExpenseSubSectionWithDropdown;
