
import React from "react";
import { HistoricalData, HistoricalGrowthRate, MarketData, CompSetData } from "./types";
import { calculateOccupiedRooms, formatPercent, formatNumber } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

interface HistoricalOccupancyTableProps {
  historicalData: HistoricalData[];
  historicalGrowthRates: HistoricalGrowthRate[];
  avgHistoricalOccupancy: number;
  avgHistoricalGrowthRate: number;
  avgHistoricalOccupiedRooms: number;
  marketData: MarketData[];
  avgMarketOccupancy: number;
  avgMarketGrowthRate: number;
  compSetData: CompSetData[];
  avgCompSetOccupancy: number;
  avgCompSetGrowthRate: number;
}

const HistoricalOccupancyTable: React.FC<HistoricalOccupancyTableProps> = ({
  historicalData,
  historicalGrowthRates,
  avgHistoricalOccupancy,
  avgHistoricalGrowthRate,
  avgHistoricalOccupiedRooms,
  marketData,
  avgMarketOccupancy,
  avgMarketGrowthRate,
  compSetData,
  avgCompSetOccupancy,
  avgCompSetGrowthRate
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Historical Occupancy Reference</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="w-full"> {/* Removed overflow-x-auto to prevent horizontal scrollbar */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead rowSpan={2} className="bg-gray-200 text-base font-bold">Year</TableHead>
                <TableHead colSpan={3} className="text-center bg-gray-200 text-base font-bold">Subject Property</TableHead>
                <TableHead colSpan={2} className="text-center bg-gray-200 text-base font-bold">Market</TableHead>
                <TableHead colSpan={2} className="text-center bg-gray-200 text-base font-bold">Comp Set</TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="bg-gray-200 text-base font-bold">Occupancy</TableHead>
                <TableHead className="bg-gray-200 text-base font-bold">YoY</TableHead>
                <TableHead className="bg-gray-200 text-base font-bold">Occupied Rooms</TableHead>
                <TableHead className="bg-gray-200 text-base font-bold">Occupancy</TableHead>
                <TableHead className="bg-gray-200 text-base font-bold">YoY</TableHead>
                <TableHead className="bg-gray-200 text-base font-bold">Occupancy</TableHead>
                <TableHead className="bg-gray-200 text-base font-bold">YoY</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicalData.map((data, index) => (
                <TableRow key={data.year}>
                  <TableCell>{data.year}</TableCell>
                  {/* Subject Property */}
                  <TableCell>{formatPercent(data.occupancy)}</TableCell>
                  <TableCell>
                    {index > 0 
                      ? formatPercent(historicalGrowthRates[index - 1].growthRate / 100) 
                      : "-"}
                  </TableCell>
                  <TableCell>{formatNumber(calculateOccupiedRooms(data.occupancy, data.rooms))}</TableCell>
                  
                  {/* Market Data */}
                  <TableCell>
                    {marketData[index] ? formatPercent(marketData[index].occupancy) : "-"}
                  </TableCell>
                  <TableCell>
                    {index > 0 && marketData[index] ? formatPercent(marketData[index].growthRate / 100) : "-"}
                  </TableCell>
                  
                  {/* Comp Set Data */}
                  <TableCell>
                    {compSetData[index] ? formatPercent(compSetData[index].occupancy) : "-"}
                  </TableCell>
                  <TableCell>
                    {index > 0 && compSetData[index] ? formatPercent(compSetData[index].growthRate / 100) : "-"}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-100">
                <TableCell className="font-medium">Average</TableCell>
                {/* Subject Property Averages */}
                <TableCell className="font-medium">
                  {formatPercent(avgHistoricalOccupancy)}
                </TableCell>
                <TableCell className="font-medium">
                  {formatPercent(avgHistoricalGrowthRate / 100)}
                </TableCell>
                <TableCell className="font-medium">
                  {formatNumber(avgHistoricalOccupiedRooms)}
                </TableCell>
                
                {/* Market Averages */}
                <TableCell className="font-medium">
                  {formatPercent(avgMarketOccupancy)}
                </TableCell>
                <TableCell className="font-medium">
                  {formatPercent(avgMarketGrowthRate / 100)}
                </TableCell>
                
                {/* Comp Set Averages */}
                <TableCell className="font-medium">
                  {formatPercent(avgCompSetOccupancy)}
                </TableCell>
                <TableCell className="font-medium">
                  {formatPercent(avgCompSetGrowthRate / 100)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HistoricalOccupancyTable;
