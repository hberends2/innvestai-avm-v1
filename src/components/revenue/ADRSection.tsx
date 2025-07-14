

import React from "react";
import MetricRow from "./MetricRow";
import ADRGrowthControls from "./ADRGrowthControls";
import { marketADRData, compSetADRData } from "./revenueData";
import { getMarketADRYoY, getCompSetADRYoY, getHistoricalADRYoY, getForecastADRYoY, formatYoYWithColor } from "./revenueCalculations";

interface ADRSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  getHistoricalADR: (year: number) => number;
  getForecastADR: (year: number) => number;
  adrGrowthType: string;
  setAdrGrowthType: (value: string) => void;
  flatAdrGrowth: string;
  setFlatAdrGrowth: (value: string) => void;
  handleFlatAdrBlur: (value: string) => void;
  yearlyAdrGrowth: Record<number, string>;
  handleYearlyAdrChange: (year: number, value: string) => void;
  handleYearlyAdrBlur: (year: number, value: string) => void;
}

const ADRSection: React.FC<ADRSectionProps> = ({
  historicalYears,
  forecastYears,
  getHistoricalADR,
  getForecastADR,
  adrGrowthType,
  setAdrGrowthType,
  flatAdrGrowth,
  setFlatAdrGrowth,
  handleFlatAdrBlur,
  yearlyAdrGrowth,
  handleYearlyAdrChange,
  handleYearlyAdrBlur
}) => {
  // Helper function to calculate index percentages
  const calculateIndex = (numerator: number, denominator: number): string => {
    if (denominator === 0) return "0.0%";
    return `${((numerator / denominator) * 100).toFixed(1)}%`;
  };

  return (
    <>
      {/* ADR Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">ADR</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Market ADR */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Market (Hotel Horizons / LARC)</span>}
        historicalData={historicalYears.map(year => {
          const data = marketADRData[year as keyof typeof marketADRData];
          return data ? `$${data.toFixed(2)}` : "-";
        })}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Market ADR YoY Growth */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Market ADR YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : formatYoYWithColor(getMarketADRYoY(year, index, historicalYears))
        )}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Comp Set ADR */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Comp Set (STR / Trend Report)</span>}
        historicalData={historicalYears.map(year => {
          const data = compSetADRData[year as keyof typeof compSetADRData];
          return data ? `$${data.toFixed(2)}` : "-";
        })}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Comp Set ADR YoY Growth */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comp Set ADR YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : formatYoYWithColor(getCompSetADRYoY(year, index, historicalYears))
        )}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Subject Property ADR */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Subject Property ADR</span>}
        historicalData={historicalYears.map(year => `$${getHistoricalADR(year).toFixed(2)}`)}
        forecastData={forecastYears.map(year => `$${getForecastADR(year).toFixed(2)}`)}
      />

      {/* Subject Property ADR YoY Growth - Title Row */}
      <MetricRow
        label={<span className="text-left">&nbsp;&nbsp;&nbsp;Subject Property ADR YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : formatYoYWithColor(getHistoricalADRYoY(year, index, historicalYears, getHistoricalADR))
        )}
        forecastData={forecastYears.map(year => {
          if (adrGrowthType === "yearly") {
            return formatYoYWithColor(parseFloat(yearlyAdrGrowth[year] || "0"));
          } else {
            return formatYoYWithColor(parseFloat(flatAdrGrowth));
          }
        })}
        isUserInputRow={true}
        className="bg-yellow-50"
      />

      {/* Subject Property ADR YoY Growth - Controls Row */}
      <MetricRow
        label={<div className="w-full text-left">
          <ADRGrowthControls
            adrGrowthType={adrGrowthType}
            setAdrGrowthType={setAdrGrowthType}
            flatAdrGrowth={flatAdrGrowth}
            setFlatAdrGrowth={setFlatAdrGrowth}
            handleFlatAdrBlur={handleFlatAdrBlur}
            yearlyAdrGrowth={yearlyAdrGrowth}
            handleYearlyAdrChange={handleYearlyAdrChange}
            forecastYears={forecastYears}
          />
        </div>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(year => {
          if (adrGrowthType === "yearly") {
            return (
              <input
                type="text"
                value={yearlyAdrGrowth[year] || ""}
                onChange={(e) => handleYearlyAdrChange(year, e.target.value)}
                onBlur={(e) => handleYearlyAdrBlur(year, e.target.value)}
                className="w-full text-center border-none bg-white text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
              />
            );
          } else {
            return "";
          }
        })}
        isUserInputRow={true}
        className="bg-yellow-50"
      />

      {/* Index Calculations */}
      {/* Comp Set Index to Market */}
      <MetricRow
        label={<span className="italic">&nbsp;&nbsp;&nbsp;Comp Set Index to Market</span>}
        historicalData={historicalYears.map(year => {
          const market = marketADRData[year as keyof typeof marketADRData];
          const compSet = compSetADRData[year as keyof typeof compSetADRData];
          return market && compSet ? calculateIndex(compSet, market) : "-";
        })}
        forecastData={forecastYears.map(() => "0.0%")}
      />

      {/* Property Index to Comp Set */}
      <MetricRow
        label={<span className="italic">&nbsp;&nbsp;&nbsp;Property Index to Comp Set</span>}
        historicalData={historicalYears.map(year => {
          const compSet = compSetADRData[year as keyof typeof compSetADRData];
          const property = getHistoricalADR(year);
          return compSet && property ? calculateIndex(property, compSet) : "-";
        })}
        forecastData={forecastYears.map(() => "0.0%")}
      />

      {/* Property Index to Market */}
      <MetricRow
        label={<span className="italic">&nbsp;&nbsp;&nbsp;Property Index to Market</span>}
        historicalData={historicalYears.map(year => {
          const market = marketADRData[year as keyof typeof marketADRData];
          const property = getHistoricalADR(year);
          return market && property ? calculateIndex(property, market) : "-";
        })}
        forecastData={forecastYears.map(() => "0.0%")}
      />
    </>
  );
};

export default ADRSection;

