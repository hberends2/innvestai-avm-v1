


// Helper function to calculate expenses
export const calculateExpense = (year: number, inputValue: string, expenseType: string) => {
  // Basic calculation - this should match your expense calculation logic
  const value = parseFloat(inputValue) || 0;
  return value;
};

// Helper function to get historical expense data
export const getHistoricalExpenseData = (year: number, expenseType: string, historicalExpenseData: any) => {
  return historicalExpenseData?.[expenseType]?.[year]?.toString() || "0";
};

// Helper function to calculate total undistributed expenses
export const calculateTotalUndistributedExpenses = (year: number, historicalExpenseData: any) => {
  const propertyOps = historicalExpenseData?.propertyOperations?.[year] || 0;
  const adminGeneral = historicalExpenseData?.administrativeGeneral?.[year] || 0;
  const infoTech = historicalExpenseData?.infoTechServices?.[year] || 0;
  const salesMarketing = historicalExpenseData?.salesMarketing?.[year] || 0;
  const utilities = historicalExpenseData?.utilities?.[year] || 0;
  
  return propertyOps + adminGeneral + infoTech + salesMarketing + utilities;
};
