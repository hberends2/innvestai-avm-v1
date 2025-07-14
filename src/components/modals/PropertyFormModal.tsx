
import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import PropertyForm from "../property/PropertyForm";
import { Property } from "../../types/PropertyTypes";

interface PropertyFormModalProps {
  onClose: () => void;
  onSave: (property: Property) => void;
  property: Property | null;
}

const PropertyFormModal: React.FC<PropertyFormModalProps> = ({
  onClose,
  onSave,
  property
}) => {
  const isEditing = !!property;
  const [formData, setFormData] = useState<Partial<Property>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  
  const handleFormChange = (data: Partial<Property>, isValid: boolean) => {
    setFormData(data);
    setIsFormValid(isValid);
  };

  const handleSave = () => {
    if (!isFormValid) {
      alert("Please fill out all required fields");
      return;
    }

    onSave({
      id: property?.id || "",
      ...formData,
      rooms: Number(formData.rooms)
    } as Property);
  };

  return (
    <ModalWrapper 
      title={isEditing ? "Edit Property" : "Add Property"} 
      onClose={onClose} 
      onSave={handleSave}
      onNext={() => {}}
      showNext={false}
    >
      <PropertyForm 
        initialData={property || {}}
        onFormDataChange={handleFormChange}
      />
    </ModalWrapper>
  );
};

export default PropertyFormModal;
