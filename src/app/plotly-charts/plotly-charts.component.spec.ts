import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlyChartsComponent } from './plotly-charts.component';

describe('PlotlyChartsComponent', () => {
  let component: PlotlyChartsComponent;
  let fixture: ComponentFixture<PlotlyChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlotlyChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotlyChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
