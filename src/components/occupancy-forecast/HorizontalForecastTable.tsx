
import React from "react";
import { OccupancyData, HistoricalData } from "./types";
import { calculateOccupiedRooms, formatPercent, formatNumber } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import ForecastMethodSelector from "./ForecastMethodSelector";

interface HorizontalForecastTableProps {
  forecastMethod: string;
  setForecastMethod: (method: string) => void;
  occupancyValues: OccupancyData[];
  historicalData: HistoricalData[];
  historicalGrowthRates: { year: number; growthRate: number }[];
  handleOccupancyChange: (index: number, value: string) => void;
  handleGrowthRateChange: (index: number, value: string) => void;
}

const HorizontalForecastTable: React.FC<HorizontalForecastTableProps> = ({
  forecastMethod,
  setForecastMethod,
  occupancyValues,
  historicalData,
  historicalGrowthRates,
  handleOccupancyChange,
  handleGrowthRateChange
}) => {
  const historicalYears = [2022, 2023, 2024];
  const forecastYears = [2025, 2026, 2027, 2028, 2029];

  // Helper function to get growth rate for a specific year
  const getGrowthRateForYear = (year: number) => {
    const growthData = historicalGrowthRates.find(g => g.year === year);
    return growthData ? growthData.growthRate : 0;
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Forecast Occupancy</h3>
      
      {/* Forecast Method Selector */}
      <div className="mb-4">
        <ForecastMethodSelector 
          forecastMethod={forecastMethod}
          setForecastMethod={setForecastMethod}
        />
      </div>

      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            {/* Period Headers */}
            <TableRow>
              <TableHead className="w-24 px-1"></TableHead>
              <TableHead className="text-center bg-blue-50 px-1" colSpan={3}>Historical</TableHead>
              <TableHead className="text-center bg-green-50 px-1">Year 1</TableHead>
              <TableHead className="text-center bg-green-50 px-1">Year 2</TableHead>
              <TableHead className="text-center bg-green-50 px-1">Year 3</TableHead>
              <TableHead className="text-center bg-green-50 px-1">Year 4</TableHead>
              <TableHead className="text-center bg-green-50 px-1">Year 5</TableHead>
            </TableRow>
            {/* Year Headers */}
            <TableRow>
              <TableHead className="w-24 px-1">Metric</TableHead>
              {historicalYears.map(year => (
                <TableHead key={year} className="text-center bg-blue-50 px-1 text-xs">{year}</TableHead>
              ))}
              {forecastYears.map(year => (
                <TableHead key={year} className="text-center bg-green-50 px-1 text-xs">{year}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Occupied Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">Occupied</TableCell>
              {/* Historical data - show occupied rooms */}
              {historicalData.map((data) => (
                <TableCell key={data.year} className="p-1 text-xs text-center bg-blue-25">
                  {formatNumber(calculateOccupiedRooms(data.occupancy, data.rooms))}
                </TableCell>
              ))}
              {/* Forecast data - show occupied rooms */}
              {occupancyValues.map((data) => (
                <TableCell key={data.year} className="p-1 text-xs text-center">
                  {formatNumber(calculateOccupiedRooms(data.occupancy))}
                </TableCell>
              ))}
            </TableRow>
            
            {/* Occupancy Input Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">Occupancy</TableCell>
              {/* Historical data - show actual occupancy (read-only) */}
              {historicalData.map((data) => (
                <TableCell key={data.year} className="p-1 text-xs text-center bg-blue-25">
                  <span className="text-gray-700 font-medium">
                    {formatPercent(data.occupancy)}
                  </span>
                </TableCell>
              ))}
              {/* Forecast data - input cells for occupancy */}
              {occupancyValues.map((data, index) => (
                <TableCell key={data.year} className="p-1 text-xs text-center">
                  {forecastMethod === 'direct' ? (
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={(data.occupancy * 100).toFixed(1)}
                        onChange={(e) => handleOccupancyChange(index, e.target.value)}
                        className="w-12 p-0.5 border rounded text-right mr-1 text-blue-600 text-xs"
                      />
                      <span>%</span>
                    </div>
                  ) : (
                    <span className="text-gray-800 font-medium">
                      {formatPercent(data.occupancy)}
                    </span>
                  )}
                </TableCell>
              ))}
            </TableRow>

            {/* YoY Growth Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">YoY</TableCell>
              {/* Historical data - show actual growth rates (read-only) */}
              {historicalData.map((data) => (
                <TableCell key={data.year} className="p-1 text-xs text-center bg-blue-25">
                  <span className="text-gray-700 font-medium">
                    {data.year === 2022 ? '-' : `${getGrowthRateForYear(data.year).toFixed(1)}%`}
                  </span>
                </TableCell>
              ))}
              {/* Forecast data - input cells for YoY */}
              {occupancyValues.map((data, index) => (
                <TableCell key={data.year} className="p-1 text-xs text-center">
                  {forecastMethod === 'growth' ? (
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        step="0.1"
                        value={data.growthRate.toFixed(1)}
                        onChange={(e) => handleGrowthRateChange(index, e.target.value)}
                        className="w-12 p-0.5 border rounded text-right mr-1 text-blue-600 text-xs"
                      />
                      <span>%</span>
                    </div>
                  ) : (
                    <span className="text-gray-800 font-medium">
                      {data.growthRate.toFixed(1)}%
                    </span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HorizontalForecastTable;
