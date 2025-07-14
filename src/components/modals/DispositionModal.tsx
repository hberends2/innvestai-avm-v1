
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface DispositionModalProps {
  onClose: () => void;
  onNext: () => void;
}

const DispositionModal: React.FC<DispositionModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    capRate: "",
    exitCosts: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Disposition Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Disposition" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="capRate"
          label="Cap Rate (Exit)"
          type="percentage"
          value={formData.capRate}
          onChange={(value) => handleInputChange("capRate", value)}
        />
        
        <FormField
          id="exitCosts"
          label="Sales Expense %"
          type="percentage"
          value={formData.exitCosts}
          onChange={(value) => handleInputChange("exitCosts", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default DispositionModal;
