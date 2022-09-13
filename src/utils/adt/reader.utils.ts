import { Reader, asks, reader as fptsreader, URI } from 'fp-ts/lib/Reader';
import { sequenceT } from 'fp-ts/lib/Apply';
import { tuple } from 'fp-ts/lib/function';
import { ProductLeft, productMapLeft } from '../typeclasses/product-left-coproduct-left.utils';
import { defer, MonadReader } from '../typeclasses/monad-reader';

const productLeft = <EA, A, EB, B>(fa: Reader<EA, A>, fb: Reader<EB, B>): Reader<EA & EB, [A, B]> =>
	asks(e => tuple(fa(e), fb(e)));

const runReader = <E, A>(fa: Reader<E, A>, e: E): A => fa(e);

export const reader: typeof fptsreader & ProductLeft<URI> & MonadReader<URI> = {
	...fptsreader,
	asks,
	runReader,
	productLeft,
};

export const sequenceTReader = sequenceT(reader);
export const combineReader = productMapLeft(reader);
export const deferReader = defer(reader);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ReaderEnvType<F extends Reader<any, any>> = F extends Reader<infer E, infer A> ? E : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ReaderValueType<F extends Reader<any, any>> = F extends Reader<infer E, infer A> ? A : never;