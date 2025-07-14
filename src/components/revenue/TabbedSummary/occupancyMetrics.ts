
import { MetricRow, TabbedSummaryProps } from './types';
import { createHelpers } from './helpers';

export const createOccupancyMetrics = (
  props: TabbedSummaryProps,
  allYears: number[]
): MetricRow[] => {
  const { roomsKeys, historicalYears, getAvailableRooms, formatPercent } = props;
  const helpers = createHelpers(props);

  return [
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
          return helpers.getHistoricalOccupiedRooms(year).toLocaleString();
        } else {
          return helpers.getForecastOccupiedRooms(year).toLocaleString();
        }
      })
    },
    {
      label: "Subject Property Occupancy",
      data: allYears.map(year => {
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
