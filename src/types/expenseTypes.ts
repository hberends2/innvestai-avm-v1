// ============= Expense Specific Types =============

import { 
  HistoricalExpenseData, 
  ExpenseInputData, 
  CalculationHelpers,
  ExpenseType,
  CalculationMethod 
} from './revenueCalculations';

// Expense Input Handlers Interface
export interface ExpenseInputHandlerInterface {
  calculateExpense: (year: number, inputValue: string) => number;
  getHistoricalExpenseData: (year: number) => string;
  cleanInputValue: (value: string) => string;
  formatDisplayValue: (value: string) => string;
  parseDisplayValue: (displayValue: string) => string;
  handleCustomExpenseChange: (
    year: number, 
    value: string, 
    originalHandler: (year: number, value: string) => void
  ) => void;
  handleCustomExpenseBlur: (
    year: number, 
    value: string, 
    originalHandler: (year: number, value: string) => void
  ) => void;
}

// Expense Section Props Interface
export interface ExpenseSectionProps {
  label: string;
  expenseType: ExpenseType;
  historicalYears: number[];
  forecastYears: number[];
  formatCurrency: (value: number) => string;
  historicalExpenseData: HistoricalExpenseData;
  expenseInputs: ExpenseInputData;
  helpers: CalculationHelpers;
  calculationMethod: CalculationMethod;
  onMethodChange: (method: CalculationMethod) => void;
  onInputChange: (year: number, value: string) => void;
  onInputBlur: (year: number, value: string) => void;
}

// Expense Calculation Context Interface
export interface ExpenseCalculationContextType {
  calculateTotalExpense: (year: number) => number;
  getTotalHistoricalExpense: (year: number) => number;
  calculateGrossOperatingProfit: (year: number) => number;
  getPreCalculatedGOP: (year: number) => Promise<number | null>;
  saveFinancialSummary: (year: number, revenueData: any, expenseData: any) => Promise<void>;
}

// Expense Provider Props Interface  
export interface ExpenseCalculationsProviderProps {
  children: React.ReactNode;
  historicalYears: number[];
  forecastYears: number[];
  historicalExpenseData: HistoricalExpenseData;
  expenseInputData: ExpenseInputData;
  helpers: CalculationHelpers;
  expenseForecastMethod: CalculationMethod;
}