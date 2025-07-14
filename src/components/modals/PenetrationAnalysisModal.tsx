
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import FormField from "../ui/FormField";
import Dropdown from "../ui/Dropdown";

interface PenetrationAnalysisModalProps {
  onClose: () => void;
  onNext: () => void;
}

const PenetrationAnalysisModal: React.FC<PenetrationAnalysisModalProps> = ({ onClose, onNext }) => {
  console.log("PenetrationAnalysisModal - Rendering");
  
  const [formData, setFormData] = useState({
    compName: "",
    compNbrOfRooms: "",
    marketAdrPctChange: "",
    marketOccupancyPct: "",
    occupiedRoomGrowthPct: "",
    propertyAdrPctChange: "",
    sampleHotelOccupancy: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle closing the modal - ensure we clear navigation state
  const handleClose = () => {
    console.log("PenetrationAnalysisModal - Closing modal");
    window.history.replaceState({}, document.title); // Clear any stored state
    onClose();
  };

  // Save functionality - ensure we clear navigation state
  const handleSave = () => {
    console.log("Saving Penetration Analysis Data:", formData);
    window.history.replaceState({}, document.title); // Clear any stored state
    onClose();
  };

  // Next button handler - ensures we clear any lingering state
  const handleNext = () => {
    console.log("PenetrationAnalysisModal - Next button clicked");
    window.history.replaceState({}, document.title); // Clear any stored state
    onNext();
  };

  return (
    <ModalWrapper 
      title="Penetration Analysis" 
      onClose={handleClose} 
      onSave={handleSave} 
      onNext={handleNext}
      showNext={true}
      showSave={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="compName"
          label="Comp Name"
          type="text"
          value={formData.compName}
          onChange={(value) => handleInputChange("compName", value)}
        />
        
        <FormField
          id="compNbrOfRooms"
          label="Comp Nbr of Rooms"
          type="integer"
          value={formData.compNbrOfRooms}
          onChange={(value) => handleInputChange("compNbrOfRooms", value)}
        />
        
        <FormField
          id="marketAdrPctChange"
          label="Market ADR % Change"
          type="percentage"
          value={formData.marketAdrPctChange}
          onChange={(value) => handleInputChange("marketAdrPctChange", value)}
        />
        
        <FormField
          id="marketOccupancyPct"
          label="Market Occupancy Pct"
          type="percentage"
          value={formData.marketOccupancyPct}
          onChange={(value) => handleInputChange("marketOccupancyPct", value)}
        />
        
        <FormField
          id="occupiedRoomGrowthPct"
          label="Occupied Room Growth Pct"
          type="percentage"
          value={formData.occupiedRoomGrowthPct}
          onChange={(value) => handleInputChange("occupiedRoomGrowthPct", value)}
        />
        
        <FormField
          id="propertyAdrPctChange"
          label="Property ADR % Change"
          type="percentage"
          value={formData.propertyAdrPctChange}
          onChange={(value) => handleInputChange("propertyAdrPctChange", value)}
        />
        
        <FormField
          id="sampleHotelOccupancy"
          label="Sample Hotel Occupancy"
          type="percentage"
          value={formData.sampleHotelOccupancy}
          onChange={(value) => handleInputChange("sampleHotelOccupancy", value)}
        />
      </div>
    </ModalWrapper>
  );
};

export default PenetrationAnalysisModal;
