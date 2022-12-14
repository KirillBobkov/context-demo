import { Kind2, URIS2 } from 'fp-ts/lib/HKT';
import { Apply2, sequenceT } from 'fp-ts/lib/Apply';

export type ProjectMany<A, R> = (...args: A[]) => R;

export interface ProductMap<F extends URIS2> {
	<E, A, R>(a: Kind2<F, E, A>, project: (a: A) => R): Kind2<F, E, R>;
	<EA, A, EB, B, R>(a: Kind2<F, EA, A>, b: Kind2<F, EB, B>, project: (a: A, b: B) => R): Kind2<F, EA & EB, R>;
	<EA, A, EB, B, EC, C, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		C: Kind2<F, EC, C>,
		project: (a: A, b: B, c: C) => R,
	): Kind2<F, EA & EB & EC, R>;
	<EA, A, EB, B, EC, C, ED, D, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		project: (a: A, b: B, c: C, d: D) => R,
	): Kind2<F, EA & EB & EC & ED, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		project: (a: A, b: B, c: C, d: D, e: E) => R,
	): Kind2<F, EA & EB & EC & ED & EE, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		project: (a: A, b: B, c: C, d: D, e: E) => R,
	): Kind2<F, EA & EB & EC & ED & EE, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG & EH, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG & EH & EI, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG & EH & EI & EJ, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		k: Kind2<F, EK, K>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG & EH & EI & EJ & EK, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, EL, L, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		k: Kind2<F, EK, K>,
		l: Kind2<F, EL, L>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K, l: L) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG & EH & EI & EJ & EK & EL, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, EL, L, EM, M, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		k: Kind2<F, EK, K>,
		l: Kind2<F, EL, L>,
		m: Kind2<F, EM, M>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K, l: L, m: M) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG & EH & EI & EJ & EK & EL & EM, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, EL, L, EM, M, EN, N, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		k: Kind2<F, EK, K>,
		l: Kind2<F, EL, L>,
		m: Kind2<F, EM, M>,
		n: Kind2<F, EN, N>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG & EH & EI & EJ & EK & EL & EM & EN, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, EL, L, EM, M, EN, N, EO, O, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		k: Kind2<F, EK, K>,
		l: Kind2<F, EL, L>,
		m: Kind2<F, EM, M>,
		n: Kind2<F, EN, N>,
		o: Kind2<F, EO, O>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG & EH & EI & EJ & EK & EL & EM & EN & EO, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, EL, L, EM, M, EN, N, EO, O, EP, P, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		k: Kind2<F, EK, K>,
		l: Kind2<F, EL, L>,
		m: Kind2<F, EM, M>,
		n: Kind2<F, EN, N>,
		o: Kind2<F, EO, O>,
		p: Kind2<F, EP, P>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG & EH & EI & EJ & EK & EL & EM & EN & EO & EP, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, EL, L, EM, M, EN, N, EO, O, EP, P, EQ, Q, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		k: Kind2<F, EK, K>,
		l: Kind2<F, EL, L>,
		m: Kind2<F, EM, M>,
		n: Kind2<F, EN, N>,
		o: Kind2<F, EO, O>,
		p: Kind2<F, EP, P>,
		q: Kind2<F, EQ, Q>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG & EH & EI & EJ & EK & EL & EM & EN & EO & EP & EQ, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, EL, L, EM, M, EN, N, EO, O, EP, P, EQ, Q, ES, S, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		k: Kind2<F, EK, K>,
		l: Kind2<F, EL, L>,
		m: Kind2<F, EM, M>,
		n: Kind2<F, EN, N>,
		o: Kind2<F, EO, O>,
		p: Kind2<F, EP, P>,
		q: Kind2<F, EQ, Q>,
		s: Kind2<F, ES, S>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, s: S) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG & EH & EI & EJ & EK & EL & EM & EN & EO & EP & EQ & ES, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, EL, L, EM, M, EN, N, EO, O, EP, P, EQ, Q, ES, S, ET, T, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		k: Kind2<F, EK, K>,
		l: Kind2<F, EL, L>,
		m: Kind2<F, EM, M>,
		n: Kind2<F, EN, N>,
		o: Kind2<F, EO, O>,
		p: Kind2<F, EP, P>,
		q: Kind2<F, EQ, Q>,
		s: Kind2<F, ES, S>,
		t: Kind2<F, ET, T>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N, o: O, p: P, q: Q, s: S, t: T) => R,
	): Kind2<F, EA & EB & EC & ED & EE & EG & EH & EI & EJ & EK & EL & EM & EN & EO & EP & EQ & ES & ET, R>;
}

