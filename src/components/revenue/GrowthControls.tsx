
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface GrowthControlsProps {
  currentGrowthType: string;
  setGrowthType: (value: string) => void;
  options: { value: string; label: string }[];
}

const GrowthControls: React.FC<GrowthControlsProps> = ({
  currentGrowthType,
  setGrowthType,
  options
}) => {
  return (
    <Select value={currentGrowthType} onValueChange={setGrowthType}>
      <SelectTrigger className="w-36 min-w-[120px] h-auto min-h-[36px] py-2 [&>span]:whitespace-normal [&>span]:leading-tight">
        <SelectValue className="whitespace-normal text-left leading-tight" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="text-left whitespace-normal">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GrowthControls;
