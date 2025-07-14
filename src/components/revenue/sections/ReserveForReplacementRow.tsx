import React from "react";
import MetricRow from "../MetricRow";

interface ReserveForReplacementRowProps {
  historicalYears: number[];
  forecastYears: number[];
  reserveForReplacementInput: Record<number, string>;
  handleReserveForReplacementChange: (year: number, value: string) => void;
  handleReserveForReplacementBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  calculateReserveForReplacement: (year: number) => number;
}

const ReserveForReplacementRow: React.FC<ReserveForReplacementRowProps> = ({
  historicalYears,
  forecastYears,
  reserveForReplacementInput,
  handleReserveForReplacementChange,
  handleReserveForReplacementBlur,
  formatCurrency,
  calculateReserveForReplacement
}) => {
  // Format the display value for the percentage (what user sees with % sign)
  const formatDisplayValue = (rawValue: string): string => {
    if (!rawValue || rawValue === "") return "0.0%";
    
    const numValue = parseFloat(rawValue);
    if (isNaN(numValue)) return "0.0%";
    
    // If it's a whole number, show with .0, otherwise show as is
    if (numValue % 1 === 0) {
      return `${numValue}.0%`;
    } else {
      return `${numValue}%`;
    }
  };

  // Handle input changes - store exactly what user types
  const handleInputChange = (year: number, value: string) => {
    // Remove any non-numeric characters except decimal point
    const cleanValue = value.replace(/[^0-9.]/g, "");
    
    // Prevent multiple decimal points
    const parts = cleanValue.split('.');
    if (parts.length > 2) {
      return; // Don't allow more than one decimal point
    }
    
    // Store the raw value as user typed it
    handleReserveForReplacementChange(year, cleanValue);
  };

  // Handle blur - store the exact value without any rounding or formatting
  const handleInputBlur = (year: number) => {
    const currentValue = reserveForReplacementInput[year] || "";
    
    if (currentValue === "" || currentValue === ".") {
      // Empty or just decimal point - set to 0
      handleReserveForReplacementChange(year, "0");
    } else {
      const numValue = parseFloat(currentValue);
      if (isNaN(numValue)) {
        handleReserveForReplacementChange(year, "0");
      } else {
        // Store the exact value as entered by user, don't call the blur handler that might format it
        // Just keep the current value as is
        handleReserveForReplacementChange(year, currentValue);
      }
    }
  };

  return (
    <MetricRow
      label={<span className="bg-yellow-50 px-2 py-1 rounded">Reserve for Replacement</span>}
      historicalData={historicalYears.map((year, index) => {
        if (index === 0) {
          const rawValue = reserveForReplacementInput[year] || "";
          const displayValue = formatDisplayValue(rawValue);
          
          return (
            <div className="bg-yellow-50 px-2 py-1 rounded flex items-center justify-center">
              <div className="flex items-center">
                <input
                  type="text"
                  value={rawValue}
                  onChange={(e) => handleInputChange(year, e.target.value)}
                  onBlur={() => handleInputBlur(year)}
                  className="w-12 text-center border-none bg-white text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
                  placeholder="0"
                />
                <span className="text-blue-600 text-sm ml-1">%</span>
              </div>
              <div className="text-xs text-gray-500 ml-2">
                ({displayValue})
              </div>
            </div>
          );
        } else {
          return "";
        }
      })}
      forecastData={forecastYears.map((year) => {
        const calculatedAmount = calculateReserveForReplacement(year);
        return <span className="text-black">{formatCurrency(calculatedAmount)}</span>;
      })}
    />
  );
};

export default ReserveForReplacementRow;
