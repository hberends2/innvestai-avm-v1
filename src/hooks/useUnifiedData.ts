import { useDataContext } from '../contexts/DataContext';
import { useMemo } from 'react';

/**
 * Unified data hook that provides all necessary data and actions
 * Replaces multiple individual hooks to eliminate prop drilling
 */
export const useUnifiedData = () => {
  const { state, actions } = useDataContext();

  // Memoized selectors for better performance
  const selectors = useMemo(() => ({
    getProperty: (id: string) => state.properties.find(p => p.id === id),
    getOccupancyData: (propertyId: string) => state.occupancyData[propertyId],
    getFinancialSummary: (propertyId: string, year: number) => 
      state.financialSummaries[`${propertyId}_${year}`],
    getPropertiesByStatus: (status: string) => 
      state.properties.filter(p => p.status === status),
  }), [state.properties, state.occupancyData, state.financialSummaries]);

  // Computed values
  const computed = useMemo(() => ({
    totalProperties: state.properties.length,
    hasData: state.properties.length > 0,
    isLoading: state.loading,
    hasError: !!state.error,
    errorMessage: state.error,
  }), [state.properties.length, state.loading, state.error]);

  return {
    // Raw state
    state,
    
    // Computed values
    ...computed,
    
    // Selectors
    ...selectors,
    
    // Actions
    ...actions,
  };
};