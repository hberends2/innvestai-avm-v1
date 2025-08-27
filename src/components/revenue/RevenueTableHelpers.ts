import { getAvailableRooms, calculateOccupancyFromYoY } from '../../utils/calculationUtils';
import { CalculationHelpers, HistoricalRevenueData } from '../../types/revenueCalculations';

// Re-export CalculationHelpers for backward compatibility
export type { CalculationHelpers } from '../../types/revenueCalculations';

export const createCalculationHelpers = (
  getAvailableRooms: (year: number) => number,
  historicalData: HistoricalRevenueData,
  occupancyForecast: Record<number, string>,
  occupancyForecastMethod: string,
  calculateOccupancyFromYoY: (year: number) => number,
  getForecastRoomsRevenue: (year: number) => number,
  fbPerOccupiedRoom: Record<number, string>,
  resortFeePerOccupiedRoom: Record<number, string>,
  otherOperatedPerOccupiedRoom: Record<number, string>,
  miscellaneousPerOccupiedRoom: Record<number, string>,
  allocatedPerOccupiedRoom: Record<number, string>
): CalculationHelpers => {
  
  const getHistoricalOccupiedRoomsForYear = (year: number): number => {
    const availableRooms = getAvailableRooms(year);
    const occupancyPercent = historicalData.occupancy[year] || 0;
    const occupancyDecimal = occupancyPercent / 100;
    return Math.round(availableRooms * occupancyDecimal);
  };

  const getForecastOccupiedRoomsForYear = (year: number): number => {
    const availableRooms = getAvailableRooms(year);
    let occupancyPercent: number;
    
    if (occupancyForecastMethod === "Occupancy") {
      occupancyPercent = parseFloat(occupancyForecast[year] || "0");
    } else {
      occupancyPercent = calculateOccupancyFromYoY(year);
    }
    
    const occupancyDecimal = occupancyPercent / 100;
    return Math.round(availableRooms * occupancyDecimal);
  };

  const getHistoricalADRForYear = (year: number): number => {
    const roomsRevenue = historicalData.roomsRevenue[year] || 0;
    const occupiedRooms = getHistoricalOccupiedRoomsForYear(year);
    return occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
  };

  const getForecastADRForYear = (year: number): number => {
    const roomsRevenue = getForecastRoomsRevenue(year);
    const occupiedRooms = getForecastOccupiedRoomsForYear(year);
    return occupiedRooms > 0 ? roomsRevenue / occupiedRooms : 0;
  };

  const calculateTotalOtherOperatedRevenue = (year: number, isHistorical: boolean): number => {
    if (isHistorical) {
      const fbRevenue = historicalData.fbRevenue[year] || 0;
      const resortFeeRevenue = historicalData.resortFeeRevenue[year] || 0;
      const otherOperatedRevenue = historicalData.otherOperatedRevenue[year] || 0;
      const miscellaneousRevenue = historicalData.miscellaneousRevenue[year] || 0;
      const allocatedRevenue = historicalData.allocatedRevenue[year] || 0;
      return fbRevenue + resortFeeRevenue + otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
    } else {
      const occupiedRooms = getForecastOccupiedRoomsForYear(year);
      const fbRevenue = (parseFloat(fbPerOccupiedRoom[year] || "0")) * occupiedRooms;
      const resortFeeRevenue = (parseFloat(resortFeePerOccupiedRoom[year] || "0")) * occupiedRooms;
      const otherOperatedRevenue = (parseFloat(otherOperatedPerOccupiedRoom[year] || "0")) * occupiedRooms;
      const miscellaneousRevenue = (parseFloat(miscellaneousPerOccupiedRoom[year] || "0")) * occupiedRooms;
      const allocatedRevenue = (parseFloat(allocatedPerOccupiedRoom[year] || "0")) * occupiedRooms;
      return fbRevenue + resortFeeRevenue + otherOperatedRevenue + miscellaneousRevenue + allocatedRevenue;
    }
  };

  const calculateTotalRevenue = (year: number, isHistorical: boolean): number => {
    if (isHistorical) {
      const roomsRevenue = historicalData.roomsRevenue[year] || 0;
      const totalOtherOperatedRevenue = calculateTotalOtherOperatedRevenue(year, true);
      return roomsRevenue + totalOtherOperatedRevenue;
    } else {
      const roomsRevenue = getForecastRoomsRevenue(year);
      const totalOtherOperatedRevenue = calculateTotalOtherOperatedRevenue(year, false);
      return roomsRevenue + totalOtherOperatedRevenue;
    }
  };

  return {
    getHistoricalOccupiedRoomsForYear,
    getForecastOccupiedRoomsForYear,
    getHistoricalADRForYear,
    getForecastADRForYear,
    calculateTotalOtherOperatedRevenue,
    calculateTotalRevenue
  };
};
