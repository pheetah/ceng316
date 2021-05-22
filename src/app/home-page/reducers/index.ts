import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { AuthActions } from '../sign/state-mgmt/action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  token:string | undefined
}

export const initialAuthState:AuthState = {
  token:undefined
};

// function authReducer(state:AuthState, action:any):AuthState{

// }

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) =>{
    return {
      token: action.token
    }
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      token: undefined
    }
  })
);