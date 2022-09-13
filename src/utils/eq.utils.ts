import { eqString, eqBoolean, eqNumber, Eq, strictEqual } from 'fp-ts/lib/Eq';
import { getEq } from 'fp-ts/lib/Option';

export const eqStrict: Eq<unknown> = {
	equals: strictEqual,
};

export const eqOptionBoolean = getEq(eqBoolean);
export const eqOptionString = getEq(eqString);
export const eqOptionNumber = getEq(eqNumber);
