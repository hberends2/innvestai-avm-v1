import React, { useState } from "react";
import { ChevronDown, ChevronRight, Grid, Folder, Edit2, Trash2, Presentation, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DocumentsSidebarProps {
  customFolders: Array<{ id: string; name: string }>;
  onEditFolder: (folder: { id: string; name: string }) => void;
  onDeleteFolder: (folder: { id: string; name: string }) => void;
}

const DocumentsSidebar: React.FC<DocumentsSidebarProps> = ({
  customFolders,
  onEditFolder,
  onDeleteFolder,
}) => {
  const [isDocumentsExpanded, setIsDocumentsExpanded] = useState(true);

  const collections = [
    { id: "product-demos", name: "Product Demos", icon: Presentation },
    { id: "case-studies", name: "Case Studies", icon: Folder },
    { id: "sales-collateral", name: "Sales Collateral", icon: Folder },
    { id: "training-materials", name: "Training Materials", icon: Folder },
  ];

  const predefinedItems = [
    { id: "all-content", name: "All content", icon: Grid },
    { id: "presentations", name: "Presentations", icon: Presentation },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsDocumentsExpanded(!isDocumentsExpanded)}
          className="flex items-center gap-2 w-full text-left font-medium text-gray-900 hover:bg-gray-50 p-2 rounded-lg"
        >
          {isDocumentsExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <span>Documents</span>
        </button>
      </div>

      {isDocumentsExpanded && (
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-1">
            {/* Predefined Items */}
            {predefinedItems.map((item) => (
              <button
                key={item.id}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg w-full text-left hover:bg-gray-50"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </button>
            ))}

            {/* Custom Folders */}
            {customFolders.map((folder) => (
              <div
                key={folder.id}
                className="group flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg w-full hover:bg-gray-50"
              >
                <Folder className="h-4 w-4" />
                <span className="flex-1">{folder.name}</span>
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                  <button
                    onClick={() => onEditFolder(folder)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onDeleteFolder(folder)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}

          </div>

          {/* Collections Section */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Collections
            </h3>
            <div className="space-y-1">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg w-full text-left hover:bg-gray-50"
                >
                  <collection.icon className="h-4 w-4" />
                  <span>{collection.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsSidebar;