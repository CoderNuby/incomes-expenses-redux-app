import { createAction, props } from "@ngrx/store";
import { TransactionModel } from "../models/transaction";



export const setItems = createAction("[Transaction] Set Items", props<{items: TransactionModel[]}>());
export const unsetItems = createAction("[Transaction] Unset Items");
export const setIncomes = createAction("[Transaction] Set Incomes");
export const setExpenses = createAction("[Transaction] Set Expenses");
export const addTransaction = createAction("[Transaction] Add Transaction", props<{transaction: TransactionModel}>());
export const calculateTotal = createAction("[Transaction] Calculate Total");
export const unsetTransactionTotals = createAction("[Transaction] Unset Transaction Totals");