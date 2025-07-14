
export const REVENUE_CONFIG = {
  ROOMS_KEYS: 108,
  HISTORICAL_YEARS: [2021, 2022, 2023, 2024],
  FORECAST_YEARS: [2025, 2026, 2027, 2028, 2029],
  DEFAULT_GROWTH_RATES: {
    ADR: "0.0",
    OCCUPANCY_YOY: "6.7"
  }
} as const;

export type HistoricalYear = typeof REVENUE_CONFIG.HISTORICAL_YEARS[number];
export type ForecastYear = typeof REVENUE_CONFIG.FORECAST_YEARS[number];
export type AllYear = HistoricalYear | ForecastYear;