export interface CoproductMap<F extends URIS2> {
	<E, A, R>(a: Kind2<F, E, A>, project: (a: A) => R): Kind2<F, E, R>;
	<EA, A, EB, B, R>(a: Kind2<F, EA, A>, b: Kind2<F, EB, B>, project: (a: A, b: B) => R): Kind2<F, EA | EB, R>;
	<EA, A, EB, B, EC, C, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		C: Kind2<F, EC, C>,
		project: (a: A, b: B, c: C) => R,
	): Kind2<F, EA | EB | EC, R>;
	<EA, A, EB, B, EC, C, ED, D, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		project: (a: A, b: B, c: C, d: D) => R,
	): Kind2<F, EA | EB | EC | ED, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		project: (a: A, b: B, c: C, d: D, e: E) => R,
	): Kind2<F, EA | EB | EC | ED | EE, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		project: (a: A, b: B, c: C, d: D, e: E) => R,
	): Kind2<F, EA | EB | EC | ED | EE, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G) => R,
	): Kind2<F, EA | EB | EC | ED | EE | EG, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H) => R,
	): Kind2<F, EA | EB | EC | ED | EE | EG | EH, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I) => R,
	): Kind2<F, EA | EB | EC | ED | EE | EG | EH | EI, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J) => R,
	): Kind2<F, EA | EB | EC | ED | EE | EG | EH | EI | EJ, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		k: Kind2<F, EK, K>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K) => R,
	): Kind2<F, EA | EB | EC | ED | EE | EG | EH | EI | EJ | EK, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, EL, L, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		k: Kind2<F, EK, K>,
		l: Kind2<F, EL, L>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K, l: L) => R,
	): Kind2<F, EA | EB | EC | ED | EE | EG | EH | EI | EJ | EK | EL, R>;
	<EA, A, EB, B, EC, C, ED, D, EE, E, EG, G, EH, H, EI, I, EJ, J, EK, K, EL, L, EM, M, R>(
		a: Kind2<F, EA, A>,
		b: Kind2<F, EB, B>,
		c: Kind2<F, EC, C>,
		d: Kind2<F, ED, D>,
		e: Kind2<F, EE, E>,
		g: Kind2<F, EG, G>,
		h: Kind2<F, EH, H>,
		i: Kind2<F, EI, I>,
		j: Kind2<F, EJ, J>,
		k: Kind2<F, EK, K>,
		l: Kind2<F, EL, L>,
		m: Kind2<F, EM, M>,
		project: (a: A, b: B, c: C, d: D, e: E, g: G, h: H, i: I, j: J, k: K, l: L, m: M) => R,
	): Kind2<F, EA | EB | EC | ED | EE | EG | EH | EI | EJ | EK | EL | EM, R>;
}


const internal = <F extends URIS2>(Fs: Apply2<F>) => {
	const sequenceTF = sequenceT(Fs);
	return <E, A, R>(...args: Array<A | ProjectMany<A, R>>) => {
		// eslint-disable-next-line no-restricted-syntax
		const fas: Kind2<F, E, A>[] = args.slice(0, args.length - 1) as any;
		// eslint-disable-next-line no-restricted-syntax
		const project: ProjectMany<A, R> = args[args.length - 1] as any;
		// eslint-disable-next-line no-restricted-syntax
		const sequenced: Kind2<F, E, A[]> = (sequenceTF as any).apply(null, fas as any) as any;
		return Fs.map(sequenced, as => project(...as));
	};
};

/**
 * @typeclass
 * Describes data types of kind `*->*->*` which can be combined in a tuple
 * with a `product` (`&`) of their left-side types on the left side of such tuple
 */
export interface ProductLeft<F extends URIS2> extends Apply2<F> {
	readonly productLeft: <EA, A, EB, B>(fa: Kind2<F, EA, A>, fb: Kind2<F, EB, B>) => Kind2<F, EA & EB, [A, B]>;
}

/**
 * @typeclass
 * Describes data types of kind `*->*->*` which can be combined in a tuple
 * with a `coproduct` (`|`) of their left-side types on the left side of such tuple
 */
export interface CoproductLeft<F extends URIS2> extends Apply2<F> {
	readonly coproductLeft: <EA, A, EB, B>(fa: Kind2<F, EA, A>, fb: Kind2<F, EB, B>) => Kind2<F, EA | EB, [A, B]>;
}

/**
 * Sequences multiple {@link ProductLeft}s of kind `*->*->*`
 * applicatively accumulating their values and then applying `project` function to those values
 * and wrapping its result in the same {@link ProductLeft} with a `product` (`&`) of types of _left_ side
 */

export function productMapLeft<F extends URIS2>(Fs: ProductLeft<F>): ProductMap<F> {
	return internal(Fs);
}

/**
 * Sequences multiple {@link CoproductLeft}s of kind `*->*->*`
 * applicatively accumulating their values and then applying `project` function to those values
 * and wrapping its result in the same {@link CoproductLeft} with a `coproduct` (`|`) of types of _left_ side
 */

export function coproductMapLeft<F extends URIS2>(Fs: CoproductLeft<F>): CoproductMap<F> {
	return internal(Fs);
}
