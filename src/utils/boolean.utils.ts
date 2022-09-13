/**
 * Returns true if arg was string 'true' or boolean true
 * otherwise returns boolean false
 * @param arg
 */
export const parseBoolean = (arg: string | undefined | null | boolean): boolean =>
	typeof arg === 'boolean' ? arg : arg === 'true';
