import { ChartDataArray, Series } from "./types";

export function generateDummyData(): ChartDataArray {
  const leftSeries: Series[] = [];
  const rightSeries: Series[] = [];

  // Generate 50 series for "Left"
  for (let i = 1; i <= 50; i++) {
    leftSeries.push({
      name: i, // Series name as a number
      value: Math.floor(Math.random() * 5000), // Random value between 0 and 99
    });
  }

  // Generate 50 series for "Right"
  for (let i = 1; i <= 50; i++) {
    rightSeries.push({
      name: i, // Series name as a number (51 to 100)
      value: Math.floor(Math.random() * 5000), // Random value between 0 and 99
    });
  }

  // Return the complete chart data
  return [
    {
      name: 'Left',
      series: leftSeries,
    },
    {
      name: 'Right',
      series: rightSeries,
    },
  ];
}