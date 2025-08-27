
import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import RevenueTable from "./RevenueTable";
import KPICards from "./KPICards";
import TabbedSummary from "./TabbedSummary";
import AppSidebar from "../AppSidebar";
import { formatCurrency, formatPercent } from "../../utils/calculationUtils";
import { ExpenseCalculationsProvider, useExpenseCalculations } from "./ExpenseCalculationsProvider";
import { useRevenueTableProps } from "../../hooks/useRevenueTableProps";
import { useTabbedSummaryProps } from "../../hooks/useTabbedSummaryProps";
import { useExpenseCalculationProviderProps } from "../../hooks/useExpenseCalculationProviderProps";

interface RevenueLayoutProps {
  activeSection: string | null;
  handleItemClick: (modalName: string) => void;
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: any;
  revenueCalculations: any;
  helpers: any;
}

const RevenueLayout: React.FC<RevenueLayoutProps> = ({
  activeSection,
  handleItemClick,
  roomsKeys,
  historicalYears,
  forecastYears,
  historicalData,
  revenueCalculations,
  helpers
}) => {
  // Extract prop management into focused custom hooks
  const { allRevenueTableProps } = useRevenueTableProps(
    revenueCalculations,
    helpers,
    roomsKeys,
    historicalYears,
    forecastYears,
    historicalData,
    formatCurrency,
    formatPercent
  );

  const tabbedSummaryProps = useTabbedSummaryProps(
    revenueCalculations,
    helpers,
    roomsKeys,
    historicalYears,
    forecastYears,
    historicalData,
    formatCurrency,
    formatPercent
  );

  const expenseProviderProps = useExpenseCalculationProviderProps(
    revenueCalculations,
    helpers,
    historicalYears
  );
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
        <AppSidebar onItemClick={handleItemClick} activeSection={activeSection} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-2 border-b bg-white">
            <SidebarTrigger />
          </div>
          <div className="p-6 flex-1 overflow-x-auto">
            <div className="min-w-max">
              <KPICards />

              <ExpenseCalculationsProvider {...expenseProviderProps}>
                <div className="mb-6">
                  <TabbedSummaryWithExpenseCalculations {...tabbedSummaryProps} />
                </div>
              </ExpenseCalculationsProvider>

              <RevenueTable {...allRevenueTableProps} />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

// Create a wrapper component that uses the expense calculations context
const TabbedSummaryWithExpenseCalculations: React.FC<any> = (props) => {
  const { calculateTotalExpense, calculateGrossOperatingProfit } = useExpenseCalculations();
  
  return (
    <TabbedSummary
      {...props}
      calculateTotalExpense={calculateTotalExpense}
      calculateGrossOperatingProfit={calculateGrossOperatingProfit}
    />
  );
};

export default RevenueLayout;
