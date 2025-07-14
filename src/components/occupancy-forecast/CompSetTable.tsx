
import React from "react";
import { CompSetData } from "./types";
import { formatPercent } from "./utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

interface CompSetTableProps {
  compSetData: CompSetData[];
  avgCompSetOccupancy: number;
  avgCompSetGrowthRate: number;
}

const CompSetTable: React.FC<CompSetTableProps> = ({
  compSetData,
  avgCompSetOccupancy,
  avgCompSetGrowthRate
}) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2 text-gray-700 text-center">Comp Set</h3>
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
            {compSetData.map((data, index) => (
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
              <TableCell className="p-1 text-xs font-medium">{formatPercent(avgCompSetOccupancy)}</TableCell>
              <TableCell className="p-1 text-xs font-medium">{formatPercent(avgCompSetGrowthRate / 100)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompSetTable;
