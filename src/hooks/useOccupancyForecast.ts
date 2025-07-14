import { useState, useEffect } from "react";
import { 
  OccupancyData,
  HistoricalData,
  MarketData,
  CompSetData
} from "../components/occupancy-forecast/types";
import {
  calculateHistoricalGrowthRates,
  calculateAvgHistoricalOccupancy,
  calculateAvgHistoricalGrowthRate,
  calculateAvgHistoricalOccupiedRooms,
  calculateAvgMarketOccupancy,
  calculateAvgMarketGrowthRate,
  calculateAvgCompSetOccupancy,
  calculateAvgCompSetGrowthRate,
  applyGrowthRates
} from "./occupancy-forecast/occupancyForecastUtils";
import { useDatabase } from "./useDatabase";
import { Property } from "../types/PropertyTypes";
import { toast } from "../components/ui/use-toast";

export const useOccupancyForecast = (property?: Property | null) => {
  const { saveOccupancyData, loading } = useDatabase();
  
  // Sample historical data - in a real app, this might come from an API or context
  const historicalData: HistoricalData[] = [
    { year: 2022, occupancy: 0.617, rooms: property?.rooms || 108 },
    { year: 2023, occupancy: 0.655, rooms: property?.rooms || 108 },
    { year: 2024, occupancy: 0.703, rooms: property?.rooms || 108 },
  ];
  
  // Sample market data
  const marketData: MarketData[] = [
    { year: 2022, occupancy: 0.700, growthRate: 0 },
    { year: 2023, occupancy: 0.714, growthRate: 2.0 },
    { year: 2024, occupancy: 0.723, growthRate: 1.3 },
  ];
  
  // Updated comp set data with new occupancy percentages
  const compSetData: CompSetData[] = [
    { year: 2022, occupancy: 0.707, growthRate: 0 },
    { year: 2023, occupancy: 0.732, growthRate: 3.5 }, // YoY: (73.2% - 70.7%) / 70.7% = 3.5%
    { year: 2024, occupancy: 0.740, growthRate: 1.1 }, // YoY: (74.0% - 73.2%) / 73.2% = 1.1%
  ];
  
  // Calculate historical growth rates
  const historicalGrowthRates = calculateHistoricalGrowthRates(historicalData);
  
  // Calculate statistics
  const avgHistoricalOccupancy = calculateAvgHistoricalOccupancy(historicalData);
  const avgHistoricalGrowthRate = calculateAvgHistoricalGrowthRate(historicalGrowthRates);
  const avgHistoricalOccupiedRooms = calculateAvgHistoricalOccupiedRooms(historicalData);
  
  // Calculate market statistics
  const avgMarketOccupancy = calculateAvgMarketOccupancy(marketData);
  const avgMarketGrowthRate = calculateAvgMarketGrowthRate(marketData);
  
  // Calculate comp set statistics
  const avgCompSetOccupancy = calculateAvgCompSetOccupancy(compSetData);
  const avgCompSetGrowthRate = calculateAvgCompSetGrowthRate(compSetData);
  
  // Forecast years
  const forecastYears = [2025, 2026, 2027, 2028, 2029];
  
  // State for forecast method and values
  const [forecastMethod, setForecastMethod] = useState('direct');
  const [occupancyValues, setOccupancyValues] = useState<OccupancyData[]>(
    forecastYears.map(year => ({ 
      year, 
      occupancy: 0.75, // Default 75%
      growthRate: 2.0  // Default 2%
    }))
  );
  
  // Calculate last historical occupancy
  const lastHistoricalOccupancy = historicalData[historicalData.length - 1].occupancy;
  
  // Update growth rate for a specific year
  function handleGrowthRateChange(index: number, value: string) {
    const newValues = [...occupancyValues];
    newValues[index].growthRate = parseFloat(value);
    
    // When in growth rate mode, immediately update the occupancy based on growth rate
    if (forecastMethod === 'growth') {
      if (index === 0) {
        newValues[index].occupancy = lastHistoricalOccupancy * (1 + newValues[index].growthRate / 100);
      } else {
        newValues[index].occupancy = newValues[index - 1].occupancy * (1 + newValues[index].growthRate / 100);
      }
      
      // Update subsequent years if any
      for (let i = index + 1; i < newValues.length; i++) {
        newValues[i].occupancy = newValues[i - 1].occupancy * (1 + newValues[i].growthRate / 100);
      }
    }
    
    setOccupancyValues(newValues);
  }
  
  // Update occupancy value for a specific year
  function handleOccupancyChange(index: number, value: string) {
    const newValues = [...occupancyValues];
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) return;
    
    newValues[index].occupancy = numValue / 100; // Convert from percentage to decimal
    
    // Calculate implied growth rates
    if (index === 0) {
      // For first forecast year, compare to last historical year
      newValues[index].growthRate = ((newValues[index].occupancy - lastHistoricalOccupancy) / lastHistoricalOccupancy) * 100;
    } else {
      // For other years, compare to previous forecast year
      newValues[index].growthRate = ((newValues[index].occupancy - newValues[index - 1].occupancy) / newValues[index - 1].occupancy) * 100;
    }
    
    setOccupancyValues(newValues);
  }
  
  // When forecast method changes, update calculations if needed
  useEffect(() => {
    if (forecastMethod === 'growth') {
      const updatedValues = applyGrowthRates(occupancyValues, lastHistoricalOccupancy);
      setOccupancyValues(updatedValues);
    }
  }, [forecastMethod, lastHistoricalOccupancy]);

  // Handle saving the data
  const handleSave = async () => {
    console.log("Saving occupancy forecast data:", occupancyValues);
    
    // Check if we have a property ID
    if (!property || !property.id) {
      toast({
        title: "Error",
        description: "No property selected for saving forecast data",
        variant: "destructive"
      });
      return false;
    }
    
    // Save to database
    const dataToSave = {
      historicalData,
      marketData,
      compSetData,
      occupancyForecast: occupancyValues,
      forecastMethod,
      lastUpdated: new Date().toISOString()
    };
    
    const success = await saveOccupancyData(property.id, dataToSave);
    
    if (success) {
      toast({
        title: "Data saved",
        description: "Subject occupancy forecast data has been saved"
      });
    }
    
    return success;
  };

  return {
    historicalData,
    historicalGrowthRates,
    avgHistoricalOccupancy,
    avgHistoricalGrowthRate,
    avgHistoricalOccupiedRooms,
    marketData,
    avgMarketOccupancy,
    avgMarketGrowthRate,
    compSetData,
    avgCompSetOccupancy,
    avgCompSetGrowthRate,
    forecastMethod,
    setForecastMethod,
    occupancyValues,
    handleOccupancyChange,
    handleGrowthRateChange,
    handleSave,
    loading
  };
};
