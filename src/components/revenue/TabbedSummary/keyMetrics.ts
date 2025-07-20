
import React from 'react';
import { TabbedSummaryProps, MetricRow } from './types';

export const createKeyMetrics = (props: TabbedSummaryProps, allYears: number[]): MetricRow[] => {
  const { 
    historicalYears, 
    forecastYears, 
    formatCurrency, 
    formatPercent, 
    calculateTotalExpense, 
    calculateGrossOperatingProfit,
    historicalData,
    occupancyForecast,
    occupancyForecastMethod,
    calculateOccupancyFromYoY,
    getHistoricalADR,
    getForecastADR,
    getForecastRevpar,
    getForecastRoomsRevenue,
    fbPerOccupiedRoom,
    resortFeePerOccupiedRoom,
    otherOperatedPerOccupiedRoom,
    miscellaneousPerOccupiedRoom,
    allocatedPerOccupiedRoom,
    getAvailableRooms
  } = props;

  // Helper function to calculate occupied rooms for forecast years
  const getForecastOccupiedRooms = (year: number) => {
    const occupancyValue = occupancyForecastMethod === "Occupancy" 
      ? parseFloat(occupancyForecast[year] || "0")
      : calculateOccupancyFromYoY(year);
    const availableRooms = getAvailableRooms(year);
    return (occupancyValue / 100) * availableRooms;
  };

  // Helper function to calculate total revenue for a given year
  const calculateTotalRevenueForYear = (year: number) => {
    if (historicalYears.includes(year)) {
      // Sum historical revenue components
      const roomsRevenue = historicalData.roomsRevenue[year] || 0;
      const fbRevenue = historicalData.fbRevenue[year] || 0;
      const resortFeeRevenue = historicalData.resortFeeRevenue[year] || 0;
      const otherOperatedRevenue = historicalData.otherOperatedRevenue[year] || 0;
      const miscellaneousRevenue = historicalData.miscellaneousRevenue[year] || 0;
      const allocatedRevenue = historicalData.allocatedRevenue[year] || 0;
      
      return roomsRevenue + fbRevenue + resortFeeRevenue + 
             otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
    } else {
      // Calculate forecast revenue components
      const roomsRevenue = getForecastRoomsRevenue(year);
      const occupiedRooms = getForecastOccupiedRooms(year);
      
      const fbRevenue = parseFloat(fbPerOccupiedRoom[year] || "0") * occupiedRooms;
      const resortFeeRevenue = parseFloat(resortFeePerOccupiedRoom[year] || "0") * occupiedRooms;
      const otherOperatedRevenue = parseFloat(otherOperatedPerOccupiedRoom[year] || "0") * occupiedRooms;
      const miscellaneousRevenue = parseFloat(miscellaneousPerOccupiedRoom[year] || "0") * occupiedRooms;
      const allocatedRevenue = parseFloat(allocatedPerOccupiedRoom[year] || "0") * occupiedRooms;
      
      return roomsRevenue + fbRevenue + resortFeeRevenue + 
             otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
    }
  };

  const metrics: MetricRow[] = [
    // Gross Operating Profit - only use the prop function if available
    {
      label: "Gross Operating Profit",
      data: allYears.map(year => {
        if (calculateGrossOperatingProfit) {
          const gop = calculateGrossOperatingProfit(year);
          return formatCurrency(gop);
        } else {
          return "N/A";
        }
      })
    },
    // GOPPAR - Gross Operating Profit / Available Rooms
    {
      label: "  GOPPAR",
      data: allYears.map(year => {
        if (calculateGrossOperatingProfit) {
          const gop = calculateGrossOperatingProfit(year);
          const availableRooms = getAvailableRooms(year);
          const goppar = availableRooms > 0 ? gop / availableRooms : 0;
          return formatCurrency(goppar);
        } else {
          return "N/A";
        }
      })
    },
    // GOP % of Revenue - new metric (indented)
    {
      label: "  GOP % of Revenue",
      data: allYears.map(year => {
        if (calculateGrossOperatingProfit) {
          const gop = calculateGrossOperatingProfit(year);
          const totalRevenue = calculateTotalRevenueForYear(year);
          const gopPercent = totalRevenue > 0 ? (gop / totalRevenue) * 100 : 0;
          return formatPercent(gopPercent, 1);
        } else {
          return "N/A";
        }
      })
    },
    // EBITDA - Fixed to use Total Revenue - Total Expense
    {
      label: "EBITDA",
      data: allYears.map(year => {
        if (calculateTotalExpense) {
          const totalRevenue = calculateTotalRevenueForYear(year);
          const totalExpense = calculateTotalExpense(year);
          const ebitda = totalRevenue - totalExpense;
          return formatCurrency(ebitda);
        } else {
          return "N/A";
        }
      })
    },
    // EBITDA % of Revenue - new metric (indented)
    {
      label: "  EBITDA % of Revenue",
      data: allYears.map(year => {
        if (calculateTotalExpense) {
          const totalRevenue = calculateTotalRevenueForYear(year);
          const totalExpense = calculateTotalExpense(year);
          const ebitda = totalRevenue - totalExpense;
          const ebitdaPercent = totalRevenue > 0 ? (ebitda / totalRevenue) * 100 : 0;
          return formatPercent(ebitdaPercent, 1);
        } else {
          return "N/A";
        }
      })
    }
  ];

  return metrics;
};
