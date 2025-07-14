
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";
import Dropdown from "../ui/Dropdown";

interface FFEReserveModalProps {
  onClose: () => void;
  onNext: () => void;
}

const FFEReserveModal: React.FC<FFEReserveModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    reserveForReplacement: "",
    contingency: "",
  });

  const [contingencyOption, setContingencyOption] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving FF&E Reserve Data:", {
      ...formData,
      contingency: contingencyOption,
    });
    
    onClose();
  };

  return (
    <ModalWrapper title="FF&E Reserve" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="reserveForReplacement"
          label="Reserve for Replacement - % of Total Revenue"
          type="percentage"
          value={formData.reserveForReplacement}
          onChange={(value) => handleInputChange("reserveForReplacement", value)}
        />
        
        <Dropdown
          id="contingency"
          label="Contingency (Option)"
          value={contingencyOption}
          onChange={setContingencyOption}
        />
      </div>
    </ModalWrapper>
  );
};

export default FFEReserveModal;
