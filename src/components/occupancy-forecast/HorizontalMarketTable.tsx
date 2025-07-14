
import React from "react";
import { MarketData } from "./types";
import { formatPercent } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

interface HorizontalMarketTableProps {
  marketData: MarketData[];
  avgMarketOccupancy: number;
  avgMarketGrowthRate: number;
  title?: string;
}

const HorizontalMarketTable: React.FC<HorizontalMarketTableProps> = ({
  marketData,
  avgMarketOccupancy,
  avgMarketGrowthRate,
  title = "Market Analysis"
}) => {
  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">{title}</h3>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Table>
          <TableHeader>
            {/* Period Headers */}
            <TableRow>
              <TableHead className="w-24 px-1"></TableHead>
              <TableHead className="text-center bg-blue-50 px-1" colSpan={marketData.length}>Historical</TableHead>
              <TableHead className="text-center bg-orange-50 px-1">Average</TableHead>
            </TableRow>
            {/* Year Headers */}
            <TableRow>
              <TableHead className="w-24 px-1">Metric</TableHead>
              {marketData.map((data) => (
                <TableHead key={data.year} className="text-center bg-blue-50 px-1 text-xs">{data.year}</TableHead>
              ))}
              <TableHead className="text-center bg-orange-50 px-1 text-xs">Avg</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Occupancy Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">Occupancy</TableCell>
              {marketData.map((data) => (
                <TableCell key={data.year} className="p-1 text-xs text-center bg-blue-25">
                  <span className="text-gray-700 font-medium">
                    {data.occupancy > 0 ? formatPercent(data.occupancy) : "-"}
                  </span>
                </TableCell>
              ))}
              <TableCell className="p-1 text-xs text-center bg-orange-25">
                <span className="text-gray-700 font-medium">
                  {formatPercent(avgMarketOccupancy)}
                </span>
              </TableCell>
            </TableRow>
            
            {/* YoY Growth Row */}
            <TableRow>
              <TableCell className="p-1 text-xs font-medium">YoY</TableCell>
              {marketData.map((data, index) => (
                <TableCell key={`yoy-${data.year}`} className="p-1 text-xs text-center bg-blue-25">
                  <span className="text-gray-700 font-medium">
                    {index === 0 ? '-' : (data.growthRate ? `${data.growthRate.toFixed(1)}%` : '-')}
                  </span>
                </TableCell>
              ))}
              <TableCell className="p-1 text-xs text-center bg-orange-25">
                <span className="text-gray-700 font-medium">
                  {avgMarketGrowthRate.toFixed(1)}%
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HorizontalMarketTable;
