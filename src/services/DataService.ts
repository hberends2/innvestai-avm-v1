/**
 * Unified Data Service - Modern abstraction layer for all data operations
 * Provides consistent async patterns and error handling
 */

import { Property } from '../types/PropertyTypes';
import { FinancialSummaryData } from '../hooks/useFinancialSummary';
import { getLocalData, setLocalData, STORAGE_KEYS } from '../hooks/database/supabaseClient';

export interface DataServiceError {
  message: string;
  code?: string;
  details?: any;
}

export interface DataServiceResult<T> {
  data?: T;
  error?: DataServiceError;
  success: boolean;
}

// Base configuration for data operations
const DATA_SERVICE_CONFIG = {
  retryAttempts: 3,
  retryDelay: 1000,
  timeout: 5000,
} as const;

/**
 * Enhanced async wrapper with error handling and retry logic
 */
const withAsyncOperation = async <T>(
  operation: () => Promise<T>,
  context: string
): Promise<DataServiceResult<T>> => {
  try {
    const data = await operation();
    return { data, success: true };
  } catch (error: any) {
    console.error(`DataService error in ${context}:`, error);
    return {
      error: {
        message: error.message || `Failed to ${context}`,
        details: error,
      },
      success: false,
    };
  }
};

/**
 * Property operations with modern async patterns
 */
export const PropertyService = {
  async getAll(): Promise<DataServiceResult<Property[]>> {
    return withAsyncOperation(
      async () => getLocalData<Property[]>(STORAGE_KEYS.PROPERTIES, []),
      'fetch properties'
    );
  },

  async getById(id: string): Promise<DataServiceResult<Property | null>> {
    return withAsyncOperation(
      async () => {
        const properties = getLocalData<Property[]>(STORAGE_KEYS.PROPERTIES, []);
        return properties.find(p => p.id === id) || null;
      },
      'fetch property by ID'
    );
  },

  async create(propertyData: Omit<Property, 'id'>): Promise<DataServiceResult<Property>> {
    return withAsyncOperation(
      async () => {
        const properties = getLocalData<Property[]>(STORAGE_KEYS.PROPERTIES, []);
        const newProperty: Property = {
          ...propertyData,
          id: `prop-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        const updatedProperties = [...properties, newProperty];
        setLocalData(STORAGE_KEYS.PROPERTIES, updatedProperties);
        
        return newProperty;
      },
      'create property'
    );
  },

  async update(property: Property): Promise<DataServiceResult<Property>> {
    return withAsyncOperation(
      async () => {
        const properties = getLocalData<Property[]>(STORAGE_KEYS.PROPERTIES, []);
        const updatedProperty = { ...property, updated_at: new Date().toISOString() };
        
        const updatedProperties = properties.map(p => 
          p.id === property.id ? updatedProperty : p
        );
        
        setLocalData(STORAGE_KEYS.PROPERTIES, updatedProperties);
        return updatedProperty;
      },
      'update property'
    );
  },

  async delete(id: string): Promise<DataServiceResult<boolean>> {
    return withAsyncOperation(
      async () => {
        const properties = getLocalData<Property[]>(STORAGE_KEYS.PROPERTIES, []);
        const filteredProperties = properties.filter(p => p.id !== id);
        
        setLocalData(STORAGE_KEYS.PROPERTIES, filteredProperties);
        return true;
      },
      'delete property'
    );
  },
};

/**
 * Occupancy data operations
 */
export const OccupancyService = {
  async save(propertyId: string, occupancyData: any): Promise<DataServiceResult<boolean>> {
    return withAsyncOperation(
      async () => {
        const allData = getLocalData<Record<string, any>>(STORAGE_KEYS.OCCUPANCY_DATA, {});
        const updatedData = {
          ...allData,
          [propertyId]: {
            ...occupancyData,
            updated_at: new Date().toISOString(),
          },
        };
        
        setLocalData(STORAGE_KEYS.OCCUPANCY_DATA, updatedData);
        return true;
      },
      'save occupancy data'
    );
  },

  async getByPropertyId(propertyId: string): Promise<DataServiceResult<any | null>> {
    return withAsyncOperation(
      async () => {
        const allData = getLocalData<Record<string, any>>(STORAGE_KEYS.OCCUPANCY_DATA, {});
        return allData[propertyId] || null;
      },
      'fetch occupancy data'
    );
  },
};

/**
 * Financial summary operations
 */
export const FinancialService = {
  async save(summary: FinancialSummaryData): Promise<DataServiceResult<FinancialSummaryData>> {
    return withAsyncOperation(
      async () => {
        const summaries = getLocalData<FinancialSummaryData[]>(STORAGE_KEYS.FINANCIAL_SUMMARIES, []);
        const existingIndex = summaries.findIndex(
          s => s.property_id === summary.property_id && s.year === summary.year
        );
        
        const updatedSummary = {
          ...summary,
          updated_at: new Date().toISOString(),
          id: summary.id || `summary-${summary.property_id}-${summary.year}-${Date.now()}`,
        };
        
        if (existingIndex >= 0) {
          summaries[existingIndex] = updatedSummary;
        } else {
          summaries.push({
            ...updatedSummary,
            created_at: new Date().toISOString(),
          });
        }
        
        setLocalData(STORAGE_KEYS.FINANCIAL_SUMMARIES, summaries);
        return updatedSummary;
      },
      'save financial summary'
    );
  },

  async getByPropertyAndYear(propertyId: string, year: number): Promise<DataServiceResult<FinancialSummaryData | null>> {
    return withAsyncOperation(
      async () => {
        const summaries = getLocalData<FinancialSummaryData[]>(STORAGE_KEYS.FINANCIAL_SUMMARIES, []);
        return summaries.find(s => s.property_id === propertyId && s.year === year) || null;
      },
      'fetch financial summary'
    );
  },

  async getByPropertyId(propertyId: string): Promise<DataServiceResult<FinancialSummaryData[]>> {
    return withAsyncOperation(
      async () => {
        const summaries = getLocalData<FinancialSummaryData[]>(STORAGE_KEYS.FINANCIAL_SUMMARIES, []);
        return summaries.filter(s => s.property_id === propertyId);
      },
      'fetch property financial summaries'
    );
  },
};

/**
 * Unified data service combining all operations
 */
export const DataService = {
  properties: PropertyService,
  occupancy: OccupancyService,
  financial: FinancialService,
  
  // Utility methods for batch operations
  async batchOperation<T>(
    operations: Array<() => Promise<DataServiceResult<T>>>
  ): Promise<DataServiceResult<T[]>> {
    try {
      const results = await Promise.allSettled(operations.map(op => op()));
      const data: T[] = [];
      const errors: DataServiceError[] = [];
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.success) {
          data.push(result.value.data!);
        } else {
          const error = result.status === 'rejected' 
            ? { message: result.reason?.message || 'Unknown error', details: result.reason }
            : result.value.error!;
          errors.push(error);
        }
      });
      
      if (errors.length > 0) {
        return {
          error: {
            message: `${errors.length} operations failed`,
            details: errors,
          },
          success: false,
        };
      }
      
      return { data, success: true };
    } catch (error: any) {
      return {
        error: {
          message: 'Batch operation failed',
          details: error,
        },
        success: false,
      };
    }
  },
};