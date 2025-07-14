
import { useState, useEffect } from 'react';
import { useInputHandlers } from './useInputHandlers';
import { useRevenueOccupancyData } from './useRevenueOccupancyData';
import { REVENUE_CONFIG } from '../config/revenueConfig';

const getInitialForecastData = (defaultValue: string = "0") => 
  REVENUE_CONFIG.FORECAST_YEARS.reduce((acc, year) => ({ ...acc, [year]: defaultValue }), {});

export const useRevenueInputHandlers = () => {
  const { data: occupancyData, updateSubjectOccupancy, updateSubjectOccupancyYoY } = useRevenueOccupancyData();
  const [adrGrowthType, setAdrGrowthType] = useState<string>("flat");
  const [occupancyForecastMethod, setOccupancyForecastMethod] = useState<string>("Occupancy");

  const flatAdr = useInputHandlers({ [0]: REVENUE_CONFIG.DEFAULT_GROWTH_RATES.ADR });
  const yearlyAdr = useInputHandlers(getInitialForecastData(REVENUE_CONFIG.DEFAULT_GROWTH_RATES.ADR));
  
  // Initialize occupancy from shared data
  const initialOccupancyForecast = REVENUE_CONFIG.FORECAST_YEARS.reduce((acc, year) => ({
    ...acc,
    [year]: (occupancyData.subjectOccupancy[year] || 0).toString()
  }), {});
  
  const initialOccupancyYoY = REVENUE_CONFIG.FORECAST_YEARS.reduce((acc, year) => ({
    ...acc,
    [year]: (occupancyData.subjectOccupancyYoY[year] || 0).toString()
  }), {});

  const occupancyForecast = useInputHandlers(initialOccupancyForecast);
  const occupancyYoY = useInputHandlers(initialOccupancyYoY);
  
  const fbPerRoom = useInputHandlers(getInitialForecastData());
  const resortFeePerRoom = useInputHandlers(getInitialForecastData());
  const otherOperatedPerRoom = useInputHandlers(getInitialForecastData());
  const miscellaneousPerRoom = useInputHandlers(getInitialForecastData());
  const allocatedPerRoom = useInputHandlers(getInitialForecastData());

  // Custom handlers that update the local input state without parsing
  const handleOccupancyChange = (year: number, value: string) => {
    occupancyForecast.handleChange(year, value);
  };

  const handleOccupancyBlur = (year: number, value: string) => {
    // Format the value properly and update both local and shared state
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const numValue = parseFloat(cleanValue);
    const formattedValue = isNaN(numValue) ? "0.0" : numValue.toFixed(1);
    
    occupancyForecast.handleChange(year, formattedValue);
    updateSubjectOccupancy({ [year]: parseFloat(formattedValue) || 0 });
  };

  const handleOccupancyYoYChange = (year: number, value: string) => {
    occupancyYoY.handleChange(year, value);
  };

  const handleOccupancyYoYBlur = (year: number, value: string) => {
    // Format the value properly and update both local and shared state
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const numValue = parseFloat(cleanValue);
    const formattedValue = isNaN(numValue) ? "0.0" : numValue.toFixed(1);
    
    occupancyYoY.handleChange(year, formattedValue);
    updateSubjectOccupancyYoY({ [year]: parseFloat(formattedValue) || 0 });
  };

  // Update local state when shared data changes
  useEffect(() => {
    REVENUE_CONFIG.FORECAST_YEARS.forEach(year => {
      const occupancyValue = (occupancyData.subjectOccupancy[year] || 0).toString();
      const yoyValue = (occupancyData.subjectOccupancyYoY[year] || 0).toString();
      
      if (occupancyForecast.values[year] !== occupancyValue) {
        occupancyForecast.handleChange(year, occupancyValue);
      }
      if (occupancyYoY.values[year] !== yoyValue) {
        occupancyYoY.handleChange(year, yoyValue);
      }
    });
  }, [occupancyData.subjectOccupancy, occupancyData.subjectOccupancyYoY]);

  return {
    adrGrowthType,
    setAdrGrowthType,
    flatAdrGrowth: flatAdr.values[0] || "0.0",
    setFlatAdrGrowth: (value: string) => flatAdr.handleChange(0, value),
    yearlyAdrGrowth: yearlyAdr.values,
    handleYearlyAdrChange: yearlyAdr.handleChange,
    occupancyForecast: occupancyForecast.values,
    handleOccupancyChange,
    occupancyForecastMethod,
    setOccupancyForecastMethod,
    occupancyYoYGrowth: occupancyYoY.values,
    handleOccupancyYoYChange,
    handleOccupancyYoYBlur,
    fbPerOccupiedRoom: fbPerRoom.values,
    handleFbPerOccupiedRoomChange: fbPerRoom.handleChange,
    handleFbPerOccupiedRoomBlur: fbPerRoom.handleIntegerBlur,
    resortFeePerOccupiedRoom: resortFeePerRoom.values,
    handleResortFeePerOccupiedRoomChange: resortFeePerRoom.handleChange,
    handleResortFeePerOccupiedRoomBlur: resortFeePerRoom.handleIntegerBlur,
    otherOperatedPerOccupiedRoom: otherOperatedPerRoom.values,
    handleOtherOperatedPerOccupiedRoomChange: otherOperatedPerRoom.handleChange,
    handleOtherOperatedPerOccupiedRoomBlur: otherOperatedPerRoom.handleIntegerBlur,
    miscellaneousPerOccupiedRoom: miscellaneousPerRoom.values,
    handleMiscellaneousPerOccupiedRoomChange: miscellaneousPerRoom.handleChange,
    handleMiscellaneousPerOccupiedRoomBlur: miscellaneousPerRoom.handleIntegerBlur,
    allocatedPerOccupiedRoom: allocatedPerRoom.values,
    handleAllocatedPerOccupiedRoomChange: allocatedPerRoom.handleChange,
    handleAllocatedPerOccupiedRoomBlur: allocatedPerRoom.handleIntegerBlur,
  };
};
