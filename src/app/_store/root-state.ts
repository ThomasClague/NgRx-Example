import { LookupsStoreState } from './lookups-store';
import { UserStoreState } from './user-store';
import * as fromRouter from '@ngrx/router-store';

export interface State {
	userFeature: UserStoreState.State;
	lookupsFeature: LookupsStoreState.State;
	router: fromRouter.RouterReducerState<any>;
}
