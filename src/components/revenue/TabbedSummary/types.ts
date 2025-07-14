
export interface MetricRow {
  label: string | React.ReactNode;
  data: (string | React.ReactNode)[];
  isExpanded?: boolean;
  onToggle?: () => void;
  indent?: boolean;
  isSubcategory?: boolean;
  isUndistributedSubcategory?: boolean;
  isCollapsible?: boolean;
  isUndistributed?: boolean;
}

export interface TabbedSummaryProps {
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
  occupancyForecast: Record<number, string>;
  occupancyForecastMethod: string;
  calculateOccupancyFromYoY: (year: number) => number;
  getAvailableRooms: (year: number) => number;
  getForecastRoomsRevenue: (year: number) => number;
  getHistoricalADR: (year: number) => number;
  getForecastADR: (year: number) => number;
  getForecastRevpar: (year: number) => number;
  fbPerOccupiedRoom: Record<number, string>;
  resortFeePerOccupiedRoom: Record<number, string>;
  otherOperatedPerOccupiedRoom: Record<number, string>;
  miscellaneousPerOccupiedRoom: Record<number, string>;
  allocatedPerOccupiedRoom: Record<number, string>;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  calculateTotalExpense?: (year: number) => number;
  calculateGrossOperatingProfit?: (year: number) => number;
  helpers?: any; // Add helpers to the props interface
}
