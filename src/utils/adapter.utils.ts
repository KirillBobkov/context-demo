import { Observable, Subject } from 'rxjs';

export type Adapter<A> = [(a?: A) => void, Observable<A>];

export const createAdapter = <A>(): Adapter<A> => {
	const s = new Subject<A>();
	const next = (a?: A) => s.next(a);
	return [next, s.asObservable()];
};
