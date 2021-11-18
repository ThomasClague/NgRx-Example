import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStoreModule } from './user-store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserReducer } from './user-store/reducer';
import { RootStoreState } from '.';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';

export const reducers: ActionReducerMap<RootStoreState.State> = {
  userFeature: UserReducer,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})
export class RootStoreModule { }
