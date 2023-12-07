import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColumnChartComponent } from './column-chart.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [ColumnChartComponent],
  imports: [BrowserModule, CanvasJSAngularChartsModule],
  providers: [],
  bootstrap: [ColumnChartComponent] // Assuming you want to bootstrap this component
})
export class ColumnChartModule {}
