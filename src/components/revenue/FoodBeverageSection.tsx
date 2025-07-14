
import React from "react";
import MetricRow from "./MetricRow";
import { getHistoricalOccupiedRooms, calculateHistoricalPerOccupiedRoom } from "../../utils/revenueUtils";

interface FoodBeverageSectionProps {
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    fbRevenue: Record<number, number>;
    occupancy: Record<number, number>;
  };
  fbPerOccupiedRoom: Record<number, string>;
  handleFbPerOccupiedRoomChange: (year: number, value: string) => void;
  handleFbPerOccupiedRoomBlur: (year: number, value: string) => void;
  getForecastOccupiedRooms: (year: number) => number;
  formatCurrency: (value: number) => string;
  isIndented?: boolean;
}

const FoodBeverageSection: React.FC<FoodBeverageSectionProps> = ({
  roomsKeys,
  historicalYears,
  forecastYears,
  historicalData,
  fbPerOccupiedRoom,
  handleFbPerOccupiedRoomChange,
  handleFbPerOccupiedRoomBlur,
  getForecastOccupiedRooms,
  formatCurrency,
  isIndented = false
}) => {
  // Calculate historical $ per occupied room values
  const getHistoricalPerOccupiedRoom = (year: number): string => {
    const fbRevenue = historicalData.fbRevenue[year];
    const occupancyPercent = historicalData.occupancy[year];
    
    if (!fbRevenue || !occupancyPercent) {
      return "-";
    }
    
    const occupiedRooms = getHistoricalOccupiedRooms(year, roomsKeys, occupancyPercent);
    const perRoom = calculateHistoricalPerOccupiedRoom(fbRevenue, occupiedRooms);
    return `$${perRoom}`;
  };

  // Calculate F&B Revenue for forecast years
  const calculateFbRevenue = (year: number): number => {
    const perRoom = parseFloat(fbPerOccupiedRoom[year] || "0");
    const occupiedRooms = getForecastOccupiedRooms(year);
    return perRoom * occupiedRooms;
  };

  // Calculate historical F&B Revenue (for display purposes)
  const getHistoricalFbRevenue = (year: number): string => {
    const fbRevenue = historicalData.fbRevenue[year];
    return fbRevenue ? formatCurrency(fbRevenue) : "-";
  };

  const indentPrefix = isIndented ? "\u00A0\u00A0\u00A0" : "";

  return (
    <>
      {/* Food & Beverage Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">{indentPrefix}Food & Beverage</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* $ / Occupied Room / Year Row */}
      <MetricRow
        label={`${indentPrefix}$ / Occupied Room / Year`}
        historicalData={historicalYears.map(year => getHistoricalPerOccupiedRoom(year))}
        forecastData={forecastYears.map(year => "")}
        isEditable={true}
        editableData={fbPerOccupiedRoom}
        onEditableChange={handleFbPerOccupiedRoomChange}
        onEditableBlur={handleFbPerOccupiedRoomBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
        isFbInputRow={true}
      />

      {/* Food & Beverage Revenue Row */}
      <MetricRow
        label={`${indentPrefix}Food & Beverage Revenue`}
        historicalData={historicalYears.map(year => getHistoricalFbRevenue(year))}
        forecastData={forecastYears.map(year => formatCurrency(calculateFbRevenue(year)))}
      />
    </>
  );
};

export default FoodBeverageSection;
