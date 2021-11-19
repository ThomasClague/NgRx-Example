import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Lookups } from 'src/app/_interfaces/lookups/lookups';
import { LoginRequest } from 'src/app/_interfaces/requests/auth/login-request';
import { RegisterRequest } from 'src/app/_interfaces/requests/auth/register-request';
import { LoginResponse } from 'src/app/_interfaces/responses/auth/login-response';
import { User } from 'src/app/_interfaces/user/user';
import { AuthService } from 'src/app/_services/auth.service';
import { LookupsService } from 'src/app/_services/lookups.service';
import { LookupsStoreState } from '.';
import { loadError, loadLookups, loadSuccess, LookupsActionTypes } from './actions';
import { getHasLoaded } from './selectors';

@Injectable()
export class LookupsEffects implements OnInitEffects {
	constructor(
		private actions$: Actions,
		private lookupsService: LookupsService,
		private store$: Store<LookupsStoreState.State>,
		private router: Router
	) {}

	ngrxOnInitEffects(): Action {
		return { type: LookupsActionTypes.load };
	}

	load$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadLookups),
			withLatestFrom(this.store$.select(getHasLoaded)),
			filter(([ action, hasLoaded ]) => !hasLoaded), // only continue if hasLoaded is false
			switchMap(() =>
				this.lookupsService.load().pipe(
					map((lookups: Lookups) =>
						loadSuccess({ payload: lookups })
					),
					catchError((err) => of(loadError({ payload: err.error.message })))
				)
			)
		)
	);


	loadSuccess$ = createEffect(() =>
			this.actions$.pipe(
				ofType(loadSuccess),
				tap(() => this.router.navigate(['/']))
			),
		{ dispatch: false }
	);
}
