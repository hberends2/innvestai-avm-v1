
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface NonOperatingExpensesModalProps {
  onClose: () => void;
  onNext: () => void;
}

const NonOperatingExpensesModal: React.FC<NonOperatingExpensesModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    groundRentPercentage: "",
    groundRentAmount: "",
    insuranceExpensePercentage: "",
    insuranceExpenseAmount: "",
    leasesOtherAmount: "",
    leasesOtherPAR: "",
    propertyTaxesAmount: "",
    propertyTaxesPAR: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Non-Operating Expenses Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Non-Operating Expenses" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="groundRentPercentage"
          label="Ground Rent - % of Total Revenue"
          type="percentage"
          value={formData.groundRentPercentage}
          onChange={(value) => handleInputChange("groundRentPercentage", value)}
        />
        
        <FormField
          id="groundRentAmount"
          label="Ground Rent (Amount)"
          type="currency"
          value={formData.groundRentAmount}
          onChange={(value) => handleInputChange("groundRentAmount", value)}
        />
        
        <FormField
          id="insuranceExpensePercentage"
          label="Insurance Expense - % of Total Revenue"
          type="percentage"
          value={formData.insuranceExpensePercentage}
          onChange={(value) => handleInputChange("insuranceExpensePercentage", value)}
        />
        
        <FormField
          id="insuranceExpenseAmount"
          label="Insurance Expense (Amount)"
          type="currency"
          value={formData.insuranceExpenseAmount}
          onChange={(value) => handleInputChange("insuranceExpenseAmount", value)}
        />
        
        <FormField
          id="leasesOtherAmount"
          label="Leases & Other (Amount)"
          type="currency"
          value={formData.leasesOtherAmount}
          onChange={(value) => handleInputChange("leasesOtherAmount", value)}
        />
        
        <FormField
          id="leasesOtherPAR"
          label="Leases & Other PAR"
          type="currency"
          value={formData.leasesOtherPAR}
          onChange={(value) => handleInputChange("leasesOtherPAR", value)}
        />
        
        <FormField
          id="propertyTaxesAmount"
          label="Property Taxes (Amount)"
          type="currency"
          value={formData.propertyTaxesAmount}
          onChange={(value) => handleInputChange("propertyTaxesAmount", value)}
        />
        
        <FormField
          id="propertyTaxesPAR"
          label="Property Taxes PAR"
          type="currency"
          value={formData.propertyTaxesPAR}
          onChange={(value) => handleInputChange("propertyTaxesPAR", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default NonOperatingExpensesModal;
