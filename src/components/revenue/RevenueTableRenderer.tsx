
import React from "react";
import RevenueTableContainer from "./RevenueTableContainer";
import { createCalculationHelpers } from "./RevenueTableHelpers";
import { RevenueTableRendererProps } from "./RevenueTableTypes";

const RevenueTableRenderer: React.FC<RevenueTableRendererProps> = (props) => {
  const {
    historicalYears,
    forecastYears,
    getAvailableRooms,
    historicalData,
    occupancyForecast,
    occupancyForecastMethod,
    calculateOccupancyFromYoY,
    getForecastRoomsRevenue,
    fbPerOccupiedRoom,
    resortFeePerOccupiedRoom,
    otherOperatedPerOccupiedRoom,
    miscellaneousPerOccupiedRoom,
    allocatedPerOccupiedRoom,
    ...restProps
  } = props;

  // Ensure we have valid arrays to prevent indexOf errors
  const safeHistoricalYears = Array.isArray(historicalYears) ? historicalYears : [];
  const safeForecastYears = Array.isArray(forecastYears) ? forecastYears : [];

  // Create calculation helpers
  const helpers = createCalculationHelpers(
    getAvailableRooms,
    historicalData,
    occupancyForecast,
    occupancyForecastMethod,
    calculateOccupancyFromYoY,
    getForecastRoomsRevenue,
    fbPerOccupiedRoom,
    resortFeePerOccupiedRoom,
    otherOperatedPerOccupiedRoom,
    miscellaneousPerOccupiedRoom,
    allocatedPerOccupiedRoom
  );

  try {
    return (
      <RevenueTableContainer
        {...restProps}
        historicalYears={safeHistoricalYears}
        forecastYears={safeForecastYears}
        historicalData={historicalData}
        occupancyForecast={occupancyForecast}
        occupancyForecastMethod={occupancyForecastMethod}
        calculateOccupancyFromYoY={calculateOccupancyFromYoY}
        getAvailableRooms={getAvailableRooms}
        getForecastRoomsRevenue={getForecastRoomsRevenue}
        fbPerOccupiedRoom={fbPerOccupiedRoom}
        resortFeePerOccupiedRoom={resortFeePerOccupiedRoom}
        otherOperatedPerOccupiedRoom={otherOperatedPerOccupiedRoom}
        miscellaneousPerOccupiedRoom={miscellaneousPerOccupiedRoom}
        allocatedPerOccupiedRoom={allocatedPerOccupiedRoom}
        helpers={helpers}
        managementFeesExpenseInput={props.managementFeesExpenseInput}
        handleManagementFeesExpenseChange={props.handleManagementFeesExpenseChange}
        handleManagementFeesExpenseBlur={props.handleManagementFeesExpenseBlur}
        realEstateTaxesExpenseInput={props.realEstateTaxesExpenseInput}
        handleRealEstateTaxesExpenseChange={props.handleRealEstateTaxesExpenseChange}
        handleRealEstateTaxesExpenseBlur={props.handleRealEstateTaxesExpenseBlur}
        insuranceExpenseInput={props.insuranceExpenseInput}
        handleInsuranceExpenseChange={props.handleInsuranceExpenseChange}
        handleInsuranceExpenseBlur={props.handleInsuranceExpenseBlur}
        otherNonOpExpenseInput={props.otherNonOpExpenseInput}
        handleOtherNonOpExpenseChange={props.handleOtherNonOpExpenseChange}
        handleOtherNonOpExpenseBlur={props.handleOtherNonOpExpenseBlur}
        reserveForReplacementInput={props.reserveForReplacementInput}
        handleReserveForReplacementChange={props.handleReserveForReplacementChange}
        handleReserveForReplacementBlur={props.handleReserveForReplacementBlur}
      />
    );
  } catch (error) {
    console.error('Error rendering RevenueTable:', error);
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-2">
        <div className="text-red-600">
          Error loading revenue table. Please check the console for details.
        </div>
      </div>
    );
  }
};

export default RevenueTableRenderer;
