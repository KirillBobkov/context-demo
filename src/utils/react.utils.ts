import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { constVoid } from 'fp-ts/function';
import { URIS, URIS2 } from 'fp-ts/HKT';
import { MonadObservable, MonadObservable1, MonadObservable2 } from './typeclasses/monad-observable';
import { Sink, Sink1, Sink2 } from './adt/sink.utils';
import { Observable } from 'rxjs';
import { Property } from './property.utils';
import { instanceObservable } from './observable';
import { typedMemo } from './typed-memo';
import { valueByPath } from './get-value-by-path.util';


/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 * @param {*} x
 * @param {*} y
 * @returns {boolean}
 */
 export function is(x: any, y: any): boolean {
	// SameValue algorithm
	if (x === y) {
		// Steps 1-5, 7-10
		// Steps 6.b-6.e: +0 != -0
		return x !== 0 || 1 / x === 1 / y;
	} else {
		// Step 6.a: NaN == NaN
		return x !== x && y !== y;
	}
}

export const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Deeply compares two objects
 * @param {*} objA
 * @param {*} objB
 * @returns {Boolean}
 */
 export function deepEqual(objA: object, objB: object): boolean {
	if (is(objA, objB)) {
		return true;
	}

	if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
		return false;
	}

	const keysA = Object.keys(objA);
	const keysB = Object.keys(objB);

	if (keysA.length !== keysB.length) {
		return false;
	}

	// Test for A's keys different from B.
	for (let i = 0, len = keysA.length; i < len; i++) {
		// @ts-ignore
		if (!hasOwnProperty.call(objB, keysA[i]) || !deepEqual(objA[keysA[i]], objB[keysA[i]])) {
			return false;
		}
	}

	return true;
}

export const namedMemoRef = <A extends Record<string, any>, Ref>(
	name: string,
	Component: React.ForwardRefRenderFunction<Ref, A>,
): FC<A & React.RefAttributes<Ref>> => {
	const frComponent = React.forwardRef<Ref, A>(Component);
	frComponent.displayName = name;
	// eslint-disable-next-line no-restricted-syntax
	return React.memo(frComponent) as never;
};

export const namedMemo = <A extends Record<string, any>>(
	name: string,
	Component: FC<A>,
	propsAreEqual?: (
		prevProps: Readonly<React.PropsWithChildren<A>>,
		nextProps: Readonly<React.PropsWithChildren<A>>,
	) => boolean,
): FC<A> => {
	Component.displayName = name;
	return React.memo(Component, propsAreEqual);
};

const observerVoid = {
	next: constVoid,
	end: constVoid,
};

export function dxUseSink<M extends URIS2>(
	M: MonadObservable2<M>,
): <A>(factory: () => Sink2<M, A>, dependencies: unknown[]) => A;
export function dxUseSink<M extends URIS>(
	M: MonadObservable1<M>,
): <A>(factory: () => Sink1<M, A>, dependencies: unknown[]) => A;
export function dxUseSink<M>(M: MonadObservable<M>): <A>(factory: () => Sink<M, A>, dependencies: unknown[]) => A;
export function dxUseSink<M>(Ms: MonadObservable<M>): <A>(factory: () => Sink<M, A>, dependencies: unknown[]) => A {
	return (factory, dependencies) => {
		const sa = useMemo(factory, dependencies);
		useEffect(() => {
			const subscription = Ms.subscribe(sa.effects, observerVoid);
			return () => subscription.unsubscribe();
		}, [sa]);
		return sa.value;
	};
}

export const useObservable = <A>(fa: Observable<A>, initial: A): A => {
	const [value, setValue] = useState(() => initial);
	const subscription = useMemo(
		() =>
			fa.subscribe(a => {
				//ignore state toggle functions and allow passing functions in Observable
				setValue(() => a);
			}),
		[fa, setValue],
	);
	useEffect(() => () => subscription.unsubscribe(), [subscription]);
	return value;
};

export const useProperty = <A>(fa: Property<A>): A => {
	return useObservable(fa, fa.getValue());
};

/**
 * An optimization, useObservable is very expensive hook - it causes react rerenders.
 * Sometimes we store multiple structures inside one observable, but we will have to rerender container every time
 * when any structure inside observable is changed even if we need updates from only one structure!
 * So this hook let you rerender container only when one structure is changed.
 * @param fa
 * @param initial
 * @param path
 */
