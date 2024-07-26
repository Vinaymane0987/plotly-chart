import { Component, OnInit, signal } from '@angular/core';
import { SwingData } from './types';
import { fetchChartData } from './mock-api';
import { Graph } from '../types';
import { PlotlyModule } from 'angular-plotly.js';

@Component({
  selector: 'app-real-data-chart',
  standalone: true,
  imports: [PlotlyModule],
  templateUrl: './real-data-chart.component.html',
  styleUrl: './real-data-chart.component.scss',
})
export class RealDataChartComponent implements OnInit {
  chartData = signal<SwingData | undefined>(undefined);
  graph = signal<Graph | undefined>(undefined);
  x0 = signal<number[]>([]);
  y0 = signal<number[]>([]);
  x1 = signal<number[]>([]);
  y1 = signal<number[]>([]);

  updateGraph(): void {
    this.graph.set({
      data: [
        {
          // x: this.chartData()[0]?.series.map((s: Series) => s.name) || [],
          // y: this.chartData()[1]?.series.map((s: Series) => s.value) || [],
          x: this.x0(),
          y: this.y0(),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
          name: 'Left',
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
          x: this.x1(),
          y: this.y1(),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'green' },
          name: 'Right',
          line: {
            width: 1.5,
            shape: 'spline',
            smoothing: 1.3,
            dash: 'solid',
          },
          hoverinfo: 'none',
        },
        // {
        //   x: [this.x0[0], this.x0[0]], // Start with the first x-value
        //   y: [Math.min(...this.y0, ...this.y1), Math.max(...this.y0, ...this.y1)], // Span the entire y-range
        //   type: 'scatter',
        //   mode: 'lines',
        //   line: {
        //     color: 'gray',
        //     width: 2,
        //     dash: 'dot',
        //   },
        //   showlegend: false,
        //   hoverinfo: 'none',
        // },
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
  }

  ngOnInit(): void {
    fetchChartData().subscribe({
      next: (data: SwingData) => {
        this.chartData.set(data);
        console.log('chart data', this.chartData());
        console.log(
          'x data',
          this.chartData()?.sensorsData.map((s) => s.cpl.x)
        );
        this.x0.set(
          // this.chartData()?.sensorsData.map((s) =>
          //   Number(s.cpl.x.toFixed(3))
          // ) ||
          [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5]
        );
        this.y0.set(
          // this.chartData()?.sensorsData.map((s) =>
          //   Number(s.cpl.y.toFixed(3))
          // ) ||
          [3.1, 6.3, 1.6, 9.4, 4.7, 7.1, 2.2, 5.5, 8.9, 1.4]
        );
        this.x1.set(
          // this.chartData()?.sensorsData.map((s) =>
          //   Number(s.cpr.x.toFixed(3))
          // ) ||
          [6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5]
        );
        this.y1.set(
          // this.chartData()?.sensorsData.map((s) =>
          //   Number(s.cpr.y.toFixed(3))
          // ) ||
          [7.7, 3.3, 8.9, 2.2, 10.0, 1.1, 6.7, 4.4, 5.6, 3.9]
        );
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.updateGraph();
  }
}
