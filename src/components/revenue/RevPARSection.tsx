
import React from "react";
import MetricRow from "./MetricRow";
import { marketRevparData, compSetRevparData } from "./revenueData";
import { getMarketRevparYoY, getCompSetRevparYoY, formatYoYWithColor } from "./revenueCalculations";

interface RevPARSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    revpar: Record<number, number>;
    revparYoY: Record<number, number>;
  };
  getForecastRevpar: (year: number) => number;
}

const RevPARSection: React.FC<RevPARSectionProps> = ({
  historicalYears,
  forecastYears,
  historicalData,
  getForecastRevpar
}) => {
  // Helper function to calculate index percentages
  const calculateIndex = (numerator: number, denominator: number): string => {
    if (denominator === 0) return "0.0%";
    return `${((numerator / denominator) * 100).toFixed(1)}%`;
  };

  // Calculate RevPAR YoY for forecast years
  const getForecastRevparYoY = (year: number) => {
    const yearIndex = forecastYears.indexOf(year);
    if (yearIndex === 0) {
      const currentRevpar = getForecastRevpar(year);
      const lastHistoricalRevpar = historicalData.revpar[2024];
      return ((currentRevpar - lastHistoricalRevpar) / lastHistoricalRevpar) * 100;
    } else {
      const currentRevpar = getForecastRevpar(year);
      const previousYear = forecastYears[yearIndex - 1];
      const previousRevpar = getForecastRevpar(previousYear);
      return ((currentRevpar - previousRevpar) / previousRevpar) * 100;
    }
  };

  return (
    <>
      {/* RevPAR Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">RevPAR</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
        isSectionHeader={true}
      />

      {/* Market RevPAR */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Market (Hotel Horizons / LARC)</span>}
        historicalData={historicalYears.map(year => {
          const data = marketRevparData[year as keyof typeof marketRevparData];
          return data ? `$${data}` : "-";
        })}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Market RevPAR YoY Growth */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Market RevPAR YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : formatYoYWithColor(getMarketRevparYoY(year, index, historicalYears))
        )}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Comp Set RevPAR */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Comp Set (STR / Trend Report)</span>}
        historicalData={historicalYears.map(year => {
          const data = compSetRevparData[year as keyof typeof compSetRevparData];
          return data ? `$${data}` : "-";
        })}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Comp Set RevPAR YoY Growth */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comp Set RevPAR YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : formatYoYWithColor(getCompSetRevparYoY(year, index, historicalYears))
        )}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Subject Property RevPAR */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Subject Property RevPAR</span>}
        historicalData={historicalYears.map(year => `$${historicalData.revpar[year].toFixed(2)}`)}
        forecastData={forecastYears.map(year => `$${getForecastRevpar(year).toFixed(2)}`)}
      />

      {/* Subject Property RevPAR YoY Growth (calculated, no controls) */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subject Property RevPAR YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : formatYoYWithColor(historicalData.revparYoY[year])
        )}
        forecastData={forecastYears.map(year => formatYoYWithColor(getForecastRevparYoY(year)))}
      />

      {/* Index Calculations */}
      {/* Comp Set Index to Market */}
      <MetricRow
        label={<span className="italic">&nbsp;&nbsp;&nbsp;Comp Set Index to Market</span>}
        historicalData={historicalYears.map(year => {
          const market = marketRevparData[year as keyof typeof marketRevparData];
          const compSet = compSetRevparData[year as keyof typeof compSetRevparData];
          return market && compSet ? calculateIndex(compSet, market) : "-";
        })}
        forecastData={forecastYears.map(() => "0.0%")}
      />

      {/* Property Index to Comp Set */}
      <MetricRow
        label={<span className="italic">&nbsp;&nbsp;&nbsp;Property Index to Comp Set</span>}
        historicalData={historicalYears.map(year => {
          const compSet = compSetRevparData[year as keyof typeof compSetRevparData];
          const property = historicalData.revpar[year];
          return compSet && property ? calculateIndex(property, compSet) : "-";
        })}
        forecastData={forecastYears.map(() => "0.0%")}
      />

      {/* Property Index to Market */}
      <MetricRow
        label={<span className="italic">&nbsp;&nbsp;&nbsp;Property Index to Market</span>}
        historicalData={historicalYears.map(year => {
          const market = marketRevparData[year as keyof typeof marketRevparData];
          const property = historicalData.revpar[year];
          return market && property ? calculateIndex(property, market) : "-";
        })}
        forecastData={forecastYears.map(() => "0.0%")}
      />
    </>
  );
};

export default RevPARSection;
