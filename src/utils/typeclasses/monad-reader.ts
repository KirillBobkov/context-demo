import { Reader } from 'fp-ts/lib/Reader';
import { Kind2, URIS2 } from 'fp-ts/lib/HKT';
import { Monad2 } from 'fp-ts/lib/Monad';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ReaderEnvType<R extends Reader<any, any>> = R extends Reader<infer E, infer A> ? E : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ReaderValueType<R extends Reader<any, any>> = R extends Reader<infer E, infer A> ? A : never;

export interface MonadReader<F extends URIS2> extends Monad2<F> {
	readonly asks: <E, A>(f: (e: E) => A) => Kind2<F, E, A>;
	readonly runReader: <E, A>(fa: Kind2<F, E, A>, e: E) => A;
}


export function defer<F extends URIS2>(Fs: MonadReader<F>) {
	return <E extends object, A, K extends keyof E>(
		fa: Kind2<F, E, A>,
		...keys: K[]
	): Kind2<F, Omit<E, K>, Kind2<F, Pick<E, K>, A>> =>
		// eslint-disable-next-line no-restricted-syntax
		Fs.asks(outerE => Fs.asks(innerE => Fs.runReader(fa, Object.assign({}, outerE, innerE) as E)));
}