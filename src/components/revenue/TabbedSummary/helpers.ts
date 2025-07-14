import { TabbedSummaryProps } from './types';

export const createHelpers = (props: TabbedSummaryProps) => {
  const {
    historicalYears,
    historicalData,
    occupancyForecast,
    occupancyForecastMethod,
    calculateOccupancyFromYoY,
    getAvailableRooms
  } = props;

  const getHistoricalOccupiedRooms = (year: number) => {
    const availableRooms = getAvailableRooms(year);
    const occupancyDecimal = (historicalData.occupancy[year] || 0) / 100;
    return Math.round(availableRooms * occupancyDecimal);
  };

  const getForecastOccupiedRooms = (year: number) => {
    const availableRooms = getAvailableRooms(year);
    const occupancyValue = occupancyForecastMethod === "Occupancy" 
      ? occupancyForecast[year] || "0"
      : calculateOccupancyFromYoY(year).toString();
    const occupancyDecimal = parseFloat(occupancyValue) / 100;
    return Math.round(availableRooms * occupancyDecimal);
  };

  const getHistoricalRevpar = (year: number) => {
    const roomsRevenue = historicalData.roomsRevenue[year] || 0;
    const availableRooms = getAvailableRooms(year);
    return roomsRevenue / availableRooms;
  };

  const calculateForecastRevenue = (year: number, perRoomData: Record<number, string>) => {
    const perRoom = parseFloat(perRoomData[year] || "0");
    const occupiedRooms = getForecastOccupiedRooms(year);
    return perRoom * occupiedRooms;
  };

  const calculateTotalOtherOperatedRevenue = (year: number) => {
    if (historicalYears.includes(year)) {
      return (historicalData.fbRevenue[year] || 0) +
             (historicalData.resortFeeRevenue[year] || 0) +
             (historicalData.otherOperatedRevenue[year] || 0) +
             (historicalData.miscellaneousRevenue[year] || 0) +
             (historicalData.allocatedRevenue[year] || 0);
    } else {
      return calculateForecastRevenue(year, props.fbPerOccupiedRoom) +
             calculateForecastRevenue(year, props.resortFeePerOccupiedRoom) +
             calculateForecastRevenue(year, props.otherOperatedPerOccupiedRoom) +
             calculateForecastRevenue(year, props.miscellaneousPerOccupiedRoom) +
             calculateForecastRevenue(year, props.allocatedPerOccupiedRoom);
    }
  };

  const calculateTotalRevenue = (year: number) => {
    const totalOtherOperated = calculateTotalOtherOperatedRevenue(year);
    if (historicalYears.includes(year)) {
      const roomsRevenue = historicalData.roomsRevenue[year] || 0;
      return roomsRevenue + totalOtherOperated;
    } else {
      const roomsRevenue = props.getForecastRoomsRevenue(year);
      return roomsRevenue + totalOtherOperated;
    }
  };

  return {
    getHistoricalOccupiedRooms,
    getForecastOccupiedRooms,
    getHistoricalRevpar,
    calculateForecastRevenue,
    calculateTotalOtherOperatedRevenue,
    calculateTotalRevenue
  };
};
