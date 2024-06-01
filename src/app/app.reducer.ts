import { ActionReducerMap } from "@ngrx/store";
import { UiState } from "./shared/uiState";
import { uiReducer } from "./shared/ui.reducer";
import { AuthState } from "./auth/authState";
import { authReducer } from "./auth/auth.reducer";
import { TransactionState } from "./transactions/transactionState";
import { transactionReducer } from "./transactions/transaction.reducer";


export interface AppState{
    ui: UiState,
    auth: AuthState,
    transactions: TransactionState
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer,
    auth: authReducer,
    transactions: transactionReducer
}