import { useMemo } from 'react';
// import { RevenueCalculations } from '../types/revenueCalculations';

/**
 * Custom hook to manage TabbedSummary props
 * Eliminates prop drilling for the TabbedSummary component
 */
export const useTabbedSummaryProps = (
  revenueCalculations: any, // TODO: Use proper RevenueCalculations type when complete
  helpers: any,
  roomsKeys: number,
  historicalYears: number[],
  forecastYears: number[],
  historicalData: any,
  formatCurrency: (value: number) => string,
  formatPercent: (value: number, decimals?: number) => string
) => {
  
  const tabbedSummaryProps = useMemo(() => ({
    roomsKeys,
    historicalYears,
    forecastYears,
    historicalData,
    occupancyForecast: revenueCalculations.occupancyForecast,
    occupancyForecastMethod: revenueCalculations.occupancyForecastMethod,
    calculateOccupancyFromYoY: helpers.calculateOccupancyFromYoYForYear,
    getAvailableRooms: helpers.getAvailableRoomsForYear,
    getForecastRoomsRevenue: helpers.getForecastRoomsRevenueForYear,
    getHistoricalADR: helpers.getHistoricalADRForYearCalculated,
    getForecastADR: helpers.getForecastADRForYear,
    getForecastRevpar: helpers.getForecastRevparForYear,
    fbPerOccupiedRoom: revenueCalculations.fbPerOccupiedRoom,
    resortFeePerOccupiedRoom: revenueCalculations.resortFeePerOccupiedRoom,
    otherOperatedPerOccupiedRoom: revenueCalculations.otherOperatedPerOccupiedRoom,
    miscellaneousPerOccupiedRoom: revenueCalculations.miscellaneousPerOccupiedRoom,
    allocatedPerOccupiedRoom: revenueCalculations.allocatedPerOccupiedRoom,
    formatCurrency,
    formatPercent,
    helpers,
  }), [
    roomsKeys,
    historicalYears,
    forecastYears,
    historicalData,
    revenueCalculations,
    helpers,
    formatCurrency,
    formatPercent,
  ]);

  return tabbedSummaryProps;
};