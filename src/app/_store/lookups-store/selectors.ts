import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';

export const getLookupsState = createFeatureSelector<State>('lookupsFeature');

export const getHasLoaded = createSelector(getLookupsState, (state: State) => state.hasLoaded);
export const getMakes = createSelector(getLookupsState, (state: State) => state.makes);
export const getModels = createSelector(getLookupsState, (state: State) => state.models);

export const getModelsForMake = (makeId: number) =>
    createSelector(
        getLookupsState,
        (state: State) => state?.models?.filter(x => x.value.makeId == makeId)
);
