import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { LineChartBasicComponent } from './line-chart-basic/line-chart-basic.component';
import { NgxApexchartsModule } from 'ngx-apexcharts';



@NgModule({
  declarations: [
    StatisticsComponent,
    LineChartBasicComponent
  ],
  imports: [
    CommonModule,
    NgxApexchartsModule
  ],
  exports: [
    StatisticsComponent
  ]
})
export class StatisticsModule { }
