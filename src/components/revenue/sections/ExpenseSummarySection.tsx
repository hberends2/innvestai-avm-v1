
import React from "react";
import MetricRow from "../MetricRow";
import { CalculationHelpers } from "../RevenueTableHelpers";
import { createExpenseSummaryCalculations } from "./ExpenseSummaryCalculations";
import ExpenseSummaryRows from "./ExpenseSummaryRows";
import ReserveForReplacementRow from "./ReserveForReplacementRow";
import { useValuationData } from "@/hooks/useValuationData";

interface ExpenseSummarySectionProps {
  historicalYears: number[];
  forecastYears: number[];
  reserveForReplacementInput: Record<number, string>;
  handleReserveForReplacementChange: (year: number, value: string) => void;
  handleReserveForReplacementBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  historicalExpenseData: any;
  helpers: CalculationHelpers;
  calculateTotalNonOperatingExpenses: (year: number) => number;
}

const ExpenseSummarySection: React.FC<ExpenseSummarySectionProps> = ({
  historicalYears,
  forecastYears,
  reserveForReplacementInput,
  handleReserveForReplacementChange,
  handleReserveForReplacementBlur,
  formatCurrency,
  historicalExpenseData,
  helpers,
  calculateTotalNonOperatingExpenses
}) => {
  const { valuationData } = useValuationData();
  
  // Create calculation helpers
  const calculations = createExpenseSummaryCalculations(
    historicalYears,
    reserveForReplacementInput,
    historicalExpenseData,
    helpers,
    calculateTotalNonOperatingExpenses,
    valuationData.reserveForReplacement
  );

  return (
    <>
      <ExpenseSummaryRows
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        formatCurrency={formatCurrency}
        calculations={calculations}
      />

      <ReserveForReplacementRow
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        reserveForReplacementInput={reserveForReplacementInput}
        handleReserveForReplacementChange={handleReserveForReplacementChange}
        handleReserveForReplacementBlur={handleReserveForReplacementBlur}
        formatCurrency={formatCurrency}
        calculateReserveForReplacement={calculations.calculateReserveForReplacement}
      />

      <MetricRow
        label={<span className="font-bold text-base">Net Operating Income</span>}
        historicalData={historicalYears.map(year => 
          <span className="font-bold text-base">
            {formatCurrency(calculations.calculateNetOperatingIncome(year))}
          </span>
        )}
        forecastData={forecastYears.map(year => 
          <span className="font-bold text-base">
            {formatCurrency(calculations.calculateNetOperatingIncome(year))}
          </span>
        )}
        className="bg-green-100"
      />
    </>
  );
};

export default ExpenseSummarySection;
