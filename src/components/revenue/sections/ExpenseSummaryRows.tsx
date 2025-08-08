
import React from "react";
import MetricRow from "../MetricRow";
import { ExpenseSummaryCalculations } from "./ExpenseSummaryCalculations";

interface ExpenseSummaryRowsProps {
  historicalYears: number[];
  forecastYears: number[];
  formatCurrency: (value: number) => string;
  calculations: ExpenseSummaryCalculations;
}

const ExpenseSummaryRows: React.FC<ExpenseSummaryRowsProps> = ({
  historicalYears,
  forecastYears,
  formatCurrency,
  calculations
}) => {
  return (
    <>
      <MetricRow
        label={<span className="font-bold text-base">Total Expense</span>}
        historicalData={historicalYears.map(year => (
          <span key={year} className="font-bold text-base">
            {formatCurrency(calculations.calculateTotalExpense(year))}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span key={year} className="font-bold text-base">
            {formatCurrency(calculations.calculateTotalExpense(year))}
          </span>
        ))}
        className="bg-green-100"
      />

      <MetricRow
        label={<span className="font-bold text-base">EBITDA</span>}
        historicalData={historicalYears.map(year => (
          <span key={year} className="font-bold text-base">
            {formatCurrency(calculations.calculateEBITDA(year))}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span key={year} className="font-bold text-base">
            {formatCurrency(calculations.calculateEBITDA(year))}
          </span>
        ))}
        className="bg-green-100"
      />
    </>
  );
};

export default ExpenseSummaryRows;