export function useDirectObservable<
	FA,
	K1 extends keyof FA,
	K2 extends keyof FA[K1],
	K3 extends keyof FA[K1][K2],
	K4 extends keyof FA[K1][K2][K3],
	K5 extends keyof FA[K1][K2][K3][K4],
>(fa: Observable<FA>, initial: FA[K1][K2][K3][K4][K5], path: [K1, K2, K3, K4, K5]): FA[K1][K2][K3][K4][K5];
export function useDirectObservable<
	FA,
	K1 extends keyof FA,
	K2 extends keyof FA[K1],
	K3 extends keyof FA[K1][K2],
	K4 extends keyof FA[K1][K2][K3],
>(fa: Observable<FA>, initial: FA[K1][K2][K3][K4], path: [K1, K2, K3, K4]): FA[K1][K2][K3][K4];
export function useDirectObservable<FA, K1 extends keyof FA, K2 extends keyof FA[K1], K3 extends keyof FA[K1][K2]>(
	fa: Observable<FA>,
	initial: FA[K1][K2][K3],
	path: [K1, K2, K3],
): FA[K1][K2][K3];
export function useDirectObservable<FA, K1 extends keyof FA, K2 extends keyof FA[K1]>(
	fa: Observable<FA>,
	initial: FA[K1][K2],
	path: [K1, K2],
): FA[K1][K2];
export function useDirectObservable<FA, K1 extends keyof FA>(fa: Observable<FA>, initial: FA[K1], path: [K1]): FA[K1];
export function useDirectObservable<FA>(fa: Observable<FA>, initial: unknown, path: Array<unknown>): unknown {
	const [value, setValue] = useState<unknown>(() => initial);
	const ref = useRef<unknown>(value);
	useEffect(() => {
		const subscription = fa.subscribe(a => {
			// ignore state toggle functions and allow passing functions in Observable
			// @ts-ignore
			const newValue = valueByPath(a, path);
			// if we use directly value inside the subscription, it will recreate the sub on each value change
			// @ts-ignore
			if (typeof newValue === 'object' ? !deepEqual(newValue, ref.current) : newValue !== ref.current) {
				ref.current = newValue;
				setValue(() => newValue);
			}
		});
		return () => subscription.unsubscribe();
	}, [fa, path]);
	return value;
}

export function useDirectProperty<
	FA,
	K1 extends keyof FA,
	K2 extends keyof FA[K1],
	K3 extends keyof FA[K1][K2],
	K4 extends keyof FA[K1][K2][K3],
	K5 extends keyof FA[K1][K2][K3][K4],
>(fa: Property<FA>, path: [K1, K2, K3, K4, K5]): FA[K1][K2][K3][K4][K5];
export function useDirectProperty<
	FA,
	K1 extends keyof FA,
	K2 extends keyof FA[K1],
	K3 extends keyof FA[K1][K2],
	K4 extends keyof FA[K1][K2][K3],
>(fa: Property<FA>, path: [K1, K2, K3, K4]): FA[K1][K2][K3][K4];
export function useDirectProperty<FA, K1 extends keyof FA, K2 extends keyof FA[K1], K3 extends keyof FA[K1][K2]>(
	fa: Property<FA>,
	path: [K1, K2, K3],
): FA[K1][K2][K3];
export function useDirectProperty<FA, K1 extends keyof FA, K2 extends keyof FA[K1]>(
	fa: Property<FA>,
	path: [K1, K2],
): FA[K1][K2];
export function useDirectProperty<FA, K1 extends keyof FA>(fa: Property<FA>, path: [K1]): FA[K1];
export function useDirectProperty<FA>(fa: Property<FA>, path: Array<unknown>) {
	// @ts-ignore
	return react.useDirectObservable(fa, valueByPath(fa.getValue(), path), path);
}

/**
 * React functions library.
 * @doc-tags fp,react
 */
export const react = {
	namedMemoRef,
	useSink: dxUseSink(instanceObservable),
	useObservable,
	useProperty,
	useDirectObservable,
	useDirectProperty,
	typedMemo,
};
