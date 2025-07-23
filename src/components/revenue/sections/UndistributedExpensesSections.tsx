
import React from "react";
import MetricRow from "../MetricRow";
import ExpenseDropdownRow from "../ExpenseDropdownRow";
import { ExpenseInputHandlers } from "../ExpenseInputHandlers";
import { CalculationHelpers } from "../RevenueTableHelpers";
import { ExpenseCalculationHelpers } from "./ExpenseCalculationHelpers";

interface UndistributedExpensesSectionsProps {
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
  formatPercent: (value: number, decimals?: number) => string;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  historicalExpenseData: any;
  helpers: CalculationHelpers;
}

const UndistributedExpensesSections: React.FC<UndistributedExpensesSectionsProps> = (props) => {
  // State for Administrative & General dropdown selection
  const [adminGeneralMethod, setAdminGeneralMethod] = React.useState<string>("POR");
  
  // State for Information Tech Services dropdown selection
  const [infoTechMethod, setInfoTechMethod] = React.useState<string>("POR");
  
  // State for Sales & Marketing dropdown selection
  const [salesMarketingMethod, setSalesMarketingMethod] = React.useState<string>("POR");
  
  // State for Property Operations & Maintenance dropdown selection
  const [propertyOperationsMethod, setPropertyOperationsMethod] = React.useState<string>("POR");
  
  // State for Utilities dropdown selection
  const [utilitiesMethod, setUtilitiesMethod] = React.useState<string>("POR");

  // Create input handlers instance for Administrative & General
  const adminGeneralInputHandlers = new ExpenseInputHandlers(
    adminGeneralMethod,
    'administrativeGeneral',
    {}, // historicalData - will be handled by helpers
    props.historicalExpenseData,
    props.formatCurrency,
    props.helpers
  );

  // Create input handlers instance for Information Tech Services
  const infoTechInputHandlers = new ExpenseInputHandlers(
    infoTechMethod,
    'infoTechServices',
    {}, // historicalData - will be handled by helpers
    props.historicalExpenseData,
    props.formatCurrency,
    props.helpers
  );

  // Create input handlers instance for Sales & Marketing
  const salesMarketingInputHandlers = new ExpenseInputHandlers(
    salesMarketingMethod,
    'salesMarketing',
    {}, // historicalData - will be handled by helpers
    props.historicalExpenseData,
    props.formatCurrency,
    props.helpers
  );

  // Create input handlers instance for Property Operations & Maintenance
  const propertyOperationsInputHandlers = new ExpenseInputHandlers(
    propertyOperationsMethod,
    'propertyOperations',
    {}, // historicalData - will be handled by helpers
    props.historicalExpenseData,
    props.formatCurrency,
    props.helpers
  );

  // Create input handlers instance for Utilities
  const utilitiesInputHandlers = new ExpenseInputHandlers(
    utilitiesMethod,
    'utilities',
    {}, // historicalData - will be handled by helpers
    props.historicalExpenseData,
    props.formatCurrency,
    props.helpers
  );

  // Function to get historical expense data for Administrative & General
  const getAdminGeneralHistoricalExpenseData = (year: number): string => {
    const totalExpense = props.historicalExpenseData.administrativeGeneral[year] || 0;
    
    if (adminGeneralMethod === "POR") {
      const occupiedRooms = props.helpers.getHistoricalOccupiedRoomsForYear(year);
      const perRoom = occupiedRooms > 0 ? totalExpense / occupiedRooms : 0;
      return Math.round(perRoom).toString();
    } else if (adminGeneralMethod === "% of Revenue") {
      const totalRevenue = props.helpers.calculateTotalRevenue(year, true);
      const percentage = totalRevenue > 0 ? (totalExpense / totalRevenue) * 100 : 0;
      return percentage.toFixed(1);
    } else {
      // Manual Input
      return props.formatCurrency(totalExpense).replace('$', '').replace(/,/g, '');
    }
  };

  // Function to format display values for Administrative & General historical data
  const formatAdminGeneralHistoricalDisplay = (year: number): string => {
    const value = getAdminGeneralHistoricalExpenseData(year);
    return adminGeneralInputHandlers.formatDisplayValue(value);
  };

  // Function to format display values for Administrative & General forecast data
  const formatAdminGeneralForecastDisplay = (year: number): string => {
    const rawValue = props.administrativeGeneralExpenseInput[year] || "";
    return rawValue ? adminGeneralInputHandlers.formatDisplayValue(rawValue) : "";
  };

  // Function to format input values for Administrative & General editing
  const formatAdminGeneralInputValue = (year: number): string => {
    const rawValue = props.administrativeGeneralExpenseInput[year] || "";
    if (!rawValue || rawValue === "0") return "";
    
    if (adminGeneralMethod === "% of Revenue") {
      return `${rawValue}%`;
    } else {
      return rawValue;
    }
  };

  // Function to handle Administrative & General input changes
  const handleAdminGeneralInputChange = (year: number, value: string) => {
    if (adminGeneralMethod === "% of Revenue") {
      const cleanValue = value.replace('%', '');
      adminGeneralInputHandlers.handleCustomExpenseChange(year, cleanValue, props.handleAdministrativeGeneralExpenseChange);
    } else {
      adminGeneralInputHandlers.handleCustomExpenseChange(year, value, props.handleAdministrativeGeneralExpenseChange);
    }
  };

  const handleAdminGeneralInputBlur = (year: number, value: string) => {
    if (adminGeneralMethod === "% of Revenue") {
      const cleanValue = value.replace('%', '');
      adminGeneralInputHandlers.handleCustomExpenseBlur(year, cleanValue, props.handleAdministrativeGeneralExpenseBlur);
    } else {
      adminGeneralInputHandlers.handleCustomExpenseBlur(year, value, props.handleAdministrativeGeneralExpenseBlur);
    }
  };

  // Calculate Administrative & General expense using the selected method
  const calculateAdminGeneralExpense = (year: number): number => {
    const inputValue = props.administrativeGeneralExpenseInput[year] || "0";
    const input = parseFloat(inputValue);
    
    if (adminGeneralMethod === "POR") {
      const occupiedRooms = props.helpers.getForecastOccupiedRoomsForYear(year);
      return input * occupiedRooms;
    } else if (adminGeneralMethod === "% of Revenue") {
      const totalRevenue = props.helpers.calculateTotalRevenue(year, false);
      return (input / 100) * totalRevenue;
    } else {
      // Manual Input
      return input;
    }
  };

  // Function to get historical expense data for Information Tech Services
  const getInfoTechHistoricalExpenseData = (year: number): string => {
    const totalExpense = props.historicalExpenseData.infoTechServices[year] || 0;
    
    if (infoTechMethod === "POR") {
      const occupiedRooms = props.helpers.getHistoricalOccupiedRoomsForYear(year);
      const perRoom = occupiedRooms > 0 ? totalExpense / occupiedRooms : 0;
      return Math.round(perRoom).toString();
    } else if (infoTechMethod === "% of Revenue") {
      const totalRevenue = props.helpers.calculateTotalRevenue(year, true);
      const percentage = totalRevenue > 0 ? (totalExpense / totalRevenue) * 100 : 0;
      return percentage.toFixed(1);
    } else {
      // Manual Input
      return props.formatCurrency(totalExpense).replace('$', '').replace(/,/g, '');
    }
  };

  // Function to format display values for Information Tech Services historical data
  const formatInfoTechHistoricalDisplay = (year: number): string => {
    const value = getInfoTechHistoricalExpenseData(year);
    return infoTechInputHandlers.formatDisplayValue(value);
  };

  // Function to format display values for Information Tech Services forecast data
  const formatInfoTechForecastDisplay = (year: number): string => {
    const rawValue = props.infoTechServicesExpenseInput[year] || "";
    return rawValue ? infoTechInputHandlers.formatDisplayValue(rawValue) : "";
  };

  // Function to format input values for Information Tech Services editing
  const formatInfoTechInputValue = (year: number): string => {
    const rawValue = props.infoTechServicesExpenseInput[year] || "";
    if (!rawValue || rawValue === "0") return "";
    
    if (infoTechMethod === "% of Revenue") {
      return `${rawValue}%`;
    } else {
      return rawValue;
    }
  };

  // Function to handle Information Tech Services input changes
  const handleInfoTechInputChange = (year: number, value: string) => {
    if (infoTechMethod === "% of Revenue") {
      const cleanValue = value.replace('%', '');
      infoTechInputHandlers.handleCustomExpenseChange(year, cleanValue, props.handleInfoTechServicesExpenseChange);
    } else {
      infoTechInputHandlers.handleCustomExpenseChange(year, value, props.handleInfoTechServicesExpenseChange);
    }
  };

  const handleInfoTechInputBlur = (year: number, value: string) => {
    if (infoTechMethod === "% of Revenue") {
      const cleanValue = value.replace('%', '');
      infoTechInputHandlers.handleCustomExpenseBlur(year, cleanValue, props.handleInfoTechServicesExpenseBlur);
    } else {
      infoTechInputHandlers.handleCustomExpenseBlur(year, value, props.handleInfoTechServicesExpenseBlur);
    }
  };

  // Calculate Information Tech Services expense using the selected method
  const calculateInfoTechExpense = (year: number): number => {
    const inputValue = props.infoTechServicesExpenseInput[year] || "0";
    const input = parseFloat(inputValue);
    
    if (infoTechMethod === "POR") {
      const occupiedRooms = props.helpers.getForecastOccupiedRoomsForYear(year);
      return input * occupiedRooms;
    } else if (infoTechMethod === "% of Revenue") {
      const totalRevenue = props.helpers.calculateTotalRevenue(year, false);
      return (input / 100) * totalRevenue;
    } else {
      // Manual Input
      return input;
    }
  };

  // Function to get historical expense data for Sales & Marketing
  const getSalesMarketingHistoricalExpenseData = (year: number): string => {
    const totalExpense = props.historicalExpenseData.salesMarketing[year] || 0;
    
    if (salesMarketingMethod === "POR") {
      const occupiedRooms = props.helpers.getHistoricalOccupiedRoomsForYear(year);
      const perRoom = occupiedRooms > 0 ? totalExpense / occupiedRooms : 0;
      return Math.round(perRoom).toString();
    } else if (salesMarketingMethod === "% of Revenue") {
      const totalRevenue = props.helpers.calculateTotalRevenue(year, true);
      const percentage = totalRevenue > 0 ? (totalExpense / totalRevenue) * 100 : 0;
      return percentage.toFixed(1);
    } else {
      // Manual Input
      return props.formatCurrency(totalExpense).replace('$', '').replace(/,/g, '');
    }
  };

  // Function to format display values for Sales & Marketing historical data
  const formatSalesMarketingHistoricalDisplay = (year: number): string => {
    const value = getSalesMarketingHistoricalExpenseData(year);
    return salesMarketingInputHandlers.formatDisplayValue(value);
  };

  // Function to format display values for Sales & Marketing forecast data
  const formatSalesMarketingForecastDisplay = (year: number): string => {
    const rawValue = props.salesMarketingExpenseInput[year] || "";
    return rawValue ? salesMarketingInputHandlers.formatDisplayValue(rawValue) : "";
  };

  // Function to format input values for Sales & Marketing editing
  const formatSalesMarketingInputValue = (year: number): string => {
    const rawValue = props.salesMarketingExpenseInput[year] || "";
    if (!rawValue || rawValue === "0") return "";
    
    if (salesMarketingMethod === "% of Revenue") {
      return `${rawValue}%`;
    } else {
      return rawValue;
    }
  };

  // Function to handle Sales & Marketing input changes
  const handleSalesMarketingInputChange = (year: number, value: string) => {
    if (salesMarketingMethod === "% of Revenue") {
      const cleanValue = value.replace('%', '');
      salesMarketingInputHandlers.handleCustomExpenseChange(year, cleanValue, props.handleSalesMarketingExpenseChange);
    } else {
      salesMarketingInputHandlers.handleCustomExpenseChange(year, value, props.handleSalesMarketingExpenseChange);
    }
  };

  const handleSalesMarketingInputBlur = (year: number, value: string) => {
    if (salesMarketingMethod === "% of Revenue") {
      const cleanValue = value.replace('%', '');
      salesMarketingInputHandlers.handleCustomExpenseBlur(year, cleanValue, props.handleSalesMarketingExpenseBlur);
    } else {
      salesMarketingInputHandlers.handleCustomExpenseBlur(year, value, props.handleSalesMarketingExpenseBlur);
    }
  };

  // Calculate Sales & Marketing expense using the selected method
  const calculateSalesMarketingExpense = (year: number): number => {
    const inputValue = props.salesMarketingExpenseInput[year] || "0";
    const input = parseFloat(inputValue);
    
    if (salesMarketingMethod === "POR") {
      const occupiedRooms = props.helpers.getForecastOccupiedRoomsForYear(year);
      return input * occupiedRooms;
    } else if (salesMarketingMethod === "% of Revenue") {
      const totalRevenue = props.helpers.calculateTotalRevenue(year, false);
      return (input / 100) * totalRevenue;
    } else {
      // Manual Input
      return input;
    }
  };

  // Function to get historical expense data for Property Operations & Maintenance
  const getPropertyOperationsHistoricalExpenseData = (year: number): string => {
    const totalExpense = props.historicalExpenseData.propertyOperations[year] || 0;
    
    if (propertyOperationsMethod === "POR") {
      const occupiedRooms = props.helpers.getHistoricalOccupiedRoomsForYear(year);
      const perRoom = occupiedRooms > 0 ? totalExpense / occupiedRooms : 0;
      return Math.round(perRoom).toString();
    } else if (propertyOperationsMethod === "% of Revenue") {
      const totalRevenue = props.helpers.calculateTotalRevenue(year, true);
      const percentage = totalRevenue > 0 ? (totalExpense / totalRevenue) * 100 : 0;
      return percentage.toFixed(1);
    } else {
      // Manual Input
      return props.formatCurrency(totalExpense).replace('$', '').replace(/,/g, '');
    }
  };

  // Function to format display values for Property Operations & Maintenance historical data
  const formatPropertyOperationsHistoricalDisplay = (year: number): string => {
    const value = getPropertyOperationsHistoricalExpenseData(year);
    return propertyOperationsInputHandlers.formatDisplayValue(value);
  };

  // Function to format display values for Property Operations & Maintenance forecast data
  const formatPropertyOperationsForecastDisplay = (year: number): string => {
    const rawValue = props.propertyOperationsExpenseInput[year] || "";
    return rawValue ? propertyOperationsInputHandlers.formatDisplayValue(rawValue) : "";
  };

  // Function to format input values for Property Operations & Maintenance editing
  const formatPropertyOperationsInputValue = (year: number): string => {
    const rawValue = props.propertyOperationsExpenseInput[year] || "";
    if (!rawValue || rawValue === "0") return "";
    
    if (propertyOperationsMethod === "% of Revenue") {
      return `${rawValue}%`;
    } else {
      return rawValue;
    }
  };

  // Function to handle Property Operations & Maintenance input changes
  const handlePropertyOperationsInputChange = (year: number, value: string) => {
    if (propertyOperationsMethod === "% of Revenue") {
      const cleanValue = value.replace('%', '');
      propertyOperationsInputHandlers.handleCustomExpenseChange(year, cleanValue, props.handlePropertyOperationsExpenseChange);
    } else {
      propertyOperationsInputHandlers.handleCustomExpenseChange(year, value, props.handlePropertyOperationsExpenseChange);
    }
  };

  const handlePropertyOperationsInputBlur = (year: number, value: string) => {
    if (propertyOperationsMethod === "% of Revenue") {
      const cleanValue = value.replace('%', '');
      propertyOperationsInputHandlers.handleCustomExpenseBlur(year, cleanValue, props.handlePropertyOperationsExpenseBlur);
    } else {
      propertyOperationsInputHandlers.handleCustomExpenseBlur(year, value, props.handlePropertyOperationsExpenseBlur);
    }
  };

  // Calculate Property Operations & Maintenance expense using the selected method
  const calculatePropertyOperationsExpense = (year: number): number => {
    const inputValue = props.propertyOperationsExpenseInput[year] || "0";
    const input = parseFloat(inputValue);
    
    if (propertyOperationsMethod === "POR") {
      const occupiedRooms = props.helpers.getForecastOccupiedRoomsForYear(year);
      return input * occupiedRooms;
    } else if (propertyOperationsMethod === "% of Revenue") {
      const totalRevenue = props.helpers.calculateTotalRevenue(year, false);
      return (input / 100) * totalRevenue;
    } else {
      // Manual Input
      return input;
    }
  };

  // Function to get historical expense data for Utilities
  const getUtilitiesHistoricalExpenseData = (year: number): string => {
    const totalExpense = props.historicalExpenseData.utilities[year] || 0;
    
    if (utilitiesMethod === "POR") {
      const occupiedRooms = props.helpers.getHistoricalOccupiedRoomsForYear(year);
      const perRoom = occupiedRooms > 0 ? totalExpense / occupiedRooms : 0;
      return Math.round(perRoom).toString();
    } else if (utilitiesMethod === "% of Revenue") {
      const totalRevenue = props.helpers.calculateTotalRevenue(year, true);
      const percentage = totalRevenue > 0 ? (totalExpense / totalRevenue) * 100 : 0;
      return percentage.toFixed(1);
    } else {
      // Manual Input
      return props.formatCurrency(totalExpense).replace('$', '').replace(/,/g, '');
    }
  };

  // Function to format display values for Utilities historical data
  const formatUtilitiesHistoricalDisplay = (year: number): string => {
    const value = getUtilitiesHistoricalExpenseData(year);
    return utilitiesInputHandlers.formatDisplayValue(value);
  };

  // Function to format display values for Utilities forecast data
  const formatUtilitiesForecastDisplay = (year: number): string => {
    const rawValue = props.utilitiesExpenseInput[year] || "";
    return rawValue ? utilitiesInputHandlers.formatDisplayValue(rawValue) : "";
  };

  // Function to format input values for Utilities editing
  const formatUtilitiesInputValue = (year: number): string => {
    const rawValue = props.utilitiesExpenseInput[year] || "";
    if (!rawValue || rawValue === "0") return "";
    
    if (utilitiesMethod === "% of Revenue") {
      return `${rawValue}%`;
    } else {
      return rawValue;
    }
  };

  // Function to handle Utilities input changes
  const handleUtilitiesInputChange = (year: number, value: string) => {
    if (utilitiesMethod === "% of Revenue") {
      const cleanValue = value.replace('%', '');
      utilitiesInputHandlers.handleCustomExpenseChange(year, cleanValue, props.handleUtilitiesExpenseChange);
    } else {
      utilitiesInputHandlers.handleCustomExpenseChange(year, value, props.handleUtilitiesExpenseChange);
    }
  };

  const handleUtilitiesInputBlur = (year: number, value: string) => {
    if (utilitiesMethod === "% of Revenue") {
      const cleanValue = value.replace('%', '');
      utilitiesInputHandlers.handleCustomExpenseBlur(year, cleanValue, props.handleUtilitiesExpenseBlur);
    } else {
      utilitiesInputHandlers.handleCustomExpenseBlur(year, value, props.handleUtilitiesExpenseBlur);
    }
  };

  // Calculate Utilities expense using the selected method
  const calculateUtilitiesExpense = (year: number): number => {
    const inputValue = props.utilitiesExpenseInput[year] || "0";
    const input = parseFloat(inputValue);
    
    if (utilitiesMethod === "POR") {
      const occupiedRooms = props.helpers.getForecastOccupiedRoomsForYear(year);
      return input * occupiedRooms;
    } else if (utilitiesMethod === "% of Revenue") {
      const totalRevenue = props.helpers.calculateTotalRevenue(year, false);
      return (input / 100) * totalRevenue;
    } else {
      // Manual Input
      return input;
    }
  };

  const calculateTotalUndistributedExpenses = (year: number): number => {
    if (props.historicalExpenseData.propertyOperations[year] !== undefined) {
      return (props.historicalExpenseData.propertyOperations[year] || 0) +
             (props.historicalExpenseData.administrativeGeneral[year] || 0) +
             (props.historicalExpenseData.infoTechServices[year] || 0) +
             (props.historicalExpenseData.salesMarketing[year] || 0) +
             (props.historicalExpenseData.utilities[year] || 0);
    } else {
      const propertyOperationsExpense = calculatePropertyOperationsExpense(year);
      const administrativeGeneralExpense = calculateAdminGeneralExpense(year);
      const infoTechServicesExpense = calculateInfoTechExpense(year);
      const salesMarketingExpense = calculateSalesMarketingExpense(year);
      const utilitiesExpense = calculateUtilitiesExpense(year);
      
      return propertyOperationsExpense + administrativeGeneralExpense + infoTechServicesExpense + salesMarketingExpense + utilitiesExpense;
    }
  };

  // Helper function to calculate Gross Operating Profit
  const calculateGrossOperatingProfit = (year: number): number => {
    const totalRevenue = props.helpers.calculateTotalRevenue(year, props.historicalYears.includes(year));
    const isHistorical = props.historicalYears.includes(year);
    
    // GOP = Total Revenue - (Rooms Expense + Total Other Expense + Total Undistributed Expense)
    const roomsExpense = isHistorical 
      ? (props.historicalExpenseData.rooms?.[year] || 0)
      : props.calculateExpense(year, "", 'rooms');
    
    const totalOtherExpense = isHistorical
      ? ((props.historicalExpenseData.fb?.[year] || 0) + 
         (props.historicalExpenseData.otherOperated?.[year] || 0) + 
         (props.historicalExpenseData.miscellaneous?.[year] || 0) + 
         (props.historicalExpenseData.allocated?.[year] || 0))
      : 0;
    
    const totalUndistributedExpense = calculateTotalUndistributedExpenses(year);
    
    return totalRevenue - roomsExpense - totalOtherExpense - totalUndistributedExpense;
  };

  return (
    <>
      {/* Undistributed Expense Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Undistributed Expense</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
        isMajorSectionHeader={true}
      />

      {/* Administrative & General Section */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Administrative & General</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <ExpenseDropdownRow
        label="Forecast Method"
        dropdownValue={adminGeneralMethod}
        onDropdownChange={setAdminGeneralMethod}
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
      />

      <MetricRow
        label={`Administrative & General (${adminGeneralMethod})`}
        historicalData={props.historicalYears.map(year => formatAdminGeneralHistoricalDisplay(year))}
        forecastData={props.forecastYears.map(year => formatAdminGeneralForecastDisplay(year))}
        isEditable={true}
        editableData={props.forecastYears.reduce((acc, year) => ({
          ...acc,
          [year]: formatAdminGeneralInputValue(year)
        }), {})}
        onEditableChange={handleAdminGeneralInputChange}
        onEditableBlur={handleAdminGeneralInputBlur}
        forecastYears={props.forecastYears}
        isUserInputRow={true}
      />

      <MetricRow
        label="Total Administrative & General"
        historicalData={props.historicalYears.map(year => props.formatCurrency(props.historicalExpenseData.administrativeGeneral[year] || 0))}
        forecastData={props.forecastYears.map(year => props.formatCurrency(calculateAdminGeneralExpense(year)))}
        className="border-t border-gray-300"
      />

      {/* Information Tech Services Section */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Information Tech Services</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <ExpenseDropdownRow
        label="Forecast Method"
        dropdownValue={infoTechMethod}
        onDropdownChange={setInfoTechMethod}
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
      />

      <MetricRow
        label={`Information Tech Services (${infoTechMethod})`}
        historicalData={props.historicalYears.map(year => formatInfoTechHistoricalDisplay(year))}
        forecastData={props.forecastYears.map(year => formatInfoTechForecastDisplay(year))}
        isEditable={true}
        editableData={props.forecastYears.reduce((acc, year) => ({
          ...acc,
          [year]: formatInfoTechInputValue(year)
        }), {})}
        onEditableChange={handleInfoTechInputChange}
        onEditableBlur={handleInfoTechInputBlur}
        forecastYears={props.forecastYears}
        isUserInputRow={true}
      />

      <MetricRow
        label="Total Information Tech Services"
        historicalData={props.historicalYears.map(year => props.formatCurrency(props.historicalExpenseData.infoTechServices[year] || 0))}
        forecastData={props.forecastYears.map(year => props.formatCurrency(calculateInfoTechExpense(year)))}
        className="border-t border-gray-300"
      />

      {/* Sales & Marketing Section */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Sales & Marketing</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <ExpenseDropdownRow
        label="Forecast Method"
        dropdownValue={salesMarketingMethod}
        onDropdownChange={setSalesMarketingMethod}
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
      />

      <MetricRow
        label={`Sales & Marketing (${salesMarketingMethod})`}
        historicalData={props.historicalYears.map(year => formatSalesMarketingHistoricalDisplay(year))}
        forecastData={props.forecastYears.map(year => formatSalesMarketingForecastDisplay(year))}
        isEditable={true}
        editableData={props.forecastYears.reduce((acc, year) => ({
          ...acc,
          [year]: formatSalesMarketingInputValue(year)
        }), {})}
        onEditableChange={handleSalesMarketingInputChange}
        onEditableBlur={handleSalesMarketingInputBlur}
        forecastYears={props.forecastYears}
        isUserInputRow={true}
      />

      <MetricRow
        label="Total Sales & Marketing"
        historicalData={props.historicalYears.map(year => props.formatCurrency(props.historicalExpenseData.salesMarketing[year] || 0))}
        forecastData={props.forecastYears.map(year => props.formatCurrency(calculateSalesMarketingExpense(year)))}
        className="border-t border-gray-300"
      />

      {/* Property Operations & Maintenance Section */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Property Operations & Maintenance</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <ExpenseDropdownRow
        label="Forecast Method"
        dropdownValue={propertyOperationsMethod}
        onDropdownChange={setPropertyOperationsMethod}
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
      />

      <MetricRow
        label={`Property Operations & Maintenance (${propertyOperationsMethod})`}
        historicalData={props.historicalYears.map(year => formatPropertyOperationsHistoricalDisplay(year))}
        forecastData={props.forecastYears.map(year => formatPropertyOperationsForecastDisplay(year))}
        isEditable={true}
        editableData={props.forecastYears.reduce((acc, year) => ({
          ...acc,
          [year]: formatPropertyOperationsInputValue(year)
        }), {})}
        onEditableChange={handlePropertyOperationsInputChange}
        onEditableBlur={handlePropertyOperationsInputBlur}
        forecastYears={props.forecastYears}
        isUserInputRow={true}
      />

      <MetricRow
        label="Total Property Operations & Maintenance"
        historicalData={props.historicalYears.map(year => props.formatCurrency(props.historicalExpenseData.propertyOperations[year] || 0))}
        forecastData={props.forecastYears.map(year => props.formatCurrency(calculatePropertyOperationsExpense(year)))}
        className="border-t border-gray-300"
      />

      {/* Utilities Section */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Utilities</span>}
        historicalData={props.historicalYears.map(() => "")}
        forecastData={props.forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      <ExpenseDropdownRow
        label="Forecast Method"
        dropdownValue={utilitiesMethod}
        onDropdownChange={setUtilitiesMethod}
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
      />

      <MetricRow
        label={`Utilities (${utilitiesMethod})`}
        historicalData={props.historicalYears.map(year => formatUtilitiesHistoricalDisplay(year))}
        forecastData={props.forecastYears.map(year => formatUtilitiesForecastDisplay(year))}
        isEditable={true}
        editableData={props.forecastYears.reduce((acc, year) => ({
          ...acc,
          [year]: formatUtilitiesInputValue(year)
        }), {})}
        onEditableChange={handleUtilitiesInputChange}
        onEditableBlur={handleUtilitiesInputBlur}
        forecastYears={props.forecastYears}
        isUserInputRow={true}
      />

      <MetricRow
        label="Total Utilities"
        historicalData={props.historicalYears.map(year => props.formatCurrency(props.historicalExpenseData.utilities[year] || 0))}
        forecastData={props.forecastYears.map(year => props.formatCurrency(calculateUtilitiesExpense(year)))}
        className="border-t border-gray-300"
      />

      {/* Total Undistributed Expenses */}
      <MetricRow
        label={<span className="font-bold italic">Total Undistributed Expenses</span>}
        historicalData={props.historicalYears.map(year => <span className="font-bold italic">{props.formatCurrency(calculateTotalUndistributedExpenses(year))}</span>)}
        forecastData={props.forecastYears.map(year => <span className="font-bold italic">{props.formatCurrency(calculateTotalUndistributedExpenses(year))}</span>)}
      />

      {/* Gross Operating Profit Row */}
      <MetricRow
        label={<span className="font-bold text-base">Gross Operating Profit</span>}
        historicalData={props.historicalYears.map(year => 
          <span className="font-bold text-base">
            {props.formatCurrency(calculateGrossOperatingProfit(year))}
          </span>
        )}
        forecastData={props.forecastYears.map(year => 
          <span className="font-bold text-base">
            {props.formatCurrency(calculateGrossOperatingProfit(year))}
          </span>
        )}
        className="bg-green-50"
      />
    </>
  );
};

export default UndistributedExpensesSections;
