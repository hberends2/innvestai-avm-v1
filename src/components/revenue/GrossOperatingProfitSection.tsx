
import React from "react";
import MetricRow from "./MetricRow";
import { useExpenseCalculations } from "./ExpenseCalculationsProvider";

interface GrossOperatingProfitSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  formatCurrency: (value: number) => string;
}

const GrossOperatingProfitSection: React.FC<GrossOperatingProfitSectionProps> = ({
  historicalYears,
  forecastYears,
  formatCurrency
}) => {
  const { calculateGrossOperatingProfit } = useExpenseCalculations();

  return (
    <MetricRow
      label={<span className="font-bold text-base">Gross Operating Profit</span>}
      historicalData={historicalYears.map(year => (
        <span className="font-bold text-base">
          {formatCurrency(calculateGrossOperatingProfit(year))}
        </span>
      ))}
      forecastData={forecastYears.map(year => (
        <span className="font-bold text-base">
          {formatCurrency(calculateGrossOperatingProfit(year))}
        </span>
      ))}
      className="border-t border-gray-200 bg-green-50"
    />
  );
};

export default GrossOperatingProfitSection;
