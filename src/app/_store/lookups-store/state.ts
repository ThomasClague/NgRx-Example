import { Make } from "src/app/_interfaces/lookups/make";
import { Model } from "src/app/_interfaces/lookups/model";

export interface State {
	makes: Make[]
	models: Model[]
	isLoading: boolean;
	hasLoaded: boolean;
	error: string;
}

export const initialState: State = {
	makes: null,
	models: null,
	isLoading: false,
	hasLoaded: false,
	error: null,
};
