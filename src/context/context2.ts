import { getReaderM } from 'fp-ts/lib/ReaderT';
import { Monad2 } from 'fp-ts/lib/Monad';
import { map as readerMap, Reader } from 'fp-ts/lib/Reader';
import { sequenceT } from 'fp-ts/lib/Apply';
import { pipe, pipeable } from 'fp-ts/lib/pipeable';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { array } from 'fp-ts/lib/Array';
import { instanceSink, sink, Sink } from '../utils/sink';
import { strictEqual } from 'fp-ts/lib/Eq';
import { ProductLeft, ProductMap, ProjectMany } from '../utils/typeclasses/product-left-coproduct-left.utils';
import { deferReader } from '../utils/adt/reader.utils';

export const URI = '@devexperts/dx-utils//Context';

interface Eq<A> {
	readonly equals: (x: A, y: A) => boolean;
}


export const memoOnce = <A>(E: Eq<A>) => <Args extends A[], R>(f: (...args: Args) => R): ((...args: Args) => R) => {
	let hasValue = false;
	let cachedR: R;
	// eslint-disable-next-line no-restricted-syntax
	let cachedArgs: Args = [] as any;
	const update = (args: Args): void => {
		cachedR = f(...args);
		hasValue = true;
		cachedArgs = args;
	};
	return (...args: Args): R => {
		const length = args.length;
		if (hasValue && length === 0) {
			return cachedR;
		}
		if (!hasValue || cachedArgs.length !== length) {
			update(args);
			return cachedR;
		}
		for (let i = 0; i < length; i++) {
			if (!E.equals(cachedArgs[i], args[i])) {
				update(args);
				return cachedR;
			}
		}
		return cachedR;
	};
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type URI = typeof URI;
declare module 'fp-ts/lib/HKT' {
	interface URItoKind2<E, A> {
		// @ts-ignore
		[URI]: Context<E, A>;
	}
}

/**
 * Main type of context framework.
 * @doc-tags fp
 */
export interface Context<E, A> extends Reader<E, Sink<A>> {}

const memo = memoOnce({
	equals: strictEqual,
});
export const instanceContext: Monad2<URI> & ProductLeft<URI> = {
	URI,
	...getReaderM(instanceSink),
	productLeft: (fa, fb) => e => sink.sequenceT(fa(e), fb(e)),
};

const sequenceT_ = sequenceT(instanceContext);
const sequenceArray = array.sequence(instanceContext);

const defer = <E extends object, A, K extends keyof E>(
	fa: Context<E, A>,
	...keys: K[]
): Context<Omit<E, K>, Context<Pick<E, K>, A>> => pipe(deferReader(fa, ...keys), readerMap(instanceSink.of));

const combine: ProductMap<URI> = <E, A, R>(...args: NonEmptyArray<Context<E, A> | ProjectMany<A, R>>) => {
	const last = args.length - 1;
	// eslint-disable-next-line no-restricted-syntax
	const fas = sequenceArray(args.slice(0, last) as Context<E, A>[]); // guaranteed by ProductMap
	// eslint-disable-next-line no-restricted-syntax
	const project = memo(args[last] as ProjectMany<A, R>); // guaranteed by ProductMap
	return instanceContext.map(fas, as => project(...as));
};

const key = <A>() => <K extends PropertyKey>(key: K): Context<Record<K, A>, A> => e => sink.of(e[key]);

/**
 * Extracts all objects from context on this level.
 * @doc-tags tricky
 */
const extract = (): Context<unknown, any> => e => sink.of(e);

/**
 * Context reader functions.
 * @doc-tags fp
 */
export const context = {
	...instanceContext,
	...pipeable(instanceContext),
	sequenceT: sequenceT_,
	sequenceArray,
	combine,
	defer,
	key,
	extract,
};