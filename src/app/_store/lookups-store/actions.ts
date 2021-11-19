import { createAction, props } from '@ngrx/store';
import { Lookups } from 'src/app/_interfaces/lookups/lookups';

export enum LookupsActionTypes {
	load = '[LOOKUPS] Load Lookups',
	loadSuccess = '[LOOKUPS] Load Success',
	loadError = '[LOOKUPS] Load Error',
}

export const loadLookups = createAction(
	LookupsActionTypes.load
);

export const loadSuccess = createAction(
	LookupsActionTypes.loadSuccess,
	props<{ payload: Lookups }>()
);

export const loadError = createAction(
	LookupsActionTypes.loadError,
	props<{ payload: string }>()
);
