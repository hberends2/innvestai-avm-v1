
import React from "react";
import HorizontalMarketTable from "./HorizontalMarketTable";
import HorizontalCompSetTable from "./HorizontalCompSetTable";
import HorizontalSubjectTable from "./HorizontalSubjectTable";
import OccupancyReportChart from "./OccupancyReportChart";
import { useRevenueOccupancyData } from "../../hooks/useRevenueOccupancyData";

const OccupancyReportContent: React.FC = () => {
  const { data } = useRevenueOccupancyData();

  // Transform revenue data to market data format
  const marketData = data.historicalYears.map(year => ({
    year,
    occupancy: (data.marketOccupancy[year] || 0) / 100,
    growthRate: data.marketOccupancyYoY[year] || 0
  }));

  // Calculate average market data
  const avgMarketOccupancy = marketData.reduce((sum, item) => sum + item.occupancy, 0) / marketData.length;
  const avgMarketGrowthRate = marketData.slice(1).reduce((sum, item) => sum + item.growthRate, 0) / (marketData.length - 1);

  // Transform revenue data to comp set data format
  const compSetData = data.historicalYears.map(year => ({
    year,
    occupancy: (data.compSetOccupancy[year] || 0) / 100,
    growthRate: data.compSetOccupancyYoY[year] || 0
  }));

  // Calculate average comp set data
  const avgCompSetOccupancy = compSetData.reduce((sum, item) => sum + item.occupancy, 0) / compSetData.length;
  const avgCompSetGrowthRate = compSetData.slice(1).reduce((sum, item) => sum + item.growthRate, 0) / (compSetData.length - 1);

  // Transform revenue data to historical data format
  const historicalData = data.historicalYears.map(year => ({
    year,
    occupancy: (data.subjectOccupancy[year] || 0) / 100,
    rooms: 108 // Default room count
  }));

  // Transform forecast data
  const forecastData = data.forecastYears.map(year => ({
    year,
    occupancy: (data.subjectOccupancy[year] || 0) / 100
  }));

  return (
    <>
      {/* Top Section: Market Occupancy, Comp Set Occupancy, and Chart */}
      <div className="mb-6 flex gap-6">
        <div className="flex flex-col gap-6">
          {/* Market Section */}
          <HorizontalMarketTable
            marketData={marketData}
            avgMarketOccupancy={avgMarketOccupancy}
            avgMarketGrowthRate={avgMarketGrowthRate}
            title="Market Occupancy"
          />

          {/* Comp Set Section */}
          <HorizontalCompSetTable
            compSetData={compSetData}
            avgCompSetOccupancy={avgCompSetOccupancy}
            avgCompSetGrowthRate={avgCompSetGrowthRate}
            title="Comp Set Occupancy"
          />
        </div>

        {/* Chart Section */}
        <div className="flex-1">
          <OccupancyReportChart
            historicalData={historicalData}
            marketData={marketData}
            compSetData={compSetData}
            forecastData={forecastData}
          />
        </div>
      </div>

      {/* Subject Property Occupancy Section */}
      <div className="mb-6">
        <HorizontalSubjectTable
          historicalData={historicalData}
          forecastData={forecastData}
          historicalYears={data.historicalYears}
          forecastYears={data.forecastYears}
        />
      </div>
    </>
  );
};

export default OccupancyReportContent;
