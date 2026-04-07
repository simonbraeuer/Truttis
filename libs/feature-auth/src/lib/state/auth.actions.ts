import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: { id: string; email: string; role: string }; isAdmin: boolean }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const checkAuth = createAction('[Auth] Check Auth');
export const checkAuthSuccess = createAction('[Auth] Check Auth Success', props<{ user: { id: string; email: string; role: string } | null; isAdmin: boolean }>());
