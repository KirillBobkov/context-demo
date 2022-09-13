export function notEmpty<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined;
}

export function hasOwnProperty<X extends Record<string, any>, Y extends PropertyKey>(
	obj: X,
	prop: Y,
): obj is X & Record<Y, unknown> {
	return obj.hasOwnProperty(prop);
}

export function isEventWithComposedPath(event: Event): event is PointerEvent {
	return event.composedPath && typeof event.composedPath === 'function';
}
