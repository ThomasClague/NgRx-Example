import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStoreModule } from './user-store';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze} from 'ngrx-store-freeze';
import { UserReducer } from './user-store/reducer';
import { RootStoreState } from '.';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { LookupsStoreModule } from './lookups-store/lookups-store.module';
import { LookupsReducer } from './lookups-store/reducer';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';

export const reducers: ActionReducerMap<RootStoreState.State> = {
	userFeature: UserReducer,
	lookupsFeature: LookupsReducer,
	router: routerReducer
};


function localStorageSyncReducer(reducer: ActionReducer<RootStoreState.State>): ActionReducer<RootStoreState.State> {
	return localStorageSync({
		keys: [ 'userFeature', 'lookupsFeature', 'router'],
		rehydrate : true
	})(reducer);
}

//export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze, localStorageSyncReducer] : [localStorageSyncReducer];
export const metaReducers: MetaReducer<any>[] = [storeFreeze, localStorageSyncReducer];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		UserStoreModule,
		LookupsStoreModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([]),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		StoreRouterConnectingModule.forRoot()
	],
})
export class RootStoreModule {}
