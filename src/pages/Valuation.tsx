import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRevenueData } from "@/hooks/useRevenueData";
import { formatCurrency } from "@/utils/calculationUtils";
import { useValuationData } from "@/hooks/useValuationData";

const Valuation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const { forecastYears } = useRevenueData();
  const { valuationData, updateValuationData } = useValuationData();

  const handleItemClick = (modalName: string) => {
    setActiveSection(modalName);
  };

  // Acquisition inputs - use from valuation data hook
  const discountRate = valuationData.discountRate;
  const capRate = valuationData.capRate;
  const acquisitionCosts = valuationData.acquisitionCosts;
  const capitalImprovements = valuationData.capitalImprovements;
  const reserveForReplacement = valuationData.reserveForReplacement;

  // Financing inputs - keep as local state since they're not needed in other components
  const [ltv, setLtv] = useState("65.0");
  const [interestRate, setInterestRate] = useState("11.0");
  const [loanFees, setLoanFees] = useState("1.0");
  const [interestOnlyPeriod, setInterestOnlyPeriod] = useState("7");
  const [amortizationPeriod, setAmortizationPeriod] = useState("30");
  const [term, setTerm] = useState("10");
  
  // Closing Costs inputs
  const [closingCostsMethod, setClosingCostsMethod] = useState("% of Loan Amount");
  
  // Detailed Closing Costs
  type DetailedClosingCosts = {
    originationFeeBasisPoints: string;
    underwritingFee: string;
    lenderLegal: string;
    debtPlacementFeeBasisPoints: string;
    interestRateCap: string;
    outOfPocketExpenses: string;
    creditSearches: string;
    insuranceConsultant: string;
    processingFee: string;
    appraisal: string;
    interestRateHedge: string;
    thirdPartyReport1: { description: string; amount: string };
    thirdPartyReport2: { description: string; amount: string };
    thirdPartyReport3: { description: string; amount: string };
    thirdPartyReport4: { description: string; amount: string };
    thirdPartyReport5: { description: string; amount: string };
    interestExpense: string;
    taxImpound: string;
    insuranceImpound: string;
    insurancePremium: string;
    ffeReserve: string;
    adaReserve: string;
    immediateRepairReserve: string;
    generalLedger: string;
    realEstateTaxes: string;
    titleSearches: string;
    titlePremium: string;
    escrow: string;
    recordingFees: string;
    transferTax: string;
    mortgageTax: string;
    transferTaxOther: string;
    applicationFee: string;
    buyerCounsel: string;
    equityPlacementFee: string;
    acquisitionFee: string;
    travelCharge1: { description: string; amount: string };
    travelCharge2: { description: string; amount: string };
    travelCharge3: { description: string; amount: string };
    workingCapital: string;
    excessCashCapital: string;
    excessCashMonths: string;
    contingency: string;
    yearOneTaxReserve: string;
    yearOneInsuranceReserve: string;
  };

  const [detailedClosingCosts, setDetailedClosingCosts] = useState<DetailedClosingCosts>({
    // Lender Charges
    originationFeeBasisPoints: "60",
    underwritingFee: "5000",
    lenderLegal: "0",
    debtPlacementFeeBasisPoints: "75",
    interestRateCap: "0",
    outOfPocketExpenses: "0",
    creditSearches: "3500",
    insuranceConsultant: "0",
    processingFee: "10000",
    appraisal: "7500",
    interestRateHedge: "0",
    
    // Third Party Reports
    thirdPartyReport1: { description: "Description", amount: "2500" },
    thirdPartyReport2: { description: "Description", amount: "2000" },
    thirdPartyReport3: { description: "Description", amount: "5000" },
    thirdPartyReport4: { description: "Description", amount: "1500" },
    thirdPartyReport5: { description: "Description", amount: "4500" },
    
    // Lender Reserves
    interestExpense: "0",
    taxImpound: "0",
    insuranceImpound: "0",
    insurancePremium: "0",
    ffeReserve: "0",
    adaReserve: "0",
    immediateRepairReserve: "0",
    
    // Prorations
    generalLedger: "0",
    realEstateTaxes: "0",
    
    // Title Charges
    titleSearches: "2500",
    titlePremium: "20000",
    escrow: "1000",
    recordingFees: "1000",
    
    // Transfer Taxes
    transferTax: "0",
    mortgageTax: "0",
    transferTaxOther: "0",
    
    // Franchise Charges
    applicationFee: "75000",
    
    // Legal Charges
    buyerCounsel: "50000",
    
    // Acquisition Fees
    equityPlacementFee: "0",
    acquisitionFee: "190000",
    
    // Travel and Other Charges
    travelCharge1: { description: "Description", amount: "5000" },
    travelCharge2: { description: "Description", amount: "5000" },
    travelCharge3: { description: "Description", amount: "0" },
    
    // Working Capital
    workingCapital: "125000",
    excessCashCapital: "0",
    excessCashMonths: "0",
    
    // Contingency
    contingency: "75000",
    
    // Lender Reserve Estimates
    yearOneTaxReserve: "40500",
    yearOneInsuranceReserve: "480000"
  });

  // Sample loan amount for calculations
  const loanAmount = 36075000;

  // Purchase Price input - keep as local state since it's not needed in other components
  const [purchasePrice, setPurchasePrice] = useState("55500000");
  
  // Exit inputs - use from valuation data hook
  const exitCapRate = valuationData.exitCapRate;
  const salesExpense = valuationData.salesExpense;

  const handlePercentageChange = (value: string, fieldOrSetter: keyof typeof valuationData | ((val: string) => void)) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    if (typeof fieldOrSetter === 'function') {
      fieldOrSetter(numericValue);
    } else {
      updateValuationData({ [fieldOrSetter]: numericValue });
    }
  };

  const handleCurrencyChange = (value: string, fieldOrSetter: keyof typeof valuationData | ((val: string) => void)) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (typeof fieldOrSetter === 'function') {
      fieldOrSetter(numericValue);
    } else {
      updateValuationData({ [fieldOrSetter]: numericValue });
    }
  };

  const handleIntegerChange = (value: string, setter: (val: string) => void) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
  };

  const formatPercentageDisplay = (value: string) => {
    const num = parseFloat(value);
    return isNaN(num) ? "0.0%" : `${num.toFixed(1)}%`;
  };

  const formatCurrencyDisplay = (value: string) => {
    const num = parseInt(value);
    return isNaN(num) ? "$0" : `$${num.toLocaleString()}`;
  };

  // Helper functions for detailed closing costs
  const calculateOriginationFee = () => {
    const basisPoints = parseFloat(detailedClosingCosts.originationFeeBasisPoints) || 0;
    return loanAmount * (basisPoints / 10000);
  };

  const calculateDebtPlacementFee = () => {
    const basisPoints = parseFloat(detailedClosingCosts.debtPlacementFeeBasisPoints) || 0;
    return loanAmount * (basisPoints / 10000);
  };

  // Helper function for Purchase Price calculation
  const calculatePurchasePriceFromCapRate = () => {
    // Sample First Year Forecast NOI - this should be connected to actual revenue data
    const firstYearNOI = 9658088; // Sample value
    const capRateValue = parseFloat(capRate) || 6.0;
    return firstYearNOI / (capRateValue / 100);
  };

  // Helper function for DCF Purchase Price calculation
  const calculateDCFPurchasePrice = () => {
    // Sample projected NOI values for years 1-5 (these should be connected to actual revenue data)
    const projectedNOI = {
      1: 9658088,
      2: 10124792,
      3: 10609730,
      4: 11114499,
      5: 11639774
    };
    
    const discountRateValue = parseFloat(discountRate) / 100 || 0.12;
    const exitCapRateValue = parseFloat(exitCapRate) / 100 || 0.07;
    const holdPeriod = 5;
    
    // Calculate present value of projected cash flows (years 1-5)
    let pvOfCashFlows = 0;
    for (let t = 1; t <= holdPeriod; t++) {
      const cashFlow = projectedNOI[t as keyof typeof projectedNOI];
      pvOfCashFlows += cashFlow / Math.pow(1 + discountRateValue, t);
    }
    
    // Calculate terminal value (sale price at end of hold period)
    const exitYearNOI = projectedNOI[5]; // Year 5 NOI
    const terminalValue = exitYearNOI / exitCapRateValue;
    
    // Present value of terminal value
    const pvOfTerminalValue = terminalValue / Math.pow(1 + discountRateValue, holdPeriod);
    
    // DCF Purchase Price = PV of cash flows + PV of terminal value
    return pvOfCashFlows + pvOfTerminalValue;
  };

  const handleDetailedCostChange = (field: string, value: string) => {
    setDetailedClosingCosts(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDetailedCostObjectChange = (field: string, subField: string, value: string) => {
    setDetailedClosingCosts(prev => ({
      ...prev,
      [field]: {
        ...prev[field as keyof typeof prev] as any,
        [subField]: value
      }
    }));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar onItemClick={handleItemClick} activeSection={activeSection} />
        <main className="flex-1">
          <div className="p-6">
            <SidebarTrigger />
        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">IRR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.2%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg CoC Return</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15.8%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Cap Rate (Acquisition)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.2%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Cap Rate (Exit)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.8%</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="acquisition" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
            <TabsTrigger value="financing">Financing</TabsTrigger>
            <TabsTrigger value="equity">Equity</TabsTrigger>
            <TabsTrigger value="exit">Exit</TabsTrigger>
          </TabsList>

          <TabsContent value="acquisition" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4 items-center">
                       <Label>Discount Rate</Label>
                       <Input
                         value={formatPercentageDisplay(discountRate)}
                         onChange={(e) => handlePercentageChange(e.target.value, 'discountRate')}
                         className="text-blue-600 font-medium"
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-4 items-center">
                       <Label>Cap Rate</Label>
                       <Input
                         value={formatPercentageDisplay(capRate)}
                         onChange={(e) => handlePercentageChange(e.target.value, 'capRate')}
                         className="text-blue-600 font-medium"
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-4 items-center">
                       <Label>Acquisition Costs (lender's fees excluded)</Label>
                       <Input
                         value={formatPercentageDisplay(acquisitionCosts)}
                         onChange={(e) => handlePercentageChange(e.target.value, 'acquisitionCosts')}
                         className="text-blue-600 font-medium"
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-4 items-center">
                       <Label>Estimated Capital Improvements</Label>
                       <Input
                         value={formatCurrencyDisplay(capitalImprovements)}
                         onChange={(e) => handleCurrencyChange(e.target.value, 'capitalImprovements')}
                         className="text-blue-600 font-medium"
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-4 items-center">
                       <Label>Reserve for Replacement</Label>
                       <Input
                         value={formatPercentageDisplay(reserveForReplacement)}
                         onChange={(e) => handlePercentageChange(e.target.value, 'reserveForReplacement')}
                         className="text-blue-600 font-medium"
                       />
                     </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financing" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Left 1/3 - Financing inputs */}
                  <div className="w-1/3 space-y-4 pr-4">
                    <div className="flex justify-between items-center">
                      <Label>LTV</Label>
                       <Input
                         value={formatPercentageDisplay(ltv)}
                         onChange={(e) => handlePercentageChange(e.target.value, setLtv)}
                         className="text-blue-600 font-medium text-right w-20"
                       />
                    </div>
                    <div className="flex justify-between items-center">
                      <Label>Interest Rate</Label>
                       <Input
                         value={formatPercentageDisplay(interestRate)}
                         onChange={(e) => handlePercentageChange(e.target.value, setInterestRate)}
                         className="text-blue-600 font-medium text-right w-20"
                       />
                    </div>
                    
                    {/* Closing Costs Section - single row layout */}
                    <div className="flex justify-between items-center">
                      <Label>Closing Costs</Label>
                      <div className="flex items-center gap-2">
                        <Select value={closingCostsMethod} onValueChange={setClosingCostsMethod}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="% of Loan Amount">% of Loan Amount</SelectItem>
                            <SelectItem value="Detail">Detail</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {closingCostsMethod === "% of Loan Amount" && (
                          <>
                             <Input
                               value={formatPercentageDisplay(loanFees)}
                               onChange={(e) => handlePercentageChange(e.target.value, setLoanFees)}
                               className="text-blue-600 font-medium text-right w-16"
                             />
                            <span className="text-gray-500">%</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Label>Interest Only Period (Years)</Label>
                      <Input
                        value={interestOnlyPeriod}
                        onChange={(e) => handleIntegerChange(e.target.value, setInterestOnlyPeriod)}
                        className="text-blue-600 font-medium text-right w-20"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <Label>Amortization Period (Years)</Label>
                      <Input
                        value={amortizationPeriod}
                        onChange={(e) => handleIntegerChange(e.target.value, setAmortizationPeriod)}
                        className="text-blue-600 font-medium text-right w-20"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <Label>Term</Label>
                      <Input
                        value={term}
                        onChange={(e) => handleIntegerChange(e.target.value, setTerm)}
                        className="text-blue-600 font-medium text-right w-20"
                      />
                    </div>
                  </div>

                  {/* Section Divider */}
                  <div className="w-px bg-gray-300"></div>

                  {/* Right 2/3 - Detailed Closing Costs */}
                  <div className={`w-2/3 ${closingCostsMethod === "% of Loan Amount" ? "opacity-50 pointer-events-none" : ""}`}>
                    <div className="p-4 rounded-lg h-96 overflow-y-auto">
                      {/* Header with medium gray background, left-justified */}
                      <div className="bg-gray-400 p-2 mb-4 text-left">
                        <h3 className="text-lg font-semibold text-white">Detailed Closing Costs</h3>
                      </div>
                      
                      {/* Subheader with light gray background */}
                      <div className="grid grid-cols-12 gap-2 mb-4 font-semibold text-sm bg-gray-200 p-2">
                        <div className="col-span-4">Closing Costs</div>
                        <div className="col-span-2 text-center">Amount</div>
                        <div className="col-span-6 text-center">Comments</div>
                      </div>

                      {/* Lender Charges */}
                      <div className="space-y-2 mb-6">
                        <div className="font-bold underline text-sm p-2">Lender Charges</div>
                        
                        {/* Origination Fee */}
                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-2 text-sm">Origination Fee</div>
                          <div className="col-span-2 flex items-center gap-1">
                            <span className="text-xs">Basis Points:</span>
                            <Input
                              value={detailedClosingCosts.originationFeeBasisPoints}
                              onChange={(e) => handleDetailedCostChange("originationFeeBasisPoints", e.target.value)}
                              className="text-blue-600 font-medium w-12 text-right"
                              style={{ backgroundColor: "#FFF2CC" }}
                            />
                          </div>
                          <div className="col-span-2 text-right">
                            <span className="font-medium">${calculateOriginationFee().toLocaleString()}</span>
                          </div>
                          <Input placeholder="(comments)" className="col-span-6 text-xs" />
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-4 text-sm">Underwriting Fee</div>
                          <div className="col-span-2 text-right">
                            <Input
                              value={`$${parseInt(detailedClosingCosts.underwritingFee || "0").toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("underwritingFee", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium text-right w-20"
                            />
                          </div>
                          <Input placeholder="(comments)" className="col-span-6 text-xs" />
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-4 text-sm">Lender Legal</div>
                          <div className="col-span-2 text-right">
                            <Input
                              value={`$${parseInt(detailedClosingCosts.lenderLegal || "0").toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("lenderLegal", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium text-right w-20"
                            />
                          </div>
                          <Input placeholder="(comments)" className="col-span-6 text-xs" />
                        </div>

                        {/* Debt Placement Fee */}
                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-2 text-sm">Debt Placement Fee</div>
                          <div className="col-span-2 flex items-center gap-1">
                            <span className="text-xs">Basis Points:</span>
                            <Input
                              value={detailedClosingCosts.debtPlacementFeeBasisPoints}
                              onChange={(e) => handleDetailedCostChange("debtPlacementFeeBasisPoints", e.target.value)}
                              className="text-blue-600 font-medium w-12 text-right"
                              style={{ backgroundColor: "#FFF2CC" }}
                            />
                          </div>
                          <div className="col-span-2 text-right">
                            <span className="font-medium">${calculateDebtPlacementFee().toLocaleString()}</span>
                          </div>
                          <Input placeholder="(comments)" className="col-span-6 text-xs" />
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-4 text-sm">Interest Rate Cap</div>
                          <div className="col-span-2 text-right">
                            <Input
                              value={`$${parseInt(detailedClosingCosts.interestRateCap || "0").toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("interestRateCap", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium text-right w-20"
                            />
                          </div>
                          <Input placeholder="(comments)" className="col-span-6 text-xs" />
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-4 text-sm">Out of Pocket Expenses</div>
                          <div className="col-span-2 text-right">
                            <Input
                              value={`$${parseInt(detailedClosingCosts.outOfPocketExpenses || "0").toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("outOfPocketExpenses", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium text-right w-20"
                            />
                          </div>
                          <Input placeholder="(comments)" className="col-span-6 text-xs" />
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-4 text-sm">Credit Searches</div>
                          <div className="col-span-2 text-right">
                            <Input
                              value={`$${parseInt(detailedClosingCosts.creditSearches || "0").toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("creditSearches", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium text-right w-20"
                            />
                          </div>
                          <Input placeholder="(comments)" className="col-span-6 text-xs" />
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-4 text-sm">Insurance Consultant</div>
                          <div className="col-span-2 text-right">
                            <Input
                              value={`$${parseInt(detailedClosingCosts.insuranceConsultant || "0").toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("insuranceConsultant", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium text-right w-20"
                            />
                          </div>
                          <Input placeholder="(comments)" className="col-span-6 text-xs" />
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-4 text-sm">Processing Fee</div>
                          <div className="col-span-2 text-right">
                            <Input
                              value={`$${parseInt(detailedClosingCosts.processingFee || "0").toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("processingFee", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium text-right w-20"
                            />
                          </div>
                          <Input placeholder="(comments)" className="col-span-6 text-xs" />
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-4 text-sm">Appraisal</div>
                          <div className="col-span-2 text-right">
                            <Input
                              value={`$${parseInt(detailedClosingCosts.appraisal || "0").toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("appraisal", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium text-right w-20"
                            />
                          </div>
                          <Input placeholder="(comments)" className="col-span-6 text-xs" />
                        </div>

                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-4 text-sm">Interest Rate Hedge</div>
                          <div className="col-span-2 text-right">
                            <Input
                              value={`$${parseInt(detailedClosingCosts.interestRateHedge || "0").toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("interestRateHedge", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium text-right w-20"
                            />
                          </div>
                          <Input placeholder="(comments)" className="col-span-6 text-xs" />
                        </div>
                      </div>

                      {/* Third Party Reports */}
                      <div className="space-y-2 mb-6">
                        <div className="font-bold underline text-sm p-2">Third Party Reports</div>
                        
                        {[1, 2, 3, 4, 5].map((num) => {
                          const reportKey = `thirdPartyReport${num}` as keyof typeof detailedClosingCosts;
                          const report = detailedClosingCosts[reportKey] as { description: string; amount: string };
                          
                          return (
                            <div key={num} className="grid grid-cols-12 gap-2 items-center">
                              <div className="col-span-2 text-sm">
                                <Input
                                  value={report.description}
                                  onChange={(e) => handleDetailedCostObjectChange(`thirdPartyReport${num}`, "description", e.target.value)}
                                  className="text-xs"
                                  placeholder="Description"
                                />
                              </div>
                              <div className="col-span-2"></div>
                              <div className="col-span-2 text-right">
                                <Input
                                  value={`$${parseInt(report.amount || "0").toLocaleString()}`}
                                  onChange={(e) => handleDetailedCostObjectChange(`thirdPartyReport${num}`, "amount", e.target.value.replace(/[^0-9]/g, ""))}
                                  className="text-blue-600 font-medium text-right w-20"
                                />
                              </div>
                              <Input placeholder="(comments)" className="col-span-6 text-xs" />
                            </div>
                          );
                        })}
                      </div>

                      {/* Sample for other sections - simplified for brevity */}
                      <div className="text-center font-semibold mt-6">
                        <span className="bg-black text-white px-4 py-2">TOTAL CLOSING COSTS: $1,151,500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exit" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>Exit Cap Rate</Label>
                       <Input
                         value={formatPercentageDisplay(exitCapRate)}
                         onChange={(e) => handlePercentageChange(e.target.value, 'exitCapRate')}
                         className="text-blue-600 font-medium"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>Sales Expense</Label>
                       <Input
                         value={formatPercentageDisplay(salesExpense)}
                         onChange={(e) => handlePercentageChange(e.target.value, 'salesExpense')}
                         className="text-blue-600 font-medium"
                       />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equity" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Total Equity Contribution ({(100 - parseFloat(ltv)).toFixed(0)}%)</Label>
                    <span className="font-medium">
                      ${(parseFloat(purchasePrice) * (100 - parseFloat(ltv)) / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Label>Investor Equity</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={valuationData.investorEquityPercentage}
                        onChange={(e) => updateValuationData({ investorEquityPercentage: e.target.value })}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-blue-600 font-medium text-center"
                        step="0.1"
                        min="0"
                        max="100"
                      />
                      <span>%</span>
                      <span className="ml-4 font-medium">
                        ${((parseFloat(purchasePrice) * (100 - parseFloat(ltv)) / 100) * parseFloat(valuationData.investorEquityPercentage) / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  {valuationData.partners.map((partner, index) => (
                    <div key={partner.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Input
                          value={partner.name}
                          onChange={(e) => {
                            const newPartners = [...valuationData.partners];
                            newPartners[index] = { ...partner, name: e.target.value };
                            updateValuationData({ partners: newPartners });
                          }}
                          placeholder={`Partner ${index + 1}`}
                          className="w-32 text-sm"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={partner.percentage}
                            onChange={(e) => {
                              const newPartners = [...valuationData.partners];
                              newPartners[index] = { ...partner, percentage: e.target.value };
                              updateValuationData({ partners: newPartners });
                            }}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-blue-600 font-medium text-center"
                            step="0.1"
                            min="0"
                            max="100"
                          />
                          <span>%</span>
                          <span className="ml-4 font-medium">
                            ${((parseFloat(purchasePrice) * (100 - parseFloat(ltv)) / 100) * parseFloat(partner.percentage) / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                          </span>
                          {valuationData.partners.length > 1 && (
                            <button
                              onClick={() => {
                                const newPartners = valuationData.partners.filter((_, i) => i !== index);
                                updateValuationData({ partners: newPartners });
                              }}
                              className="text-red-600 hover:text-red-800 ml-2"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-start">
                    <button
                      onClick={() => {
                        const newPartner = {
                          id: Date.now().toString(),
                          name: `Partner ${valuationData.partners.length + 1}`,
                          percentage: "0.0"
                        };
                        updateValuationData({ partners: [...valuationData.partners, newPartner] });
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      + Add Partner
                    </button>
                  </div>

                  {/* Validation Warning - Centered */}
                  {(() => {
                    const totalPercentage = parseFloat(valuationData.investorEquityPercentage) + 
                      valuationData.partners.reduce((sum, partner) => sum + parseFloat(partner.percentage || "0"), 0);
                    return totalPercentage !== 100 ? (
                      <div className="text-red-600 text-sm font-medium text-center">
                        Total investor and partner equity inputs must = 100%
                      </div>
                    ) : null;
                  })()}

                  <div className="flex justify-between items-center">
                    <Label>Debt ({parseFloat(ltv).toFixed(0)}%)</Label>
                    <span className="font-medium">
                      ${loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bottom section - same for all tabs */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Acquisition Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Purchase Price ({parseFloat(capRate).toFixed(1)}% cap)</span>
                      <span className="font-medium">{formatCurrency(calculatePurchasePriceFromCapRate())}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Purchase Price-DCF ({parseFloat(discountRate).toFixed(1)}% Discount Rate)</span>
                      <span className="font-medium">{formatCurrency(calculateDCFPurchasePrice())}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Purchase Price</span>
                       <Input
                         value={formatCurrencyDisplay(purchasePrice)}
                         onChange={(e) => handleCurrencyChange(e.target.value, setPurchasePrice)}
                         className="text-blue-600 font-medium text-right w-32"
                       />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Lenders Fees</span>
                      <span className="font-medium">$ 360,750</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">All-In-Basis</span>
                      <span className="font-medium">$ 66,555,493</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Financing Assumptions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Loan Amount</span>
                      <span className="font-medium">$ 36,075,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Loan Disbursal Amount</span>
                      <span className="font-medium">$ 35,714,250</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">I/O Payments (Yearly)</span>
                      <span className="font-medium">$ 3,968,250</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Amortization Payments (Yearly)</span>
                      <span className="font-medium">$ 4,122,608</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Loan Balance Repayment</span>
                      <span className="font-medium">$ 36,075,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Equity Contributions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Total Equity Contributions ({(100 - parseFloat(ltv)).toFixed(0)}%)</span>
                      <span className="font-medium">
                        ${(parseFloat(purchasePrice) * (100 - parseFloat(ltv)) / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Partner Investors ({valuationData.partners.reduce((sum, partner) => sum + parseFloat(partner.percentage || "0"), 0).toFixed(1)}%)</span>
                      <span className="font-medium">
                        ${valuationData.partners.reduce((sum, partner) => {
                          const partnerAmount = (parseFloat(purchasePrice) * (100 - parseFloat(ltv)) / 100) * parseFloat(partner.percentage || "0") / 100;
                          return sum + partnerAmount;
                        }, 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Investor Equity ({parseFloat(valuationData.investorEquityPercentage).toFixed(1)}%)</span>
                      <span className="font-medium">
                        ${((parseFloat(purchasePrice) * (100 - parseFloat(ltv)) / 100) * parseFloat(valuationData.investorEquityPercentage) / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Debt</span>
                      <span className="font-medium">${loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Exit Assumptions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Sale Price</span>
                      <span className="font-medium">$ 84,861,621</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Sales Expense Amount</span>
                      <span className="font-medium">$ 2,545,849</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Net Sales Proceeds - (Unlevered)</span>
                      <span className="font-medium">$ 82,315,772</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Net Sales Proceeds - (Levered)</span>
                      <span className="font-medium">$ 46,240,772</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Valuation;