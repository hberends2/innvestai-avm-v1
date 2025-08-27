import { useMemo } from 'react';
// import { RevenueCalculations } from '../types/revenueCalculations';

/**
 * Custom hook to manage and structure revenue table props
 * Eliminates the massive prop drilling in RevenueLayout and RevenueTableContainer
 */
export const useRevenueTableProps = (
  revenueCalculations: any, // TODO: Use proper RevenueCalculations type when complete
  helpers: any,
  roomsKeys: number,
  historicalYears: number[],
  forecastYears: number[],
  historicalData: any,
  formatCurrency: (value: number) => string,
  formatPercent: (value: number, decimals?: number) => string
) => {
  
  // Occupancy-related props
  const occupancyProps = useMemo(() => ({
    occupancyForecast: revenueCalculations.occupancyForecast,
    handleOccupancyChange: revenueCalculations.handleOccupancyChange,
    occupancyForecastMethod: revenueCalculations.occupancyForecastMethod,
    setOccupancyForecastMethod: revenueCalculations.setOccupancyForecastMethod,
    occupancyYoYGrowth: revenueCalculations.occupancyYoYGrowth,
    handleOccupancyYoYChange: revenueCalculations.handleOccupancyYoYChange,
    calculateOccupancyFromYoY: helpers.calculateOccupancyFromYoYForYear,
  }), [revenueCalculations, helpers]);

  // ADR-related props
  const adrProps = useMemo(() => ({
    adrGrowthType: revenueCalculations.adrGrowthType,
    setAdrGrowthType: revenueCalculations.setAdrGrowthType,
    flatAdrGrowth: revenueCalculations.flatAdrGrowth,
    setFlatAdrGrowth: revenueCalculations.setFlatAdrGrowth,
    yearlyAdrGrowth: revenueCalculations.yearlyAdrGrowth,
    handleYearlyAdrChange: revenueCalculations.handleYearlyAdrChange,
  }), [revenueCalculations]);

  // Revenue stream props
  const revenueStreamProps = useMemo(() => ({
    fbPerOccupiedRoom: revenueCalculations.fbPerOccupiedRoom,
    handleFbPerOccupiedRoomChange: revenueCalculations.handleFbPerOccupiedRoomChange,
    handleFbPerOccupiedRoomBlur: revenueCalculations.handleFbPerOccupiedRoomBlur,
    resortFeePerOccupiedRoom: revenueCalculations.resortFeePerOccupiedRoom,
    handleResortFeePerOccupiedRoomChange: revenueCalculations.handleResortFeePerOccupiedRoomChange,
    handleResortFeePerOccupiedRoomBlur: revenueCalculations.handleResortFeePerOccupiedRoomBlur,
    otherOperatedPerOccupiedRoom: revenueCalculations.otherOperatedPerOccupiedRoom,
    handleOtherOperatedPerOccupiedRoomChange: revenueCalculations.handleOtherOperatedPerOccupiedRoomChange,
    handleOtherOperatedPerOccupiedRoomBlur: revenueCalculations.handleOtherOperatedPerOccupiedRoomBlur,
    miscellaneousPerOccupiedRoom: revenueCalculations.miscellaneousPerOccupiedRoom,
    handleMiscellaneousPerOccupiedRoomChange: revenueCalculations.handleMiscellaneousPerOccupiedRoomChange,
    handleMiscellaneousPerOccupiedRoomBlur: revenueCalculations.handleMiscellaneousPerOccupiedRoomBlur,
    allocatedPerOccupiedRoom: revenueCalculations.allocatedPerOccupiedRoom,
    handleAllocatedPerOccupiedRoomChange: revenueCalculations.handleAllocatedPerOccupiedRoomChange,
    handleAllocatedPerOccupiedRoomBlur: revenueCalculations.handleAllocatedPerOccupiedRoomBlur,
  }), [revenueCalculations]);

  // Expense props
  const expenseProps = useMemo(() => ({
    expenseForecastMethod: revenueCalculations.expenseForecastMethod,
    setExpenseForecastMethod: revenueCalculations.setExpenseForecastMethod,
    // Rooms expense
    roomsExpenseInput: revenueCalculations.roomsExpenseInput,
    handleRoomsExpenseChange: revenueCalculations.handleRoomsExpenseChange,
    handleRoomsExpenseBlur: revenueCalculations.handleRoomsExpenseBlur,
    // F&B expense
    fbExpenseInput: revenueCalculations.fbExpenseInput,
    handleFbExpenseChange: revenueCalculations.handleFbExpenseChange,
    handleFbExpenseBlur: revenueCalculations.handleFbExpenseBlur,
    // Resort fee expense
    resortFeeExpenseInput: revenueCalculations.resortFeeExpenseInput,
    handleResortFeeExpenseChange: revenueCalculations.handleResortFeeExpenseChange,
    handleResortFeeExpenseBlur: revenueCalculations.handleResortFeeExpenseBlur,
    // Other operated expense
    otherOperatedExpenseInput: revenueCalculations.otherOperatedExpenseInput,
    handleOtherOperatedExpenseChange: revenueCalculations.handleOtherOperatedExpenseChange,
    handleOtherOperatedExpenseBlur: revenueCalculations.handleOtherOperatedExpenseBlur,
    // Miscellaneous expense
    miscellaneousExpenseInput: revenueCalculations.miscellaneousExpenseInput,
    handleMiscellaneousExpenseChange: revenueCalculations.handleMiscellaneousExpenseChange,
    handleMiscellaneousExpenseBlur: revenueCalculations.handleMiscellaneousExpenseBlur,
    // Allocated expense
    allocatedExpenseInput: revenueCalculations.allocatedExpenseInput,
    handleAllocatedExpenseChange: revenueCalculations.handleAllocatedExpenseChange,
    handleAllocatedExpenseBlur: revenueCalculations.handleAllocatedExpenseBlur,
  }), [revenueCalculations]);

  // Undistributed expense props
  const undistributedExpenseProps = useMemo(() => ({
    propertyOperationsExpenseInput: revenueCalculations.propertyOperationsExpenseInput,
    handlePropertyOperationsExpenseChange: revenueCalculations.handlePropertyOperationsExpenseChange,
    handlePropertyOperationsExpenseBlur: revenueCalculations.handlePropertyOperationsExpenseBlur,
    administrativeGeneralExpenseInput: revenueCalculations.administrativeGeneralExpenseInput,
    handleAdministrativeGeneralExpenseChange: revenueCalculations.handleAdministrativeGeneralExpenseChange,
    handleAdministrativeGeneralExpenseBlur: revenueCalculations.handleAdministrativeGeneralExpenseBlur,
    infoTechServicesExpenseInput: revenueCalculations.infoTechServicesExpenseInput,
    handleInfoTechServicesExpenseChange: revenueCalculations.handleInfoTechServicesExpenseChange,
    handleInfoTechServicesExpenseBlur: revenueCalculations.handleInfoTechServicesExpenseBlur,
    salesMarketingExpenseInput: revenueCalculations.salesMarketingExpenseInput,
    handleSalesMarketingExpenseChange: revenueCalculations.handleSalesMarketingExpenseChange,
    handleSalesMarketingExpenseBlur: revenueCalculations.handleSalesMarketingExpenseBlur,
    utilitiesExpenseInput: revenueCalculations.utilitiesExpenseInput,
    handleUtilitiesExpenseChange: revenueCalculations.handleUtilitiesExpenseChange,
    handleUtilitiesExpenseBlur: revenueCalculations.handleUtilitiesExpenseBlur,
  }), [revenueCalculations]);

  // Non-operating expense props
  const nonOperatingExpenseProps = useMemo(() => ({
    managementFeesExpenseInput: revenueCalculations.managementFeesExpenseInput,
    handleManagementFeesExpenseChange: revenueCalculations.handleManagementFeesExpenseChange,
    handleManagementFeesExpenseBlur: revenueCalculations.handleManagementFeesExpenseBlur,
    realEstateTaxesExpenseInput: revenueCalculations.realEstateTaxesExpenseInput,
    handleRealEstateTaxesExpenseChange: revenueCalculations.handleRealEstateTaxesExpenseChange,
    handleRealEstateTaxesExpenseBlur: revenueCalculations.handleRealEstateTaxesExpenseBlur,
    insuranceExpenseInput: revenueCalculations.insuranceExpenseInput,
    handleInsuranceExpenseChange: revenueCalculations.handleInsuranceExpenseChange,
    handleInsuranceExpenseBlur: revenueCalculations.handleInsuranceExpenseBlur,
    otherNonOpExpenseInput: revenueCalculations.otherNonOpExpenseInput,
    handleOtherNonOpExpenseChange: revenueCalculations.handleOtherNonOpExpenseChange,
    handleOtherNonOpExpenseBlur: revenueCalculations.handleOtherNonOpExpenseBlur,
    reserveForReplacementInput: revenueCalculations.reserveForReplacementInput,
    handleReserveForReplacementChange: revenueCalculations.handleReserveForReplacementChange,
    handleReserveForReplacementBlur: revenueCalculations.handleReserveForReplacementBlur,
  }), [revenueCalculations]);

  // Helper functions
  const helperProps = useMemo(() => ({
    getAvailableRooms: helpers.getAvailableRoomsForYear,
    getForecastRevpar: helpers.getForecastRevparForYear,
    getForecastRoomsRevenue: helpers.getForecastRoomsRevenueForYear,
  }), [helpers]);

  // Core data props
  const coreProps = useMemo(() => ({
    roomsKeys,
    historicalYears,
    forecastYears,
    historicalData,
    formatCurrency,
    formatPercent,
  }), [roomsKeys, historicalYears, forecastYears, historicalData, formatCurrency, formatPercent]);

  // Combined props for easy consumption
  const allRevenueTableProps = useMemo(() => ({
    ...coreProps,
    ...occupancyProps,
    ...adrProps,
    ...revenueStreamProps,
    ...expenseProps,
    ...undistributedExpenseProps,
    ...nonOperatingExpenseProps,
    ...helperProps,
  }), [
    coreProps,
    occupancyProps,
    adrProps,
    revenueStreamProps,
    expenseProps,
    undistributedExpenseProps,
    nonOperatingExpenseProps,
    helperProps,
  ]);

  return {
    // Grouped props for specific sections
    coreProps,
    occupancyProps,
    adrProps,
    revenueStreamProps,
    expenseProps,
    undistributedExpenseProps,
    nonOperatingExpenseProps,
    helperProps,
    
    // All props combined
    allRevenueTableProps,
  };
};
