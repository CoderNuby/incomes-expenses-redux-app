import { Routes } from "@angular/router";
import { StatisticsComponent } from "../transaction/statistics/statistics.component";
import { TransactionComponent } from "../transaction/transaction.component";
import { DetailsComponent } from "../transaction/details/details.component";


export const dashboardRoutes: Routes = [
    { path: '', component: StatisticsComponent },
    { path: 'incomes-expenses', component: TransactionComponent },
    { path: 'details', component: DetailsComponent }
];