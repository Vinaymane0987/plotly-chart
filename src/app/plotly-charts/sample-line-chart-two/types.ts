// Interface for the series data
export interface Series {
  name: number; // Represents the name (could be a number or string based on your context)
  value: number; // Represents the value associated with the series
}

// Interface for the chart data
export interface ChartData {
  name: string; // Represents the name of the data category (e.g., "Left" or "Right")
  series: Series[]; // An array of series data
}

// Example of the chart data array
export type ChartDataArray = ChartData[];
