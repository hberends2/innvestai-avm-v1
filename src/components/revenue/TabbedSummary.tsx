
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import SummaryTable from "./TabbedSummary/SummaryTable";
import { createOccupancyMetrics, createRevenueMetrics, createExpenseMetrics, createKeyMetrics, createSubcategoryMetrics, createExpenseSubcategoryMetrics, createUndistributedSubcategoryMetrics } from "./TabbedSummary/metrics";
import { TabbedSummaryProps } from "./TabbedSummary/types";
import { usePipelineData } from "../../hooks/usePipelineData";

const TabbedSummary: React.FC<TabbedSummaryProps> = (props) => {
  const [activeTab, setActiveTab] = useState("keyMetrics");
  const [isOtherOperatedExpanded, setIsOtherOperatedExpanded] = useState(false);
  const [isUndistributedExpanded, setIsUndistributedExpanded] = useState(false);
  const [isNonOperatingExpanded, setIsNonOperatingExpanded] = useState(false);

  const { shouldAddYTDColumn } = usePipelineData();
  const { shouldAdd: shouldAddYTD, ytdYear } = shouldAddYTDColumn();

  const { historicalYears, forecastYears, helpers } = props;
  
  // Add YTD column to historical years if needed
  const adjustedHistoricalYears = shouldAddYTD && ytdYear 
    ? [...historicalYears, ytdYear] 
    : historicalYears;
  
  const allYears = [...adjustedHistoricalYears, ...forecastYears];

  console.log('TabbedSummary rendering with activeTab:', activeTab);
  console.log('All years:', allYears);

  // Create metrics for each tab - removed mainHelpers parameter from createKeyMetrics
  const keyMetrics = createKeyMetrics(props, allYears, shouldAddYTD, ytdYear);
  const occupancyMetrics = createOccupancyMetrics(props, allYears, shouldAddYTD, ytdYear);
  const revenueMetrics = createRevenueMetrics(props, allYears, isOtherOperatedExpanded, setIsOtherOperatedExpanded, shouldAddYTD, ytdYear);
  const expenseMetrics = createExpenseMetrics(props, allYears, isOtherOperatedExpanded, setIsOtherOperatedExpanded, isUndistributedExpanded, setIsUndistributedExpanded, isNonOperatingExpanded, setIsNonOperatingExpanded, shouldAddYTD, ytdYear);
  const subcategoryMetrics = createSubcategoryMetrics(props, allYears, shouldAddYTD, ytdYear);
  const expenseSubcategoryMetrics = createExpenseSubcategoryMetrics(props, allYears, shouldAddYTD, ytdYear);
  const undistributedSubcategoryMetrics = createUndistributedSubcategoryMetrics(props, allYears, shouldAddYTD, ytdYear);

  console.log('Key metrics count:', keyMetrics.length);
  console.log('Key metrics labels:', keyMetrics.map(m => m.label));

  return (
    <div className="mb-6 h-[250px]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
        <TabsList className="mb-0">
          <TabsTrigger value="keyMetrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
        </TabsList>
        
        <TabsContent value="keyMetrics" className="mt-0 h-[calc(100%-40px)]">
          <div className="bg-white h-full border border-gray-200 rounded">
            <SummaryTable
              metrics={keyMetrics}
              historicalYears={adjustedHistoricalYears}
              forecastYears={forecastYears}
              activeTab={activeTab}
              isOtherOperatedExpanded={isOtherOperatedExpanded}
              isUndistributedExpanded={isUndistributedExpanded}
              subcategoryMetrics={subcategoryMetrics}
              undistributedSubcategoryMetrics={undistributedSubcategoryMetrics}
              shouldAddYTD={shouldAddYTD}
              ytdYear={ytdYear}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="occupancy" className="mt-0 h-[calc(100%-40px)]">
          <div className="bg-white h-full border border-gray-200 rounded">
            <SummaryTable
              metrics={occupancyMetrics}
              historicalYears={adjustedHistoricalYears}
              forecastYears={forecastYears}
              activeTab={activeTab}
              isOtherOperatedExpanded={isOtherOperatedExpanded}
              isUndistributedExpanded={isUndistributedExpanded}
              subcategoryMetrics={subcategoryMetrics}
              undistributedSubcategoryMetrics={undistributedSubcategoryMetrics}
              shouldAddYTD={shouldAddYTD}
              ytdYear={ytdYear}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-0 h-[calc(100%-40px)]">
          <ScrollArea className="h-full border border-gray-200 rounded bg-white">
            <SummaryTable
              metrics={revenueMetrics}
              historicalYears={adjustedHistoricalYears}
              forecastYears={forecastYears}
              activeTab={activeTab}
              isOtherOperatedExpanded={isOtherOperatedExpanded}
              isUndistributedExpanded={isUndistributedExpanded}
              subcategoryMetrics={subcategoryMetrics}
              undistributedSubcategoryMetrics={undistributedSubcategoryMetrics}
              shouldAddYTD={shouldAddYTD}
              ytdYear={ytdYear}
            />
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="expense" className="mt-0 h-[calc(100%-40px)]">
          <ScrollArea className="h-full border border-gray-200 rounded bg-white">
            <SummaryTable
              metrics={expenseMetrics}
              historicalYears={adjustedHistoricalYears}
              forecastYears={forecastYears}
              activeTab={activeTab}
              isOtherOperatedExpanded={isOtherOperatedExpanded}
              isUndistributedExpanded={isUndistributedExpanded}
              subcategoryMetrics={expenseSubcategoryMetrics}
              undistributedSubcategoryMetrics={undistributedSubcategoryMetrics}
              shouldAddYTD={shouldAddYTD}
              ytdYear={ytdYear}
            />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabbedSummary;
