
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";

interface ManagementAndFranchiseFeesModalProps {
  onClose: () => void;
  onNext: () => void;
}

const ManagementAndFranchiseFeesModal: React.FC<ManagementAndFranchiseFeesModalProps> = ({ onClose, onNext }) => {
  const [formData, setFormData] = useState({
    baseManagementFee: "",
    franchiseFeeFB: "",
    franchiseFeeRooms: "",
    incentiveManagementFeePercentage: "",
    incentiveManagementFeeAmount: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving Management & Franchise Fees Data:", formData);
    onClose();
  };

  return (
    <ModalWrapper title="Management & Franchise Fees" onClose={onClose} onSave={handleSave} onNext={onNext}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="baseManagementFee"
          label="Base Management Fee - % of Total Revenue"
          type="percentage"
          value={formData.baseManagementFee}
          onChange={(value) => handleInputChange("baseManagementFee", value)}
        />
        
        <FormField
          id="franchiseFeeFB"
          label="Franchise Fees - % of F&B Revenue"
          type="percentage"
          value={formData.franchiseFeeFB}
          onChange={(value) => handleInputChange("franchiseFeeFB", value)}
        />
        
        <FormField
          id="franchiseFeeRooms"
          label="Franchise Fees - % of Rooms Revenue"
          type="percentage"
          value={formData.franchiseFeeRooms}
          onChange={(value) => handleInputChange("franchiseFeeRooms", value)}
        />
        
        <FormField
          id="incentiveManagementFeePercentage"
          label="Incentive Management Fee - % of Total Revenue"
          type="percentage"
          value={formData.incentiveManagementFeePercentage}
          onChange={(value) => handleInputChange("incentiveManagementFeePercentage", value)}
        />
        
        <FormField
          id="incentiveManagementFeeAmount"
          label="Incentive Management Fee (Amount)"
          type="currency"
          value={formData.incentiveManagementFeeAmount}
          onChange={(value) => handleInputChange("incentiveManagementFeeAmount", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default ManagementAndFranchiseFeesModal;
