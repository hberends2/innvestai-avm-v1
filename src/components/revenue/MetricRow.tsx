
import React, { ReactNode, useState } from "react";
import { TableRow, TableCell } from "../ui/table";
import { usePipelineData } from "../../hooks/usePipelineData";

interface MetricRowProps {
  id?: string;
  label: ReactNode;
  historicalData: ReactNode[];
  forecastData: ReactNode[];
  ytdData?: ReactNode;
  isHeaderRow?: boolean;
  className?: string;
  // Section header props
  isSectionHeader?: boolean;
  isMajorSectionHeader?: boolean;
  // Two-row metric props
  isTwoRowMetric?: boolean;
  metricText?: string;
  controls?: ReactNode;
  // Editable props
  isEditable?: boolean;
  editableData?: Record<number, string>;
  onEditableChange?: (year: number, value: string) => void;
  onEditableBlur?: (year: number, value: string) => void;
  forecastYears?: number[];
  // Styling props
  isIndented?: boolean;
  isYoYRow?: boolean;
  isUserInputRow?: boolean;
  isFbInputRow?: boolean;
  isGrowthRow?: boolean;
  // ADR specific props (deprecated - no longer used)
  adrGrowthType?: string;
  yearlyAdrGrowth?: Record<number, string>;
  handleYearlyAdrChange?: (year: number, value: string) => void;
  handleYearlyAdrBlur?: (year: number, value: string) => void;
}

