import { Injectable, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
import chartInstances from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  constructor(private http: HttpClient) {}

  chartInstances: Chart[] = [];

  generateChart(canvas: ElementRef, data: any[], chartType: ChartType): void {
    const labels = data.map(item => item.Framework);
    const chartData = data.map(item => item.Stars);

    const chartConfig: ChartConfiguration = this.getDefaultChartConfig(labels, chartData, chartType);

    const ctx = canvas.nativeElement.getContext('2d');
    if (ctx) {
      const newChart = new Chart(ctx, chartConfig);
      this.chartInstances.push(newChart);
    }
  }

  getDefaultChartConfig(labels: string[], data: number[], chartType: ChartType): ChartConfiguration {
    return {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Expenses',
          data: data,
          backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19'],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  }

  addBudgetEntry(entry: any): Observable<any> {
    return this.http.post('http://localhost:3000/add', entry)
      .pipe(
        catchError(this.handleError)
      );
  }

  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/fetch')
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}



