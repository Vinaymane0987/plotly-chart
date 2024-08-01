import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlotlyChartsComponent } from "./plotly-charts/plotly-charts.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlotlyChartsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { 
  title = 'plotly-charts';
}
