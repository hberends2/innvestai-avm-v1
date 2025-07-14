
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface CapsModalProps {
  onClose: () => void;
  onNext: () => void;
}

const CapsModal: React.FC<CapsModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    capExType: "",
    overtFranchiseCaps: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Caps Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Capital Expense" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="capExType"
          label="CapEx Type"
          type="text"
          value={formData.capExType}
          onChange={(value) => handleInputChange("capExType", value)}
        />
        
        <FormField
          id="overtFranchiseCaps"
          label="Owner Funded CapEx"
          type="percentage"
          value={formData.overtFranchiseCaps}
          onChange={(value) => handleInputChange("overtFranchiseCaps", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default CapsModal;
