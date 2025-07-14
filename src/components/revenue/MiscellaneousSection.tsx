import React from "react";
import MetricRow from "./MetricRow";
import { getHistoricalOccupiedRooms, calculateHistoricalPerOccupiedRoom } from "../../utils/revenueUtils";

interface MiscellaneousSectionProps {
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    miscellaneousRevenue: Record<number, number>;
    occupancy: Record<number, number>;
  };
  miscellaneousPerOccupiedRoom: Record<number, string>;
  handleMiscellaneousPerOccupiedRoomChange: (year: number, value: string) => void;
  handleMiscellaneousPerOccupiedRoomBlur: (year: number, value: string) => void;
  getForecastOccupiedRooms: (year: number) => number;
  formatCurrency: (value: number) => string;
  isIndented?: boolean;
}

const MiscellaneousSection: React.FC<MiscellaneousSectionProps> = ({
  roomsKeys,
  historicalYears,
  forecastYears,
  historicalData,
  miscellaneousPerOccupiedRoom,
  handleMiscellaneousPerOccupiedRoomChange,
  handleMiscellaneousPerOccupiedRoomBlur,
  getForecastOccupiedRooms,
  formatCurrency,
  isIndented = false
}) => {
  // Calculate historical $ per occupied room values
  const getHistoricalPerOccupiedRoom = (year: number): string => {
    const miscellaneousRevenue = historicalData.miscellaneousRevenue[year];
    const occupancyPercent = historicalData.occupancy[year];
    
    if (!miscellaneousRevenue || !occupancyPercent) {
      return "-";
    }
    
    const occupiedRooms = getHistoricalOccupiedRooms(year, roomsKeys, occupancyPercent);
    const perRoom = calculateHistoricalPerOccupiedRoom(miscellaneousRevenue, occupiedRooms);
    return `$${perRoom}`;
  };

  // Calculate Miscellaneous Revenue for forecast years
  const calculateMiscellaneousRevenue = (year: number): number => {
    const perRoom = parseFloat(miscellaneousPerOccupiedRoom[year] || "0");
    const occupiedRooms = getForecastOccupiedRooms(year);
    return perRoom * occupiedRooms;
  };

  // Calculate historical Miscellaneous Revenue (for display purposes)
  const getHistoricalMiscellaneousRevenue = (year: number): string => {
    const miscellaneousRevenue = historicalData.miscellaneousRevenue[year];
    return miscellaneousRevenue ? formatCurrency(miscellaneousRevenue) : "-";
  };

  const indentPrefix = isIndented ? "\u00A0\u00A0\u00A0" : "";

  return (
    <>
      {/* Miscellaneous Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">{indentPrefix}Miscellaneous</span>}
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
        editableData={miscellaneousPerOccupiedRoom}
        onEditableChange={handleMiscellaneousPerOccupiedRoomChange}
        onEditableBlur={handleMiscellaneousPerOccupiedRoomBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
        isFbInputRow={true}
      />

      {/* Miscellaneous Revenue Row */}
      <MetricRow
        label={`${indentPrefix}Miscellaneous Revenue`}
        historicalData={historicalYears.map(year => getHistoricalMiscellaneousRevenue(year))}
        forecastData={forecastYears.map(year => formatCurrency(calculateMiscellaneousRevenue(year)))}
      />
    </>
  );
};

export default MiscellaneousSection;