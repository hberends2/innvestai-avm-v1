
import { REVENUE_CONFIG } from '../config/revenueConfig';

export const getAvailableRooms = (year: number): number => {
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return REVENUE_CONFIG.ROOMS_KEYS * (isLeapYear ? 366 : 365);
};

export const calculateOccupiedRooms = (year: number, occupancyPercent: number): number => {
  const availableRooms = getAvailableRooms(year);
  const occupancyDecimal = occupancyPercent / 100;
  return Math.round(availableRooms * occupancyDecimal);
};

export const calculateOccupancyFromYoY = (
  year: number,
  occupancyYoYGrowth: Record<number, string>,
  baseOccupancy: number
): number => {
  const yearIndex = REVENUE_CONFIG.FORECAST_YEARS.indexOf(year as any);
  if (yearIndex === 0) {
    const growthRate = parseFloat(occupancyYoYGrowth[year]) || 0;
    return baseOccupancy * (1 + growthRate / 100);
  } else {
    const prevYear = REVENUE_CONFIG.FORECAST_YEARS[yearIndex - 1];
    const prevOccupancy = calculateOccupancyFromYoY(prevYear, occupancyYoYGrowth, baseOccupancy);
    const growthRate = parseFloat(occupancyYoYGrowth[year]) || 0;
    return prevOccupancy * (1 + growthRate / 100);
  }
};

export const calculateForecastADR = (
  year: number,
  baseADR: number,
  adrGrowthType: string,
  flatAdrGrowth: string,
  yearlyAdrGrowth: Record<number, string>
): number => {
  const yearIndex = REVENUE_CONFIG.FORECAST_YEARS.indexOf(year as any);
  if (yearIndex === 0) {
    const growthRate = adrGrowthType === "flat" 
      ? parseFloat(flatAdrGrowth) || 0
      : parseFloat(yearlyAdrGrowth[year]) || 0;
    return baseADR * (1 + growthRate / 100);
  } else {
    const prevYear = REVENUE_CONFIG.FORECAST_YEARS[yearIndex - 1];
    const prevADR = calculateForecastADR(prevYear, baseADR, adrGrowthType, flatAdrGrowth, yearlyAdrGrowth);
    const growthRate = adrGrowthType === "flat"
      ? parseFloat(flatAdrGrowth) || 0
      : parseFloat(yearlyAdrGrowth[year]) || 0;
    return prevADR * (1 + growthRate / 100);
  }
};

export const calculateRoomsRevenue = (adr: number, occupiedRooms: number): number => {
  return adr * occupiedRooms;
};

export const calculateRevpar = (roomsRevenue: number, availableRooms: number): number => {
  return roomsRevenue / availableRooms;
};

export const calculateHistoricalADR = (roomsRevenue: number, occupiedRooms: number): number => {
  return occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};
