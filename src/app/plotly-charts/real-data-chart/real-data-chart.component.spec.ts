import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealDataChartComponent } from './real-data-chart.component';

describe('RealDataChartComponent', () => {
  let component: RealDataChartComponent;
  let fixture: ComponentFixture<RealDataChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealDataChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealDataChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
