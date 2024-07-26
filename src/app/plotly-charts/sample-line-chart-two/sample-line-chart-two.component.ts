import {
  AfterViewInit,
  Component,
  effect,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ChartData, Series } from './types';
import { fetchChartData } from './mock-api';
import { Graph } from '../types';
import { PlotlyModule } from 'angular-plotly.js';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-sample-line-chart-two',
  standalone: true,
  imports: [PlotlyModule],
  templateUrl: './sample-line-chart-two.component.html',
  styleUrl: './sample-line-chart-two.component.scss',
})
export class SampleLineChartTwoComponent implements OnInit {
  chartData = signal<ChartData[]>([]);
  indexVar = signal(0);
  private subscription: Subscription = new Subscription();
  x0 = [1.25, 2.8, 5.3, 6, 8, 9];
  y0 = [2, 8, 6, 4, 9, 7];
  x1 = [1.25, 2.8, 5.3, 6, 8, 9];
  y1 = [5, 7, 9, 5, 6, 4];

  constructor() {
    effect(() => {
      this.updateVerticalLine(this.indexVar());
    });
  }

  graph = signal<Graph>({
    data: [
      {
        // x: this.chartData()[0]?.series.map((s: Series) => s.name) || [],
        // y: this.chartData()[1]?.series.map((s: Series) => s.value) || [],
        x: this.x0,
        y: this.y0,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
        name: this.chartData()[0]?.name || 'Left',
        line: {
          width: 1.5,
          shape: 'spline',
          smoothing: 1.3,
          dash: 'solid',
        },
        hoverinfo: 'none',
      },
      {
        // x: this.chartData()[1]?.series.map((s: Series) => s.name) || [], // X values from the Right series
        // y: this.chartData()[1]?.series.map((s: Series) => s.value) || [], // Y values from the Right series
        x: this.x1,
        y: this.y1,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'green' },
        name: this.chartData()[1]?.name || 'Right',
        line: {
          width: 1.5,
          shape: 'spline',
          smoothing: 1.3,
          dash: 'solid',
        },
        hoverinfo: 'none',
      },
      {
        x: [this.x0[0], this.x0[0]], // Start with the first x-value
        y: [Math.min(...this.y0, ...this.y1), Math.max(...this.y0, ...this.y1)], // Span the entire y-range
        type: 'scatter',
        mode: 'lines',
        line: {
          color: 'gray',
          width: 2,
          dash: 'dot',
        },
        showlegend: false,
        hoverinfo: 'none',
      },
    ],
    layout: {
      title: 'Pressure Balance Graph',
      yaxis: {
        title: 'Y Axis',
        range: [0, 10],
      },
      xaxis: {
        title: 'X Axis',
        range: [0, 10], // Adjust based on your data
      },
      responsive: true,
      showlegend: true,
      mode: {
        color: '#000000',
      },
    },
    config: {
      displaylogo: false,
      staticPlot: false,
      editable: true,
      displayModeBar: true,
      modeBarButtonsToRemove: [
        'toImage',
        'zoom2d',
        'select2d',
        'lasso2d',
        'resetScale2d',
      ],
      scrollZoom: true,
    },
  });

  updateVerticalLine(index: number) {
    this.graph.update((graph) => ({
      ...graph,
      data: [
        ...graph.data.slice(0, 2),
        {
          x: [this.x0[index], this.x0[index]], // Use the same x-value for both points
          y: [
            Math.min(...this.y0, ...this.y1),
            Math.max(...this.y0, ...this.y1),
          ], // Span the entire y-range
          type: 'scatter',
          mode: 'lines',
          line: {
            color: 'gray',
            width: 2,
            dash: 'dot',
          },
          showlegend: false,
          hoverinfo: 'none',
        },
      ],
    }));
  }

  ngOnInit(): void {
    fetchChartData().subscribe({
      next: (data) => {
        this.chartData.set(data);
        console.log('chart data', this.chartData());
        console.log(
          'x axis data :',
          this.chartData()[1]?.series.map((s: Series) => s.name)
        );
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.subscription.add(
      interval(1000).subscribe(() => {
        this.indexVar.update((val) => (val + 1) % this.x0.length);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
