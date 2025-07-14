
import React from "react";
import OccupancySection from "../OccupancySection";
import ADRSection from "../ADRSection";
import RevPARSection from "../RevPARSection";
import RoomsRevenueSection from "../RoomsRevenueSection";
import SectionHeader from "../SectionHeader";
import { CalculationHelpers } from "../RevenueTableHelpers";

interface RevenueMetricsSectionProps {
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
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  helpers: CalculationHelpers;
}

const RevenueMetricsSection: React.FC<RevenueMetricsSectionProps> = ({
  historicalYears,
  forecastYears,
  roomsKeys,
  historicalData,
  occupancyForecast,
  handleOccupancyChange,
  occupancyForecastMethod,
  setOccupancyForecastMethod,
  occupancyYoYGrowth,
  handleOccupancyYoYChange,
  calculateOccupancyFromYoY,
  getAvailableRooms,
  adrGrowthType,
  setAdrGrowthType,
  flatAdrGrowth,
  setFlatAdrGrowth,
  yearlyAdrGrowth,
  handleYearlyAdrChange,
  getForecastRevpar,
  getForecastRoomsRevenue,
  formatCurrency,
  formatPercent,
  helpers
}) => {
  return (
    <>
      {/* Section anchor for Occupancy */}
      <tr id="occupancy-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <OccupancySection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        roomsKeys={roomsKeys}
        historicalData={historicalData}
        occupancyForecast={occupancyForecast}
        handleOccupancyChange={handleOccupancyChange}
        handleOccupancyBlur={(year, value) => {
          console.log('Occupancy blur event passed through:', year, value);
        }}
        occupancyForecastMethod={occupancyForecastMethod}
        setOccupancyForecastMethod={setOccupancyForecastMethod}
        occupancyYoYGrowth={occupancyYoYGrowth}
        handleOccupancyYoYChange={handleOccupancyYoYChange}
        handleOccupancyYoYBlur={(year, value) => {
          console.log('Occupancy YoY blur event passed through:', year, value);
        }}
        calculateOccupancyFromYoY={calculateOccupancyFromYoY}
        getAvailableRooms={getAvailableRooms}
        getHistoricalOccupiedRooms={helpers.getHistoricalOccupiedRoomsForYear}
        getForecastOccupiedRooms={helpers.getForecastOccupiedRoomsForYear}
        formatPercent={formatPercent}
      />

      <tr id="adr-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <ADRSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        getHistoricalADR={helpers.getHistoricalADRForYear}
        getForecastADR={helpers.getForecastADRForYear}
        adrGrowthType={adrGrowthType}
        setAdrGrowthType={setAdrGrowthType}
        flatAdrGrowth={flatAdrGrowth}
        setFlatAdrGrowth={setFlatAdrGrowth}
        handleFlatAdrBlur={(value) => {
          console.log('Flat ADR blur event:', value);
        }}
        yearlyAdrGrowth={yearlyAdrGrowth}
        handleYearlyAdrChange={handleYearlyAdrChange}
        handleYearlyAdrBlur={(year, value) => {
          console.log('Yearly ADR blur event:', year, value);
        }}
      />

      <tr id="revpar-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <RevPARSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        historicalData={historicalData}
        getForecastRevpar={getForecastRevpar}
      />

      <SectionHeader title="REVENUE" />

      <tr id="rooms-revenue-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <RoomsRevenueSection
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        historicalData={historicalData}
        getForecastRoomsRevenue={getForecastRoomsRevenue}
        formatCurrency={formatCurrency}
      />
    </>
  );
};

export default RevenueMetricsSection;
