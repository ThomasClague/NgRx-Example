import { LookupBase } from "./lookup-base";

export interface Model extends LookupBase {
	value: { makeId: number, value: string }
}
