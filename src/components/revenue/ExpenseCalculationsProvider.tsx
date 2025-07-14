import React, { createContext, useContext, useMemo } from "react";
import { historicalExpenseData } from "./ExpenseData";
import { createExpenseCalculations } from "./ExpenseCalculations";
import { useDatabase } from "../../hooks/useDatabase";

interface ExpenseCalculationsContextType {
  calculations: ReturnType<typeof createExpenseCalculations>;
  calculateTotalExpense: (year: number) => number;
  getTotalHistoricalExpense: (year: number) => number;
  calculateGrossOperatingProfit: (year: number) => number;
  getPreCalculatedGOP: (year: number) => Promise<number | null>;
  saveFinancialSummary: (year: number, revenueData: any, expenseData: any) => Promise<void>;
}

const ExpenseCalculationsContext = createContext<ExpenseCalculationsContextType | null>(null);

interface ExpenseCalculationsProviderProps {
  children: React.ReactNode;
  expenseForecastMethod: string;
  helpers: any;
  historicalYears: number[];
  roomsExpenseInput: Record<number, string>;
  fbExpenseInput: Record<number, string>;
  otherOperatedExpenseInput: Record<number, string>;
  miscellaneousExpenseInput: Record<number, string>;
  allocatedExpenseInput: Record<number, string>;
  propertyOperationsExpenseInput: Record<number, string>;
  administrativeGeneralExpenseInput: Record<number, string>;
  infoTechServicesExpenseInput: Record<number, string>;
  salesMarketingExpenseInput: Record<number, string>;
  utilitiesExpenseInput: Record<number, string>;
  // Individual non-operating expense inputs
  managementFeesExpenseInput: Record<number, string>;
  realEstateTaxesExpenseInput: Record<number, string>;
  insuranceExpenseInput: Record<number, string>;
  otherNonOpExpenseInput: Record<number, string>;
}

