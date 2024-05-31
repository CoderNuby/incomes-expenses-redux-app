import { ActionReducerMap } from "@ngrx/store";
import { UiState } from "./shared/uiState";
import { uiReducer } from "./shared/ui.reducer";
import { AuthState } from "./auth/authState";
import { authReducer } from "./auth/auth.reducer";


export interface AppState{
    ui: UiState,
    auth: AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer,
    auth: authReducer
}