
import { 
  PartialHistoricalRevenueData, 
  HistoricalExpenseData, 
  ExtendedCalculationHelpers 
} from '../../types/revenueCalculations';

export class ExpenseInputHandlers {
  constructor(
    private dropdownValue: string,
    private expenseType: string,
    private historicalData: PartialHistoricalRevenueData,
    private historicalExpenseData: HistoricalExpenseData,
    private formatCurrency: (value: number) => string,
    private helpers: ExtendedCalculationHelpers
  ) {}

  calculateExpense = (year: number, inputValue: string): number => {
    const input = parseFloat(inputValue || "0");
    
    if (this.dropdownValue === "POR") {
      const occupiedRooms = this.helpers?.getForecastOccupiedRoomsForYear ? 
        this.helpers.getForecastOccupiedRoomsForYear(year) : 0;
      return input * occupiedRooms;
    } else if (this.dropdownValue === "% of Revenue") {
      // Get the department revenue for this year
      let departmentRevenue = 0;
      
      // Check if this is a historical year (has data in historicalData)
      const isHistoricalYear = this.historicalData?.fbRevenue?.[year] !== undefined;
      
      if (isHistoricalYear) {
        // Use historical data
        if (this.expenseType === "fb") {
          departmentRevenue = this.historicalData?.fbRevenue?.[year] || 0;
        } else if (this.expenseType === "otherOperated") {
          departmentRevenue = this.historicalData?.otherOperatedRevenue?.[year] || 0;
        } else if (this.expenseType === "miscellaneous") {
          departmentRevenue = this.historicalData?.miscellaneousRevenue?.[year] || 0;
        }
      } else {
        // For forecast years, calculate department revenue from per-occupied-room inputs
        const occupiedRooms = this.helpers?.getForecastOccupiedRoomsForYear ? 
          this.helpers.getForecastOccupiedRoomsForYear(year) : 0;
        
        if (this.expenseType === "fb") {
          // Get F&B per occupied room input for this year
          const fbPerRoom = this.helpers?.getFbPerOccupiedRoomForYear ? 
            this.helpers.getFbPerOccupiedRoomForYear(year) : 0;
          departmentRevenue = fbPerRoom * occupiedRooms;
        } else if (this.expenseType === "otherOperated") {
          // Get Other Operated per occupied room input for this year
          const otherOperatedPerRoom = this.helpers?.getOtherOperatedPerOccupiedRoomForYear ? 
            this.helpers.getOtherOperatedPerOccupiedRoomForYear(year) : 0;
          departmentRevenue = otherOperatedPerRoom * occupiedRooms;
        } else if (this.expenseType === "miscellaneous") {
          // Get Miscellaneous per occupied room input for this year
          const miscellaneousPerRoom = this.helpers?.getMiscellaneousPerOccupiedRoomForYear ? 
            this.helpers.getMiscellaneousPerOccupiedRoomForYear(year) : 0;
          departmentRevenue = miscellaneousPerRoom * occupiedRooms;
        }
      }
      
      return (input / 100) * departmentRevenue;
    } else {
      // Manual Input
      return input;
    }
  };

  private getHistoricalOccupiedRooms = (year: number): number => {
    const occupancyPercent = this.historicalData?.occupancy?.[year] || 0;
    const roomsKeys = 108; // Total rooms from config
    const daysInYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 366 : 365;
    const availableRooms = roomsKeys * daysInYear;
    const occupancyDecimal = occupancyPercent / 100;
    return Math.round(availableRooms * occupancyDecimal);
  };

  getHistoricalExpenseData = (year: number): string => {
    // Get the total historical expense for this category and year
    const totalExpense = (this.historicalExpenseData as any)?.[this.expenseType]?.[year] || 0;
    
    if (this.dropdownValue === "POR") {
      const occupiedRooms = this.getHistoricalOccupiedRooms(year);
      const perRoom = occupiedRooms > 0 ? totalExpense / occupiedRooms : 0;
      return Math.round(perRoom).toString();
    } else if (this.dropdownValue === "% of Revenue") {
      // Use the respective department's revenue
      let departmentRevenue = 0;
      if (this.expenseType === "fb") {
        departmentRevenue = this.historicalData?.fbRevenue?.[year] || 0;
      } else if (this.expenseType === "otherOperated") {
        departmentRevenue = this.historicalData?.otherOperatedRevenue?.[year] || 0;
      } else if (this.expenseType === "miscellaneous") {
        departmentRevenue = this.historicalData?.miscellaneousRevenue?.[year] || 0;
      }
      const percentage = departmentRevenue > 0 ? (totalExpense / departmentRevenue) * 100 : 0;
      return percentage.toFixed(1);
    } else {
      // Manual Input - show the historical expense amount
      return this.formatCurrency(totalExpense).replace('$', '').replace(/,/g, '');
    }
  };

  // Clean input during onChange - minimal cleaning to allow natural typing
  cleanInputValue = (value: string): string => {
    if (this.dropdownValue === "% of Revenue") {
      // For percentage: allow numbers, decimal point, remove everything else
      return value.replace(/[^0-9.]/g, '');
    } else {
      // For currency: allow numbers, decimal point, remove everything else
      return value.replace(/[^0-9.]/g, '');
    }
  };

  // Format display value for showing when not editing
  formatDisplayValue = (value: string): string => {
    if (!value || value === "0" || value === "0.0") return "";
    
    const numValue = parseFloat(value || "0");
    if (isNaN(numValue)) return "";
    
    if (this.dropdownValue === "% of Revenue") {
      return `${numValue}%`;
    } else {
      return `$${Math.round(numValue).toLocaleString('en-US')}`;
    }
  };

  // Parse display value back to raw value for editing
  parseDisplayValue = (displayValue: string): string => {
    if (!displayValue) return "";
    
    if (this.dropdownValue === "% of Revenue") {
      const numValue = parseFloat(displayValue.replace('%', ''));
      return isNaN(numValue) ? "" : numValue.toString();
    } else {
      const numValue = parseFloat(displayValue.replace(/[$,]/g, ''));
      return isNaN(numValue) ? "" : numValue.toString();
    }
  };

  // Custom input handlers - keep raw values, no rounding
  handleCustomExpenseChange = (
    year: number, 
    value: string, 
    originalHandler: (year: number, value: string) => void
  ): void => {
    // Clean the input but don't format it - allow natural typing and preserve decimals
    const cleanValue = this.cleanInputValue(value);
    originalHandler(year, cleanValue);
  };

  handleCustomExpenseBlur = (
    year: number, 
    value: string, 
    originalHandler: (year: number, value: string) => void
  ): void => {
    // Clean but keep raw decimal values - NO ROUNDING
    const cleanValue = this.cleanInputValue(value);
    const numValue = parseFloat(cleanValue || "0");
    
    // Store the raw decimal value without any rounding
    const formattedValue = isNaN(numValue) ? "0" : numValue.toString();
    originalHandler(year, formattedValue);
  };
}
