import { Option } from 'fp-ts/lib/Option';
import { option } from 'fp-ts';

export const getQueryParam = (param: string): Option<string> => {
	const url = new URL(window.location.href);
	return option.fromNullable(url.searchParams.get(param));
};

export const getQueryParamArray = (param: string): Option<Array<string>> => {
	const url = new URL(window.location.href);
	return option.fromNullable(url.searchParams.getAll(param));
};
