import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { PieChartComponent } from './pie-chart.component';

@NgModule({
  declarations: [
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    CanvasJSAngularChartsModule
  ],
  providers: [],
  bootstrap: [PieChartComponent]
})
export class AppModule { }
