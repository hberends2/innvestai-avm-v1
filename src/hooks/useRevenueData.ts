
import { useMemo } from 'react';
import { REVENUE_CONFIG } from '../config/revenueConfig';
import { HistoricalRevenueData } from '../types/revenue';
import { getAvailableRooms, calculateRevpar, calculateOccupiedRooms } from '../utils/calculationUtils';
import { useRevenueOccupancyData } from './useRevenueOccupancyData';

export const useRevenueData = () => {
  const { data: occupancyData } = useRevenueOccupancyData();

  const historicalData: HistoricalRevenueData = useMemo(() => {
    // Base $ per occupied room data for departments
    const departmentPerRoom = {
      fb: { 2021: 52, 2022: 56, 2023: 58, 2024: 59 },
      otherOperated: { 2021: 26, 2022: 28, 2023: 29, 2024: 30 },
      miscellaneous: { 2021: 4, 2022: 5, 2023: 5, 2024: 5 },
      allocated: { 2021: 9, 2022: 9, 2023: 10, 2024: 10 }
    };

    const data: HistoricalRevenueData = {
      roomsRevenue: { 2021: 8765432, 2022: 9234567, 2023: 9876543, 2024: 10234567 },
      fbRevenue: {},
      resortFeeRevenue: {},
      otherOperatedRevenue: {},
      miscellaneousRevenue: {},
      allocatedRevenue: {},
      revpar: {},
      revparYoY: {},
      occupancy: occupancyData.subjectOccupancy // Use shared occupancy data
    };

    // Calculate department revenues based on $ per occupied room * occupied rooms
    REVENUE_CONFIG.HISTORICAL_YEARS.forEach(year => {
      const occupiedRooms = calculateOccupiedRooms(year, data.occupancy[year]);
      
      data.fbRevenue[year] = departmentPerRoom.fb[year] * occupiedRooms;
      data.otherOperatedRevenue[year] = departmentPerRoom.otherOperated[year] * occupiedRooms;
      data.miscellaneousRevenue[year] = departmentPerRoom.miscellaneous[year] * occupiedRooms;
      data.allocatedRevenue[year] = departmentPerRoom.allocated[year] * occupiedRooms;
      
      // Set resort fee revenue to 0 since it's been removed
      data.resortFeeRevenue[year] = 0;
    });

    // Calculate RevPAR
    REVENUE_CONFIG.HISTORICAL_YEARS.forEach(year => {
      const roomsRevenue = data.roomsRevenue[year];
      const availableRooms = getAvailableRooms(year);
      data.revpar[year] = calculateRevpar(roomsRevenue, availableRooms);
    });

    // Calculate RevPAR YoY
    REVENUE_CONFIG.HISTORICAL_YEARS.forEach((year, index) => {
      if (index === 0) {
        data.revparYoY[year] = 0;
      } else {
        const currentRevpar = data.revpar[year];
        const previousYear = REVENUE_CONFIG.HISTORICAL_YEARS[index - 1];
        const previousRevpar = data.revpar[previousYear];
        data.revparYoY[year] = ((currentRevpar - previousRevpar) / previousRevpar) * 100;
      }
    });

    return data;
  }, [occupancyData.subjectOccupancy]);

  return {
    historicalData,
    forecastYears: [...REVENUE_CONFIG.FORECAST_YEARS],
    historicalYears: [...REVENUE_CONFIG.HISTORICAL_YEARS],
    roomsKeys: REVENUE_CONFIG.ROOMS_KEYS
  };
};
