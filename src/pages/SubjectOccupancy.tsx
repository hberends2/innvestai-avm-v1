import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import OccupancyReportContent from "../components/occupancy-forecast/OccupancyReportContent";
import OccupancyForecastContent from "../components/occupancy-forecast/OccupancyForecastContent";
import { usePropertyData } from "../hooks/usePropertyData";
import { Property } from "../types/PropertyTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
const SubjectOccupancy = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("report");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const {
    properties
  } = usePropertyData();
  const location = useLocation();

  // Handle sidebar item clicks
  const handleItemClick = (modalName: string) => {
    setActiveModal(modalName);
  };
  const closeModal = () => {
    setActiveModal(null);
  };

  // Initialize with property from navigation state or first available property
  useEffect(() => {
    // Check if we have a property ID in the location state
    if (location.state && location.state.propertyId) {
      const property = properties.find(p => p.id === location.state.propertyId) || null;
      setSelectedProperty(property);

      // If a property was passed and forecast tab is specified, switch to it
      if (property && location.state.tab === "forecast") {
        setActiveTab("forecast");
      }

      // Clear the location state to prevent reapplying on updates
      window.history.replaceState({}, document.title);
    } else if (properties.length > 0 && !selectedProperty) {
      // Default to the first property if none is selected and properties are available
      setSelectedProperty(properties[0]);
    }
  }, [location, properties, selectedProperty]);

  // Handle property selection change
  const handlePropertyChange = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId) || null;
    setSelectedProperty(property);
  };
  return <div className="min-h-screen flex w-full">
      <Sidebar onItemClick={handleItemClick} />
      <main className="flex-1 p-6 bg-gray-50">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Occupancy Analysis</h1>
          
          {/* Property Selection Dropdown (if multiple properties exist) */}
          {properties.length > 1 && <div className="mb-6">
              
              
            </div>}
          
          {/* Tabs for switching between report and forecast input */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              
              
            </TabsList>
            
            <TabsContent value="report" className="mt-6">
              <OccupancyReportContent />
            </TabsContent>
            
            <TabsContent value="forecast" className="mt-6">
              {selectedProperty ? <OccupancyForecastContent property={selectedProperty} /> : <div className="text-center p-6 bg-gray-100 rounded-lg">
                  <p className="text-gray-600">
                    Select a property to create an occupancy forecast.
                  </p>
                </div>}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Any remaining modals that haven't been integrated yet */}
      {activeModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Modal: {activeModal}</h2>
            <p className="mb-4">This modal will be integrated into the page soon.</p>
            <button onClick={closeModal} className="px-4 py-2 bg-blue-500 text-white rounded">
              Close
            </button>
          </div>
        </div>}
    </div>;
};
export default SubjectOccupancy;