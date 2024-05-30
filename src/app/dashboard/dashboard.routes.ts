import { Routes } from "@angular/router";
import { StatisticsComponent } from "../incomes-expenses/statistics/statistics.component";
import { IncomesExpensesComponent } from "../incomes-expenses/incomes-expenses.component";
import { DetailsComponent } from "../incomes-expenses/details/details.component";


export const dashboardRoutes: Routes = [
    { path: '', component: StatisticsComponent },
    { path: 'incomes-expenses', component: IncomesExpensesComponent },
    { path: 'details', component: DetailsComponent }
];