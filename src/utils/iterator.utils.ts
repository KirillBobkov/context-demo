
export const iteratorForEach = <T>(iterator: IterableIterator<T>, forEach: (val: T) => void) => {
	let value = iterator.next();
	while (!value.done) {
		forEach(value.value);
		value = iterator.next();
	}
};
