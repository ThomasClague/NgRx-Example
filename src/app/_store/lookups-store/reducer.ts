import { Action, createReducer, on } from '@ngrx/store';
import { LookupsStoreActions } from '.';
import { initialState, State } from './state';

const reducer = createReducer(
	initialState,
	on(LookupsStoreActions.loadLookups, (state) => ({
		...state,
		isLoading: true,
		error: null,
	})),
	on(LookupsStoreActions.loadSuccess, (state, { payload }) => ({
		...state,
		makes: payload.makes,
		models: payload.models,
		isLoading: false,
		hasLoaded: true
	})),
	on(LookupsStoreActions.loadError, (state, { payload }) => ({
		...state,
		makes: null,
		models: null,
		isLoading: false,
		error: payload,
		hasLoaded: false
	}))
);

export function LookupsReducer(state: State | undefined, action: Action) {
	return reducer(state, action);
}
