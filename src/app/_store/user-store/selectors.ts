import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';

export const getUserState = createFeatureSelector<State>('userFeature');

export const isLoggedIn = createSelector(getUserState, (state: State) =>
	state.user ? true : false
);
export const isLoading = createSelector(
	getUserState,
	(state: State) => state.isLoading
);
