import React from "react";
import MetricRow from "../MetricRow";
import { useValuationData } from "@/hooks/useValuationData";

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
  const { valuationData } = useValuationData();

  // Format the display value for the percentage (what user sees with % sign)
  const formatDisplayValue = (percentage: string): string => {
    const numValue = parseFloat(percentage);
    if (isNaN(numValue)) return "0.0%";
    
    // If it's a whole number, show with .0, otherwise show as is
    if (numValue % 1 === 0) {
      return `${numValue}.0%`;
    } else {
      return `${numValue}%`;
    }
  };

  return (
    <MetricRow
      label={<span>Reserve for Replacement</span>}
      historicalData={historicalYears.map((year, index) => {
        if (index === 0) {
          const displayValue = formatDisplayValue(valuationData.reserveForReplacement);
          
          return (
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <span className="text-blue-600 font-medium">{displayValue}</span>
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
