
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { TableRow, TableCell } from "../../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import MetricRow from "../MetricRow";

interface CapitalExpenseItem {
  id: string;
  description: string;
  category: string;
  values: Record<number, string>;
}

interface CapitalExpendituresSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  formatCurrency: (value: number) => string;
}

const CapitalExpendituresSection: React.FC<CapitalExpendituresSectionProps> = ({
  historicalYears,
  forecastYears,
  formatCurrency
}) => {
  const [capitalExpenseItems, setCapitalExpenseItems] = useState<CapitalExpenseItem[]>([
    { id: '1', description: '', category: '', values: {} },
    { id: '2', description: '', category: '', values: {} }
  ]);

  // Dropdown options sorted alphabetically with "Other" at the bottom
  const categoryOptions = [
    "Back of House",
    "Building Exterior",
    "Corridors",
    "Guest Rooms",
    "Kitchens",
    "Lobby",
    "MEP (Mechanical, Electrical, Plumbing)",
    "Meeting Space",
    "Outlets",
    "Recreation & Landscaping",
    "Other"
  ];

  const calculateTotalCapitalExpenditure = (year: number): number => {
    return capitalExpenseItems.reduce((total, item) => {
      const value = item.values[year] || "0";
      const numericValue = parseFloat(value.replace(/,/g, "")) || 0;
      return total + numericValue;
    }, 0);
  };

  const formatNumberInput = (value: string): string => {
    const numericValue = value.replace(/\D/g, "");
    const number = parseInt(numericValue) || 0;
    return number.toLocaleString();
  };

  const handleCapitalExpenseDescriptionChange = (id: string, description: string) => {
    setCapitalExpenseItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, description } : item
      )
    );
  };

  const handleCapitalExpenseValueChange = (id: string, year: number, value: string) => {
    setCapitalExpenseItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, values: { ...item.values, [year]: value } }
          : item
      )
    );
  };

  const handleCapitalExpenseValueBlur = (id: string, year: number, value: string) => {
    const formattedValue = formatNumberInput(value);
    setCapitalExpenseItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, values: { ...item.values, [year]: formattedValue } }
          : item
      )
    );
  };

  const handleCapitalExpenseCategoryChange = (id: string, category: string) => {
    setCapitalExpenseItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, category } : item
      )
    );
  };

  const addNewCapitalExpenseItem = () => {
    const newId = (capitalExpenseItems.length + 1).toString();
    setCapitalExpenseItems(prev => [
      ...prev,
      { id: newId, description: '', category: '', values: {} }
    ]);
  };

  return (
    <>
      <MetricRow
        label={<span className="font-bold text-gray-900">Capital Expenditures</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
        isMajorSectionHeader={true}
      />

      {capitalExpenseItems.map((item) => (
        <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
          <TableCell className="font-medium text-left py-2 px-2 sticky left-0 z-10 w-48" colSpan={4}>
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleCapitalExpenseDescriptionChange(item.id, e.target.value)}
              className="w-full bg-white border border-gray-300 outline-none text-sm px-2 py-1 rounded focus:ring-1 focus:ring-blue-500"
            />
          </TableCell>
          <TableCell className="text-center py-2 px-2 min-w-[80px]" colSpan={2}>
            <Select value={item.category} onValueChange={(value) => handleCapitalExpenseCategoryChange(item.id, value)}>
              <SelectTrigger className="w-full h-8 text-sm bg-white z-50">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {categoryOptions.map((option) => (
                  <SelectItem key={option} value={option} className="text-sm">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TableCell>
          {forecastYears.slice(1).map((year) => (
            <TableCell key={`${item.id}-${year}`} className="text-center py-2 px-2 min-w-[80px]">
              <input
                type="text"
                value={item.values[year] || ""}
                onChange={(e) => handleCapitalExpenseValueChange(item.id, year, e.target.value)}
                onBlur={(e) => handleCapitalExpenseValueBlur(item.id, year, e.target.value)}
                className="w-full text-center bg-white text-blue-600 border border-gray-300 outline-none text-sm px-1 py-1 rounded focus:ring-1 focus:ring-blue-500"
                placeholder="$0"
              />
            </TableCell>
          ))}
        </TableRow>
      ))}

      <TableRow className="border-b border-gray-100">
        <TableCell className="py-2 px-2" colSpan={6}>
          <button
            onClick={addNewCapitalExpenseItem}
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add New Item
          </button>
        </TableCell>
        {forecastYears.slice(1).map((_, index) => (
          <TableCell key={`forecast-empty-${index}`} className="py-2"></TableCell>
        ))}
      </TableRow>

      <MetricRow
        label={<span className="font-bold italic">Total Capital Expenditures</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(year => 
          <span className="font-bold italic">
            {formatCurrency(calculateTotalCapitalExpenditure(year))}
          </span>
        )}
      />
    </>
  );
};

export default CapitalExpendituresSection;
