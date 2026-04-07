import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectUser = createSelector(selectAuthState, s => s.user);
export const selectIsAdmin = createSelector(selectAuthState, s => s.isAdmin);
export const selectIsLoading = createSelector(selectAuthState, s => s.isLoading);
export const selectError = createSelector(selectAuthState, s => s.error);
export const selectIsLoggedIn = createSelector(selectAuthState, s => !!s.user);
