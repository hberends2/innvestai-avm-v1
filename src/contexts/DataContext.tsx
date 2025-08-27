import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { getLocalData, setLocalData, STORAGE_KEYS } from '../hooks/database/supabaseClient';
import { RevenueCalculations } from '../types/revenueCalculations';
import { HistoricalExpenseData } from '../types/revenueCalculations';
import { Property } from '../types/PropertyTypes';

interface DataState {
  properties: Property[];
  occupancyData: Record<string, any>;
  financialSummaries: Record<string, any>;
  valuationData: any;
  revenueCalculations: RevenueCalculations | null;
  expenseData: HistoricalExpenseData | null;
  historicalData: any;
  loading: boolean;
  error: string | null;
}

type DataAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PROPERTIES'; payload: any[] }
  | { type: 'SET_OCCUPANCY_DATA'; payload: Record<string, any> }
  | { type: 'SET_FINANCIAL_SUMMARIES'; payload: Record<string, any> }
  | { type: 'SET_VALUATION_DATA'; payload: any }
  | { type: 'SET_REVENUE_CALCULATIONS'; payload: RevenueCalculations }
  | { type: 'SET_EXPENSE_DATA'; payload: HistoricalExpenseData }
  | { type: 'SET_HISTORICAL_DATA'; payload: any }
  | { type: 'UPDATE_PROPERTY'; payload: any }
  | { type: 'DELETE_PROPERTY'; payload: string }
  | { type: 'UPDATE_OCCUPANCY_DATA'; payload: { propertyId: string; data: any } };

const initialState: DataState = {
  properties: [],
  occupancyData: {},
  financialSummaries: {},
  valuationData: null,
  revenueCalculations: null,
  expenseData: null,
  historicalData: null,
  loading: false,
  error: null,
};

const dataReducer = (state: DataState, action: DataAction): DataState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PROPERTIES':
      return { ...state, properties: action.payload };
    case 'SET_OCCUPANCY_DATA':
      return { ...state, occupancyData: action.payload };
    case 'SET_FINANCIAL_SUMMARIES':
      return { ...state, financialSummaries: action.payload };
    case 'SET_VALUATION_DATA':
      return { ...state, valuationData: action.payload };
    case 'SET_REVENUE_CALCULATIONS':
      return { ...state, revenueCalculations: action.payload };
    case 'SET_EXPENSE_DATA':
      return { ...state, expenseData: action.payload };
    case 'SET_HISTORICAL_DATA':
      return { ...state, historicalData: action.payload };
    case 'UPDATE_PROPERTY':
      return {
        ...state,
        properties: state.properties.map(p => 
          p.id === action.payload.id ? action.payload : p
        )
      };
    case 'DELETE_PROPERTY':
      return {
        ...state,
        properties: state.properties.filter(p => p.id !== action.payload)
      };
    case 'UPDATE_OCCUPANCY_DATA':
      return {
        ...state,
        occupancyData: {
          ...state.occupancyData,
          [action.payload.propertyId]: action.payload.data
        }
      };
    default:
      return state;
  }
};

interface DataContextType {
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
  actions: {
    // Legacy actions - consider using modern hooks from src/hooks/modern/ instead
    loadAllData: () => Promise<void>;
    saveProperty: (property: Property) => Promise<void>;
    deleteProperty: (propertyId: string) => Promise<void>;
    saveOccupancyData: (propertyId: string, data: any) => Promise<void>;
    saveFinancialSummary: (propertyId: string, year: number, data: any) => Promise<void>;
    updateRevenueCalculations: (calculations: RevenueCalculations) => void;
    updateExpenseData: (data: HistoricalExpenseData) => void;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const loadAllData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Load all data from localStorage
      const properties = getLocalData(STORAGE_KEYS.PROPERTIES, []);
      const occupancyData = getLocalData(STORAGE_KEYS.OCCUPANCY_DATA, {});
      const financialSummaries = getLocalData(STORAGE_KEYS.FINANCIAL_SUMMARIES, {});
      const valuationData = getLocalData(STORAGE_KEYS.VALUATION_DATA, null);

      dispatch({ type: 'SET_PROPERTIES', payload: properties });
      dispatch({ type: 'SET_OCCUPANCY_DATA', payload: occupancyData });
      dispatch({ type: 'SET_FINANCIAL_SUMMARIES', payload: financialSummaries });
      dispatch({ type: 'SET_VALUATION_DATA', payload: valuationData });
      
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load data' });
      console.error('Error loading data:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveProperty = async (property: Property) => {
    try {
      const existingProperties = getLocalData(STORAGE_KEYS.PROPERTIES, []);
      const updatedProperties = property.id 
        ? existingProperties.map((p: any) => p.id === property.id ? property : p)
        : [...existingProperties, { ...property, id: Date.now().toString() }];
      
      setLocalData(STORAGE_KEYS.PROPERTIES, updatedProperties);
      dispatch({ type: 'SET_PROPERTIES', payload: updatedProperties });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save property' });
      throw error;
    }
  };

  const deleteProperty = async (propertyId: string) => {
    try {
      const updatedProperties = state.properties.filter(p => p.id !== propertyId);
      setLocalData(STORAGE_KEYS.PROPERTIES, updatedProperties);
      dispatch({ type: 'DELETE_PROPERTY', payload: propertyId });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete property' });
      throw error;
    }
  };

  const saveOccupancyData = async (propertyId: string, data: any) => {
    try {
      const updatedData = {
        ...state.occupancyData,
        [propertyId]: { ...data, updated_at: new Date().toISOString() }
      };
      setLocalData(STORAGE_KEYS.OCCUPANCY_DATA, updatedData);
      dispatch({ type: 'UPDATE_OCCUPANCY_DATA', payload: { propertyId, data } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save occupancy data' });
      throw error;
    }
  };

  const saveFinancialSummary = async (propertyId: string, year: number, data: any) => {
    try {
      const summaryKey = `${propertyId}_${year}`;
      const updatedSummaries = {
        ...state.financialSummaries,
        [summaryKey]: { ...data, updated_at: new Date().toISOString() }
      };
      setLocalData(STORAGE_KEYS.FINANCIAL_SUMMARIES, updatedSummaries);
      dispatch({ type: 'SET_FINANCIAL_SUMMARIES', payload: updatedSummaries });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save financial summary' });
      throw error;
    }
  };

  const updateRevenueCalculations = (calculations: RevenueCalculations) => {
    dispatch({ type: 'SET_REVENUE_CALCULATIONS', payload: calculations });
  };

  const updateExpenseData = (data: HistoricalExpenseData) => {
    dispatch({ type: 'SET_EXPENSE_DATA', payload: data });
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const actions = {
    loadAllData,
    saveProperty,
    deleteProperty,
    saveOccupancyData,
    saveFinancialSummary,
    updateRevenueCalculations,
    updateExpenseData,
  };

  return (
    <DataContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};