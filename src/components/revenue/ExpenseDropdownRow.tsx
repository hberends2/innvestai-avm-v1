
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ExpenseDropdownRowProps {
  label: React.ReactNode;
  dropdownValue: string;
  onDropdownChange: (value: string) => void;
  historicalYears: number[];
  forecastYears: number[];
}

const ExpenseDropdownRow: React.FC<ExpenseDropdownRowProps> = ({
  label,
  dropdownValue,
  onDropdownChange,
  historicalYears,
  forecastYears
}) => {
  return (
    <tr className="bg-gray-100 border-b border-gray-200">
      <td className="px-4 py-2 text-sm font-medium text-gray-900 border-r border-gray-200">
        {label}
      </td>
      {/* First historical year column with dropdown */}
      <td className="px-2 py-2 text-sm text-gray-700 border-r border-gray-200">
        <Select value={dropdownValue} onValueChange={onDropdownChange}>
          <SelectTrigger className="w-full h-6 text-xs bg-white border-gray-300">
            <SelectValue className="text-left" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            <SelectItem value="POR">POR</SelectItem>
            <SelectItem value="% of Revenue">% of Revenue</SelectItem>
            <SelectItem value="Manual Input">Manual Input</SelectItem>
          </SelectContent>
        </Select>
      </td>
      {/* Remaining historical years */}
      {historicalYears.slice(1).map((_, index) => (
        <td key={index + 1} className="px-4 py-2 text-sm text-gray-700 border-r border-gray-200 text-center">
        </td>
      ))}
      {/* Forecast years */}
      {forecastYears.map((_, index) => (
        <td key={`forecast-${index}`} className="px-4 py-2 text-sm text-gray-700 border-r border-gray-200 text-center">
        </td>
      ))}
    </tr>
  );
};

export default ExpenseDropdownRow;
