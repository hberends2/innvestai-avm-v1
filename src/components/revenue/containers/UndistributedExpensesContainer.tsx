
import React from "react";
import UndistributedExpensesSection from "../UndistributedExpensesSection";

interface UndistributedExpensesContainerProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
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
  historicalExpenseData: any;
}

const UndistributedExpensesContainer: React.FC<UndistributedExpensesContainerProps> = (props) => {
  return (
    <UndistributedExpensesSection
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
      calculateExpense={() => 0}
      calculateTotalUndistributedExpenses={() => 0}
      historicalExpenseData={props.historicalExpenseData}
      getHistoricalExpenseData={() => "0"}
    />
  );
};

export default UndistributedExpensesContainer;
