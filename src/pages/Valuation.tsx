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

const Valuation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const { forecastYears } = useRevenueData();

  const handleItemClick = (modalName: string) => {
    setActiveSection(modalName);
  };

  // Acquisition inputs
  const [discountRate, setDiscountRate] = useState("12.0");
  const [capRate, setCapRate] = useState("6.0");
  const [acquisitionCosts, setAcquisitionCosts] = useState("1.0");
  const [capitalImprovements, setCapitalImprovements] = useState("10000000");
  const [reserveForReplacement, setReserveForReplacement] = useState("4.0");

  // Financing inputs
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
    other: string;
    applicationFee: string;
    buyerCounsel: string;
    equityPlacementFee: string;
    acquisitionFee: string;
    travelCharge1: { description: string; amount: string };
    travelCharge2: { description: string; amount: string };
    workingCapital: string;
    excessCashCapital: string;
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
    other: "0",
    
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
    
    // Working Capital
    workingCapital: "125000",
    excessCashCapital: "0",
    
    // Contingency
    contingency: "75000",
    
    // Lender Reserve Estimates
    yearOneTaxReserve: "40500",
    yearOneInsuranceReserve: "480000"
  });

  // Sample loan amount for calculations
  const loanAmount = 36075000;

  // Exit inputs
  const [exitCapRate, setExitCapRate] = useState("7.0");
  const [salesExpense, setSalesExpense] = useState("3.0");

  const handlePercentageChange = (value: string, setter: (val: string) => void) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    setter(numericValue);
  };

  const handleCurrencyChange = (value: string, setter: (val: string) => void) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setter(numericValue);
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
              <CardTitle className="text-sm font-medium text-gray-600">CoC Return</CardTitle>
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
            <TabsTrigger value="financing">Financing</TabsTrigger>
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
                        onChange={(e) => handlePercentageChange(e.target.value, setDiscountRate)}
                        className="text-blue-600 font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>Cap Rate</Label>
                      <Input
                        value={formatPercentageDisplay(capRate)}
                        onChange={(e) => handlePercentageChange(e.target.value, setCapRate)}
                        className="text-blue-600 font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>Acquisition Costs (lender's fees excluded)</Label>
                      <Input
                        value={formatPercentageDisplay(acquisitionCosts)}
                        onChange={(e) => handlePercentageChange(e.target.value, setAcquisitionCosts)}
                        className="text-blue-600 font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>Estimated Capital Improvements</Label>
                      <Input
                        value={formatCurrencyDisplay(capitalImprovements)}
                        onChange={(e) => handleCurrencyChange(e.target.value, setCapitalImprovements)}
                        className="text-blue-600 font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>Reserve for Replacement</Label>
                      <Input
                        value={formatPercentageDisplay(reserveForReplacement)}
                        onChange={(e) => handlePercentageChange(e.target.value, setReserveForReplacement)}
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
                <div className="grid grid-cols-3 gap-8">
                  {/* Left 1/3 - Existing inputs */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>LTV</Label>
                      <Input
                        value={formatPercentageDisplay(ltv)}
                        onChange={(e) => handlePercentageChange(e.target.value, setLtv)}
                        className="text-blue-600 font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>Interest Rate</Label>
                      <Input
                        value={formatPercentageDisplay(interestRate)}
                        onChange={(e) => handlePercentageChange(e.target.value, setInterestRate)}
                        className="text-blue-600 font-medium"
                      />
                    </div>
                    
                    {/* Closing Costs Section */}
                    <div className="space-y-2">
                      <Label>Closing Costs</Label>
                      <Select value={closingCostsMethod} onValueChange={setClosingCostsMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="% of Loan Amount">% of Loan Amount</SelectItem>
                          <SelectItem value="Detail">Detail</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {closingCostsMethod === "% of Loan Amount" && (
                        <Input
                          value={formatPercentageDisplay(loanFees)}
                          onChange={(e) => handlePercentageChange(e.target.value, setLoanFees)}
                          className="text-blue-600 font-medium"
                          placeholder="% of Loan Amount"
                        />
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>Interest Only Period (Years)</Label>
                      <Input
                        value={interestOnlyPeriod}
                        onChange={(e) => handleIntegerChange(e.target.value, setInterestOnlyPeriod)}
                        className="text-blue-600 font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>Amortization Period (Years)</Label>
                      <Input
                        value={amortizationPeriod}
                        onChange={(e) => handleIntegerChange(e.target.value, setAmortizationPeriod)}
                        className="text-blue-600 font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>Term</Label>
                      <Input
                        value={term}
                        onChange={(e) => handleIntegerChange(e.target.value, setTerm)}
                        className="text-blue-600 font-medium"
                      />
                    </div>
                  </div>

                  {/* Right 2/3 - Detailed Closing Costs */}
                  {closingCostsMethod === "Detail" && (
                    <div className="col-span-2">
                      <div className="border border-red-500 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-center">Detailed Closing Costs</h3>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4 font-semibold text-sm">
                          <div>Closing Costs</div>
                          <div className="text-center">Amount</div>
                          <div className="text-center">Comments</div>
                        </div>

                        {/* Lender Charges */}
                        <div className="space-y-2 mb-6">
                          <div className="font-semibold text-sm bg-gray-100 p-2">Lender Charges</div>
                          
                          {/* Origination Fee */}
                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-sm">Origination Fee</div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Basis Points:</span>
                              <Input
                                value={detailedClosingCosts.originationFeeBasisPoints}
                                onChange={(e) => handleDetailedCostChange("originationFeeBasisPoints", e.target.value)}
                                className="text-blue-600 font-medium w-20"
                                style={{ backgroundColor: "#FFF2CC" }}
                              />
                              <span className="font-medium">${calculateOriginationFee().toLocaleString()}</span>
                            </div>
                            <Input placeholder="(comments)" className="text-xs" />
                          </div>

                          {/* Underwriting Fee */}
                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-sm">Underwriting Fee</div>
                            <Input
                              value={`$${parseInt(detailedClosingCosts.underwritingFee).toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("underwritingFee", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium"
                            />
                            <Input placeholder="(comments)" className="text-xs" />
                          </div>

                          {/* Lender Legal */}
                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-sm">Lender Legal</div>
                            <Input
                              value={`$${parseInt(detailedClosingCosts.lenderLegal).toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("lenderLegal", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium"
                            />
                            <Input placeholder="(comments)" className="text-xs" />
                          </div>

                          {/* Debt Placement Fee */}
                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-sm">Debt Placement Fee</div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Basis Points:</span>
                              <Input
                                value={detailedClosingCosts.debtPlacementFeeBasisPoints}
                                onChange={(e) => handleDetailedCostChange("debtPlacementFeeBasisPoints", e.target.value)}
                                className="text-blue-600 font-medium w-20"
                                style={{ backgroundColor: "#FFF2CC" }}
                              />
                              <span className="font-medium">${calculateDebtPlacementFee().toLocaleString()}</span>
                            </div>
                            <Input placeholder="(comments)" className="text-xs" />
                          </div>

                          {/* Additional lender charges */}
                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-sm">Interest Rate Cap</div>
                            <Input
                              value={`$${parseInt(detailedClosingCosts.interestRateCap).toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("interestRateCap", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium"
                            />
                            <Input placeholder="(comments)" className="text-xs" />
                          </div>

                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-sm">Out of Pocket Expenses</div>
                            <Input
                              value={`$${parseInt(detailedClosingCosts.outOfPocketExpenses).toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("outOfPocketExpenses", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium"
                            />
                            <Input placeholder="(comments)" className="text-xs" />
                          </div>

                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-sm">Credit Searches</div>
                            <Input
                              value={`$${parseInt(detailedClosingCosts.creditSearches).toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("creditSearches", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium"
                            />
                            <Input placeholder="(comments)" className="text-xs" />
                          </div>

                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-sm">Insurance Consultant</div>
                            <Input
                              value={`$${parseInt(detailedClosingCosts.insuranceConsultant).toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("insuranceConsultant", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium"
                            />
                            <Input placeholder="(comments)" className="text-xs" />
                          </div>

                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-sm">Processing Fee</div>
                            <Input
                              value={`$${parseInt(detailedClosingCosts.processingFee).toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("processingFee", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium"
                            />
                            <Input placeholder="(comments)" className="text-xs" />
                          </div>

                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-sm">Appraisal</div>
                            <Input
                              value={`$${parseInt(detailedClosingCosts.appraisal).toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("appraisal", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium"
                            />
                            <Input placeholder="(comments)" className="text-xs" />
                          </div>

                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-sm">Interest Rate Hedge</div>
                            <Input
                              value={`$${parseInt(detailedClosingCosts.interestRateHedge).toLocaleString()}`}
                              onChange={(e) => handleDetailedCostChange("interestRateHedge", e.target.value.replace(/[^0-9]/g, ""))}
                              className="text-blue-600 font-medium"
                            />
                            <Input placeholder="(comments)" className="text-xs" />
                          </div>
                        </div>

                        {/* Third Party Reports */}
                        <div className="space-y-2 mb-6">
                          <div className="font-semibold text-sm bg-gray-100 p-2">Third Party Reports</div>
                          
                          {Array.from({ length: 5 }, (_, i) => {
                            const reportKey = `thirdPartyReport${i + 1}` as keyof DetailedClosingCosts;
                            const report = detailedClosingCosts[reportKey] as { description: string; amount: string };
                            return (
                              <div key={i} className="grid grid-cols-3 gap-4 items-center">
                                <Input
                                  value={report.description}
                                  onChange={(e) => handleDetailedCostObjectChange(`thirdPartyReport${i + 1}`, "description", e.target.value)}
                                  className="text-blue-600 font-medium"
                                  style={{ backgroundColor: "#FFF2CC" }}
                                  placeholder="Description"
                                />
                                <Input
                                  value={`$${parseInt(report.amount).toLocaleString()}`}
                                  onChange={(e) => handleDetailedCostObjectChange(`thirdPartyReport${i + 1}`, "amount", e.target.value.replace(/[^0-9]/g, ""))}
                                  className="text-blue-600 font-medium"
                                />
                                <Input placeholder="(comments)" className="text-xs" />
                              </div>
                            );
                          })}
                        </div>

                        {/* Travel and Other Charges */}
                        <div className="space-y-2 mb-6">
                          <div className="font-semibold text-sm bg-gray-100 p-2">Travel and Other Charges</div>
                          
                          {Array.from({ length: 2 }, (_, i) => {
                            const chargeKey = `travelCharge${i + 1}` as keyof DetailedClosingCosts;
                            const charge = detailedClosingCosts[chargeKey] as { description: string; amount: string };
                            return (
                              <div key={i} className="grid grid-cols-3 gap-4 items-center">
                                <Input
                                  value={charge.description}
                                  onChange={(e) => handleDetailedCostObjectChange(`travelCharge${i + 1}`, "description", e.target.value)}
                                  className="text-blue-600 font-medium"
                                  style={{ backgroundColor: "#FFF2CC" }}
                                  placeholder="Description"
                                />
                                <Input
                                  value={`$${parseInt(charge.amount).toLocaleString()}`}
                                  onChange={(e) => handleDetailedCostObjectChange(`travelCharge${i + 1}`, "amount", e.target.value.replace(/[^0-9]/g, ""))}
                                  className="text-blue-600 font-medium"
                                />
                                <Input placeholder="(comments)" className="text-xs" />
                              </div>
                            );
                          })}
                        </div>

                        <div className="text-center font-semibold mt-6">
                          <span className="bg-black text-white px-4 py-2">TOTAL CLOSING COSTS: $1,151,500</span>
                        </div>
                      </div>
                    </div>
                  )}
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
                        onChange={(e) => handlePercentageChange(e.target.value, setExitCapRate)}
                        className="text-blue-600 font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>Sales Expense</Label>
                      <Input
                        value={formatPercentageDisplay(salesExpense)}
                        onChange={(e) => handlePercentageChange(e.target.value, setSalesExpense)}
                        className="text-blue-600 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bottom section - same for all tabs */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Acquisition Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="mr-4">Purchase Price</span>
                      <span className="font-medium">$ 55,500,000</span>
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