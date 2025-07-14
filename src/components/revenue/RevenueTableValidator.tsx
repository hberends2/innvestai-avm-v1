
import React from "react";
import { RevenueTableProps } from "./RevenueTableTypes";

interface RevenueTableValidatorProps extends RevenueTableProps {
  children: React.ReactNode;
}

const RevenueTableValidator: React.FC<RevenueTableValidatorProps> = ({ 
  historicalData, 
  formatCurrency, 
  formatPercent, 
  children 
}) => {
  console.log('RevenueTableValidator validating props');

  // Early return if critical props are missing
  if (!historicalData || !formatCurrency || !formatPercent) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-2">
        <div className="text-gray-600">
          Loading revenue table...
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RevenueTableValidator;
