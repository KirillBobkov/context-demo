import { URIS, URIS2 } from 'fp-ts/lib/HKT';
import { useEffect, useMemo } from 'react';
import { constVoid } from 'fp-ts/lib/function';
import { MonadObservable, MonadObservable1, MonadObservable2 } from './typeclasses/monad-observable';
import { Sink, Sink1, Sink2 } from './adt/sink.utils';
import { instanceObservable } from './observable';

const observerVoid = {
	next: constVoid,
	end: constVoid,
};

export function dxUseSink<M extends URIS2>(
	M: MonadObservable2<M>,
): <A>(factory: () => Sink2<M, A>, dependencies: unknown[], subscribeEffects?: boolean) => A;

export function dxUseSink<M extends URIS>(
	M: MonadObservable1<M>,
): <A>(factory: () => Sink1<M, A>, dependencies: unknown[], subscribeEffects?: boolean) => A;

export function dxUseSink<M>(M: MonadObservable<M>): <A>(factory: () => Sink<M, A>, dependencies: unknown[], subscribeEffects?: boolean) => A;

export function dxUseSink<M>(Ms: MonadObservable<M>): <A>(factory: () => Sink<M, A>, dependencies: unknown[], subscribeEffects?: boolean) => A {
	return (factory, dependencies, subscribeEffects = true) => {
		const sa = useMemo(factory, [...dependencies, subscribeEffects]);
		useEffect(() => {
			if (subscribeEffects) {
				const subscription = Ms.subscribe(sa.effects, observerVoid);
				return () => subscription.unsubscribe();
			} else {
				return;
			}
		}, [sa, subscribeEffects]);
		return sa.value;
	};
}

export const useSink = dxUseSink(instanceObservable);
