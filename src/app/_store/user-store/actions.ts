import { createAction, props } from '@ngrx/store';
import { LoginRequest } from 'src/app/_interfaces/requests/auth/login-request';
import { User } from 'src/app/_interfaces/user/user';

export enum UserActionTypes {
    login = '[USER] Login Request',
    loginSuccess = '[USER] Login Success',
    loginError = '[USER] Login Error',
    logout = '[USER] Logout'
}

export const login = createAction(
    UserActionTypes.login,
    props<{ payload: LoginRequest }> ()
);

export const loginSuccess = createAction(
    UserActionTypes.loginSuccess,
    props<{ payload: User }>()
);

export const loginError = createAction(
    UserActionTypes.loginError,
    props<{ payload: any }>()
);

export const logout = createAction(
    UserActionTypes.logout
);