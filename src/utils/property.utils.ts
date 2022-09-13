import { BehaviorSubject, Observable } from 'rxjs';

export interface Property<A> extends Observable<A> {
	readonly getValue: () => A;
}

export type PropertyAdapter<A> = [(a: A) => void, Property<A>];

export const createPropertyAdapter = <A>(initial: A, cmp: (a: A, b: A) => boolean = (a, b) => a === b): PropertyAdapter<A> => {
	const bs = new BehaviorSubject(initial);
	return [a => !cmp(bs.getValue(), a) && bs.next(a), bs];
};
