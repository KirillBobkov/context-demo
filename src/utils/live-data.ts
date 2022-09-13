import { getLiveDataM } from './adt/live-data.utils';
import { CoproductLeft, coproductMapLeft } from './typeclasses/product-left-coproduct-left.utils';
import { Filterable2 } from 'fp-ts/Filterable';
import { pipe } from 'fp-ts/function';
import { pipeable } from 'fp-ts/pipeable';
import { MonadThrow2 } from 'fp-ts/MonadThrow';
import { apply, array } from 'fp-ts';
import { Observable } from 'rxjs';
import { scan, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { observable } from 'fp-ts-rxjs';
import { instanceRemoteData, remoteData, RemoteData } from './remote-data';
import { instanceObservable } from './observable';

const URI = 'LiveData';
type URIType = typeof URI;
declare module 'fp-ts/HKT' {
	interface URItoKind2<E, A> {
		[URI]: LiveData<E, A>;
	}
}

export type LiveData<E, A> = Observable<RemoteData<E, A>>;

const scanLD = <E, A, B>(seed: B, f: (acc: B, a: A) => B) => (fa: LiveData<E, A>): LiveData<E, B> =>
	pipe(
		fa,
		scan<RemoteData<E, A>, RemoteData<E, B>>(
			(facc, fa) =>
				pipe(
					remoteData.combine(
						remoteData.alt<E, B>(() => remoteData.success(seed))(facc),
						fa,
					),
					remoteData.map(([acc, a]) => f(acc, a)),
				),
			remoteData.success(seed),
		),
	);

const startWithLD = <A>(a: A): (<E>(fa: LiveData<E, A>) => LiveData<E, A>) => startWith(remoteData.success(a));

const tapLD = <E, A>(f: (a: A) => void): ((fa: LiveData<E, A>) => LiveData<E, A>) =>
	tap(a => {
		if (remoteData.isSuccess(a)) {
			f(a.value);
		}
	});

const withLatestFromLD = <As extends Array<unknown>, E>(...inputs: { [K in keyof As]: Observable<RemoteData<E, As[K]>> }) => <A>(
	source: Observable<RemoteData<E, A>>,
): Observable<RemoteData<E, [A, ...As]>> =>
	withLatestFrom<RemoteData<E, A>, RemoteData<E, [A, ...As]>>(
		...inputs,
		// eslint-disable-next-line no-restricted-syntax
		remoteData.combine as () => RemoteData<E, [A, ...As]>,
	)(source);

const liveDataM = getLiveDataM(instanceObservable, instanceRemoteData);
const instanceLiveData: MonadThrow2<URIType> & CoproductLeft<URIType> & Filterable2<URIType> = { URI, ...liveDataM };
const pipeableLiveData = pipeable(instanceLiveData);

export const chainRD = <E, A, B>(f: (a: A) => RemoteData<E, B>): ((fa: LiveData<E, A>) => LiveData<E, B>) =>
	observable.map(remoteData.chain(f));

export const filterSuccess = <E, A>(fa: LiveData<E, A>): Observable<A> =>
	observable.filterMap(remoteData.toOption)(fa);

/**
 * Folds loaded data into success and error.
 * // TODO add timeout option
 */
const foldWithError = <E, A>(onSuccess: (value: A) => void, onError: (error: E) => void) => (data: LiveData<E, A>) => pipe(
	data,
	observable.map(rd => {
		if (remoteData.isSuccess(rd)) {
			onSuccess(rd.value);
		} else if (remoteData.isFailure(rd)) {
			onError(rd.error);
		}
		return rd;
	}),
);

/**
 * Live data functions.
 * @doc-tags fp
 */
export const liveData = {
	...instanceLiveData,
	...pipeableLiveData,
	liveData: instanceLiveData,
	sequenceT: apply.sequenceT(instanceLiveData),
	sequenceArray: array.sequence(instanceLiveData),
	combine: coproductMapLeft(instanceLiveData),
	scan: scanLD,
	startWith: startWithLD,
	withLatestFrom: withLatestFromLD,
	tap: tapLD,
	chainRD,
	combineS: apply.sequenceS(instanceLiveData),
	filterSuccess,
	foldWithError,
};