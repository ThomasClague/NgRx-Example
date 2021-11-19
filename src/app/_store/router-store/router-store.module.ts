import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature('routerFeature', routerReducer)
	],
})
export class LookupsStoreModule {}
