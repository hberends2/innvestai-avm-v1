
import React from "react";
import { formatPercent, formatNumber, calculateOccupiedRooms } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

interface HorizontalSubjectTableProps {
  historicalData: { year: number; occupancy: number; rooms?: number }[];
  forecastData: { year: number; occupancy: number }[];
  historicalYears: number[];
  forecastYears: number[];
}

const HorizontalSubjectTable: React.FC<HorizontalSubjectTableProps> = ({
  historicalData,
  forecastData,
  historicalYears,
  forecastYears
}) => {
  // Calculate averages
  const avgHistoricalOccupancy = historicalData.reduce((sum, item) => sum + item.occupancy, 0) / historicalData.length;
  
  // Calculate YoY growth rates
  const calculateYoY = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const allYears = [...historicalYears, ...forecastYears];
  const allData = [...historicalData, ...forecastData];

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Subject Property Occupancy</h3>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            {/* Period Headers */}
            <TableRow>
              <TableHead className="w-24 px-1"></TableHead>
              <TableHead className="text-center bg-blue-50 px-1" colSpan={historicalYears.length}>Historical</TableHead>
              <TableHead className="text-center bg-green-50 px-1" colSpan={forecastYears.length}>Forecast</TableHead>
              <TableHead className="text-center bg-orange-50 px-1">Average</TableHead>
            </TableRow>
            {/* Year Headers */}
            <TableRow>
              <TableHead className="w-24 px-1">Metric</TableHead>
              {allYears.map((year) => (
                <TableHead key={year} className={`text-center px-1 text-xs ${
                  historicalYears.includes(year) ? 'bg-blue-50' : 'bg-green-50'
                }`}>
                  {year}
                </TableHead>
              ))}
              <TableHead className="text-center bg-orange-50 px-1 text-xs">Avg</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Occupancy Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">Occupancy</TableCell>
              {allData.map((data, index) => (
                <TableCell key={data.year} className={`p-1 text-xs text-center ${
                  historicalYears.includes(data.year) ? 'bg-blue-25' : 'bg-green-25'
                }`}>
                  <span className="text-gray-700 font-medium">
                    {data.occupancy > 0 ? formatPercent(data.occupancy) : "-"}
                  </span>
                </TableCell>
              ))}
              <TableCell className="p-1 text-xs text-center bg-orange-25">
                <span className="text-gray-700 font-medium">
                  {formatPercent(avgHistoricalOccupancy)}
                </span>
              </TableCell>
            </TableRow>
            
            {/* YoY Growth Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">YoY</TableCell>
              {allData.map((data, index) => {
                let yoyValue = "-";
                if (index > 0) {
                  const currentOccupancy = data.occupancy;
                  const previousOccupancy = allData[index - 1].occupancy;
                  const yoy = calculateYoY(currentOccupancy, previousOccupancy);
                  yoyValue = yoy ? `${yoy.toFixed(1)}%` : "-";
                }
                
                return (
                  <TableCell key={`yoy-${data.year}`} className={`p-1 text-xs text-center ${
                    historicalYears.includes(data.year) ? 'bg-blue-25' : 'bg-green-25'
                  }`}>
                    <span className="text-gray-700 font-medium">
                      {yoyValue}
                    </span>
                  </TableCell>
                );
              })}
              <TableCell className="p-1 text-xs text-center bg-orange-25">
                <span className="text-gray-700 font-medium">-</span>
              </TableCell>
            </TableRow>

            {/* Occupied Rooms Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">Occ Rooms</TableCell>
              {allData.map((data) => (
                <TableCell key={`rooms-${data.year}`} className={`p-1 text-xs text-center ${
                  historicalYears.includes(data.year) ? 'bg-blue-25' : 'bg-green-25'
                }`}>
                  <span className="text-gray-700 font-medium">
                    {data.occupancy > 0 ? formatNumber(calculateOccupiedRooms(data.occupancy, 108)) : "-"}
                  </span>
                </TableCell>
              ))}
              <TableCell className="p-1 text-xs text-center bg-orange-25">
                <span className="text-gray-700 font-medium">
                  {formatNumber(calculateOccupiedRooms(avgHistoricalOccupancy, 108))}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HorizontalSubjectTable;
