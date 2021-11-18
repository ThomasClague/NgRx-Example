import { User } from "src/app/_interfaces/user/user";

export interface State {
    user: User | null;
    isLoading: boolean;
    error: string;
}

export const initialState: State = {
    user: null,
    isLoading: false,
    error: null
};