const MetricRow: React.FC<MetricRowProps> = ({
  id,
  label,
  historicalData,
  forecastData,
  ytdData,
  isHeaderRow = false,
  className = "",
  isSectionHeader = false,
  isMajorSectionHeader = false,
  isTwoRowMetric = false,
  metricText,
  controls,
  isEditable = false,
  editableData = {},
  onEditableChange,
  onEditableBlur,
  forecastYears = [],
  isIndented = false,
  isYoYRow = false,
  isUserInputRow = false,
  isFbInputRow = false,
  isGrowthRow = false
}) => {
  const { shouldAddYTDColumn } = usePipelineData();
  const { shouldAdd: shouldAddYTD } = shouldAddYTDColumn();
  
  // Track which inputs are currently being edited
  const [editingInputs, setEditingInputs] = useState<Set<number>>(new Set());

  const baseRowClass = isHeaderRow ? "border-b border-gray-300" : "border-b border-gray-100 hover:bg-gray-50";
  const baseCellClass = isHeaderRow ? "py-1 px-2" : "py-2 px-2";
  
  // Apply pale yellow background for user input rows
  const userInputRowClass = isUserInputRow ? "bg-yellow-50" : "";
  const rowClasses = `${baseRowClass} ${className} ${userInputRowClass}`;
  
  // Determine if the label cell should use the row background or white
  const shouldUseLabelBackground = className.includes("bg-green-50") || isSectionHeader || isUserInputRow;
  const labelCellBg = shouldUseLabelBackground ? (isUserInputRow ? "bg-yellow-50" : "") : "bg-white";

  // Section header styling
  if (isSectionHeader) {
    const sectionBg = isMajorSectionHeader ? "bg-gray-200" : "bg-gray-100";
    const sectionRowBg = isMajorSectionHeader ? "border-b border-gray-100 bg-gray-200" : "border-b border-gray-100 bg-gray-100";
    
    return (
      <TableRow className={sectionRowBg} id={id}>
        <TableCell className={`font-bold text-left py-2 px-2 ${sectionBg} sticky left-0 z-10 w-48`}>
          {label}
        </TableCell>
        {historicalData.map((_, index) => (
          <TableCell 
            key={`hist-${index}`} 
            className={`text-center py-2 px-2 min-w-[80px] ${sectionBg}`}
          >
          </TableCell>
        ))}
        {shouldAddYTD && (
          <TableCell 
            className={`text-center py-2 px-2 min-w-[80px] ${sectionBg}`}
          >
          </TableCell>
        )}
        {forecastData.map((_, index) => (
          <TableCell 
            key={`forecast-${index}`} 
            className={`text-center py-2 px-2 min-w-[80px] ${sectionBg}`}
          >
          </TableCell>
        ))}
      </TableRow>
    );
  }

  // Handle two-row metrics (like occupancy controls)
  if (isTwoRowMetric) {
    return (
      <TableRow className={rowClasses} id={id}>
        <TableCell className={`font-medium text-left py-2 px-2 ${labelCellBg} sticky left-0 z-10 w-48`}>
          <div className="flex items-center justify-between">
            <span>{metricText}</span>
            {controls}
          </div>
        </TableCell>
        {historicalData.map((data, index) => (
          <TableCell 
            key={`hist-${index}`} 
            className={`text-center py-2 px-2 min-w-[80px] ${isUserInputRow ? 'bg-yellow-50' : 'bg-blue-25'}`}
          >
            {data}
          </TableCell>
        ))}
        {shouldAddYTD && (
          <TableCell 
            className={`text-center py-2 px-2 min-w-[80px] ${isUserInputRow ? 'bg-yellow-50' : 'bg-blue-25'}`}
          >
            {ytdData || "-"}
          </TableCell>
        )}
        {forecastData.map((data, index) => {
          const year = forecastYears[index];
          const isEditableCell = isEditable && year;
          const isCurrentlyEditing = editingInputs.has(year);
          
          return (
            <TableCell 
              key={`forecast-${index}`} 
              className={`text-center py-2 px-2 min-w-[80px] ${isUserInputRow ? 'bg-yellow-50' : 'bg-green-25'}`}
            >
              {isEditableCell ? (
                <input
                  type="text"
                  value={editableData[year] || ""}
                  onChange={(e) => onEditableChange?.(year, e.target.value)}
                  onFocus={() => {
                    setEditingInputs(prev => new Set([...prev, year]));
                  }}
                  onBlur={(e) => {
                    setEditingInputs(prev => {
                      const newSet = new Set(prev);
                      newSet.delete(year);
                      return newSet;
                    });
                    onEditableBlur?.(year, e.target.value);
                  }}
                  className="w-full text-center border-none bg-white text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
                />
              ) : (
                data
              )}
            </TableCell>
          );
        })}
      </TableRow>
    );
  }

  return (
    <TableRow className={rowClasses} id={id}>
      <TableCell className={`font-medium text-left ${baseCellClass} ${labelCellBg} sticky left-0 z-10 w-48`}>
        {label}
      </TableCell>
      {historicalData.map((data, index) => (
        <TableCell 
          key={`hist-${index}`} 
          className={`text-center ${baseCellClass} min-w-[80px] ${isHeaderRow ? 'bg-gray-600' : isUserInputRow ? 'bg-yellow-50' : 'bg-blue-25'}`}
        >
          {data}
        </TableCell>
      ))}
      {shouldAddYTD && (
        <TableCell 
          className={`text-center ${baseCellClass} min-w-[80px] ${isHeaderRow ? 'bg-gray-600' : isUserInputRow ? 'bg-yellow-50' : 'bg-blue-25'}`}
        >
          {ytdData || "-"}
        </TableCell>
      )}
      {forecastData.map((data, index) => {
        const year = forecastYears[index];
        const isEditableCell = isEditable && year;
        const isCurrentlyEditing = editingInputs.has(year);
        
        return (
          <TableCell 
            key={`forecast-${index}`} 
            className={`text-center ${baseCellClass} min-w-[80px] ${isHeaderRow ? 'bg-gray-600' : isUserInputRow ? 'bg-yellow-50' : 'bg-green-25'}`}
          >
            {isEditableCell ? (
              <input
                type="text"
                value={editableData[year] || ""}
                onChange={(e) => onEditableChange?.(year, e.target.value)}
                onFocus={() => {
                  setEditingInputs(prev => new Set([...prev, year]));
                }}
                onBlur={(e) => {
                  setEditingInputs(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(year);
                    return newSet;
                  });
                  onEditableBlur?.(year, e.target.value);
                }}
                className="w-full text-center border-none bg-white text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
              />
            ) : (
              data
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default MetricRow;
