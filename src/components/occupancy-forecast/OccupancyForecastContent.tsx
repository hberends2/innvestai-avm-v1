
import React from "react";
import HorizontalMarketTable from "./HorizontalMarketTable";
import HorizontalCompSetTable from "./HorizontalCompSetTable";
import HorizontalForecastTable from "./HorizontalForecastTable";
import OccupancyChart from "./OccupancyChart";
import { Property } from "../../types/PropertyTypes";
import { useOccupancyForecast } from "../../hooks/useOccupancyForecast";

interface OccupancyForecastContentProps {
  property?: Property | null;
}

const OccupancyForecastContent: React.FC<OccupancyForecastContentProps> = ({
  property
}) => {
  const {
    historicalData,
    historicalGrowthRates,
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
    loading
  } = useOccupancyForecast(property);

  return (
    <>
      {/* Top Section: Market Analysis, Comp Set Analysis, and Chart */}
      <div className="mb-6 flex gap-6">
        <div className="flex flex-col gap-6">
          {/* Market Section */}
          <HorizontalMarketTable
            marketData={marketData}
            avgMarketOccupancy={avgMarketOccupancy}
            avgMarketGrowthRate={avgMarketGrowthRate}
          />

          {/* Comp Set Section */}
          <HorizontalCompSetTable
            compSetData={compSetData}
            avgCompSetOccupancy={avgCompSetOccupancy}
            avgCompSetGrowthRate={avgCompSetGrowthRate}
          />
        </div>

        {/* Chart Section */}
        <div className="flex-1">
          <OccupancyChart
            historicalData={historicalData}
            marketData={marketData}
            compSetData={compSetData}
            forecastData={occupancyValues}
          />
        </div>
      </div>

      {/* Forecast Occupancy Section */}
      <div className="mb-6">
        <HorizontalForecastTable
          forecastMethod={forecastMethod}
          setForecastMethod={setForecastMethod}
          occupancyValues={occupancyValues}
          historicalData={historicalData}
          historicalGrowthRates={historicalGrowthRates}
          handleOccupancyChange={handleOccupancyChange}
          handleGrowthRateChange={handleGrowthRateChange}
        />
      </div>
      
      {loading && (
        <div className="text-center py-2">
          <p className="text-blue-500">Saving data...</p>
        </div>
      )}
    </>
  );
};

export default OccupancyForecastContent;
