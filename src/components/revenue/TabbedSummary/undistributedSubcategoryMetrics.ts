
import { MetricRow, TabbedSummaryProps } from './types';
import { historicalExpenseData } from './expenseData';

export const createUndistributedSubcategoryMetrics = (
  props: TabbedSummaryProps,
  allYears: number[]
): MetricRow[] => {
  const { historicalYears, forecastYears, formatCurrency } = props;

  // Helper function to calculate forecast expense (placeholder for now)
  const calculateForecastExpense = (year: number, expenseType: string) => {
    // For now, return 0 for forecast years since we don't have access to the expense calculation logic here
    // This would need to be connected to the actual expense calculation logic from the main revenue calculations
    return 0;
  };

  return [
    {
      label: "Administrative & General",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.administrativeGeneral[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'administrativeGeneral'));
        }
      }),
      isUndistributedSubcategory: true
    },
    {
      label: "Info & Tech Services",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.infoTechServices[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'infoTechServices'));
        }
      }),
      isUndistributedSubcategory: true
    },
    {
      label: "Sales & Marketing",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.salesMarketing[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'salesMarketing'));
        }
      }),
      isUndistributedSubcategory: true
    },
    {
      label: "Property Operations & Maintenance",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.propertyOperations[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'propertyOperations'));
        }
      }),
      isUndistributedSubcategory: true
    },
    {
      label: "Utilities",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(historicalExpenseData.utilities[year] || 0);
        } else {
          return formatCurrency(calculateForecastExpense(year, 'utilities'));
        }
      }),
      isUndistributedSubcategory: true
    }
  ];
};
