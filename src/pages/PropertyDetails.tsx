
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "../components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import PropertyDetailsModal from "../components/modals/PropertyDetailsModal";
import CategorySelectionModal from "../components/modals/CategorySelectionModal";
import DocumentUploadModal from "../components/modals/DocumentUploadModal";

const PropertyDetails = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showPropertyModal, setShowPropertyModal] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [categorySelections, setCategorySelections] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const handleItemClick = (modalName: string) => {
    // If it's the department selection, show that modal
    if (modalName === "departmentSelection") {
      setShowCategoryModal(true);
      return;
    }
    
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handlePropertyModalClose = () => {
    setShowPropertyModal(false);
    // Navigate back to home or previous page when modal is closed
    navigate('/');
  };

  const handlePropertyModalNext = () => {
    // Show the category selection modal after property details
    setShowPropertyModal(false);
    setShowCategoryModal(true);
  };
  
  const handleCategoryModalClose = () => {
    setShowCategoryModal(false);
    // Navigate back to home when modal is closed
    navigate('/');
  };
  
  const handleCategoryModalSave = (selectedItems: Set<string>) => {
    console.log("Saving category selections:", selectedItems);
    setCategorySelections(selectedItems);
    setShowCategoryModal(false);
    
    // Show document upload modal after category selection
    setShowDocumentModal(true);
  };

  const handleDocumentModalClose = () => {
    setShowDocumentModal(false);
    // Navigate back to home when modal is closed
    navigate('/');
  };

  const handleDocumentModalNext = () => {
    setShowDocumentModal(false);
    
    // Navigate to Market Data section after document upload
    navigate('/market');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar onItemClick={handleItemClick} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-2 border-b bg-white">
            <SidebarTrigger />
          </div>
          <main className="flex-1 p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Property Details</h1>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Configure your property details here.</p>
              </div>
            </div>
          </main>
        </div>
      
      {/* PropertyDetailsModal - Uses Dialog, so uses open prop */}
      <PropertyDetailsModal 
        open={showPropertyModal}
        onClose={handlePropertyModalClose} 
        onNext={handlePropertyModalNext} 
      />
      
      {/* CategorySelectionModal - Uses ModalWrapper, so uses conditional rendering */}
      {showCategoryModal && (
        <CategorySelectionModal
          onClose={handleCategoryModalClose}
          onSave={handleCategoryModalSave}
          initialSelections={categorySelections}
        />
      )}
      
      {/* DocumentUploadModal - Uses ModalWrapper, so uses conditional rendering */}
      {showDocumentModal && (
        <DocumentUploadModal
          onClose={handleDocumentModalClose}
          onNext={handleDocumentModalNext}
        />
      )}
      </div>
    </SidebarProvider>
  );
};

export default PropertyDetails;
