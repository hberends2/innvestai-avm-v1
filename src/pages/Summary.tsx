import React from "react";
import AppSidebar from "../components/AppSidebar";
import { SidebarProvider } from "../components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { toast } from "../hooks/use-toast";
// Import hooks if available, otherwise use sample data

const Summary: React.FC = () => {
  // Using sample data for now - replace with actual data hooks when available

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
    totalDepartmentalProfit: getSampleData(10219569, 0.065)
  };

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
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="w-full">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Summary</h1>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-64 font-bold"></TableHead>
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

                  {/* Departmental Revenues */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold">Departmental Revenues</TableCell>
                    {years.map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Rooms Revenue</TableCell>
                    {departmentalRevenues.roomsRevenue.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 italic underline">Other Revenue</TableCell>
                    {departmentalRevenues.otherRevenue.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-8">Food & Beverage</TableCell>
                    {departmentalRevenues.foodBeverage.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-8">Other Operated Departments</TableCell>
                    {departmentalRevenues.otherOperatedDepartments.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-8">Miscellaneous</TableCell>
                    {departmentalRevenues.miscellaneous.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : (value > 0 ? formatCurrency(value) : "-")}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-8 italic">Total Other Revenue</TableCell>
                    {departmentalRevenues.otherIncome.map((value, index) => (
                      <TableCell key={index} className="text-center italic">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell>Total Revenue</TableCell>
                    {departmentalRevenues.totalRevenue.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Departmental Expenses */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold">Departmental Expenses</TableCell>
                    {years.map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Rooms Expense</TableCell>
                    {departmentalExpenses.roomsExpense.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 italic underline">Other Expenses</TableCell>
                    {departmentalExpenses.otherExpenses.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-8">Food & Beverage</TableCell>
                    {departmentalExpenses.foodBeverage.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-8">Other Operated Departments</TableCell>
                    {departmentalExpenses.otherOperatedDepartments.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-8">Miscellaneous</TableCell>
                    {departmentalExpenses.miscellaneous.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : (value > 0 ? formatCurrency(value) : "-")}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-8 italic">Total Other Expense</TableCell>
                    {departmentalExpenses.otherExpense.map((value, index) => (
                      <TableCell key={index} className="text-center italic">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell>Total Departmental Expenses</TableCell>
                    {departmentalExpenses.totalDepartmentalExpenses.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Departmental Profit */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold">Departmental Profit</TableCell>
                    {years.map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Rooms Profit</TableCell>
                    {departmentalProfit.roomsProfit.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Food & Beverage Profit</TableCell>
                    {departmentalProfit.foodBeverageProfit.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Other Operated Departments Profit</TableCell>
                    {departmentalProfit.otherOperatedDepartmentsProfit.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Miscellaneous Profit</TableCell>
                    {years.map((_, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : "-"}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell>Total Departmental Profit</TableCell>
                    {departmentalProfit.totalDepartmentalProfit.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Undistributed Expenses */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold">Undistributed Expenses</TableCell>
                    {years.map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Administrative & General</TableCell>
                    {undistributedExpenses.administrative.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : (value > 0 ? formatCurrency(value) : "-")}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Information Tech Services</TableCell>
                    {undistributedExpenses.informationTech.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : (value > 0 ? formatCurrency(value) : "-")}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Sales & Marketing</TableCell>
                    {undistributedExpenses.salesMarketing.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : (value > 0 ? formatCurrency(value) : "-")}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Property Operations & Maintenance</TableCell>
                    {undistributedExpenses.propertyOperations.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : (value > 0 ? formatCurrency(value) : "-")}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Utilities</TableCell>
                    {undistributedExpenses.utilities.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : (value > 0 ? formatCurrency(value) : "-")}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell>Total Undistributed Expenses</TableCell>
                    {undistributedExpenses.totalUndistributedExpenses.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Gross Operating Profit */}
                  <TableRow className="font-bold bg-green-100">
                    <TableCell>Gross Operating Profit</TableCell>
                    {grossOperatingProfit.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Non-Operating Expenses */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold">Non-Operating Expenses</TableCell>
                    {years.map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Management</TableCell>
                    {nonOperatingExpenses.management.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Real Estate Taxes</TableCell>
                    {nonOperatingExpenses.realEstateTaxes.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : (value > 0 ? formatCurrency(value) : "-")}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Insurance</TableCell>
                    {nonOperatingExpenses.insurance.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : (value > 0 ? formatCurrency(value) : "-")}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell>Total Non-Operating Expense</TableCell>
                    {nonOperatingExpenses.totalNonOperatingExpense.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* EBITDA */}
                  <TableRow className="font-bold bg-green-100">
                    <TableCell>EBITDA</TableCell>
                    {ebitda.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Reserve for Replacement */}
                  <TableRow>
                    <TableCell>Reserve for Replacement</TableCell>
                    {reserveForReplacement.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* NOI */}
                  <TableRow className="font-bold bg-green-100">
                    <TableCell>NOI</TableCell>
                    {noi.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatCurrency(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Spacer */}
                  <TableRow><TableCell colSpan={7}></TableCell></TableRow>

                  {/* Exit Section */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold">Exit</TableCell>
                    {years.map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>Sales Price</TableCell>
                    {debt.salesPrice.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 5 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>Sales Expense</TableCell>
                    {debt.salesExpense.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 5 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="font-bold bg-gray-100">
                    <TableCell>Sales Proceeds (Unlevered)</TableCell>
                    {debt.salesProceeds.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 5 ? formatCurrency(value) : ""}</TableCell>
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
                    <TableCell className="pl-6">Debt Service</TableCell>
                    {debt.debtService.map((value, index) => (
                      <TableCell key={index} className="text-center">{index > 0 && index < 5 ? formatCurrency(value) : ""}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Loan Repayment</TableCell>
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
                    <TableCell className="font-bold">Return Metrics</TableCell>
                    {years.map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>Free and Clear Return - 7.35% Ave</TableCell>
                    {returnMetrics.unleveredIrr.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatPercent(value)}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Cash on Cash - 3.19% Ave</TableCell>
                    {returnMetrics.cashOnCash.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatPercent(value)}</TableCell>
                    ))}
                  </TableRow>

                  {/* Risk Metrics Section */}
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-bold">Risk Metrics</TableCell>
                    {years.map((_, index) => (
                      <TableCell key={index} className="text-center"></TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">DSCR - 0.98x Min</TableCell>
                    {returnMetrics.dscr.map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : (value > 0 ? `${value.toFixed(2)}x` : "")}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">Debt Yield - 11.55% Min</TableCell>
                    {[0.1155, 0.1387, 0.1638, 0.1752, 0.1803].map((value, index) => (
                      <TableCell key={index} className="text-center">{index === 0 ? "" : formatPercent(value)}</TableCell>
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