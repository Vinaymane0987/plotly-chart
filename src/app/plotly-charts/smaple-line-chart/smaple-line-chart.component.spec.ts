import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmapleLineChartComponent } from './smaple-line-chart.component';

describe('SmapleLineChartComponent', () => {
  let component: SmapleLineChartComponent;
  let fixture: ComponentFixture<SmapleLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmapleLineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmapleLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
