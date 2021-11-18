import { Action, createReducer, on } from "@ngrx/store";
import { UserStoreActions } from ".";
import { initialState, State } from "./state";

const reducer = createReducer(
    initialState,
    on(UserStoreActions.login, (state) => ({ 
        ...state,
         isLoading: true
    })),
    on(UserStoreActions.loginSuccess, (state, { payload }) => ({
        ...state,
        user: payload,
        isLoading: false,
    })),
    on(UserStoreActions.loginError,
       UserStoreActions.logout,
        (state) => ({
            ...state,
            user: null,
            isLoading: false,
    }))
);

export function UserReducer(state: State | undefined, action: Action) {
    return reducer(state, action);
}