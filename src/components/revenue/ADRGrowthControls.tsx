
import React from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ADRGrowthControlsProps {
  adrGrowthType: string;
  setAdrGrowthType: (value: string) => void;
  flatAdrGrowth: string;
  setFlatAdrGrowth: (value: string) => void;
  handleFlatAdrBlur: (value: string) => void;
  yearlyAdrGrowth: Record<number, string>;
  handleYearlyAdrChange: (year: number, value: string) => void;
  forecastYears: number[];
}

const ADRGrowthControls: React.FC<ADRGrowthControlsProps> = ({
  adrGrowthType,
  setAdrGrowthType,
  flatAdrGrowth,
  setFlatAdrGrowth,
  handleFlatAdrBlur,
  yearlyAdrGrowth,
  handleYearlyAdrChange,
  forecastYears
}) => {
  const options = [
    { value: "flat", label: "Flat Growth" },
    { value: "yearly", label: "YoY Growth" }
  ];

  return (
    <div className="flex items-center gap-3">
      <Select value={adrGrowthType} onValueChange={setAdrGrowthType}>
        <SelectTrigger className="w-40 min-w-[140px] h-auto min-h-[36px] py-2 text-xs [&>span]:whitespace-normal [&>span]:leading-tight">
          <SelectValue className="whitespace-normal text-left leading-tight text-xs" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-left whitespace-normal text-xs">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {adrGrowthType === "flat" && (
        <div className="relative w-16 min-w-[60px]">
          <Input
            type="text"
            value={flatAdrGrowth}
            onChange={(e) => setFlatAdrGrowth(e.target.value)}
            onBlur={(e) => handleFlatAdrBlur(e.target.value)}
            className="px-2 py-1 text-center h-8 text-blue-600 text-xs"
          />
          <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">%</span>
        </div>
      )}
    </div>
  );
};

export default ADRGrowthControls;
