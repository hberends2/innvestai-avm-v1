
import React from "react";
import MetricRow from "./MetricRow";

interface NetOperatingIncomeSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  reserveForReplacementInput: Record<number, string>;
  formatCurrency: (value: number) => string;
  helpers: any;
  calculateTotalExpense: (year: number) => number;
  getTotalHistoricalExpense: (year: number) => number;
}

const NetOperatingIncomeSection: React.FC<NetOperatingIncomeSectionProps> = ({
  historicalYears,
  forecastYears,
  reserveForReplacementInput,
  formatCurrency,
  helpers,
  calculateTotalExpense,
  getTotalHistoricalExpense
}) => {
  const calculateReserveForReplacement = (year: number, isHistorical: boolean) => {
    if (isHistorical) {
      return 0; // Historical value set to 0
    } else {
      // Calculate from percentage input for forecast years
      if (!reserveForReplacementInput) {
        console.warn('reserveForReplacementInput is undefined, using default value');
        return 0;
      }
      const percentageValue = parseFloat(reserveForReplacementInput[year] || "0");
      const totalRevenue = helpers.calculateTotalRevenue(year, false);
      return (percentageValue / 100) * totalRevenue;
    }
  };

  return (
    <>
      {/* Net Operating Income Section */}
      <tr id="net-operating-income-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      {/* Net Operating Income Row */}
      <MetricRow
        label={<span className="font-bold text-sm">Net Operating Income</span>}
        historicalData={historicalYears.map(year => {
          const totalRevenue = helpers.calculateTotalRevenue(year, true);
          const totalExpense = getTotalHistoricalExpense(year);
          const ebitda = totalRevenue - totalExpense;
          const reserve = calculateReserveForReplacement(year, true);
          const noi = ebitda - reserve;
          return (
            <span className="font-bold text-sm">
              {formatCurrency(noi)}
            </span>
          );
        })}
        forecastData={forecastYears.map(year => {
          const totalRevenue = helpers.calculateTotalRevenue(year, false);
          const totalExpense = calculateTotalExpense(year);
          const ebitda = totalRevenue - totalExpense;
          const reserve = calculateReserveForReplacement(year, false);
          const noi = ebitda - reserve;
          return (
            <span className="font-bold text-sm">
              {formatCurrency(noi)}
            </span>
          );
        })}
      />
    </>
  );
};

export default NetOperatingIncomeSection;
