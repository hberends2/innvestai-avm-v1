import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import FormField from "../ui/FormField";
import Dropdown from "../ui/Dropdown";
import ThumbnailUpload from "../ui/ThumbnailUpload";
import { Checkbox } from "../ui/checkbox";
import { usePropertyData } from "../../hooks/usePropertyData";
import { useToast } from "../../hooks/use-toast";

interface PropertyDetailsModalProps {
  open: boolean;
  onClose: () => void;
  onNext: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ open, onClose, onNext }) => {
  const { addProperty } = usePropertyData();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    propertyName: "",
    censusId: "",
    propertyAddress: "",
    city: "",
    state: "",
    numberOfRooms: "",
    propertyType: "",
    versionName: "",
    status: "",
    brand: "",
    management: "",
    zipCode: "",
  });

  const [propertyTypeOption, setPropertyTypeOption] = useState("");
  const [statusOption, setStatusOption] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isMarketComp, setIsMarketComp] = useState(false);

  // Property type options
  const propertyTypeOptions = [
    "Full Service",
    "Select Service",
    "Convention",
    "Extended Stay",
    "All Inclusive"
  ];

  // Status options (keeping as placeholders)
  const statusOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
  
  // All 50 US states with 2-letter abbreviations, sorted alphabetically
  const stateOptions = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleThumbnailChange = (file: File | null) => {
    setThumbnailFile(file);
  };

  const handleSave = async () => {
    // No validation required - allow saving with empty fields

    // Create property object matching the Property type
    const propertyData = {
      strCode: formData.censusId || "",
      name: formData.propertyName,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      class: propertyTypeOption,
      affDate: new Date().toISOString().split('T')[0], // Current date as default
      openDate: new Date().toISOString().split('T')[0], // Current date as default
      rooms: parseInt(formData.numberOfRooms) || 0,
      chgInRms: "",
      chgInRms1: "",
      chgInRms2: "",
      chgInRms3: ""
    };

    try {
      const savedProperty = await addProperty(propertyData);
      if (savedProperty) {
        toast({
          title: "Property Saved",
          description: "Property details have been saved successfully"
        });
        onNext();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save property details",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Property Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <FormField
            id="propertyName"
            label="Property Name"
            type="text"
            value={formData.propertyName}
            onChange={(value) => handleInputChange("propertyName", value)}
            required
          />
          
          <FormField
            id="censusId"
            label="Census ID"
            type="integer"
            value={formData.censusId}
            onChange={(value) => handleInputChange("censusId", value)}
          />
          
          <FormField
            id="propertyAddress"
            label="Property Address"
            type="text"
            value={formData.propertyAddress}
            onChange={(value) => handleInputChange("propertyAddress", value)}
            required
          />
          
          <FormField
            id="city"
            label="City"
            type="text"
            value={formData.city}
            onChange={(value) => handleInputChange("city", value)}
            required
          />
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <Dropdown
                id="state"
                label="State"
                value={formData.state}
                onChange={(value) => handleInputChange("state", value)}
                options={stateOptions}
                required
              />
            </div>
            <div className="w-1/2">
              <FormField
                id="zipCode"
                label="Zip Code"
                type="integer"
                value={formData.zipCode}
                onChange={(value) => handleInputChange("zipCode", value)}
                required
              />
            </div>
          </div>
          
          <FormField
            id="numberOfRooms"
            label="Rooms / Keys"
            type="integer"
            value={formData.numberOfRooms}
            onChange={(value) => handleInputChange("numberOfRooms", value)}
            required
          />
          
          <Dropdown
            id="propertyType"
            label="Property Type"
            value={propertyTypeOption}
            onChange={setPropertyTypeOption}
            options={propertyTypeOptions}
            required
          />
          
          <Dropdown
            id="status"
            label="Status"
            value={statusOption}
            onChange={setStatusOption}
            options={statusOptions}
            required
          />

          <FormField
            id="brand"
            label="Brand"
            type="text"
            value={formData.brand}
            onChange={(value) => handleInputChange("brand", value)}
          />
          
          <FormField
            id="management"
            label="Management"
            type="text"
            value={formData.management}
            onChange={(value) => handleInputChange("management", value)}
          />
          
          <FormField
            id="versionName"
            label="Version Name"
            type="text"
            value={formData.versionName}
            onChange={(value) => handleInputChange("versionName", value)}
          />

          <div className="flex items-center space-x-2">
            <label htmlFor="marketComp" className="text-xs font-medium">
              Market Comp
            </label>
            <Checkbox
              id="marketComp"
              checked={isMarketComp}
              onCheckedChange={(checked) => setIsMarketComp(checked === true)}
            />
          </div>

          <div className="md:col-span-2">
            <ThumbnailUpload
              onFileSelect={handleThumbnailChange}
              value={thumbnailFile}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
            Next
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailsModal;
