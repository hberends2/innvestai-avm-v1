
import React from "react";
import { TableBody } from "../ui/table";
import SectionHeader from "./SectionHeader";
import RevenueMetricsSection from "./sections/RevenueMetricsSection";
import OtherOperatedRevenueSection from "./sections/OtherOperatedRevenueSection";
import TotalRevenueSection from "./sections/TotalRevenueSection";
import ExpenseSectionContainer from "./sections/ExpenseSectionContainer";
import ExpenseHeader from "./ExpenseHeader";
import CapitalExpenseSection from "./CapitalExpenseSection";
import { CalculationHelpers } from "./RevenueTableHelpers";

interface RevenueTableBodyProps {
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
  expenseForecastMethod: string;
  setExpenseForecastMethod: (value: string) => void;
  roomsExpenseInput: Record<number, string>;
  handleRoomsExpenseChange: (year: number, value: string) => void;
  handleRoomsExpenseBlur: (year: number, value: string) => void;
  fbExpenseInput: Record<number, string>;
  handleFbExpenseChange: (year: number, value: string) => void;
  handleFbExpenseBlur: (year: number, value: string) => void;
  otherOperatedExpenseInput: Record<number, string>;
  handleOtherOperatedExpenseChange: (year: number, value: string) => void;
  handleOtherOperatedExpenseBlur: (year: number, value: string) => void;
  miscellaneousExpenseInput: Record<number, string>;
  handleMiscellaneousExpenseChange: (year: number, value: string) => void;
  handleMiscellaneousExpenseBlur: (year: number, value: string) => void;
  allocatedExpenseInput: Record<number, string>;
  handleAllocatedExpenseChange: (year: number, value: string) => void;
  handleAllocatedExpenseBlur: (year: number, value: string) => void;
  propertyOperationsExpenseInput: Record<number, string>;
  handlePropertyOperationsExpenseChange: (year: number, value: string) => void;
  handlePropertyOperationsExpenseBlur: (year: number, value: string) => void;
  administrativeGeneralExpenseInput: Record<number, string>;
  handleAdministrativeGeneralExpenseChange: (year: number, value: string) => void;
  handleAdministrativeGeneralExpenseBlur: (year: number, value: string) => void;
  infoTechServicesExpenseInput: Record<number, string>;
  handleInfoTechServicesExpenseChange: (year: number, value: string) => void;
  handleInfoTechServicesExpenseBlur: (year: number, value: string) => void;
  salesMarketingExpenseInput: Record<number, string>;
  handleSalesMarketingExpenseChange: (year: number, value: string) => void;
  handleSalesMarketingExpenseBlur: (year: number, value: string) => void;
  utilitiesExpenseInput: Record<number, string>;
  handleUtilitiesExpenseChange: (year: number, value: string) => void;
  handleUtilitiesExpenseBlur: (year: number, value: string) => void;
  managementFeesExpenseInput: Record<number, string>;
  handleManagementFeesExpenseChange: (year: number, value: string) => void;
  handleManagementFeesExpenseBlur: (year: number, value: string) => void;
  realEstateTaxesExpenseInput: Record<number, string>;
  handleRealEstateTaxesExpenseChange: (year: number, value: string) => void;
  handleRealEstateTaxesExpenseBlur: (year: number, value: string) => void;
  insuranceExpenseInput: Record<number, string>;
  handleInsuranceExpenseChange: (year: number, value: string) => void;
  handleInsuranceExpenseBlur: (year: number, value: string) => void;
  otherNonOpExpenseInput: Record<number, string>;
  handleOtherNonOpExpenseChange: (year: number, value: string) => void;
  handleOtherNonOpExpenseBlur: (year: number, value: string) => void;
  reserveForReplacementInput: Record<number, string>;
  handleReserveForReplacementChange: (year: number, value: string) => void;
  handleReserveForReplacementBlur: (year: number, value: string) => void;
  historicalExpenseData: any;
}

const RevenueTableBody: React.FC<RevenueTableBodyProps> = (props) => {
  return (
    <TableBody>
      <SectionHeader title="PENETRATION ANALYSIS" />

      <RevenueMetricsSection
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

      <ExpenseHeader showDropdown={false} />

      <ExpenseSectionContainer
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        historicalData={props.historicalData}
        historicalExpenseData={props.historicalExpenseData}
        expenseForecastMethod={props.expenseForecastMethod}
        setExpenseForecastMethod={props.setExpenseForecastMethod}
        roomsExpenseInput={props.roomsExpenseInput}
        handleRoomsExpenseChange={props.handleRoomsExpenseChange}
        handleRoomsExpenseBlur={props.handleRoomsExpenseBlur}
        fbExpenseInput={props.fbExpenseInput}
        handleFbExpenseChange={props.handleFbExpenseChange}
        handleFbExpenseBlur={props.handleFbExpenseBlur}
        otherOperatedExpenseInput={props.otherOperatedExpenseInput}
        handleOtherOperatedExpenseChange={props.handleOtherOperatedExpenseChange}
        handleOtherOperatedExpenseBlur={props.handleOtherOperatedExpenseBlur}
        miscellaneousExpenseInput={props.miscellaneousExpenseInput}
        handleMiscellaneousExpenseChange={props.handleMiscellaneousExpenseChange}
        handleMiscellaneousExpenseBlur={props.handleMiscellaneousExpenseBlur}
        allocatedExpenseInput={props.allocatedExpenseInput}
        handleAllocatedExpenseChange={props.handleAllocatedExpenseChange}
        handleAllocatedExpenseBlur={props.handleAllocatedExpenseBlur}
        propertyOperationsExpenseInput={props.propertyOperationsExpenseInput}
        handlePropertyOperationsExpenseChange={props.handlePropertyOperationsExpenseChange}
        handlePropertyOperationsExpenseBlur={props.handlePropertyOperationsExpenseBlur}
        administrativeGeneralExpenseInput={props.administrativeGeneralExpenseInput}
        handleAdministrativeGeneralExpenseChange={props.handleAdministrativeGeneralExpenseChange}
        handleAdministrativeGeneralExpenseBlur={props.handleAdministrativeGeneralExpenseBlur}
        infoTechServicesExpenseInput={props.infoTechServicesExpenseInput}
        handleInfoTechServicesExpenseChange={props.handleInfoTechServicesExpenseChange}
        handleInfoTechServicesExpenseBlur={props.handleInfoTechServicesExpenseBlur}
        salesMarketingExpenseInput={props.salesMarketingExpenseInput}
        handleSalesMarketingExpenseChange={props.handleSalesMarketingExpenseChange}
        handleSalesMarketingExpenseBlur={props.handleSalesMarketingExpenseBlur}
        utilitiesExpenseInput={props.utilitiesExpenseInput}
        handleUtilitiesExpenseChange={props.handleUtilitiesExpenseChange}
        handleUtilitiesExpenseBlur={props.handleUtilitiesExpenseBlur}
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
        formatCurrency={props.formatCurrency}
        formatPercent={props.formatPercent}
        helpers={props.helpers}
      />

      <CapitalExpenseSection
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        formatCurrency={props.formatCurrency}
      />
    </TableBody>
  );
};

export default RevenueTableBody;
