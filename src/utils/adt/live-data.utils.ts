import { HKT, Kind, Kind2, URIS, URIS2 } from 'fp-ts/lib/HKT';
import {
	ApplicativeComposition,
	ApplicativeComposition11,
	ApplicativeComposition12,
	getApplicativeComposition,
} from 'fp-ts/lib/Applicative';
import { MonadThrow, MonadThrow1, MonadThrow2 } from 'fp-ts/lib/MonadThrow';
import {
	Filterable,
	Filterable1,
	FilterableComposition,
	FilterableComposition11,
	FilterableComposition12,
} from 'fp-ts/lib/Filterable';
import { identity, not } from 'fp-ts/lib/function';
import { isSome, none, some } from 'fp-ts/lib/Option';
import { isLeft, isRight } from 'fp-ts/lib/Either';
import { sequenceT } from 'fp-ts/lib/Apply';
import { MonadObservable, MonadObservable1 } from '../typeclasses/monad-observable';
import { FoldableValue, FoldableValue1, FoldableValue2 } from '../typeclasses/foldable-value';

// TODO read, understand, merge this file with utils/fp-ts/live-data.ts

export interface LiveData<O, F, A> extends HKT<O, HKT<F, A>> {}
export type LiveData11<O extends URIS, F extends URIS, A> = Kind<O, Kind<F, A>>;
export type LiveData12<O extends URIS, F extends URIS2, E, A> = Kind<O, Kind2<F, E, A>>;

export interface LiveDataM<O, F> extends FilterableComposition<O, F>, ApplicativeComposition<O, F> {
	readonly chain: <A, B>(fa: LiveData<O, F, A>, f: (a: A) => LiveData<O, F, B>) => LiveData<O, F, B>;
	readonly throwError: <E>(e: E) => LiveData<O, F, never>;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	readonly coproductLeft: <EA, A, EB, B>(fa: LiveData<O, F, A>, fb: LiveData<O, F, B>) => LiveData<O, F, [A, B]>;
}

export interface LiveDataM11<O extends URIS, F extends URIS>
	extends FilterableComposition11<O, F>,
		ApplicativeComposition11<O, F> {
	readonly chain: <A, B>(fa: LiveData11<O, F, A>, f: (a: A) => LiveData11<O, F, B>) => LiveData11<O, F, B>;
	readonly throwError: <E>(e: E) => LiveData11<O, F, never>;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	readonly coproductLeft: <EA, A, EB, B>(
		fa: LiveData11<O, F, A>,
		fb: LiveData11<O, F, B>,
	) => LiveData11<O, F, [A, B]>;
}

export interface LiveDataM12<O extends URIS, F extends URIS2>
	extends FilterableComposition12<O, F>,
		ApplicativeComposition12<O, F> {
	readonly chain: <E, A, B>(
		fa: LiveData12<O, F, E, A>,
		f: (a: A) => LiveData12<O, F, E, B>,
	) => LiveData12<O, F, E, B>;
	readonly throwError: <E>(e: E) => LiveData12<O, F, E, never>;
	readonly coproductLeft: <EA, A, EB, B>(
		fa: LiveData12<O, F, EA, A>,
		fb: LiveData12<O, F, EB, B>,
	) => LiveData12<O, F, EA | EB, [A, B]>;
}

export function getLiveDataM<O extends URIS, F extends URIS2>(
	O: MonadObservable1<O> & Filterable1<O>,
	F: FoldableValue2<F> & MonadThrow2<F>,
): LiveDataM12<O, F>;

export function getLiveDataM<O extends URIS, F extends URIS>(
	O: MonadObservable1<O> & Filterable1<O>,
	F: FoldableValue1<F> & MonadThrow1<F>,
): LiveDataM11<O, F>;

export function getLiveDataM<O, F>(
	O: MonadObservable<O> & Filterable<O>,
	F: FoldableValue<F> & MonadThrow<F>,
): LiveDataM<O, F>;

export function getLiveDataM<O, F>(
	Os: MonadObservable<O> & Filterable<O>,
	Fs: FoldableValue<F> & MonadThrow<F>,
): LiveDataM<O, F> {
	const sequenceTO = sequenceT(Os);
	const sequenceTF = sequenceT(Fs);
	const OF: LiveDataM<O, F> = {
		...getApplicativeComposition(Os, Fs),
		filter: (ofa, p) =>
			Os.fromObservable({
				subscribe: observer =>
					Os.subscribe(ofa, {
						...observer,
						next: fa => Fs.foldValue(fa, observer.next, a => p(a) && observer.next(fa)),
					}),
			}),
		filterMap: (ofa, f) =>
			Os.fromObservable({
				subscribe: observer =>
					Os.subscribe(ofa, {
						...observer,
						next: fa =>
							Fs.foldValue(fa, observer.next, a => {
								const b = f(a);
								if (isSome(b)) {
									observer.next(Fs.of(b.value));
								}
							}),
					}),
			}),
		compact: ofa => OF.filterMap(ofa, identity),
		partition: (ofa, p) => ({
			left: OF.filter(ofa, not(p)),
			right: OF.filter(ofa, p),
		}),
		partitionMap: (ofa, f) => ({
			left: OF.filterMap(ofa, a => {
				const ebc = f(a);
				return isLeft(ebc) ? some(ebc.left) : none;
			}),
			right: OF.filterMap(ofa, a => {
				const ebc = f(a);
				return isRight(ebc) ? some(ebc.right) : none;
			}),
		}),
		separate: ofeab => OF.partitionMap(ofeab, identity),
		chain: <A, B>(opa: HKT<O, HKT<F, A>>, f: (a: A) => HKT<O, HKT<F, B>>): HKT<O, HKT<F, B>> => {
			const onNever: (fn: HKT<F, never>) => HKT<O, HKT<F, B>> = Os.of;
			return Os.chain(opa, pa => Fs.foldValue(pa, onNever, f));
		},
		throwError: e => Os.of(Fs.throwError(e)),
		coproductLeft: (ofa, ofb) => Os.map(sequenceTO(ofa, ofb), ([fa, fb]) => sequenceTF(fa, fb)),
	};
	return OF;
}