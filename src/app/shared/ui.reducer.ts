import { createReducer, on } from '@ngrx/store';
import * as uiActions from './ui.actions';
import { UiState } from './uiState';

const initialState: UiState = {
    isLoading: false
};

export const uiReducer = createReducer(
  initialState,
  on(uiActions.isLoading, (state) => ({ isLoading: true })),
  on(uiActions.stopLoading, (state) => ({ isLoading: false })),
);