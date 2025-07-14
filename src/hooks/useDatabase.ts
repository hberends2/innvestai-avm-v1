
import { usePropertyOperations } from "./database/usePropertyOperations";
import { useOccupancyOperations } from "./database/useOccupancyOperations";
import { useFinancialSummary } from "./useFinancialSummary";

export const useDatabase = () => {
  const propertyOps = usePropertyOperations();
  const occupancyOps = useOccupancyOperations();
  const financialSummaryOps = useFinancialSummary();

  // Combine loading states
  const loading = propertyOps.loading || occupancyOps.loading || financialSummaryOps.loading;

  return {
    // Property operations
    saveProperty: propertyOps.saveProperty,
    deleteProperty: propertyOps.deleteProperty,
    getProperties: propertyOps.getProperties,
    
    // Occupancy operations
    saveOccupancyData: occupancyOps.saveOccupancyData,
    
    // Financial summary operations
    calculateAndSaveFinancialSummary: financialSummaryOps.calculateAndSaveFinancialSummary,
    getFinancialSummary: financialSummaryOps.getFinancialSummary,
    getFinancialSummariesForProperty: financialSummaryOps.getFinancialSummariesForProperty,
    
    // Combined loading state
    loading
  };
};
