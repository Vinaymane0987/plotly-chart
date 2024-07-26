import { Component, OnInit, signal } from '@angular/core';
import { ChartData, Series } from './types';
import { fetchChartData } from './mock-api';
import { Graph } from '../types';
import { PlotlyModule } from 'angular-plotly.js';

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
  private intervalId: any;

  index: number = 0;

  x0 = [1, 2, 5, 6, 8, 9];
  y0 = [2, 8, 6, 4, 9, 7];
  x1 = [1, 2, 5, 6, 8, 9];
  y1 = [5, 7, 9, 5, 6, 4];

  constructor() {}

  graph = signal<Graph>({
    data: [
      {
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
      // vertical line joinig both traces
      {
        x: [this.x0[this.index], this.x0[this.index]],
        y: [this.y0[this.index], this.y1[this.index]],
        type: 'scatter',
        mode: 'lines',
        line: {
          color: 'black',
          width: 4,
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
      showlegend: false,
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

  ngOnInit(): void {
    fetchChartData().subscribe({
      next: (data) => {
        this.chartData.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.intervalId = setInterval(() => {
      this.index = (this.index + 1) % this.x0.length; // Loop back to 0 when reaching the end
      this.updateGraph();
    });
  }

  updateGraph() {
    // Update the vertical line in the graph based on the current index
    this.graph.update((graph) => ({
      ...graph,
      data: [
        ...graph.data.slice(0, 2), // Keep the first two traces
        {
          x: [this.x0[this.index], this.x0[this.index]], // Update x values
          y: [this.y0[this.index], this.y1[this.index]], // Update y values
          type: 'scatter',
          mode: 'lines',
          line: {
            color: 'black',
            width: 4,
          },
          showlegend: false,
          hoverinfo: 'none',
        },
      ],
    }));
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    clearInterval(this.intervalId);
  }
}
