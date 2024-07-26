import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleLineChartTwoComponent } from './sample-line-chart-two.component';

describe('SampleLineChartTwoComponent', () => {
  let component: SampleLineChartTwoComponent;
  let fixture: ComponentFixture<SampleLineChartTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleLineChartTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleLineChartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
