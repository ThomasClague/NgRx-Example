import { LookupsStoreState } from './lookups-store';
import { UserStoreState } from './user-store';

export interface State {
	userFeature: UserStoreState.State;
	lookupsFeature: LookupsStoreState.State;
}
