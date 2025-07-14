
import React from "react";
import { HistoricalData, HistoricalGrowthRate } from "./types";
import { formatPercent, formatNumber, calculateOccupiedRooms } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

interface SubjectPropertyTableProps {
  historicalData: HistoricalData[];
  historicalGrowthRates: HistoricalGrowthRate[];
  avgHistoricalOccupancy: number;
  avgHistoricalGrowthRate: number;
  avgHistoricalOccupiedRooms: number;
}

const SubjectPropertyTable: React.FC<SubjectPropertyTableProps> = ({
  historicalData,
  historicalGrowthRates,
  avgHistoricalOccupancy,
  avgHistoricalGrowthRate,
  avgHistoricalOccupiedRooms
}) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-700 text-center">Subject Property</h3>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">Year</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">Occupancy</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">YoY</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">Occ Rooms</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historicalData.map((data, index) => (
              <TableRow key={data.year}>
                <TableCell className="p-1 text-xs">{data.year}</TableCell>
                <TableCell className="p-1 text-xs">{formatPercent(data.occupancy)}</TableCell>
                <TableCell className="p-1 text-xs">
                  {index > 0 
                    ? formatPercent(historicalGrowthRates[index - 1].growthRate / 100) 
                    : "-"}
                </TableCell>
                <TableCell className="p-1 text-xs">{formatNumber(calculateOccupiedRooms(data.occupancy, data.rooms))}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-100">
              <TableCell className="p-1 text-xs font-medium">Avg</TableCell>
              <TableCell className="p-1 text-xs font-medium">{formatPercent(avgHistoricalOccupancy)}</TableCell>
              <TableCell className="p-1 text-xs font-medium">{formatPercent(avgHistoricalGrowthRate / 100)}</TableCell>
              <TableCell className="p-1 text-xs font-medium">{formatNumber(avgHistoricalOccupiedRooms)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubjectPropertyTable;
