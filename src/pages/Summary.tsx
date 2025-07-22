
import React, { useState } from "react";
import AppSidebar from "../components/AppSidebar";
import { SidebarProvider } from "../components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { toast } from "../hooks/use-toast";
import KPICards from "../components/revenue/KPICards";
import { ChevronDown, ChevronRight } from "lucide-react";
// Import hooks if available, otherwise use sample data

const Summary: React.FC = () => {
  // Using sample data for now - replace with actual data hooks when available
  const [isOtherRevenueExpanded, setIsOtherRevenueExpanded] = useState(true);
  const [isOtherExpenseExpanded, setIsOtherExpenseExpanded] = useState(true);
  const [isOtherProfitExpanded, setIsOtherProfitExpanded] = useState(true);

  const handleSidebarItemClick = (modalName: string) => {
    console.log("Sidebar item clicked:", modalName);
    toast({
      title: "Navigation",
      description: `${modalName} functionality will be implemented`,
    });
  };

  // Sample years for demonstration - these would come from your data
  const years = [0, 1, 2, 3, 4, 5];
  const yearLabels = ["Year 0", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
  const actualYears = ["2024", "2025", "2026", "2027", "2028", "2029"];

  const formatCurrency = (value: number): string => {
    if (!value) return "-";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number, decimals = 1): string => {
    if (value === null || value === undefined) return "-";
    return `${(value).toFixed(decimals)}%`;
  };

  // Sample data - replace with actual calculations
  const getSampleData = (baseValue: number, growth = 0.05) => {
    return years.map((_, index) => baseValue * Math.pow(1 + growth, index));
  };

  const acquisitionCosts = {
    purchasePrice: getSampleData(55500000, 0),
    transferFip: getSampleData(10000000, 0),
    closingCosts: getSampleData(684743, 0),
    total: getSampleData(66184743, 0)
  };

  const departmentalRevenues = {
    roomsRevenue: getSampleData(11206555, 0.06),
    otherRevenue: getSampleData(0, 0),
    foodBeverage: getSampleData(2364680, 0.055),
    otherOperatedDepartments: getSampleData(374410, 0.05),
    miscellaneous: getSampleData(0, 0),
    otherIncome: getSampleData(3336490, 0.055),
    totalRevenue: getSampleData(18243045, 0.06)
  };

  const departmentalExpenses = {
    roomsExpense: getSampleData(1370103, 0.04),
    otherExpenses: getSampleData(0, 0),
    foodBeverage: getSampleData(1326552, 0.045),
    otherOperatedDepartments: getSampleData(18721, 0.04),
    miscellaneous: getSampleData(0, 0),
    otherExpense: getSampleData(1845373, 0.045),
    totalDepartmentalExpenses: getSampleData(4315476, 0.045)
  };

  const departmentalProfit = {
    roomsProfit: years.map(i => departmentalRevenues.roomsRevenue[i] - departmentalExpenses.roomsExpense[i]),
    foodBeverageProfit: years.map(i => departmentalRevenues.foodBeverage[i] - departmentalExpenses.foodBeverage[i]),
    otherOperatedDepartmentsProfit: years.map(i => departmentalRevenues.otherOperatedDepartments[i] - departmentalExpenses.otherOperatedDepartments[i]),
    miscellaneousProfit: years.map(i => (departmentalRevenues.miscellaneous[i] || 0) - (departmentalExpenses.miscellaneous[i] || 0)),
    totalDepartmentalProfit: getSampleData(10219569, 0.065)
  };

  // Calculate total other department profit (sum of F&B, Other Operated, and Miscellaneous)
  const totalOtherDepartmentProfit = years.map(i => 
    departmentalProfit.foodBeverageProfit[i] + 
    departmentalProfit.otherOperatedDepartmentsProfit[i] + 
    departmentalProfit.miscellaneousProfit[i]
  );

  const undistributedExpenses = {
    administrative: getSampleData(0, 0),
    informationTech: getSampleData(0, 0),
    salesMarketing: getSampleData(0, 0),
    propertyOperations: getSampleData(0, 0),
    utilities: getSampleData(0, 0),
    totalUndistributedExpenses: getSampleData(1068060, 0.04)
  };

  const grossOperatingProfit = years.map(i => 
    departmentalProfit.totalDepartmentalProfit[i] - undistributedExpenses.totalUndistributedExpenses[i]
  );

  const nonOperatingExpenses = {
    management: getSampleData(364146, 0.04),
    realEstateTaxes: getSampleData(0, 0),
    insurance: getSampleData(0, 0),
    totalNonOperatingExpense: getSampleData(1849708, 0.04)
  };

  const ebitda = years.map(i => grossOperatingProfit[i] - nonOperatingExpenses.totalNonOperatingExpense[i]);

  const reserveForReplacement = getSampleData(291317, 0.055);
  const noi = years.map(i => ebitda[i] - reserveForReplacement[i]);

  const debt = {
    salesPrice: getSampleData(84861621, 0.02),
    salesExpense: getSampleData(2545849, 0.02),
    salesProceeds: getSampleData(82315772, 0.02),
    loanDisbursement: getSampleData(35714250, 0),
    debtService: getSampleData(3968250, 0),
    loanRepayment: getSampleData(36075000, 0),
    unleveredCashFlow: getSampleData(67894743, 0.06),
    leveredCashFlow: getSampleData(46902975, 0.08)
  };

  const returnMetrics = {
    unleveredIrr: getSampleData(5.71, 0.3),
    cashOnCash: getSampleData(-0.28, 4),
    equityMultiple: getSampleData(0, 0.15),
    dscr: getSampleData(0.59, 0.9),
    loanToValue: getSampleData(51.55, -0.02)
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <AppSidebar onItemClick={handleSidebarItemClick} />
        
        <div className="flex-1 overflow-auto">
          {/* Sticky Header Section */}
          <div className="sticky top-0 z-10 bg-gray-50 p-6 pb-4 border-b border-gray-200">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Summary</h1>
            </div>
            <KPICards />
          </div>
          
          {/* Scrollable Content */}
          <div className="p-6 pt-4">

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-80 font-bold"></TableHead>
                    {yearLabels.map((year, index) => (
                      <TableHead key={year} className="text-center font-bold min-w-28">
                        <div>{year}</div>
                        <div className="text-xs font-normal text-gray-600">{actualYears[index]}</div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Total Acquisition Costs */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold">Total Acquisition Costs</TableCell>
                    {years.map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Purchase Price</TableCell>
                    {acquisitionCosts.purchasePrice.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Transfer F&F / Major Capital Improvement Reserve</TableCell>
                    {acquisitionCosts.transferFip.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Closing Costs</TableCell>
                    {acquisitionCosts.closingCosts.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell>Total Acquisition Costs</TableCell>
                    {acquisitionCosts.total.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Revenue */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold" colSpan={2}>Revenue</TableCell>
                    {years.slice(1).map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>Rooms Revenue</TableCell>
                    {departmentalRevenues.roomsRevenue.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>
                      <div 
                        className="flex items-center cursor-pointer"
                        onClick={() => setIsOtherRevenueExpanded(!isOtherRevenueExpanded)}
                      >
                        {isOtherRevenueExpanded ? (
                          <ChevronDown className="h-4 w-4 mr-2" />
                        ) : (
                          <ChevronRight className="h-4 w-4 mr-2" />
                        )}
                        Total Other Revenue
                      </div>
                    </TableCell>
                    {departmentalRevenues.otherIncome.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  {isOtherRevenueExpanded && (
                    <>
                      <TableRow>
                        <TableCell className="pl-8" colSpan={2}>Food & Beverage</TableCell>
                        {departmentalRevenues.foodBeverage.slice(1).map((value, index) => (
                          <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8" colSpan={2}>Other Operated Departments</TableCell>
                        {departmentalRevenues.otherOperatedDepartments.slice(1).map((value, index) => (
                          <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8" colSpan={2}>Miscellaneous</TableCell>
                        {departmentalRevenues.miscellaneous.slice(1).map((value, index) => (
                          <TableCell key={index} className="text-center">{value > 0 ? formatCurrency(value) : "-"}</TableCell>
                        ))}
                      </TableRow>
                    </>
                  )}
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell colSpan={2}>Total Revenue</TableCell>
                    {departmentalRevenues.totalRevenue.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Departmental Expenses */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold" colSpan={2}>Expense</TableCell>
                    {years.slice(1).map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>Rooms Expense</TableCell>
                    {departmentalExpenses.roomsExpense.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>
                      <div 
                        className="flex items-center cursor-pointer"
                        onClick={() => setIsOtherExpenseExpanded(!isOtherExpenseExpanded)}
                      >
                        {isOtherExpenseExpanded ? (
                          <ChevronDown className="h-4 w-4 mr-2" />
                        ) : (
                          <ChevronRight className="h-4 w-4 mr-2" />
                        )}
                        Total Other Expense
                      </div>
                    </TableCell>
                    {departmentalExpenses.otherExpense.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  {isOtherExpenseExpanded && (
                    <>
                      <TableRow>
                        <TableCell className="pl-8" colSpan={2}>Food & Beverage</TableCell>
                        {departmentalExpenses.foodBeverage.slice(1).map((value, index) => (
                          <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8" colSpan={2}>Other Operated Departments</TableCell>
                        {departmentalExpenses.otherOperatedDepartments.slice(1).map((value, index) => (
                          <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8" colSpan={2}>Miscellaneous</TableCell>
                        {departmentalExpenses.miscellaneous.slice(1).map((value, index) => (
                          <TableCell key={index} className="text-center">{value > 0 ? formatCurrency(value) : "-"}</TableCell>
                        ))}
                      </TableRow>
                    </>
                  )}
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell colSpan={2}>Total Expense</TableCell>
                    {departmentalExpenses.totalDepartmentalExpenses.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Departmental Profit */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold" colSpan={2}>Departmental Profit</TableCell>
                    {years.slice(1).map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>Rooms Profit</TableCell>
                    {departmentalProfit.roomsProfit.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>
                      <div 
                        className="flex items-center cursor-pointer"
                        onClick={() => setIsOtherProfitExpanded(!isOtherProfitExpanded)}
                      >
                        {isOtherProfitExpanded ? (
                          <ChevronDown className="h-4 w-4 mr-2" />
                        ) : (
                          <ChevronRight className="h-4 w-4 mr-2" />
                        )}
                        Total Other Department
                      </div>
                    </TableCell>
                    {totalOtherDepartmentProfit.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  {isOtherProfitExpanded && (
                    <>
                      <TableRow>
                        <TableCell className="pl-8" colSpan={2}>Food & Beverage Profit</TableCell>
                        {departmentalProfit.foodBeverageProfit.slice(1).map((value, index) => (
                          <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8" colSpan={2}>Other Operated Departments Profit</TableCell>
                        {departmentalProfit.otherOperatedDepartmentsProfit.slice(1).map((value, index) => (
                          <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="pl-8" colSpan={2}>Miscellaneous Profit</TableCell>
                        {departmentalProfit.miscellaneousProfit.slice(1).map((value, index) => (
                          <TableCell key={index} className="text-center">{value > 0 ? formatCurrency(value) : "-"}</TableCell>
                        ))}
                      </TableRow>
                    </>
                  )}
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell colSpan={2}>Total Departmental Profit</TableCell>
                    {departmentalProfit.totalDepartmentalProfit.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Undistributed Expenses */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold" colSpan={2}>Undistributed Expenses</TableCell>
                    {years.slice(1).map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>Administrative & General</TableCell>
                    {undistributedExpenses.administrative.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{value > 0 ? formatCurrency(value) : "-"}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>Information Tech Services</TableCell>
                    {undistributedExpenses.informationTech.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{value > 0 ? formatCurrency(value) : "-"}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>Sales & Marketing</TableCell>
                    {undistributedExpenses.salesMarketing.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{value > 0 ? formatCurrency(value) : "-"}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>Property Operations & Maintenance</TableCell>
                    {undistributedExpenses.propertyOperations.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{value > 0 ? formatCurrency(value) : "-"}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>Utilities</TableCell>
                    {undistributedExpenses.utilities.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{value > 0 ? formatCurrency(value) : "-"}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell colSpan={2}>Total Undistributed Expenses</TableCell>
                    {undistributedExpenses.totalUndistributedExpenses.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Gross Operating Profit */}
                  <TableRow className="font-bold bg-green-100">
                    <TableCell colSpan={2}>Gross Operating Profit</TableCell>
                    {grossOperatingProfit.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Non-Operating Expenses */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold" colSpan={2}>Non-Operating Expenses</TableCell>
                    {years.slice(1).map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>Management Fees</TableCell>
                    {nonOperatingExpenses.management.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>Real Estate Taxes</TableCell>
                    {nonOperatingExpenses.realEstateTaxes.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{value > 0 ? formatCurrency(value) : "-"}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6" colSpan={2}>Insurance</TableCell>
                    {nonOperatingExpenses.insurance.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{value > 0 ? formatCurrency(value) : "-"}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell colSpan={2}>Total Non-Operating Expense</TableCell>
                    {nonOperatingExpenses.totalNonOperatingExpense.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* EBITDA */}
                  <TableRow className="font-bold bg-green-100">
                    <TableCell colSpan={2}>EBITDA</TableCell>
                    {ebitda.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Reserve for Replacement */}
                  <TableRow>
                    <TableCell colSpan={2}>Reserve for Replacement</TableCell>
                    {reserveForReplacement.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* NOI */}
                  <TableRow className="font-bold bg-green-100">
                    <TableCell colSpan={2}>NOI</TableCell>
                    {noi.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Exit Section */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold" colSpan={2}>Exit</TableCell>
                    {years.slice(1).map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Sales Price</TableCell>
                    {debt.salesPrice.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 4 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Sales Expense</TableCell>
                    {debt.salesExpense.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 4 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell colSpan={2}>Sales Proceeds (Unlevered)</TableCell>
                    {debt.salesProceeds.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 4 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Debt Section */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold">Debt</TableCell>
                    {years.map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>Loan Disbursement net Fees</TableCell>
                    {debt.loanDisbursement.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>Debt Service</TableCell>
                    {debt.debtService.map((value, index) => (
                      <TableCell key={index} className="text-center">{index > 0 && index < 5 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>Loan Repayment</TableCell>
                    {debt.loanRepayment.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 5 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold">
                    <TableCell>Unlevered Cash Flow</TableCell>
                    {debt.unleveredCashFlow.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? formatCurrency(value) : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold">
                    <TableCell>Levered Cash Flow</TableCell>
                    {debt.leveredCashFlow.map((value, index) => (
                      <TableCell key={index} className="text-center font-bold">{index === 0 ? formatCurrency(value) : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Return Metrics */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold" colSpan={2}>Return Metrics</TableCell>
                    {years.slice(1).map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Free & Clear Return - 7.35% Avg</TableCell>
                    {returnMetrics.unleveredIrr.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatPercent(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Cash on Cash - 3.19% Avg</TableCell>
                    {returnMetrics.cashOnCash.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{formatPercent(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Risk Metrics Section */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold" colSpan={2}>Risk Metrics</TableCell>
                    {years.slice(1).map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>DSCR - 0.98x Min</TableCell>
                    {returnMetrics.dscr.slice(1).map((value, index) => (
                      <TableCell key={index} className="text-center">{value > 0 ? `${value.toFixed(2)}x` : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Debt Yield - 11.55% Min</TableCell>
                    {[0.1387, 0.1638, 0.1752, 0.1803].map((value, index) => (
                      <TableCell key={index} className="text-center">{formatPercent(value)}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Summary;
