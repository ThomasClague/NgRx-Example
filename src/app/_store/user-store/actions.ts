import { createAction, props } from '@ngrx/store';
import { LoginRequest } from 'src/app/_interfaces/requests/auth/login-request';
import { RegisterRequest } from 'src/app/_interfaces/requests/auth/register-request';
import { User } from 'src/app/_interfaces/user/user';

export enum UserActionTypes {
	login = '[USER] Login Request',
	loginSuccess = '[USER] Login Success',
	loginError = '[USER] Login Error',
	register = '[USER] Register Request',
	registerSuccess = '[USER] Register Success',
	registerError = '[USER] Register Error',
	logout = '[USER] Logout',
}

export const login = createAction(
	UserActionTypes.login,
	props<{ payload: LoginRequest }>()
);

export const loginSuccess = createAction(
	UserActionTypes.loginSuccess,
	props<{ payload: User }>()
);

export const loginError = createAction(
	UserActionTypes.loginError,
	props<{ payload: string }>()
);

export const register = createAction(
	UserActionTypes.register,
	props<{ payload: RegisterRequest }>()
);

export const registerSuccess = createAction(
	UserActionTypes.registerSuccess
);

export const registerError = createAction(
	UserActionTypes.registerError,
	props<{ payload: any }>()
);

export const logout = createAction(UserActionTypes.logout);
