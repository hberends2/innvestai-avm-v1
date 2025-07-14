
import React, { useEffect, useState } from "react";
import FormField from "../ui/FormField";
import Dropdown from "../ui/Dropdown";
import { Property } from "../../types/PropertyTypes";

interface PropertyFormProps {
  initialData: Partial<Property>;
  onFormDataChange: (formData: Partial<Property>, isValid: boolean) => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, onFormDataChange }) => {
  const [formData, setFormData] = useState<Partial<Property>>({
    strCode: "",
    name: "",
    city: "",
    state: "",
    zipCode: "",
    class: "",
    affDate: "",
    openDate: "",
    rooms: 0,
    chgInRms: "",
    chgInRms1: "",
    chgInRms2: "",
    chgInRms3: "",
    ...initialData
  });

  const [classOption, setClassOption] = useState(initialData.class || "");

  useEffect(() => {
    const requiredFields = ["strCode", "name", "city", "state", "zipCode", "class", "rooms"];
    
    const isFormValid = requiredFields.every(
      field => field === "class" 
        ? classOption !== ""
        : formData[field as keyof typeof formData] !== ""
    );

    // Update the parent with both form data and validation status
    onFormDataChange({
      ...formData,
      class: classOption
    }, isFormValid);
  }, [formData, classOption, onFormDataChange]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        id="strCode"
        label="STR Code"
        type="text"
        value={formData.strCode || ""}
        onChange={(value) => handleInputChange("strCode", value)}
        required
      />
      
      <FormField
        id="name"
        label="Name of Establishment"
        type="text"
        value={formData.name || ""}
        onChange={(value) => handleInputChange("name", value)}
        required
      />
      
      <FormField
        id="city"
        label="City"
        type="text"
        value={formData.city || ""}
        onChange={(value) => handleInputChange("city", value)}
        required
      />
      
      <FormField
        id="state"
        label="State"
        type="text"
        value={formData.state || ""}
        onChange={(value) => handleInputChange("state", value)}
        required
      />
      
      <FormField
        id="zipCode"
        label="Zip Code"
        type="text"
        value={formData.zipCode || ""}
        onChange={(value) => handleInputChange("zipCode", value)}
        required
      />
      
      <Dropdown
        id="class"
        label="Class"
        value={classOption}
        onChange={setClassOption}
        required
      />
      
      <FormField
        id="affDate"
        label="Aff Date"
        type="text"
        value={formData.affDate || ""}
        onChange={(value) => handleInputChange("affDate", value)}
      />
      
      <FormField
        id="openDate"
        label="Open Date"
        type="text"
        value={formData.openDate || ""}
        onChange={(value) => handleInputChange("openDate", value)}
      />
      
      <FormField
        id="rooms"
        label="Rooms"
        type="integer"
        value={formData.rooms?.toString() || "0"}
        onChange={(value) => handleInputChange("rooms", parseInt(value) || 0)}
        required
      />
      
      <FormField
        id="chgInRms"
        label="Chg in Rms"
        type="text"
        value={formData.chgInRms || ""}
        onChange={(value) => handleInputChange("chgInRms", value)}
      />
      
      <FormField
        id="chgInRms1"
        label="Chg in Rms 1"
        type="text"
        value={formData.chgInRms1 || ""}
        onChange={(value) => handleInputChange("chgInRms1", value)}
      />
      
      <FormField
        id="chgInRms2"
        label="Chg in Rms 2"
        type="text"
        value={formData.chgInRms2 || ""}
        onChange={(value) => handleInputChange("chgInRms2", value)}
      />
      
      <FormField
        id="chgInRms3"
        label="Chg in Rms 3"
        type="text"
        value={formData.chgInRms3 || ""}
        onChange={(value) => handleInputChange("chgInRms3", value)}
      />
    </div>
  );
};

export default PropertyForm;
