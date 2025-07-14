
import React from "react";
import MetricRow from "./MetricRow";
import { getHistoricalOccupiedRooms, calculateHistoricalPerOccupiedRoom } from "../../utils/revenueUtils";

interface ResortFeeSectionProps {
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    resortFeeRevenue: Record<number, number>;
    occupancy: Record<number, number>;
  };
  resortFeePerOccupiedRoom: Record<number, string>;
  handleResortFeePerOccupiedRoomChange: (year: number, value: string) => void;
  handleResortFeePerOccupiedRoomBlur: (year: number, value: string) => void;
  getForecastOccupiedRooms: (year: number) => number;
  formatCurrency: (value: number) => string;
  isIndented?: boolean;
}

const ResortFeeSection: React.FC<ResortFeeSectionProps> = ({
  roomsKeys,
  historicalYears,
  forecastYears,
  historicalData,
  resortFeePerOccupiedRoom,
  handleResortFeePerOccupiedRoomChange,
  handleResortFeePerOccupiedRoomBlur,
  getForecastOccupiedRooms,
  formatCurrency,
  isIndented = false
}) => {
  // Calculate historical $ per occupied room values
  const getHistoricalPerOccupiedRoom = (year: number): string => {
    const resortFeeRevenue = historicalData.resortFeeRevenue[year];
    const occupancyPercent = historicalData.occupancy[year];
    
    if (!resortFeeRevenue || !occupancyPercent) {
      return "-";
    }
    
    const occupiedRooms = getHistoricalOccupiedRooms(year, roomsKeys, occupancyPercent);
    const perRoom = calculateHistoricalPerOccupiedRoom(resortFeeRevenue, occupiedRooms);
    return `$${perRoom}`;
  };

  // Calculate Resort Fee Revenue for forecast years
  const calculateResortFeeRevenue = (year: number): number => {
    const perRoom = parseFloat(resortFeePerOccupiedRoom[year] || "0");
    const occupiedRooms = getForecastOccupiedRooms(year);
    return perRoom * occupiedRooms;
  };

  // Calculate historical Resort Fee Revenue (for display purposes)
  const getHistoricalResortFeeRevenue = (year: number): string => {
    const resortFeeRevenue = historicalData.resortFeeRevenue[year];
    return resortFeeRevenue ? formatCurrency(resortFeeRevenue) : "-";
  };

  const indentPrefix = isIndented ? "\u00A0\u00A0\u00A0" : "";

  return (
    <>
      {/* Resort Fee Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">{indentPrefix}Resort Fee</span>}
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
        editableData={resortFeePerOccupiedRoom}
        onEditableChange={handleResortFeePerOccupiedRoomChange}
        onEditableBlur={handleResortFeePerOccupiedRoomBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
        isFbInputRow={true}
      />

      {/* Resort Fee Revenue Row */}
      <MetricRow
        label={`${indentPrefix}Resort Fee Revenue`}
        historicalData={historicalYears.map(year => getHistoricalResortFeeRevenue(year))}
        forecastData={forecastYears.map(year => formatCurrency(calculateResortFeeRevenue(year)))}
      />
    </>
  );
};

export default ResortFeeSection;
