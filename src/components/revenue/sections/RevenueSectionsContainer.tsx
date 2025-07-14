
import React from "react";
import RevenueSection from "./RevenueMetricsSection";
import OtherOperatedRevenueSection from "./OtherOperatedRevenueSection";
import TotalRevenueSection from "./TotalRevenueSection";
import { CalculationHelpers } from "../RevenueTableHelpers";

interface RevenueSectionsContainerProps {
  historicalYears: number[];
  forecastYears: number[];
  roomsKeys: number;
  historicalData: any;
  occupancyForecast: Record<number, string>;
  handleOccupancyChange: (year: number, value: string) => void;
  occupancyForecastMethod: string;
  setOccupancyForecastMethod: (value: string) => void;
  occupancyYoYGrowth: Record<number, string>;
  handleOccupancyYoYChange: (year: number, value: string) => void;
  calculateOccupancyFromYoY: (year: number) => number;
  getAvailableRooms: (year: number) => number;
  adrGrowthType: string;
  setAdrGrowthType: (value: string) => void;
  flatAdrGrowth: string;
  setFlatAdrGrowth: (value: string) => void;
  yearlyAdrGrowth: Record<number, string>;
  handleYearlyAdrChange: (year: number, value: string) => void;
  getForecastRevpar: (year: number) => number;
  getForecastRoomsRevenue: (year: number) => number;
  fbPerOccupiedRoom: Record<number, string>;
  handleFbPerOccupiedRoomChange: (year: number, value: string) => void;
  handleFbPerOccupiedRoomBlur: (year: number, value: string) => void;
  resortFeePerOccupiedRoom: Record<number, string>;
  handleResortFeePerOccupiedRoomChange: (year: number, value: string) => void;
  handleResortFeePerOccupiedRoomBlur: (year: number, value: string) => void;
  otherOperatedPerOccupiedRoom: Record<number, string>;
  handleOtherOperatedPerOccupiedRoomChange: (year: number, value: string) => void;
  handleOtherOperatedPerOccupiedRoomBlur: (year: number, value: string) => void;
  miscellaneousPerOccupiedRoom: Record<number, string>;
  handleMiscellaneousPerOccupiedRoomChange: (year: number, value: string) => void;
  handleMiscellaneousPerOccupiedRoomBlur: (year: number, value: string) => void;
  allocatedPerOccupiedRoom: Record<number, string>;
  handleAllocatedPerOccupiedRoomChange: (year: number, value: string) => void;
  handleAllocatedPerOccupiedRoomBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  helpers: CalculationHelpers;
}

const RevenueSectionsContainer: React.FC<RevenueSectionsContainerProps> = (props) => {
  return (
    <>
      <RevenueSection
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        roomsKeys={props.roomsKeys}
        historicalData={props.historicalData}
        occupancyForecast={props.occupancyForecast}
        handleOccupancyChange={props.handleOccupancyChange}
        occupancyForecastMethod={props.occupancyForecastMethod}
        setOccupancyForecastMethod={props.setOccupancyForecastMethod}
        occupancyYoYGrowth={props.occupancyYoYGrowth}
        handleOccupancyYoYChange={props.handleOccupancyYoYChange}
        calculateOccupancyFromYoY={props.calculateOccupancyFromYoY}
        getAvailableRooms={props.getAvailableRooms}
        adrGrowthType={props.adrGrowthType}
        setAdrGrowthType={props.setAdrGrowthType}
        flatAdrGrowth={props.flatAdrGrowth}
        setFlatAdrGrowth={props.setFlatAdrGrowth}
        yearlyAdrGrowth={props.yearlyAdrGrowth}
        handleYearlyAdrChange={props.handleYearlyAdrChange}
        getForecastRevpar={props.getForecastRevpar}
        getForecastRoomsRevenue={props.getForecastRoomsRevenue}
        formatCurrency={props.formatCurrency}
        formatPercent={props.formatPercent}
        helpers={props.helpers}
      />

      <OtherOperatedRevenueSection
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        roomsKeys={props.roomsKeys}
        historicalData={props.historicalData}
        fbPerOccupiedRoom={props.fbPerOccupiedRoom}
        handleFbPerOccupiedRoomChange={props.handleFbPerOccupiedRoomChange}
        handleFbPerOccupiedRoomBlur={props.handleFbPerOccupiedRoomBlur}
        resortFeePerOccupiedRoom={props.resortFeePerOccupiedRoom}
        handleResortFeePerOccupiedRoomChange={props.handleResortFeePerOccupiedRoomChange}
        handleResortFeePerOccupiedRoomBlur={props.handleResortFeePerOccupiedRoomBlur}
        otherOperatedPerOccupiedRoom={props.otherOperatedPerOccupiedRoom}
        handleOtherOperatedPerOccupiedRoomChange={props.handleOtherOperatedPerOccupiedRoomChange}
        handleOtherOperatedPerOccupiedRoomBlur={props.handleOtherOperatedPerOccupiedRoomBlur}
        miscellaneousPerOccupiedRoom={props.miscellaneousPerOccupiedRoom}
        handleMiscellaneousPerOccupiedRoomChange={props.handleMiscellaneousPerOccupiedRoomChange}
        handleMiscellaneousPerOccupiedRoomBlur={props.handleMiscellaneousPerOccupiedRoomBlur}
        allocatedPerOccupiedRoom={props.allocatedPerOccupiedRoom}
        handleAllocatedPerOccupiedRoomChange={props.handleAllocatedPerOccupiedRoomChange}
        handleAllocatedPerOccupiedRoomBlur={props.handleAllocatedPerOccupiedRoomBlur}
        formatCurrency={props.formatCurrency}
        helpers={props.helpers}
      />

      <TotalRevenueSection
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        formatCurrency={props.formatCurrency}
        helpers={props.helpers}
      />
    </>
  );
};

export default RevenueSectionsContainer;
