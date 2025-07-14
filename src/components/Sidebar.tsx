
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarSection from "./sidebar/SidebarSection";
import SidebarFooter from "./sidebar/SidebarFooter";
import { CategoryItem } from "./sidebar/SidebarCategory";
import { mainNavCategories, parkingLotCategories } from "./sidebar/sidebarData";
import { toast } from "./ui/use-toast";
import { usePropertyData } from "../hooks/usePropertyData";

interface SidebarProps {
  onItemClick: (modalName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { properties } = usePropertyData();
  
  // Get the most recently added property (last in array)
  // This ensures we show the property that was just created
  const currentProperty = properties?.length > 0 ? properties[properties.length - 1] : null;

  useEffect(() => {
    // Auto-expand categories that contain the current active page
    const currentPath = location.pathname;
    const categoriesToExpand: string[] = [];

    [...mainNavCategories, ...parkingLotCategories].forEach(category => {
      if (category.subCategories) {
        const hasActiveSubcategory = category.subCategories.some(sub => sub.path === currentPath);
        if (hasActiveSubcategory) {
          categoriesToExpand.push(category.id);
        }
      }
    });

    if (categoriesToExpand.length > 0) {
      setExpandedCategories(prev => {
        const newExpanded = [...prev];
        categoriesToExpand.forEach(categoryId => {
          if (!newExpanded.includes(categoryId)) {
            newExpanded.push(categoryId);
          }
        });
        return newExpanded;
      });
    }

    // Log the current path and state on mount or route change
    console.log("Sidebar - current path:", location.pathname);
    console.log("Sidebar - expanded categories:", expandedCategories);
  }, [location.pathname]);

  const toggleCategory = (categoryId: string) => {
    console.log("Toggling category:", categoryId);
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const handleCategoryClick = (category: CategoryItem) => {
    console.log("Category clicked:", category);

    if (category.path) {
      // If the category has a direct path, navigate to it
      console.log("Navigating to path:", category.path);
      navigate(category.path);
    }

    if (category.subCategories && category.subCategories.length > 0) {
      console.log("Category has subcategories, toggling:", category.id);
      toggleCategory(category.id);
    } else if (!category.path) {
      // If no subcategories and no path, open the modal
      console.log("Opening modal for category:", category.id);
      onItemClick(category.id);

      // Only show toast for modals that actually exist
      if (category.id !== "departmentSelection") {
        toast({
          title: "Opening modal",
          description: `Opening ${category.name} modal`,
        });
      }
    }
  };

  const handleSubCategoryClick = (subCategoryId: string, path?: string) => {
    console.log("Subcategory clicked:", subCategoryId, "with path:", path);
    if (path) {
      console.log("Navigating to subcategory path:", path);
      navigate(path);
      return;
    }
    console.log("Opening modal for subcategory:", subCategoryId);
    onItemClick(subCategoryId);
    toast({
      title: "Opening modal",
      description: `Opening ${subCategoryId} modal`
    });
  };

  return (
    <div className="w-64 min-h-full bg-gray-100 shadow-md overflow-y-auto flex flex-col">
      <div className="p-4 bg-gray-100 text-gray-800">
        <img 
          src="/lovable-uploads/c5f7ad47-17a3-439d-96a4-ee6584dacdcc.png" 
          alt="InnVestAI Logo" 
          className="h-20 w-auto"
        />
        
        {/* Property Information */}
        {currentProperty && (
          <div className="mt-3 space-y-1">
            <div className="text-base font-medium text-gray-900">
              {currentProperty.name}
            </div>
            <div className="text-sm text-gray-600">
              {currentProperty.city}, {currentProperty.state}
            </div>
          </div>
        )}
        
        {location.pathname === '/revenue' && (
          <div className="mt-4 pt-4 border-t border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">Revenue Analysis</h2>
          </div>
        )}
      </div>
      <nav className="mt-2 flex-grow">
        <ul>
          {/* Main navigation categories */}
          <SidebarSection
            categories={mainNavCategories}
            expandedCategories={expandedCategories}
            onCategoryClick={handleCategoryClick}
            onSubCategoryClick={handleSubCategoryClick}
          />
          
          {/* Parking Lot section */}
          <SidebarSection
            title="Parking Lot"
            categories={parkingLotCategories}
            expandedCategories={expandedCategories}
            onCategoryClick={handleCategoryClick}
            onSubCategoryClick={handleSubCategoryClick}
            showDivider={true}
          />
        </ul>
      </nav>
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
