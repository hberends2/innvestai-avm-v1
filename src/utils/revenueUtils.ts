
import { getAvailableRooms } from './calculationUtils';

export const getHistoricalOccupiedRooms = (year: number, roomsKeys: number, occupancyPercent: number): number => {
  const availableRooms = getAvailableRooms(year);
  const occupancyDecimal = occupancyPercent / 100;
  return Math.round(availableRooms * occupancyDecimal);
};

export const calculateHistoricalPerOccupiedRoom = (revenue: number, occupiedRooms: number): number => {
  return occupiedRooms > 0 ? Math.round(revenue / occupiedRooms) : 0;
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
