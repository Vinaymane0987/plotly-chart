import { Component } from '@angular/core';
import { SmapleLineChartComponent } from "./smaple-line-chart/smaple-line-chart.component";
import { SampleLineChartTwoComponent } from "./sample-line-chart-two/sample-line-chart-two.component";
import { RealDataChartComponent } from "./real-data-chart/real-data-chart.component";

@Component({
  selector: 'app-plotly-charts',
  standalone: true,
  imports: [SmapleLineChartComponent, SampleLineChartTwoComponent, RealDataChartComponent],
  templateUrl: './plotly-charts.component.html',
  styleUrl: './plotly-charts.component.scss'
})
export class PlotlyChartsComponent {

}
