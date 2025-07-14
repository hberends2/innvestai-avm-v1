import React from 'react';
import { ChevronDown, ChevronRight } from "lucide-react";
import { MetricRow, TabbedSummaryProps } from './types';
import { createHelpers } from './helpers';

export const createRevenueMetrics = (
  props: TabbedSummaryProps,
  allYears: number[],
  isOtherOperatedExpanded: boolean,
  setIsOtherOperatedExpanded: (expanded: boolean) => void
): MetricRow[] => {
  const { 
    historicalYears, 
    formatPercent, 
    formatCurrency, 
    getHistoricalADR, 
    getForecastADR, 
    getForecastRevpar, 
    getForecastRoomsRevenue 
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
      label: "Rooms Revenue",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(props.historicalData.roomsRevenue[year] || 0);
        } else {
          return formatCurrency(getForecastRoomsRevenue(year));
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
        "Total Other Operated Revenue"
      ),
      data: allYears.map(year => formatCurrency(helpers.calculateTotalOtherOperatedRevenue(year))),
      isCollapsible: true
    },
    {
      label: React.createElement('span', { className: 'font-bold' }, 'Total Revenue'),
      data: allYears.map(year => {
        return React.createElement(
          'span',
          { className: 'font-bold' },
          formatCurrency(helpers.calculateTotalRevenue(year))
        );
      })
    }
  ];
};
