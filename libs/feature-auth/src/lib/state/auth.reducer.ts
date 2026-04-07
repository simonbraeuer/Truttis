import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  isAdmin: false,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({ ...state, isLoading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { user, isAdmin }) => ({
    ...state, user, isAdmin, isLoading: false, error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state, error, isLoading: false,
  })),
  on(AuthActions.checkAuthSuccess, (state, { user, isAdmin }) => ({
    ...state, user, isAdmin,
  })),
  on(AuthActions.logoutSuccess, () => initialState),
);
