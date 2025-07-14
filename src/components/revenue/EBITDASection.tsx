
import React from "react";
import MetricRow from "./MetricRow";
import { useExpenseCalculations } from "./ExpenseCalculationsProvider";

interface EBITDASectionProps {
  historicalYears: number[];
  forecastYears: number[];
  formatCurrency: (value: number) => string;
  helpers: any;
}

const EBITDASection: React.FC<EBITDASectionProps> = ({
  historicalYears,
  forecastYears,
  formatCurrency,
  helpers
}) => {
  const { calculateTotalExpense, getTotalHistoricalExpense } = useExpenseCalculations();

  return (
    <>
      {/* EBITDA Section */}
      <tr id="ebitda-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      {/* EBITDA Row */}
      <MetricRow
        label={<span className="font-bold text-sm">EBITDA</span>}
        historicalData={historicalYears.map(year => {
          const totalRevenue = helpers.calculateTotalRevenue(year, true);
          const totalExpense = getTotalHistoricalExpense(year);
          const ebitda = totalRevenue - totalExpense;
          return (
            <span className="font-bold text-sm">
              {formatCurrency(ebitda)}
            </span>
          );
        })}
        forecastData={forecastYears.map(year => {
          const totalRevenue = helpers.calculateTotalRevenue(year, false);
          const totalExpense = calculateTotalExpense(year);
          const ebitda = totalRevenue - totalExpense;
          return (
            <span className="font-bold text-sm">
              {formatCurrency(ebitda)}
            </span>
          );
        })}
        className="bg-green-50"
      />
    </>
  );
};

export default EBITDASection;
