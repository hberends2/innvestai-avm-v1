
import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalWrapperProps {
  title: string;
  onClose: () => void;
  onSave: () => void;
  onNext: () => void;
  showNext?: boolean;
  showSave?: boolean;
  saveDisabled?: boolean;
  children: ReactNode;
  maxWidth?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ 
  title, 
  onClose, 
  onSave, 
  onNext, 
  showNext = true,
  showSave = true,
  saveDisabled = false,
  maxWidth = "max-w-3xl",
  children 
}) => {
  const modalContent = (
    <div 
      className="fixed bg-black bg-opacity-50 z-50"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div 
        className={`bg-white rounded-lg shadow-2xl overflow-auto`}
        style={{
          width: '100%',
          maxWidth: maxWidth === "max-w-6xl" ? "72rem" : maxWidth === "max-w-3xl" ? "48rem" : "48rem",
          maxHeight: '90vh'
        }}
      >
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6">
          {children}
        </div>
        
        <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          {showSave && (
            <button
              onClick={onSave}
              disabled={saveDisabled}
              className={`px-4 py-2 bg-blue-500 text-white rounded transition-colors ${
                saveDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              Save
            </button>
          )}
          {showNext && (
            <button
              onClick={onNext}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Use createPortal to render the modal directly to document.body
  return createPortal(modalContent, document.body);
};

export default ModalWrapper;
