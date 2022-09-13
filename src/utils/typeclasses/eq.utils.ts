import { Eq } from 'fp-ts/lib/Eq';
import { shallowEqual } from '../object.utils';

export const eqShallow: Eq<unknown> = {
	equals: shallowEqual,
};