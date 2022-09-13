import {
	combine,
	elem,
	exists,
	failure,
	fold,
	getEq,
	getMonoid,
	getOrElse,
	getSemigroup,
	initial,
	isFailure,
	isInitial,
	isPending,
	isSuccess,
	pending,
	remoteDataInstance as rdDX,
	RemoteData as RDDX,
	success,
	toOption,
	fromProgressEvent,
	progress,
} from './adt/remote-data.adt';
import { MonadThrow2 } from 'fp-ts/MonadThrow';
import { FoldableValue2 } from './typeclasses/foldable-value';
import { pipeable } from 'fp-ts/pipeable';
import { apply } from 'fp-ts';
import { constVoid } from 'fp-ts/es6/function';

export type { RemoteInitial, RemoteFailure, RemotePending, RemoteSuccess } from './adt/remote-data.adt';

const URI = rdDX.URI;
type URIType = typeof URI;
export type RemoteData<E, A> = RDDX<E, A>;

const foldableValueRemoteData: FoldableValue2<URIType> = {
	URI,
	foldMap: rdDX.foldMap,
	foldValue: (fa, onNever, onValue) => (isSuccess(fa) ? onValue(fa.value) : onNever(fa)),
	reduce: (fa, b, f) => (isSuccess(fa) ? f(b, fa.value) : b),
	reduceRight: (fa, b, f) => (isSuccess(fa) ? f(fa.value, b) : b),
};
const monadThrowRemoteData: MonadThrow2<URIType> = {
	URI,
	ap: rdDX.ap,
	chain: rdDX.chain,
	map: rdDX.map,
	of: rdDX.of,
	throwError: failure,
};

export const instanceRemoteData = {
	...rdDX,
	...foldableValueRemoteData,
	...monadThrowRemoteData,
};

export const toVoid = <E, T>(rd: RemoteData<E, T>): RemoteData<E, void> => {
	return remoteData.map(constVoid)(rd);
};

/**
 * Remote data functions.
 * @doc-tags fp
 */
export const remoteData = {
	...pipeable(instanceRemoteData),
	remoteData: instanceRemoteData,
	initial,
	success,
	failure,
	pending,
	isSuccess,
	isFailure,
	isPending,
	isInitial,
	combine,
	toOption,
	elem,
	exists,
	getOrElse,
	getEq,
	getMonoid,
	getSemigroup,
	fold,
	combineS: apply.sequenceS(instanceRemoteData),
	toVoid,
	progress,
	fromProgressEvent,
};
