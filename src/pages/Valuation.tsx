import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
                <div className="grid grid-cols-2 gap-8">
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
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <Label>Loan Fees</Label>
                      <Input
                        value={formatPercentageDisplay(loanFees)}
                        onChange={(e) => handlePercentageChange(e.target.value, setLoanFees)}
                        className="text-blue-600 font-medium"
                      />
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