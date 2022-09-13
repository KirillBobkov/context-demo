import { getSink, Sink1 } from './adt/sink.utils';
import { apply, array } from 'fp-ts';
import { pipeable } from 'fp-ts/pipeable';
import { Monad1 } from 'fp-ts/Monad';
import { Monoid } from 'fp-ts/Monoid';
import { Semigroup } from 'fp-ts/Semigroup';
import { merge } from 'rxjs';
import { instanceObservable } from './observable';

export type Sink<A> = Sink1<typeof instanceObservable.URI, A>;
const URI = 'Sink';
type URIType = typeof URI;
declare module 'fp-ts/HKT' {
	interface URItoKind<A> {
		[URI]: Sink<A>;
	}
}

const sinkObservable = getSink(instanceObservable);
export const instanceSink: Monad1<URIType> = { URI, ...sinkObservable };

const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Sink<A>> => ({
	concat: (x, y) => sinkObservable.newSink(S.concat(x.value, y.value), merge(x.effects, y.effects)),
});

const getMonoid = <A>(M: Monoid<A>): Monoid<Sink<A>> => ({
	...getSemigroup(M),
	empty: instanceSink.of(M.empty),
});

/**
 * Sink functions.
 * @doc-tags fp
 */
export const sink = {
	...instanceSink,
	...pipeable(instanceSink),
	sink: instanceSink,
	sequenceT: apply.sequenceT(instanceSink),
	sequenceArray: array.sequence(instanceSink),
	getSemigroup,
	getMonoid,
	newSink: sinkObservable.newSink,
};