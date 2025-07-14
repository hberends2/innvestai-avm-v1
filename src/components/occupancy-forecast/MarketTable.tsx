
import React from "react";
import { MarketData } from "./types";
import { formatPercent } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

interface MarketTableProps {
  marketData: MarketData[];
  avgMarketOccupancy: number;
  avgMarketGrowthRate: number;
}

const MarketTable: React.FC<MarketTableProps> = ({
  marketData,
  avgMarketOccupancy,
  avgMarketGrowthRate
}) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-700 text-center">Market</h3>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">Year</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">Occupancy</TableHead>
              <TableHead className="bg-gray-200 text-xs font-bold p-1">YoY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketData.map((data, index) => (
              <TableRow key={data.year}>
                <TableCell className="p-1 text-xs">{data.year}</TableCell>
                <TableCell className="p-1 text-xs">{formatPercent(data.occupancy)}</TableCell>
                <TableCell className="p-1 text-xs">
                  {index > 0 ? formatPercent(data.growthRate / 100) : "-"}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-100">
              <TableCell className="p-1 text-xs font-medium">Avg</TableCell>
              <TableCell className="p-1 text-xs font-medium">{formatPercent(avgMarketOccupancy)}</TableCell>
              <TableCell className="p-1 text-xs font-medium">{formatPercent(avgMarketGrowthRate / 100)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MarketTable;
