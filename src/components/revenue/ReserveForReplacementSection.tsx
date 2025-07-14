
import React from "react";
import MetricRow from "./MetricRow";

interface ReserveForReplacementSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  reserveForReplacementInput: Record<number, string>;
  handleReserveForReplacementChange: (year: number, value: string) => void;
  handleReserveForReplacementBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  helpers: any;
}

const ReserveForReplacementSection: React.FC<ReserveForReplacementSectionProps> = ({
  historicalYears,
  forecastYears,
  reserveForReplacementInput,
  handleReserveForReplacementChange,
  handleReserveForReplacementBlur,
  formatCurrency,
  helpers
}) => {
  // Calculate Reserve for Replacement based on percentage of Total Revenue (forecast years only)
  const calculateReserveForReplacement = (year: number): number => {
    const percentageValue = parseFloat(reserveForReplacementInput[year] || "0");
    const totalRevenue = helpers.calculateTotalRevenue(year, false);
    return (percentageValue / 100) * totalRevenue;
  };

  return (
    <>
      {/* Reserve for Replacement Section */}
      <tr id="reserve-for-replacement-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      {/* Reserve for Replacement Row with percentage input - ONLY ONE ROW */}
      <MetricRow
        label="Reserve for Replacement"
        historicalData={historicalYears.map(() => formatCurrency(0))}
        forecastData={forecastYears.map((year) => {
          const percentageValue = reserveForReplacementInput[year] || "";
          const calculatedAmount = calculateReserveForReplacement(year);
          
          // Show percentage input and calculated amount
          return (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="text"
                  value={percentageValue}
                  onChange={(e) => handleReserveForReplacementChange(year, e.target.value)}
                  onBlur={(e) => handleReserveForReplacementBlur(year, e.target.value)}
                  className="w-12 text-center border-none bg-white text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
                  placeholder="0.0"
                />
                <span className="text-blue-600 text-sm ml-1">%</span>
              </div>
              <span className="ml-2">{formatCurrency(calculatedAmount)}</span>
            </div>
          );
        })}
        isUserInputRow={true}
      />
    </>
  );
};

export default ReserveForReplacementSection;
