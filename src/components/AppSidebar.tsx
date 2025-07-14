
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "./ui/sidebar";
import SidebarSection from "./sidebar/SidebarSection";
import CustomSidebarFooter from "./sidebar/SidebarFooter";
import { CategoryItem } from "./sidebar/SidebarCategory";
import { mainNavCategories, parkingLotCategories } from "./sidebar/sidebarData";
import { toast } from "./ui/use-toast";

interface AppSidebarProps {
  onItemClick: (modalName: string) => void;
  activeSection?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ onItemClick, activeSection }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

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

    // Auto-expand Valuation if we're on the revenue page
    if (currentPath === '/revenue') {
      categoriesToExpand.push('valuation');
    }

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
      console.log("Navigating to path:", category.path);
      navigate(category.path);
    }

    if (category.subCategories && category.subCategories.length > 0) {
      console.log("Category has subcategories, toggling:", category.id);
      toggleCategory(category.id);
    } else if (!category.path) {
      console.log("Opening modal for category:", category.id);
      onItemClick(category.id);
      toast({
        title: "Opening modal",
        description: `Opening ${category.name} modal`,
      });
    }
  };

  const handleSubCategoryClick = (subCategoryId: string, path?: string) => {
    console.log("Subcategory clicked:", subCategoryId, "with path:", path);
    if (path) {
      console.log("Navigating to subcategory path:", path);
      navigate(path);
      return;
    }
    console.log("Calling onItemClick for subcategory:", subCategoryId);
    onItemClick(subCategoryId);
  };

  return (
    <Sidebar className="w-64 bg-gray-100">
      <SidebarHeader className="p-4 bg-gray-100 text-gray-800">
        <img 
          src="/lovable-uploads/c5f7ad47-17a3-439d-96a4-ee6584dacdcc.png" 
          alt="InnVestAI Logo" 
          className="h-20 w-auto"
        />
        {location.pathname === '/revenue' && (
          <div className="mt-4 pt-4 border-t border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">Valuation Analysis</h2>
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent className="mt-2 flex-grow">
        <nav>
          <ul>
            {/* Main navigation categories */}
            <SidebarSection
              categories={mainNavCategories}
              expandedCategories={expandedCategories}
              onCategoryClick={handleCategoryClick}
              onSubCategoryClick={handleSubCategoryClick}
              activeSection={activeSection}
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
      </SidebarContent>
      
      <SidebarFooter>
        <CustomSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
