
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface DepartmentalExpensesModalProps {
  onClose: () => void;
  onNext: () => void;
}

const DepartmentalExpensesModal: React.FC<DepartmentalExpensesModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    fbExpensePercentage: "",
    fbExpenseAmount: "",
    fbExpensePOR: "",
    otherOperatedExpensePercentage: "",
    otherOperatedExpenseAmount: "",
    otherOperatedExpensePOR: "",
    roomsExpensePercentage: "",
    roomsExpenseAmount: "",
    roomsExpensePOR: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Departmental Expenses Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Departmental Expenses" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="fbExpensePercentage"
          label="F&B Expense - % of F&B Revenue"
          type="percentage"
          value={formData.fbExpensePercentage}
          onChange={(value) => handleInputChange("fbExpensePercentage", value)}
        />
        
        <FormField
          id="fbExpenseAmount"
          label="F&B Expense (Amount)"
          type="currency"
          value={formData.fbExpenseAmount}
          onChange={(value) => handleInputChange("fbExpenseAmount", value)}
        />
        
        <FormField
          id="fbExpensePOR"
          label="F&B Expense POR"
          type="currency"
          value={formData.fbExpensePOR}
          onChange={(value) => handleInputChange("fbExpensePOR", value)}
        />
        
        <FormField
          id="otherOperatedExpensePercentage"
          label="Other Operated Expense - % of Other Operated Revenue"
          type="percentage"
          value={formData.otherOperatedExpensePercentage}
          onChange={(value) => handleInputChange("otherOperatedExpensePercentage", value)}
        />
        
        <FormField
          id="otherOperatedExpenseAmount"
          label="Other Operated Expense (Amount)"
          type="currency"
          value={formData.otherOperatedExpenseAmount}
          onChange={(value) => handleInputChange("otherOperatedExpenseAmount", value)}
        />
        
        <FormField
          id="otherOperatedExpensePOR"
          label="Other Operated Expense POR"
          type="currency"
          value={formData.otherOperatedExpensePOR}
          onChange={(value) => handleInputChange("otherOperatedExpensePOR", value)}
        />
        
        <FormField
          id="roomsExpensePercentage"
          label="Rooms Expense - % of Rooms Revenue"
          type="percentage"
          value={formData.roomsExpensePercentage}
          onChange={(value) => handleInputChange("roomsExpensePercentage", value)}
        />
        
        <FormField
          id="roomsExpenseAmount"
          label="Rooms Expense (Amount)"
          type="currency"
          value={formData.roomsExpenseAmount}
          onChange={(value) => handleInputChange("roomsExpenseAmount", value)}
        />
        
        <FormField
          id="roomsExpensePOR"
          label="Rooms Expense POR"
          type="currency"
          value={formData.roomsExpensePOR}
          onChange={(value) => handleInputChange("roomsExpensePOR", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default DepartmentalExpensesModal;
