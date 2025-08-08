
import React from "react";
import RevenueTableValidator from "./RevenueTableValidator";
import RevenueTableRenderer from "./RevenueTableRenderer";
import { RevenueTableProps } from "./RevenueTableTypes";
import { createCalculationHelpers } from "./RevenueTableHelpers";

const RevenueTable: React.FC<RevenueTableProps> = ({
  roomsKeys = 108,
  historicalYears = [],
  forecastYears = [],
  ...props
}) => {

  // Create calculation helpers
  const helpers = createCalculationHelpers(
    props.getAvailableRooms,
    props.historicalData,
    props.occupancyForecast,
    props.occupancyForecastMethod,
    props.calculateOccupancyFromYoY,
    props.getForecastRoomsRevenue,
    props.fbPerOccupiedRoom,
    props.resortFeePerOccupiedRoom,
    props.otherOperatedPerOccupiedRoom,
    props.miscellaneousPerOccupiedRoom,
    props.allocatedPerOccupiedRoom
  );

  return (
    <RevenueTableValidator
      roomsKeys={roomsKeys}
      historicalYears={historicalYears}
      forecastYears={forecastYears}
      {...props}
    >
      <RevenueTableRenderer
        roomsKeys={roomsKeys}
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        helpers={helpers}
        {...props}
      />
    </RevenueTableValidator>
  );
};

export default RevenueTable;
