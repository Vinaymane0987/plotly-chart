import { Component, OnInit, signal } from '@angular/core';
import { ISensorsChartData, Series, SwingData } from './types';
import { fetchChartData } from './mock-api';
import { Graph } from '../types';
import { PlotlyModule } from 'angular-plotly.js';
import { interval, Subscription } from 'rxjs';

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
  transformedData = signal<ISensorsChartData[]>([]);
  yAxisTicks = signal<number[]>([0, 25, 50, 75, 100]);
  yAxisTickTexts = signal<string[]>(['0%', '25%', '50%', '75%', '100%']);
  currentIndex = signal(0);
  intervalId: any;

  // private subscription: Subscription = new Subscription();
  // private intervalId: any;
  // index: number = 0;

  x0 = signal<number[]>([]);
  y0 = signal<number[]>([]);
  x1 = signal<number[]>([]);
  y1 = signal<number[]>([]);

  sensorsDataToPercentageChartData(
    sensorsData: SwingData
  ): ISensorsChartData[] {
    const series: ISensorsChartData[] = [
      {
        name: 'Left',
        series: [],
      },
      {
        name: 'Right',
        series: [],
      },
    ];
    sensorsData.sensorsData.forEach((s) => {
      const name = s.t;
      const leftValue = s.l.reduce((acc, curr) => acc + curr, 0);
      const rightValue = s.r.reduce((acc, curr) => acc + curr, 0);

      const sum = leftValue + rightValue;
      let leftSeriesValue = 0;
      let rightSeriesValue = 0;

      if (sum) {
        leftSeriesValue = Math.floor((leftValue * 100) / sum);
        rightSeriesValue = 100 - leftSeriesValue;
      }

      series[0].series.push({
        name,
        value: leftSeriesValue,
      });
      series[1].series.push({
        name,
        value: rightSeriesValue,
      });
    });
    return series;
  }

  updateGraph(): void {
    this.graph.set({
      data: [
        {
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
        // indicator line
        {
          x: [this.x0()[this.currentIndex()], this.x1()[this.currentIndex()]],
          y: [this.y0()[this.currentIndex()], this.y1()[this.currentIndex()]],
          type: 'scatter',
          mode: 'lines',
          line: {
            color: 'blue',
            width: 3,
            // dash: 'dot',
          },
          showlegend: false,
          hoverinfo: 'none',
        },
      ],
      layout: {
        title: 'Pressure Balance Graph',
        yaxis: {
          title: 'Y Axis',
          // range: [10, 200],
        },
        xaxis: {
          title: 'X Axis',
          // range: [0, 200], // Adjust based on your data
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
        this.transformedData.set(this.sensorsDataToPercentageChartData(data));
        this.x0.set(
          this.transformedData()[0]?.series?.map((s) => s.name) || []
        );
        this.y0.set(
          this.transformedData()[0]?.series?.map((s) => s.value) || []
        );
        this.x1.set(
          this.transformedData()[1]?.series?.map((s) => s.name) || []
        );
        this.y1.set(
          this.transformedData()[1]?.series?.map((s) => s.value) || []
        );
        this.updateGraph();
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.intervalId = setInterval(() => {
      this.currentIndex.update((val) => val + 1);
      this.updateGraph();
    }, 300);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
