/**
 * Modern occupancy data hook using new async patterns and DataService
 */

import { useCallback } from 'react';
import { DataService } from '../../services/DataService';
import { useAsyncOperation } from './useAsyncOperation';

export interface OccupancyData {
  propertyId: string;
  data: any;
  updated_at?: string;
}

export const useOccupancyData = () => {
  const occupancyOperation = useAsyncOperation<OccupancyData | null>(null);

  const saveOccupancyData = useCallback(async (propertyId: string, occupancyData: any) => {
    const result = await occupancyOperation.execute(
      () => DataService.occupancy.save(propertyId, occupancyData),
      'save occupancy data',
      { successMessage: 'Occupancy data saved successfully' }
    );

    if (result) {
      // Update local state
      occupancyOperation.setData({
        propertyId,
        data: occupancyData,
        updated_at: new Date().toISOString(),
      });
    }

    return result;
  }, [occupancyOperation]);

  const loadOccupancyData = useCallback(async (propertyId: string) => {
    const result = await occupancyOperation.execute(
      () => DataService.occupancy.getByPropertyId(propertyId),
      'load occupancy data',
      { showSuccessToast: false }
    );

    if (result) {
      occupancyOperation.setData({
        propertyId,
        data: result,
        updated_at: result?.updated_at,
      });
    }

    return result;
  }, [occupancyOperation]);

  return {
    occupancyData: occupancyOperation.data,
    loading: occupancyOperation.loading,
    error: occupancyOperation.error,
    saveOccupancyData,
    loadOccupancyData,
    reset: occupancyOperation.reset,
  };
};