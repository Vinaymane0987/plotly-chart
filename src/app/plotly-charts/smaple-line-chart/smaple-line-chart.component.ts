import { Component, signal } from '@angular/core';
import { Graph } from '../types';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-smaple-line-chart',
  standalone: true,
  imports: [PlotlyModule, NgIf, CommonModule],
  templateUrl: './smaple-line-chart.component.html',
  styleUrl: './smaple-line-chart.component.scss',
})
export class SmapleLineChartComponent {
  private graphSubject = new BehaviorSubject<Graph>({
    data: [
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines+markers',
        // marker: { color: 'red' },
        name: 'Line 1',
      },
      {
        x: [35, 28, 11],
        y: [9, 4, 6],
        type: 'scatter',
        mode: 'lines+markers',
        // marker: { color: 'green' },
        name: 'Line 1',
      },
    ],
    layout: {
      title: 'Pressure Balance Graph',
      yaxis: {
        title: 'Y Axis',
        // showline: false,
        // zeroline: false,
        // showgrid: false,
      },
      responsive: true,
      showlegend: false,
      modebar_add: [
        'drawline',
        'drawopenpath',
        'drawclosedpath',
        'drawcircle',
        'drawrect',
        'eraseshape',
      ],
      mode: {
        color: '#000000',
      },
      // xaxis: {
      //   showline: false,
      //   showgrid: false,
      //   zeroline: false,
      // },
      colorway: ['#FFA500', '#333333'],
    },
    config: {
      displaylogo: false,
      staticPlot: false,
      editable: true,
      displayModeBar: 'hover',
      modeBarButtonsToRemove: [
        'toImage',
        'zoom2d',
        'select2d',
        'lasso2d',
        'resetScale2d',
      ],
      modeBarButtonsToAdd: [
        'drawline',
        'drawopenpath',
        'drawclosedpath',
        'drawcircle',
        'drawrect',
        'eraseshape',
      ],
      scrollZoom: true,
    },
  });
  graph$ = this.graphSubject.asObservable();
}
