
// Utility functions for the occupancy forecast components

// Format percentage value
export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

// Format number with commas
export function formatNumber(value: number): string {
  return value.toLocaleString();
}

// Calculate occupied rooms
export function calculateOccupiedRooms(occupancy: number, totalRooms = 108) {
  const annualAvailableRooms = totalRooms * 365;
  return Math.round(annualAvailableRooms * occupancy);
}
