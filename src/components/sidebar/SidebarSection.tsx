import React from "react";
import SidebarCategory, { CategoryItem } from "./SidebarCategory";

interface SidebarSectionProps {
  title?: string;
  categories: CategoryItem[];
  expandedCategories: string[];
  onCategoryClick: (category: CategoryItem) => void;
  onSubCategoryClick: (subCategoryId: string, path?: string) => void;
  showDivider?: boolean;
  activeSection?: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  categories,
  expandedCategories,
  onCategoryClick,
  onSubCategoryClick,
  showDivider = false,
  activeSection
}) => {
  return (
    <>
      {showDivider && (
        <li className="py-2">
          <div className="px-4">
            <div className="border-b border-gray-300"></div>
          </div>
        </li>
      )}
      
      {title && (
        <li className="py-2">
          <div className="px-4">
            <p className="text-gray-800 font-bold">{title}</p>
          </div>
        </li>
      )}

      {categories.map(category => (
        <SidebarCategory
          key={category.id}
          category={category}
          expandedCategories={expandedCategories}
          onCategoryClick={onCategoryClick}
          onSubCategoryClick={onSubCategoryClick}
          activeSection={activeSection}
        />
      ))}
    </>
  );
};

export default SidebarSection;