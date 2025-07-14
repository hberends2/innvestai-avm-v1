
import { useState } from "react";
import { useToast } from "../use-toast";
import { getLocalData, setLocalData, STORAGE_KEYS } from "./supabaseClient";

export const useOccupancyOperations = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const saveOccupancyData = async (propertyId: string, occupancyData: any) => {
    try {
      setLoading(true);
      
      // Get current occupancy data from localStorage
      const allOccupancyData = getLocalData<Record<string, any>>(STORAGE_KEYS.OCCUPANCY_DATA, {});
      
      // Update the data for this property
      const updatedData = {
        ...allOccupancyData,
        [propertyId]: {
          ...occupancyData,
          updated_at: new Date().toISOString()
        }
      };
      
      // Save to localStorage
      setLocalData(STORAGE_KEYS.OCCUPANCY_DATA, updatedData);
      
      toast({
        title: "Data saved",
        description: "Occupancy forecast data has been saved locally"
      });
      
      return true;
    } catch (error: any) {
      console.error("Error saving occupancy data:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save occupancy data",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    saveOccupancyData
  };
};
