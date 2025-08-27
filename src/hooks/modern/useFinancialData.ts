/**
 * Modern financial data hook using new async patterns and DataService
 */

import { useCallback } from 'react';
import { FinancialSummaryData } from '../useFinancialSummary';
import { DataService } from '../../services/DataService';
import { useAsyncOperation } from './useAsyncOperation';

export interface FinancialCalculationInput {
  revenueData: {
    roomsRevenue: number;
    fbRevenue: number;
    otherOperatedRevenue: number;
    miscellaneousRevenue: number;
    allocatedRevenue: number;
  };
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
  };
}

export const useFinancialData = () => {
  const financialOperation = useAsyncOperation<FinancialSummaryData[]>([]);
  const summaryOperation = useAsyncOperation<FinancialSummaryData | null>(null);

  const calculateAndSaveFinancialSummary = useCallback(async (
    propertyId: string,
    year: number,
    input: FinancialCalculationInput
  ) => {
    const { revenueData, expenseData } = input;

    // Calculate totals using the same logic as the original hook
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
    };

    const result = await summaryOperation.execute(
      () => DataService.financial.save(summaryData),
      'calculate and save financial summary',
      { successMessage: 'Financial summary calculated and saved' }
    );

    return result;
  }, [summaryOperation]);

  const getFinancialSummary = useCallback(async (propertyId: string, year: number) => {
    return await summaryOperation.execute(
      () => DataService.financial.getByPropertyAndYear(propertyId, year),
      'fetch financial summary',
      { showSuccessToast: false }
    );
  }, [summaryOperation]);

  const getFinancialSummariesForProperty = useCallback(async (propertyId: string) => {
    return await financialOperation.execute(
      () => DataService.financial.getByPropertyId(propertyId),
      'fetch property financial summaries',
      { showSuccessToast: false }
    );
  }, [financialOperation]);

  return {
    financialSummaries: financialOperation.data || [],
    currentSummary: summaryOperation.data,
    loading: financialOperation.loading || summaryOperation.loading,
    error: financialOperation.error || summaryOperation.error,
    calculateAndSaveFinancialSummary,
    getFinancialSummary,
    getFinancialSummariesForProperty,
    reset: () => {
      financialOperation.reset();
      summaryOperation.reset();
    },
  };
};