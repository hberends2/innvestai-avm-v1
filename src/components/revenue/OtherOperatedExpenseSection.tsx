import React from "react";
import MetricRow from "./MetricRow";
import ExpenseSubSectionWithDropdown from "./ExpenseSubSectionWithDropdown";

interface OtherOperatedExpenseSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  expenseForecastMethod: string;
  fbExpenseInput: Record<number, string>;
  handleFbExpenseChange: (year: number, value: string) => void;
  handleFbExpenseBlur: (year: number, value: string) => void;
  otherOperatedExpenseInput: Record<number, string>;
  handleOtherOperatedExpenseChange: (year: number, value: string) => void;
  handleOtherOperatedExpenseBlur: (year: number, value: string) => void;
  miscellaneousExpenseInput: Record<number, string>;
  handleMiscellaneousExpenseChange: (year: number, value: string) => void;
  handleMiscellaneousExpenseBlur: (year: number, value: string) => void;
  allocatedExpenseInput: Record<number, string>;
  handleAllocatedExpenseChange: (year: number, value: string) => void;
  handleAllocatedExpenseBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
  calculateExpense: (year: number, inputValue: string, expenseType: string) => number;
  calculateTotalOtherOperatedExpense: (year: number) => number;
  getTotalHistoricalOtherOperatedExpense: (year: number) => number;
  historicalExpenseData: any;
  historicalData: any;
  helpers: any;
}

const OtherOperatedExpenseSection: React.FC<OtherOperatedExpenseSectionProps> = ({
  historicalYears,
  forecastYears,
  expenseForecastMethod,
  fbExpenseInput,
  handleFbExpenseChange,
  handleFbExpenseBlur,
  otherOperatedExpenseInput,
  handleOtherOperatedExpenseChange,
  handleOtherOperatedExpenseBlur,
  miscellaneousExpenseInput,
  handleMiscellaneousExpenseChange,
  handleMiscellaneousExpenseBlur,
  allocatedExpenseInput,
  handleAllocatedExpenseChange,
  handleAllocatedExpenseBlur,
  formatCurrency,
  formatPercent,
  calculateExpense,
  calculateTotalOtherOperatedExpense,
  getTotalHistoricalOtherOperatedExpense,
  historicalExpenseData,
  historicalData,
  helpers
}) => {
  // State for individual dropdown selections
  const [fbExpenseMethod, setFbExpenseMethod] = React.useState<string>("POR");
  const [otherOperatedMethod, setOtherOperatedMethod] = React.useState<string>("% of Revenue");
  const [miscellaneousMethod, setMiscellaneousMethod] = React.useState<string>("Manual Input");

  return (
    <>
      <tr id="other-operated-expense-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      <MetricRow
        label={<span className="font-bold text-gray-900">Other Expense</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
        isMajorSectionHeader={true}
      />

      {/* Food & Beverage Expense */}
      <ExpenseSubSectionWithDropdown
        sectionId="fb-expense-section"
        title="Food & Beverage Expense"
        expenseType="fb"
        dropdownValue={fbExpenseMethod}
        onDropdownChange={setFbExpenseMethod}
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        expenseInput={fbExpenseInput}
        handleExpenseChange={handleFbExpenseChange}
        handleExpenseBlur={handleFbExpenseBlur}
        formatCurrency={formatCurrency}
        historicalExpenseData={historicalExpenseData}
        historicalData={historicalData}
        helpers={helpers}
      />

      {/* Other Operated Expense */}
      <ExpenseSubSectionWithDropdown
        sectionId="other-operated-expense-item-section"
        title="Other Operated Expense"
        expenseType="otherOperated"
        dropdownValue={otherOperatedMethod}
        onDropdownChange={setOtherOperatedMethod}
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        expenseInput={otherOperatedExpenseInput}
        handleExpenseChange={handleOtherOperatedExpenseChange}
        handleExpenseBlur={handleOtherOperatedExpenseBlur}
        formatCurrency={formatCurrency}
        historicalExpenseData={historicalExpenseData}
        historicalData={historicalData}
        helpers={helpers}
      />

      {/* Miscellaneous Expense */}
      <ExpenseSubSectionWithDropdown
        sectionId="miscellaneous-expense-section"
        title="Miscellaneous Expense"
        expenseType="miscellaneous"
        dropdownValue={miscellaneousMethod}
        onDropdownChange={setMiscellaneousMethod}
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        expenseInput={miscellaneousExpenseInput}
        handleExpenseChange={handleMiscellaneousExpenseChange}
        handleExpenseBlur={handleMiscellaneousExpenseBlur}
        formatCurrency={formatCurrency}
        historicalExpenseData={historicalExpenseData}
        historicalData={historicalData}
        helpers={helpers}
      />

      {/* Total Other Operated Expense Row */}
      <MetricRow
        label={<span className="font-bold italic">Total Other Expense</span>}
        historicalData={historicalYears.map(year => 
          <span className="font-bold italic">{formatCurrency(getTotalHistoricalOtherOperatedExpense(year))}</span>
        )}
        forecastData={forecastYears.map(year => 
          <span className="font-bold italic">{formatCurrency(calculateTotalOtherOperatedExpense(year))}</span>
        )}
      />
    </>
  );
};

export default OtherOperatedExpenseSection;
