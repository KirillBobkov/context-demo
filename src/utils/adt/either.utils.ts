import { Either, either as fptseither, isRight, right, URI } from 'fp-ts/lib/Either';
import { tuple } from 'fp-ts/lib/function';
import { sequenceT } from 'fp-ts/lib/Apply';
import { array } from 'fp-ts/lib/Array';
import { CoproductLeft, coproductMapLeft } from '../typeclasses/product-left-coproduct-left.utils';

const coproductLeft = <LA, A, LB, B>(fa: Either<LA, A>, fb: Either<LB, B>): Either<LA | LB, [A, B]> => {
	if (isRight(fa)) {
		if (isRight(fb)) {
			return right(tuple(fa.right, fb.right));
		}
		// eslint-disable-next-line no-restricted-syntax
		return fb as any;
	}
	// eslint-disable-next-line no-restricted-syntax
	return fa as any;
};

export const either: typeof fptseither & CoproductLeft<URI> = {
	...fptseither,
	coproductLeft,
};

export const combineEither = coproductMapLeft(either);
export const sequenceTEither = sequenceT(either);
export const sequenceEither = array.sequence(either);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type LeftType<F extends Either<any, any>> = F extends Either<infer L, infer A> ? L : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type RightType<F extends Either<any, any>> = F extends Either<infer L, infer A> ? A : never;