
import { MetricRow, TabbedSummaryProps } from './types';
import { createHelpers } from './helpers';

export const createOccupancyMetrics = (
  props: TabbedSummaryProps,
  allYears: number[],
  shouldAddYTD?: boolean,
  ytdYear?: number | null,
  closingDateString?: string | null
): MetricRow[] => {
  const { roomsKeys, historicalYears, getAvailableRooms, formatPercent } = props;
  const helpers = createHelpers(props);

  const getDaysInYear = (year: number): number => {
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    return isLeapYear ? 366 : 365;
  };

  const getYTDDays = (year: number): number => {
    if (!closingDateString) return 0;
    
    try {
      // Parse the closing date string (MM/DD/YY format)
      const [month, day, yearStr] = closingDateString.split('/');
      const fullYear = yearStr.length === 2 ? 2000 + parseInt(yearStr) : parseInt(yearStr);
      
      const yearStart = new Date(year, 0, 1); // January 1st of the year
      const closingDate = new Date(fullYear, parseInt(month) - 1, parseInt(day)); // month is 0-indexed
      const timeDiff = closingDate.getTime() - yearStart.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include the closing date
    } catch (error) {
      console.warn('Error parsing closing date for YTD calculation:', closingDateString);
      return 0;
    }
  };

  return [
    {
      label: "Rooms/Keys",
      data: allYears.map(year => {
        if (shouldAddYTD && year === ytdYear) return "-";
        return roomsKeys.toLocaleString();
      })
    },
    {
      label: "Days in Year",
      data: allYears.map((year, index) => {
        // If this is the YTD column (added to historical years)
        if (shouldAddYTD && year === ytdYear && index < allYears.length - props.forecastYears.length) {
          return getYTDDays(year).toLocaleString();
        }
        // If this is the first forecast year and it's the same year as YTD, show remaining days
        if (shouldAddYTD && year === ytdYear && index >= allYears.length - props.forecastYears.length) {
          const totalDays = getDaysInYear(year);
          const ytdDays = getYTDDays(year);
          return (totalDays - ytdDays).toLocaleString();
        }
        // For all other years (regular historical and forecast)
        return getDaysInYear(year).toLocaleString();
      })
    },
    {
      label: "Available Rooms",
      data: allYears.map(year => {
        if (shouldAddYTD && year === ytdYear) return "-";
        return getAvailableRooms(year).toLocaleString();
      })
    },
    {
      label: "Occupied Rooms",
      data: allYears.map(year => {
        if (shouldAddYTD && year === ytdYear) return "-";
        if (historicalYears.includes(year)) {
          return helpers.getHistoricalOccupiedRooms(year).toLocaleString();
        } else {
          return helpers.getForecastOccupiedRooms(year).toLocaleString();
        }
      })
    },
    {
      label: "Subject Property Occupancy",
      data: allYears.map(year => {
        if (shouldAddYTD && year === ytdYear) return "-";
        if (historicalYears.includes(year)) {
          return formatPercent(props.historicalData.occupancy[year] || 0);
        } else {
          const occupancyValue = props.occupancyForecastMethod === "Occupancy" 
            ? parseFloat(props.occupancyForecast[year] || "0")
            : props.calculateOccupancyFromYoY(year);
          return formatPercent(occupancyValue);
        }
      })
    }
  ];
};
