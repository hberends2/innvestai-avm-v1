/**
 * Modern hooks export - centralized access to new architecture patterns
 */

export { useAsyncOperation } from './useAsyncOperation';
export { usePropertyData } from './usePropertyData';
export { useOccupancyData } from './useOccupancyData';
export { useFinancialData } from './useFinancialData';

export type { AsyncOperationState, AsyncOperationOptions } from './useAsyncOperation';
export type { OccupancyData } from './useOccupancyData';
export type { FinancialCalculationInput } from './useFinancialData';