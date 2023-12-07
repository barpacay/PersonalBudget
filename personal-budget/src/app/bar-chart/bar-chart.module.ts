import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BarChartComponent } from './bar-chart.component';
 import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    CanvasJSAngularChartsModule
  ],
  providers: [],
  bootstrap: [BarChartComponent]
})
export class AppModule { }

