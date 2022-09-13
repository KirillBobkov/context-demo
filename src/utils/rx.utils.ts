import { Observable } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';

export interface Unsubscriber {
	(): void;
}

/**
 * Subscribes to observable without any logic.
 *
 * ### WARNING ###
 * USE THIS ONLY IF YOU ARE SURE THAT THIS IS "SINGLE"
 * ###############
 *
 * Single means that it will emit result only once and then will destroy itself (complete).
 * Otherwise (if you're not sure) - it may (and WILL) cause memory leaks
 * @param subFn - function to subscribe
 */
export const subscribeSingle = <T>(subFn: (value: T) => void) => (observable: Observable<T>): void => {
	observable.pipe(take(1)).subscribe(subFn);
};

/**
 * Adapter, creates observable for listener function.
 * Used for ChartEvents integration.
 * @param addListenerFn
 */
export const createObservableFromListener = (
	addListenerFn: (callback: () => void) => Unsubscriber,
): Observable<never> => {
	return new Observable<never>(subscriber => {
		addListenerFn(() => subscriber.next());
	});
};
export const createObservableFromListener1 = <T>(
	addListenerFn: (callback: (value: T) => void) => Unsubscriber,
): Observable<T> => {
	return new Observable<T>(subscriber => {
		addListenerFn(value => subscriber.next(value));
	});
};

export const hold: <A>(source: Observable<A>) => Observable<A> = shareReplay({ refCount: true, bufferSize: 1 });
