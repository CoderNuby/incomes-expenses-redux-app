import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';
import { AuthState } from './authState';

const initialState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initialState,
  on(actions.setUser, (state, props) => {
    return {
      user: {
        uid: props.user.uid,
        name: props.user.name,
        email: props.user.email
      }
    }
  }),
  on(actions.unsetUser, (state) => {
    return {
      user: null
    }
  })
);