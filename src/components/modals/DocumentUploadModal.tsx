import React, { useState } from "react";
import ModalWrapper from "../ui/ModalWrapper";
import Dropdown from "../ui/Dropdown";
import { Upload, X, FileText } from "lucide-react";

interface DocumentUploadModalProps {
  onClose: () => void;
  onNext: () => void;
}

const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({ onClose, onNext }) => {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ id: string; name: string; size: number; type: string }>>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const dropdownOptions = ["Financial Statement", "STR Report"];

  const handleFileUpload = (files: FileList) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <ModalWrapper
      title="Document Upload"
      onClose={onClose}
      onSave={onNext}
      onNext={() => {}}
      showNext={false}
      showSave={true}
      maxWidth="max-w-4xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Upload Documents</h3>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900">Drop files here</p>
                <p className="text-sm text-gray-500 mt-1">or</p>
                <div className="mt-2">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Choose Files
                  </label>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Supports PDF, Word, Text, and Image files
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded Files Display */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">Uploaded Files:</h4>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dropdown Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Document Category</h3>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <Dropdown
              id="document-category"
              label="Select Document Category"
              value={selectedOption}
              onChange={setSelectedOption}
              options={dropdownOptions}
              required
            />
            
            <div className="mt-4 p-4 bg-white rounded-md border border-gray-200">
              <p className="text-sm text-gray-600">
                Selected: <span className="font-medium">{selectedOption || "None"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DocumentUploadModal;