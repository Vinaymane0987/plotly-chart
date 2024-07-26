import { delay, Observable, of } from 'rxjs';
import {responseData} form './response.js'
import { SwingData } from './types';

// Function to simulate an API call
export function fetchChartData(): Observable<SwingData> {
  return of(responseData).pipe(
    delay(1000) // Simulate a delay of 1 second
  );
}
