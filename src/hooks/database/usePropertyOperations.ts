
import { useState } from "react";
import { useToast } from "../use-toast";
import { Property } from "../../types/PropertyTypes";
import { getLocalData, setLocalData, STORAGE_KEYS } from "./supabaseClient";

export const usePropertyOperations = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const saveProperty = async (property: Property) => {
    try {
      setLoading(true);
      
      // Get current properties from localStorage
      const properties = getLocalData<Property[]>(STORAGE_KEYS.PROPERTIES, []);
      
      if (property.id) {
        // Update existing property
        const updatedProperties = properties.map(p => 
          p.id === property.id ? { ...property, updated_at: new Date().toISOString() } : p
        );
        
        setLocalData(STORAGE_KEYS.PROPERTIES, updatedProperties);
        
        toast({
          title: "Property updated",
          description: "Property details have been saved locally"
        });
      } else {
        // Insert new property with a generated ID
        const newId = `local-${Date.now()}`;
        const newProperty = { 
          ...property, 
          id: newId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setLocalData(STORAGE_KEYS.PROPERTIES, [...properties, newProperty]);
        
        toast({
          title: "Property created",
          description: "New property has been added locally"
        });
        
        return newProperty;
      }
      
      return property;
      
    } catch (error: any) {
      console.error("Error saving property:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save property",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (propertyId: string) => {
    try {
      setLoading(true);
      
      // Get current properties and filter out the one to delete
      const properties = getLocalData<Property[]>(STORAGE_KEYS.PROPERTIES, []);
      const updatedProperties = properties.filter(p => p.id !== propertyId);
      
      // Update localStorage
      setLocalData(STORAGE_KEYS.PROPERTIES, updatedProperties);
      
      toast({
        title: "Property deleted",
        description: "Property has been removed locally"
      });
      
      return true;
    } catch (error: any) {
      console.error("Error deleting property:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete property",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getProperties = async () => {
    try {
      setLoading(true);
      
      // Get properties from localStorage
      const properties = getLocalData<Property[]>(STORAGE_KEYS.PROPERTIES, []);
      
      return properties;
    } catch (error: any) {
      console.error("Error fetching properties:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load properties",
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    saveProperty,
    deleteProperty,
    getProperties
  };
};
