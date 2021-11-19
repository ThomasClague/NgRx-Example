import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';

export const getUserState = createFeatureSelector<State>('userFeature');

export const isLoggedIn = createSelector(getUserState, (state: State) => state.user ? true : false);
export const getUsername = createSelector(getUserState, (state: State) => state?.user?.username);
export const isLoading = createSelector(getUserState, (state: State) => state.isLoading);
export const error = createSelector(getUserState, (state: State) => state.error);
