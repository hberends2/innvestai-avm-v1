
import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import CategorySelectionModal from "../components/modals/CategorySelectionModal";
import PropertyFormModal from "../components/modals/PropertyFormModal";
import PropertyDetailsModal from "../components/modals/PropertyDetailsModal";
import OccupancyForecastModal from "../components/modals/OccupancyForecastModal";
import OperatingRevenueModal from "../components/modals/OperatingRevenueModal";
import DepartmentalExpensesModal from "../components/modals/DepartmentalExpensesModal";
import UndistributedExpensesModal from "../components/modals/UndistributedExpensesModal";
import UndistributedExpensesSecondModal from "../components/modals/UndistributedExpensesSecondModal";
import NonOperatingExpensesModal from "../components/modals/NonOperatingExpensesModal";
import FFEReserveModal from "../components/modals/FFEReserveModal";
import DocumentsModal from "../components/modals/DocumentsModal";

const Index = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const handleItemClick = (modalName: string) => {
    console.log("Index - handleItemClick called with:", modalName);
    
    if (modalName === "departmentSelection") {
      setShowCategorySelection(true);
      return;
    }
    
    setActiveModal(modalName);
    setActiveSection(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveSection("");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar onItemClick={handleItemClick} activeSection={activeSection} />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Welcome to InnVestAI</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your comprehensive hotel investment analysis platform
            </p>
            
            {/* Add your main content here */}
          </div>
        </main>

        {/* Modals - Using conditional rendering for ModalWrapper-based modals */}
        {showCategorySelection && (
          <CategorySelectionModal 
            onClose={() => setShowCategorySelection(false)}
            onSave={() => setShowCategorySelection(false)}
          />
        )}
        
        {activeModal === "propertyDetails" && (
          <PropertyFormModal 
            onClose={closeModal}
            onSave={() => {}}
            property={null}
          />
        )}

        {/* PropertyDetailsModal - Uses Dialog, so uses open prop */}
        <PropertyDetailsModal 
          open={activeModal === "propertyDetailsModal"}
          onClose={closeModal}
          onNext={() => {}}
        />

        {activeModal === "occupancyForecast" && (
          <OccupancyForecastModal 
            onClose={closeModal}
            onNext={() => {}}
          />
        )}

        {activeModal === "operatingRevenue" && (
          <OperatingRevenueModal 
            onClose={closeModal}
            onNext={() => {}}
          />
        )}

        {activeModal === "departmentalExpenses" && (
          <DepartmentalExpensesModal 
            onClose={closeModal}
            onNext={() => {}}
          />
        )}

        {activeModal === "undistributedExpenses" && (
          <UndistributedExpensesModal 
            onClose={closeModal}
            onNext={() => {}}
          />
        )}

        {activeModal === "undistributedExpensesSecond" && (
          <UndistributedExpensesSecondModal 
            onClose={closeModal}
            onNext={() => {}}
          />
        )}

        {activeModal === "nonOperatingExpenses" && (
          <NonOperatingExpensesModal 
            onClose={closeModal}
            onNext={() => {}}
          />
        )}

        {activeModal === "ffeReserve" && (
          <FFEReserveModal 
            onClose={closeModal}
            onNext={() => {}}
          />
        )}

      </div>
    </SidebarProvider>
  );
};

export default Index;
