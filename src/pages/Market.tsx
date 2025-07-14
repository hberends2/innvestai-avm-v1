
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "../components/ui/button";
import { PlusSquare } from "lucide-react";
import PropertyFormModal from "../components/modals/PropertyFormModal";
import PropertyTable from "../components/market/PropertyTable";
import { usePropertyData } from "../hooks/usePropertyData";
import { Property } from "../types/PropertyTypes";
import { toast } from "../hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

const Market: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const { properties, addProperty, updateProperty, deleteProperty, isLoading } = usePropertyData();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Log when this component is mounted
  useEffect(() => {
    console.log("Market component mounted or updated");
    console.log("Current route:", location.pathname);
    
    return () => {
      console.log("Market component will unmount");
    };
  }, [location.pathname]);

  // Open modal for adding new property
  const handleAddProperty = () => {
    console.log("Opening add property modal");
    setEditingProperty(null);
    setIsModalOpen(true);
  };
  
  // Open modal for editing existing property
  const handleEditProperty = (property: Property) => {
    console.log("Opening edit property modal for:", property.id);
    setEditingProperty(property);
    setIsModalOpen(true);
  };
  
  // Handle adding or updating properties
  const handleSaveProperty = async (property: Property) => {
    if (editingProperty) {
      // Update existing property
      console.log("Updating property:", property.id);
      await updateProperty(property);
    } else {
      // Add new property
      console.log("Adding new property");
      await addProperty(property);
    }
    setIsModalOpen(false);
  };

  const handleSidebarItemClick = (modalName: string) => {
    console.log("Sidebar item clicked in Market page:", modalName);
    
    // If the modal needs to be opened on the index page, navigate there first
    if (modalName !== "marketComps") {
      console.log("Navigating to Index page to open modal:", modalName);
      // Make sure we pass the modal name in the state to trigger opening on the Index page
      navigate('/', { 
        state: { 
          openModal: modalName,
          timestamp: Date.now() // Add timestamp to ensure state is seen as "new"
        } 
      });
    } else {
      toast({
        title: "Navigation",
        description: `Already on ${modalName} page`
      });
    }
  };
  
  // Start property analysis workflow
  const handleAnalyzeProperty = (property: Property) => {
    console.log("Analyzing property:", property.id);
    // Navigate to Index page and open subject occupancy modal with this property
    navigate('/', { 
      state: { 
        openModal: "subjectOccupancy",
        propertyId: property.id,
        timestamp: Date.now()
      } 
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onItemClick={handleSidebarItemClick} />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="w-full">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Market Comps</h1>
            <Button onClick={handleAddProperty} className="flex items-center gap-2">
              <PlusSquare className="h-5 w-5" />
              <span>Add Property</span>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading properties...</p>
            </div>
          ) : (
            <PropertyTable 
              properties={properties}
              onEdit={handleEditProperty}
              onDelete={deleteProperty}
              onAnalyze={handleAnalyzeProperty}
            />
          )}
        </div>
      </div>

      {isModalOpen && (
        <PropertyFormModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProperty}
          property={editingProperty}
        />
      )}
    </div>
  );
};

export default Market;
