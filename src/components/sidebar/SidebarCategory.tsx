
import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export interface CategoryItem {
  id: string;
  name: string;
  path?: string;
  subCategories?: CategoryItem[];
}

interface SidebarCategoryProps {
  category: CategoryItem;
  expandedCategories: string[];
  onCategoryClick: (category: CategoryItem) => void;
  onSubCategoryClick: (subCategoryId: string, path?: string) => void;
  activeSection?: string;
  level?: number;
}

const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  category,
  expandedCategories,
  onCategoryClick,
  onSubCategoryClick,
  activeSection,
  level = 0,
}) => {
  const isExpanded = expandedCategories.includes(category.id);
  const hasSubCategories = category.subCategories && category.subCategories.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Leaf nodes in submenus are handled by onSubCategoryClick to scroll.
    // All other clicks are handled by onCategoryClick for navigation or toggling.
    if (!hasSubCategories && level > 0) {
      onSubCategoryClick(category.id, category.path);
    } else {
      onCategoryClick(category);
    }
  };

  const isActive = activeSection === category.id;
  const paddingLeft = `${1 + level}rem`;

  return (
    <li className="mb-1">
      <div
        className={`flex items-center pr-4 transition-colors cursor-pointer
          ${level === 0 ? 'py-3 text-gray-800' : 'py-2 text-gray-700'}
          hover:bg-gray-200
          ${isActive && !hasSubCategories ? 'bg-blue-100 text-blue-800 border-r-2 border-blue-500' : ''}
        `}
        style={{ paddingLeft }}
        onClick={handleClick}
        role="button"
        aria-expanded={isExpanded}
      >
        {hasSubCategories ? (
          isExpanded ? (
            <ChevronDown className="h-4 w-4 mr-2 shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-2 shrink-0" />
          )
        ) : (
          <span className="w-4 mr-2 shrink-0" />
        )}
        <span className={level === 0 ? 'font-medium' : ''}>{category.name}</span>
      </div>

      {hasSubCategories && isExpanded && (
        <ul className="bg-gray-50">
          {category.subCategories.map((subCategory) => (
            <SidebarCategory
              key={subCategory.id}
              category={subCategory}
              expandedCategories={expandedCategories}
              onCategoryClick={onCategoryClick}
              onSubCategoryClick={onSubCategoryClick}
              activeSection={activeSection}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarCategory;
