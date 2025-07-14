
import React from "react";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  className = "bg-gray-700" 
}) => {
  // Determine text color based on background
  const isLightBackground = className.includes("bg-gray-200");
  const textColor = isLightBackground ? "text-black" : "text-white";
  
  return (
    <tr className={className}>
      <td colSpan={10} className="p-3">
        <div className="flex items-center">
          <span className={`${textColor} font-bold text-sm`}>{title}</span>
        </div>
      </td>
    </tr>
  );
};

export default SectionHeader;
