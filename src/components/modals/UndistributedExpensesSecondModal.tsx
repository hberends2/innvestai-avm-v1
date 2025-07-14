
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface UndistributedExpensesSecondModalProps {
  onClose: () => void;
  onNext: () => void;
}

const UndistributedExpensesSecondModal: React.FC<UndistributedExpensesSecondModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    propertyOpsPAR: "",
    propertyOpsPOR: "",
    propertyOpsPercentage: "",
    marketingPercentage: "",
    marketingAmount: "",
    marketingPAR: "",
    utilitiesPAR: "",
    utilitiesPOR: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Undistributed Expenses Data (Page 2):", formData);
    onClose();
  };

  return (
    <ModalWrapper 
      title="Undistributed Expenses - Page 2" 
      onClose={onClose} 
      onSave={handleSave} 
      onNext={onNext}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="propertyOpsPAR"
          label="Property Operations & Maintenance PAR"
          type="currency"
          value={formData.propertyOpsPAR}
          onChange={(value) => handleInputChange("propertyOpsPAR", value)}
        />
        
        <FormField
          id="propertyOpsPOR"
          label="Property Operations & Maintenance POR"
          type="currency"
          value={formData.propertyOpsPOR}
          onChange={(value) => handleInputChange("propertyOpsPOR", value)}
        />
        
        <FormField
          id="propertyOpsPercentage"
          label="Property Operations & Maintenance-% of Total Revenue"
          type="percentage"
          value={formData.propertyOpsPercentage}
          onChange={(value) => handleInputChange("propertyOpsPercentage", value)}
        />
        
        <FormField
          id="marketingPercentage"
          label="Sales & Marketing Expense - % of Total Revenue"
          type="percentage"
          value={formData.marketingPercentage}
          onChange={(value) => handleInputChange("marketingPercentage", value)}
        />
        
        <FormField
          id="marketingAmount"
          label="Sales & Marketing Expense (Amount)"
          type="currency"
          value={formData.marketingAmount}
          onChange={(value) => handleInputChange("marketingAmount", value)}
        />
        
        <FormField
          id="marketingPAR"
          label="Sales & Marketing Expense PAR"
          type="currency"
          value={formData.marketingPAR}
          onChange={(value) => handleInputChange("marketingPAR", value)}
        />
        
        <FormField
          id="utilitiesPAR"
          label="Utilities Expense PAR"
          type="currency"
          value={formData.utilitiesPAR}
          onChange={(value) => handleInputChange("utilitiesPAR", value)}
        />
        
        <FormField
          id="utilitiesPOR"
          label="Utilities Expense POR"
          type="currency"
          value={formData.utilitiesPOR}
          onChange={(value) => handleInputChange("utilitiesPOR", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default UndistributedExpensesSecondModal;
