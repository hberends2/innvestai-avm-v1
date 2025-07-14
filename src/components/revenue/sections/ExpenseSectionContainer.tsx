
import React from "react";
import { CalculationHelpers } from "../RevenueTableHelpers";
import { createExpenseCalculationHelpers } from "./ExpenseCalculationHelpers";
import OperatingExpensesContainer from "./OperatingExpensesContainer";
import UndistributedExpensesContainer from "./UndistributedExpensesContainer";


interface ExpenseSectionContainerProps {
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
  historicalExpenseData: any;
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
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  helpers: CalculationHelpers;
}

const ExpenseSectionContainer: React.FC<ExpenseSectionContainerProps> = (props) => {
  // Create expense calculation helpers
  const expenseHelpers = createExpenseCalculationHelpers({
    expenseForecastMethod: props.expenseForecastMethod,
    historicalExpenseData: props.historicalExpenseData,
    fbExpenseInput: props.fbExpenseInput,
    otherOperatedExpenseInput: props.otherOperatedExpenseInput,
    miscellaneousExpenseInput: props.miscellaneousExpenseInput,
    allocatedExpenseInput: props.allocatedExpenseInput,
    helpers: props.helpers
  });

  return (
    <>
      <OperatingExpensesContainer
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        historicalData={props.historicalData}
        historicalExpenseData={props.historicalExpenseData}
        expenseForecastMethod={props.expenseForecastMethod}
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
        formatCurrency={props.formatCurrency}
        formatPercent={props.formatPercent}
        helpers={props.helpers}
        expenseHelpers={expenseHelpers}
      />

      <UndistributedExpensesContainer
        historicalYears={props.historicalYears}
        forecastYears={props.forecastYears}
        expenseForecastMethod={props.expenseForecastMethod}
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
        formatCurrency={props.formatCurrency}
        formatPercent={props.formatPercent}
        historicalExpenseData={props.historicalExpenseData}
        helpers={props.helpers}
        expenseHelpers={expenseHelpers}
      />

    </>
  );
};

export default ExpenseSectionContainer;
