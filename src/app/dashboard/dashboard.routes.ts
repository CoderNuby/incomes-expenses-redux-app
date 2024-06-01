import { Routes } from "@angular/router";
import { StatisticsComponent } from "../transactions/statistics/statistics.component";
import { TransactionComponent } from "../transactions/transaction.component";
import { DetailsComponent } from "../transactions/details/details.component";


export const dashboardRoutes: Routes = [
    { path: '', component: StatisticsComponent },
    { path: 'incomes-expenses', component: TransactionComponent },
    { path: 'details', component: DetailsComponent }
];