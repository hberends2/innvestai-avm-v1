
import React from "react";
import MetricRow from "./MetricRow";
import ExpenseDropdownRow from "./ExpenseDropdownRow";
import { ExpenseInputHandlers } from "./ExpenseInputHandlers";

interface RoomsExpenseSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  roomsExpenseInput: Record<number, string>;
  handleRoomsExpenseChange: (year: number, value: string) => void;
  handleRoomsExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  historicalExpenseData: any;
  helpers: any;
}

const RoomsExpenseSection: React.FC<RoomsExpenseSectionProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  roomsExpenseInput,
  handleRoomsExpenseChange,
  handleRoomsExpenseBlur,
  formatCurrency,
  formatPercent,
  calculateExpense,
  historicalExpenseData,
  helpers
}) => {
  // State for rooms expense dropdown selection
  const [roomsExpenseMethod, setRoomsExpenseMethod] = React.useState<string>("POR");

  // Create input handlers instance for rooms expense
  const inputHandlers = new ExpenseInputHandlers(
    roomsExpenseMethod,
    'rooms',
    {}, // historicalData - will be handled by helpers
    historicalExpenseData,
    formatCurrency,
    helpers
  );

  // Function to get historical expense data based on method
  const getHistoricalExpenseData = (year: number): string => {
    const totalExpense = historicalExpenseData.rooms[year] || 0;
    
    if (roomsExpenseMethod === "POR") {
      const occupiedRooms = helpers.getHistoricalOccupiedRoomsForYear(year);
      const perRoom = occupiedRooms > 0 ? totalExpense / occupiedRooms : 0;
      return Math.round(perRoom).toString();
    } else if (roomsExpenseMethod === "% of Revenue") {
      const totalRevenue = helpers.calculateTotalRevenue(year, true);
      const percentage = totalRevenue > 0 ? (totalExpense / totalRevenue) * 100 : 0;
      return percentage.toFixed(1);
    } else {
      // Manual Input
      return formatCurrency(totalExpense).replace('$', '').replace(/,/g, '');
    }
  };

  // Function to format display values for historical data
  const formatHistoricalDisplay = (year: number): string => {
    const value = getHistoricalExpenseData(year);
    return inputHandlers.formatDisplayValue(value);
  };

  // Function to format display values for forecast data
  const formatForecastDisplay = (year: number): string => {
    const rawValue = roomsExpenseInput[year] || "";
    return rawValue ? inputHandlers.formatDisplayValue(rawValue) : "";
  };

  // Function to format input values for editing
  const formatInputValue = (year: number): string => {
    const rawValue = roomsExpenseInput[year] || "";
    if (!rawValue || rawValue === "0") return "";
    
    if (roomsExpenseMethod === "% of Revenue") {
      return `${rawValue}%`;
    } else {
      return rawValue;
    }
  };

  // Function to handle input changes
  const handleInputChange = (year: number, value: string) => {
    if (roomsExpenseMethod === "% of Revenue") {
      const cleanValue = value.replace('%', '');
      inputHandlers.handleCustomExpenseChange(year, cleanValue, handleRoomsExpenseChange);
    } else {
      inputHandlers.handleCustomExpenseChange(year, value, handleRoomsExpenseChange);
    }
  };

  const handleInputBlur = (year: number, value: string) => {
    if (roomsExpenseMethod === "% of Revenue") {
      const cleanValue = value.replace('%', '');
      inputHandlers.handleCustomExpenseBlur(year, cleanValue, handleRoomsExpenseBlur);
    } else {
      inputHandlers.handleCustomExpenseBlur(year, value, handleRoomsExpenseBlur);
    }
  };

  // Calculate expense using the rooms method
  const calculateRoomsExpense = (year: number): number => {
    const inputValue = roomsExpenseInput[year] || "0";
    const input = parseFloat(inputValue);
    
    if (roomsExpenseMethod === "POR") {
      const occupiedRooms = helpers.getForecastOccupiedRoomsForYear(year);
      return input * occupiedRooms;
    } else if (roomsExpenseMethod === "% of Revenue") {
      const totalRevenue = helpers.calculateTotalRevenue(year, false);
      return (input / 100) * totalRevenue;
    } else {
      // Manual Input
      return input;
    }
  };

  return (
    <>
      <tr id="rooms-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Rooms Expense</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
        isMajorSectionHeader={true}
      />

      <ExpenseDropdownRow
        label="Forecast Method"
        dropdownValue={roomsExpenseMethod}
        onDropdownChange={setRoomsExpenseMethod}
        historicalYears={historicalYears}
        forecastYears={forecastYears}
      />

      <MetricRow
        label={`Rooms Expense (${roomsExpenseMethod})`}
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
        isIndented={true}
      />
      
      <MetricRow
        label={<span className="font-bold italic">Total Rooms Expense</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(historicalExpenseData.rooms[year] || 0)}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(calculateRoomsExpense(year))}
          </span>
        ))}
        isIndented={true}
      />
    </>
  );
};

export default RoomsExpenseSection;
