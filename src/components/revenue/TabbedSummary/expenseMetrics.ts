
import React from 'react';
import { ChevronDown, ChevronRight } from "lucide-react";
import { MetricRow, TabbedSummaryProps } from './types';
import { createHelpers } from './helpers';
import { historicalExpenseData } from './expenseData';
import { 
  calculateForecastExpense, 
  calculateTotalOtherOperatedExpense, 
  calculateTotalUndistributedExpense, 
  calculateTotalExpense 
} from './expenseCalculations';

export const createExpenseMetrics = (
  props: TabbedSummaryProps,
  allYears: number[],
  isOtherOperatedExpanded: boolean,
  setIsOtherOperatedExpanded: (expanded: boolean) => void,
  isUndistributedExpanded: boolean,
  setIsUndistributedExpanded: (expanded: boolean) => void
): MetricRow[] => {
  const { 
    historicalYears, 
    formatPercent, 
    formatCurrency,
    getHistoricalADR, 
    getForecastADR, 
    getForecastRevpar
  } = props;
  const helpers = createHelpers(props);

  return [
    {
      label: "Subject Property Occupancy",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatPercent(props.historicalData.occupancy[year] || 0);
        } else {
          const occupancyValue = props.occupancyForecastMethod === "Occupancy" 
            ? parseFloat(props.occupancyForecast[year] || "0")
            : props.calculateOccupancyFromYoY(year);
          return formatPercent(occupancyValue);
        }
      })
    },
    {
      label: "Subject Property ADR",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(getHistoricalADR(year));
        } else {
          return formatCurrency(getForecastADR(year));
        }
      })
    },
    {
      label: "Subject Property RevPAR",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(helpers.getHistoricalRevpar(year));
        } else {
          return formatCurrency(getForecastRevpar(year));
        }
      })
    },
    {
      label: "Rooms Expense",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.rooms[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'rooms'));
        }
      })
    },
    {
      label: React.createElement(
        'div', 
        { 
          className: "flex items-center cursor-pointer",
          onClick: () => setIsOtherOperatedExpanded(!isOtherOperatedExpanded)
        },
        isOtherOperatedExpanded ? 
          React.createElement(ChevronDown, { className: "h-3 w-3 mr-1" }) :
          React.createElement(ChevronRight, { className: "h-3 w-3 mr-1" }),
        "Total Other Operated Expense"
      ),
      data: allYears.map(year => formatCurrency(calculateTotalOtherOperatedExpense(year, historicalYears))),
      isCollapsible: true
    },
    {
      label: React.createElement(
        'div', 
        { 
          className: "flex items-center cursor-pointer",
          onClick: () => setIsUndistributedExpanded(!isUndistributedExpanded)
        },
        isUndistributedExpanded ? 
          React.createElement(ChevronDown, { className: "h-3 w-3 mr-1" }) :
          React.createElement(ChevronRight, { className: "h-3 w-3 mr-1" }),
        "Total Undistributed Expense"
      ),
      data: allYears.map(year => formatCurrency(calculateTotalUndistributedExpense(year, historicalYears))),
      isCollapsible: true,
      isUndistributed: true
    },
    {
      label: "Non-Operating",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.nonOperating[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'nonOperating'));
        }
      })
    },
    {
      label: React.createElement('span', { className: 'font-bold' }, 'Total Expense'),
      data: allYears.map(year => 
        React.createElement(
          'span',
          { className: 'font-bold' },
          formatCurrency(calculateTotalExpense(year, historicalYears))
        )
      )
    }
  ];
};
