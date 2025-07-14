
import React from "react";
import ExpenseHeader from "./ExpenseHeader";
import { ExpenseCalculationsProvider } from "./ExpenseCalculationsProvider";
import ExpenseSectionsRenderer from "./ExpenseSectionsRenderer";

interface ExpenseSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
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
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  helpers: any;
  // Individual non-operating expense inputs
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
}

const ExpenseSection: React.FC<ExpenseSectionProps> = (props) => {
  return (
    <>
      {/* Expense Divider Row */}
      <ExpenseHeader 
        expenseForecastMethod={props.expenseForecastMethod}
        setExpenseForecastMethod={props.setExpenseForecastMethod}
      />

      {/* Expense Calculations Provider wraps all sections */}
      <ExpenseCalculationsProvider
        expenseForecastMethod={props.expenseForecastMethod}
        helpers={props.helpers}
        historicalYears={props.historicalYears}
        roomsExpenseInput={props.roomsExpenseInput}
        fbExpenseInput={props.fbExpenseInput}
        otherOperatedExpenseInput={props.otherOperatedExpenseInput}
        miscellaneousExpenseInput={props.miscellaneousExpenseInput}
        allocatedExpenseInput={props.allocatedExpenseInput}
        propertyOperationsExpenseInput={props.propertyOperationsExpenseInput}
        administrativeGeneralExpenseInput={props.administrativeGeneralExpenseInput}
        infoTechServicesExpenseInput={props.infoTechServicesExpenseInput}
        salesMarketingExpenseInput={props.salesMarketingExpenseInput}
        utilitiesExpenseInput={props.utilitiesExpenseInput}
        managementFeesExpenseInput={props.managementFeesExpenseInput}
        realEstateTaxesExpenseInput={props.realEstateTaxesExpenseInput}
        insuranceExpenseInput={props.insuranceExpenseInput}
        otherNonOpExpenseInput={props.otherNonOpExpenseInput}
      >
        <ExpenseSectionsRenderer
          historicalYears={props.historicalYears}
          forecastYears={props.forecastYears}
          historicalData={props.historicalData}
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
      </ExpenseCalculationsProvider>
    </>
  );
};

export default ExpenseSection;
