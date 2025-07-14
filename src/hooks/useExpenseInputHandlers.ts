import { useState } from 'react';
import { useInputHandlers } from './useInputHandlers';
import { REVENUE_CONFIG } from '../config/revenueConfig';

const getInitialForecastData = (defaultValue: string = "0") => 
  REVENUE_CONFIG.FORECAST_YEARS.reduce((acc, year) => ({ ...acc, [year]: defaultValue }), {});

export const useExpenseInputHandlers = (expenseForecastMethod: string) => {
  // Expense inputs
  const roomsExpenseInput = useInputHandlers(getInitialForecastData());
  const fbExpenseInput = useInputHandlers(getInitialForecastData());
  const resortFeeExpenseInput = useInputHandlers(getInitialForecastData());
  const otherOperatedExpenseInput = useInputHandlers(getInitialForecastData());
  const miscellaneousExpenseInput = useInputHandlers(getInitialForecastData());
  const allocatedExpenseInput = useInputHandlers(getInitialForecastData());

  // Undistributed expense inputs
  const propertyOperationsExpenseInput = useInputHandlers(getInitialForecastData());
  const administrativeGeneralExpenseInput = useInputHandlers(getInitialForecastData());
  const infoTechServicesExpenseInput = useInputHandlers(getInitialForecastData());
  const salesMarketingExpenseInput = useInputHandlers(getInitialForecastData());
  const utilitiesExpenseInput = useInputHandlers(getInitialForecastData());

  // Non-operating expense inputs (all % of Revenue) - store raw decimal values
  const managementFeesExpenseInput = useInputHandlers(getInitialForecastData("0"));
  const realEstateTaxesExpenseInput = useInputHandlers(getInitialForecastData("0"));
  const insuranceExpenseInput = useInputHandlers(getInitialForecastData("0"));
  const otherNonOpExpenseInput = useInputHandlers(getInitialForecastData("0"));

  // Reserve for Replacement input
  const reserveForReplacementInput = useInputHandlers(getInitialForecastData());

  // Expense blur handlers - store raw values without forced rounding
  const handleExpenseBlur = (year: number, value: string, handler: any) => {
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const numValue = parseFloat(cleanValue);
    
    // Store raw decimal values without forced rounding
    const formattedValue = isNaN(numValue) ? "0" : numValue.toString();
    handler(year, formattedValue);
  };

  // Non-operating expense blur handlers - store raw decimal values
  const handleNonOpExpenseBlur = (year: number, value: string, handler: any) => {
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const numValue = parseFloat(cleanValue);
    // Store raw decimal values - no forced toFixed(1)
    const formattedValue = isNaN(numValue) ? "0" : numValue.toString();
    handler(year, formattedValue);
  };

  // Reserve for Replacement handlers
  const handleReserveForReplacementChange = (year: number, value: string) => {
    reserveForReplacementInput.handleChange(year, value);
  };

  const handleReserveForReplacementBlur = (year: number, value: string) => {
    const cleanValue = value.replace(/[^0-9.-]/g, "");
    const numValue = parseFloat(cleanValue);
    const formattedValue = isNaN(numValue) ? "0" : Math.round(numValue).toString();
    reserveForReplacementInput.handleChange(year, formattedValue);
  };

  return {
    // Operating expense inputs
    roomsExpenseInput: roomsExpenseInput.values,
    handleRoomsExpenseChange: roomsExpenseInput.handleChange,
    handleRoomsExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, roomsExpenseInput.handleChange),
    fbExpenseInput: fbExpenseInput.values,
    handleFbExpenseChange: fbExpenseInput.handleChange,
    handleFbExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, fbExpenseInput.handleChange),
    resortFeeExpenseInput: resortFeeExpenseInput.values,
    handleResortFeeExpenseChange: resortFeeExpenseInput.handleChange,
    handleResortFeeExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, resortFeeExpenseInput.handleChange),
    otherOperatedExpenseInput: otherOperatedExpenseInput.values,
    handleOtherOperatedExpenseChange: otherOperatedExpenseInput.handleChange,
    handleOtherOperatedExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, otherOperatedExpenseInput.handleChange),
    miscellaneousExpenseInput: miscellaneousExpenseInput.values,
    handleMiscellaneousExpenseChange: miscellaneousExpenseInput.handleChange,
    handleMiscellaneousExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, miscellaneousExpenseInput.handleChange),
    allocatedExpenseInput: allocatedExpenseInput.values,
    handleAllocatedExpenseChange: allocatedExpenseInput.handleChange,
    handleAllocatedExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, allocatedExpenseInput.handleChange),
    // Undistributed expense handlers
    propertyOperationsExpenseInput: propertyOperationsExpenseInput.values,
    handlePropertyOperationsExpenseChange: propertyOperationsExpenseInput.handleChange,
    handlePropertyOperationsExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, propertyOperationsExpenseInput.handleChange),
    administrativeGeneralExpenseInput: administrativeGeneralExpenseInput.values,
    handleAdministrativeGeneralExpenseChange: administrativeGeneralExpenseInput.handleChange,
    handleAdministrativeGeneralExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, administrativeGeneralExpenseInput.handleChange),
    infoTechServicesExpenseInput: infoTechServicesExpenseInput.values,
    handleInfoTechServicesExpenseChange: infoTechServicesExpenseInput.handleChange,
    handleInfoTechServicesExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, infoTechServicesExpenseInput.handleChange),
    salesMarketingExpenseInput: salesMarketingExpenseInput.values,
    handleSalesMarketingExpenseChange: salesMarketingExpenseInput.handleChange,
    handleSalesMarketingExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, salesMarketingExpenseInput.handleChange),
    utilitiesExpenseInput: utilitiesExpenseInput.values,
    handleUtilitiesExpenseChange: utilitiesExpenseInput.handleChange,
    handleUtilitiesExpenseBlur: (year: number, value: string) => handleExpenseBlur(year, value, utilitiesExpenseInput.handleChange),
    // Non-operating expense handlers
    managementFeesExpenseInput: managementFeesExpenseInput.values,
    handleManagementFeesExpenseChange: managementFeesExpenseInput.handleChange,
    handleManagementFeesExpenseBlur: (year: number, value: string) => handleNonOpExpenseBlur(year, value, managementFeesExpenseInput.handleChange),
    realEstateTaxesExpenseInput: realEstateTaxesExpenseInput.values,
    handleRealEstateTaxesExpenseChange: realEstateTaxesExpenseInput.handleChange,
    handleRealEstateTaxesExpenseBlur: (year: number, value: string) => handleNonOpExpenseBlur(year, value, realEstateTaxesExpenseInput.handleChange),
    insuranceExpenseInput: insuranceExpenseInput.values,
    handleInsuranceExpenseChange: insuranceExpenseInput.handleChange,
    handleInsuranceExpenseBlur: (year: number, value: string) => handleNonOpExpenseBlur(year, value, insuranceExpenseInput.handleChange),
    otherNonOpExpenseInput: otherNonOpExpenseInput.values,
    handleOtherNonOpExpenseChange: otherNonOpExpenseInput.handleChange,
    handleOtherNonOpExpenseBlur: (year: number, value: string) => handleNonOpExpenseBlur(year, value, otherNonOpExpenseInput.handleChange),
    // Reserve for Replacement handlers
    reserveForReplacementInput: reserveForReplacementInput.values,
    handleReserveForReplacementChange,
    handleReserveForReplacementBlur
  };
};
