
import React from "react";
import RevenueLayout from "../components/revenue/RevenueLayout";
import { useRevenueCalculations } from "../hooks/useRevenueCalculations";
import { useRevenueData } from "../hooks/useRevenueData";
import { useRevenueScrollManager } from "../components/revenue/RevenueScrollManager";
import { createRevenueHelpers } from "../components/revenue/RevenueHelpers";

const Revenue = () => {
  const revenueCalculations = useRevenueCalculations();
  const { historicalData, forecastYears, historicalYears, roomsKeys } = useRevenueData();
  const { activeSection, handleItemClick } = useRevenueScrollManager();

  // Create helper functions
  const helpers = createRevenueHelpers(revenueCalculations, historicalData);

  return (
    <RevenueLayout
      activeSection={activeSection}
      handleItemClick={handleItemClick}
      roomsKeys={roomsKeys}
      historicalYears={historicalYears}
      forecastYears={forecastYears}
      historicalData={historicalData}
      revenueCalculations={revenueCalculations}
      helpers={helpers}
    />
  );
};

export default Revenue;
