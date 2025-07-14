
import React from "react";
import { OccupancyData } from "./types";
import { calculateOccupiedRooms, formatPercent, formatNumber } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

interface ForecastTableProps {
  forecastMethod: string;
  occupancyValues: OccupancyData[];
  handleOccupancyChange: (index: number, value: string) => void;
  handleGrowthRateChange: (index: number, value: string) => void;
}

const ForecastTable: React.FC<ForecastTableProps> = ({
  forecastMethod,
  occupancyValues,
  handleOccupancyChange,
  handleGrowthRateChange
}) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Forecast Occupancy</h3>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">Year</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">Occupancy</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">YoY</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">
                <span>Occupied</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {occupancyValues.map((data, index) => (
              <TableRow key={data.year}>
                <TableCell className="p-1 text-xs">{data.year}</TableCell>
                <TableCell className="p-1 text-xs">
                  <div className="flex items-center">
                    {forecastMethod === 'direct' ? (
                      <>
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
                      </>
                    ) : (
                      <span className="text-gray-800 font-medium">
                        {formatPercent(data.occupancy)}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="p-1 text-xs">
                  <div className="flex items-center">
                    {forecastMethod === 'growth' ? (
                      <>
                        <input
                          type="number"
                          step="0.1"
                          value={data.growthRate.toFixed(1)}
                          onChange={(e) => handleGrowthRateChange(index, e.target.value)}
                          className="w-12 p-0.5 border rounded text-right mr-1 text-blue-600 text-xs"
                        />
                        <span>%</span>
                      </>
                    ) : (
                      <span className="text-gray-800 font-medium">
                        {data.growthRate.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="p-1 text-xs">
                  {formatNumber(calculateOccupiedRooms(data.occupancy))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ForecastTable;
