import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { LineChartBasicChartOptions } from './line-chart-basic/line-chart-basic.component';
import { TransactionModel } from '../../models/transaction';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
  providers: [DatePipe]
})

export class StatisticsComponent implements OnInit, OnDestroy {
  incomes: number = 0;
  expenses: number = 0;
  total: number = 0;

  incomesPercent: number = 0;
  expensesPercent: number = 0;
  transactionItems: TransactionModel[] | null = [];

  transactionSubscription!: Subscription;

  charts: ChartType = {
    lineChartBasicChartOptions: this.setLineChartBasicChartOptions(),

  }

  constructor(
    private store: Store<AppState>,
    private datePipe: DatePipe
  ){
  }

  ngOnDestroy(): void {
    this.transactionSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.transactionSubscription = this.store.select('transactions').subscribe(state => {
      this.incomes = state.incomes;
      this.expenses = state.expenses;
      this.total = state.total;
      this.transactionItems = state.items;
      this.incomesPercent = state.incomes * 100 / (state.incomes + state.expenses);
      this.expensesPercent = state.expenses * 100 / (state.incomes + state.expenses);
      this.charts.lineChartBasicChartOptions = this.setLineChartBasicChartOptions();
    });
  }

  private setLineChartBasicChartOptions(): Partial<LineChartBasicChartOptions> {
    let chartDataTotal: number[] = [];
    let chartDataCreatedDate: string[] = [];
    this.transactionItems?.forEach(item => {
      let total = 0;
      if(item.type == "income"){
        total += item.amount;
        chartDataTotal.push(total);
      }else{
        total -= item.amount;
        chartDataTotal.push(total);
      }
      chartDataCreatedDate.push(this.datePipe.transform(item.createdDate, 'dd/MM/yyyy')!);
    });
    return {
      series: [
        {
          name: "Total money",
          data: chartDataTotal
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Total of money per transaction",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: chartDataCreatedDate
      }
    };
  }
}

interface ChartType {
  lineChartBasicChartOptions: Partial<LineChartBasicChartOptions>
}
