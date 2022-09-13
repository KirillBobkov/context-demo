import { eq, map, option, tuple } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';

export const hasOwnProperty = Object.prototype.hasOwnProperty;

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


/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 * @param {*} objA
 * @param {*} objB
 * @returns {boolean}
 */
export function shallowEqual(objA: unknown, objB: unknown): boolean {
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
	// tslint:disable prefer-for-of
	// eslint-disable-next-line @typescript-eslint/prefer-for-of
	for (let i = 0; i < keysA.length; i++) {
		// @ts-ignore
		if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
			return false;
		}
	}
	// tslint:enable prefer-for-of

	return true;
}

/**
 * Generates new object with keys mapped with template
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function mapKeys<T extends {}>(object: T, template: (key: string) => string): T {
	return Object.keys(object).reduce<T>((acc, key) => {
		// @ts-ignore
		acc[template(key)] = object[key];
		return acc;
		// eslint-disable-next-line no-restricted-syntax
	}, {} as T);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type PartialKeys<T extends {}, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const isNotNullable = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

export const getMapValueByKey =
	<K>(eq: eq.Eq<K>) =>
	(key: K) =>
	<V>(mapToLookup: Map<K, V>) =>
		pipe(mapToLookup, map.lookupWithKey(eq)(key), option.map(tuple.snd));
