import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartService } from '../chart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  expenses: any[] = [];
  // data: number[] = [];
  userInput: any = {};

  @ViewChild('chartCanvasPie') chartCanvasPie!: ElementRef;
  @ViewChild('chartCanvasColumn') chartCanvasColumn!: ElementRef;
  @ViewChild('chartCanvasBar') chartCanvasBar!: ElementRef;

  constructor(private chartService: ChartService, private http: HttpClient, private router: Router) {}

  ngAfterViewInit(): void {
    this.fetchDataAndDrawCharts();
  }

  createUserInput(): void {
    this.chartService.addBudgetEntry(this.userInput).subscribe(() => {
      this.fetchDataAndDrawCharts();
    });
  }

  fetchDataAndDrawCharts(): void {
    this.http.get('http://159.203.140.231:3100/fetch').subscribe((res: any) => {
      this.updateDataSource(res);
      this.createCharts();
    });
  }

  updateDataSource(data: any): void {
    this.expenses = data;
  }

  createCharts(): void {
    this.chartService.generateChart(this.chartCanvasPie, this.expenses, 'pie');
    this.chartService.generateChart(this.chartCanvasColumn, this.expenses, 'doughnut');
    this.chartService.generateChart(this.chartCanvasBar, this.expenses, 'bar');
  }


  logout(): void {
    this.router.navigate(['/']);
  }
}
