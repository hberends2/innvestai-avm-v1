
import React from "react";
import ModalWrapper from "../ui/ModalWrapper";
import { Property } from "../../types/PropertyTypes";
import { toast } from "../ui/use-toast";
import OccupancyForecastContent from "../occupancy-forecast/OccupancyForecastContent";
import { useOccupancyForecast } from "../../hooks/useOccupancyForecast";

interface OccupancyForecastModalProps {
  onClose: () => void;
  onNext: () => void;
  property?: Property | null;
}

const OccupancyForecastModal: React.FC<OccupancyForecastModalProps> = ({
  onClose,
  onNext,
  property
}) => {
  console.log("OccupancyForecastModal - Rendering");
  
  const { handleSave, loading } = useOccupancyForecast(property);
  
  const handleSaveClick = async () => {
    const success = await handleSave();
    if (success) {
      onClose();
    }
  };

  return (
    <ModalWrapper 
      title="Subject Occupancy Forecast" 
      onClose={onClose} 
      onSave={handleSaveClick}
      onNext={onNext}
      showNext={false}
      showSave={true}
      saveDisabled={loading}
      maxWidth="max-w-full w-11/12" // Using almost full width with a small margin
    >
      <div className="overflow-x-auto">
        <OccupancyForecastContent property={property} />
      </div>
    </ModalWrapper>
  );
};

export default OccupancyForecastModal;
