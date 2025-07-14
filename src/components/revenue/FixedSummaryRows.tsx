import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface FixedSummaryRowsProps {
  roomsKeys: number;
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    roomsRevenue: Record<number, number>;
    occupancy: Record<number, number>;
  };
  occupancyForecast: Record<number, string>;
  occupancyForecastMethod: string;
  calculateOccupancyFromYoY: (year: number) => number;
  getAvailableRooms: (year: number) => number;
  getForecastRoomsRevenue: (year: number) => number;
  getHistoricalADR: (year: number) => number;
  getForecastADR: (year: number) => number;
  getForecastRevpar: (year: number) => number;
  formatCurrency: (value: number) => string;
  formatPercent: (value: number, decimals?: number) => string;
}

const FixedSummaryRows: React.FC<FixedSummaryRowsProps> = ({
  roomsKeys,
  historicalYears,
  forecastYears,
  historicalData,
  occupancyForecast,
  occupancyForecastMethod,
  calculateOccupancyFromYoY,
  getAvailableRooms,
  getForecastRoomsRevenue,
  getHistoricalADR,
  getForecastADR,
  getForecastRevpar,
  formatCurrency,
  formatPercent
}) => {
  // Helper functions
  const getHistoricalOccupiedRooms = (year: number) => {
    const availableRooms = getAvailableRooms(year);
    const occupancyDecimal = (historicalData.occupancy[year] || 0) / 100;
    return Math.round(availableRooms * occupancyDecimal);
  };

  const getForecastOccupiedRooms = (year: number) => {
    const availableRooms = getAvailableRooms(year);
    const occupancyValue = occupancyForecastMethod === "Occupancy" 
      ? occupancyForecast[year] || "0"
      : calculateOccupancyFromYoY(year).toString();
    const occupancyDecimal = parseFloat(occupancyValue) / 100;
    return Math.round(availableRooms * occupancyDecimal);
  };

  const getHistoricalRevpar = (year: number) => {
    const roomsRevenue = historicalData.roomsRevenue[year] || 0;
    const availableRooms = getAvailableRooms(year);
    return roomsRevenue / availableRooms;
  };

  const allYears = [...historicalYears, ...forecastYears];

  const summaryRows = [
    {
      label: "Rooms/Keys",
      data: allYears.map(() => roomsKeys.toLocaleString())
    },
    {
      label: "Available Rooms",
      data: allYears.map(year => getAvailableRooms(year).toLocaleString())
    },
    {
      label: "Occupied Rooms",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return getHistoricalOccupiedRooms(year).toLocaleString();
        } else {
          return getForecastOccupiedRooms(year).toLocaleString();
        }
      })
    },
    {
      label: "Subject Property Occupancy",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatPercent(historicalData.occupancy[year] || 0);
        } else {
          const occupancyValue = occupancyForecastMethod === "Occupancy" 
            ? parseFloat(occupancyForecast[year] || "0")
            : calculateOccupancyFromYoY(year);
          return formatPercent(occupancyValue);
        }
      })
    },
    {
      label: "Subject Property ADR",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(getHistoricalADR(year));
        } else {
          return formatCurrency(getForecastADR(year));
        }
      })
    },
    {
      label: "Subject Property RevPAR",
      data: allYears.map(year => {
        if (historicalYears.includes(year)) {
          return formatCurrency(getHistoricalRevpar(year));
        } else {
          return formatCurrency(getForecastRevpar(year));
        }
      })
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border mb-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48 font-semibold text-xs">Summary</TableHead>
            {historicalYears.map(year => (
              <TableHead key={year} className="text-center font-semibold bg-blue-50 text-xs">
                {year}
              </TableHead>
            ))}
            {forecastYears.map(year => (
              <TableHead key={year} className="text-center font-semibold bg-green-50 text-xs">
                {year}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {summaryRows.map((row, index) => (
            <TableRow key={index} className="h-6">
              <TableCell className="font-medium text-xs py-0.5">{row.label}</TableCell>
              {row.data.map((value, yearIndex) => (
                <TableCell key={yearIndex} className="text-center text-xs py-0.5">
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FixedSummaryRows;
