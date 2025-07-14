
import React from "react";
import MetricRow from "./MetricRow";

interface TotalExpenseSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  formatCurrency: (value: number) => string;
  calculateTotalExpense: (year: number) => number;
  getTotalHistoricalExpense: (year: number) => number;
}

const TotalExpenseSection: React.FC<TotalExpenseSectionProps> = ({
  historicalYears,
  forecastYears,
  formatCurrency,
  calculateTotalExpense,
  getTotalHistoricalExpense
}) => {
  return (
    <>
      {/* Total Expense Section */}
      <tr id="total-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      {/* Total Expense Row */}
      <MetricRow
        label={<span className="font-bold text-sm">Total Expense</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold text-sm">
            {formatCurrency(getTotalHistoricalExpense(year))}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold text-sm">
            {formatCurrency(calculateTotalExpense(year))}
          </span>
        ))}
      />
    </>
  );
};

export default TotalExpenseSection;
