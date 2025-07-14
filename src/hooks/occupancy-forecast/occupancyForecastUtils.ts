
import { 
  OccupancyData,
  HistoricalData,
  MarketData,
  CompSetData
} from "../../components/occupancy-forecast/types";

// Calculate average historical occupancy
export function calculateAvgHistoricalOccupancy(historicalData: HistoricalData[]): number {
  return historicalData.reduce(
    (sum, data) => sum + data.occupancy, 0
  ) / historicalData.length;
}

// Calculate average historical growth rate
export function calculateAvgHistoricalGrowthRate(growthRates: { year: number; growthRate: number }[]): number {
  return growthRates.reduce(
    (sum, curr) => sum + curr.growthRate, 0
  ) / growthRates.length;
}

// Calculate average historical occupied rooms
export function calculateAvgHistoricalOccupiedRooms(historicalData: HistoricalData[]): number {
  return Math.round(
    historicalData.reduce(
      (sum, data) => sum + calculateOccupiedRooms(data.occupancy, data.rooms), 0
    ) / historicalData.length
  );
}

// Calculate occupied rooms
export function calculateOccupiedRooms(occupancy: number, totalRooms = 108) {
  const annualAvailableRooms = totalRooms * 365;
  return Math.round(annualAvailableRooms * occupancy);
}

// Calculate historical growth rates
export function calculateHistoricalGrowthRates(historicalData: HistoricalData[]) {
  return historicalData.slice(1).map((data, index) => {
    const prevOccupancy = historicalData[index].occupancy;
    const currentOccupancy = data.occupancy;
    return {
      year: data.year,
      growthRate: ((currentOccupancy - prevOccupancy) / prevOccupancy) * 100
    };
  });
}

// Calculate average market occupancy
export function calculateAvgMarketOccupancy(marketData: MarketData[]): number {
  return marketData.reduce((sum, item) => sum + item.occupancy, 0) / marketData.length;
}

// Calculate average market growth rate
export function calculateAvgMarketGrowthRate(marketData: MarketData[]): number {
  return marketData.slice(1).reduce((sum, item) => sum + item.growthRate, 0) / (marketData.length - 1);
}

// Calculate average comp set occupancy
export function calculateAvgCompSetOccupancy(compSetData: CompSetData[]): number {
  return compSetData.reduce((sum, item) => sum + item.occupancy, 0) / compSetData.length;
}

// Calculate average comp set growth rate
export function calculateAvgCompSetGrowthRate(compSetData: CompSetData[]): number {
  return compSetData.slice(1).reduce((sum, item) => sum + item.growthRate, 0) / (compSetData.length - 1);
}

// Update occupancy values based on growth rates
export function applyGrowthRates(
  occupancyValues: OccupancyData[],
  lastHistoricalOccupancy: number
): OccupancyData[] {
  const newValues = [...occupancyValues];
  
  newValues.forEach((item, index) => {
    const growthFactor = 1 + (item.growthRate / 100);
    if (index === 0) {
      item.occupancy = lastHistoricalOccupancy * growthFactor;
    } else {
      item.occupancy = newValues[index - 1].occupancy * growthFactor;
    }
  });
  
  return newValues;
}
