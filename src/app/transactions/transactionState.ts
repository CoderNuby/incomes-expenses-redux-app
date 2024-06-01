import { TransactionModel } from "../models/transaction";


export interface TransactionState {
    items: TransactionModel[] | null,
    incomes: number,
    expenses: number,
    total: number
}