
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { MetricRow } from "./types";

interface SummaryTableProps {
  metrics: MetricRow[];
  historicalYears: number[];
  forecastYears: number[];
  activeTab: string;
  isOtherOperatedExpanded: boolean;
  isUndistributedExpanded: boolean;
  subcategoryMetrics: MetricRow[];
  undistributedSubcategoryMetrics: MetricRow[];
}

const SummaryTable: React.FC<SummaryTableProps> = ({
  metrics,
  historicalYears,
  forecastYears,
  activeTab,
  isOtherOperatedExpanded,
  isUndistributedExpanded,
  subcategoryMetrics,
  undistributedSubcategoryMetrics
}) => {
  // Function to render all rows including subcategories in the correct position
  const renderTableRows = () => {
    const rows: React.ReactNode[] = [];
    
    metrics.forEach((metric, index) => {
      // Add the main metric row with proper indentation
      const isIndented = metric.isSubcategory || metric.isUndistributedSubcategory;
      
      rows.push(
        <TableRow key={index} className="h-6">
          <TableCell className={`font-medium text-xs py-0.5 px-2 bg-white sticky left-0 z-10 w-48 ${isIndented ? 'pl-8' : ''}`}>
            {metric.label}
          </TableCell>
          {metric.data.map((value, yearIndex) => {
            const isHistorical = yearIndex < historicalYears.length;
            return (
              <TableCell 
                key={yearIndex} 
                className={`text-center text-xs py-0.5 px-1 min-w-[80px] ${isHistorical ? 'bg-blue-25' : 'bg-green-25'}`}
              >
                {value}
              </TableCell>
            );
          })}
        </TableRow>
      );
      
      // If this is the collapsible "Total Other Operated" row and it's expanded, add subcategories
      if (metric.isCollapsible && !metric.isUndistributed && isOtherOperatedExpanded && 
          ((activeTab === "revenue" && typeof metric.label === 'object') || 
           (activeTab === "expense" && typeof metric.label === 'object'))) {
        subcategoryMetrics.forEach((subMetric, subIndex) => {
          rows.push(
            <TableRow key={`sub-${subIndex}`} className="h-6">
              <TableCell className="font-medium text-xs py-0.5 px-2 pl-8 bg-white sticky left-0 z-10 w-48">
                {subMetric.label}
              </TableCell>
              {subMetric.data.map((value, yearIndex) => {
                const isHistorical = yearIndex < historicalYears.length;
                return (
                  <TableCell 
                    key={yearIndex} 
                    className={`text-center text-xs py-0.5 px-1 min-w-[80px] ${isHistorical ? 'bg-blue-25' : 'bg-green-25'}`}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        });
      }

      // If this is the collapsible "Total Undistributed Expense" row and it's expanded, add undistributed subcategories
      if (metric.isCollapsible && metric.isUndistributed && isUndistributedExpanded && 
          activeTab === "expense" && typeof metric.label === 'object') {
        undistributedSubcategoryMetrics.forEach((subMetric, subIndex) => {
          rows.push(
            <TableRow key={`undist-sub-${subIndex}`} className="h-6">
              <TableCell className="font-medium text-xs py-0.5 px-2 pl-8 bg-white sticky left-0 z-10 w-48">
                {subMetric.label}
              </TableCell>
              {subMetric.data.map((value, yearIndex) => {
                const isHistorical = yearIndex < historicalYears.length;
                return (
                  <TableCell 
                    key={yearIndex} 
                    className={`text-center text-xs py-0.5 px-1 min-w-[80px] ${isHistorical ? 'bg-blue-25' : 'bg-green-25'}`}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        });
      }
    });
    
    return rows;
  };

  return (
    <div className="bg-white h-full">
      <Table>
        <TableHeader className="sticky top-0 z-50 bg-white shadow-sm">
          {/* Period Headers - matching Valuation table structure exactly */}
          <TableRow className="border-b-2 border-gray-300">
            <TableHead className="w-48 px-2 bg-white sticky left-0 z-50"></TableHead>
            <TableHead className="text-center bg-blue-50 px-1 font-semibold text-sm" colSpan={historicalYears.length}>
              Historical
            </TableHead>
            <TableHead className="text-center bg-green-50 px-1 font-semibold text-sm" colSpan={forecastYears.length}>
              Forecast
            </TableHead>
          </TableRow>
          {/* Year Headers - matching Valuation table structure exactly */}
          <TableRow className="border-b border-gray-200">
            <TableHead className="w-48 px-2 bg-white sticky left-0 z-50 font-semibold text-xs">
              Metric
            </TableHead>
            {historicalYears.map(year => (
              <TableHead key={year} className="text-center bg-blue-50 px-1 font-semibold text-sm min-w-[80px]">
                {year}
              </TableHead>
            ))}
            {forecastYears.map(year => (
              <TableHead key={year} className="text-center bg-green-50 px-1 font-semibold text-sm min-w-[80px]">
                {year}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderTableRows()}
        </TableBody>
      </Table>
    </div>
  );
};

export default SummaryTable;
