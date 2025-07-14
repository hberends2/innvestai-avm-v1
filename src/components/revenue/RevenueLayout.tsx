import React from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import RevenueTable from "./RevenueTable";
import KPICards from "./KPICards";
import TabbedSummary from "./TabbedSummary";
import AppSidebar from "../AppSidebar";
import { formatCurrency, formatPercent } from "../../utils/calculationUtils";
import { ExpenseCalculationsProvider, useExpenseCalculations } from "./ExpenseCalculationsProvider";

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
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
        <AppSidebar onItemClick={handleItemClick} activeSection={activeSection} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-2 border-b bg-white">
            <SidebarTrigger />
          </div>
          <div className="p-6 flex-1 flex flex-col overflow-hidden">
            <KPICards />

            <ExpenseCalculationsProvider
              expenseForecastMethod={revenueCalculations.expenseForecastMethod}
              helpers={helpers}
              historicalYears={historicalYears}
              roomsExpenseInput={revenueCalculations.roomsExpenseInput}
              fbExpenseInput={revenueCalculations.fbExpenseInput}
              otherOperatedExpenseInput={revenueCalculations.otherOperatedExpenseInput}
              miscellaneousExpenseInput={revenueCalculations.miscellaneousExpenseInput}
              allocatedExpenseInput={revenueCalculations.allocatedExpenseInput}
              propertyOperationsExpenseInput={revenueCalculations.propertyOperationsExpenseInput}
              administrativeGeneralExpenseInput={revenueCalculations.administrativeGeneralExpenseInput}
              infoTechServicesExpenseInput={revenueCalculations.infoTechServicesExpenseInput}
              salesMarketingExpenseInput={revenueCalculations.salesMarketingExpenseInput}
              utilitiesExpenseInput={revenueCalculations.utilitiesExpenseInput}
              managementFeesExpenseInput={revenueCalculations.managementFeesExpenseInput}
              realEstateTaxesExpenseInput={revenueCalculations.realEstateTaxesExpenseInput}
              insuranceExpenseInput={revenueCalculations.insuranceExpenseInput}
              otherNonOpExpenseInput={revenueCalculations.otherNonOpExpenseInput}
            >
              <TabbedSummaryWithExpenseCalculations
                roomsKeys={roomsKeys}
                historicalYears={historicalYears}
                forecastYears={forecastYears}
                historicalData={historicalData}
                occupancyForecast={revenueCalculations.occupancyForecast}
                occupancyForecastMethod={revenueCalculations.occupancyForecastMethod}
                calculateOccupancyFromYoY={helpers.calculateOccupancyFromYoYForYear}
                getAvailableRooms={helpers.getAvailableRoomsForYear}
                getForecastRoomsRevenue={helpers.getForecastRoomsRevenueForYear}
                getHistoricalADR={helpers.getHistoricalADRForYearCalculated}
                getForecastADR={helpers.getForecastADRForYear}
                getForecastRevpar={helpers.getForecastRevparForYear}
                fbPerOccupiedRoom={revenueCalculations.fbPerOccupiedRoom}
                resortFeePerOccupiedRoom={revenueCalculations.resortFeePerOccupiedRoom}
                otherOperatedPerOccupiedRoom={revenueCalculations.otherOperatedPerOccupiedRoom}
                miscellaneousPerOccupiedRoom={revenueCalculations.miscellaneousPerOccupiedRoom}
                allocatedPerOccupiedRoom={revenueCalculations.allocatedPerOccupiedRoom}
                formatCurrency={formatCurrency}
                formatPercent={formatPercent}
                helpers={helpers} // Pass the main helpers
              />
            </ExpenseCalculationsProvider>

            <div className="flex-1 min-h-0 flex flex-col">
              <RevenueTable 
                roomsKeys={roomsKeys} 
                historicalYears={historicalYears} 
                forecastYears={forecastYears} 
                historicalData={historicalData} 
                adrGrowthType={revenueCalculations.adrGrowthType} 
                setAdrGrowthType={revenueCalculations.setAdrGrowthType} 
                flatAdrGrowth={revenueCalculations.flatAdrGrowth} 
                setFlatAdrGrowth={revenueCalculations.setFlatAdrGrowth} 
                yearlyAdrGrowth={revenueCalculations.yearlyAdrGrowth} 
                handleYearlyAdrChange={revenueCalculations.handleYearlyAdrChange} 
                occupancyForecast={revenueCalculations.occupancyForecast} 
                handleOccupancyChange={revenueCalculations.handleOccupancyChange} 
                occupancyForecastMethod={revenueCalculations.occupancyForecastMethod} 
                setOccupancyForecastMethod={revenueCalculations.setOccupancyForecastMethod} 
                occupancyYoYGrowth={revenueCalculations.occupancyYoYGrowth} 
                handleOccupancyYoYChange={revenueCalculations.handleOccupancyYoYChange} 
                calculateOccupancyFromYoY={helpers.calculateOccupancyFromYoYForYear} 
                getAvailableRooms={helpers.getAvailableRoomsForYear} 
                getForecastRevpar={helpers.getForecastRevparForYear} 
                getForecastRoomsRevenue={helpers.getForecastRoomsRevenueForYear} 
                fbPerOccupiedRoom={revenueCalculations.fbPerOccupiedRoom} 
                handleFbPerOccupiedRoomChange={revenueCalculations.handleFbPerOccupiedRoomChange} 
                handleFbPerOccupiedRoomBlur={revenueCalculations.handleFbPerOccupiedRoomBlur}
                resortFeePerOccupiedRoom={revenueCalculations.resortFeePerOccupiedRoom}
                handleResortFeePerOccupiedRoomChange={revenueCalculations.handleResortFeePerOccupiedRoomChange}
                handleResortFeePerOccupiedRoomBlur={revenueCalculations.handleResortFeePerOccupiedRoomBlur}
                otherOperatedPerOccupiedRoom={revenueCalculations.otherOperatedPerOccupiedRoom}
                handleOtherOperatedPerOccupiedRoomChange={revenueCalculations.handleOtherOperatedPerOccupiedRoomChange}
                handleOtherOperatedPerOccupiedRoomBlur={revenueCalculations.handleOtherOperatedPerOccupiedRoomBlur}
                miscellaneousPerOccupiedRoom={revenueCalculations.miscellaneousPerOccupiedRoom}
                handleMiscellaneousPerOccupiedRoomChange={revenueCalculations.handleMiscellaneousPerOccupiedRoomChange}
                handleMiscellaneousPerOccupiedRoomBlur={revenueCalculations.handleMiscellaneousPerOccupiedRoomBlur}
                allocatedPerOccupiedRoom={revenueCalculations.allocatedPerOccupiedRoom}
                handleAllocatedPerOccupiedRoomChange={revenueCalculations.handleAllocatedPerOccupiedRoomChange}
                handleAllocatedPerOccupiedRoomBlur={revenueCalculations.handleAllocatedPerOccupiedRoomBlur}
                formatCurrency={formatCurrency} 
                formatPercent={formatPercent}
                expenseForecastMethod={revenueCalculations.expenseForecastMethod}
                setExpenseForecastMethod={revenueCalculations.setExpenseForecastMethod}
                roomsExpenseInput={revenueCalculations.roomsExpenseInput}
                handleRoomsExpenseChange={revenueCalculations.handleRoomsExpenseChange}
                handleRoomsExpenseBlur={revenueCalculations.handleRoomsExpenseBlur}
                fbExpenseInput={revenueCalculations.fbExpenseInput}
                handleFbExpenseChange={revenueCalculations.handleFbExpenseChange}
                handleFbExpenseBlur={revenueCalculations.handleFbExpenseBlur}
                resortFeeExpenseInput={revenueCalculations.resortFeeExpenseInput}
                handleResortFeeExpenseChange={revenueCalculations.handleResortFeeExpenseChange}
                handleResortFeeExpenseBlur={revenueCalculations.handleResortFeeExpenseBlur}
                otherOperatedExpenseInput={revenueCalculations.otherOperatedExpenseInput}
                handleOtherOperatedExpenseChange={revenueCalculations.handleOtherOperatedExpenseChange}
                handleOtherOperatedExpenseBlur={revenueCalculations.handleOtherOperatedExpenseBlur}
                miscellaneousExpenseInput={revenueCalculations.miscellaneousExpenseInput}
                handleMiscellaneousExpenseChange={revenueCalculations.handleMiscellaneousExpenseChange}
                handleMiscellaneousExpenseBlur={revenueCalculations.handleMiscellaneousExpenseBlur}
                allocatedExpenseInput={revenueCalculations.allocatedExpenseInput}
                handleAllocatedExpenseChange={revenueCalculations.handleAllocatedExpenseChange}
                handleAllocatedExpenseBlur={revenueCalculations.handleAllocatedExpenseBlur}
                propertyOperationsExpenseInput={revenueCalculations.propertyOperationsExpenseInput}
                handlePropertyOperationsExpenseChange={revenueCalculations.handlePropertyOperationsExpenseChange}
                handlePropertyOperationsExpenseBlur={revenueCalculations.handlePropertyOperationsExpenseBlur}
                administrativeGeneralExpenseInput={revenueCalculations.administrativeGeneralExpenseInput}
                handleAdministrativeGeneralExpenseChange={revenueCalculations.handleAdministrativeGeneralExpenseChange}
                handleAdministrativeGeneralExpenseBlur={revenueCalculations.handleAdministrativeGeneralExpenseBlur}
                infoTechServicesExpenseInput={revenueCalculations.infoTechServicesExpenseInput}
                handleInfoTechServicesExpenseChange={revenueCalculations.handleInfoTechServicesExpenseChange}
                handleInfoTechServicesExpenseBlur={revenueCalculations.handleInfoTechServicesExpenseBlur}
                salesMarketingExpenseInput={revenueCalculations.salesMarketingExpenseInput}
                handleSalesMarketingExpenseChange={revenueCalculations.handleSalesMarketingExpenseChange}
                handleSalesMarketingExpenseBlur={revenueCalculations.handleSalesMarketingExpenseBlur}
                utilitiesExpenseInput={revenueCalculations.utilitiesExpenseInput}
                handleUtilitiesExpenseChange={revenueCalculations.handleUtilitiesExpenseChange}
                handleUtilitiesExpenseBlur={revenueCalculations.handleUtilitiesExpenseBlur}
                managementFeesExpenseInput={revenueCalculations.managementFeesExpenseInput}
                handleManagementFeesExpenseChange={revenueCalculations.handleManagementFeesExpenseChange}
                handleManagementFeesExpenseBlur={revenueCalculations.handleManagementFeesExpenseBlur}
                realEstateTaxesExpenseInput={revenueCalculations.realEstateTaxesExpenseInput}
                handleRealEstateTaxesExpenseChange={revenueCalculations.handleRealEstateTaxesExpenseChange}
                handleRealEstateTaxesExpenseBlur={revenueCalculations.handleRealEstateTaxesExpenseBlur}
                insuranceExpenseInput={revenueCalculations.insuranceExpenseInput}
                handleInsuranceExpenseChange={revenueCalculations.handleInsuranceExpenseChange}
                handleInsuranceExpenseBlur={revenueCalculations.handleInsuranceExpenseBlur}
                otherNonOpExpenseInput={revenueCalculations.otherNonOpExpenseInput}
                handleOtherNonOpExpenseChange={revenueCalculations.handleOtherNonOpExpenseChange}
                handleOtherNonOpExpenseBlur={revenueCalculations.handleOtherNonOpExpenseBlur}
                reserveForReplacementInput={revenueCalculations.reserveForReplacementInput}
                handleReserveForReplacementChange={revenueCalculations.handleReserveForReplacementChange}
                handleReserveForReplacementBlur={revenueCalculations.handleReserveForReplacementBlur}
              />
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
    <div className="sticky top-0 z-10 bg-gray-50 pb-0 max-h-96 overflow-hidden">
      <TabbedSummary
        {...props}
        calculateTotalExpense={calculateTotalExpense}
        calculateGrossOperatingProfit={calculateGrossOperatingProfit}
      />
    </div>
  );
};

export default RevenueLayout;
