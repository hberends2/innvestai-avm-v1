import { useState, useEffect } from "react";
import { useToast } from "./use-toast";
import { Property } from "../types/PropertyTypes";
import { initialProperties } from "../data/propertyData";
import { useDatabase } from "./useDatabase";

export const usePropertyData = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { saveProperty, deleteProperty: dbDeleteProperty, getProperties } = useDatabase();

  // Load properties from database on mount
  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      try {
        const dbProperties = await getProperties();
        
        // If we have properties in the database, use those
        // Otherwise, keep using the initial properties (for development)
        if (dbProperties && dbProperties.length > 0) {
          setProperties(dbProperties);
        }
      } catch (error) {
        console.error("Failed to load properties:", error);
        toast({
          title: "Data loading error",
          description: "Could not load properties from database. Using sample data instead.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);

  const addProperty = async (property: Omit<Property, "id">) => {
    // Create temporary ID for optimistic UI update
    const tempId = `temp-${Date.now()}`;
    const tempProperty = { ...property, id: tempId } as Property;
    
    // Update UI immediately (optimistic)
    setProperties(prev => [...prev, tempProperty]);
    
    // Save to database
    const savedProperty = await saveProperty(tempProperty);
    
    // If save was successful, update the property in state with real ID
    if (savedProperty) {
      setProperties(prev => 
        prev.map(p => p.id === tempId ? savedProperty : p)
      );
      return savedProperty;
    }
    
    // If save failed, revert the optimistic update
    setProperties(prev => prev.filter(p => p.id !== tempId));
    return null;
  };

  const updateProperty = async (property: Property) => {
    // Create backup of original property
    const originalProperty = properties.find(p => p.id === property.id);
    
    // Update UI immediately (optimistic)
    setProperties(properties.map(p => p.id === property.id ? property : p));
    
    // Save to database
    const savedProperty = await saveProperty(property);
    
    // If save failed, revert to original
    if (!savedProperty && originalProperty) {
      setProperties(properties.map(p => p.id === property.id ? originalProperty : p));
      return originalProperty;
    }
    
    return property;
  };

  const deleteProperty = async (propertyId: string) => {
    // Store property before deletion for possible recovery
    const deletedProperty = properties.find(p => p.id === propertyId);
    
    // Update UI immediately (optimistic)
    setProperties(properties.filter(property => property.id !== propertyId));
    
    // Delete from database
    const success = await dbDeleteProperty(propertyId);
    
    // If deletion failed, restore the property
    if (!success && deletedProperty) {
      setProperties(prev => [...prev, deletedProperty]);
      return false;
    }
    
    return true;
  };

  return {
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    isLoading
  };
};
