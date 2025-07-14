
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface UndistributedExpensesModalProps {
  onClose: () => void;
  onNext: () => void;
}

const UndistributedExpensesModal: React.FC<UndistributedExpensesModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    generalAdminPercentage: "",
    generalAdminAmount: "",
    generalAdminPOR: "",
    infoTelecomPercentage: "",
    infoTelecomAmount: "",
    infoTelecomPAR: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Undistributed Expenses Data (Page 1):", formData);
    // Here you could combine both forms' data and save
    onClose();
  };

  const handleNext = () => {
    console.log("Moving to next page with data:", formData);
    // Here you might want to store the data temporarily or pass it to the next page
    onNext();
  };

  return (
    <ModalWrapper 
      title="Undistributed Expenses - Page 1" 
      onClose={onClose} 
      onSave={handleSave}
      onNext={handleNext}
      showSave={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="generalAdminPercentage"
          label="General & Admin Expense - % of Rooms Revenue"
          type="percentage"
          value={formData.generalAdminPercentage}
          onChange={(value) => handleInputChange("generalAdminPercentage", value)}
        />
        
        <FormField
          id="generalAdminAmount"
          label="General & Admin Expense (Amount)"
          type="currency"
          value={formData.generalAdminAmount}
          onChange={(value) => handleInputChange("generalAdminAmount", value)}
        />
        
        <FormField
          id="generalAdminPOR"
          label="General & Admin Expense POR"
          type="currency"
          value={formData.generalAdminPOR}
          onChange={(value) => handleInputChange("generalAdminPOR", value)}
        />
        
        <FormField
          id="infoTelecomPercentage"
          label="Info & Telecom - % of Total Revenue"
          type="percentage"
          value={formData.infoTelecomPercentage}
          onChange={(value) => handleInputChange("infoTelecomPercentage", value)}
        />
        
        <FormField
          id="infoTelecomAmount"
          label="Info & Telecom (Amount)"
          type="currency"
          value={formData.infoTelecomAmount}
          onChange={(value) => handleInputChange("infoTelecomAmount", value)}
        />
        
        <FormField
          id="infoTelecomPAR"
          label="Info & Telecom PAR"
          type="currency"
          value={formData.infoTelecomPAR}
          onChange={(value) => handleInputChange("infoTelecomPAR", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default UndistributedExpensesModal;
