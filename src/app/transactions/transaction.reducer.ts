import { createReducer, on } from '@ngrx/store';
import { TransactionState } from './transactionState';
import * as actions from './transaction.actions';

const initialState: TransactionState = {
    items: null,
    incomes: 0,
    expenses: 0,
    total: 0
};

export const transactionReducer = createReducer(
  initialState,
  on(actions.setItems, (state, props) => ({...state, items: props.items})),
  on(actions.unsetItems, (state) => ({...state, items: null})),
  on(actions.calculateTotal, (state) => {
    let total = 0;
    state.items?.forEach(item => {
      if(item.type === "income"){
        total += item.amount;
      }else{
        total -= item.amount;
      }
    });
    
    return {
      ...state,
      total: total
    }
  }),
  on(actions.setIncomes, (state) => {
    let total = 0;
    state.items?.forEach(item => {
      if(item.type === "income"){
        total += item.amount;
      }
    });
    
    return {
      ...state,
      incomes: total
    }
  }),
  on(actions.setExpenses, (state) => {
    let total = 0;
    state.items?.forEach(item => {
      if(item.type === "expense"){
        total += item.amount;
      }
    });
    
    return {
      ...state,
      expenses: total
    }
  }),
  on(actions.unsetTransactionTotals, (state) => ({...state, incomes: 0, expenses: 0, total: 0})),
);