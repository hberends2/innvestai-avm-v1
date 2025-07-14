
import React from "react";
import MetricRow from "./MetricRow";

interface RoomsRevenueSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    roomsRevenue: Record<number, number>;
  };
  getForecastRoomsRevenue: (year: number) => number;
  formatCurrency: (value: number) => string;
}

const RoomsRevenueSection: React.FC<RoomsRevenueSectionProps> = ({
  historicalYears,
  forecastYears,
  historicalData,
  getForecastRoomsRevenue,
  formatCurrency
}) => {
  return (
    <>
      {/* Rooms Revenue Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">Rooms Revenue</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
        isMajorSectionHeader={true}
      />

      {/* Total Rooms Revenue */}
      <MetricRow
        label={<span className="font-bold italic">Total Rooms Revenue</span>}
        historicalData={historicalYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(historicalData.roomsRevenue[year] || 0)}
          </span>
        ))}
        forecastData={forecastYears.map(year => (
          <span className="font-bold italic">
            {formatCurrency(getForecastRoomsRevenue(year))}
          </span>
        ))}
      />
    </>
  );
};

export default RoomsRevenueSection;