export const ExpenseCalculationsProvider: React.FC<ExpenseCalculationsProviderProps> = ({
  children,
  expenseForecastMethod,
  helpers,
  historicalYears,
  roomsExpenseInput,
  fbExpenseInput,
  otherOperatedExpenseInput,
  miscellaneousExpenseInput,
  allocatedExpenseInput,
  propertyOperationsExpenseInput,
  administrativeGeneralExpenseInput,
  infoTechServicesExpenseInput,
  salesMarketingExpenseInput,
  utilitiesExpenseInput,
  managementFeesExpenseInput,
  realEstateTaxesExpenseInput,
  insuranceExpenseInput,
  otherNonOpExpenseInput
}) => {
  const { getFinancialSummary, calculateAndSaveFinancialSummary } = useDatabase();

  const calculations = useMemo(() => 
    createExpenseCalculations(historicalExpenseData, helpers),
    [helpers]
  );

  const calculateTotalExpense = (year: number) => {
    // Check if this is a historical year - use historical data directly
    if (historicalYears.includes(year)) {
      const roomsExpense = historicalExpenseData.rooms[year] || 0;
      const totalOtherOperatedExpense = calculations.getTotalHistoricalOtherOperatedExpense(year);
      const totalUndistributedExpenses = calculations.calculateTotalUndistributedExpenses(year, historicalYears, {
        propertyOperationsExpenseInput,
        administrativeGeneralExpenseInput,
        infoTechServicesExpenseInput,
        salesMarketingExpenseInput,
        utilitiesExpenseInput
      });
      const totalNonOperatingExpenses = calculations.calculateTotalNonOperatingExpenses(year, historicalYears, {
        managementFeesExpenseInput,
        realEstateTaxesExpenseInput,
        insuranceExpenseInput,
        otherNonOpExpenseInput
      });
      
      return roomsExpense + totalOtherOperatedExpense + totalUndistributedExpenses + totalNonOperatingExpenses;
    } else {
      // For forecast years, calculate from inputs
      const roomsExpense = calculations.calculateExpense(year, roomsExpenseInput[year], 'rooms');
      const totalOtherOperatedExpense = calculations.calculateTotalOtherOperatedExpense(year, {
        fbExpenseInput,
        otherOperatedExpenseInput,
        miscellaneousExpenseInput,
        allocatedExpenseInput
      });
      const totalUndistributedExpenses = calculations.calculateTotalUndistributedExpenses(year, historicalYears, {
        propertyOperationsExpenseInput,
        administrativeGeneralExpenseInput,
        infoTechServicesExpenseInput,
        salesMarketingExpenseInput,
        utilitiesExpenseInput
      });
      const totalNonOperatingExpenses = calculations.calculateTotalNonOperatingExpenses(year, historicalYears, {
        managementFeesExpenseInput,
        realEstateTaxesExpenseInput,
        insuranceExpenseInput,
        otherNonOpExpenseInput
      });
      
      return roomsExpense + totalOtherOperatedExpense + totalUndistributedExpenses + totalNonOperatingExpenses;
    }
  };

  const getTotalHistoricalExpense = (year: number) => {
    return (historicalExpenseData.rooms[year] || 0) + 
           calculations.getTotalHistoricalOtherOperatedExpense(year) +
           calculations.calculateTotalUndistributedExpenses(year, historicalYears, {
             propertyOperationsExpenseInput,
             administrativeGeneralExpenseInput,
             infoTechServicesExpenseInput,
             salesMarketingExpenseInput,
             utilitiesExpenseInput
           }) +
           calculations.calculateTotalNonOperatingExpenses(year, historicalYears, {
             managementFeesExpenseInput,
             realEstateTaxesExpenseInput,
             insuranceExpenseInput,
             otherNonOpExpenseInput
           });
  };

  const calculateGrossOperatingProfit = (year: number) => {
    const isHistorical = historicalYears.includes(year);
    const totalRevenue = helpers.calculateTotalRevenue ? helpers.calculateTotalRevenue(year, isHistorical) : 0;
    
    const roomsExpense = isHistorical 
      ? (historicalExpenseData.rooms[year] || 0)
      : calculations.calculateExpense(year, roomsExpenseInput[year], 'rooms');
    
    const totalOtherOperatedExpense = calculations.calculateTotalOtherOperatedExpense(year, {
      fbExpenseInput,
      otherOperatedExpenseInput,
      miscellaneousExpenseInput,
      allocatedExpenseInput
    });
    const totalUndistributedExpenses = calculations.calculateTotalUndistributedExpenses(year, historicalYears, {
      propertyOperationsExpenseInput,
      administrativeGeneralExpenseInput,
      infoTechServicesExpenseInput,
      salesMarketingExpenseInput,
      utilitiesExpenseInput
    });
    
    return totalRevenue - roomsExpense - totalOtherOperatedExpense - totalUndistributedExpenses;
  };

  const getPreCalculatedGOP = async (year: number): Promise<number | null> => {
    try {
      // Use a default property ID for now - in a real app this would come from context
      const summary = await getFinancialSummary('default-property', year);
      return summary?.gross_operating_profit || null;
    } catch (error) {
      console.error('Error fetching pre-calculated GOP:', error);
      return null;
    }
  };

  const saveFinancialSummary = async (year: number, revenueData: any, expenseData: any) => {
    try {
      await calculateAndSaveFinancialSummary('default-property', year, revenueData, expenseData);
    } catch (error) {
      console.error('Error saving financial summary:', error);
    }
  };

  const contextValue = {
    calculations,
    calculateTotalExpense,
    getTotalHistoricalExpense,
    calculateGrossOperatingProfit,
    getPreCalculatedGOP,
    saveFinancialSummary
  };

  return (
    <ExpenseCalculationsContext.Provider value={contextValue}>
      {children}
    </ExpenseCalculationsContext.Provider>
  );
};

export const useExpenseCalculations = () => {
  const context = useContext(ExpenseCalculationsContext);
  if (!context) {
    throw new Error('useExpenseCalculations must be used within ExpenseCalculationsProvider');
  }
  return context;
};
