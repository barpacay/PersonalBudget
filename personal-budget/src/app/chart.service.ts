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
    const labels = data.map(item => item.title);
    const chartData = data.map(item => item.relatedValue);
    const backgroundColor = data.map(item => item.color);

    const chartConfig: ChartConfiguration = this.getDefaultChartConfig(labels, chartData,backgroundColor, chartType);

    const existingChart = this.chartInstances.find(chart => chart.ctx.canvas === canvas.nativeElement);
    console.log(existingChart);
    if (existingChart) {
      console.log(data);
      existingChart.destroy();
      this.chartInstances = this.chartInstances.filter(chart => chart !== existingChart);
    }
    console.log(data);
    const ctx = canvas.nativeElement.getContext('2d');
    if (ctx) {
      const newChart = new Chart(ctx, chartConfig);
      this.chartInstances.push(newChart);
    }
  }

  getDefaultChartConfig(labels: string[], data: number[], backgroundColor:string[], chartType: ChartType): ChartConfiguration {
    return {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Budget',
          data: data,
          backgroundColor: backgroundColor,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  }


  addBudgetEntry(entry: any): Observable<any> {
    return this.http.post('http://159.203.140.231/add', entry)
      .pipe(
        catchError(this.handleError)
      );
  }

  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>('http://159.203.140.231/fetch')
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}



