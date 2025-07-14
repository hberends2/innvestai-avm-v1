
// Simple localStorage-based client for development
// This will be replaced with actual Supabase integration

export const STORAGE_KEYS = {
  PROPERTIES: 'properties',
  OCCUPANCY_DATA: 'occupancy_data',
  FINANCIAL_SUMMARIES: 'financial_summaries'
} as const;

export const getLocalData = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key ${key}:`, error);
    return defaultValue;
  }
};

export const setLocalData = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key ${key}:`, error);
  }
};

export const removeLocalData = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key ${key}:`, error);
  }
};
