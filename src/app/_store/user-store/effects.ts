import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { LoginRequest } from 'src/app/_interfaces/requests/auth/login-request';
import { RegisterRequest } from 'src/app/_interfaces/requests/auth/register-request';
import { LoginResponse } from 'src/app/_interfaces/responses/auth/login-response';
import { User } from 'src/app/_interfaces/user/user';
import { AuthService } from 'src/app/_services/auth.service';
import { login, loginSuccess, loginError, register, registerError, registerSuccess } from './actions';

@Injectable()
export class UserEffects {
	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private router: Router
	) {}

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(login),
			map((action) => action.payload),
			switchMap((payload: LoginRequest) =>
				this.authService.login(payload).pipe(
					map((loginResponse: LoginResponse) =>
						loginSuccess({ payload: loginResponse as User })
					),
					catchError((err) => {
						console.log(err.error.message);
						return of(loginError({ payload: err.error.message }))
					})
				)
			)
		)
	);

	loginSuccess$ = createEffect(() =>
			this.actions$.pipe(
				ofType(loginSuccess),
				tap(() => this.router.navigate(['/']))
			),
		{ dispatch: false }
	);

	register$ = createEffect(() =>
		this.actions$.pipe(
			ofType(register),
			map((action) => action.payload),
			switchMap((payload: RegisterRequest) =>
				this.authService.register(payload).pipe(
					map(() => registerSuccess()),
					catchError((err) => of(registerError(err.error.message)))
				)
			)
		)
	);

	registerSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(registerSuccess),
			tap(() => this.router.navigate(['/']))
		),
		{ dispatch: false }
	);
}
