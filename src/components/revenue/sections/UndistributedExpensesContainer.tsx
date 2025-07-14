
import React from "react";
import SectionHeader from "../SectionHeader";
import UndistributedExpensesSections from "./UndistributedExpensesSections";
import { CalculationHelpers } from "../RevenueTableHelpers";
import { ExpenseCalculationHelpers } from "./ExpenseCalculationHelpers";

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
  formatPercent: (value: number, decimals?: number) => string;
  historicalExpenseData: any;
  helpers: CalculationHelpers;
  expenseHelpers: ExpenseCalculationHelpers;
}

const UndistributedExpensesContainer: React.FC<UndistributedExpensesContainerProps> = (props) => {
  return (
    <>
      <SectionHeader 
        title="Undistributed Expense" 
        className="bg-gray-200"
      />

      <UndistributedExpensesSections
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
        calculateExpense={props.expenseHelpers.calculateExpense}
        historicalExpenseData={props.historicalExpenseData}
        helpers={props.helpers}
      />
    </>
  );
};

export default UndistributedExpensesContainer;
