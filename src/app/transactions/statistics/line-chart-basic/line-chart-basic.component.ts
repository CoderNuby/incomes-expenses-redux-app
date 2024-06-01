import { Component, Input, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ngx-apexcharts";

export type LineChartBasicChartOptions = {
  series: ApexAxisChartSeries;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
}

@Component({
  selector: 'app-line-chart-basic',
  templateUrl: './line-chart-basic.component.html',
  styleUrl: './line-chart-basic.component.css'
})
export class LineChartBasicComponent {
  @Input("lineChartBasicChartOptions") lineChartBasicChartOptions!: Partial<LineChartBasicChartOptions> | any;
  @ViewChild("chart") chart!: ChartComponent;

  constructor(){}

}
