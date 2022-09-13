import { observable as rxjs, URI } from 'fp-ts-rxjs/Observable';
import { MonadObservable1 } from './typeclasses/monad-observable';
import { pipe } from 'fp-ts/pipeable';
import {
	catchError,
	delay,
	distinctUntilChanged, mergeMap, reduce,
	repeat,
	retry,
	scan,
	share,
	startWith,
	switchMap, take, tap, withLatestFrom,
} from 'rxjs/operators';
import { combineLatest, defer, EMPTY, from, fromEvent, merge, Observable, Subject, throwError, timer } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { task } from 'fp-ts/Task';
import { ajax } from 'rxjs/ajax';
import * as rx from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';

/**
 * Instance of fp-compatible rxjs observable.
 * @doc-tags fp
 */
// @ts-ignore
export const instanceObservable: typeof rxjs & MonadObservable1<URI> = {
	...rxjs,
	chain: (fa, f) => pipe(fa, switchMap(f)),
	// @ts-ignore
	createPropertyAdapter: <A>() => {
		const s = new Subject<A>();
		const next = (a: A) => s.next(a);
		return [next, s.asObservable()];
	},
	fromEvent: (target: WindowEventHandlers | EventTarget, event: string) =>
		pipe(
			new Observable<Event>(subscriber => {
				const handler = (e: Event) => subscriber.next(e);
				target.addEventListener(event, handler);
				return () => target.removeEventListener(event, handler);
			}),
			share(),
		),
	// @ts-ignore
	fromObservable: observable =>
		// @ts-ignore
		new Observable(subscriber =>
			observable.subscribe({
				end() {
					subscriber.complete();
				},
				// @ts-ignore
				next(e) {
					subscriber.next(e);
				},
			}),
		),
	fromTask: fa => fromPromise(fa()),
	fromIO: fa => fromPromise(task.fromIO(fa)()),
	subscribe: (fa, observer) =>
		fa.subscribe({
			next(e) {
				observer.next(e);
			},
			complete() {
				observer.end();
			},
		}),
};

export const observable = {
	...instanceObservable,
	observable: instanceObservable,
	EMPTY,
	ajax,
	rx,
	catchError,
	combineLatest,
	defer,
	delay,
	distinctUntilChanged,
	fromEvent,
	merge,
	repeat,
	retry,
	scan,
	startWith,
	take,
	tap,
	timer,
	webSocket,
	withLatestFrom,
	from,
	reduce,
	mergeMap,
	throwError,
};