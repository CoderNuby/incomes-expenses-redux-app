import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsModule } from './statistics/statistics.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

import { DetailsComponent } from './details/details.component';
import { TransactionComponent } from './transaction.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { transactionReducer } from './transaction.reducer';



@NgModule({
  declarations: [
    DetailsComponent,
    TransactionComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StatisticsModule,
    SharedModule,
    DashboardRoutesModule,
    StoreModule.forFeature('transactions', transactionReducer)
  ]
})
export class TransactionModule { }
