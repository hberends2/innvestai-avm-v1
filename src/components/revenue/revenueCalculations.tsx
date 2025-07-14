
import { getAvailableRooms } from '../../utils/calculationUtils';
import { marketADRData, compSetADRData, marketRevparData, compSetRevparData } from './revenueData';

export const getHistoricalOccupiedRooms = (year: number, getAvailableRoomsFunc: (year: number) => number, occupancyPercent: number): number => {
  const availableRooms = getAvailableRoomsFunc(year);
  const occupancyDecimal = occupancyPercent / 100;
  return Math.round(availableRooms * occupancyDecimal);
};

export const getForecastOccupiedRooms = (year: number, getAvailableRoomsFunc: (year: number) => number, occupancyValue: string): number => {
  const availableRooms = getAvailableRoomsFunc(year);
  const occupancyDecimal = parseFloat(occupancyValue) / 100;
  return Math.round(availableRooms * occupancyDecimal);
};

export const getHistoricalADR = (year: number, roomsRevenue: number, occupiedRooms: number): number => {
  return occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
};

export const getForecastADR = (roomsRevenue: number, occupiedRooms: number): number => {
  return occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
};

// Market ADR YoY Growth calculation
export const getMarketADRYoY = (year: number, index: number, historicalYears: number[]): number => {
  if (index === 0) return 0;
  const currentData = marketADRData[year as keyof typeof marketADRData];
  const previousYear = historicalYears[index - 1];
  const previousData = marketADRData[previousYear as keyof typeof marketADRData];
  
  if (!currentData || !previousData) return 0;
  return ((currentData - previousData) / previousData) * 100;
};

// Comp Set ADR YoY Growth calculation
export const getCompSetADRYoY = (year: number, index: number, historicalYears: number[]): number => {
  if (index === 0) return 0;
  const currentData = compSetADRData[year as keyof typeof compSetADRData];
  const previousYear = historicalYears[index - 1];
  const previousData = compSetADRData[previousYear as keyof typeof compSetADRData];
  
  if (!currentData || !previousData) return 0;
  return ((currentData - previousData) / previousData) * 100;
};

// Historical ADR YoY Growth calculation
export const getHistoricalADRYoY = (year: number, index: number, historicalYears: number[], getHistoricalADR: (year: number) => number): number => {
  if (index === 0) return 0;
  const currentADR = getHistoricalADR(year);
  const previousYear = historicalYears[index - 1];
  const previousADR = getHistoricalADR(previousYear);
  
  if (previousADR === 0) return 0;
  return ((currentADR - previousADR) / previousADR) * 100;
};

// Forecast ADR YoY Growth calculation
export const getForecastADRYoY = (year: number, index: number, forecastYears: number[], getForecastADR: (year: number) => number): number => {
  if (index === 0) return 0;
  const currentADR = getForecastADR(year);
  const previousYear = forecastYears[index - 1];
  const previousADR = getForecastADR(previousYear);
  
  if (previousADR === 0) return 0;
  return ((currentADR - previousADR) / previousADR) * 100;
};

// Market RevPAR YoY Growth calculation
export const getMarketRevparYoY = (year: number, index: number, historicalYears: number[]): number => {
  if (index === 0) return 0;
  const currentData = marketRevparData[year as keyof typeof marketRevparData];
  const previousYear = historicalYears[index - 1];
  const previousData = marketRevparData[previousYear as keyof typeof marketRevparData];
  
  if (!currentData || !previousData) return 0;
  return ((currentData - previousData) / previousData) * 100;
};

// Comp Set RevPAR YoY Growth calculation
export const getCompSetRevparYoY = (year: number, index: number, historicalYears: number[]): number => {
  if (index === 0) return 0;
  const currentData = compSetRevparData[year as keyof typeof compSetRevparData];
  const previousYear = historicalYears[index - 1];
  const previousData = compSetRevparData[previousYear as keyof typeof compSetRevparData];
  
  if (!currentData || !previousData) return 0;
  return ((currentData - previousData) / previousData) * 100;
};

// Format YoY with color utility
export const formatYoYWithColor = (yoyValue: number): React.ReactNode => {
  const colorClass = yoyValue >= 0 ? 'text-green-600' : 'text-red-600';
  return (
    <span className={colorClass}>
      {yoyValue >= 0 ? '+' : ''}{yoyValue.toFixed(1)}%
    </span>
  );
};
