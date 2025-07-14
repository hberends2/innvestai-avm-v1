
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface OperatingRevenueModalProps {
  onClose: () => void;
  onNext: () => void;
}

const OperatingRevenueModal: React.FC<OperatingRevenueModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    fbRevenuePercentage: "",
    fbRevenuePOR: "",
    otherOperatedRevenuePOR: "",
    rentalsOtherIncomeAmount: "",
    rentalsOtherIncomePOR: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Operating Revenue Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Operating Revenue" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="fbRevenuePercentage"
          label="F&B Revenue - % of Rooms Revenue"
          type="percentage"
          value={formData.fbRevenuePercentage}
          onChange={(value) => handleInputChange("fbRevenuePercentage", value)}
        />
        
        <FormField
          id="fbRevenuePOR"
          label="F&B Revenue POR"
          type="currency"
          value={formData.fbRevenuePOR}
          onChange={(value) => handleInputChange("fbRevenuePOR", value)}
        />
        
        <FormField
          id="otherOperatedRevenuePOR"
          label="Other Operated Revenue POR"
          type="currency"
          value={formData.otherOperatedRevenuePOR}
          onChange={(value) => handleInputChange("otherOperatedRevenuePOR", value)}
        />
        
        <FormField
          id="rentalsOtherIncomeAmount"
          label="Rentals & Other Income (Net) Amount"
          type="currency"
          value={formData.rentalsOtherIncomeAmount}
          onChange={(value) => handleInputChange("rentalsOtherIncomeAmount", value)}
        />
        
        <FormField
          id="rentalsOtherIncomePOR"
          label="Rentals & Other Income (Net) POR"
          type="currency"
          value={formData.rentalsOtherIncomePOR}
          onChange={(value) => handleInputChange("rentalsOtherIncomePOR", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default OperatingRevenueModal;
