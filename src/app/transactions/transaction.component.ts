import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionModel, TransactionType } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as uiActions from '../shared/ui.actions';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit, OnDestroy {

  transactionForm!: FormGroup;

  transactionTypeSelected: TransactionType = "income";
  showAmountMessage: boolean = false;

  loading: boolean = false;
  loadingSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private store: Store<AppState>
  ){

  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  ngOnInit(): void {
      this.transactionForm = this.formBuilder.group({
        description: ['', Validators.required],
        amount: ['', Validators.required]
      });

      this.loadingSubscription = this.store.select('ui').subscribe(state => {
        this.loading = state.isLoading;
      });
  }

  saveTransaction(){
    if(this.transactionForm.invalid) return;

    this.store.dispatch(uiActions.isLoading());
    
    const { description, amount } = this.transactionForm.value;
    
    const transactionModel: TransactionModel = {
      uid: "",
      description,
      amount,
      type: this.transactionTypeSelected,
      createdDate: ""
    }
    
    this.transactionService.createTransaction(transactionModel).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Transaction created",
        showConfirmButton: false,
        timer: 4500,
        text: `${this.transactionTypeSelected} created successful`
      }).then(() => {
        this.store.dispatch(uiActions.stopLoading());
        this.transactionForm.reset();
        this.transactionTypeSelected = "income";
      });
    }).catch((err) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Transaction error",
        showConfirmButton: false,
        timer: 4500,
        text: err
      })
      this.store.dispatch(uiActions.stopLoading());
    });
  }

  selectType(type: TransactionType){
    this.transactionTypeSelected = type;
  }
}
