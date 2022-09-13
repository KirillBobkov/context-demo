export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

/**
 * @description
 * Helps with the partial objects functions arguments, but errors the empty object case, which is allowed by simple Partial<T>
 * @example
 * function badUpdateSomeEntity(updates: Partial<Entity>): Entity
 * badUpdateSomeEntity({ property: 123 }) // ok
 * badUpdateSomeEntity() // error - expected
 * badUpdateSomeEntity({}) // ok - not expected, should not be allowed to do such operation
 *
 * function goodUpdateSomeEntity(object: AtLeastOne<Entity>): Entity
 * goodUpdateSomeEntity({ property: 123 }) // ok
 * goodUpdateSomeEntity() // error - expected
 * goodUpdateSomeEntity({}) // error - nice!
 */
export type AtLeastOne<T, Keys extends keyof T = keyof T> = Partial<T> & { [K in Keys]: Required<Pick<T, K>> }[Keys];
