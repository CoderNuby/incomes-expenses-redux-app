import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionModel } from '../../models/transaction';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {

  transactionItems: TransactionModel[] | null = [];
  transactionSubscription!: Subscription;

  constructor(private store: Store<AppState>,
    private transactionService: TransactionService
  ){

  }

  ngOnDestroy(): void {
    this.transactionSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.transactionSubscription = this.store.select('transactions').subscribe(state => {
      this.transactionItems = state.items;
    });
  }

  deleteItem(uid: string){
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.transactionService.deleteTransaction(uid).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Transaction deleted",
            showConfirmButton: false,
            timer: 4500,
            text: 'Transaction deleted successful'
          });
        }).catch(err => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Transaction deleted error",
            showConfirmButton: false,
            timer: 4500,
            text: err
          });
        });
      }
    });
  }
}
