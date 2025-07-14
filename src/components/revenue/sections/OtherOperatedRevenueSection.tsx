
import React from "react";
import MetricRow from "../MetricRow";
import FoodBeverageSection from "../FoodBeverageSection";
import OtherOperatedSection from "../OtherOperatedSection";
import MiscellaneousSection from "../MiscellaneousSection";
import { CalculationHelpers } from "../RevenueTableHelpers";

interface OtherOperatedRevenueSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  roomsKeys: number;
  historicalData: any;
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
  helpers: CalculationHelpers;
}

const OtherOperatedRevenueSection: React.FC<OtherOperatedRevenueSectionProps> = ({
  historicalYears,
  forecastYears,
  roomsKeys,
  historicalData,
  fbPerOccupiedRoom,
  handleFbPerOccupiedRoomChange,
  handleFbPerOccupiedRoomBlur,
  otherOperatedPerOccupiedRoom,
  handleOtherOperatedPerOccupiedRoomChange,
  handleOtherOperatedPerOccupiedRoomBlur,
  miscellaneousPerOccupiedRoom,
  handleMiscellaneousPerOccupiedRoomChange,
  handleMiscellaneousPerOccupiedRoomBlur,
  formatCurrency,
  helpers
}) => {
  return (
    <>
      <tr id="other-operated-revenue-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      
      <MetricRow
        label={<span className="font-bold text-gray-900">Other Revenue</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
        isMajorSectionHeader={true}
      />

      <tr id="food-beverage-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      <FoodBeverageSection
        roomsKeys={roomsKeys}
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        historicalData={historicalData}
        fbPerOccupiedRoom={fbPerOccupiedRoom}
        handleFbPerOccupiedRoomChange={handleFbPerOccupiedRoomChange}
        handleFbPerOccupiedRoomBlur={handleFbPerOccupiedRoomBlur}
        getForecastOccupiedRooms={helpers.getForecastOccupiedRoomsForYear}
        formatCurrency={formatCurrency}
        isIndented={true}
      />

      <tr id="other-operated-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      <OtherOperatedSection
        roomsKeys={roomsKeys}
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        historicalData={historicalData}
        otherOperatedPerOccupiedRoom={otherOperatedPerOccupiedRoom}
        handleOtherOperatedPerOccupiedRoomChange={handleOtherOperatedPerOccupiedRoomChange}
        handleOtherOperatedPerOccupiedRoomBlur={handleOtherOperatedPerOccupiedRoomBlur}
        getForecastOccupiedRooms={helpers.getForecastOccupiedRoomsForYear}
        formatCurrency={formatCurrency}
        isIndented={true}
      />

      <tr id="miscellaneous-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>
      <MiscellaneousSection
        roomsKeys={roomsKeys}
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        historicalData={historicalData}
        miscellaneousPerOccupiedRoom={miscellaneousPerOccupiedRoom}
        handleMiscellaneousPerOccupiedRoomChange={handleMiscellaneousPerOccupiedRoomChange}
        handleMiscellaneousPerOccupiedRoomBlur={handleMiscellaneousPerOccupiedRoomBlur}
        getForecastOccupiedRooms={helpers.getForecastOccupiedRoomsForYear}
        formatCurrency={formatCurrency}
        isIndented={true}
      />

      <MetricRow
        label={<span className="font-bold italic">Total Other Revenue</span>}
        historicalData={historicalYears.map(year => 
          <span className="font-bold italic">
            {formatCurrency(helpers.calculateTotalOtherOperatedRevenue(year, true))}
          </span>
        )}
        forecastData={forecastYears.map(year => 
          <span className="font-bold italic">
            {formatCurrency(helpers.calculateTotalOtherOperatedRevenue(year, false))}
          </span>
        )}
      />
    </>
  );
};

export default OtherOperatedRevenueSection;
