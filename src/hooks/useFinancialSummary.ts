
import { useState } from "react";
import { useToast } from "./use-toast";
import { getLocalData, setLocalData, STORAGE_KEYS } from "./database/supabaseClient";

export interface FinancialSummaryData {
  id?: string;
  property_id: string;
  year: number;
  total_revenue: number;
  total_rooms_expense: number;
  total_other_operated_expense: number;
  total_undistributed_expense: number;
  total_non_operating_expense: number;
  gross_operating_profit: number;
  net_operating_income: number;
  created_at?: string;
  updated_at?: string;
}

export const useFinancialSummary = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const calculateAndSaveFinancialSummary = async (
    propertyId: string,
    year: number,
    revenueData: {
      roomsRevenue: number;
      fbRevenue: number;
      otherOperatedRevenue: number;
      miscellaneousRevenue: number;
      allocatedRevenue: number;
    },
    expenseData: {
      roomsExpense: number;
      fbExpense: number;
      otherOperatedExpense: number;
      miscellaneousExpense: number;
      allocatedExpense: number;
      propertyOperationsExpense: number;
      administrativeGeneralExpense: number;
      infoTechServicesExpense: number;
      salesMarketingExpense: number;
      utilitiesExpense: number;
      nonOperatingExpense: number;
    }
  ) => {
    try {
      setLoading(true);

      // Calculate totals
      const totalRevenue = 
        revenueData.roomsRevenue + 
        revenueData.fbRevenue + 
        revenueData.otherOperatedRevenue + 
        revenueData.miscellaneousRevenue + 
        revenueData.allocatedRevenue;

      const totalRoomsExpense = expenseData.roomsExpense;
      
      const totalOtherOperatedExpense = 
        expenseData.fbExpense + 
        expenseData.otherOperatedExpense + 
        expenseData.miscellaneousExpense + 
        expenseData.allocatedExpense;

      const totalUndistributedExpense = 
        expenseData.propertyOperationsExpense + 
        expenseData.administrativeGeneralExpense + 
        expenseData.infoTechServicesExpense + 
        expenseData.salesMarketingExpense + 
        expenseData.utilitiesExpense;

      const totalNonOperatingExpense = expenseData.nonOperatingExpense;

      const grossOperatingProfit = 
        totalRevenue - 
        totalRoomsExpense - 
        totalOtherOperatedExpense - 
        totalUndistributedExpense;

      const netOperatingIncome = grossOperatingProfit - totalNonOperatingExpense;

      // Validation: Ensure individual components sum to totals
      const expectedOtherOperatedTotal = 
        expenseData.fbExpense + 
        expenseData.otherOperatedExpense + 
        expenseData.miscellaneousExpense + 
        expenseData.allocatedExpense;

      const expectedUndistributedTotal = 
        expenseData.propertyOperationsExpense + 
        expenseData.administrativeGeneralExpense + 
        expenseData.infoTechServicesExpense + 
        expenseData.salesMarketingExpense + 
        expenseData.utilitiesExpense;

      if (Math.abs(totalOtherOperatedExpense - expectedOtherOperatedTotal) > 0.01) {
        console.warn(`Other Operated Expense total mismatch for year ${year}: ${totalOtherOperatedExpense} vs ${expectedOtherOperatedTotal}`);
      }

      if (Math.abs(totalUndistributedExpense - expectedUndistributedTotal) > 0.01) {
        console.warn(`Undistributed Expense total mismatch for year ${year}: ${totalUndistributedExpense} vs ${expectedUndistributedTotal}`);
      }

      // Get existing financial summaries
      const summaries = getLocalData<FinancialSummaryData[]>(STORAGE_KEYS.FINANCIAL_SUMMARIES, []);
      
      // Find existing summary for this property and year
      const existingIndex = summaries.findIndex(s => s.property_id === propertyId && s.year === year);
      
      const summaryData: FinancialSummaryData = {
        property_id: propertyId,
        year,
        total_revenue: totalRevenue,
        total_rooms_expense: totalRoomsExpense,
        total_other_operated_expense: totalOtherOperatedExpense,
        total_undistributed_expense: totalUndistributedExpense,
        total_non_operating_expense: totalNonOperatingExpense,
        gross_operating_profit: grossOperatingProfit,
        net_operating_income: netOperatingIncome,
        updated_at: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        // Update existing summary
        summaries[existingIndex] = { ...summaries[existingIndex], ...summaryData };
      } else {
        // Create new summary
        const newSummary = {
          ...summaryData,
          id: `summary-${propertyId}-${year}-${Date.now()}`,
          created_at: new Date().toISOString()
        };
        summaries.push(newSummary);
      }

      setLocalData(STORAGE_KEYS.FINANCIAL_SUMMARIES, summaries);

      return summaryData;
    } catch (error: any) {
      console.error("Error calculating financial summary:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to calculate financial summary",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getFinancialSummary = async (propertyId: string, year: number): Promise<FinancialSummaryData | null> => {
    try {
      const summaries = getLocalData<FinancialSummaryData[]>(STORAGE_KEYS.FINANCIAL_SUMMARIES, []);
      return summaries.find(s => s.property_id === propertyId && s.year === year) || null;
    } catch (error: any) {
      console.error("Error fetching financial summary:", error);
      return null;
    }
  };

  const getFinancialSummariesForProperty = async (propertyId: string): Promise<FinancialSummaryData[]> => {
    try {
      const summaries = getLocalData<FinancialSummaryData[]>(STORAGE_KEYS.FINANCIAL_SUMMARIES, []);
      return summaries.filter(s => s.property_id === propertyId);
    } catch (error: any) {
      console.error("Error fetching financial summaries:", error);
      return [];
    }
  };

  return {
    loading,
    calculateAndSaveFinancialSummary,
    getFinancialSummary,
    getFinancialSummariesForProperty
  };
};
