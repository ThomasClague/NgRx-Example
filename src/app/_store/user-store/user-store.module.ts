import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects';
import { UserReducer } from './reducer';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature('userFeature', UserReducer),
		EffectsModule.forFeature([UserEffects]),
	],
})
export class UserStoreModule {}
