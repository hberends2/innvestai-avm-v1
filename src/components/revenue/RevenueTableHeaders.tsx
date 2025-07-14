import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";

const RevenueTableHeaders = () => {
  return (
    <TableHeader className="sticky top-0 z-20 bg-white">
      {/* Period Headers */}
      <TableRow className="border-b-2 border-gray-300">
        <TableHead className="w-48 px-1 bg-white sticky left-0 z-30"></TableHead>
        <TableHead className="text-center bg-blue-50 px-1 font-semibold text-sm" colSpan={4}>
          Historical
        </TableHead>
        <TableHead className="text-center bg-green-50 px-1 font-semibold text-sm" colSpan={5}>
          Forecast
        </TableHead>
      </TableRow>
      {/* Year Headers */}
      <TableRow className="border-b border-gray-200">
        <TableHead className="w-48 px-1 bg-white sticky left-0 z-30 font-semibold">
          Metric
        </TableHead>
        {/* Historical Years */}
        <TableHead className="text-center bg-blue-50 px-1 font-semibold text-sm min-w-[80px]">
          2021
        </TableHead>
        <TableHead className="text-center bg-blue-50 px-1 font-semibold text-sm min-w-[80px]">
          2022
        </TableHead>
        <TableHead className="text-center bg-blue-50 px-1 font-semibold text-sm min-w-[80px]">
          2023
        </TableHead>
        <TableHead className="text-center bg-blue-50 px-1 font-semibold text-sm min-w-[80px]">
          2024
        </TableHead>
        {/* Forecast Years */}
        <TableHead className="text-center bg-green-50 px-1 font-semibold text-sm min-w-[80px]">
          2025
        </TableHead>
        <TableHead className="text-center bg-green-50 px-1 font-semibold text-sm min-w-[80px]">
          2026
        </TableHead>
        <TableHead className="text-center bg-green-50 px-1 font-semibold text-sm min-w-[80px]">
          2027
        </TableHead>
        <TableHead className="text-center bg-green-50 px-1 font-semibold text-sm min-w-[80px]">
          2028
        </TableHead>
        <TableHead className="text-center bg-green-50 px-1 font-semibold text-sm min-w-[80px]">
          2029
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default RevenueTableHeaders;