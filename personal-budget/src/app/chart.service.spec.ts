import { TestBed } from '@angular/core/testing';
import { ChartService } from './chart.service';
import { HttpClientModule } from '@angular/common/http';

describe('ChartService', () => {
  let service: ChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartService],
      imports: [HttpClientModule], // Add HttpClientModule
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(ChartService);
    expect(service).toBeTruthy();
  });
});
