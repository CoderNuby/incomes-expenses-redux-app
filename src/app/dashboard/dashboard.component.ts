import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { UserModel } from '../models/user';
import { Subscription, filter, map, pipe } from 'rxjs';
import { TransactionService } from '../services/transaction.service';
import * as transactionActions from '../transactions/transaction.actions';
import { TransactionModel } from '../models/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  user: UserModel | null = null;
  userSubscription!: Subscription;

  transactionSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private transactionService: TransactionService
  ){

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.transactionSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').subscribe(state => {
      this.user = state.user;
      this.transactionSubscription = this.transactionService.initTransactionItemsListeners(this.user!.uid).subscribe(items => {
        this.store.dispatch(transactionActions.setItems({items}));
        this.store.dispatch(transactionActions.setIncomes());
        this.store.dispatch(transactionActions.setExpenses());
        this.store.dispatch(transactionActions.calculateTotal());
      });
    });
  }
}
