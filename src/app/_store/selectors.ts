import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserStoreSelectors } from './user-store';


export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
//   MyFeatureStoreSelectors.selectMyFeatureIsLoading,
//   MyOtherFeatureStoreSelectors.selectMyOtherFeatureIsLoading,
//   (myFeature: boolean, myOtherFeature: boolean) => {
//     return myFeature || myOtherFeature;
//   }
    UserStoreSelectors.isLoading,
    (login: boolean) => {
        return login;
    }
);
