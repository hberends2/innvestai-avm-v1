
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface FinancingModalProps {
  onClose: () => void;
  onNext: () => void;
}

const FinancingModal: React.FC<FinancingModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    amortizationPeriod: "",
    discountRate: "",
    interestRate: "",
    interestOnlyPeriod: "",
    loanFees: "",
    loanTerm: "",
    ltvRatio: "",
    majorCapExReserve: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Financing Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Financing" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="amortizationPeriod"
          label="Amortization Period (Years)"
          type="integer"
          value={formData.amortizationPeriod}
          onChange={(value) => handleInputChange("amortizationPeriod", value)}
        />
        
        <FormField
          id="discountRate"
          label="Discount Rate"
          type="percentage"
          value={formData.discountRate}
          onChange={(value) => handleInputChange("discountRate", value)}
        />
        
        <FormField
          id="interestRate"
          label="Interest Rate"
          type="percentage"
          value={formData.interestRate}
          onChange={(value) => handleInputChange("interestRate", value)}
        />
        
        <FormField
          id="interestOnlyPeriod"
          label="Interest-Only Period (Years)"
          type="integer"
          value={formData.interestOnlyPeriod}
          onChange={(value) => handleInputChange("interestOnlyPeriod", value)}
        />
        
        <FormField
          id="loanFees"
          label="Loan Fees %"
          type="percentage"
          value={formData.loanFees}
          onChange={(value) => handleInputChange("loanFees", value)}
        />
        
        <FormField
          id="loanTerm"
          label="Loan Term"
          type="integer"
          value={formData.loanTerm}
          onChange={(value) => handleInputChange("loanTerm", value)}
        />
        
        <FormField
          id="ltvRatio"
          label="LTV Ratio"
          type="percentage"
          value={formData.ltvRatio}
          onChange={(value) => handleInputChange("ltvRatio", value)}
        />
        
        <FormField
          id="majorCapExReserve"
          label="Major CapEx Reserve (Amount)"
          type="currency"
          value={formData.majorCapExReserve}
          onChange={(value) => handleInputChange("majorCapExReserve", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default FinancingModal;
