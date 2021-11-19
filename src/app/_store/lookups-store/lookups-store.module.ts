import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LookupsEffects } from './effects';
import { LookupsReducer } from './reducer';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature('lookupsFeature', LookupsReducer),
		EffectsModule.forFeature([LookupsEffects]),
	],
})
export class LookupsStoreModule {}
