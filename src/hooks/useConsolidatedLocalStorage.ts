import { useCallback } from 'react';
import { getLocalData, setLocalData, removeLocalData, STORAGE_KEYS } from './database/supabaseClient';

/**
 * Consolidated localStorage operations with better error handling and type safety
 */
export const useConsolidatedLocalStorage = () => {
  
  const getStorageData = useCallback(<T>(key: string, defaultValue: T): T => {
    return getLocalData(key, defaultValue);
  }, []);

  const setStorageData = useCallback(<T>(key: string, value: T): boolean => {
    try {
      setLocalData(key, value);
      return true;
    } catch (error) {
      console.error(`Failed to save data to ${key}:`, error);
      return false;
    }
  }, []);

  const removeStorageData = useCallback((key: string): boolean => {
    try {
      removeLocalData(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove data from ${key}:`, error);
      return false;
    }
  }, []);

  const clearAllData = useCallback((): boolean => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        removeLocalData(key);
      });
      return true;
    } catch (error) {
      console.error('Failed to clear all data:', error);
      return false;
    }
  }, []);

  const exportData = useCallback((): Record<string, any> => {
    const exportData: Record<string, any> = {};
    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      exportData[name] = getLocalData(key, null);
    });
    return exportData;
  }, []);

  const importData = useCallback((data: Record<string, any>): boolean => {
    try {
      Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
        if (data[name] !== undefined) {
          setLocalData(key, data[name]);
        }
      });
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }, []);

  const getDataSize = useCallback((): number => {
    let totalSize = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        totalSize += new Blob([data]).size;
      }
    });
    return totalSize;
  }, []);

  return {
    // Basic operations
    getStorageData,
    setStorageData,
    removeStorageData,
    
    // Bulk operations
    clearAllData,
    exportData,
    importData,
    
    // Utilities
    getDataSize,
    
    // Storage keys for reference
    STORAGE_KEYS,
  };
};