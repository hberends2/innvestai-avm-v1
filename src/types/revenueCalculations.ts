// ============= Revenue Calculation Types =============

// Historical Data Interfaces
export interface HistoricalRevenueData {
  roomsRevenue: Record<number, number>;
  revpar: Record<number, number>;
  revparYoY: Record<number, number>;
  occupancy: Record<number, number>;
  fbRevenue: Record<number, number>;
  resortFeeRevenue: Record<number, number>;
  otherOperatedRevenue: Record<number, number>;
  miscellaneousRevenue: Record<number, number>;
  allocatedRevenue: Record<number, number>;
}

export interface HistoricalExpenseData {
  rooms: Record<number, number>;
  fb: Record<number, number>;
  otherOperated: Record<number, number>;
  miscellaneous: Record<number, number>;
  allocated: Record<number, number>;
  propertyOperations: Record<number, number>;
  administrativeGeneral: Record<number, number>;
  infoTechServices: Record<number, number>;
  salesMarketing: Record<number, number>;
  utilities: Record<number, number>;
  managementFees: Record<number, number>;
  realEstateTaxes: Record<number, number>;
  insurance: Record<number, number>;
  otherNonOp: Record<number, number>;
}

// Input Data Interfaces
export interface ExpenseInputData {
  roomsExpenseInput: Record<number, string>;
  fbExpenseInput: Record<number, string>;
  otherOperatedExpenseInput: Record<number, string>;
  miscellaneousExpenseInput: Record<number, string>;
  allocatedExpenseInput: Record<number, string>;
  propertyOperationsExpenseInput: Record<number, string>;
  administrativeGeneralExpenseInput: Record<number, string>;
  infoTechServicesExpenseInput: Record<number, string>;
  salesMarketingExpenseInput: Record<number, string>;
  utilitiesExpenseInput: Record<number, string>;
  managementFeesExpenseInput: Record<number, string>;
  realEstateTaxesExpenseInput: Record<number, string>;
  insuranceExpenseInput: Record<number, string>;
  otherNonOpExpenseInput: Record<number, string>;
  reserveForReplacementInput: Record<number, string>;
}

export interface RevenueInputData {
  fbPerOccupiedRoom: Record<number, string>;
  resortFeePerOccupiedRoom: Record<number, string>;
  otherOperatedPerOccupiedRoom: Record<number, string>;
  miscellaneousPerOccupiedRoom: Record<number, string>;
  allocatedPerOccupiedRoom: Record<number, string>;
  occupancyForecast: Record<number, string>;
  occupancyYoYGrowth: Record<number, string>;
  yearlyAdrGrowth: Record<number, string>;
}

// Calculation Helpers Interface
export interface CalculationHelpers {
  getHistoricalOccupiedRoomsForYear: (year: number) => number;
  getForecastOccupiedRoomsForYear: (year: number) => number;
  getHistoricalADRForYear: (year: number) => number;
  getForecastADRForYear: (year: number) => number;
  calculateTotalOtherOperatedRevenue: (year: number, isHistorical: boolean) => number;
  calculateTotalRevenue: (year: number, isHistorical: boolean) => number;
}

// Extended Calculation Helpers for Revenue Components
export interface ExtendedCalculationHelpers extends CalculationHelpers {
  getFbPerOccupiedRoomForYear?: (year: number) => number;
  getOtherOperatedPerOccupiedRoomForYear?: (year: number) => number;
  getMiscellaneousPerOccupiedRoomForYear?: (year: number) => number;
  getHistoricalOccupiedRooms?: (year: number) => number;
}

// Partial Historical Data for backwards compatibility
export interface PartialHistoricalRevenueData {
  roomsRevenue?: Record<number, number>;
  revpar?: Record<number, number>;
  revparYoY?: Record<number, number>;
  occupancy?: Record<number, number>;
  fbRevenue?: Record<number, number>;
  resortFeeRevenue?: Record<number, number>;
  otherOperatedRevenue?: Record<number, number>;
  miscellaneousRevenue?: Record<number, number>;
  allocatedRevenue?: Record<number, number>;
}

// Expense Calculation Functions Interface
export interface ExpenseCalculationFunctions {
  calculateExpense: (
    year: number, 
    inputValue: string, 
    calculationMethod: string, 
    expenseType?: string, 
    historicalData?: HistoricalRevenueData
  ) => number;
  calculateNonOpExpense: (year: number, inputValue: string) => number;
  getHistoricalExpenseData: (
    year: number, 
    expenseType: string, 
    calculationMethod?: string, 
    historicalData?: HistoricalRevenueData
  ) => string;
  getHistoricalNonOpExpenseData: (year: number, expenseType: string) => string;
  calculateTotalOtherOperatedExpense: (year: number, expenseInputs: {
    fbExpenseInput: Record<number, string>;
    otherOperatedExpenseInput: Record<number, string>;
    miscellaneousExpenseInput: Record<number, string>;
    allocatedExpenseInput: Record<number, string>;
  }) => number;
  calculateTotalUndistributedExpenses: (year: number, historicalYears: number[], expenseInputs: {
    propertyOperationsExpenseInput: Record<number, string>;
    administrativeGeneralExpenseInput: Record<number, string>;
    infoTechServicesExpenseInput: Record<number, string>;
    salesMarketingExpenseInput: Record<number, string>;
    utilitiesExpenseInput: Record<number, string>;
  }) => number;
  calculateTotalNonOperatingExpenses: (year: number, historicalYears: number[], nonOpExpenseInputs: {
    managementFeesExpenseInput?: Record<number, string>;
    realEstateTaxesExpenseInput?: Record<number, string>;
    insuranceExpenseInput?: Record<number, string>;
    otherNonOpExpenseInput?: Record<number, string>;
  }) => number;
  getTotalHistoricalOtherOperatedExpense: (year: number) => number;
}

// Revenue Calculation Functions Interface
export interface RevenueCalculationFunctions {
  getForecastRoomsRevenue: (year: number) => number;
  getForecastRevpar: (year: number) => number;
  calculateOccupancyFromYoY: (year: number) => number;
  getAvailableRooms: (year: number) => number;
}

// Complete Revenue Calculations Interface
export interface RevenueCalculations extends RevenueCalculationFunctions {
  // Add any additional revenue calculation methods here
}

// Expense Type Definitions
export type ExpenseType = 
  | 'rooms' 
  | 'fb' 
  | 'otherOperated' 
  | 'miscellaneous' 
  | 'allocated'
  | 'propertyOperations'
  | 'administrativeGeneral'
  | 'infoTechServices'
  | 'salesMarketing'
  | 'utilities'
  | 'managementFees'
  | 'realEstateTaxes'
  | 'insurance'
  | 'otherNonOp';

export type CalculationMethod = 'POR' | '% of Revenue' | 'Manual Input';

// Financial Summary Interface
export interface FinancialSummaryData {
  year: number;
  revenueData: Record<string, number>;
  expenseData: Record<string, number>;
  totalRevenue: number;
  totalExpense: number;
  ebitda: number;
  reserveForReplacement: number;
  netOperatingIncome: number;
}