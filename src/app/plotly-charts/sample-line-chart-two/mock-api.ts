import { delay, Observable, of } from 'rxjs';
import { generateDummyData } from './dummyData';
import { ChartDataArray } from './types';

// Mock API response
const mockApiResponse: ChartDataArray = generateDummyData();

// Function to simulate an API call
export function fetchChartData(): Observable<ChartDataArray> {
  return of(mockApiResponse).pipe(
    delay(1000) // Simulate a delay of 1 second
  );
}
